import tailwindcss from "@tailwindcss/vite";
import vue from "@vitejs/plugin-vue";
import { defineConfig, loadEnv } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";
import VueRouter from "unplugin-vue-router/vite";
import path from "path";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");

  return {
    plugins: [VueRouter(), vue(), tailwindcss(), tsconfigPaths()],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
    server: {
      proxy: {
        "/api": {
          target: "http://localhost:9595",
          changeOrigin: true,
        },
      },
    },
    build: {
      outDir: "../server/frontend/dist",
      rollupOptions: {
        output: {
          sourcemap: false,
        },
      },
    },
  };
});
