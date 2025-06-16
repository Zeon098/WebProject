<template>
  <div class="max-w-2xl mx-auto px-4 py-16 text-center">
    <div class="mb-8">
      <div class="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
        <svg class="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
        </svg>
      </div>
      <h1 class="text-3xl font-bold text-gray-900 mb-2">Payment Successful!</h1>
      <p class="text-gray-600">Thank you for your booking. Your reservation has been confirmed.</p>
    </div>
    
    <div class="bg-white p-6 rounded-lg shadow-md border mb-8">
      <h2 class="text-xl font-semibold mb-4">Booking Details</h2>
      <div class="space-y-2 text-left">
        <div class="flex justify-between">
          <span class="text-gray-600">Booking ID:</span>
          <span class="font-medium">#{{ Math.random().toString(36).substr(2, 9).toUpperCase() }}</span>
        </div>
        <div class="flex justify-between">
          <span class="text-gray-600">Date:</span>
          <span class="font-medium">{{ new Date().toLocaleDateString() }}</span>
        </div>
        <div class="flex justify-between">
          <span class="text-gray-600">Status:</span>
          <span class="text-green-600 font-medium">Confirmed</span>
        </div>
      </div>
    </div>
    
    <div class="space-y-4">
      <p class="text-gray-600">
        You will receive a confirmation email shortly with all the details of your booking.
      </p>
      
      <div class="flex gap-4 justify-center">
        <NuxtLink to="/" class="bg-primary text-white px-6 py-2 rounded-lg hover:bg-primary/90 transition-colors">
          Return Home
        </NuxtLink>
        <NuxtLink to="/profile" class="border border-gray-300 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-50 transition-colors">
          View Bookings
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
  title: 'Payment Successful - PakBnB'
});
</script>
