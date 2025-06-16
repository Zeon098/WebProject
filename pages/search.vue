<template>
  <div class="flex h-screen" v-if="homes">
    <!-- Map Section -->
    <div class="w-1/2 h-full">
      <search-map :homes="homes" />
    </div>
    
    <!-- Properties List Section -->
    <div class="w-1/2 h-full flex flex-col">
      <!-- Properties Grid -->
      <div class="flex-1 overflow-y-auto px-6 py-6">
        <div class="mb-4">
          <h2 class="text-2xl font-bold text-gray-900">
            {{ homes.length }} properties found
          </h2>
          <p class="text-gray-600">in your selected area</p>
        </div>
        
        <div class="grid grid-cols-1 xl:grid-cols-2 gap-4">
          <div 
            v-for="home in homes" 
            :key="home.objectID" 
            class="transform transition-all duration-300 hover:scale-[1.02] hover:shadow-xl"
          >
            <nuxt-link :to="`/home/${home.objectID}`">
              <home-card :home="home" />
            </nuxt-link>
          </div>
        </div>
      </div>
      
      <!-- Pagination -->
      <div class="border-t border-gray-200 p-4">
        <search-pagination 
          :nbPages="pages" 
          @change="(page) => changePage(page)" 
        />
      </div>
    </div>
  </div>
  
  <!-- Loading State -->
  <div v-else class="flex items-center justify-center h-screen">
    <div class="text-center">
      <div class="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
      <p class="text-xl font-semibold text-gray-600">Loading properties...</p>
    </div>
  </div>
</template>

<script lang="ts" setup>
  definePageMeta({
    layout: "search",
  });
  const route = useRoute();
  const { lat, lng } = route.query;
  let pages = ref(0);
  const homes = ref();

  async function changePage(page: number) {
    const { $getHomesByLocation } = useNuxtApp() as any;
    const { data } = await $getHomesByLocation({ lat, lng }, page);
    homes.value = data;
  }

  onMounted(async () => {
    const { $getHomesByLocation } = useNuxtApp() as any;
    const { data, nbPages } = await $getHomesByLocation({ lat, lng });
    homes.value = data;
    pages.value = nbPages;
  });
</script>

<style lang="postcss" scoped></style>
