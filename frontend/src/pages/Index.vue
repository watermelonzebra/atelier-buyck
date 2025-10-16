<script setup lang="ts">
import { onMounted, ref } from "vue";
import { getPosts } from "../sanity";
import type { Post } from "../resources/interfaces/post.interface";
import Posts from "../components/Posts.vue";
import Fold from "../components/content/Fold.vue";

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
  <section>
    <Fold></Fold>
    <Posts></Posts>
  </section>
</template>
<style lang="scss" scoped>

</style>
