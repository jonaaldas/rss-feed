import { Hono } from "hono";
import { serveStatic } from "@hono/node-server/serve-static";
import { cors } from "hono/cors";
import { AuthVariables, requireAuth } from "./middlewate/auth";
import { logger } from "hono/logger";
import authRouter from "./routes/auth";
import rssRouter from "./routes/rss";

const app = new Hono<{ Variables: AuthVariables }>();

app.use(logger());
app.use(
  cors({
    origin: ["http://localhost:5173", "http://localhost:3000"],
    allowHeaders: ["Content-Type", "Authorization"],
    allowMethods: ["POST", "GET", "OPTIONS"],
    exposeHeaders: ["Content-Length"],
    maxAge: 600,
    credentials: true,
  })
);

const apiRoutes = new Hono<{ Variables: AuthVariables }>()
  .get("/hello", (c) => c.json({ message: "Hello World" }))
  .get("/ping", (c) => c.json({ message: "pong" }))
  .route("/auth", authRouter)
  .route("/rss", rssRouter);

app.route("/api", apiRoutes);

app.get("/*", serveStatic({ root: "./frontend/dist" }));
app.get("/*", serveStatic({ path: "./frontend/dist/index.html" }));

export type AppType = typeof apiRoutes;

export default {
  port: 9595,
  fetch: app.fetch,
};
