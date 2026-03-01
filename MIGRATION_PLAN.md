# MongoDB to Convex Migration Plan

## Status: ✅ Phase 1-4 Complete

---

## 1. Project Initialization ✅

**Completed:**
- Convex already initialized (`npx convex dev` run previously)
- Environment variables configured in `.env.local`
- `NEXT_PUBLIC_CONVEX_URL` and `CONVEX_DEPLOYMENT` set

---

## 2. Schema Re-design ✅

**Created `convex/schema.ts`:**

```typescript
import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  books: defineTable({
    clerkId: v.string(),
    title: v.string(),
    slug: v.string(),
    author: v.string(),
    persona: v.optional(v.string()),
    description: v.optional(v.string()),  // NEW - for SEO
    fileURL: v.string(),
    fileBlobKey: v.string(),
    coverURL: v.optional(v.string()),
    coverBlobKey: v.optional(v.string()),
    fileSize: v.number(),
    totalSegments: v.number(),
    fileStorageId: v.optional(v.string()),  // NEW - Convex Storage
    coverStorageId: v.optional(v.string()), // NEW - Convex Storage
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
    .index("by_book_page", ["bookId", "pageNumber"]),

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
```

---

## 3. API Logic Transition ✅

### Created Files:

| File | Contents |
|------|----------|
| `convex/books.ts` | getAll, getPublicBook, getBySlug, getById, checkBookExists, getUserBooks, create, updateDescription, incrementSegments, generateDescription (Mistral AI), getAllPublic |
| `convex/bookSegments.ts` | getByBookId, getByBookIdPaginated, searchSegments, createMany, deleteByBookId |
| `convex/voiceSessions.ts` | getByClerkId, getByClerkIdAndBillingPeriod, create, endSession, getSessionCountThisMonth |

---

## 4. Privacy-Aware Queries ✅

### Public Query (SEO - No Auth Required):
```typescript
export const getPublicBook = query({
  args: { slug: v.string() },
  handler: async (ctx, args) => {
    // Only returns: _id, title, author, slug, persona, description, coverURL, totalSegments
    // Does NOT return: fileURL, fileBlobKey, segments
  },
});
```

### Private Query (Auth Required):
```typescript
export const getById = query({
  args: { bookId: v.id("books") },
  handler: async (ctx, args) => {
    // Returns full book data including fileURL, segments
  },
});
```

---

## 5. Mistral AI Auto-Description ✅

**Action in `convex/books.ts`:**
- `generateDescription` - Uses Mistral API to generate SEO descriptions from book content
- Triggered after book segments are saved

---

## 6. Middleware & Privacy Line ✅

**Created `middleware.ts`:**
```typescript
const isPublicRoute = createRouteMatcher([
  "/",
  "/sign-in(.*)",
  "/sign-up(.*)",
  "/books(.*)",  // Public - SEO landing pages
  "/books",
]);

const isProtectedRoute = createRouteMatcher([
  "/read(.*)",       // Protected - full book content
  "/dashboard(.*)",  // Protected - user dashboard
  "/profile(.*)",    // Protected - user profile
]);
```

---

## 7. Frontend Integration ✅

### Created `app/ConvexClientProvider.tsx`:
```typescript
"use client";
import { ConvexProvider, ConvexReactClient } from "convex/react";

const convex = new ConvexReactClient(process.env.NEXT_PUBLIC_CONVEX_URL!);

export function ConvexClientProvider({ children }) {
  return <ConvexProvider client={convex}>{children}</ConvexProvider>;
}
```

### Updated `app/layout.tsx`:
- Wrapped with `ConvexClientProvider`

---

## 8. Route Split (Privacy Line) ✅

### Public Landing Page: `/books/[slug]`
- Uses `fetchQuery(api.books.getPublicBook)` - only returns metadata
- Shows: title, author, description, cover, persona
- Contains `generateMetadata` for SEO

### Protected Reader: `/read/[id]`
- Uses `fetchQuery(api.books.getById)` - requires auth
- Shows: full VapiControls with voice AI
- Has `robots: { index: false }` in metadata

---

## 9. SEO Automation ✅

### Created `app/sitemap.ts`:
- Dynamically queries all books from Convex
- Generates URLs for `/books/[slug]`

### Created `app/robots.ts`:
- Allows: `/`, `/books`
- Disallows: `/api/`, `/dashboard/`, `/read/`, `/profile/`, `/subscriptions/`

### Updated `app/layout.tsx`:
- Added OpenGraph metadata

---

## 10. Cleanup ✅

**Removed from `package.json`:**
- `mongoose`
- `mongodb`

**Updated `.env`:**
- Commented out `MONGODB_URI`
- Added `NEXT_PUBLIC_BASE_URL`

---

## Migration Checklist

- [x] Run `npx convex dev` to initialize Convex
- [x] Create `convex/schema.ts` with schema
- [x] Create `convex/books.ts` with queries/mutations
- [x] Create `convex/bookSegments.ts`
- [x] Create `convex/voiceSessions.ts`
- [x] Create `app/ConvexClientProvider.tsx`
- [x] Update `app/layout.tsx` to wrap with provider
- [x] Create `middleware.ts` with Clerk protection
- [x] Update `/books/[slug]` as public landing page
- [x] Create protected `/read/[id]` route
- [x] Add `generateMetadata` for SEO
- [x] Create `sitemap.ts` and `robots.ts`
- [x] Remove MongoDB environment variables from `.env`
- [x] Uninstall mongoose/mongodb packages

---

## Remaining Tasks

1. **Run `npm install`** to update dependencies after removing mongoose/mongodb
2. **Test the application** - ensure all routes work correctly
3. **Update remaining Server Actions** - any actions in `lib/actions/` that need to be converted to Convex mutations
4. **Convex Storage migration** - update file upload logic to use Convex Storage instead of Vercel Blob

---

## Notes

1. **Auth**: Using Clerk. Convex functions use `ctx.auth.getUserIdentity()` for authenticated operations.

2. **Subscriptions**: The subscription logic should be moved to Convex mutations.

3. **File Storage**: Convex Storage fields added to schema. File upload logic needs to be updated to use `ctx.storage.generateUploadUrl()`.
