"use client";

import { useState } from "react";
import { addToWaitlist } from "../actions/waitlist";

export default function WaitlistForm() {
  const [email, setEmail] = useState<string>("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error" | "duplicate">("idle");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");

    const result = await addToWaitlist(email);

    if (result.success) {
      setStatus("success");
    } else if (result.error === "already_registered") {
      setStatus("duplicate");
    } else {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <p className="text-green-600 font-medium">
        ✓ Вы в списке! Напишем, когда откроем доступ.
      </p>
    );
  }

  if (status === "duplicate") {
    return (
      <p className="text-blue-600 font-medium">
        Вы уже в списке — скоро напишем!
      </p>
    );
  }

  return (
    <div className="space-y-2">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col sm:flex-row gap-3 w-full max-w-md mx-auto"
      >
        <input
          type="email"
          required
          placeholder="ваш@email.ru"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={status === "loading"}
          className="flex-1 border border-gray-300 rounded-xl px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
        />
        <button
          type="submit"
          disabled={status === "loading"}
          className="bg-blue-600 text-white px-6 py-3 rounded-xl text-base font-medium hover:bg-blue-700 transition-colors whitespace-nowrap disabled:opacity-50"
        >
          {status === "loading" ? "Отправляем..." : "Хочу попробовать"}
        </button>
      </form>
      {status === "error" && (
        <p className="text-red-500 text-sm text-center">
          Что-то пошло не так. Попробуйте ещё раз.
        </p>
      )}
    </div>
  );
}