"use client";

import { useState } from "react";

export default function WaitlistForm() {
  const [email, setEmail] = useState<string>("");
  const [submitted, setSubmitted] = useState<boolean>(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    // TODO Block 3: save to database
    console.log("Email submitted:", email);
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <p className="text-green-600 font-medium">
        ✓ Вы в списке! Напишем, когда откроем доступ.
      </p>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 w-full max-w-md mx-auto">
      <input
        type="email"
        required
        placeholder="ваш@email.ru"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="flex-1 border border-gray-300 rounded-xl px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <button
        type="submit"
        className="bg-blue-600 text-white px-6 py-3 rounded-xl text-base font-medium hover:bg-blue-700 transition-colors whitespace-nowrap"
      >
        Хочу попробовать
      </button>
    </form>
  );
}