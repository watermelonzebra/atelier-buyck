import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import viteCompression from "vite-plugin-compression"; // Add this
import { fileURLToPath, URL } from "node:url";

export default defineConfig({
  plugins: [
    vue(),
    // Compress assets (gzip by default).
    // This creates .gz files that your server/CDN can serve.
    viteCompression({
      algorithm: "gzip",
      ext: ".gz",
    }),
  ],
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

  build: {
    rollupOptions: {
      output: {
        // This forces heavy dependencies into their own files
        manualChunks(id) {
          if (id.includes("node_modules")) {
            if (id.includes("sanity") || id.includes("groq")) {
              return "sanity-vendor";
            }
            if (
              id.includes("vue") ||
              id.includes("pinia") ||
              id.includes("router")
            ) {
              return "vue-vendor";
            }
            // Put pdfjs in its own chunk as it is large
            if (id.includes("pdfjs-dist")) {
              return "pdf-worker";
            }
          }
        },
      },
    },
  },
});
