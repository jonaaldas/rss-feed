import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { env } from "../env";
import db from "../src/db"; // your drizzle instance
import * as authSchema from "../src/db/auth-schema";
export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "pg",
    schema: {
      user: authSchema.user,
      account: authSchema.account,
      session: authSchema.session,
      verification: authSchema.verification,
    },
  }),
  socialProviders: {
    google: {
      clientId: env.GOOLE_CLIENT_ID,
      clientSecret: env.GOOGLE_CLIENT_SECRET,
    },
  },
  trustedOrigins: ["http://localhost:5173", "http://localhost:3000"],
  baseURL: "http://localhost:9595",
});
