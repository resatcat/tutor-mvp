"use client";

import { signOut } from "@/lib/auth-client";
import { useRouter } from "next/navigation";

export default function SignOutButton() {
  const router = useRouter();

  async function handleSignOut() {
    await signOut();
    // After sign-out, refresh the router so Server Components re-render
    // (the navbar will now read no session and switch to "Sign in")
    router.refresh();
    router.push("/");
  }

  return (
    <button
      onClick={handleSignOut}
      className="text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors"
    >
      Выйти
    </button>
  );
}