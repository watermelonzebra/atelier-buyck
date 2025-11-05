<script setup lang="ts">
import Header from "./components/Header.vue";
import Footer from "./components/Footer.vue";
import { RouterView, useRoute } from "vue-router";

const route = useRoute()
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
  </main>
  <Footer v-if="route.name !== 'Details'"></Footer>
</template>

<style scoped lang="scss"></style>
