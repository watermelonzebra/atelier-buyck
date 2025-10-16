// sanity.js
import { createClient } from "@sanity/client";
import type { Post } from "./resources/interfaces/post.interface";
// Import using ESM URL imports in environments that supports it:
// import {createClient} from 'https://esm.sh/@sanity/client'

console.log("Initializing Sanity client...");

export const client = createClient({
  projectId: import.meta.env.VITE_SANITY_PROJECT_ID || "your-project-id",
  dataset: import.meta.env.VITE_SANITY_DATASET || "production",
});

console.log(
  "Sanity client initialized with projectId:",
  client.config().projectId
);

const postInterface = `{
      _id,
      _createdAt,
      _updatedAt,
      _rev,
      _type,
      title,
      slug,
      "imageGallery": imageGallery[]{
        _key,
        _type,
        "asset": asset->
      },
      description,
      year,
      colorScheme,
      body,
      "contentImage": contentImage.asset->,
    }`;

// uses GROQ to query content: https://www.sanity.io/docs/groq
export async function getPosts(): Promise<Array<Post>> {
  const posts = await client.fetch(`
    *[_type == "post"] ${postInterface} | order(_createdAt desc)
  `);
  console.info("Posts fetched:", posts);
  return posts;
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  console.info(`Fetching post with slug: ${slug}`);
  const post = await client.fetch(
    `
    *[_type == "post" && slug.current == $slug][0] ${postInterface}
  `,
    { slug }
  );

  console.info("Post fetched:", post);
  return post || null;
}
