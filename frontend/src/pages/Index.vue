<script setup lang="ts">
import { useHead } from "@vueuse/head";
import Contact from "../components/content/Contact.vue";
import Fold from "../components/content/Fold.vue";
import Posts from "../components/content/Posts.vue";

useHead({
  title: "Home",
  meta: [
    {
      name: "title",
      content: "Atelier Buyck | Maatwerk Interieur Project Starten? Vraag Advies in Izegem.",
    },
    {
      name: "description",
      content:
        "Ontdek hoe Sander Buyck u kan helpen bij het starten van uw maatwerk interieur project in Izegem. Vraag vandaag nog advies aan onze experts.",
    },
  ],
});
</script>
<template>
  <section>
    <h1 class="visually-hidden">Maatwerk Interieur Project Starten? Vraag Advies in Izegem.</h1>
    <Fold></Fold>
    <Posts></Posts>
    <Contact></Contact>
  </section>
</template>
<style lang="scss" scoped></style>
