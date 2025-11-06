<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, onMounted } from "vue";
import { getSanityImageUrl, sizes, getSanityImageSrcSet } from "../../helpers/sanity-image.helper";
import { RouterLink } from "vue-router";
import gsap from "gsap";
import { usePosts } from "../../composables/usePosts";

const { posts, getAllPosts } = usePosts();
const clampedPosts = computed(() => posts.value?.slice(0, 3));
const postsAmount = computed(() => clampedPosts.value?.length || 0)

let projectsTimeline: gsap.core.Timeline;

async function loadGsapPostAnimations(timeline: gsap.core.Timeline, mm: gsap.MatchMedia) {

  const postElements = gsap.utils.toArray<HTMLElement>(".projects__posts-item");

  // Set initial state and Z-index
  // Z-index explanation: This ensures the post with the highest index (the one currently
  // scaling up) is always visible on top of the previously scaled post.
  gsap.set(postElements, { scale: 0, zIndex: (i) => postsAmount.value + i });

  postElements.forEach((post, i) => {
    timeline.to(post, {
      scale: 1,
      ease: "power4.inOut",
      duration: 0.4
    }, i - 0.9)


    const postContent = post.querySelector('.projects__posts-item__content')

    gsap.set(postContent, {
      translateX: '-50%',
      translateY: '-50%',
    });
    mm.add(
      {
        // A unique name for the context, useful for reverting/debugging
        isLandscape: '(min-aspect-ratio: 1/1)',
        isPortrait: '(max-aspect-ratio: 1/1)',
      },
      (context) => {
        let { isLandscape } = context.conditions as {
          isLandscape: boolean;
          isPortrait: boolean;
        };

        const largestSide = isLandscape ? '100dvw' : '100dvh';

        // 2. Scale it up and set duration
        timeline?.to(postContent, {
          scale: 1.5,
          translateX: '-50%',
          translateY: '-50%',
          width: largestSide,
          height: largestSide,
          duration: 0.3
        }, i - 0.6);

      })

    const postContentContainer = post.querySelector('.projects__posts-item__content-container')
    gsap.set(postContentContainer, { opacity: 0, y: 200 })
    timeline?.to(postContentContainer, {
      opacity: 1,
      y: 100,
      ease: "none",
      duration: 0.2,
    }, i - 0.4)
  })
}

async function loadGsapAnimations() {
  const { mm, tl } = await import("../../resources/gsap");
  mm.add(
    {
      // A unique name for the context, useful for reverting/debugging
      isDesktop: "(min-width: 1000px)",
      isMobile: "(max-width: 999px)",
    }, (context) => {
      let { isDesktop } = context.conditions as {
        isDesktop: boolean;
        isMobile: boolean;
      };

      projectsTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: '.projects',
          start: `${isDesktop ? '+=50% top' : 'top top'}`,
          end: `+=${(100 * postsAmount.value) + (isDesktop ? 50 : 0)}%`,
          pin: true,
          pinReparent: true,
          scrub: true,
        },
      })

      tl.add(projectsTimeline);

      loadGsapPostAnimations(projectsTimeline, mm)
    }
  )
}

onMounted(async () => {
  try {
    if (!posts.value?.length) await getAllPosts()
    await nextTick(async () => {
      await loadGsapAnimations();
    })
  } catch (error) {
    console.error("Error fetching posts:", error);
  }
});
</script>
<template>
  <article class="projects" id="projects">
    <h2 class="projects__title">Ontdek Ons Schrijnwerk & Maatwerk</h2>
    <ul class="projects__posts">
      <li v-for="(post, index) in clampedPosts" :key="post._id"
        :class="['projects__posts-item', index % 2 === 0 ? 'left' : 'right']">
        <RouterLink :to="{ name: 'Details', params: { slug: post.slug?.current } }">
          <img :src="getSanityImageUrl(post.contentImage)" :srcset="getSanityImageSrcSet(post.contentImage)" :sizes
            alt="Post Image" class="projects__posts-item-cover" />
          <div :class="['projects__posts-item__content-container', post.colorScheme]">
            <h3 class="projects__posts-item__content-title">
              {{ post.title }}
            </h3>
            <p class="text-small">Klik om het project te bekijken</p>
          </div>
          <div :class="['projects__posts-item__content', post.colorScheme]">
          </div>
        </RouterLink>
      </li>
    </ul>
  </article>
</template>

<style lang="scss" scoped>
.projects {
  height: 100dvh;
  width: 100dvw;

  display: flex;
  align-items: center;
  justify-content: center;

  position: relative;

  background-color: var(--main-darkest);
  color: var(--main-light);

  padding: var(--spacing-s);

  overflow: hidden;
}

.projects__title {
  text-align: center;
  font-size: 10vw !important;
  line-height: 1.6 !important;

  @media screen and (min-width: 1440px) {
    font-size: 14.5rem !important;
    margin: 0 auto;
  }
}

.projects__posts {
  list-style: none;
  padding: 0;
  margin: 0;

  position: absolute;
  width: 100%;
  height: 100%;

  display: grid;
  grid-template-columns: 100%;
  grid-template-rows: 100%;
}

.projects__posts-item {
  position: relative;
  width: 100%;
  height: 100%;

  grid-column: 1/2;
  grid-row: 1/2;

  transform-origin: bottom center;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}

.projects__posts-item__content {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translateX(-50%) translateY(-50%);
  z-index: 1;

  width: 0;
  height: 0;

  color: var(--white);
  text-decoration: none;

  font-size: large;
  line-height: large;

  transform-origin: center center;

  border-radius: 500rem;

  display: flex;
  flex-flow: column;

  &.dark-brown {
    background-color: var(--main-darkest);
    color: var(--main-light)
  }

  &.light-brown {
    background-color: var(--main);
    color: var(--main-lightest);
  }

  &.yellow {
    background-color: var(--main-light);
    color: var(--main-darkest);
  }

  &.green {
    background-color: var(--main-dark);
    color: var(--main-lightest);
  }
}

.projects__posts-item__content-container {
  position: absolute;
  bottom: 0;
  left: 0;
  top: 0;
  right: 0;
  z-index: 2;


  padding: var(--spacing-xxxl) var(--spacing-xl);

  &.dark-brown {
    color: var(--main-light)
  }

  &.light-brown {
    color: var(--main-lightest);
  }

  &.yellow {
    color: var(--main-darkest);
  }

  &.green {
    color: var(--main-lightest);
  }

  >p {
    font-size: var(--font-size-p);
  }

  @media screen and (min-width: 500px) {

    >h3 {
      font-size: 3vw !important;
      line-height: 1.6;
    }
  }

  @media screen and (min-width: 700px) {
    padding: var(--spacing-xxl);
  }

  @media screen and (min-width: 1300px) {
    padding: var(--spacing-xxxl);
  }
}
</style>
