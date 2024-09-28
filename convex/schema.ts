import { defineSchema } from "convex/server";
import { authTables } from "@convex-dev/auth/server";
import { achievements, boxes, running, users } from "./schemas";

export default defineSchema({
	...authTables,
	...users,
	...running,
	...achievements,
	...boxes,
});
