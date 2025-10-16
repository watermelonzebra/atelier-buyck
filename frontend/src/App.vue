<script setup lang="ts">
import Header from "./components/Header.vue";
import Footer from "./components/Footer.vue";
import { RouterView } from "vue-router";
</script>

<template>
  <main>
    <Suspense>
      <RouterView />

      <template #fallback>
        <div>Loading...</div>
      </template>
    </Suspense>
  </main>
  <Footer />
</template>

<style scoped lang="scss"></style>
