<script setup lang="ts">
import LoginForm from "@/components/LoginForm.vue";
import { client } from "@/lib/api";

const response = await client.api.ping.$get();
const { message } = await response.json();

const rssFeeds = await client.api.rss.$get();
const data = await rssFeeds.json();
console.log(data);
</script>

<template>
  <div>
    <h1 class="text-2xl bg-red-500 font-bold">{{ message }}</h1>
    <LoginForm />
  </div>
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
