<script setup lang="ts">
import Header from "./components/Header.vue";
import Footer from "./components/Footer.vue";
import { RouterView, useRoute } from "vue-router";
import CookieBanner from "./components/CookieBanner.vue";

const route = useRoute();
</script>

<template>
  <Header></Header>
  <main>
    <RouterView />

    <CookieBanner />
  </main>
  <Footer v-if="route.name !== 'Details'"></Footer>
</template>

<style scoped lang="scss"></style>
