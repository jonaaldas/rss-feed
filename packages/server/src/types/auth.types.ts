import { auth } from "../../lib/auth";

type GetSessionResponse = Awaited<ReturnType<typeof auth.api.getSession>>;

export type SessionUser = NonNullable<GetSessionResponse>["user"];
export type SessionData = NonNullable<GetSessionResponse>["session"];

export interface AuthVariables {
  user: SessionUser | null;
  session: SessionData | null;
}
