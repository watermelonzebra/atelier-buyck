<script setup lang="ts">
import { onMounted, ref } from "vue";
import { getPosts } from "../sanity";
import type { Post } from "../resources/interfaces/post.interface";
import { getSanityImageUrl } from "../helpers/sanity-image.helper";
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
  <article>
    <h2>Posts</h2>
    <ul class="posts-list">
      <li v-for="post in posts" :key="post._id" class="post-list-item">
        <RouterLink
          :to="{ name: 'Details', params: { slug: post.slug.current } }"
        >
          <img
            :src="getSanityImageUrl(post.contentImage)"
            alt="Post Image"
            class="post-list-item__img"
          />
          <h3 class="post-list-item__title">{{ post.title }}</h3>
        </RouterLink>
      </li>
    </ul>
  </article>
</template>

<style lang="scss" scoped>
.posts-list {
  list-style: none;
  padding: 0;

  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(auto, 1fr));
  gap: 20px;

  @media screen and (min-width: 500px) {
    grid-template-columns: repeat(auto-fill, minmax(calc(960px / 3), 1fr));
  }
}

.post-list-item {
  margin-bottom: 20px;
  padding: 10px;
  border-radius: 5px;

  display: grid;
  grid-template-rows: subgrid;
  
  box-shadow: 0 2px 4px rgba(0, 0, 0.1, 0.1);
  transition: box-shadow 0.3s ease;

  > a {
    text-decoration: none;
    color: inherit;

    display: grid;
    grid-template-rows: 1fr auto auto;
  }

  &:hover {
    box-shadow: 0 4px 8px rgba(0, 0, 0.2, 0.2);
  }

  @media screen and (max-width: 768px) {
    width: 100%;
  }
}

.post-list-item__img {
  max-width: 100%;
  height: 100%;
  border-radius: 5px;
  object-fit: cover;
}

.post-list-item__title {
  font-size: 1.5em;
  margin: 10px 0;

  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 100%;
}
</style>
