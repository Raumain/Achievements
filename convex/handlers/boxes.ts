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
export const getFive = query({
	args: { achievementId: v.id("achievements") },
	handler: async (ctx, args) => {
		const today = new Date().toISOString().split("T")[0];

		const pastAndTodayBoxes = await ctx.db
			.query("boxes")
			.filter((q) => q.eq(q.field("achievementId"), args.achievementId))
			.filter((q) => q.lte(q.field("date"), today))
			.order("desc")
			.take(5);

		let totalBoxes: typeof pastAndTodayBoxes = [];

		if (pastAndTodayBoxes.length === 5) {
			totalBoxes = pastAndTodayBoxes.reverse();
		} else {
			const futureBoxes = await ctx.db
				.query("boxes")
				.filter((q) => q.eq(q.field("achievementId"), args.achievementId))
				.filter((q) => q.gt(q.field("date"), today))
				.order("asc")
				.take(5 - pastAndTodayBoxes.length);

			totalBoxes = [...pastAndTodayBoxes.reverse(), ...futureBoxes];
		}
		return totalBoxes;
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

export const update = mutation({
	args: {
		id: v.id("boxes"),
		box: v.object({
			color: v.optional(v.string()),
			content: v.optional(v.string()),
		}),
	},
	handler: async (ctx, args) => {
		return await ctx.db.patch(args.id, args.box);
	},
});
