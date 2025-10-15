import { Hono } from "hono";
const router = new Hono();

router.get("/", (c) => {
  return c.text("Hello Hono!");
});

export type AppType = typeof router;
export default {
  port: 3000,
  fetch: router.fetch,
};
