<script setup lang="ts">
import Header from "./components/Header.vue";
import Footer from "./components/Footer.vue";
import { RouterView, useRoute } from "vue-router";
import CookieBanner from "./components/CookieBanner.vue";
import { onMounted } from "vue";

const route = useRoute();

onMounted(() => {
  const scale = window.devicePixelRatio;

  if (scale < 1) {
    window.devicePixelRatio = 1;
  }
});
</script>

<template>
  <Header></Header>
  <main>
    <RouterView />

    <CookieBanner />
  </main>
  <Footer v-if="route.name !== 'Details'"></Footer>
</template>

<style scoped lang="scss">
main {
  height: max-content;

  min-height: 65dvh;
}
</style>
