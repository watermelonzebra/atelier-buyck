import type { Post } from "../resources/interfaces/sanity.types";
import { ref } from "vue";
import { client } from "../sanity";
import { POST_QUERY } from "../utils/groq-queries";

const posts = ref<null | Array<Post>>([]);

export function usePosts() {
    // getAll
    async function getAllPosts() {
        posts.value = await client.fetch(POST_QUERY);
        console.info("Posts fetched:", posts.value);
        return posts.value;
    }

    // getById
    function getPostBySlug(slug: Post['slug']): Post | null {
        if (!posts.value?.length) return null;

        return posts.value.find((post) => post.slug?.current === slug) || null
    }

    function getNextPostBySlug(currentSlug: Post['slug']) {
        if (!posts.value?.length) return null;

        const currentPostIndex: number = posts.value.findIndex((post) => post.slug?.current === currentSlug);
        const nextPostIndex: number = (currentPostIndex + 1) > (posts.value.length - 1) ? 0 : currentPostIndex + 1;

        return posts.value[nextPostIndex]
    }

    return {
        getAllPosts,
        getPostBySlug,
        getNextPostBySlug,
        posts
    }
}