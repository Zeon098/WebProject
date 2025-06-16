<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <HomeGallery :images="(home?.images as string[])" />
    <HomeDetails :home="(home as Record<string, any>)" />
    <hr class="my-8" />
    <HomeDescription :home="(home as Record<string, any>)" />
    <hr class="my-8" />
    <HomeMap :latlng="(home?._geoloc as Object)" :home="(home as Record<string, any>)" />
    <hr class="my-8" />
    <HomeReviews :reviews="(homereviews as Record<string, any>[])" />
    <hr class="my-8" />
    <HomeHost :host="(host as Object)" />
  </div>
</template>

<script lang="ts" setup>
  const route = useRoute();
  const { id } = route.params;

  const { $getHomeById, $getReviewsByHomeId, $getUserByHomeId } = useNuxtApp();
  const home = await ($getHomeById as any)(id);
  const homereviews = await ($getReviewsByHomeId as any)(id);
  const host = await ($getUserByHomeId as any)(id);
</script>

<style lang="postcss" scoped></style>
