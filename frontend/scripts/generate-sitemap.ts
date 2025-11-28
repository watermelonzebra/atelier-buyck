// scripts/generate-sitemap.ts
import { createClient } from "@sanity/client";
import fs from "fs";
import path from "path";
import dotenv from "dotenv";
import { fileURLToPath } from "url";

// 1. Load Environment Variables
dotenv.config();

// Fix __dirname for ESM (since we are using module type in modern Vue)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 2. Configuration
const SITE_URL = process.env.VITE_APP_BASE_URL || "https://atelierbuyck.be";
const OUTPUT_PATH = path.resolve(__dirname, "../public/sitemap.xml");

// 3. Initialize Independent Sanity Client
// We cannot use src/sanity.ts because it uses import.meta.env
const client = createClient({
  projectId: process.env.VITE_SANITY_PROJECT_ID,
  dataset: process.env.VITE_SANITY_DATASET || "production",
  apiVersion: "2024-06-01",
  useCdn: false, // Always fetch fresh data for sitemap
});

interface SitemapRoute {
  url: string;
  lastmod?: string;
  changefreq?: string;
  priority?: number;
}

async function generateSitemap() {
  console.log("🔍 Generating Sitemap...");

  // 4. Define Static Routes
  // Add your hardcoded Vue pages here
  const currentDate = new Date().toISOString();
  const staticRoutes: SitemapRoute[] = [
    { url: "/", changefreq: "daily", lastmod: currentDate, priority: 1.0 },
    {
      url: "/contact",
      changefreq: "monthly",
      lastmod: currentDate,
      priority: 0.9,
    },
    {
      url: "/projects",
      changefreq: "monthly",
      lastmod: currentDate,
      priority: 0.8,
    },

    // Add other static pages...
  ];

  // 5. Fetch Dynamic Routes from Sanity
  // We fetch _updatedAt to help Google know when to recrawl
  const query = `*[_type == "post" && defined(slug.current)] {
    "slug": slug.current,
    _updatedAt
  }`;

  const posts = await client.fetch(query);

  const dynamicRoutes: SitemapRoute[] = posts.map((post: any) => ({
    url: `/projects/${post.slug}`, // Adjust based on your actual route structure
    lastmod: post._updatedAt,
    changefreq: "weekly",
    priority: 0.7,
  }));

  const allRoutes = [...staticRoutes, ...dynamicRoutes];

  // 6. Generate XML String
  const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${allRoutes
    .map((route) => {
      return `
  <url>
    <loc>${SITE_URL}${route.url}</loc>
    ${route.lastmod ? `<lastmod>${route.lastmod}</lastmod>` : ""}
    ${route.changefreq ? `<changefreq>${route.changefreq}</changefreq>` : ""}
    ${route.priority ? `<priority>${route.priority}</priority>` : ""}
  </url>`;
    })
    .join("")}
</urlset>`;

  // 7. Write to File
  fs.writeFileSync(OUTPUT_PATH, sitemapXml);
  console.log(`✅ Sitemap generated at: ${OUTPUT_PATH}`);
}

generateSitemap().catch((err) => {
  console.error("❌ Sitemap generation failed:", err);
  process.exit(1);
});
