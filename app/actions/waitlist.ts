"use server";

import { db } from "@/db/db";
import { waitlistSignups } from "@/db/schema";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function addToWaitlist(
  email: string
): Promise<{ success: boolean; error?: string }> {
  
  if (!email || !email.includes("@")) {
    return { success: false, error: "Invalid email" };
  }

  try {
    await db.insert(waitlistSignups).values({ email });

    try {
      await resend.emails.send({
        from: "onboarding@resend.dev",
        to: "your-real-email@gmail.com",
        subject: "Новая заявка на Знаток",
        html: `<p>Новый пользователь: <strong>${email}</strong></p>`,
      });
    } catch (emailErr) {
      console.error("Email notification failed:", emailErr);
    }

    return { success: true };

  } catch (err: unknown) {
    const cause = (err as any)?.cause;
    if (cause?.code === "23505") {
      return { success: false, error: "already_registered" };
    }

    console.error("Waitlist insert error:", err);
    return { success: false, error: "server_error" };
  }
}