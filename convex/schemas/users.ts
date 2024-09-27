import { defineTable } from "convex/server";
import { v } from "convex/values";

export const users = {
	users: defineTable({
		name: v.string(),
		image: v.optional(v.string()),
		email: v.string(),
		emailVerificationTime: v.optional(v.number()),
		provider: v.optional(v.string()),
	}).index("email", ["email"]),
};
