import { pgTable, text, timestamp, jsonb, integer } from "drizzle-orm/pg-core";
import { user } from "./auth-schema";
import { createSelectSchema, createInsertSchema } from "drizzle-zod";

export const rssFeed = pgTable("rss_feed", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  userId: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  url: text("url").notNull().unique(),
  title: text("title").notNull(),
  link: text("link").notNull(),
  feedUrl: text("feed_url").notNull(),
  lastBuildDate: timestamp("last_build_date").notNull(),
  itemCount: integer("item_count").default(0).notNull(),
  feedItems: jsonb("feed_items").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .defaultNow()
    .$onUpdate(() => new Date())
    .notNull(),
});

export const rssFeedSelectSchema = createSelectSchema(rssFeed);
export const rssFeedInsertSchema = createInsertSchema(rssFeed).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export type RssColumns = typeof rssFeed.$inferInsert;
