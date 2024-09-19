import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
	running: defineTable({
		weekNumber: v.number(),
		isFilled: v.boolean(),
		month: v.string(),
		startDate: v.string(),
		endDate: v.string(),
	}),
});
