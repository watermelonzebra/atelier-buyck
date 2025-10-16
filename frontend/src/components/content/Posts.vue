<script setup lang="ts">
import { onMounted, ref } from "vue";
import { getPosts } from "../../sanity";
import type { Post } from "../../resources/interfaces/post.interface";
import { getSanityImageUrl } from "../../helpers/sanity-image.helper";
import { RouterLink } from "vue-router";

const posts = ref<Array<Post>>([]);

onMounted(async () => {
  try {
    posts.value = await getPosts();
  } catch (error) {
    console.error("Error fetching posts:", error);
  }
});
</script>
<template>
  <article class="projects">
    <h2 class="projects__title">Ontdek Ons Schrijnwerk & Maatwerk</h2>
    <ul class="projects__posts">
      <li v-for="(post, index) in posts" :key="post._id" :class="['projects__posts-item', index % 2 === 0 ? 'left' : 'right']">
        <RouterLink
          :to="{ name: 'Details', params: { slug: post.slug.current } }"
        >
          <img
            :src="getSanityImageUrl(post.contentImage)"
            alt="Post Image"
            class="projects__posts-item-cover"
          />
          <div class="projects__posts-item__content">
            <h3 class="projects__posts-item__content-title">
              {{ post.title }}
            </h3>
          </div>
        </RouterLink>
      </li>
    </ul>
  </article>
</template>

<style lang="scss" scoped>
.projects {
  height: 100dvh;
  width: 100dvw;

  display: flex;
  align-items: center;
  justify-content: center;

  position: relative;

  overflow: hidden;

  background-color: var(--main-darkest);
  color: var(--main-light);

  padding: var(--spacing-s);
}

.projects__title {
  text-align: center;
  font-size: 10vw;
  line-height: 1.5;

  @media screen and (min-width: 1440px) {
    font-size: 14.5rem;
    margin: 0 auto;
  } 
}

.projects__posts {
  list-style: none;
  padding: 0;
  margin: 0;

  position: absolute;
  width: 100%;
  height: 100%;

  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 100%;
}

.projects__posts-item {
  position: relative;
  width: 100%;
  height: 100%;

  grid-row: 1 / 2;

  &.left {
    grid-column: 1 / 2;
  }

  &.right {
    grid-column: 2 / 3;
  }

}
</style>
