<script setup lang="ts">
import { watchOnce } from "@vueuse/core";
import { useRouteParams } from "@vueuse/router";
import { getPostBySlug } from "../sanity";
import { useRouter } from "vue-router";
import type { Post } from "../resources/interfaces/post.interface";
import { ref } from "vue";
import { getSanityImageUrl } from "../helpers/sanity-image.helper";
import { getSanityFileUrl } from "../helpers/sanity-file.helper";
import { toHTML } from "@portabletext/to-html";
import dayjs from "dayjs";

const slug = useRouteParams("slug");
const router = useRouter();
const post = ref<Post | null>(null);
const body = ref<string | null>(null);

const images = ref<Array<string>>([]);

watchOnce(
  slug,
  async (currentSlug) => {
    // check if currentSlug is not an array or undefined
    if (Array.isArray(currentSlug) || currentSlug === undefined)
      return router.back();
    if (currentSlug) {
      try {
        // Fetch the post details using the slug
        post.value = await getPostBySlug(currentSlug);

        body.value = toHTML(post.value?.body);

        // select all images from the post and convert them to URLs and store them in the images array
        images.value =
          post.value?.imageGallery.map((image) =>
            getSanityImageUrl(image.asset)
          ) || [];
      } catch (error) {
        console.error("Error fetching post details:", error);
      }
    }
  },
  { immediate: true }
);
</script>
<template>
  <suspense>
    <template #default>
      <section v-if="post">
        <SEO
          :title="post?.title"
          :description="post?.description"
          :image="post?.contentImage"
          type="article"
          :url="`/blog/${post?.slug}`"
        />

        <img
          class="header-img"
          :src="getSanityImageUrl(post.contentImage)"
          alt="Post Image"
        />

        <article v-if="post.imageGallery && post.imageGallery.length">
          <h2>Image Gallery</h2>
          <div class="image-gallery">
            <img
              v-for="image in post.imageGallery"
              :key="image._key"
              :src="getSanityImageUrl(image.asset)"
              alt="Gallery Image"
            />
          </div>
        </article>

        <h1>{{ post.title }}</h1>
        <p>{{ dayjs(post._createdAt).format("MMMM D, YYYY") }}</p>
        <p><strong>Slug:</strong> {{ post.slug.current }}</p>
        <p v-if="post.year"><strong>Year:</strong> {{ post.year }}</p>
        <article class="c-paragraph">
          <h3>Description</h3>
          <div v-html="body" ></div>
        </article>
      </section>
    </template>
    <template #fallback>
      <p>Loading post details...</p>
    </template>
  </suspense>
</template>
<style lang="scss" scoped>
section {
  display: flex;
  flex-direction: column;
  align-items: start;
  gap: 2rem;

  width: 100%;
  max-width: 96rem;
  margin: 0 auto;
}

article {
  width: 100%;
}

.header-img {
  width: 100%;
  height: 50rem;
  border-radius: var(--border-radius);
  box-shadow: var(--box-shadow);
  object-fit: cover;
}

.image-gallery {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;

  img {
    width: calc(33.333% - 1rem);
    height: auto;
    border-radius: var(--border-radius);
    box-shadow: var(--box-shadow);

    object-fit: cover;
  }
}

.files-list {
  width: 100%;
  list-style: none;
  padding: 0;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 1rem;
}

.file-card {
  border: 1px solid var(--white);
  border-radius: 8px;
  padding: 1rem;
  background: var(--white);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.file-preview {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 1rem;
}

.file-icon {
  font-size: 2rem;
}

.file-name {
  font-size: 2rem;
  word-break: break-word;
}

.file-actions {
  display: flex;
  gap: 0.5rem;

  a {
    flex: 1;
    padding: 0.5rem;
    text-align: center;
    border-radius: 4px;
    text-decoration: none;
    font-size: 1.4rem;

    &.preview-btn {
      background: #f0f0f0;
      color: #333;
    }

    &:hover {
      opacity: 0.9;
    }
  }
}

.download-btn {
  padding: 0.5rem;
  text-align: center;
  border-radius: 4px;
  text-decoration: none;

  background: var(--main);
  color: var(--white);
}
</style>
