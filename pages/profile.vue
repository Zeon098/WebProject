<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
    <!-- Loading State -->
    <div v-if="loading" class="flex items-center justify-center min-h-screen">
      <div class="text-center">
        <div class="animate-spin rounded-full h-16 w-16 border-b-4 border-o-600 mx-auto mb-4"></div>
        <p class="text-gray-600 text-lg">Loading your profile...</p>
      </div>
    </div>

    <!-- Not Logged In State -->
    <div v-else-if="!loggedIn && !loading" class="flex items-center justify-center min-h-screen">
      <div class="text-center bg-white rounded-2xl shadow-xl p-8 max-w-md mx-4">
        <div class="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg class="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.118 16.5c-.77.833.192 2.5 1.732 2.5z" />
          </svg>
        </div>
        <h2 class="text-2xl font-bold text-gray-800 mb-2">Access Denied</h2>
        <p class="text-gray-600 mb-6">Please log in to view your profile</p>
        <button 
          @click="() => router.push('/')" 
          class="bg-gradient-to-r from-orange-600 to-orange-600 text-white px-6 py-3 rounded-lg hover:shadow-lg transition-all duration-200"
        >
          Go to Homepage
        </button>
      </div>
    </div>

    <!-- Profile Content -->
    <div v-else class="container mx-auto px-4 py-8">
      <!-- Header -->
      <div class="mb-8">
        <h1 class="text-4xl font-bold text-gray-800 mb-2">Welcome back, {{ authStore.name || 'User' }}!</h1>
        <p class="text-gray-600 text-lg">Manage your properties and account settings</p>
      </div>

      <div class="grid grid-cols-1 xl:grid-cols-4 gap-8">
        <!-- Profile Section -->
        <div class="xl:col-span-1">
          <div class="sticky top-8">
            <profile-card 
              v-if="!edit" 
              @edit-profile="edit = true"
              :user-data="userData"
            />
            <profile-editor 
              v-else 
              @save-profile="handleSaveProfile"
              @cancel-edit="edit = false"
              :user-data="userData"
            />
          </div>
        </div>

        <!-- Properties Section -->
        <div class="xl:col-span-3">
          <div class="bg-white rounded-2xl shadow-xl p-8">
            <div class="flex items-center justify-between mb-8">
              <div>
                <h2 class="text-3xl font-bold text-gray-800 mb-2">My Properties</h2>
                <p class="text-gray-600">{{ propertyCount }} {{ propertyCount === 1 ? 'property' : 'properties' }} available</p>
              </div>
              <button 
                @click="showAddHome = true"
                class="bg-gradient-to-r from-orange-600 to-white-600 text-white px-6 py-3 rounded-xl hover:shadow-lg transition-all duration-200 flex items-center gap-2 font-medium"
              >
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                Add Property
              </button>
            </div>
            
            <!-- Properties Grid -->
            <profile-homes 
              :force-refresh="homeRefreshKey" 
              @property-count="updatePropertyCount"
            />
          </div>
        </div>
      </div>
    </div>

    <!-- Add Home Modal -->
    <profile-addhome 
      v-if="showAddHome" 
      @close="handleCloseAddHome" 
      @property-added="handlePropertyAdded"
    />

    <!-- Success Toast -->
    <div 
      v-if="showSuccessToast"
      class="fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50 transform transition-all duration-300"
      :class="showSuccessToast ? 'translate-x-0' : 'translate-x-full'"
    >
      <div class="flex items-center gap-2">
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
        </svg>
        {{ toastMessage }}
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { useAuthStore } from "~/store/auth";

  const authStore = useAuthStore();
  const edit = ref(false);
  const loading = ref(true);
  const showAddHome = ref(false);
  const homeRefreshKey = ref(0);
  const propertyCount = ref(0);
  const showSuccessToast = ref(false);
  const toastMessage = ref('');
  const router = useRouter();
  const loggedIn = computed(() => authStore.loggedIn);

  // User data computed property
  const userData = computed(() => ({
    objectID: '2585e8ChzAbPEdROK48NsT9UTI83',
    name: 'Abdul Rehman',
    email: 'abdulrehmanlatif98@gmail.com',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2.0&w=100&h=100',
    joined: new Date('2024-01-01T00:00:00-0400'),
    reviewCount: 5,
    description: 'Welcome to my properties! I strive to provide clean, comfortable, and memorable stays for all my guests.',
    homeId: ['o', 'n', 'm', 'l', 'k', 'j']
  }));

  // Auto-login for development/testing
  onMounted(async () => {
    try {
      // Check if user is already logged in
      if (!loggedIn.value) {
        // Set the test user data directly in the auth store
        authStore.user = userData.value;
        console.log('Test user loaded:', userData.value);
      }
    } catch (error) {
      console.log('Could not auto-login test user:', error);
    } finally {
      loading.value = false;
    }
  });

  // Handle save profile
  function handleSaveProfile(updatedData: any) {
    try {
      // Update the auth store with new data
      if (authStore.user) {
        Object.assign(authStore.user, updatedData);
      }
      edit.value = false;
      showToast('Profile updated successfully!');
    } catch (error) {
      console.error('Error updating profile:', error);
      showToast('Failed to update profile', 'error');
    }
  }

  // Handle close add home modal (without success)
  function handleCloseAddHome() {
    showAddHome.value = false;
  }

  // Handle property added successfully
  function handlePropertyAdded() {
    showAddHome.value = false;
    homeRefreshKey.value++;
    showToast('Property added successfully!');
  }

  // Update property count
  function updatePropertyCount(count: number) {
    propertyCount.value = count;
  }

  // Show toast notification
  function showToast(message: string, type: 'success' | 'error' = 'success') {
    toastMessage.value = message;
    showSuccessToast.value = true;
    setTimeout(() => {
      showSuccessToast.value = false;
    }, 3000);
  }

  watch(loggedIn, (val) => {
    if (!val && !loading.value) {
      router.push("/");
    }
  });
</script>

<style lang="postcss">
  .wrapper {
    box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.04);
    border: 2px solid #ebebeb;
  }
</style>
