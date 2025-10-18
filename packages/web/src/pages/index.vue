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
</script>

<template>
  <SidebarProvider>
    <AppSidebar />
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
      <div>
        <div
          class="prose prose-lg dark:prose-invert max-w-none prose-headings:font-bold prose-headings:text-foreground prose-headings:tracking-tight prose-headings:scroll-mt-20 prose-h1:text-4xl prose-h1:mb-8 prose-h1:mt-10 prose-h1:leading-tight prose-h1:border-b prose-h1:border-border/30 prose-h1:pb-4 prose-h2:text-3xl prose-h2:mb-6 prose-h2:mt-8 prose-h2:border-b prose-h2:border-border/50 prose-h2:pb-3 prose-h2:leading-tight prose-h2:text-primary prose-h3:text-2xl prose-h3:mb-5 prose-h3:mt-7 prose-h3:leading-tight prose-h3:text-foreground prose-h3:font-semibold prose-h3:border-l-4 prose-h3:border-primary prose-h3:pl-4 prose-h3:bg-primary/5 prose-h3:py-2 prose-h3:rounded-r-lg prose-h4:text-xl prose-h4:mb-4 prose-h4:mt-6 prose-h4:leading-tight prose-h4:text-foreground prose-h4:font-semibold prose-h5:text-lg prose-h5:mb-3 prose-h5:mt-5 prose-h5:text-foreground prose-h5:font-medium prose-h6:mb-3 prose-h6:mt-4 prose-h6:text-foreground prose-h6:font-medium prose-h6:uppercase prose-h6:tracking-wide prose-h6:text-sm prose-p:text-base prose-p:leading-relaxed prose-p:mb-6 prose-p:text-foreground/90 prose-a:text-primary prose-a:underline prose-a:underline-offset-4 prose-a:decoration-primary/50 hover:prose-a:decoration-primary hover:prose-a:text-primary/80 prose-a:transition-colors prose-strong:font-semibold prose-strong:text-foreground prose-em:italic prose-em:text-foreground/80 prose-img:rounded-xl prose-img:shadow-lg prose-img:border prose-img:border-border/50 prose-img:max-w-full prose-img:h-auto prose-img:my-8 prose-pre:bg-muted/80 prose-pre:text-muted-foreground prose-pre:p-6 prose-pre:rounded-xl prose-pre:overflow-x-auto prose-pre:border prose-pre:border-border/50 prose-pre:shadow-sm prose-code:text-primary prose-code:bg-muted/60 prose-code:px-2 prose-code:py-1 prose-code:rounded-md prose-code:text-sm prose-code:font-medium prose-code:border prose-code:border-border/30 prose-blockquote:border-l-4 prose-blockquote:border-primary prose-blockquote:pl-6 prose-blockquote:pr-4 prose-blockquote:py-3 prose-blockquote:italic prose-blockquote:bg-muted/30 prose-blockquote:rounded-r-lg prose-blockquote:my-6 prose-blockquote:text-foreground/80 prose-ul:list-none prose-ul:ml-0 prose-ul:mb-6 prose-ul:space-y-2 prose-ol:list-none prose-ol:ml-0 prose-ol:mb-6 prose-ol:space-y-2 prose-ol:counter-reset-[list-counter] prose-li:relative prose-li:pl-8 prose-li:text-foreground/90 prose-li:leading-relaxed prose-li:before:absolute prose-li:before:left-0 prose-li:before:top-2 prose-li:before:w-1.5 prose-li:before:h-1.5 prose-li:before:bg-primary prose-li:before:rounded-full [&_ol>li]:counter-increment-[list-counter] [&_ol>li:before]:content-[counter(list-counter)] [&_ol>li:before]:w-6 [&_ol>li:before]:h-6 [&_ol>li:before]:bg-primary [&_ol>li:before]:text-primary-foreground [&_ol>li:before]:rounded-full [&_ol>li:before]:text-xs [&_ol>li:before]:font-semibold [&_ol>li:before]:flex [&_ol>li:before]:items-center [&_ol>li:before]:justify-center [&_ol>li:before]:top-0 prose-table:border-collapse prose-table:border prose-table:border-border/50 prose-table:rounded-lg prose-table:overflow-hidden prose-table:shadow-sm prose-table:my-8 prose-th:border prose-th:border-border/50 prose-th:bg-muted/50 prose-th:px-4 prose-th:py-3 prose-th:font-semibold prose-th:text-left prose-td:border prose-td:border-border/50 prose-td:px-4 prose-td:py-3 prose-td:text-foreground/90 prose-hr:border-border/50 prose-hr:my-10 prose-hr:border-t-2 [&_input]:border [&_input]:border-border/50 [&_input]:rounded-lg [&_input]:px-4 [&_input]:py-3 [&_input]:bg-background/50 [&_input]:transition-colors [&_input:focus]:border-primary [&_input:focus]:ring-2 [&_input:focus]:ring-primary/20 [&_textarea]:border [&_textarea]:border-border/50 [&_textarea]:rounded-lg [&_textarea]:px-4 [&_textarea]:py-3 [&_textarea]:bg-background/50 [&_textarea]:transition-colors [&_textarea:focus]:border-primary [&_textarea:focus]:ring-2 [&_textarea:focus]:ring-primary/20 [&_select]:border [&_select]:border-border/50 [&_select]:rounded-lg [&_select]:px-4 [&_select]:py-3 [&_select]:bg-background/50 [&_select]:transition-colors [&_button]:bg-primary [&_button]:text-primary-foreground [&_button]:px-6 [&_button]:py-3 [&_button]:rounded-lg [&_button]:font-medium [&_button]:transition-colors [&_button]:shadow-sm [&_button:hover]:bg-primary/90 [&_button:hover]:shadow-md"
          v-html="articleContent"
        ></div>
      </div>
    </SidebarInset>
  </SidebarProvider>
</template>
