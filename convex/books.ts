import { query, mutation, action } from "./_generated/server";
import { v } from "convex/values";

const PLAN_LIMITS = {
  free: { maxBooks: 1, maxSessionsPerMonth: 5, maxDurationPerSession: 5 },
  standard: { maxBooks: 10, maxSessionsPerMonth: 100, maxDurationPerSession: 15 },
  pro: { maxBooks: 100, maxSessionsPerMonth: Infinity, maxDurationPerSession: 60 },
};

type PlanType = "free" | "standard" | "pro";

function getPlanFromClerkId(_clerkId: string): PlanType {
  return "free";
}

function getCurrentBillingPeriodStart(): number {
  const now = new Date();
  return new Date(now.getFullYear(), now.getMonth(), 1, 0, 0, 0, 0).getTime();
}

export const getAll = query({
  args: { search: v.optional(v.string()) },
  handler: async (ctx, args) => {
    let books = await ctx.db.query("books").order("desc").collect();

    if (args.search) {
      const searchLower = args.search.toLowerCase();
      books = books.filter(
        (b) =>
          b.title.toLowerCase().includes(searchLower) ||
          b.author.toLowerCase().includes(searchLower)
      );
    }
    return books;
  },
});

export const getPublicBook = query({
  args: { slug: v.string() },
  handler: async (ctx, args) => {
    const book = await ctx.db
      .query("books")
      .withIndex("by_slug", (q) => q.eq("slug", args.slug))
      .first();

    if (!book) return null;

    return {
      _id: book._id,
      title: book.title,
      author: book.author,
      slug: book.slug,
      persona: book.persona,
      description: book.description,
      coverURL: book.coverURL,
      totalSegments: book.totalSegments,
    };
  },
});

export const getBySlug = query({
  args: { slug: v.string() },
  handler: async (ctx, args) => {
    const book = await ctx.db
      .query("books")
      .withIndex("by_slug", (q) => q.eq("slug", args.slug))
      .first();
    return book;
  },
});

export const getById = query({
  args: { bookId: v.id("books") },
  handler: async (ctx, args) => {
    const book = await ctx.db.get(args.bookId);
    return book;
  },
});

export const checkBookExists = query({
  args: { title: v.string() },
  handler: async (ctx, args) => {
    const slug = args.title.toLowerCase().replace(/\s+/g, "-");
    const existing = await ctx.db
      .query("books")
      .withIndex("by_slug", (q) => q.eq("slug", slug))
      .first();
    return { exists: !!existing, book: existing };
  },
});

export const getUserBooks = query({
  args: { clerkId: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("books")
      .withIndex("by_clerkId", (q) => q.eq("clerkId", args.clerkId))
      .order("desc")
      .collect();
  },
});

export const create = mutation({
  args: {
    clerkId: v.string(),
    title: v.string(),
    author: v.string(),
    persona: v.optional(v.string()),
    fileURL: v.string(),
    fileBlobKey: v.string(),
    coverURL: v.optional(v.string()),
    coverBlobKey: v.optional(v.string()),
    fileSize: v.number(),
    fileStorageId: v.optional(v.string()),
    coverStorageId: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const slug = args.title.toLowerCase().replace(/\s+/g, "-");

    const existing = await ctx.db
      .query("books")
      .withIndex("by_slug", (q) => q.eq("slug", slug))
      .first();

    if (existing) return { success: true, bookId: existing._id, alreadyExists: true };

    const plan = getPlanFromClerkId(args.clerkId);
    const limits = PLAN_LIMITS[plan];

    const userBooks = await ctx.db
      .query("books")
      .withIndex("by_clerkId", (q) => q.eq("clerkId", args.clerkId))
      .collect();

    if (userBooks.length >= limits.maxBooks) {
      return {
        success: false,
        error: `You have reached the maximum number of books allowed for your ${plan} plan (${limits.maxBooks}). Please upgrade to add more books.`,
        isBillingError: true,
      };
    }

    const bookId = await ctx.db.insert("books", {
      ...args,
      slug,
      totalSegments: 0,
    });

    return { success: true, bookId, alreadyExists: false };
  },
});

export const updateDescription = mutation({
  args: {
    bookId: v.id("books"),
    description: v.string(),
  },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.bookId, { description: args.description });
  },
});

export const incrementSegments = mutation({
  args: {
    bookId: v.id("books"),
    count: v.number(),
  },
  handler: async (ctx, args) => {
    const book = await ctx.db.get(args.bookId);
    if (book) {
      await ctx.db.patch(args.bookId, {
        totalSegments: book.totalSegments + args.count,
      });
    }
  },
});

export const generateDescription = action({
  args: { bookId: v.id("books") },
  handler: async (ctx, args) => {
    const book = await ctx.db.get(args.bookId);
    if (!book) throw new Error("Book not found");

    const segments = await ctx.db
      .query("bookSegments")
      .withIndex("by_bookId", (q) => q.eq("bookId", args.bookId))
      .take(3);

    if (segments.length === 0) {
      await ctx.db.patch(args.bookId, {
        description: `Read ${book.title} by ${book.author} on BookNote.`,
      });
      return;
    }

    const contentSnippet = segments
      .map((s) => s.content.substring(0, 500))
      .join("\n\n");

    const mistralApiKey = process.env.MISTRAL_API_KEY;
    if (!mistralApiKey) {
      console.error("MISTRAL_API_KEY not set");
      return;
    }

    try {
      const response = await fetch("https://api.mistral.ai/v1/chat/completions", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${mistralApiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "mistral-small-latest",
          messages: [
            {
              role: "user",
              content: `Write a 2-sentence SEO description (max 160 characters) for a book titled "${book.title}" by ${book.author}. The book starts with: ${contentSnippet}. Focus on what readers will experience and learn. Make it compelling for search engines.`,
            },
          ],
          max_tokens: 100,
        }),
      });

      const data = await response.json();
      const description = data.choices?.[0]?.message?.content?.trim();

      if (description) {
        await ctx.db.patch(args.bookId, { description });
      }
    } catch (error) {
      console.error("Error generating description:", error);
    }
  },
});

export const getAllPublic = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("books").collect();
  },
});
