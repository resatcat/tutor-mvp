"use server";

import { db } from "@/db/db";
import { waitlistSignups } from "@/db/schema";
import { Resend } from "resend";

// The @ alias means "from the root of the project".
// @/db/db is the same as ../../db/db — but it never breaks
// regardless of how deeply nested the file importing it is.
// This alias is configured in tsconfig.json (Next.js sets it up automatically).

const resend = new Resend(process.env.RESEND_API_KEY);

export async function addToWaitlist(
  email: string
): Promise<{ success: boolean; error?: string }> {
  
  // Basic format validation before hitting the database.
  // The HTML `required` and `type="email"` on the input handle most cases,
  // but server-side validation is essential — anyone can send a POST request
  // directly to your endpoint bypassing your form entirely.
  if (!email || !email.includes("@")) {
    return { success: false, error: "Invalid email" };
  }

  try {
    // Insert the email into the database.
    // Drizzle generates: INSERT INTO waitlist_signups (email) VALUES ($1)
    // The database fills in id and created_at automatically.
    await db.insert(waitlistSignups).values({ email });

    // Send the notification email — now secondary to the DB write.
    // If this fails, the signup is still recorded. We wrap in try/catch
    // so an email failure doesn't appear to the user as a signup failure.
    try {
      await resend.emails.send({
        from: "onboarding@resend.dev",
        to: "your-real-email@gmail.com",
        subject: "Новая заявка на Знаток",
        html: `<p>Новый пользователь: <strong>${email}</strong></p>`,
      });
    } catch (emailErr) {
      // Log it, but don't surface it to the user.
      console.error("Email notification failed:", emailErr);
    }

    return { success: true };

  } catch (err: unknown) {
    // PostgreSQL sends a specific error code for unique constraint violations.
    // Code "23505" means "duplicate key value violates unique constraint" —
    // i.e., this email is already in the database.
    // We give a friendly message instead of a generic error.
    if (
      err instanceof Error &&
      "code" in err &&
      (err as { code: string }).code === "23505"
    ) {
      return { success: false, error: "already_registered" };
    }

    console.error("Waitlist insert error:", err);
    return { success: false, error: "server_error" };
  }
}