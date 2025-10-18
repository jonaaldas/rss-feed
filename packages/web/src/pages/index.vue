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
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useMutation, useQuery } from "@pinia/colada";
import { computed, ref } from "vue";
import { client } from "@/lib/api";

const url = ref("");

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

const { mutate: saveRss, state } = useMutation({
  mutation: async (url: string) => {
    try {
      const data = await client.api.rss.save.$post({
        form: {
          url,
        },
      });
      return data.json();
    } catch (error) {
      throw error;
    }
  },
  onSuccess: (data) => {
    console.log(data);
  },
  onError: (error) => {
    console.error(error);
  },
});

const articleContent = computed(() => {
  try {
    const feedItems = rssFeeds.value?.data[1].feedItems[0];
    if (feedItems["content:encoded"]) {
      return feedItems["content:encoded"];
    }
    // Then check for regular content field
    if (feedItems.content) {
      return feedItems.content;
    }
    // Fall back to contentSnippet if no full content available
    return null;
  } catch (error) {}
});

const navMain = computed(() => {
  const data = rssFeeds.value?.data;
  return data?.map(
    (feed: { title: string; url: string; feedItems: any[] }) => ({
      title: feed.title,
      url: "/rss/",
      items: feed.feedItems.map((item: any) => ({
        title: item.title,
        url: "/rss/",
        isActive: false,
      })),
    })
  );
});
</script>

<template>
  <SidebarProvider>
    <AppSidebar :navMain="navMain" />
    <SidebarInset>
      <header
        class="flex sticky top-0 bg-background h-16 shrink-0 items-center gap-2 border-b px-4"
      >
        <SidebarTrigger class="-ml-1" />
        <Separator orientation="vertical" class="mr-2 h-4" />
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem class="hidden md:block">
              <BreadcrumbLink href="#">
                Building Your Application
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator class="hidden md:block" />
            <BreadcrumbItem>
              <BreadcrumbPage>Data Fetching</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </header>
      <div class="flex flex-1 flex-col gap-4 p-4 lg:mx-72">
        <Input type="text" placeholder="Enter RSS URL" v-model="url" />
        <Button @click="saveRss(url)">Add</Button>
      </div>
      <div class="w-full max-w-4xl mx-auto px-4 py-8">
        <article
          class="prose prose-lg dark:prose-invert max-w-none prose-headings:font-bold prose-headings:tracking-tight prose-h1:text-4xl prose-h1:mb-8 prose-h1:mt-0 prose-h1:leading-tight prose-h2:text-3xl prose-h2:mb-6 prose-h2:mt-10 prose-h2:text-foreground prose-h3:text-2xl prose-h3:mb-4 prose-h3:mt-8 prose-h3:text-foreground prose-h4:text-xl prose-h4:mb-3 prose-h4:mt-6 prose-p:text-base prose-p:leading-7 prose-p:mb-6 prose-p:text-muted-foreground prose-a:text-primary prose-a:no-underline hover:prose-a:underline prose-a:font-medium prose-strong:font-semibold prose-strong:text-foreground prose-img:rounded-lg prose-img:shadow-md prose-img:my-8 prose-pre:bg-muted prose-pre:text-foreground prose-pre:rounded-lg prose-pre:shadow-sm prose-code:bg-muted prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:text-sm prose-code:font-mono prose-code:text-primary prose-blockquote:border-l-4 prose-blockquote:border-primary prose-blockquote:pl-4 prose-blockquote:italic prose-blockquote:text-muted-foreground prose-ul:list-disc prose-ul:pl-6 prose-li:marker:text-primary prose-ol:list-decimal prose-ol:pl-6 prose-hr:border-border prose-hr:my-8 prose-table:overflow-hidden prose-th:bg-muted prose-th:font-semibold prose-td:border-border"
          v-html="articleContent"
        ></article>
      </div>
    </SidebarInset>
  </SidebarProvider>
</template>
