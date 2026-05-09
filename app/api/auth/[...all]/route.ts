// The folder name [...all] is Next.js syntax for a "catch-all dynamic route".
// Any URL starting with /api/auth/ — no matter how many segments —
// hits this single file. better-auth's handler internally routes them.

import { auth } from "@/lib/auth";
import { toNextJsHandler } from "better-auth/next-js";

// toNextJsHandler converts better-auth's standard Request/Response handler
// into the GET/POST exports Next.js's App Router expects.
export const { POST, GET } = toNextJsHandler(auth);