import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

export const getByBookId = query({
  args: { bookId: v.id("books") },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("bookSegments")
      .withIndex("by_bookId", (q) => q.eq("bookId", args.bookId))
      .order("asc")
      .collect();
  },
});

export const getByBookIdPaginated = query({
  args: { bookId: v.id("books"), limit: v.optional(v.number()) },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("bookSegments")
      .withIndex("by_bookId", (q) => q.eq("bookId", args.bookId))
      .order("asc")
      .take(args.limit || 50);
  },
});

export const searchSegments = query({
  args: { bookId: v.id("books"), query: v.string(), limit: v.optional(v.number()) },
  handler: async (ctx, args) => {
    const segments = await ctx.db
      .query("bookSegments")
      .withIndex("by_bookId", (q) => q.eq("bookId", args.bookId))
      .collect();

    const keywords = args.query.split(/\s+/).filter((k) => k.length > 2);
    const pattern = keywords.join("|");

    const regex = new RegExp(pattern, "i");
    
    const results = segments
      .filter((s) => regex.test(s.content))
      .slice(0, args.limit || 5);

    return results;
  },
});

export const createMany = mutation({
  args: {
    segments: v.array(
      v.object({
        clerkId: v.string(),
        bookId: v.id("books"),
        content: v.string(),
        segmentIndex: v.number(),
        pageNumber: v.optional(v.number()),
        wordCount: v.number(),
      })
    ),
  },
  handler: async (ctx, args) => {
    let count = 0;
    for (const segment of args.segments) {
      await ctx.db.insert("bookSegments", segment);
      count++;
    }
    return { insertedCount: count };
  },
});

export const deleteByBookId = mutation({
  args: { bookId: v.id("books") },
  handler: async (ctx, args) => {
    const segments = await ctx.db
      .query("bookSegments")
      .withIndex("by_bookId", (q) => q.eq("bookId", args.bookId))
      .collect();

    for (const segment of segments) {
      await ctx.db.delete(segment._id);
    }

    return { deletedCount: segments.length };
  },
});
