import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import * as schema from "./schema";

// neon() creates a SQL executor using Neon's HTTP transport.
// This is the right driver for serverless functions — it doesn't maintain
// a persistent connection (which would cause connection pool exhaustion
// in a serverless environment where hundreds of function instances can
// spin up simultaneously).
const sql = neon(process.env.POSTGRES_URL!);

// drizzle() wraps the SQL executor with the ORM layer.
// Passing `schema` enables relational queries (joining tables by relationship
// rather than raw SQL joins). You'll use this in Block 5 onwards.
export const db = drizzle(sql, { schema });