<script setup lang="ts"></script>

<template>
  <Suspense>
    <router-view></router-view>
    <template #fallback>
      <div>Loading...</div>
    </template>
  </Suspense>
</template>

<style scoped></style>
