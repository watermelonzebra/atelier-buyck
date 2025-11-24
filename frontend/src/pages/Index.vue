<script setup lang="ts">
import { useHead } from "@vueuse/head";
import Contact from "../components/content/Contact.vue";
import Fold from "../components/content/Fold.vue";
import Posts from "../components/content/Posts.vue";
import { onMounted } from "vue";
import { setPageSeo } from "../helpers/useHead.helper";
import { usePageSeo } from "../composables/usePageSeo";

const { getPageSeoByPage } = usePageSeo();

onMounted(async () => {
  const pageSeo = await getPageSeoByPage("Index");

  if (pageSeo) {
    setPageSeo(pageSeo, document.location.href);
  }

  useHead({
    title: "Home",
  });
});

//  title: "Atelier Buyck | Maatwerk Interieur Project Starten? Vraag Advies in Izegem.",
// "description": "Ontdek hoe Sander Buyck u kan helpen bij het starten van uw maatwerk interieur project in Izegem. Vraag vandaag nog advies aan onze experts.",
</script>
<template>
  <section>
    <h1 class="visually-hidden">
      Maatwerk Interieur Project Starten? Vraag Advies in Izegem.
    </h1>
    <Fold></Fold>
    <Posts></Posts>
    <Contact :is-page="false" :contact-data="null"></Contact>
  </section>
</template>
<style lang="scss" scoped></style>
