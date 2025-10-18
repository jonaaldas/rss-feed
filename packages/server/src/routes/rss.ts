import { Hono } from "hono";
import { requireAuth } from "../middlewate/auth";
import { getRssFeeds, saveRssFeed } from "@/db/queries/rss/index";
import { auth } from "../../lib/auth";
import { fetchRssFeed } from "@/utils/fetch-rss-feed";
import * as z from "zod";
import { validator } from "hono/validator";

const app = new Hono<{
  Variables: {
    user: typeof auth.$Infer.Session.user | null;
    session: typeof auth.$Infer.Session.session | null;
  };
}>()
  .use(requireAuth)
  .get("/", async (c) => {
    const user = c.get("user");
    if (!user) {
      return c.json({ error: "User not found" }, 401);
    }
    const rssFeeds = await getRssFeeds(user.id);
    return c.json({ data: rssFeeds, success: true });
  })
  .post(
    "/save",
    validator("form", (value, c) => {
      const parsed = z
        .object({
          url: z.string(),
        })
        .safeParse(value);
      if (!parsed.success) {
        return c.json({ error: "Invalid URL" }, 400);
      }
      return parsed.data;
    }),
    async (c) => {
      // we get the url
      // we get the feed from the url we sav it
      const user = c.get("user");
      if (!user) {
        return c.json({ error: "User not found" }, 401);
      }
      const url = c.req.valid("form").url;

      const feed = await fetchRssFeed(url);
      const data = {
        userId: user.id,
        url,
        title: feed.title,
        link: feed.link,
        feedUrl: feed.feedUrl,
        lastBuildDate: feed.lastBuildDate,
        feedItems: feed.items,
        itemCount: feed.items.length,
      };
      const rssFeed = await saveRssFeed(data);
      return c.json({ data: rssFeed, success: true });
    }
  )
  .post("/new", async (c) => {
    const url = c.req.query("url");
    if (!url || typeof url !== "string") {
      return c.json({ error: "Invalid URL" }, 400);
    }
    const rssFeed = await fetchRssFeed(url);
    return c.json({ data: rssFeed, success: true });
  });

export default app;
