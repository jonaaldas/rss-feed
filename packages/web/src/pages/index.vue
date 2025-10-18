<script lang="ts">
export const iframeHeight = "800px";
export const description = "A sidebar with collapsible sections.";
</script>

<script setup lang="ts">
import AppSidebar from "@/components/AppSidebar.vue";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { useQuery } from "@pinia/colada";
import { computed, ref, watch } from "vue";
import { client } from "@/lib/api";
import { useRoute, useRouter } from "vue-router";
import ThemeSwitcher from "@/components/theme-switcher.vue";

const route = useRoute();
const router = useRouter();
const selectedArticle = ref<any>(null);

const { data: rssFeeds } = useQuery({
  key: ["rssFeeds1"],
  query: async () => {
    try {
      const data = await client.api.rss.$get();
      return data.json();
    } catch (error) {
      throw error;
    }
  },
});

const articleContent = computed(() => {
  if (!selectedArticle.value) return null;

  try {
    const feedItem = selectedArticle.value;
    if (feedItem["content:encoded"]) {
      return feedItem["content:encoded"];
    }
    if (feedItem.content) {
      return feedItem.content;
    }
    return feedItem.contentSnippet || null;
  } catch (error) {
    return null;
  }
});

const navMain = computed(() => {
  if (!rssFeeds.value || !("data" in rssFeeds.value)) return [];
  const data = rssFeeds.value.data;
  return data?.map((feed) => {
    const feedItems = Array.isArray(feed.feedItems) ? feed.feedItems : [];
    return {
      title: feed.title,
      url: "/rss/",
      items: feedItems.map((item: any) => ({
        title: item.title,
        url: "/rss/",
        isActive: selectedArticle.value?.link === item.link,
        ...item,
      })),
    };
  });
});

const currentFeed = computed(() => {
  if (!selectedArticle.value || !rssFeeds.value || !("data" in rssFeeds.value))
    return null;

  for (const feed of rssFeeds.value.data) {
    const feedItems = Array.isArray(feed.feedItems) ? feed.feedItems : [];
    const hasArticle = feedItems.some(
      (item: any) => item.link === selectedArticle.value?.link
    );
    if (hasArticle) {
      return feed;
    }
  }
  return null;
});

const handleArticleSelect = (item: any) => {
  selectedArticle.value = item;
  router.push({
    query: {
      article: encodeURIComponent(item.link || item.guid || item.title),
    },
  });
};

const selectArticleFromQuery = () => {
  const articleParam = route.query.article as string;
  if (!articleParam || !rssFeeds.value || !("data" in rssFeeds.value)) return;

  const decodedParam = decodeURIComponent(articleParam);

  for (const feed of rssFeeds.value.data) {
    const feedItems = Array.isArray(feed.feedItems) ? feed.feedItems : [];
    const article = feedItems.find(
      (item: any) =>
        item.link === decodedParam ||
        item.guid === decodedParam ||
        item.title === decodedParam
    );

    if (article) {
      selectedArticle.value = article;
      break;
    }
  }
};

watch(
  () => rssFeeds.value,
  (newValue) => {
    if (newValue && "data" in newValue && route.query.article) {
      selectArticleFromQuery();
    }
  },
  { immediate: true }
);

watch(
  () => route.query.article,
  (newArticle) => {
    if (newArticle && rssFeeds.value) {
      selectArticleFromQuery();
    } else if (!newArticle) {
      selectedArticle.value = null;
    }
  }
);
</script>

<template>
  <SidebarProvider>
    <AppSidebar :navMain="navMain" @select-article="handleArticleSelect" />
    <SidebarInset>
      <header
        class="flex sticky top-0 bg-background h-16 shrink-0 items-center gap-2 border-b px-4 justify-between"
      >
        <div class="flex items-center gap-2">
          <SidebarTrigger class="-ml-1" />
          <Separator orientation="vertical" class="mr-2 h-4" />
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem class="hidden md:block">
                <BreadcrumbLink href="/">RSS Feeds</BreadcrumbLink>
              </BreadcrumbItem>
              <template v-if="currentFeed">
                <BreadcrumbSeparator class="hidden md:block" />
                <BreadcrumbItem class="hidden md:block">
                  <BreadcrumbLink href="#">
                    {{ currentFeed.title }}
                  </BreadcrumbLink>
                </BreadcrumbItem>
              </template>
              <template v-if="selectedArticle">
                <BreadcrumbSeparator class="hidden md:block" />
                <BreadcrumbItem>
                  <BreadcrumbPage class="line-clamp-1">
                    {{ selectedArticle.title }}
                  </BreadcrumbPage>
                </BreadcrumbItem>
              </template>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
        <ThemeSwitcher class="ml-auto" />
      </header>
      <!-- <div class="flex flex-1 flex-col gap-4 p-4 lg:mx-72">
        <Input type="text" placeholder="Enter RSS URL" v-model="url" />
        <Button @click="saveRss(url)">Add</Button>
      </div> -->
      <div class="w-full max-w-4xl mx-auto px-4 py-8">
        <div
          v-if="!selectedArticle"
          class="text-center text-muted-foreground py-20"
        >
          <p class="text-lg">Select an article from the sidebar to read</p>
        </div>
        <article
          v-else
          class="prose prose-lg dark:prose-invert max-w-none prose-headings:font-bold prose-headings:tracking-tight prose-h1:text-4xl prose-h1:mb-8 prose-h1:mt-0 prose-h1:leading-tight prose-h2:text-3xl prose-h2:mb-6 prose-h2:mt-10 prose-h2:text-foreground prose-h3:text-2xl prose-h3:mb-4 prose-h3:mt-8 prose-h3:text-foreground prose-h4:text-xl prose-h4:mb-3 prose-h4:mt-6 prose-p:text-base prose-p:leading-7 prose-p:mb-6 prose-p:text-muted-foreground prose-a:text-primary prose-a:no-underline hover:prose-a:underline prose-a:font-medium prose-strong:font-semibold prose-strong:text-foreground prose-img:rounded-lg prose-img:shadow-md prose-img:my-8 prose-pre:bg-muted prose-pre:text-foreground prose-pre:rounded-lg prose-pre:shadow-sm prose-code:bg-muted prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:text-sm prose-code:font-mono prose-code:text-primary prose-blockquote:border-l-4 prose-blockquote:border-primary prose-blockquote:pl-4 prose-blockquote:italic prose-blockquote:text-muted-foreground prose-ul:list-disc prose-ul:pl-6 prose-li:marker:text-primary prose-ol:list-decimal prose-ol:pl-6 prose-hr:border-border prose-hr:my-8 prose-table:overflow-hidden prose-th:bg-muted prose-th:font-semibold prose-td:border-border"
        >
          <h1>{{ selectedArticle.title }}</h1>
          <div class="text-sm text-muted-foreground mb-8">
            <time v-if="selectedArticle.pubDate">{{
              new Date(selectedArticle.pubDate).toLocaleDateString()
            }}</time>
            <a
              v-if="selectedArticle.link"
              :href="selectedArticle.link"
              target="_blank"
              class="ml-4"
              >Read original →</a
            >
          </div>
          <div v-html="articleContent"></div>
        </article>
      </div>
    </SidebarInset>
  </SidebarProvider>
</template>
