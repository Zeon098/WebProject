<template>
  <header
    class="bg-white w-full h-20 flex justify-between items-center shadow-sm px-20 text-secondary font-normal"
    :class="[isSticky ? 'sticky top-0 z-50' : '']"
  >
    <div
      class="flex justify-between h-full items-center font-bold text-2xl gradient-text cursor-pointer"
    >
      <nuxt-link to="/" class="flex items-center">
        <img src="~/assets/images/logo.png" alt="" />
        <span>Continentals</span>
      </nuxt-link>
    </div>
    <nav
      class="h-14 flex items-center justify-between rounded-4xl nav bg-gradient-to-r from-primary/80 via-white/80 to-secondary/0 backdrop-blur-lg transition-all duration-300 shadow-xl hover:shadow-2xl px-4"
    >
      <span class="nav-item border-r-2 border-primary/30 group transition-all duration-200 relative overflow-hidden">
      <nuxt-link to="/" class="block px-6 py-2 font-semibold text-lg tracking-wide transition-colors duration-200 group-hover:text-primary flex items-center gap-2">
        <svg class="w-5 h-5 text-primary group-hover:scale-110 transition-transform duration-200" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
        <path d="M3 12l9-9 9 9" />
        <path d="M9 21V9h6v12" />
        </svg>
        <span
        class="absolute left-0 bottom-0 w-0 h-1 bg-gradient-to-r from-primary to-secondary rounded transition-all duration-300 group-hover:w-full"
        ></span>
        Home
      </nuxt-link>
      </span>
      <span class="nav-item border-r-2 border-primary/30 group transition-all duration-200 relative overflow-hidden">
      <nuxt-link to="/about" class="block px-6 py-2 font-semibold text-lg tracking-wide transition-colors duration-200 group-hover:text-primary flex items-center gap-2">
        <svg class="w-5 h-5 text-secondary group-hover:scale-110 transition-transform duration-200" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
        <circle cx="12" cy="12" r="10" />
        <path d="M12 16v-4" />
        <path d="M12 8h.01" />
        </svg>
        <span
        class="absolute left-0 bottom-0 w-0 h-1 bg-gradient-to-r from-secondary to-primary rounded transition-all duration-300 group-hover:w-full"
        ></span>
        About
      </nuxt-link>
      </span>
      <span class="nav-item group transition-all duration-200 relative overflow-hidden">
      <nuxt-link to="/contact" class="block px-6 py-2 font-semibold text-lg tracking-wide transition-colors duration-200 group-hover:text-primary flex items-center gap-2">
        <svg class="w-5 h-5 text-pink-500 group-hover:scale-110 transition-transform duration-200" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
        <path d="M21 10.5a8.38 8.38 0 01-7.5 8.44A8.38 8.38 0 013 10.5C3 6.36 7.03 3 12 3s9 3.36 9 7.5z" />
        <circle cx="12" cy="10.5" r="2.5" />
        </svg>
        <span
        class="absolute left-0 bottom-0 w-0 h-1 bg-gradient-to-r from-pink-500 to-primary rounded transition-all duration-300 group-hover:w-full"
        ></span>
        Contact
      </nuxt-link>
      </span>
    </nav>

    <div class="h-full flex items-center">
      <button class="w-1/2 mr-2 flex justify-center items-center">
        <span class="p-3.5 rounded-full hover:bg-neutral-100 flex items-center">
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M8 16C6.88 16 5.83333 15.79 4.86 15.37C3.88667 14.95 3.04 14.38 2.32 13.66C1.6 12.94 1.03333 12.09 0.62 11.11C0.206667 10.13 0 9.08 0 7.96C0 6.84 0.206667 5.79667 0.62 4.83C1.03333 3.86333 1.6 3.02 2.32 2.3C3.04 1.58 3.88667 1.01667 4.86 0.61C5.83333 0.203333 6.88 0 8 0C9.12 0 10.1667 0.203333 11.14 0.61C12.1133 1.01667 12.96 1.58 13.68 2.3C14.4 3.02 14.9667 3.86333 15.38 4.83C15.7933 5.79667 16 6.84 16 7.96C16 9.08 15.7933 10.13 15.38 11.11C14.9667 12.09 14.4 12.94 13.68 13.66C12.96 14.38 12.1133 14.95 11.14 15.37C10.1667 15.79 9.12 16 8 16ZM8 14.84C8.46667 14.36 8.85667 13.81 9.17 13.19C9.48333 12.57 9.74 11.8333 9.94 10.98H6.08C6.26667 11.78 6.51667 12.5 6.83 13.14C7.14333 13.78 7.53333 14.3467 8 14.84ZM6.3 14.6C5.96667 14.0933 5.68 13.5467 5.44 12.96C5.2 12.3733 5 11.7133 4.84 10.98H1.84C2.34667 11.9267 2.93333 12.67 3.6 13.21C4.26667 13.75 5.16667 14.2133 6.3 14.6ZM9.72 14.58C10.68 14.2733 11.5433 13.8133 12.31 13.2C13.0767 12.5867 13.6933 11.8467 14.16 10.98H11.18C11.0067 11.7 10.8033 12.3533 10.57 12.94C10.3367 13.5267 10.0533 14.0733 9.72 14.58ZM1.44 9.78H4.62C4.58 9.42 4.55667 9.09667 4.55 8.81C4.54333 8.52333 4.54 8.24 4.54 7.96C4.54 7.62667 4.54667 7.33 4.56 7.07C4.57333 6.81 4.6 6.52 4.64 6.2H1.44C1.34667 6.52 1.28333 6.80667 1.25 7.06C1.21667 7.31333 1.2 7.61333 1.2 7.96C1.2 8.30667 1.21667 8.61667 1.25 8.89C1.28333 9.16333 1.34667 9.46 1.44 9.78ZM5.86 9.78H10.16C10.2133 9.36667 10.2467 9.03 10.26 8.77C10.2733 8.51 10.28 8.24 10.28 7.96C10.28 7.69333 10.2733 7.43667 10.26 7.19C10.2467 6.94333 10.2133 6.61333 10.16 6.2H5.86C5.80667 6.61333 5.77333 6.94333 5.76 7.19C5.74667 7.43667 5.74 7.69333 5.74 7.96C5.74 8.24 5.74667 8.51 5.76 8.77C5.77333 9.03 5.80667 9.36667 5.86 9.78ZM11.36 9.78H14.56C14.6533 9.46 14.7167 9.16333 14.75 8.89C14.7833 8.61667 14.8 8.30667 14.8 7.96C14.8 7.61333 14.7833 7.31333 14.75 7.06C14.7167 6.80667 14.6533 6.52 14.56 6.2H11.38C11.42 6.66667 11.4467 7.02333 11.46 7.27C11.4733 7.51667 11.48 7.74667 11.48 7.96C11.48 8.25333 11.47 8.53 11.45 8.79C11.43 9.05 11.4 9.38 11.36 9.78ZM11.16 5H14.16C13.72 4.08 13.1167 3.31333 12.35 2.7C11.5833 2.08667 10.7 1.65333 9.7 1.4C10.0333 1.89333 10.3167 2.42667 10.55 3C10.7833 3.57333 10.9867 4.24 11.16 5ZM6.08 5H9.96C9.81333 4.29333 9.56667 3.61 9.22 2.95C8.87333 2.29 8.46667 1.70667 8 1.2C7.57333 1.56 7.21333 2.03333 6.92 2.62C6.62667 3.20667 6.34667 4 6.08 5ZM1.84 5H4.86C5.00667 4.28 5.19333 3.63667 5.42 3.07C5.64667 2.50333 5.93333 1.95333 6.28 1.42C5.28 1.67333 4.40667 2.1 3.66 2.7C2.91333 3.3 2.30667 4.06667 1.84 5Z"
              fill="black"
            />
          </svg>
          <span class="px-2">Language</span>
        </span>
      </button>
      <div class="h-12 w-24 relative">
        <div
          class="rounded-4xl border-2 border-primary/60 bg-gradient-to-r from-primary/10 to-secondary/10 px-3 py-1 flex justify-between items-center cursor-pointer hover:shadow-xl hover:scale-105 transition-all duration-200 gap-2"
          @click="open = !open"
        >
          <span v-if="!authStore.loggedIn" class="flex items-center justify-center">
        <svg
          width="33"
          height="32"
          viewBox="0 0 33 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          class="drop-shadow-md"
        >
          <defs>
            <radialGradient id="userGradient" cx="50%" cy="50%" r="80%">
          <stop offset="0%" stop-color="#6EE7B7"/>
          <stop offset="100%" stop-color="#3B82F6"/>
            </radialGradient>
          </defs>
          <path
            d="M29.9565 16.0001C29.9565 8.65341 23.9698 2.66675 16.6231 2.66675C9.27646 2.66675 3.28979 8.65341 3.28979 16.0001C3.28979 19.8667 4.95646 23.3467 7.59646 25.7867C7.59646 25.8001 7.59646 25.8001 7.58313 25.8134C7.71646 25.9467 7.87646 26.0534 8.00979 26.1734C8.08979 26.2401 8.15646 26.3067 8.23646 26.3601C8.47646 26.5601 8.74313 26.7467 8.99646 26.9334L9.26313 27.1201C9.51646 27.2934 9.78313 27.4534 10.0631 27.6001C10.1565 27.6534 10.2631 27.7201 10.3565 27.7734C10.6231 27.9201 10.9031 28.0534 11.1965 28.1734C11.3031 28.2267 11.4098 28.2801 11.5165 28.3201C11.8098 28.4401 12.1031 28.5467 12.3965 28.6401C12.5031 28.6801 12.6098 28.7201 12.7165 28.7467C13.0365 28.8401 13.3565 28.9201 13.6765 29.0001C13.7698 29.0267 13.8631 29.0534 13.9698 29.0667C14.3431 29.1467 14.7165 29.2001 15.1031 29.2401C15.1565 29.2401 15.2098 29.2534 15.2631 29.2667C15.7165 29.3067 16.1698 29.3334 16.6231 29.3334C17.0765 29.3334 17.5298 29.3067 17.9698 29.2667C18.0231 29.2667 18.0765 29.2534 18.1298 29.2401C18.5165 29.2001 18.8898 29.1467 19.2631 29.0667C19.3565 29.0534 19.4498 29.0134 19.5565 29.0001C19.8765 28.9201 20.2098 28.8534 20.5165 28.7467C20.6231 28.7067 20.7298 28.6667 20.8365 28.6401C21.1298 28.5334 21.4365 28.4401 21.7165 28.3201C21.8231 28.2801 21.9298 28.2267 22.0365 28.1734C22.3165 28.0534 22.5965 27.9201 22.8765 27.7734C22.9831 27.7201 23.0765 27.6534 23.1698 27.6001C23.4365 27.4401 23.7031 27.2934 23.9698 27.1201C24.0631 27.0667 24.1431 27.0001 24.2365 26.9334C24.5031 26.7467 24.7565 26.5601 24.9965 26.3601C25.0765 26.2934 25.1431 26.2267 25.2231 26.1734C25.3698 26.0534 25.5165 25.9334 25.6498 25.8134C25.6498 25.8001 25.6498 25.8001 25.6365 25.7867C28.2898 23.3467 29.9565 19.8667 29.9565 16.0001ZM23.2098 22.6267C19.5965 20.2001 13.6765 20.2001 10.0365 22.6267C9.44979 23.0134 8.96979 23.4667 8.56979 23.9601C6.46954 21.8431 5.29065 18.9821 5.28979 16.0001C5.28979 9.74675 10.3698 4.66675 16.6231 4.66675C22.8765 4.66675 27.9565 9.74675 27.9565 16.0001C27.9565 19.0934 26.7031 21.9067 24.6765 23.9601C24.2898 23.4667 23.7965 23.0134 23.2098 22.6267V22.6267Z"
            fill="url(#userGradient)"
          />
          <path
            d="M16.623 9.23999C13.863 9.23999 11.623 11.48 11.623 14.24C11.623 16.9467 13.743 19.1467 16.5564 19.2267H16.7964C18.0907 19.1841 19.3177 18.6401 20.2184 17.7096C21.119 16.7791 21.6227 15.535 21.623 14.24C21.623 11.48 19.383 9.23999 16.623 9.23999Z"
            fill="#3B82F6"
            fill-opacity="0.7"
          />
        </svg>
          </span>
          <span v-else>
        <img :src="authStore.imageUrl" class="h-8 w-8 rounded-full ring-2 ring-primary shadow-md transition-transform duration-200 hover:scale-110" />
          </span>
          <span class="ml-2">
        <svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          class="transition-transform duration-200"
          :class="{ 'rotate-180': open }"
        >
          <path
            d="M2.5 10H17.5"
            stroke="#2D2B2B"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M2.5 5H17.5"
            stroke="#2D2B2B"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M2.5 15H17.5"
            stroke="#2D2B2B"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
          </span>
        </div>
        <transition 
          name="dropdown" 
          enter-active-class="transition-all duration-300 ease-out"
          enter-from-class="opacity-0 transform scale-95 -translate-y-2"
          enter-to-class="opacity-100 transform scale-100 translate-y-0"
          leave-active-class="transition-all duration-200 ease-in"
          leave-from-class="opacity-100 transform scale-100 translate-y-0"
          leave-to-class="opacity-0 transform scale-95 -translate-y-2"
        >
          <layouts-dropdown
        v-if="open"
        :menuItems="menuItems"
        @outsideClick="open = false"
        @openPopup="(name) => openPopups(name)"
        class="absolute right-0 mt-2 z-50"
          />
        </transition>
      </div>
    </div>
  </header>
  <auth-signup
    v-if="openSignup"
    @close="openSignup = false"
    @swap="
      () => {
        openSignup = false;
        openSignin = true;
      }
    "
  />
  <auth-login
    v-if="openSignin"
    @close="openSignin = false"
    @swap="
      () => {
        openSignin = false;
        openSignup = true;
      }
    "
  />
