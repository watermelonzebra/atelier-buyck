<script setup lang="ts">
import { usePosts } from "../composables/usePosts";
import {
  getSanityImageSrcSet,
  getSanityImageUrl,
  sizes,
} from "../helpers/sanity-image.helper";
import { usePageSeo } from "../composables/usePageSeo";
import { onMounted } from "vue";
import { setPageSeo } from "../helpers/useHead.helper";
import { useHead } from "@vueuse/head";

const { posts } = usePosts();
const { getPageSeoByPage } = usePageSeo();

onMounted(async () => {
  const pageSeo = await getPageSeoByPage("Projects");
  if (pageSeo) setPageSeo(pageSeo, document.location.href);
  useHead({
    title: "Projecten",
  });
});
</script>
<template>
  <section class="projects">
    <h2>Ontdek Ons Schrijnwerk & Maatwerk</h2>
    <ul class="projects__list">
      <li v-for="post in posts" :key="post._id" class="projects__list-item">
        <RouterLink
          :to="{ name: 'Details', params: { slug: post.slug?.current } }"
        >
          <img
            class="projects__list-item__img"
            :src="
              getSanityImageUrl(post.contentImage, {
                maxWidth: 700,
                aspectRatio: 1,
              })
            "
            :alt="post.contentImage?.alt || post.title"
            :sizes
            :srcset="
              getSanityImageSrcSet(post.contentImage, {
                maxWidth: 700,
                aspectRatio: 1,
              })
            "
            loading="eager"
            width="700"
          />
          <div :class="['projects__list-item__content', post.colorScheme]">
            <h3>{{ post.title }}</h3>
            <p>project bekijken <i class="ri-arrow-right-circle-line"></i></p>
            <div :class="['full-circle', post.colorScheme]"></div>
          </div>
        </RouterLink>
      </li>
    </ul>
  </section>
</template>
<style lang="scss" scoped>
.projects {
  margin-top: var(--spacing-xxxl);
  padding: var(--spacing-s);

  display: flex;
  flex-flow: column;
  gap: var(--spacing-xl);
  justify-content: center;
  align-items: center;

  > h2 {
    max-width: 140rem;
    font-size: 5vw;
  }

  @media screen and (min-width: 600px) {
    margin-top: calc(var(--spacing-xxxl) + 4rem);
    padding: var(--spacing-xl);
  }

  @media screen and (min-width: 850px) {
    margin-top: var(--spacing-xxxl);

    > h2 {
      font-size: 4vw;
    }
  }

  @media screen and (min-width: 1500px) {
    > h2 {
      font-size: 6.5rem;
    }
  }
}

.projects__list {
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: auto;
  gap: var(--spacing-l);
  align-items: center;

  padding: 0;

  width: 100%;
  max-width: max-content;

  @media screen and (min-width: 700px) {
    grid-template-columns: repeat(2, minmax(30rem, 70rem));
  }
}

.projects__list-item {
  width: 100%;
  aspect-ratio: 1/1;

  position: relative;

  overflow: hidden;

  cursor: pointer;

  a {
    display: inline-block;
    width: 100%;
    height: 100%;
  }

  img {
    width: 100%;
    height: auto;
    aspect-ratio: 1/1;
    object-fit: cover;
  }

  &:hover {
    .full-circle {
      transform: scale(1.02);
    }

    i {
      transform: translateX(50%);
    }
  }
}

.projects__list-item__content {
  position: absolute;
  bottom: 0;
  z-index: 10;

  width: 100%;
  margin-top: auto;

  padding: var(--spacing-l);

  @media screen and (min-width: 1000px) {
    padding: var(--spacing-xl);
  }

  &.green {
    color: var(--main-lightest);
  }

  &.yellow {
    color: var(--main-darkest);
  }

  &.brown {
    color: var(--main-lightest);
  }

  &.dark-brown {
    color: var(--main-light);
  }
}

i {
  display: inline-block;
  transition: all 0.75s cubic-bezier(1, -0.3, 0.1, 1);
}

.full-circle {
  position: absolute;
  top: -50%;
  left: calc((250% / 3) * -1);
  z-index: -1;
  transform-origin: center center;

  width: 250%;
  aspect-ratio: 1/1;

  border-radius: 500rem;

  transition: all 0.75s cubic-bezier(1, -0.3, 0.1, 1);

  @media screen and (min-width: 1000px) {
    top: -40%;
  }

  &.green {
    background-color: var(--main-dark);
  }

  &.brown {
    background-color: var(--main);
  }

  &.yellow {
    background-color: var(--main-light);
  }

  &.dark-brown {
    background-color: var(--main-darkest);
  }
}
</style>
