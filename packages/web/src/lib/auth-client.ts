import { createAuthClient } from "better-auth/vue";

const baseURL = import.meta.env.VITE_API_BASE_URL || "/api/auth";

export const authClient = createAuthClient({
  baseURL,
});

export const { signIn, signUp, useSession } = authClient;
