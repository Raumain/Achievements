import { defineTable } from "convex/server";
import { v } from "convex/values";

export const achievements = {
	achievements: defineTable({
		name: v.string(),
		description: v.string(),
		category: v.optional(v.string()),
		timeInterval: v.union(v.literal("day"), v.literal("week"), v.literal("month")),
		startDate: v.string(), // ISO date string
		endDate: v.string(), // ISO date string
		totalBoxes: v.number(),
		boxColor: v.array(v.string()),
		createdBy: v.string(),
		updatedAt: v.string(),
	}),
};
