<script setup lang="ts">
import { watchOnce } from "@vueuse/core";
import { useRouteParams } from "@vueuse/router";
import { getPostBySlug } from "../sanity";
import { useRouter } from "vue-router";
import { ref } from "vue";
import { getSanityImageSrcSet, getSanityImageUrl, sizes } from "../helpers/sanity-image.helper";
import { toHTML } from "@portabletext/to-html";
import dayjs from "dayjs";
import type { Post } from "../resources/interfaces/sanity.types";
import type { TypedObject } from "@sanity/types";

const slug = useRouteParams("slug");
const router = useRouter();
const post = ref<Post | null>(null);
const body = ref<string | null>(null);

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

        if (!post.value) router.back();

        body.value = toHTML(post.value?.body as unknown as TypedObject);
      } catch (error) {
        console.error("Error fetching post details:", error);
      }
    }
  },
  { immediate: true }
);
</script>
<template>
  <section v-if="post" class="post">
    <article class="post__content">
      <p class="back-button" @click="router.back()">Terug naar het overzicht</p>
      <div class="post__content-title">
        <h2>{{ post.title }}</h2>
        <p>{{ post.year }}</p>
      </div>
      <div v-html="body"></div>
      <RouterLink :to="{name: 'Contact'}">
        {{ post.callToAction }}
      </RouterLink>
    </article>
    <article class="post__gallery">
      <img v-if="post.contentImage" class="header-img" :src="getSanityImageUrl(post.contentImage)"
        :srcset="getSanityImageSrcSet(post.contentImage)" :sizes :alt="post.contentImage?.alt || post.title" />
      <img v-for="image in post.imageGallery" :key="image._key" :src="getSanityImageUrl(image as any)"
        :srcset="getSanityImageSrcSet(image as any)" :sizes :alt="image?.alt || post.title" />
      <div>
        <p>blijf scrollen voor het volgende project</p>
      </div>
    </article>
  </section>
</template>
<style lang="scss" scoped>
.post {
  display: grid;
  grid-template-columns: 1fr;
  gap: var(--spacing-l);

  padding: 0 var(--spacing-s);
  margin-top: var(--spacing-xxxl);

  @media screen and (min-width: 1000px) {
    grid-template-columns: 50rem 1fr;
  }
}

.post__content {
  display: flex;
  flex-flow: column;
  gap: var(--spacing-l);



  @media screen and (min-width: 1000px) {
    position: fixed;
    top: var(--spacing-xxxl);

    max-width: 50rem;
  }
}

.post__content-title {
  display: flex;
  flex-flow: column;
  line-height: 1.6;

  >h2 {
    font-size: 8vw;

    @media screen and (min-width: 1000px) {
      font-size: 4.5rem;
    }
  }
}

.post__gallery {
  display: flex;
  flex-flow: column;
  gap: var(--spacing-l);

  @media screen and (min-width: 1000px) {
    grid-column: 2 /3;
  }
}

.back-button {
  display: flex;
  gap: var(--spacing-xxs);
}
</style>
