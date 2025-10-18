import db from "../index";
import { rssFeed } from "../schema";
import { eq } from "drizzle-orm";

export const getRssFeeds = async (userId: string) => {
  try {
    const rssFeeds = await db
      .select()
      .from(rssFeed)
      .where(eq(rssFeed.userId, userId));
    return rssFeeds;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to get RSS feeds");
  }
};
