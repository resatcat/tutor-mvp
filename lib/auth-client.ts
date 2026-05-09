// This file is imported by Client Components.
// It contains NO secrets and NO database access.
// It's a thin fetch wrapper that knows how to call /api/auth/* on your server.

import { createAuthClient } from "better-auth/react";
import { magicLinkClient } from "better-auth/client/plugins";

export const authClient = createAuthClient({
  // baseURL tells the client where to send auth requests.
  // In the browser, "/" relative URLs work fine, but better-auth wants the
  // explicit URL so it can construct full URLs on the server side too
  // (server components can also use authClient).
  baseURL: process.env.NEXT_PUBLIC_APP_URL,

  // Client plugins must mirror the server plugins.
  // Without magicLinkClient(), authClient.signIn.magicLink() doesn't exist —
  // it's added by the plugin.
  plugins: [magicLinkClient()],
});

// Re-export commonly-used methods for ergonomic imports.
// Now you can write `import { signIn, signOut, useSession } from "@/lib/auth-client"`
// instead of `authClient.signIn`, `authClient.signOut`, etc.
export const { signIn, signOut, useSession } = authClient;