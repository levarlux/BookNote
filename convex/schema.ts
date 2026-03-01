import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  books: defineTable({
    clerkId: v.string(),
    title: v.string(),
    slug: v.string(),
    author: v.string(),
    persona: v.optional(v.string()),
    description: v.optional(v.string()),
    fileURL: v.string(),
    fileBlobKey: v.string(),
    coverURL: v.optional(v.string()),
    coverBlobKey: v.optional(v.string()),
    fileSize: v.number(),
    totalSegments: v.number(),
    fileStorageId: v.optional(v.string()),
    coverStorageId: v.optional(v.string()),
  })
    .index("by_clerkId", ["clerkId"])
    .index("by_slug", ["slug"]),

  bookSegments: defineTable({
    clerkId: v.string(),
    bookId: v.id("books"),
    content: v.string(),
    segmentIndex: v.number(),
    pageNumber: v.optional(v.number()),
    wordCount: v.number(),
  })
    .index("by_bookId", ["bookId"])
    .index("by_book_segment", ["bookId", "segmentIndex"])
    .index("by_book_page", ["bookId", "pageNumber"])
    .searchIndex("by_content", {
      searchField: "content",
    }),

  voiceSessions: defineTable({
    clerkId: v.string(),
    bookId: v.id("books"),
    startedAt: v.number(),
    endedAt: v.optional(v.number()),
    durationSeconds: v.number(),
    billingPeriodStart: v.number(),
  })
    .index("by_clerkId", ["clerkId"])
    .index("by_clerk_billing", ["clerkId", "billingPeriodStart"]),
});
