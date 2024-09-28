import { defineTable } from "convex/server";
import { v } from "convex/values";

export const boxes = {
	boxes: defineTable({
		color: v.string(),
		date: v.string(),
		achivementId: v.id("achievements"),
	}),
};
