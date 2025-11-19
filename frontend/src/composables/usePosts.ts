import type { Post } from "../resources/interfaces/sanity.types";
import { ref } from "vue";
import { client } from "../sanity";
import { POST_QUERY } from "../utils/groq-queries";

const posts = ref<null | Array<Post>>([]);

// new function to save posts in localstorage and give it a cache time
function savePostsToLocalStorage(posts: Array<Post>) {
  const data = {
    posts,
    timestamp: new Date().getTime(),
  };
  localStorage.setItem("postsCache", JSON.stringify(data));
}

// new function to get posts from localstorage if cache time is not expired
function getPostsFromLocalStorage(): Array<Post> | null {
  const data = localStorage.getItem("postsCache");
  if (data) {
    const parsedData = JSON.parse(data);
    const currentTime = new Date().getTime();
    const cacheTime = 1000 * 60 * 10; // 10 minutes

    if (currentTime - parsedData.timestamp < cacheTime) {
      return parsedData.posts;
    } else {
      localStorage.removeItem("postsCache");
    }
  }
  return null;
}

export function usePosts() {
  // getAll
  async function getAllPosts() {
    const cachedPosts = getPostsFromLocalStorage();
    if (cachedPosts) {
      posts.value = cachedPosts;
      return posts.value;
    }

    posts.value = await client.fetch(POST_QUERY);
    if (posts.value) savePostsToLocalStorage(posts.value);

    return posts.value;
  }

  // getById
  function getPostBySlug(slug: Post["slug"]): Post | null {
    if (!posts.value?.length) return null;

    return posts.value.find((post) => post.slug?.current === slug) || null;
  }

  function getNextPostBySlug(currentSlug: Post["slug"]) {
    if (!posts.value?.length) return null;

    const currentPostIndex: number = posts.value.findIndex(
      (post) => post.slug?.current === currentSlug
    );
    const nextPostIndex: number =
      currentPostIndex + 1 > posts.value.length - 1 ? 0 : currentPostIndex + 1;

    return posts.value[nextPostIndex];
  }

  return {
    getAllPosts,
    getPostBySlug,
    getNextPostBySlug,
    posts,
  };
}
