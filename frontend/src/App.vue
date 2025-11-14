<script setup lang="ts">
import Header from "./components/Header.vue";
import Footer from "./components/Footer.vue";
import { RouterView, useRoute } from "vue-router";
import { onBeforeMount } from "vue";

const route = useRoute();

import { usePosts } from "./composables/usePosts";
import CookieBanner from "./components/CookieBanner.vue";

const { getAllPosts } = usePosts()

onBeforeMount(() => {
  getAllPosts()
})
</script>

<template>
  <Header></Header>
  <main>
    <Suspense>
      <RouterView />

      <template #fallback>
        <div>Loading...</div>
      </template>
    </Suspense>
    <CookieBanner />
  </main>
  <Footer v-if="route.name !== 'Details'"></Footer>
</template>

<style scoped lang="scss"></style>
