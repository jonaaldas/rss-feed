import { Hono } from "hono";
import { serveStatic } from "hono/bun";
import { cors } from "hono/cors";
import { AuthVariables } from "./middlewate/auth";
import { logger } from "hono/logger";
import authRoutes from "./routes/auth";
import rssRoutes from "./routes/rss";

const router = new Hono<{ Variables: AuthVariables }>();

router
  .use(logger())
  .use(
    cors({
      origin: ["http://localhost:5173", "http://localhost:3000"],
      allowHeaders: ["Content-Type", "Authorization"],
      allowMethods: ["POST", "GET", "OPTIONS"],
      exposeHeaders: ["Content-Length"],
      maxAge: 600,
      credentials: true,
    })
  )
  .get("/", (c) => c.json({ message: "Hello World" }))
  .basePath("/api")
  .get("/ping", (c) => c.json({ message: "pong" }))
  .route("/auth", authRoutes)
  .route("/rss", rssRoutes);

export type AppType = typeof router;

export default {
  port: 9595,
  fetch: router.fetch,
};
