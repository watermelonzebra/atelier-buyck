<script setup lang="ts">
import { useRouteParams } from "@vueuse/router";
import { useRouter } from "vue-router";
import { nextTick, onBeforeUnmount, onMounted, onUnmounted, ref, watch, type Ref } from "vue";
import { getSanityImageSrcSet, getSanityImageUrl, sizes } from "../helpers/sanity-image.helper";
import { toHTML } from "@portabletext/to-html";
import type { Post } from "../resources/interfaces/sanity.types";
import type { TypedObject } from "@sanity/types";
import { usePosts } from "../composables/usePosts";
import { gsap } from '../resources/gsap';
import { ScrollTrigger } from "gsap/ScrollTrigger";

type PageColors = 'yellow' | 'brown' | 'green' | 'dark-brown' | 'white';
interface Colors {
  text: PageColors,
  circle: PageColors,
  square: PageColors,
}

const slug = useRouteParams("slug");
const router = useRouter();
const post = ref<Post | null>(null);
const nextPost = ref<Post | null>(null);
const body = ref<string | null>(null);

let timeline: gsap.core.Timeline

const { getPostBySlug, getNextPostBySlug } = usePosts();

const colors = ref<Colors>({
  text: 'white',
  circle: 'green',
  square: 'brown',
});
const nextPostColors = ref<Colors>({
  text: 'white',
  circle: 'green',
  square: 'brown',
});

function handleColors(color: Post['colorScheme'], ref: Ref<Colors>) {
  switch (color) {
    case 'brown': {
      ref.value = {
        text: 'white',
        circle: 'brown',
        square: 'green',
      }
    }
      break;
    case 'green':
      {
        ref.value = {
          text: 'white',
          circle: 'green',
          square: 'brown',
        }
      }
      break;
    case 'yellow':
      {
        ref.value = {
          text: 'dark-brown',
          circle: 'yellow',
          square: 'dark-brown',
        }
      }
      break;
    case 'dark-brown':
      {
        ref.value = {
          text: 'yellow',
          circle: 'dark-brown',
          square: 'yellow',
        }
      }
      break;
    default: {
      ref.value = {
        text: 'white',
        circle: 'brown',
        square: 'green',
      }
    }
      break;
  }

}

const nextPostContainer = ref<HTMLElement | null>(null)
function loadAnimations() {
  console.log(nextPostContainer.value)
  if (!nextPostContainer.value) return

  gsap.set(nextPostContainer.value, { yPercent: -50 })

  timeline = gsap.timeline({ paused: true });
  timeline.to(nextPostContainer.value, { yPercent: 0, ease: 'none' });

  ScrollTrigger.create({
    trigger: '.project',
    scrub: true,
    start: "bottom bottom",
    end: '+=100%',
    animation: timeline,
    markers: true,
  })
}

function loadTransitionAnimations() {
  // hide gallery
  // hide all other text
  gsap.to('.project__content', {

  })
}

watch(
  slug,
  async (currentSlug, previousSlug) => {
    // check if currentSlug is not an array or undefined
    if (Array.isArray(currentSlug) || currentSlug === undefined || currentSlug === previousSlug) {
      console.log('no slug || same slug')
      return router.back();
    }
    if (currentSlug) {
      try {
        // Fetch the post details using the slug
        post.value = await getPostBySlug(currentSlug as unknown as Post['slug']);

        if (!post.value) router.back();

        console.log(post.value)

        body.value = toHTML(post.value?.body as unknown as TypedObject);
        handleColors(post.value?.colorScheme, colors)

        nextPost.value = await getNextPostBySlug(currentSlug as unknown as Post['slug'])
        handleColors(nextPost.value?.colorScheme, nextPostColors)

        loadTransitionAnimations();

        nextTick(() => {
          setTimeout(() => {
            loadAnimations();
          }, 300)
        })
      } catch (error) {
        console.error("Error fetching post details:", error);
      }
    }
  },
  { immediate: true }
);

async function handleScroll() {
  // 2. Get scroll metrics
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  const isAtBottom = scrollTop === document.documentElement.scrollHeight - window.innerHeight;

  if (isAtBottom) {
    console.log('go to page')
    // Kill all ScrollTriggers
    ScrollTrigger.killAll();

    setTimeout(async () => {
      await router.push({ name: 'Details', params: { slug: nextPost.value?.slug?.current } })
    }, 500)

  }
}

