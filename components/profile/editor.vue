<template>
  <div class="w-full wrapper py-5 px-14 flex flex-col items-center gap-6">
    <form>
      <div class="w-full flex flex-col gap-3 items-center">
        <div class="relative group">
          <label for="image" class="cursor-pointer block">
            <div class="relative">
              <img 
                :src="imageUrl" 
                class="rounded-full w-32 h-32 object-cover border-4 border-gray-200 group-hover:border-blue-400 transition-all duration-300"
                :class="{ 'opacity-50': isUploading }"
                :alt="`${name}'s avatar`"
              />
              
              <!-- Upload overlay -->
              <div class="absolute inset-0 bg-black bg-opacity-50 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div class="text-white text-center">
                  <svg class="w-8 h-8 mx-auto mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"></path>
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"></path>
                  </svg>
                  <span class="text-xs font-medium">Change Photo</span>
                </div>
              </div>
              
              <!-- Loading spinner -->
              <div v-if="isUploading" class="absolute inset-0 flex items-center justify-center">
                <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
              </div>
            </div>
          </label>
          
          <input
            v-show="false"
            type="file"
            id="image"
            accept="image/*"
            @change="handleImageUpload"
            ref="fileInput"
          />
        </div>
        
        <!-- Upload status messages -->
        <div v-if="uploadMessage" class="text-center">
          <p class="text-sm font-medium text-green-600">
            {{ uploadMessage }}
          </p>
        </div>
        
        <!-- Save success message -->
        <div v-if="saveSuccess" class="text-center">
          <p class="text-sm font-medium text-green-600">
            ✅ Profile saved successfully!
          </p>
        </div>
        <div class="grid grid-cols-1 gap-3">
          <div class="flex items-center gap-2 text-neutral-500">
            <label for="name">Name</label>
            <input type="text" id="name" v-model="name" />
          </div>
          <div class="flex items-center gap-2 text-neutral-500">
            <label for="email">Email</label>
            <input type="text" id="email" v-model="email" />
          </div>
          <div class="flex flex-col gap-2 text-neutral-500">
            <label for="description">Description</label>
            <textarea v-model="description" />
          </div>
        </div>
      </div>
    </form>
  </div>
  
  <div class="flex gap-2 p-2">
    <button
      class="flex-1 p-3 rounded-lg text-white font-medium gradient hover:bg-white hover:gradient-text hover:border-1 hover:border-primary disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
      @click="handleClick"
      :disabled="isSaving || isUploading"
    >
      <div v-if="isSaving" class="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
      {{ isSaving ? 'Saving...' : 'Save profile' }}
    </button>
    
    <button
      class="flex-1 p-3 rounded-lg text-gray-600 font-medium bg-gray-200 hover:bg-gray-300 border-1 border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
      @click="emits('cancel-edit')"
      :disabled="isSaving || isUploading"
    >
      Cancel
    </button>
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
      joined: Date;
      reviewCount: number;
      description: string;
      homeId: string[];
    };
  }>();

  const authStore = useAuthStore();
  const { $uploadImage } = useNuxtApp();

  // Use user data from props if available, otherwise fallback to auth store
  const name = ref(props.userData?.name || authStore.name || '');
  const email = ref(props.userData?.email || authStore.email || '');
  const description = ref(props.userData?.description || authStore.description || '');
  const imageUrl = ref(props.userData?.image || authStore.imageUrl || '');
  
  const isUploading = ref(false);
  const uploadMessage = ref('');
  const fileInput = ref<HTMLInputElement>();
  const isSaving = ref(false);
  const saveSuccess = ref(false);

  // Define emits
  const emits = defineEmits<{
    (e: "save-profile", userData: any): void;
    (e: "cancel-edit"): void;
  }>();

  // Watch for prop changes and update local refs
  watch(() => props.userData, (newUserData) => {
    if (newUserData) {
      name.value = newUserData.name;
      email.value = newUserData.email;
      description.value = newUserData.description;
      imageUrl.value = newUserData.image;
    }
  }, { immediate: true });

  authStore.$onAction(({ name: actionName, args, after, onError }) => {
    after(() => {
      if (actionName === "setUser") {
        emits("save-profile", {
          name: name.value,
          email: email.value,
          description: description.value,
          image: imageUrl.value
        });
      }
    });
  });

  async function handleImageUpload(e: Event) {
    const file = (e.target as HTMLInputElement).files?.[0];
    if (!file) return;
    
    // Validate file type
    if (!file.type.startsWith('image/')) {
      uploadMessage.value = 'Please select a valid image file';
      return;
    }
    
    try {
      isUploading.value = true;
      uploadMessage.value = 'Uploading image...';
      
      const { $uploadImage } = useNuxtApp() as any;
      const url = await $uploadImage("users/", file);
      
      imageUrl.value = url;
      uploadMessage.value = 'Image uploaded successfully!';
      
      // Clear the file input
      if (fileInput.value) {
        fileInput.value.value = '';
      }
      
      // Clear success message after 3 seconds
      setTimeout(() => {
        uploadMessage.value = '';
      }, 3000);
      
    } catch (error) {
      console.error('Upload error:', error);
      uploadMessage.value = 'Failed to upload image. Please try again.';
      
      // Clear error message after 5 seconds
      setTimeout(() => {
        uploadMessage.value = '';
      }, 5000);
    } finally {
      isUploading.value = false;
    }
  }

  async function handleClick() {
    try {
      isSaving.value = true;
      saveSuccess.value = false;
      
      const updatedUser = {
        objectID: props.userData?.objectID || authStore.id,
        name: name.value,
        email: email.value,
        description: description.value,
        image: imageUrl.value,
      };
      
      await authStore.updateUser(updatedUser);
      
      saveSuccess.value = true;
      
      // Auto-close after successful save
      setTimeout(() => {
        saveSuccess.value = false;
        emits("save-profile", updatedUser);
      }, 1000);
      
    } catch (error) {
      console.error('Save error:', error);
    } finally {
      isSaving.value = false;
    }
  }
</script>

<style lang="postcss" scoped>
  input,
  textarea {
    @apply bg-white outline-hidden rounded-lg;
    border: 2px solid #ebebeb;
  }
  textarea {
    @apply p-2;
  }
</style>
