import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import Navbar from "../components/Navbar";

// No "use client" — this runs on the server.
// We can read the session synchronously (well, with await) using the request headers.

export default async function DashboardPage() {

  // Get the current session from the request cookies.
  // - If the user has a valid cookie, this returns { user, session }
  // - If not, it returns null
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  // Defence in depth: middleware should already have redirected unauthenticated
  // users, but a Server Component that depends on session data should ALWAYS
  // check directly. This protects against:
  //  - middleware misconfiguration
  //  - someone navigating client-side without a fresh session check
  //  - tokens expiring between middleware and page render
  if (!session) {
    redirect("/sign-in");
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="mx-auto max-w-3xl flex-1 px-4 py-12 w-full">

        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Добро пожаловать, {session.user.email}
        </h1>
        <p className="text-gray-500 mb-8">
          Это ваш личный кабинет. Здесь скоро появится загрузка домашних заданий.
        </p>

        {/* Placeholder for future features */}
        <div className="rounded-2xl border border-dashed border-gray-200 p-12 text-center">
          <p className="text-gray-400">
            🚧 Загрузка задач, история объяснений, прогресс — появятся в следующих версиях.
          </p>
        </div>

      </main>
    </div>
  );
}