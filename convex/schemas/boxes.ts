import { defineTable } from "convex/server";
import { v } from "convex/values";

export const boxes = {
	boxes: defineTable({
		color: v.string(),
		content: v.optional(v.string()),
		date: v.string(),
		achievementId: v.id("achievements"),
	}),
};
