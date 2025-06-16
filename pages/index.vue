<template>
  <div class="max-w-7xl px-8 my-16 font-normal mx-auto" v-if="homes">
    <h1 class="gradient-text">Search a best place</h1>
    <div v-if="homes" class="w-full grid grid-cols-4 gap-6 align-middle">
      <div v-for="home in homes" :key="home.objectID" class="transform transition-all duration-300 hover:scale-105 hover:shadow-xl">
        <nuxt-link :to="`/home/${home.objectID}`">
          <home-card :home="home" />
        </nuxt-link>
      </div>
    </div>
  </div>
  <div v-else>loading...</div>
</template>

<script lang="ts" setup>
  import type Home from "~/types/home";

  definePageMeta({
    layout: "home",
  });

  const { $getHomes } = useNuxtApp();
  const homes = ref<Home[] | null>(null);
  onMounted(async () => {
    homes.value = await $getHomes();
  });
</script>

<style scoped></style>
