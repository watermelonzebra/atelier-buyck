<script setup lang="ts">
import { onMounted, ref } from "vue";
import { RouterLink } from "vue-router";

const navToggleInput = ref<HTMLInputElement | null>(null);

function handleClose() {
  if (navToggleInput.value) {
    navToggleInput.value.checked = false;
  }
}

onMounted(() => {
  window.addEventListener("resize", handleClose);
});
</script>
<template>
  <header>
    <div class="header-wrapper">
      <input
        ref="navToggleInput"
        type="checkbox"
        id="nav-toggle"
        class="nav-toggle"
      />
      <label for="nav-toggle" class="nav-toggle-label">
        <svg
          width="40"
          height="40"
          viewBox="0 0 40 40"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M11 13L29 13"
            stroke="#000000"
            stroke-width="2"
            
          />
          <path
            d="M11 21L29 21"
            stroke="#000000"
            stroke-width="2"
          />
          <path
            d="M11 29L29 29"
            stroke="#000000"
            stroke-width="2"
          />
        </svg>
      </label>
      <nav>
        <div class="nav-toggle-button" @click.stop="handleClose">
          <svg
            width="40"
            height="40"
            viewBox="0 0 40 40"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M10 10L30 30"
              stroke="#000000"
              stroke-width="2"
              stroke-linecap="round"
            />
            <path
              d="M30 10L10 30"
              stroke="#000000"
              stroke-width="2"
              stroke-linecap="round"
            />
          </svg>
        </div>

        <RouterLink class="nav-link" to="#projects" @click="handleClose"
          >Projecten</RouterLink
        >
        <RouterLink class="nav-link" to="#about" @click="handleClose"
          >Over ons</RouterLink
        >
        <RouterLink class="nav-link -accent" to="#contact" @click="handleClose"
          >Contact</RouterLink
        >
      </nav>
    </div>
  </header>
</template>

<style scoped lang="scss">
header {
  padding: var(--spacing-s) var(--spacing-l);
  margin: var(--spacing-l) var(--spacing-s);
  border-radius: var(--spacing-l);

  background-color: var(--white);

  display: flex;
  justify-content: space-between;
  align-items: center;

  transition: all 0.3s ease;

  @media screen and (min-width: 768px) {
    padding: var(--spacing-s) var(--spacing-xxl);
  }

  @media screen and (min-width: 1220px) {
    margin: var(--spacing-l) var(--spacing-s);
  }
}

.header-wrapper {
  display: flex;
  align-items: center;
  justify-content: space-between;

  width: 100%;
  max-width: 96rem;
  margin: 0 auto;
}

// #region nav
input.nav-toggle {
  display: none;
}

.nav-toggle-label {
  cursor: pointer;

  > svg > path {
    stroke: var(--black);
    transition: stroke 0.3s cubic-bezier(0.075, 0.82, 0.165, 1);
  }

  &:hover {
    > svg > path {
      stroke: var(--main);
    }
  }
}

.nav-toggle ~ nav {
  opacity: 0;
  height: 100dvh;
  width: 0;
  overflow: hidden;

  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  z-index: 10;

  display: inline-flex;
  flex-flow: column;
  gap: 0;

  background-color: var(--white);
  border-radius: 0 0 var(--spacing-l) var(--spacing-l);

  padding: 0 var(--spacing-l);
  padding-top: var(--spacing-l);

  > a,
  .nav-toggle-button {
    height: 0;
  }

  transition: all 0.3s cubic-bezier(0.075, 0.82, 0.165, 1);

  @media screen and (min-width: 500px) {
    width: auto;
  }
}

.nav-toggle:checked ~ nav {
  opacity: 1;

  width: 100%;
  height: 100dvh;

  gap: var(--spacing-l);

  padding: var(--spacing-l);
  padding-right: calc(var(--spacing-l) + var(--spacing-s));
  padding-top: calc(var(--spacing-l) + var(--spacing-s));

  > a {
    height: auto;
  }

  > .nav-toggle-button {
    height: 4rem;
  }
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

  > svg {
    width: 2.6rem;
    height: 2.6rem;
  }

  > svg > path {
    stroke: var(--black);
    transition: stroke 0.3s cubic-bezier(0.075, 0.82, 0.165, 1);
  }

  &:hover {
    > svg > path {
      stroke: var(--main);
    }
  }
}

@media screen and (min-width: 500px) {
  input.nav-toggle,
  label.nav-toggle-label {
    display: none;
  }

  .nav-toggle ~ nav {
    display: flex;
    flex-flow: row;
    align-items: center;
    gap: var(--spacing-l);
    opacity: 1;
    height: auto;

    position: relative;
    top: 0;
    left: 0;
    right: 0;
    z-index: 1;

    padding: 0;

    border-radius: unset;

    transition: none;

    > a {
      height: auto;
    }

    .nav-toggle-button {
      display: none;
    }
  }
}
// #endregion

.nav-link {
  font-weight: bold;
  font-size: var(--font-size-sb);

  text-decoration: none;
  color: var(--black);

  transition: color 0.3s cubic-bezier(0.075, 0.82, 0.165, 1);

  width: max-content;

  margin-left: auto;

  &:hover {
    color: var(--main);
  }
}

.nav-link.-accent {
  background-color: var(--main);
  color: var(--white);
  padding: var(--spacing-xs) var(--spacing-l);

  border-radius: var(--spacing-s);

  transition: background-color 0.3s cubic-bezier(0.075, 0.82, 0.165, 1);

  &:hover {
    background-color: var(--main-hover);
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
