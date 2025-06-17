<template>
  <div
    class="w-70% min-h-80vh wrapper grid grid-cols-3 grid-rows-2 gap-x-2 p-3 overflow-auto"
  >
    <div
      v-if="homes.length"
      v-for="home in homes"
      :key="home.objectID"
      class="flex flex-col items-center shadow-md p-2 rounded-lg"
    >
      <home-card :home="home" />
      <button @click="handleClick(home.objectID)">Delete</button>
    </div>
    <div
      class="w-full rounded-lg shadow-md flex flex-col cursor-pointer hover:shadow-lg items-center justify-center"
      @click="openAddHome = true"
    >
      <span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="w-6 h-6"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      </span>
      <span>{{ text }}</span>
    </div>
  </div>
  <profile-addhome v-if="openAddHome" @close="close" />
</template>

<script lang="ts" setup>
  import { useAuthStore } from "~/store/auth";
  import type Home from "~/types/home";

  // Define props for force refresh
  defineProps<{
    forceRefresh?: number;
  }>();

  // Define emits
  const emits = defineEmits<{
    (e: "propertyCount", count: number): void;
  }>();

  const authStore = useAuthStore();
  const { $getHomeById, $removeHome, $updateUser } = useNuxtApp();
  const homeId = ref(authStore.homeId || []);
  const text = computed(() =>
    homeId.value?.length ? "Add another place" : "Become a host"
  );

  const openAddHome = ref(false);
  const homes = ref<Home[]>([]);
  const loading = ref(false);
  const error = ref<string | null>(null);

  // Filter out undefined/null homes
  const validHomes = computed(() => {
    const filtered = homes.value.filter(home => home && home.objectID);
    // Emit property count whenever it changes
    nextTick(() => {
      emits('propertyCount', filtered.length);
    });
    return filtered;
  });

  async function handleClick(id: string) {
    try {
      await ($removeHome as any)(id);
      homes.value = homes.value.filter((home) => home && home.objectID !== id);
      homeId.value = homeId.value.filter((hid) => hid !== id);
      await ($updateUser as any)({
        objectID: authStore.objectID,
        homeId: homeId.value,
      });
    } catch (err) {
      console.error('Error deleting home:', err);
      error.value = 'Failed to delete property';
    }
  }

  async function getHomes() {
    if (!homeId.value?.length) {
      emits('propertyCount', 0);
      return;
    }
    
    loading.value = true;
    error.value = null;
    homes.value = []; // Clear existing homes
    
    try {
      // Filter out invalid IDs and ensure they are strings
      const validIds = homeId.value.filter(id => id && typeof id === 'string' && id !== '1');
      console.log('Loading homes for valid IDs:', validIds);
      
      if (!validIds.length) {
        console.warn('No valid home IDs found');
        loading.value = false;
        emits('propertyCount', 0);
        return;
      }
      
      const homePromises = validIds.map(async (id: string) => {
        try {
          const home = await ($getHomeById as any)(id);
          if (home && home.objectID) {
            return home;
          } else {
            console.warn(`Home with ID ${id} not found or invalid`);
            return null;
          }
        } catch (err) {
          console.error(`Error loading home ${id}:`, err);
          return null;
        }
      });

      const loadedHomes = await Promise.all(homePromises);
      homes.value = loadedHomes.filter((home: any) => home !== null) as Home[];
      
      console.log('Loaded homes:', homes.value.length);
    } catch (err) {
      console.error('Error loading homes:', err);
      error.value = 'Failed to load properties';
    } finally {
      loading.value = false;
    }
  }

  function close() {
    openAddHome.value = false;
    // Refresh homes after closing add home modal
    setTimeout(() => {
      getHomes();
    }, 500);
  }

  // Watch for changes in homeId and reload homes
  watch(homeId, () => {
    getHomes();
  }, { immediate: false });

  onMounted(() => {
    console.log('Component mounted, user homeId:', authStore.homeId);
    getHomes();
  });
</script>

<style lang="postcss" scoped>
  button {
    @apply p-3 rounded-lg bg-primary outline-hidden text-white font-medium;
  }
</style>
