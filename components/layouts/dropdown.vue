<template>
  <div
    class="absolute w-72 py-4 px-2 shadow-2xl rounded-2xl right-0 top-14 border border-gray-100 overflow-hidden backdrop-blur-sm bg-white/95"
    v-click-outside="() => handleClickOutside()"
  >
    <div class="flex flex-col">
      <div 
        v-for="(item, index) in menuItems" 
        :key="item.name"
        class="menu-item-wrapper"
        :style="{ '--delay': `${index * 0.1}s` }"
      >
        <nuxt-link
          v-if="!!item.link"
          :to="`${item.link}`"
          class="nav-item group flex items-center gap-3 transition-all duration-300 hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 hover:border-l-4 hover:border-l-blue-500"
        >
          <div class="flex items-center gap-3 w-full">
            <!-- Profile Icon -->
            <div v-if="item.name === 'Profile'" class="p-2 rounded-full bg-blue-100 group-hover:bg-blue-200 transition-colors duration-200">
              <svg class="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            <!-- Help Icon -->
            <div v-else-if="item.name === 'Help'" class="p-2 rounded-full bg-purple-100 group-hover:bg-purple-200 transition-colors duration-200">
              <svg class="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <span class="font-medium text-gray-700 group-hover:text-gray-900 transition-colors duration-200">
              {{ item.name }}
            </span>
          </div>
          <svg class="w-4 h-4 text-gray-400 group-hover:text-gray-600 transform group-hover:translate-x-1 transition-all duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
          </svg>
        </nuxt-link>
        
        <div 
          v-else 
          @click="handleClick(item.name)" 
          class="nav-item group flex items-center gap-3 transition-all duration-300"
          :class="getItemClasses(item.name)"
        >
          <div class="flex items-center gap-3 w-full">
            <!-- Log in Icon -->
            <div v-if="item.name === 'Log in'" class="p-2 rounded-full bg-green-100 group-hover:bg-green-200 transition-colors duration-200">
              <svg class="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
              </svg>
            </div>
            <!-- Sign up Icon -->
            <div v-else-if="item.name === 'Sign up'" class="p-2 rounded-full bg-indigo-100 group-hover:bg-indigo-200 transition-colors duration-200">
              <svg class="w-5 h-5 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
              </svg>
            </div>
            <!-- Help Icon -->
            <div v-else-if="item.name === 'Help'" class="p-2 rounded-full bg-purple-100 group-hover:bg-purple-200 transition-colors duration-200">
              <svg class="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <!-- Log out Icon -->
            <div v-else-if="item.name === 'Log out'" class="p-2 rounded-full bg-red-100 group-hover:bg-red-200 transition-colors duration-200">
              <svg class="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
            </div>
            <span class="font-medium transition-colors duration-200" :class="getTextClasses(item.name)">
              {{ item.name }}
            </span>
          </div>
          <svg class="w-4 h-4 text-gray-400 group-hover:text-gray-600 transform group-hover:translate-x-1 transition-all duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
          </svg>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import type { PropType } from "vue";
  defineProps({
    menuItems: {
      type: Array as PropType<{ name: string; link: string | null }[]>,
      required: true,
    },
  });

  const emits = defineEmits<{
    (e: "outsideClick"): void;
    (e: "openPopup", name: string): void;
  }>();
  
  function handleClickOutside() {
    emits("outsideClick");
  }
  
  function handleClick(name: string) {
    emits("openPopup", name);
  }

  function getItemClasses(itemName: string) {
    switch (itemName) {
      case 'Log in':
        return 'hover:bg-gradient-to-r hover:from-green-50 hover:to-emerald-50 hover:border-l-4 hover:border-l-green-500';
      case 'Sign up':
        return 'hover:bg-gradient-to-r hover:from-indigo-50 hover:to-blue-50 hover:border-l-4 hover:border-l-indigo-500';
      case 'Help':
        return 'hover:bg-gradient-to-r hover:from-purple-50 hover:to-pink-50 hover:border-l-4 hover:border-l-purple-500';
      case 'Log out':
        return 'hover:bg-gradient-to-r hover:from-red-50 hover:to-rose-50 hover:border-l-4 hover:border-l-red-500';
      default:
        return 'hover:bg-gradient-to-r hover:from-gray-50 hover:to-slate-50 hover:border-l-4 hover:border-l-gray-500';
    }
  }

  function getTextClasses(itemName: string) {
    switch (itemName) {
      case 'Log in':
        return 'text-gray-700 group-hover:text-green-700';
      case 'Sign up':
        return 'text-gray-700 group-hover:text-indigo-700';
      case 'Help':
        return 'text-gray-700 group-hover:text-purple-700';
      case 'Log out':
        return 'text-gray-700 group-hover:text-red-700';
      default:
        return 'text-gray-700 group-hover:text-gray-900';
    }
  }
</script>

<style lang="postcss" scoped>
  .nav-item {
    @apply px-6 py-4 mx-2 my-1 cursor-pointer border-l-4 border-l-transparent rounded-xl;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  }

  .menu-item-wrapper {
    animation: slideInRight 0.4s ease-out forwards;
    animation-delay: var(--delay);
    opacity: 0;
    transform: translateX(20px);
  }

  @keyframes slideInRight {
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }

  .nav-item:hover {
    transform: translateX(4px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }

  /* Icon hover animations */
  .nav-item:hover svg {
    transform: scale(1.1);
  }

  /* Gradient background animation */
  .nav-item:hover {
    background-size: 200% 100%;
    animation: gradientShift 3s infinite;
  }

  @keyframes gradientShift {
    0%, 100% {
      background-position: 0% 50%;
    }
    50% {
      background-position: 100% 50%;
    }
  }

  /* Subtle pulse effect for icons */
  .nav-item:hover > div > div {
    animation: pulse 2s infinite;
  }

  @keyframes pulse {
    0%, 100% {
      transform: scale(1);
    }
    50% {
      transform: scale(1.05);
    }
  }

  /* Custom shadow for the dropdown */
  .dropdown-shadow {
    box-shadow: 
      0 20px 25px -5px rgba(0, 0, 0, 0.1),
      0 10px 10px -5px rgba(0, 0, 0, 0.04),
      0 0 0 1px rgba(0, 0, 0, 0.05);
  }

  /* Smooth border animation */
  .nav-item {
    position: relative;
    overflow: hidden;
  }

  .nav-item::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
    transition: left 0.5s;
  }

  .nav-item:hover::before {
    left: 100%;
  }
</style>
