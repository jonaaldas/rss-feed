import { Context, MiddlewareHandler } from "hono";
import { auth } from "../../lib/auth";
import { AuthVariables, SessionUser, SessionData } from "../types/auth.types";

export type { SessionUser, SessionData, AuthVariables };

export const requireAuth: MiddlewareHandler<{
  Variables: AuthVariables;
}> = async (c, next) => {
  const session = await auth.api.getSession({ headers: c.req.raw.headers });

  if (!session) {
    return c.json(
      {
        error: "Unauthorized",
        message: "Authentication required",
      },
      401
    );
  }

  c.set("user", session.user);
  c.set("session", session.session);

  return next();
};
