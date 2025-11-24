<script setup lang="ts">
import { useHead } from "@vueuse/head";
import Contact from "../components/content/Contact.vue";
import { usePageSeo } from "../composables/usePageSeo";
import { onMounted, ref } from "vue";
import type { PageSettings } from "../resources/interfaces/sanity.types";
import { setPageSeo } from "../helpers/useHead.helper";

const { getPageSeoByPage } = usePageSeo();
const pageSeo = ref<PageSettings>();
const contactData = ref<PageSettings["contactData"] | null>(null);

onMounted(async () => {
  pageSeo.value = await getPageSeoByPage("Contact");

  if (pageSeo.value) {
    contactData.value = pageSeo.value?.contactData;
    setPageSeo(pageSeo.value, window.location.href);
  }

  useHead({
    title: "Contact",
  });
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
