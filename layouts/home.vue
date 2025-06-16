<template>
  <div class="min-h-screen bg-gray-50">
    <layouts-header />
    <layouts-home-landing />
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <slot />
    </div>
  </div>
</template>

<script lang="ts" setup></script>

<style lang="postcss" scoped></style>
