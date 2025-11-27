import type { Post } from "../resources/interfaces/sanity.types";
import { ref } from "vue";
import { client } from "../sanity";
import { POST_DETAIL_QUERY, POSTS_LIST_QUERY } from "../utils/groq-queries";

const posts = ref<Array<Post>>([]);
const fullPosts = ref<Array<Post>>([]);

export function usePosts() {
  // getAll - loads all posts with caching
  async function getAllPosts() {
    if (posts.value?.length) return posts.value;

    posts.value = await client.fetch(POSTS_LIST_QUERY);

    return posts.value;
  }

  // Get post from cached array
  async function getPostBySlug(slug: string): Promise<Post | null> {
    try {
      if (!slug) return null;
      const postIndex = fullPosts.value.findIndex(
        (p) => p.slug?.current === slug
      );
      if (postIndex > -1) return fullPosts.value[postIndex];
      // Fetch full content
      const fullPost = (await client.fetch(POST_DETAIL_QUERY, {
        slug,
      })) as Post | null;

      if (fullPost) fullPosts.value.push(fullPost);

      return fullPost || null;
    } catch (error) {
      console.error("Error fetching post by slug:", error);
      return null;
    }
  }

  // Get next post from cached array
  async function getNextPostBySlug(currentSlug: Post["slug"]) {
    const currentPostIndex: number = posts.value.findIndex(
      (post) => post.slug?.current === currentSlug
    );
    const nextPostIndex: number =
      currentPostIndex + 1 > posts.value.length - 1 ? 0 : currentPostIndex + 1;

    const nextSlug = posts.value[nextPostIndex].slug?.current;

    if (!nextSlug) return null;

    return await getPostBySlug(nextSlug);
  }

  return {
    getAllPosts,
    getPostBySlug,
    getNextPostBySlug,
    posts,
  };
}
