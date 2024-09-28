/* prettier-ignore-start */

/* eslint-disable */
/**
 * Generated `api` utility.
 *
 * THIS CODE IS AUTOMATICALLY GENERATED.
 *
 * To regenerate, run `npx convex dev`.
 * @module
 */

import type {
  ApiFromModules,
  FilterApi,
  FunctionReference,
} from "convex/server";
import type * as auth from "../auth.js";
import type * as handlers_achievements from "../handlers/achievements.js";
import type * as handlers_boxes from "../handlers/boxes.js";
import type * as handlers_users from "../handlers/users.js";
import type * as http from "../http.js";
import type * as running from "../running.js";
import type * as schemas_achievements from "../schemas/achievements.js";
import type * as schemas_boxes from "../schemas/boxes.js";
import type * as schemas_index from "../schemas/index.js";
import type * as schemas_running from "../schemas/running.js";
import type * as schemas_users from "../schemas/users.js";

/**
 * A utility for referencing Convex functions in your app's API.
 *
 * Usage:
 * ```js
 * const myFunctionReference = api.myModule.myFunction;
 * ```
 */
declare const fullApi: ApiFromModules<{
  auth: typeof auth;
  "handlers/achievements": typeof handlers_achievements;
  "handlers/boxes": typeof handlers_boxes;
  "handlers/users": typeof handlers_users;
  http: typeof http;
  running: typeof running;
  "schemas/achievements": typeof schemas_achievements;
  "schemas/boxes": typeof schemas_boxes;
  "schemas/index": typeof schemas_index;
  "schemas/running": typeof schemas_running;
  "schemas/users": typeof schemas_users;
}>;
export declare const api: FilterApi<
  typeof fullApi,
  FunctionReference<any, "public">
>;
export declare const internal: FilterApi<
  typeof fullApi,
  FunctionReference<any, "internal">
>;

/* prettier-ignore-end */
