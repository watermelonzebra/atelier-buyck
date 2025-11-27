<script setup lang="ts">
import { useHead } from "@vueuse/head";
import Contact from "../components/content/Contact.vue";
import { usePageSeo } from "../composables/usePageSeo";
import { onBeforeMount, ref } from "vue";
import type { PageSettings } from "../resources/interfaces/sanity.types";
import { setPageSeo } from "../helpers/useHead.helper";

const { getPageSeoByPage } = usePageSeo();
const pageSeo = ref<PageSettings>();
const contactData = ref<PageSettings["contactData"] | null>(null);

useHead({
  title: "Contact",
});

onBeforeMount(async () => {
  pageSeo.value = await getPageSeoByPage("Contact");

  if (pageSeo.value) {
    contactData.value = pageSeo.value?.contactData;
    setPageSeo(pageSeo.value, window.location.href);
  }
});
</script>
<template>
  <section class="contact">
    <h2 class="visually-hidden">Contact gegevens Atlier Buyck</h2>
    <Contact :is-page="true" :contactData></Contact>
  </section>
</template>
<style lang="scss" scoped>
.contact {
  margin-top: var(--spacing-xxl);
}
</style>
