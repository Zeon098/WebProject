<template>
  <div class="mt-20">
    <div v-if="!images || images.length === 0" class="text-center py-8">
      <p class="text-gray-500">No images available</p>
    </div>
    <div v-else class="gallery-container">
      <div class="gallery-scroll">
        <div
          v-for="(image, index) in images"
          :key="image"
          class="gallery-item"
          :style="`background-image: url(${image})`"
        >
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import type { PropType } from "vue";
  const props = defineProps({
    images: {
      type: Array as PropType<string[]>,
      required: true,
    },
  });
</script>

<style lang="postcss" scoped>
  .gallery-container {
    @apply relative;
    border-radius: 24px;
    overflow: hidden;
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
  }

  .gallery-scroll {
    @apply flex w-full;
    flex-direction: row;
    overflow-x: auto;
    overflow-y: hidden;
    scrollbar-width: none; /* Firefox */
    -ms-overflow-style: none; /* IE and Edge */
    white-space: nowrap;
  }

  .gallery-scroll::-webkit-scrollbar {
    display: none; /* Chrome, Safari, Opera */
  }

  .gallery-item {
    @apply flex-shrink-0 bg-gray-200 border-r border-gray-300 relative cursor-pointer;
    width: 400px;
    height: 300px;
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    display: inline-block;
    vertical-align: top;
  }

  .gallery-item:first-child {
    @apply rounded-l-3xl;
  }

  .gallery-item:last-child {
    @apply rounded-r-3xl border-r-0;
  }

  /* Smooth scrolling on mobile */
  .gallery-scroll {
    scroll-behavior: smooth;
    -webkit-overflow-scrolling: touch;
  }

  /* Add scroll indicators */
  .gallery-container::before,
  .gallery-container::after {
    content: '';
    position: absolute;
    top: 0;
    bottom: 0;
    width: 20px;
    pointer-events: none;
    z-index: 10;
  }

  .gallery-container::before {
    left: 0;
    background: linear-gradient(to right, rgba(255, 255, 255, 0.8), transparent);
    border-top-left-radius: 24px;
    border-bottom-left-radius: 24px;
  }

  .gallery-container::after {
    right: 0;
    background: linear-gradient(to left, rgba(255, 255, 255, 0.8), transparent);
    border-top-right-radius: 24px;
    border-bottom-right-radius: 24px;
  }
</style>
