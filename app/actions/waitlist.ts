"use server";

import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function addToWaitlist(email: string): Promise<{ success: boolean; error?: string }> {
  if (!email || !email.includes("@")) {
    return { success: false, error: "Invalid email" };
  }

  try {
    await resend.emails.send({
      from: "onboarding@resend.dev",       // Resend's sandbox address (works without a custom domain)
      to: "resatcat@gmail.com",     // ← replace with YOUR email
      subject: "Новая заявка на Знаток",
      html: `<p>Новый пользователь хочет попробовать: <strong>${email}</strong></p>`,
    });

    return { success: true };
  } catch (err) {
    console.error("Resend error:", err);
    return { success: false, error: "Failed to send" };
  }
}