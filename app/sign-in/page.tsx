"use client";

import { useState } from "react";
import { signIn } from "@/lib/auth-client";
import Link from "next/link";

export default function SignInPage() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "sent" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg("");

    // signIn.magicLink is provided by the magicLinkClient plugin.
    // It POSTs to /api/auth/sign-in/magic-link on your server,
    // which generates the token, stores it in the verification table,
    // and triggers your sendMagicLink callback (which sends the email).
    const { error } = await signIn.magicLink({
      email,
      // callbackURL: where to send the user AFTER they click the link
      //              and the token is verified. Their cookie is set, then
      //              they're redirected here.
      callbackURL: "/dashboard",
    });

    if (error) {
      setStatus("error");
      setErrorMsg(error.message ?? "Что-то пошло не так. Попробуйте ещё раз.");
      return;
    }

    setStatus("sent");
  }

  // Success state — link sent
  if (status === "sent") {
    return (
      <main className="flex min-h-screen items-center justify-center px-4">
        <div className="max-w-md w-full text-center space-y-4">
          <div className="text-5xl">📩</div>
          <h1 className="text-2xl font-bold text-gray-900">Проверьте почту</h1>
          <p className="text-gray-600">
            Мы отправили ссылку для входа на <strong>{email}</strong>.
            Откройте письмо и нажмите кнопку «Войти».
          </p>
          <p className="text-sm text-gray-400">
            Ссылка действует 15 минут. Не пришло письмо? Проверьте спам или{" "}
            <button
              onClick={() => setStatus("idle")}
              className="text-blue-600 underline hover:text-blue-700"
            >
              попробуйте ещё раз
            </button>.
          </p>
        </div>
      </main>
    );
  }

  // Default state — form
  return (
    <main className="flex min-h-screen items-center justify-center px-4">
      <div className="max-w-md w-full space-y-6">

        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold text-gray-900">Войти в Знаток</h1>
          <p className="text-gray-500">
            Введите email — пришлём ссылку для входа.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            type="email"
            required
            placeholder="ваш@email.ru"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={status === "loading"}
            className="w-full border border-gray-300 rounded-xl px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
          />
          <button
            type="submit"
            disabled={status === "loading"}
            className="w-full bg-blue-600 text-white px-6 py-3 rounded-xl text-base font-medium hover:bg-blue-700 transition-colors disabled:opacity-50"
          >
            {status === "loading" ? "Отправляем..." : "Получить ссылку"}
          </button>
          {status === "error" && (
            <p className="text-red-500 text-sm text-center">{errorMsg}</p>
          )}
        </form>

        <p className="text-center text-sm text-gray-400">
          <Link href="/" className="hover:text-gray-600 underline">← Главная</Link>
        </p>

      </div>
    </main>
  );
}