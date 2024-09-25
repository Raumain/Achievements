import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";
import { authTables } from "@convex-dev/auth/server";

export default defineSchema({
	...authTables,
	running: defineTable({
		weekNumber: v.number(),
		isFilled: v.boolean(),
		month: v.string(),
		startDate: v.string(),
		endDate: v.string(),
	}),
});
