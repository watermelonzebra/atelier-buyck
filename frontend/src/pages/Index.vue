<script setup lang="ts">
import { useHead } from "@vueuse/head";
import Contact from "../components/content/Contact.vue";
import Fold from "../components/content/Fold.vue";
import Posts from "../components/content/Posts.vue";
import { onBeforeMount, ref } from "vue";
import { setPageSeo } from "../helpers/useHead.helper";
import { usePageSeo } from "../composables/usePageSeo";
import type { PageSettings } from "../resources/interfaces/sanity.types";

const { getPageSeoByPage } = usePageSeo();
const pageSeo = ref<PageSettings | null>(null);

useHead({
  title: "Home",
});

onBeforeMount(async () => {
  pageSeo.value = await getPageSeoByPage("Index");

  if (pageSeo.value) {
    setPageSeo(pageSeo.value, document.location.href);
  }
});

//  title: "Atelier Buyck | Maatwerk Interieur Project Starten? Vraag Advies in Izegem.",
// "description": "Ontdek hoe Sander Buyck u kan helpen bij het starten van uw maatwerk interieur project in Izegem. Vraag vandaag nog advies aan onze experts.",
</script>
<template>
  <section>
    <h1 class="visually-hidden">
      Maatwerk Interieur Project Starten? Vraag Advies in Izegem.
    </h1>
    <Fold :fold-image="pageSeo?.foldImage"></Fold>
    <Posts></Posts>
    <Contact :is-page="false" :contact-data="null"></Contact>
  </section>
</template>
<style lang="scss" scoped></style>
