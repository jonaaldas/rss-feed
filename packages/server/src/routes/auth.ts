import { Hono } from "hono";
import { AuthVariables } from "../middlewate/auth";
import { auth } from "../../lib/auth";

const router = new Hono<{ Variables: AuthVariables }>()
  .on(["POST", "GET"], "/*", (c) => auth.handler(c.req.raw))
  .get("/session", (c) => {
    const session = c.get("session");
    const user = c.get("user");

    return c.json({
      session,
      user,
    });
  });

export default router;
