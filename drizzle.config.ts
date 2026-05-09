import type { Config } from "drizzle-kit";

export default {
  // Where your schema files live — Drizzle reads these to understand your tables
  schema: "./db/schema.ts",

  // Where generated migration SQL files will be stored
  out: "./db/migrations",

  // Which database dialect we're using
  dialect: "postgresql",

  // The connection string — read from environment variables, never hardcoded
  dbCredentials: {
    url: process.env.POSTGRES_URL!,
  },
} satisfies Config;