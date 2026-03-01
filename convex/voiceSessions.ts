import { query, mutation } from "./_generated/server";
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

export const getByClerkId = query({
  args: { clerkId: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("voiceSessions")
      .withIndex("by_clerkId", (q) => q.eq("clerkId", args.clerkId))
      .order("desc")
      .collect();
  },
});

export const getByClerkIdAndBillingPeriod = query({
  args: { clerkId: v.string(), billingPeriodStart: v.number() },
  handler: async (ctx, args) => {
    const sessions = await ctx.db
      .query("voiceSessions")
      .withIndex("by_clerk_billing", (q) => 
        q.eq("clerkId", args.clerkId).eq("billingPeriodStart", args.billingPeriodStart)
      )
      .collect();
    return sessions;
  },
});

export const create = mutation({
  args: {
    clerkId: v.string(),
    bookId: v.id("books"),
    startedAt: v.number(),
    billingPeriodStart: v.number(),
    durationSeconds: v.number(),
  },
  handler: async (ctx, args) => {
    const plan = getPlanFromClerkId(args.clerkId);
    const limits = PLAN_LIMITS[plan];

    const sessionsThisMonth = await ctx.db
      .query("voiceSessions")
      .withIndex("by_clerk_billing", (q) =>
        q.eq("clerkId", args.clerkId).eq("billingPeriodStart", args.billingPeriodStart)
      )
      .collect();

    if (sessionsThisMonth.length >= limits.maxSessionsPerMonth) {
      return {
        success: false,
        error: `You have reached the monthly session limit for your ${plan} plan (${limits.maxSessionsPerMonth}). Please upgrade for more sessions.`,
        isBillingError: true,
      };
    }

    const id = await ctx.db.insert("voiceSessions", {
      clerkId: args.clerkId,
      bookId: args.bookId,
      startedAt: args.startedAt,
      billingPeriodStart: args.billingPeriodStart,
      durationSeconds: args.durationSeconds,
      endedAt: undefined,
    });

    return { success: true, sessionId: id, maxDurationMinutes: limits.maxDurationPerSession };
  },
});

export const endSession = mutation({
  args: { sessionId: v.id("voiceSessions"), durationSeconds: v.number() },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.sessionId, {
      endedAt: Date.now(),
      durationSeconds: args.durationSeconds,
    });
  },
});

export const getSessionCountThisMonth = query({
  args: { clerkId: v.string(), billingPeriodStart: v.number() },
  handler: async (ctx, args) => {
    const sessions = await ctx.db
      .query("voiceSessions")
      .withIndex("by_clerk_billing", (q) => 
        q.eq("clerkId", args.clerkId).eq("billingPeriodStart", args.billingPeriodStart)
      )
      .collect();
    return sessions.length;
  },
});
