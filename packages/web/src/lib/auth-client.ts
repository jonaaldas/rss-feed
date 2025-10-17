import { createAuthClient } from "better-auth/vue";
export const authClient = createAuthClient({
  baseURL: "http://127.0.0.1:9595",
});

export const { signIn, signUp, useSession } = authClient;
