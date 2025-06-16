<template>
  <div 
    v-if="home" 
    class="bg-white rounded-xl overflow-hidden cursor-pointer transform transition-all duration-200 hover:scale-105"
    @click="navigateToHome"
  >
    <!-- Image Container -->
    <div class="relative overflow-hidden aspect-[4/3]">
      <img 
        :src="home.images[0]" 
        :alt="home.title || 'Property image'"
        class="w-full h-full object-cover" 
      />
      
      <!-- Price badge -->
      <div class="absolute top-2 right-2 bg-white/95 backdrop-blur-sm rounded-full px-2 py-1 shadow-md">
        <span class="text-xs font-bold text-gray-800">${{ home.pricePerNight }}</span>
        <span class="text-xs text-gray-600">/night</span>
      </div>

      <!-- Rating badge -->
      <div v-if="home.reviewValue" class="absolute top-2 left-2 bg-white/95 backdrop-blur-sm rounded-full px-2 py-1 shadow-md flex items-center gap-1">
        <svg class="w-3 h-3 text-yellow-400 fill-current" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
        <span class="text-xs font-medium text-gray-800">{{ home.reviewValue }}</span>
      </div>
    </div>

    <!-- Content -->
    <div class="p-3">
      <!-- Location -->
      <div class="mb-2">
        <div v-if="typeof home.location == 'object'" class="text-gray-900 font-semibold text-sm leading-tight">
          {{ home.location.city }}, {{ home.location.state }}
        </div>
        <div v-else class="text-gray-900 font-semibold text-sm leading-tight">
          {{ home.location }}
        </div>
      </div>

      <!-- Property details -->
      <div class="mb-2">
        <div class="text-gray-600 text-xs mb-1 flex items-center gap-3">
          <span class="flex items-center gap-1">
            <svg class="w-3 h-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            {{ pluralize(home.guests, "guest") }}
          </span>
          
          <span v-if="home.bedrooms" class="flex items-center gap-1">
            <svg class="w-3 h-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z" />
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 21v-4a2 2 0 012-2h2a2 2 0 012 2v4" />
            </svg>
            {{ pluralize(home.bedrooms, "room") }}
          </span>
        </div>

        <!-- Property title -->
        <h3 v-if="home.title" class="text-gray-900 font-medium text-xs leading-tight line-clamp-2">
          {{ home.title }}
        </h3>
      </div>

      <!-- Bottom section -->
      <div class="flex items-center justify-between">
        <!-- Reviews -->
        <div v-if="home.reviewCount" class="text-gray-500 text-xs">
          {{ pluralize(home.reviewCount, "review") }}
        </div>
        <div v-else class="text-gray-400 text-xs">
          New listing
        </div>

        <!-- Click to view button -->
        <div class="text-xs text-blue-600 font-medium">
          View Details →
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
  const props = defineProps({
    home: {
      type: Object,
      required: true,
    },
  });

  const router = useRouter();

  const navigateToHome = () => {
    if (props.home?.objectID) {
      router.push(`/home/${props.home.objectID}`);
    }
  };
</script>

<style lang="postcss" scoped>
  .line-clamp-2 {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }

  .aspect-\[4\/3\] {
    aspect-ratio: 4 / 3;
  }

  /* Backdrop blur for better browser support */
  .backdrop-blur-sm {
    backdrop-filter: blur(4px);
    -webkit-backdrop-filter: blur(4px);
  }
</style>
