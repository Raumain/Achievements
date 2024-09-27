import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const getById = query({
	args: { id: v.id("achievements") },
	handler: async (ctx, args) => {
		return await ctx.db.get(args.id);
	},
});

export const getAll = query({
	args: { userId: v.string() },
	handler: async (ctx, args) => {
		return await ctx.db
			.query("achievements")
			.filter((q) => q.eq(q.field("createdBy"), args.userId))
			.collect();
	},
});

export const update = mutation({
	args: {
		id: v.id("achievements"),
		achievement: v.object({
			name: v.string(),
			description: v.string(),
			category: v.string(),
		}),
	},
	handler: async (ctx, args) => {
		return await ctx.db.patch(args.id, args.achievement);
	},
});

export const deleteById = mutation({
	args: { id: v.id("achievements") },
	handler: async (ctx, args) => {
		return await ctx.db.delete(args.id);
	},
});
