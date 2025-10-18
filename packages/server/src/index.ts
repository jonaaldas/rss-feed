import { Hono } from "hono";
import { serveStatic } from "hono/bun";
import { cors } from "hono/cors";
import { AuthVariables, requireAuth } from "./middlewate/auth";
import { logger } from "hono/logger";
import authRouter from "./routes/auth";
import rssRouter from "./routes/rss";

const app = new Hono<{ Variables: AuthVariables }>();

const router = app
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
  .get("/hello", (c) => c.json({ message: "Hello World" }))
  .basePath("/api")
  .get("/ping", (c) => c.json({ message: "pong" }))
  .route("/auth", authRouter)
  .route("/rss", rssRouter);

export type AppType = typeof router;

export default {
  port: 9595,
  fetch: app.fetch,
};
