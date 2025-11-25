import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { fileURLToPath, URL } from "node:url";

export default defineConfig({
  plugins: [vue()],
  optimizeDeps: {
    include: [
      "pdfjs-dist/build/pdf.worker.mjs",
      "remixicon/fonts/remixicon.css",
    ],
  },

  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
});
