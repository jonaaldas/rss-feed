import { Hono } from "hono";
import { serveStatic } from "@hono/node-server/serve-static";
import { cors } from "hono/cors";
import { AuthVariables } from "./middlewate/auth";
import { logger } from "hono/logger";
import authRouter from "./routes/auth";
import rssRouter from "./routes/rss";
import { serve } from "@hono/node-server";

const app = new Hono<{ Variables: AuthVariables }>();

app.use(logger());

const apiRoutes = new Hono<{ Variables: AuthVariables }>()
  .use(
    cors({
      origin: [
        "http://localhost:5173",
        "http://localhost:3000",
        "http://65.109.128.10:9595",
      ],
      allowHeaders: ["Content-Type", "Authorization"],
      allowMethods: ["POST", "GET", "OPTIONS"],
      exposeHeaders: ["Content-Length"],
      maxAge: 600,
      credentials: true,
    })
  )
  .get("/hello", (c) => c.json({ message: "Hello World" }))
  .get("/ping", (c) => c.json({ message: "pong" }))
  .route("/auth", authRouter)
  .route("/rss", rssRouter);

app.route("/api", apiRoutes);

app.use("/*", serveStatic({ root: "./frontend/dist" }));
app.use("/*", serveStatic({ path: "./frontend/dist/index.html" }));

export type AppType = typeof apiRoutes;

serve(
  {
    fetch: app.fetch,
    port: 9595,
  },
  (info) => {
    console.log(`Server is running on http://localhost:${info.port}`);
  }
);
