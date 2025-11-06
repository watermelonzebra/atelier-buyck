<script setup lang="ts">
import Contact from "../components/content/Contact.vue";
import Fold from "../components/content/Fold.vue";
import { defineAsyncComponent } from "vue";

const asyncPosts = defineAsyncComponent(() => import("../components/content/Posts.vue"))
</script>
<template>
  <section>
    <h1 class="visually-hidden">Maatwerk Interieur Project Starten? Vraag Advies in Izegem.</h1>
    <Fold></Fold>
    <Suspense>
      <asyncPosts />
      <template #fallback>
        <div>Loading...</div>
      </template>
    </Suspense>
    <Contact></Contact>
  </section>
</template>
<style lang="scss" scoped></style>
