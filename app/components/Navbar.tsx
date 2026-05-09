// Note: this is now an ASYNC Server Component because we read session data.
// Server Components can be async and use await directly — no useState, no useEffect.

import Link from "next/link";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import SignOutButton from "./SignOutButton";

export default async function Navbar() {

  // Read the session for THIS request.
  // If the user is logged in, session.user.email exists.
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-100 bg-white/80 backdrop-blur-sm">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">

          <Link href="/" className="text-xl font-bold text-blue-600 tracking-tight">
            Знаток
          </Link>

          <nav className="hidden sm:flex items-center gap-6 text-sm font-medium text-gray-600">
            <Link href="/#how-it-works" className="hover:text-gray-900 transition-colors">
              Как это работает
            </Link>
            <Link href="/about" className="hover:text-gray-900 transition-colors">
              О проекте
            </Link>
          </nav>

          {/* Auth-aware right side: 
              - If logged in: show email + sign-out button
              - If not: show sign-in link */}
          <div className="flex items-center gap-4">
            {session ? (
              <>
                <span className="hidden sm:inline text-sm text-gray-500">
                  {session.user.email}
                </span>
                <SignOutButton />
              </>
            ) : (
              <Link
                href="/sign-in"
                className="bg-blue-600 text-white text-sm font-medium px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Войти
              </Link>
            )}
          </div>

        </div>
      </div>
    </header>
  );
}