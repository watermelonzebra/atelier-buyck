<script setup lang="ts">
import Posts from "../components/content/Posts.vue";
import Fold from "../components/content/Fold.vue";
import { defineAsyncComponent, onBeforeMount, onMounted } from "vue";

onBeforeMount(() => {
  console.time("Index");
})

onMounted(() => {
  console.timeEnd("Index");
})

// const asyncPosts = defineAsyncComponent(() => import("../components/content/Posts.vue"))
</script>
<template>
  <section>
    <h2 class="visually-hidden">Maatwerk Interieur Project Starten? Vraag Advies in Izegem.</h2>
    <Fold></Fold>
    <!-- <Suspense>
      <asyncPosts />
      <template #fallback>
        <div>Loading...</div>
      </template>
    </Suspense> -->
    <Posts />
  </section>
</template>
<style lang="scss" scoped>

</style>
