<template>
  <!-- Backdrop with blur effect -->
  <div
    class="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
    @click="handleClick"
  >
    <!-- Modal Container -->
    <div
      class="bg-white max-w-7xl w-full max-h-[90vh] rounded-3xl shadow-2xl overflow-hidden relative"
      @click="(e) => e.stopPropagation()"
    >
      <!-- Header -->
      <div class="bg-gradient-to-r from-orange-600 to-orange-200 px-8 py-6 text-white">
        <div class="flex items-center justify-between">
          <div>
            <h2 class="text-3xl font-bold mb-2">Add Your Property</h2>
            <p class="text-blue-100">Share your space with travelers around the world</p>
          </div>
          <button 
            @click="handleClick"
            class="w-10 h-10 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center transition-colors"
          >
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>

      <!-- Form Content -->
      <div class="overflow-y-auto max-h-[calc(90vh-140px)]">
        <form @submit.prevent="submit" class="p-8">
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
            
            <!-- Left Column - Images & Basic Info -->
            <div class="space-y-6">
              <!-- Property Images -->
              <div class="bg-gray-50 rounded-2xl p-6">
                <h3 class="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                  <svg class="w-5 h-5 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  Property Photos
                </h3>
                <div class="grid grid-cols-2 gap-4">
                  <div v-for="i in 5" :key="i" class="relative">
                    <input 
                      type="file" 
                      accept="image/*" 
                      @change="uploadImage" 
                      :required="i <= 3"
                      class="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                    />
                    <div class="h-32 bg-gradient-to-br from-gray-100 to-gray-200 border-2 border-dashed border-gray-300 rounded-xl flex items-center justify-center hover:border-blue-400 hover:bg-blue-50 transition-all duration-300 group">
                      <div class="text-center">
                        <svg class="w-8 h-8 text-gray-400 group-hover:text-blue-500 mx-auto mb-2 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                        </svg>
                        <p class="text-xs font-medium text-gray-600 group-hover:text-blue-600">
                          {{ i <= 3 ? 'Required' : 'Optional' }}
                        </p>
                        <p class="text-xs text-gray-500">Click to upload</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Basic Information -->
              <div class="bg-gray-50 rounded-2xl p-6">
                <h3 class="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                  <svg class="w-5 h-5 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  Basic Information
                </h3>
                <div class="space-y-4">
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">Property Title *</label>
                    <input 
                      type="text" 
                      v-model="home.title" 
                      required 
                      class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all bg-white"
                      placeholder="Beautiful apartment with city view..."
                    />
                  </div>
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">Description *</label>
                    <textarea 
                      v-model="home.description" 
                      required 
                      rows="4"
                      class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all resize-none bg-white"
                      placeholder="Describe your property, amenities, and what makes it special..."
                    ></textarea>
                  </div>
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">Special Notes</label>
                    <textarea 
                      v-model="home.note" 
                      rows="3"
                      class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all resize-none bg-white"
                      placeholder="Any additional information for guests..."
                    ></textarea>
                  </div>
                </div>
              </div>
            </div>

            <!-- Right Column - Details & Location -->
            <div class="space-y-6">
              <!-- Property Details -->
              <div class="bg-gray-50 rounded-2xl p-6">
                <h3 class="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                  <svg class="w-5 h-5 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                  Property Details
                </h3>
                <div class="space-y-4">
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">Price per Night ($) *</label>
                    <input 
                      type="number" 
                      min="1" 
                      v-model="home.pricePerNight" 
                      required
                      class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all bg-white"
                      placeholder="150"
                    />
                  </div>
                  <div class="grid grid-cols-2 gap-4">
                    <div>
                      <label class="block text-sm font-medium text-gray-700 mb-2">Guests *</label>
                      <input 
                        type="number" 
                        min="1" 
                        v-model="home.guests" 
                        required
                        class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all bg-white"
                        placeholder="4"
                      />
                    </div>
                    <div>
                      <label class="block text-sm font-medium text-gray-700 mb-2">Bedrooms *</label>
                      <input 
                        type="number" 
                        min="1" 
                        v-model="home.bedrooms" 
                        required
                        class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all bg-white"
                        placeholder="2"
                      />
                    </div>
                  </div>
                  <div class="grid grid-cols-2 gap-4">
                    <div>
                      <label class="block text-sm font-medium text-gray-700 mb-2">Beds *</label>
                      <input 
                        type="number" 
                        min="1" 
                        v-model="home.beds" 
                        required
                        class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all bg-white"
                        placeholder="2"
                      />
                    </div>
                    <div>
                      <label class="block text-sm font-medium text-gray-700 mb-2">Bathrooms *</label>
                      <input 
                        type="number" 
                        min="1" 
                        v-model="home.bathrooms" 
                        required
                        class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all bg-white"
                        placeholder="1"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <!-- Features -->
              <div class="bg-gray-50 rounded-2xl p-6">
                <h3 class="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                  <svg class="w-5 h-5 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m9-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L9 12l5.714-2.143L17 3z" />
                  </svg>
                  Features & Amenities
                </h3>
                <div class="space-y-4">
                  <div>
                    <input
                      type="text"
                      placeholder="Add a feature (press Enter to add)"
                      v-model="feature"
                      @keydown="
                        (e) => {
                          if (e.key === 'Enter') {
                            e.preventDefault();
                            pushFeature();
                          }
                        }
                      "
                      class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all bg-white"
                    />
                  </div>
                  <div v-if="home.features.length" class="flex flex-wrap gap-2">
                    <span
                      v-for="(feature, index) in home.features"
                      :key="index"
                      class="inline-flex items-center px-3 py-1 rounded-full text-sm bg-blue-100 text-blue-800 border border-blue-200"
                    >
                      {{ feature }}
                      <button 
                        type="button"
                        @click="removeFeature(index)"
                        class="ml-2 w-4 h-4 rounded-full bg-blue-200 hover:bg-blue-300 flex items-center justify-center transition-colors"
                      >
                        <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </span>
                  </div>
                </div>
              </div>

              <!-- Location -->
              <div class="bg-gray-50 rounded-2xl p-6">
                <h3 class="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                  <svg class="w-5 h-5 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  Location
                </h3>
                <profile-locationselector
                  @location-selected="
                    (place_name, location) => {
                      home.location = place_name;
                      home._geoloc = location;
                    }
                  "
                />
              </div>

              <!-- Availability -->
              <div class="bg-gray-50 rounded-2xl p-6">
                <h3 class="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                  <svg class="w-5 h-5 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  Availability
                </h3>
                <profile-datepicker
                  @range-selected="
                    (availability) => {
                      home.availability = availability;
                    }
                  "
                />
              </div>
            </div>
          </div>

          <!-- Submit Button -->
          <div class="mt-8 flex justify-end">
            <button
              type="submit"
              class="bg-gradient-to-r from-orange-600 to-white-600 text-white px-8 py-4 rounded-xl hover:shadow-lg transition-all duration-200 font-medium text-lg flex items-center"
            >
              <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              Add Property
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { useAuthStore } from "~/store/auth";

  const home = reactive({
    images: [] as string[],
    title: "",
    description: "",
    note: "",
    features: [] as string[],
    pricePerNight: 0,
    guests: 0,
    bedrooms: 0,
    beds: 0,
    bathrooms: 0,
    reviewValue: 0,
    reviewCount: 0,
    location: "",
    _geoloc: {
      lat: 0,
      lng: 0,
    },
    availability: [] as string[],
  });

  const feature = ref("");

  const { $uploadImage, $addHome } = useNuxtApp();
  const authStore = useAuthStore();

  async function uploadImage(e: Event) {
    const file = (e.target as HTMLInputElement).files?.[0];
    if (!file) return;
    ($uploadImage as any)("homes/", file).then((url: string) => {
      home.images.push(url);
    });
  }

  function pushFeature() {
    if (!feature.value.trim()) return;
    const cleanFeature = feature.value.trim().replace(/\s+/g, " ");
    if (!home.features.includes(cleanFeature)) {
      home.features.push(cleanFeature);
    }
    feature.value = "";
  }

  function removeFeature(index: number) {
    home.features.splice(index, 1);
  }

  async function submit() {
    const id = await ($addHome as any)(home);
    let homeId = authStore.homeId;
    homeId.push(id);
    homeId = [...new Set(homeId)];
    authStore.updateUser({
      objectID: authStore.objectID,
      homeId,
    });
    emits("propertyAdded");
  }
  const emits = defineEmits<{
    (e: "close"): void;
    (e: "propertyAdded"): void;
  }>();
  function handleClick() {
    emits("close");
  }
