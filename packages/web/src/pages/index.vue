<script setup lang="ts">
import { rssClient } from "@server/index";
const { data } = await rssClient.index.$get();
</script>

<template>
  <div>
    <h1 class="text-2xl font-bold">Hello World</h1>
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