onMounted(() => {
  window.addEventListener("scroll", handleScroll);
});
onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll);
});
</script>
<template>
  <section v-if="post" class="project">
    <article :class="['project__content', colors.text]">
      <p class="back-button" @click="router.push({ name: 'Projects' })">
        <i class="ri-arrow-left-circle-line"></i>
        <span>Terug naar het overzicht</span>
      </p>
      <div class="project__content-title">
        <h2>{{ post.title }}</h2>
        <p>{{ post.year }}</p>
      </div>
      <div class="" v-html="body"></div>
      <RouterLink class="contact-button" :to="{ name: 'Contact' }">
        {{ post.callToAction }}
      </RouterLink>
    </article>
    <article class="project__gallery">
      <img v-if="post.contentImage" :src="getSanityImageUrl(post.contentImage)"
        :srcset="getSanityImageSrcSet(post.contentImage)" :sizes :alt="post.contentImage?.alt || post.title"
        width="500" />
      <img v-for="image in post.imageGallery" :key="image._key" :src="getSanityImageUrl(image as any)"
        :srcset="getSanityImageSrcSet(image as any)" :sizes :alt="image?.alt || post.title" width="500" />
      <div class="project__gallery-action">
        <p>blijf scrollen voor het volgende project</p>
      </div>
    </article>
    <div :class="['full-circle', colors.circle]"></div>
    <div :class="['full-square', colors.square]"></div>
  </section>
  <section ref="nextPostContainer" :class="['project__next-project', nextPostColors.circle]">
    <p>{{ nextPost?.title }}</p>
  </section>
</template>
<style lang="scss" scoped>
.project {
  display: grid;
  grid-template-columns: 1fr;
  gap: var(--spacing-l);

  padding: 0 var(--spacing-s);
  padding-top: calc(var(--spacing-xxxl) + var(--spacing-l));

  background-color: var(--main-lightest);

  position: relative;
  z-index: 10;
  overflow: hidden;

  @media screen and (min-width: 600px) {
    padding: 0 var(--spacing-xl);
    padding-top: calc(var(--spacing-xxxl) + var(--spacing-l));
  }

  @media screen and (min-width: 1000px) {
    grid-template-columns: 1fr 1fr;
    gap: var(--spacing-xl);
  }
}

.project__content {
  display: flex;
  flex-flow: column;
  gap: var(--spacing-l);

  @media screen and (min-width: 1000px) {
    max-width: 65rem;
  }

  &.green {
    color: var(--main-dark);
  }

  &.white {
    color: var(--main-lightest);
  }

  &.yellow {
    color: var(--main-light);
  }

  &.brown {
    color: var(--main);
  }

  &.dark-brown {
    color: var(--main-darkest);
  }
}

.project__content-title {
  display: flex;
  flex-flow: column;
  line-height: 1.6;

  >h2 {
    font-size: 8vw;

    @media screen and (min-width: 1000px) {
      font-size: 4.5rem;
    }
  }
}

.project__gallery {
  display: flex;
  flex-flow: column;
  gap: var(--spacing-l);

  img {
    display: inline-block;
    width: 100%;
    height: auto;
  }

  @media screen and (min-width: 1000px) {
    grid-column: 2 /3;
  }
}

.project__gallery-action {
  width: 100%;
  height: auto;

  aspect-ratio: 2/1;

  display: flex;
  justify-content: center;
  align-items: center;
}

.back-button {
  display: flex;
  gap: var(--spacing-xs);
  font-size: var(--font-size-s);
  cursor: pointer;

  i {
    transition: transform 0.3s ease-in-out;
    transform: translateX(50%);
  }

  &:hover {
    i {
      transform: translateX(0%);
    }
  }
}

.full-circle,
.full-square {
  position: absolute;
  z-index: -1;
  transform-origin: center center;

  width: 240dvw;
  height: 240dvw;

  @media screen and (min-width: 1000px) {
    width: 110dvw;
    height: 110dvw;
  }
}

.full-circle {
  top: -18rem;
  left: -130dvw;
  border-radius: 500rem;

  @media screen and (min-width: 1000px) {
    left: -50%;
    top: -10rem;
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

.full-square {
  transform-origin: unset;
  top: 240dvw;
  left: -20%;
  transform: rotate(45deg);

  &.brown {
    background-color: var(--main);
  }

  &.yellow {
    background-color: var(--main-light);
  }

  &.dark-brown {
    background-color: var(--main-darkest);
  }

  &.green {
    background-color: var(--main-dark);
  }

  @media screen and (min-width: 1000px) {
    border-width: calc(110dvh/6);
    left: 60%;
    top: 150dvh;
  }
}

.project__next-project {
  width: 100dvw;
  height: 100dvh;

  font-family: 'Lemon Milk';
  font-weight: bold;
  font-size: 6vw;

  text-align: center;

  display: flex;
  justify-content: center;
  align-items: center;

  &.yellow {
    background-color: var(--main-light);
    color: var(--main-darkest);
  }

  &.green {
    background-color: var(--main-dark);
    color: var(--main-lightest);
  }

  &.brown {
    background-color: var(--main);
    color: var(--main-lightest);
  }

  &.dark-brown {
    background-color: var(--main-darkest);
    color: var(--main-light);
  }
}
</style>
