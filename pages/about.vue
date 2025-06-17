<template>
  <div class="max-w-4xl mx-auto px-4 py-12">
    <div class="text-center mb-12">
      <h1 class="text-4xl font-bold gradient-text mb-4">About Continentals</h1>
      <p class="text-xl text-gray-600 max-w-2xl mx-auto">
        Discover unique stays and experiences across Pakistan with our trusted home-sharing platform
      </p>
    </div>

    <div class="grid md:grid-cols-2 gap-12 items-center mb-16">
      <div>
        <h2 class="text-2xl font-bold mb-4">Our Story</h2>
        <p class="text-gray-600 mb-4">
          Continentals is a premier home-sharing platform designed specifically for Pakistan. We connect 
          travelers with unique accommodations and local hosts, creating memorable experiences across 
          the country's diverse landscapes and rich cultural heritage.
        </p>
        <p class="text-gray-600 mb-4">
          From the bustling streets of Karachi to the serene valleys of Northern Pakistan, 
          our platform offers a wide range of accommodation options including private rooms, 
          entire apartments, traditional houses, and unique stays.
        </p>
        <p class="text-gray-600">
          We believe in the power of authentic travel experiences and aim to showcase Pakistan's 
          hospitality while supporting local communities through tourism.
        </p>
      </div>
      <div class="bg-gray-100 rounded-lg p-8">
        <h3 class="text-xl font-semibold mb-4">Why Choose Continentals?</h3>
        <ul class="space-y-3">
          <li class="flex items-start">
            <span class="text-primary mr-2">✓</span>
            <span>Verified hosts and properties</span>
          </li>
          <li class="flex items-start">
            <span class="text-primary mr-2">✓</span>
            <span>Secure payment processing</span>
          </li>
          <li class="flex items-start">
            <span class="text-primary mr-2">✓</span>
            <span>24/7 customer support</span>
          </li>
          <li class="flex items-start">
            <span class="text-primary mr-2">✓</span>
            <span>Local insights and recommendations</span>
          </li>
          <li class="flex items-start">
            <span class="text-primary mr-2">✓</span>
            <span>Flexible cancellation policies</span>
          </li>
        </ul>
      </div>
    </div>

    <div class="bg-primary/5 rounded-lg p-8 text-center">
      <h3 class="text-2xl font-bold mb-4">Join Our Community</h3>
      <p class="text-gray-600 mb-6">
        Whether you're a traveler seeking unique experiences or a host looking to share your space, 
        Continentals is here to make your journey memorable.
      </p>
      <div class="flex gap-4 justify-center">
        <NuxtLink to="/" class="bg-primary text-white px-6 py-2 rounded-lg hover:bg-primary/90 transition-colors">
          Find Stays
        </NuxtLink>
        <NuxtLink to="/contact" class="border border-primary text-primary px-6 py-2 rounded-lg hover:bg-primary/10 transition-colors">
          Contact Us
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
definePageMeta({
  layout: 'default'
});

useHead({
  title: 'About Us - Continentals',
  meta: [
    { name: 'description', content: 'Learn about Continentals - Pakistan\'s premier home-sharing platform connecting travelers with unique accommodations and local hosts.' }
  ]
});
</script>
