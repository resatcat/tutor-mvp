import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { magicLink } from "better-auth/plugins";
import { Resend } from "resend";
import { db } from "@/db/db";

const resend = new Resend(process.env.RESEND_API_KEY);

// betterAuth() returns the central auth instance.
// You'll import it in your route handler, server actions, and middleware.
export const auth = betterAuth({

  // Tell better-auth to use our Drizzle DB instance.
  // "pg" = PostgreSQL. better-auth auto-detects the schema we'll create below.
  database: drizzleAdapter(db, {
    provider: "pg",
  }),

  // The plugin that enables magic-link sign-in.
  // sendMagicLink runs server-side every time a user requests a sign-in link.
  plugins: [
    magicLink({
      // expiresIn defaults to 5 minutes. For parents who might
      // open email on a different device, 15 minutes is friendlier.
      expiresIn: 60 * 15, // 15 minutes in seconds

      sendMagicLink: async ({ email, url }) => {
        await resend.emails.send({
          from: "onboarding@resend.dev",
          to: email,
          subject: "Вход в Знаток",
          html: `
            <div style="font-family: system-ui, sans-serif; max-width: 480px; margin: 0 auto;">
              <h2 style="color: #2563eb;">Войти в Знаток</h2>
              <p>Нажмите кнопку ниже, чтобы войти в свой аккаунт:</p>
              <p>
                <a href="${url}" style="display: inline-block; background: #2563eb; color: white; padding: 12px 24px; border-radius: 8px; text-decoration: none; font-weight: 600;">
                  Войти
                </a>
              </p>
              <p style="color: #6b7280; font-size: 14px;">
                Ссылка действует 15 минут. Если вы не запрашивали вход — просто проигнорируйте это письмо.
              </p>
            </div>
          `,
        });
      },
    }),
  ],
});