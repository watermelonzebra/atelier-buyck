<script setup lang="ts">
import { onMounted, ref } from "vue";
import { RouterLink } from "vue-router";

const navToggleInput = ref<HTMLInputElement | null>(null);

function handleClose() {
  if (navToggleInput.value) {
    navToggleInput.value.checked = false;
  }
}

const header = ref<HTMLElement | null>(null);
const circleElement = ref<HTMLElement | null>(null);

onMounted(() => {
  window.addEventListener("resize", handleClose);

  // make the header stay an disappear on scroll down, and appear on scroll up
  let lastScrollTop = 0;
  let timeout: NodeJS.Timeout | null = null;
  window.addEventListener("scroll", () => {
    if (timeout) clearTimeout(timeout)

    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    if (header.value) {
      if (scrollTop === 0) {
        header.value.classList.remove("has-background");
        header.value.classList.remove("no-overflow");
      } else {
        header.value.classList.add("has-background");
        header.value!.classList.add("no-overflow");
      }

      if (scrollTop > lastScrollTop) {
        // downscroll
        header.value.style.transform = "translateY(-200%)";
        if (circleElement.value) {
          circleElement.value.classList.add('hide-transform')
        }
      } else {
        // upscroll
        header.value.style.transform = "translateY(0)";
        if (circleElement.value) {
          circleElement.value.classList.remove('hide-transform')
        }
      }
    }

    lastScrollTop = scrollTop <= 0 ? 0 : scrollTop; // For Mobile or negative scrolling
  });
});
</script>
<template>
  <header ref="header">
    <div class="header-wrapper">
      <input ref="navToggleInput" type="checkbox" id="nav-toggle" class="nav-toggle" />
      <label for="nav-toggle" class="nav-toggle-label">
        <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M11 13L29 13" stroke="#000000" stroke-width="2" />
          <path d="M11 21L29 21" stroke="#000000" stroke-width="2" />
          <path d="M11 29L29 29" stroke="#000000" stroke-width="2" />
        </svg>
      </label>
      <nav>
        <div class="nav-toggle-button" @click.stop="handleClose">
          <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M10 10L30 30" stroke="#000000" stroke-width="2" stroke-linecap="round" />
            <path d="M30 10L10 30" stroke="#000000" stroke-width="2" stroke-linecap="round" />
          </svg>
        </div>

        <RouterLink class="nav-link" :to="{ name: 'Index' }" @click="handleClose">Atelier Buyck</RouterLink>
        <RouterLink class="nav-link" :to="{ name: 'Projects' }" @click="handleClose">Onze Projecten
        </RouterLink>
        <RouterLink class="nav-link -accent" :to="{ name: 'Contact' }" @click="handleClose">Contacteer
          ons
          <div class="circle-element" ref="circleElement"></div>
        </RouterLink>
      </nav>
    </div>
  </header>
</template>

<style scoped lang="scss">
header {
  padding: var(--spacing-xl);

  display: flex;
  justify-content: center;
  align-items: center;

  width: 100%;

  transition: all 0.3s ease;

  position: fixed;
  top: 0;
  z-index: 50;

  transition: transform 0.75s cubic-bezier(1, -0.3, 0.1, 1);

  &.has-background {
    background-color: var(--white);
  }

  &.no-overflow {
    overflow: hidden;
  }
}

.header-wrapper {
  display: flex;
  align-items: center;
  justify-content: space-between;

  width: 100%;
  margin: 0 auto;
}

// #region nav
input.nav-toggle {
  display: none;
}

.nav-toggle-label {
  cursor: pointer;
  margin-left: auto;

  >svg>path {
    stroke: var(--main-darkest);
    transition: stroke .5s cubic-bezier(0.18, 0.89, 0.32, 1.28);
  }

  &:hover {
    >svg>path {
      stroke: var(--main);
    }
  }
}

.nav-toggle~nav {
  opacity: 0;
  height: 100dvh;
  width: 100%;
  overflow: hidden;

  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  z-index: 10;

  display: flex;
  flex-flow: column;
  gap: var(--spacing-l);

  padding: var(--spacing-xl);

  background-color: var(--white);

  transform: translateX(-100%);

  transition: all .5s cubic-bezier(0.18, 0.89, 0.32, 1.28);

  @media screen and (min-width: 600px) {
    width: 100%;
    background-color: transparent;
  }
}

.nav-toggle:checked~nav {
  opacity: 1;
  transform: translateX(0);
}

.nav-toggle-button {
  display: flex;
  align-items: center;
  justify-content: center;

  width: 4rem;
  height: 4rem;

  margin-bottom: var(--spacing-l);
  margin-left: auto;

  cursor: pointer;

  >svg {
    width: 2.6rem;
    height: 2.6rem;
  }

  >svg>path {
    stroke: var(--black);
    transition: stroke .5s cubic-bezier(0.18, 0.89, 0.32, 1.28);
  }

  &:hover {
    >svg>path {
      stroke: var(--main);
    }
  }
}

@media screen and (min-width: 600px) {

  input.nav-toggle,
  label.nav-toggle-label {
    display: none;
  }

  .nav-toggle~nav {
    display: flex;
    flex-flow: row;
    align-items: center;
    justify-content: space-between;
    gap: var(--spacing-l);
    opacity: 1;
    height: auto;

    position: static;
    top: 0;
    left: 0;
    right: 0;
    z-index: 1;

    padding: 0;

    border-radius: unset;

    transition: none;

    transform: none;

    >a {
      height: auto;
    }

    .nav-toggle-button {
      display: none;
    }
  }
}

// #endregion

.nav-link:not(.nav-link.-accent) {
  font-weight: bold;
  font-size: var(--font-size-p);
  font-family: 'Lemon Milk';

  text-decoration: none;
  color: var(--main-darkest);

  width: max-content;

  transform-origin: left center;

  transition: all .5s cubic-bezier(0.18, 0.89, 0.32, 1.28);

  &:hover {
    // color: var(--main);
    transform: scale(1.05);
  }

  @media screen and (min-width: 600px) {}
}

.nav-link.-accent {
  font-weight: bold;
  font-size: var(--font-size-p);
  font-family: 'Lemon Milk';

  text-decoration: none;
  color: var(--main-darkest);
  display: flex;

  & .circle-element {
    transition: transform .5s cubic-bezier(0.18, 0.89, 0.32, 1.28);
    content: '';

    position: absolute;
    bottom: -8rem;
    right: -25rem;

    z-index: -1;
    transform-origin: bottom left;

    background-color: var(--main-dark);
    width: 50rem;
    height: 50rem;

    border-radius: 500rem;

    transform-origin: center center;

    &.hide-transform {
      transform: translateY(-50%);
      transition: transform 0.75s cubic-bezier(1, -0.3, 0.1, 1);
    }
  }

  @media screen and (min-width: 600px) {
    color: var(--white);

    &:hover {
      >div {
        transform: scale(1.1)
      }
    }

  }
}

.nav-link.-main {
  display: flex;
  align-items: center;

  margin-left: 0;

  cursor: pointer;

  font-family: var(--font-family-h);
  font-weight: bold;

  img {
    margin-right: var(--spacing-xs);
  }
}
</style>
