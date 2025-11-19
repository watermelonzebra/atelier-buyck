<script setup lang="ts">
import { useRouteParams } from "@vueuse/router";
import { useRouter } from "vue-router";
import { nextTick, onMounted, onUnmounted, ref, watch, type Ref } from "vue";
import {
  getSanityImageSrcSet,
  getSanityImageUrl,
  sizes,
} from "../helpers/sanity-image.helper";
import { toHTML } from "@portabletext/to-html";
import type { Post } from "../resources/interfaces/sanity.types";
import type { TypedObject } from "@sanity/types";
import { usePosts } from "../composables/usePosts";
import { gsap, mm } from "../resources/gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useHead } from "@vueuse/head";

type PageColors = "yellow" | "brown" | "green" | "dark-brown" | "white";
interface Colors {
  text: PageColors;
  circle: PageColors;
  square: PageColors;
}

const showTransitionAnimation = ref(false);

const slug = useRouteParams("slug");
const router = useRouter();
const post = ref<Post | null>(null);
const nextPost = ref<Post | null>(null);
const body = ref<string | null>(null);

router.beforeEach((_to, from, next) => {
  // If navigating away from Details page, kill ScrollTrigger instances
  if (from.name === "Details") {
    showTransitionAnimation.value = true;
  }
  next();
});

let timeline: gsap.core.Timeline;

const { getPostBySlug, getNextPostBySlug } = usePosts();

const colors = ref<Colors>({
  text: "white",
  circle: "green",
  square: "brown",
});
const nextPostColors = ref<Colors>({
  text: "white",
  circle: "green",
  square: "brown",
});

function handleColors(color: Post["colorScheme"], ref: Ref<Colors>) {
  switch (color) {
    case "brown":
      {
        ref.value = {
          text: "white",
          circle: "brown",
          square: "green",
        };
      }
      break;
    case "green":
      {
        ref.value = {
          text: "white",
          circle: "green",
          square: "brown",
        };
      }
      break;
    case "yellow":
      {
        ref.value = {
          text: "dark-brown",
          circle: "yellow",
          square: "dark-brown",
        };
      }
      break;
    case "dark-brown":
      {
        ref.value = {
          text: "yellow",
          circle: "dark-brown",
          square: "yellow",
        };
      }
      break;
    default:
      {
        ref.value = {
          text: "white",
          circle: "brown",
          square: "green",
        };
      }
      break;
  }
}

const nextPostContainer = ref<HTMLElement | null>(null);
function loadAnimations() {
  if (!nextPostContainer.value) return;

  gsap.set(nextPostContainer.value, { yPercent: -50 });

  timeline = gsap.timeline({ paused: true });
  timeline.to(nextPostContainer.value, { yPercent: 0, ease: "none" });

  ScrollTrigger.create({
    trigger: ".project",
    scrub: true,
    start: "bottom bottom",
    end: "+=100%",
    animation: timeline,
    markers: true,
  });
}

function loadTransitionAnimations() {
  const contentToReveal = [
    ".project__gallery",
    ".back-button",
    ".project__content-title-year",
    ".project__content-body",
    ".contact-button",
  ];
  gsap.set(contentToReveal, { opacity: 0 });

  mm.add(
    {
      // A unique name for the context, useful for reverting/debugging
      isThousand: "(min-width: 1000px)",
      isPortrait: "(max-aspect-ratio: 1/1)",
    },
    (context) => {
      let { isThousand } = context.conditions as {
        isThousand: boolean;
        isPortrait: boolean;
      };

      if (isThousand) {
        gsap.from([".full-circle"], {
          width: "200dvw",
          height: "200dvh",
          ease: "sine.inOut",
          zIndex: 10,
        });
      } else {
        gsap.from([".full-circle"], {
          width: "200dvw",
          height: "200dvh",
          top: "-10%",
          left: "-50%",
          ease: "sine.inOut",
          zIndex: 10,
        });
      }
    }
  );

  gsap.from(".project__content-title>h2", {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 20,
    ease: "sine.inOut",
    fontWeight: "bold",
    fontSize: "6vw",
    width: "100dvw",
    height: "100dvh",
    marginTop: "calc(var(--spacing-xxxl) * -1)",
  });

  gsap.to(contentToReveal, {
    opacity: 1,
    delay: 0.75,
    ease: "sine.inOut",
  });
}

function toggleScrollable() {
  document.body.classList.toggle("not-scrollable");
}

function handleHeaderColor(color: PageColors, colorLinks: boolean = true) {
  const links = document.querySelector("header")?.querySelectorAll(".nav-link");
  if (!links) return;

  if (colorLinks) {
    links.forEach((link) => {
      link.classList.remove("yellow", "brown", "green", "dark-brown", "white");
      link.classList.add(color);
    });
  } else {
    links.forEach((link) => {
      link.classList.remove("yellow", "brown", "green", "dark-brown", "white");
    });
  }
}

