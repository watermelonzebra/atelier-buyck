<script setup lang="ts">
import { useHead } from '@vueuse/head';
import Contact from '../components/content/Contact.vue';

useHead({
    title: 'Contact | Atelier Buyck',
    meta: [
        {
            name: 'title',
            content: 'Contact | Atelier Buyck',
        },
        {
            name: 'description',
            content: 'Get in touch with Sander Buyck for inquiries, collaborations, or feedback. Reach out via email or social media platforms.',
        },
    ],
})
</script>
<template>
  <section class="contact">
    <Contact></Contact>
  </section>
</template>
<style lang="scss" scoped>
.contact {
  margin-top: var(--spacing-xxl);
}
</style>
