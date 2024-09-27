import { defineTable } from "convex/server";
import { v } from "convex/values";

export const achievements = {
	achievements: defineTable({
		name: v.string(),
		description: v.string(),
		timeInterval: v.string(),
		from: v.string(),
		to: v.string(),
		boxColor: v.array(v.string()),
		createdBy: v.string(),
		updatedAt: v.string(),
	}),
};
