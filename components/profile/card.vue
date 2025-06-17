<template>
  <div class="bg-white rounded-2xl shadow-xl overflow-hidden">
    <!-- Header with gradient background -->
    <div class="bg-gradient-to-r from-orange-600 to-white-600 px-6 py-8 text-white text-center">
      <div class="relative inline-block">
        <img 
          :src="displayUser.image || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2.0&w=100&h=100'" 
          class="w-24 h-24 rounded-full object-cover border-4 border-white shadow-lg mx-auto"
          :alt="`${displayUser.name}'s avatar`"
        />
        <div class="absolute -bottom-2 -right-2 w-8 h-8 bg-green-500 rounded-full border-4 border-white flex items-center justify-center">
          <svg class="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
          </svg>
        </div>
      </div>
      <h2 class="text-2xl font-bold mt-4 mb-1">{{ displayUser.name || 'User' }}</h2>
      <p class="text-blue-100">Host since {{ formatJoinDate(displayUser.joined) }}</p>
    </div>

    <!-- Profile details -->
    <div class="p-6 space-y-6">
      <!-- Email -->
      <div class="flex items-center space-x-3">
        <div class="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
          <svg class="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
          </svg>
        </div>
        <div class="flex-1">
          <p class="text-sm text-gray-500">Email</p>
          <p class="font-medium text-gray-800">{{ displayUser.email || 'Not provided' }}</p>
        </div>
      </div>

      <!-- Reviews -->
      <div class="flex items-center space-x-3">
        <div class="w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center">
          <svg class="w-5 h-5 text-yellow-600" fill="currentColor" viewBox="0 0 20 20">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        </div>
        <div class="flex-1">
          <p class="text-sm text-gray-500">Reviews</p>
          <p class="font-medium text-gray-800">{{ displayUser.reviewCount || 0 }} reviews</p>
        </div>
      </div>

      <!-- Properties -->
      <div class="flex items-center space-x-3">
        <div class="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
          <svg class="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
          </svg>
        </div>
        <div class="flex-1">
          <p class="text-sm text-gray-500">Properties</p>
          <p class="font-medium text-gray-800">{{ (displayUser.homeId || []).length }} properties</p>
        </div>
      </div>

      <!-- Description -->
      <div class="space-y-2">
        <p class="text-sm text-gray-500">About</p>
        <div class="bg-gray-50 rounded-lg p-4">
          <p class="text-gray-700 text-sm leading-relaxed">
            {{ displayUser.description || "You haven't added any information about yourself yet." }}
          </p>
        </div>
      </div>
    </div>

    <!-- Edit button -->
    <div class="px-6 pb-6">
      <button
        @click="handleClick"
        class="w-full bg-gradient-to-r from-orange-600 to-white-600 text-white py-3 px-4 rounded-xl hover:shadow-lg transition-all duration-200 font-medium flex items-center justify-center gap-2"
      >
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
        </svg>
        Edit Profile
      </button>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { useAuthStore } from "~/store/auth";

  // Define props
  const props = defineProps<{
    userData?: {
      objectID: string;
      name: string;
      email: string;
      image: string;
      joined: Date | string;
      reviewCount: number;
      description: string;
      homeId: string[];
    };
  }>();

  const authStore = useAuthStore();

  // Use props data if available, otherwise fallback to auth store
  const displayUser = computed(() => ({
    name: props.userData?.name || authStore.name || 'User',
    email: props.userData?.email || authStore.email || 'Not provided',
    image: props.userData?.image || authStore.imageUrl || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2.0&w=100&h=100',
    joined: props.userData?.joined || new Date(),
    reviewCount: props.userData?.reviewCount || 0,
    description: props.userData?.description || authStore.description || "You haven't added any information about yourself yet.",
    homeId: props.userData?.homeId || authStore.homeId || []
  }));

  // Format join date
  const formatJoinDate = (date: Date | string) => {
    if (!date) return 'Recently';
    
    const dateObj = typeof date === 'string' ? new Date(date) : date;
    const year = dateObj.getFullYear();
    const month = dateObj.toLocaleDateString('en-US', { month: 'long' });
    
    return `${month} ${year}`;
  };

  const emits = defineEmits<{
    (e: "editProfile"): void;
  }>();

  function handleClick() {
    emits("editProfile");
  }
</script>
