<script setup lang="ts">
import { defineProps } from "vue";

defineProps<{
  title?: string;
  close?: (payload?: MouseEvent) => void;
}>();
</script>

<template>
  <div class="modal-overlay" @click.self="close">
    <div class="modal-content" :style="{ width: '75dvw', height: '85dvh' }">
      <header>
        <h2>{{ title }}</h2>
        <button class="modal-close" @click="close">&times;</button>
      </header>
      <main>
          <slot name="default" />
      </main>
    </div>
  </div>
</template>

<style scoped lang="scss">
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}
.modal-content {
  background: var(--white);
  padding: 2rem;
  border-radius: 8px;
  position: relative;
  min-width: 300px;
  max-width: 90vw;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
}
.modal-image {
  max-width: 100%;
  height: auto;
  margin-bottom: 1rem;
  display: block;
}
.modal-close {
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: transparent;
  border: none;
  font-size: 1.2rem;
  cursor: pointer;
}

main {
  overflow-y: auto;
  max-height: 100%
}
</style>
