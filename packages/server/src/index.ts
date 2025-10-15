import { Hono } from "hono";
import { serveStatic } from "hono/bun";
const router = new Hono();

router.get("*", serveStatic({ root: "./frontend/dist" }));
router.get("*", serveStatic({ path: "./frontend/dist/index.html" }));

export type AppType = typeof router;

export default {
  port: 9595,
  fetch: router.fetch,
};
