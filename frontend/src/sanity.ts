// sanity.js
import { createClient } from "@sanity/client";
import { type Post } from "./resources/interfaces/sanity.types";
import { POST_QUERY, postInterface } from "./utils/groq-queries";
// Import using ESM URL imports in environments that supports it:
// import {createClient} from 'https://esm.sh/@sanity/client'

export const client = createClient({
  projectId: import.meta.env.VITE_SANITY_PROJECT_ID || "your-project-id",
  dataset: import.meta.env.VITE_SANITY_DATASET || "production",
});

// uses GROQ to query content: https://www.sanity.io/docs/groq
export async function getPosts(): Promise<Array<Post>> {
  const posts = await client.fetch(POST_QUERY);
  console.info("Posts fetched:", posts);
  return posts;
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  const post = await client.fetch(
    `
    *[_type == "post" && slug.current == $slug][0] ${postInterface}
  `,
    { slug }
  );
  return post || null;
}
