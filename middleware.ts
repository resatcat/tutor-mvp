import { NextRequest, NextResponse } from "next/server";

// In the Edge Runtime, we can't import the full Drizzle DB.
// Instead, we make a lightweight fetch to better-auth's session endpoint
// using the request's cookies. This runs fast and doesn't pull in the DB.

export async function middleware(request: NextRequest) {
  // Reach better-auth's session endpoint with the cookies from this request.
  // This avoids importing lib/auth.ts directly (which would pull in the DB).
  const sessionResponse = await fetch(
    new URL("/api/auth/get-session", request.url),
    {
      headers: {
        // Forward the cookie so better-auth can identify the session
        cookie: request.headers.get("cookie") ?? "",
      },
    }
  );

  const session = await sessionResponse.json();

  // No session → kick to sign-in, preserving the original destination
  if (!session || !session.user) {
    const signInUrl = new URL("/sign-in", request.url);
    return NextResponse.redirect(signInUrl);
  }

  // Session valid → continue to the page
  return NextResponse.next();
}

// config.matcher tells Next.js which paths this middleware applies to.
// Match exactly /dashboard and any sub-path (/dashboard/settings, etc).
// Everything else (/, /about, /sign-in, /api/*) skips the middleware entirely.
export const config = {
  matcher: ["/dashboard/:path*"],
};