import { defineSchema } from "convex/server";
import { authTables } from "@convex-dev/auth/server";
import { achievements, running } from "./schemas";

export default defineSchema({
	...authTables,
	...running,
	...achievements,
});
