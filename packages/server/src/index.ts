import { Hono } from "hono";
import { serveStatic } from "hono/bun";
import { cors } from "hono/cors";
import { AuthVariables } from "./middlewate/auth";
import { logger } from "hono/logger";
import authRoutes from "./routes/auth";

const router = new Hono<{ Variables: AuthVariables }>();

router
  .use(logger())
  .use(
    "*", // or replace with "*" to enable cors for all routes
    cors({
      origin: "http://localhost:5173", // replace with your origin
      allowHeaders: ["Content-Type", "Authorization"],
      allowMethods: ["POST", "GET", "OPTIONS"],
      exposeHeaders: ["Content-Length"],
      maxAge: 600,
      credentials: true,
    })
  )
  .basePath("/api")
  .route("/auth", authRoutes)
  .get("/ping", (c) => c.json({ message: "pong" }))
  .get("*", serveStatic({ root: "./frontend/dist" }))
  .get("*", serveStatic({ path: "./frontend/dist/index.html" }));

export type AppType = typeof router;

export default {
  port: 9595,
  hostname: "127.0.0.1",
  fetch: router.fetch,
};
