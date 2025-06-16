<template>
  <div class="my-10 flex flex-col lg:flex-row justify-between items-start gap-8">
    <div class="flex-1">
      <div class="mb-6">
        <h1 class="text-2xl sm:text-3xl font-bold mb-2">{{ home.title }}</h1>
        <div class="text-gray-600 mb-2">
          <div v-if="typeof home.location == 'object'">
            {{ home.location.address }} {{ home.location.city }}
            {{ home.state }} {{ home.country }}
          </div>
          <div v-else>
            {{ home.location }}
          </div>
        </div>
        <div class="flex items-center gap-2 text-sm">
          <IconsStar class="w-4 h-4" /> 
          <span>{{ home.reviewValue }}</span>
          <span>{{ pluralize(home.reviewCount, "review") }}</span>
        </div>
      </div>
      <div class="text-gray-600">
        {{ pluralize(home.guests, "guest") }} &middot;
        {{ pluralize(home.bedrooms, "room") }} &middot;
        {{ pluralize(home.beds, "bed") }} &middot;
        {{ pluralize(home.bathrooms, "bath") }}
      </div>
    </div>
    
    <div class="w-full lg:w-96 bg-white shadow-custom border border-gray-200 rounded-2xl p-6 space-y-4 sticky top-4">
      <div class="text-2xl font-bold">
        ${{ home.pricePerNight }}<span class="text-base font-normal text-gray-600"> / night</span>
      </div>
      <DatePicker />
      <button
        class="w-full gradient text-white rounded-lg h-12 font-medium hover:opacity-90 transition-opacity"
        @click="handleClick"
      >
        Request to book!
      </button>
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
  
  async function handleClick() {
    const res = await $fetch("/api/checkout", {
      method: "POST",
      body: {
        nights: 3,
        pricePerNight: props.home.pricePerNight,
      },
    });

    window.location.assign(res.url as string);
  }
</script>

<style lang="postcss" scoped></style>
