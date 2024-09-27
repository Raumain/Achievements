import { defineTable } from "convex/server";
import { v } from "convex/values";

export const running = {
	running: defineTable({
		weekNumber: v.number(),
		isFilled: v.boolean(),
		month: v.string(),
		startDate: v.string(),
		endDate: v.string(),
	}),
};
