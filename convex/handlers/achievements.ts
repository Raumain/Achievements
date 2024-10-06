import { v } from "convex/values";
import { mutation, query } from "../_generated/server";
import { getAuthUserId } from "@convex-dev/auth/server";

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

export const create = mutation({
	args: {
		name: v.string(),
		description: v.string(),
		category: v.string(),
		timeInterval: v.union(
			v.literal("day"),
			v.literal("week"),
			v.literal("month"),
		),
		startDate: v.string(), // ISO date string
		endDate: v.string(), // ISO date string
		boxColor: v.array(v.string()),
		isPinned: v.boolean(),
	},
	handler: async (ctx, args) => {
		const userId = await getAuthUserId(ctx);
		const start = new Date(args.startDate);
		const end = new Date(args.endDate);
		let totalBoxes = 0;

		switch (args.timeInterval) {
			case "day":
				totalBoxes = Math.ceil(
					(end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24),
				);
				break;
			case "week":
				totalBoxes = Math.ceil(
					(end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24 * 7),
				);
				break;
			case "month":
				totalBoxes =
					(end.getFullYear() - start.getFullYear()) * 12 +
					(end.getMonth() - start.getMonth()) +
					1;
				break;
			default:
				throw new Error("Intervalle de temps invalide");
		}
		const achievementId = await ctx.db.insert("achievements", {
			...args,
			totalBoxes,
			createdBy: userId as string,
			updatedAt: new Date().toISOString(),
		});
		Array.from({ length: totalBoxes }).map(async (_, i) => {
			const currentDate = new Date(args.startDate);
			switch (args.timeInterval) {
				case "day":
					currentDate.setDate(currentDate.getDate() + i);
					break;
				case "week":
					currentDate.setDate(currentDate.getDate() + i * 7);
					break;
				case "month":
					currentDate.setMonth(currentDate.getMonth() + i);
					break;
			}
			const boxDate = currentDate.toISOString().split("T")[0];
			await ctx.db.insert("boxes", {
				color: "#242327",
				date: boxDate,
				achievementId,
			});
		});
	},
});

export const update = mutation({
	args: {
		id: v.id("achievements"),
		achievement: v.object({
			name: v.optional(v.string()),
			description: v.optional(v.string()),
			category: v.optional(v.string()),
			timeInterval: v.optional(
				v.union(v.literal("day"), v.literal("week"), v.literal("month")),
			),
			startDate: v.optional(v.string()), // ISO date string
			endDate: v.optional(v.string()), // ISO date string
			boxColor: v.optional(v.array(v.string())),
			isPinned: v.optional(v.boolean()),
		}),
	},
	handler: async (ctx, args) => {
		return await ctx.db.patch(args.id, {
			...args.achievement,
			updatedAt: new Date().toISOString(),
		});
	},
});

export const deleteById = mutation({
	args: { id: v.id("achievements") },
	handler: async (ctx, args) => {
		return await ctx.db.delete(args.id);
	},
});
