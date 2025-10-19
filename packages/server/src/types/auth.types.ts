import { auth } from "../../lib/auth";

export type SessionUser = typeof auth.$Infer.Session.user;
export type SessionData = typeof auth.$Infer.Session.session;

export interface AuthVariables {
  user: SessionUser | null;
  session: SessionData | null;
}
