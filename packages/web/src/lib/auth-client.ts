import { createAuthClient } from "better-auth/vue";
const baseURL =
  import.meta.env.VITE_NODE_ENV === "production"
    ? "http://65.109.128.10:9595/api/auth"
    : "http://localhost:5173/api/auth";
export const authClient = createAuthClient({
  baseURL,
});

export const { signIn, signUp, useSession } = authClient;
