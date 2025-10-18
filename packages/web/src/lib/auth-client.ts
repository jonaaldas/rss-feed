import { createAuthClient } from "better-auth/vue";
export const authClient = createAuthClient({
  baseURL: "http://localhost:5173/api/auth",
});

export const { signIn, signUp, useSession } = authClient;
