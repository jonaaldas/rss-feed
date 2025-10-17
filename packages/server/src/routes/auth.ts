import { Hono } from "hono";
import { requireAuth, AuthVariables } from "../middlewate/auth";
import { auth } from "../../lib/auth";

const router = new Hono<{ Variables: AuthVariables }>();

router
  .get("/session", requireAuth, (c) => {
    const session = c.get("session");
    const user = c.get("user");

    return c.json({
      session,
      user,
    });
  })
  .on(["POST", "GET"], "/*", (c) => auth.handler(c.req.raw));

export default router;
