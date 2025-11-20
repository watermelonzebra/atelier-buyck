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
  // getAll - loads all posts with caching
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

  // Fetch single post directly from Sanity (bypasses need to load all posts)
  async function getPostBySlugDirect(slug: string): Promise<Post | null> {
    try {
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
        callToAction
      }`;
      const post = await client.fetch(
        `*[_type == "post" && slug.current == $slug][0] ${postInterface}`,
        { slug }
      );
      return post || null;
    } catch (error) {
      console.error("Error fetching post by slug:", error);
      return null;
    }
  }

  // Get post from cached array
  function getPostBySlug(slug: Post["slug"]): Post | null {
    if (!posts.value?.length) return null;

    return posts.value.find((post) => post.slug?.current === slug) || null;
  }

  // Get next post from cached array
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
    getPostBySlugDirect,
    getNextPostBySlug,
    posts,
  };
}
