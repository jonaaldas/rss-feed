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
import { useMutation } from "@pinia/colada";
import { ref } from "vue";
import { client } from "@/lib/api";

const url = ref("");

const { mutate: saveRss, status } = useMutation({
  mutation: (url: string) =>
    client.api.rss.save.$post({
      form: {
        url,
      },
    }),
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
      <div class="flex flex-1 flex-col gap-4 p-4 mx-72">
        <Input type="text" placeholder="Enter RSS URL" v-model="url" />
        <Button @click="saveRss(url)">Add</Button>
        <div v-if="status === 'success'">
          <p>RSS feed added successfully</p>
        </div>
        <div v-if="status === 'error'">
          <p>Error adding RSS feed</p>
        </div>
      </div>
    </SidebarInset>
  </SidebarProvider>
</template>