</template>

<script lang="ts" setup>
  import { useAuthStore } from "~/store/auth";
  const authStore = useAuthStore();

  const menuItems = computed(() => {
    if (authStore.loggedIn) {
      return [
        {
          name: "Profile",
          link: "/profile",
        },
        {
          name: "Help",
          link: "/help",
        },
        {
          name: "Log out",
          link: null,
        },
      ];
    } else {
      return [
        {
          name: "Log in",
          link: null,
        },
        {
          name: "Sign up",
          link: null,
        },
        {
          name: "Help",
          link: "/help",
        },
      ];
    }
  });
  const open = ref(false);
  defineProps({
    isSticky: {
      type: Boolean,
      default: true,
    },
  });

  const openSignup = ref(false);
  const openSignin = ref(false);

  async function openPopups(name: string) {
    open.value = false;
    if (name === "Sign up") {
      openSignup.value = true;
    } else if (name === "Log in") {
      openSignin.value = true;
    } else if (name === "Help") {
      await navigateTo('/help');
    } else if (name === "Log out") {
      await authStore.signout();
    }
  }
</script>

<style lang="postcss" scoped>
  .router-link-active {
    @apply text-primary;
  }
  .nav-item {
    @apply text-sm font-normal text-secondary px-8 py-2 cursor-pointer;
  }
  .nav {
    box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.04);
    @apply py-3;
    border: 2px solid #ebebeb;
  }
  .btn {
    @apply bg-transparent border-2 border-secondary font-bold px-8 py-2 rounded;
  }
  .btn:hover {
    @apply bg-secondary text-white;
  }
</style>
