<script lang="ts" setup>
import { nextTick, onMounted, ref } from 'vue';
import { mm, gsap } from '../../resources/gsap';

const image = ref<HTMLElement | null>(null);

onMounted(async () => {
    await nextTick(() => {
        //timeout to ensure image is loaded
        setTimeout(() => {
            if (image.value) {
                mm.add("(min-width: 1000px)", () => {
                    // Get initial dimensions of the image

                    if (!image.value) return;

                    const initialRect = image.value.getBoundingClientRect();
                    const viewportWidth = window.innerWidth;
                    const viewportHeight = window.innerHeight;

                    // Calculate scale factors needed to fill viewport
                    const scaleX = viewportWidth / initialRect.width;
                    const scaleY = viewportHeight / initialRect.height;
                    const scaleFactor = Math.max(scaleX, scaleY);

                    const foldTimeline = gsap.timeline({
                        scrollTrigger: {
                            trigger: '.fold',
                            start: 'top top',
                            end: '+=50% top',
                            scrub: true,
                            pin: true,
                        }
                    })

                    foldTimeline.to('.fold__image-container-image',
                        {
                            scale: scaleFactor + 0.5,
                            ease: 'none',
                            filter: 'grayscale(100%) hue-rotate(90deg)',
                        }, 0)
                    foldTimeline.to('.fold__firmname',
                        {
                            transform: 'translateX(-50%) translateY(-50%)',
                            height: 'max-content',
                            top: '50%',
                            zIndex: 10,
                            ease: 'none',
                        }, 0)
                    foldTimeline.to('.fold__firmname',
                        {
                            ease: 'none',
                            scale: 80,
                            color: 'var(--main-darkest)',
                            duration: 2,
                        }, 1)

                });
            }
        }, 300);
    });
});
</script>
<template>
    <article class="fold">
        <div class="fold__content">
            <h1 class="visually-hidden">Ontdek wie Atelier Buyck is en wat ze doen</h1>
            <p class="fold__content-title">Start hier uw droomproject</p>
            <div class="fold__image-container">
                <img ref="image" class="fold__image-container-image" src="../../assets/img/fold-image@1440.png" alt=""
                    srcset="../../assets/img/fold-image@720.png 720w, ../../assets/img/fold-image@1440.png 1440w, ../../assets/img/fold-image@2160.png 2160w"
                    fetchpriority=" high" sizes="(min-width: 1000px) 1440vw, (min-width: 2000px) 2160w, 720w">
                <p>scroll en ontdek</p>
            </div>
            <p class="fold__content-description">Wij creëren maatwerk interieurs met een focus op detail, vakmanschap en
                de realisatie van uw unieke
                woonambities.</p>
        </div>
        <div id="fold-square"></div>
        <p class="fold__firmname">Atelier Buyck</p>
    </article>
</template>
<style lang="scss" scoped>
.fold {
    height: 100dvh;
    width: 100dvw;

    overflow: hidden;
    position: relative;
}

.fold__firmname {
    // should be aligned with the center of the screen
    @include line-height(0.7);
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    z-index: -1;
    width: calc(100% - var(--spacing-s) * 2);

    font-family: 'Lemon Milk', serif;
    font-weight: bold;
    font-size: 11vw;
    text-align: center;
    margin: 0 auto;

    color: var(--main);

    max-width: 144rem;

    @media screen and (min-width: 500px) {
        width: calc(100% - var(--spacing-l) * 2);
    }

    @media screen and (min-width: 1440px) {
        font-size: 16rem;
    }


}

#fold-square {
    position: absolute;
    left: 0;
    top: 50%;
    width: 150dvw;
    height: 150dvw;
    z-index: -1;

    background-color: var(--main-lightest);
    transform: translateY(-50%) translateX(-55%) rotate(45deg);

    @media screen and (min-width: 850px) {
        transform: translateX(-60%) translateY(-35%) rotate(45deg);
    }

    @media screen and (min-width: 1440px) {
        transform: translateX(-60%) translateY(-25%) rotate(45deg);
        width: 150dvh;
        height: 250dvh;
    }
}

.fold__content {
    display: grid;
    align-content: center;
    justify-content: center;
    gap: var(--spacing-xl);
    padding: 0 var(--spacing-s);

    height: 100%;
    max-width: 50rem;
    margin: 0 auto;

    @media screen and (min-width: 500px) {
        padding: var(--spacing-l);
    }

    @media screen and (min-width: 1050px) {
        padding: var(--spacing-xl);
        grid-template-columns: 31rem 1fr 31rem;
        gap: var(--spacing-l);
        max-width: 144rem;
    }

    @media screen and (min-width:1150px) {
        gap: var(--spacing-xxl);
    }

    @media screen and (min-width:1350px) {
        gap: var(--spacing-xxxl);
    }
}

.fold__content-title {
    display: flex;
    align-items: center;
    justify-content: center;

    font-family: 'Lemon Milk', serif;
    font-weight: bold;
    font-size: var(--font-size-h1);
}

.fold__content-description {
    display: flex;
    align-items: center;
    justify-content: center;
}

.fold__image-container {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: var(--spacing-l);

    flex-flow: column;
}

.fold__image-container-image {
    width: auto;
    height: auto;
    max-width: 100%;
    max-height: 100%;
    background-color: var(--black);
    background-blend-mode: screen;
}
</style>