import tailwindcss from "@tailwindcss/vite";
import vue from "@vitejs/plugin-vue";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";
import VueRouter from "unplugin-vue-router/vite";
import path from "path";

// https://vite.dev/config/
export default defineConfig({
  plugins: [VueRouter(), vue(), tailwindcss(), tsconfigPaths()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
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
