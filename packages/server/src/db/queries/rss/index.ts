import db from "@/db/index";
import { RssColumns, rssFeed, rssFeedInsertSchema } from "@/db/schema";
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

export const saveRssFeed = async (
  rssFeedValues: Omit<RssColumns, "createdAt" | "updatedAt">
) => {
  const validatedRssFeedValues = rssFeedInsertSchema.parse(rssFeedValues);
  try {
    const newRssFeed = await db
      .insert(rssFeed)
      .values(validatedRssFeedValues)
      .returning();
    return newRssFeed;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to save RSS feed");
  }
};
