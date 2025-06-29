import tailwindcss from "@tailwindcss/vite";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-06-14',
  modules: [
    [
      "@nuxtjs/algolia",
      {
        applicationId: process.env.ALGOLIA_APP_ID,
        apiKey: process.env.ALGOLIA_API_KEY,
      },
    ],
    [
      "@pinia/nuxt",
      {
        autoImports: [
          "defineStore",
          "acceptHMRUpdate",
          "storeToRefs",
          "useState",
        ],
      },
    ],
  ],
  plugins: [
    "~/plugins/clickOutside.ts",
    "~/plugins/homes.ts",
    "~/plugins/reviews.ts",
    "~/plugins/users.ts",
    "~/plugins/firebase.client.ts",
  ],
  css: ["~/assets/css/main.css"],
  runtimeConfig: {
    stripeSecret: process.env.STRIPE_SECRET,
    public: {
      algolia: {
        applicationId: process.env.ALGOLIA_APP_ID,
        apiKey: process.env.ALGOLIA_API_KEY,
      },
      mapbox: {
        accessToken: process.env.MAPBOX_ACCESS_TOKEN,
      },
      firebase: {
        apiKey: process.env.FIREBASE_API_KEY,
        authDomain: process.env.FIREBASE_AUTH_DOMAIN,
        projectId: process.env.FIREBASE_PROJECT_ID,
        storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
        messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
        appId: process.env.FIREBASE_APP_ID,
      },
    },
  },
  vite: { plugins: [tailwindcss()] },
});
