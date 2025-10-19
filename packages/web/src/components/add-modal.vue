<script setup lang="ts">
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-vue-next";
import { useMutation, useQueryCache } from "@pinia/colada";
import { client } from "@/lib/api";
import { ref } from "vue";
import { Input } from "@/components/ui/input";

const url = ref<string>("");
const queryCache = useQueryCache();

const { mutate: saveRssFeed } = useMutation({
  key: ["saveRssFeed"],
  mutation: async () => {
    const response = await client.api.rss.save.$post({
      form: {
        url: url.value,
      },
    });
    if (response.ok) {
      return response.json();
    }
    throw new Error(response.statusText);
  },
  onSuccess: (data) => {
    console.log(data);
  },
  onError: (error) => {
    console.error(error);
  },
  onSettled: () => {
    queryCache.invalidateQueries({ key: ["rssFeeds1"] });
  },
});
</script>

<template>
  <Dialog>
    <DialogTrigger as-child>
      <Button variant="outline" class="w-[85%]">
        <Plus class="w-4 h-4" />
        Add a new feed
      </Button>
    </DialogTrigger>
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Add a new feed</DialogTitle>
        <DialogDescription>
          Add the URL of the feed you want to add.
        </DialogDescription>
      </DialogHeader>
      <Input v-model="url" placeholder="https://example.com/feed.xml" />
      <DialogFooter>
        <Button variant="secondary" @click="saveRssFeed()" :disabled="!url">
          <Plus class="w-4 h-4" />
          Add feed
        </Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
</template>
