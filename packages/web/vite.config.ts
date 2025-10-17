import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
  server: {
    proxy: {
      "/api": {
        target: "http://127.0.0.1:9595",
        changeOrigin: true,
      },
    },
  },
  build: {
    outDir: "../server/frontend/dist",
  },
});
