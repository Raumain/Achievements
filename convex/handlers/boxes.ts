import { v } from "convex/values";
import { mutation, query } from "../_generated/server";

export const getAll = query({
	args: { achievementId: v.id("achievements") },
	handler: async (ctx, args) => {
		return await ctx.db
			.query("boxes")
			.filter((q) => q.eq(q.field("achievementId"), args.achievementId))
			.collect();
	},
});

export const create = mutation({
	args: {
		boxes: v.array(
			v.object({
				color: v.string(),
				date: v.string(),
				achievementId: v.id("achievements"),
			}),
		),
	},
	handler: async (ctx, args) => {
		return args.boxes.map(async (box) => await ctx.db.insert("boxes", box));
	},
});
