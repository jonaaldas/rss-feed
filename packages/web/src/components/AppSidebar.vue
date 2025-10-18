<script setup lang="ts">
import type { SidebarProps } from "@/components/ui/sidebar";
import { ChevronRight, Rss, Calendar } from "lucide-vue-next";
import SearchForm from "@/components/SearchForm.vue";
import VersionSwitcher from "@/components/VersionSwitcher.vue";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import { Badge } from "@/components/ui/badge";

type NavItem = {
  title: string;
  url: string;
  items?: NavItem[];
  isActive?: boolean;
};

const props = defineProps<SidebarProps & { navMain: NavItem[] }>();
</script>

<template>
  <Sidebar v-bind="props" class="border-r border-border/50">
    <SidebarHeader class="border-b border-border/50 p-4">
      <div class="flex items-center gap-2 mb-4">
        <Rss class="w-6 h-6 text-primary" />
        <h2 class="text-lg font-semibold">RSS Feeds</h2>
      </div>
      <SearchForm />
    </SidebarHeader>
    <SidebarContent class="gap-1 p-2 overflow-y-auto h-full">
      <Collapsible
        v-for="item in navMain"
        :key="item.title"
        :title="item.title"
        default-open
        class="group/collapsible border border-border/30 rounded-lg overflow-hidden bg-card/50 hover:bg-card/80 transition-colors"
      >
        <SidebarGroup class="p-4">
          <SidebarGroupLabel
            as-child
            class="group/label p-5 text-sm font-medium text-sidebar-foreground hover:bg-muted/50 cursor-pointer transition-colors border-b border-border/20 group-data-[state=open]/collapsible:border-border/30"
          >
            <CollapsibleTrigger
              class="flex items-center justify-between w-full"
            >
              <div class="flex items-center gap-3">
                <Rss class="w-4 h-4 text-primary shrink-0" />
                <span class="truncate text-left">{{ item.title }}</span>
                <Badge variant="secondary" class="text-xs px-2 py-0.5">
                  {{ item.items?.length || 0 }}
                </Badge>
              </div>
              <ChevronRight
                class="w-4 h-4 shrink-0 transition-transform group-data-[state=open]/collapsible:rotate-90"
              />
            </CollapsibleTrigger>
          </SidebarGroupLabel>
          <CollapsibleContent>
            <SidebarGroupContent class="p-4">
              <SidebarMenu class="space-y-3 p-2">
                <SidebarMenuItem
                  v-for="childItem in item.items"
                  :key="childItem.title"
                  class="group"
                >
                  <SidebarMenuButton
                    as-child
                    :is-active="childItem.isActive"
                    class="p-3 rounded-md hover:bg-muted/70 transition-colors group-hover:shadow-sm cursor-pointer px-5"
                  >
                    <a :href="item.url" class="flex items-center gap-3">
                      <Calendar class="text-muted-foreground shrink-0" />
                      <div class="flex-1">
                        <p
                          class="text-xs truncate font-medium leading-5 text-foreground group-hover:text-primary transition-colors line-clamp-2"
                        >
                          {{ childItem.title }}
                        </p>
                      </div>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </CollapsibleContent>
        </SidebarGroup>
      </Collapsible>
    </SidebarContent>
    <SidebarRail />
  </Sidebar>
</template>