watch(
  slug,
  async (currentSlug, previousSlug) => {
    // check if currentSlug is not an array or undefined
    if (
      Array.isArray(currentSlug) ||
      currentSlug === undefined ||
      currentSlug === previousSlug
    ) {
      return router.back();
    }
    if (currentSlug) {
      try {
        toggleScrollable();

        // Fetch the post details using the slug
        post.value = await getPostBySlug(
          currentSlug as unknown as Post["slug"]
        );

        if (!post.value) {
          toggleScrollable();
          await router.back();
          return;
        }

        useHead({
          title: `${post.value.title} - Atelier Buyck`,
          meta: [
            {
              name: "title",
              content: `${post.value.title} - Atelier Buyck`,
            },
            {
              name: "description",
              content: `Bekijk het project ${post.value.title} van Atelier Buyck.`,
            },
          ],
        });

        body.value = toHTML(post.value?.body as unknown as TypedObject);
        handleColors(post.value?.colorScheme, colors);

        nextPost.value = await getNextPostBySlug(
          currentSlug as unknown as Post["slug"]
        );
        handleColors(nextPost.value?.colorScheme, nextPostColors);

        handleHeaderColor(colors.value.circle);

        if (showTransitionAnimation.value) {
          loadTransitionAnimations();
        } else {
          toggleScrollable();
        }

        setTimeout(() => {
          if (showTransitionAnimation.value) toggleScrollable();

          nextTick(() => {
            loadAnimations();
          });
        }, 1000);
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
  const isAtBottom =
    scrollTop >= document.documentElement.scrollHeight - window.innerHeight;

  if (isAtBottom) {
    await router.push({
      name: "Details",
      params: { slug: nextPost.value?.slug?.current },
    });
  }
}

onMounted(() => {
  window.addEventListener("scroll", handleScroll);
});
onUnmounted(() => {
  window.removeEventListener("scroll", handleScroll);
  handleHeaderColor("white", false);
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
        <p class="project__content-title-year">{{ post.year }}</p>
      </div>
      <div class="project__content-body" v-html="body"></div>
      <RouterLink
        :class="['contact-button', colors.circle]"
        :to="{ name: 'Contact' }"
      >
        {{ post.callToAction }}
      </RouterLink>
    </article>
    <article class="project__gallery">
      <img
        v-if="post.contentImage"
        :src="getSanityImageUrl(post.contentImage)"
        :srcset="getSanityImageSrcSet(post.contentImage)"
        :sizes
        :alt="post.contentImage?.alt || post.title"
        width="500"
        lazy
      />
      <img
        v-for="image in post.imageGallery"
        :key="image._key"
        :src="getSanityImageUrl(image as any)"
        :srcset="getSanityImageSrcSet(image as any)"
        :sizes
        :alt="image?.alt || post.title"
        width="500"
        lazy
      />
      <div class="project__gallery-action">
        <p>blijf scrollen voor het volgende project</p>
      </div>
    </article>
    <div :class="['full-circle', colors.circle]"></div>
    <div :class="['full-square', colors.square]"></div>
  </section>
  <section
    ref="nextPostContainer"
    :class="['project__next-project', nextPostColors.circle]"
  >
    <p>{{ nextPost?.title }}</p>
  </section>
</template>
<style lang="scss">
html:has(body.not-scrollable) {
  overflow: hidden !important;
}
</style>

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

  > h2 {
    font-size: 8vw;
    height: auto;

    @media screen and (min-width: 600px) {
      font-size: 4.5rem;

      max-width: 95%;
    }

    @media screen and (min-width: 835px) {
      max-width: 65%;
    }

    @media screen and (min-width: 1000px) {
      max-width: 100%;
    }
  }
}

.project__content-body {
  @media screen and (min-width: 650px) {
    max-width: 90%;
  }

  @media screen and (min-width: 835px) {
    max-width: 65%;
  }

  @media screen and (min-width: 1000px) {
    max-width: 100%;
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
  top: -2%;
  left: -130dvw;
  border-radius: 120dvw;

  @media screen and (min-width: 1000px) {
    left: -50%;
    top: -10rem;
    border-radius: 60dvw;
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
  top: 270dvw;
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
    border-width: calc(110dvh / 6);
    left: 60%;
    top: 180dvh;
  }
}

.project__next-project {
  width: 100dvw;
  height: 100dvh;

  font-family: "Lemon Milk";
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

.contact-button {
  display: inline-block;
  padding: var(--spacing-s) var(--spacing-xl);

  width: max-content;
  border-radius: 50rem;

  font-weight: bold;
  text-decoration: none;

  background-color: var(--main-lightest);
  cursor: pointer;

  transition: transform 0.75s cubic-bezier(1, -0.3, 0.1, 1);

  &:hover {
    transform: scale(1.05);
  }

  &.yellow {
    color: var(--main-darkest);
  }

  &.green {
    color: var(--main-dark);
  }

  &.brown {
    color: var(--main);
  }

  &.dark-brown {
    color: var(--main-darkest);
  }
}

.project__next-project,
.full-circle,
.full-square,
.project__gallery img {
  /* Hint to the browser to put the element on the compositor layer */
  will-change: transform;
  transform: translateZ(0);
  backface-visibility: hidden;

  /* isolate painting/layout where supported to reduce re-layout cost */
  contain: paint;
}
</style>
