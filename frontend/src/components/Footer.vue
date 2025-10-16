<script setup lang="ts"></script>
<template>
  <footer>
    <div class="footer-wrapper">
      <div></div>
      <div></div>
    </div>
  </footer>
</template>
<style scoped lang="scss">
footer {
  background: var(--main);
  color: var(--white);
  padding: 1rem;
  text-align: center;

  margin-top: auto;
}

.footer-wrapper {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
}

p {
  margin: 0.5rem 0;
}

a {
  color: var(--white);
  text-decoration: none;

  &:hover {
    color: var(--light);
  }
}
</style>