</script>

<style lang="postcss" scoped>
  /* Custom scrollbar */
  .overflow-y-auto::-webkit-scrollbar {
    width: 8px;
  }
  
  .overflow-y-auto::-webkit-scrollbar-track {
    background: #f1f5f9;
    border-radius: 4px;
  }
  
  .overflow-y-auto::-webkit-scrollbar-thumb {
    background: #cbd5e1;
    border-radius: 4px;
  }
  
  .overflow-y-auto::-webkit-scrollbar-thumb:hover {
    background: #94a3b8;
  }

  /* Input focus effects */
  input:focus,
  textarea:focus {
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
    transform: translateY(-1px);
  }

  /* Smooth transitions for all elements */
  * {
    transition: all 0.2s ease;
  }

  /* Gradient button hover effect */
  button[type="submit"]:hover {
    transform: translateY(-2px);
    box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
  }

  /* Feature tag hover effects */
  .inline-flex:hover {
    transform: scale(1.05);
  }

  /* File upload area animation */
  .group:hover {
    transform: scale(1.02);
  }

  /* Background gradient animation */
  .bg-gradient-to-r {
    background-size: 200% 200%;
    animation: gradientShift 3s ease infinite;
  }

  @keyframes gradientShift {
    0% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
  }

  /* Modal entrance animation */
  .fixed {
    animation: modalFadeIn 0.3s ease-out;
  }

  @keyframes modalFadeIn {
    from {
      opacity: 0;
      transform: scale(0.9);
    }
    to {
      opacity: 1;
      transform: scale(1);
    }
  }

  /* Section headers with icon alignment */
  h3 svg {
    flex-shrink: 0;
  }

  /* Enhanced form sections */
  .bg-gray-50 {
    background: linear-gradient(145deg, #f8fafc, #f1f5f9);
    border: 1px solid #e2e8f0;
  }

  .bg-gray-50:hover {
    background: linear-gradient(145deg, #f1f5f9, #e2e8f0);
  }
</style>
