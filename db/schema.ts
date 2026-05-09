export * from "./auth-schema";
import { pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";

// pgTable() defines a PostgreSQL table.
// First argument: the table name as it will appear in the database.
// Second argument: an object where each key is a column name and each
//                  value is a column definition.

export const waitlistSignups = pgTable("waitlist_signups", {

  // serial: auto-incrementing integer. PostgreSQL generates this value
  // automatically — you never insert an id manually.
  // primaryKey(): marks this as the unique identifier for each row.
  id: serial("id").primaryKey(),

  // text: variable-length string. notNull() means the database will
  // reject any insert that doesn't include an email value.
  // unique(): the database enforces no two rows can have the same email.
  // If you try to insert a duplicate, you'll get a specific error you
  // can catch and handle gracefully ("you're already on the list").
  email: text("email").notNull().unique(),

  // timestamp: stores a date + time value.
  // defaultNow(): if you don't supply a value on insert, the database
  // automatically uses the current server time. This means you'll always
  // know exactly when each signup happened without remembering to pass a date.
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// TypeScript type for a row selected from this table.
// Drizzle infers this from your schema automatically.
// You'll use this type to annotate function return values and component props.
export type WaitlistSignup = typeof waitlistSignups.$inferSelect;

// TypeScript type for a new row being inserted.
// Excludes `id` and `createdAt` since those are auto-generated.
// When you insert a new signup, TypeScript will require exactly { email: string }.
export type NewWaitlistSignup = typeof waitlistSignups.$inferInsert;