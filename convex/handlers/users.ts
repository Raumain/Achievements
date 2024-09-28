import { v } from "convex/values";
import { mutation, query } from "../_generated/server";
import { getAuthUserId } from "@convex-dev/auth/server";

export const get = query({
	args: {},
	handler: async (ctx) => {
		const userId = await getAuthUserId(ctx);
		return userId !== null ? ctx.db.get(userId) : null;
	},
});

export const update = mutation({
	args: {
		name: v.string(),
		email: v.string(),
	},
	handler: async (ctx, { name, email }) => {
		const userId = await getAuthUserId(ctx);
		if (userId) {
			await ctx.db.patch(userId, {
				name,
				email,
			});
		}
	},
});
