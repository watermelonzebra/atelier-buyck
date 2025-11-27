// sanity.js
import { createClient } from "@sanity/client";
// Import using ESM URL imports in environments that supports it:
// import {createClient} from 'https://esm.sh/@sanity/client'

export const client = createClient({
  projectId: import.meta.env.VITE_SANITY_PROJECT_ID || "your-project-id",
  dataset: import.meta.env.VITE_SANITY_DATASET || "production",
  apiVersion: "2024-06-01", // use current UTC date - see "specifying API version"!
  useCdn: true, // `false` if you want to ensure fresh data
});