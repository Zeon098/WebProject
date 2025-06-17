<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
    <!-- Hero Section -->
    <div class="bg-gradient-to-r from-orange-600 to-white-700 text-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div class="text-center">
          <h1 class="text-4xl md:text-5xl font-bold mb-4">
            How can we help you?
          </h1>
          <p class="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Find answers to your questions or chat with our AI assistant for instant support
          </p>
          
          <!-- Search Bar -->
          <div class="max-w-2xl mx-auto relative">
            <input
              v-model="searchQuery"
              type="text"
              placeholder="Search for help articles..."
              class="w-full px-6 py-4 pl-12 text-gray-900 bg-white rounded-2xl shadow-lg focus:ring-2 focus:ring-blue-500 focus:outline-none text-lg"
              @input="filterFAQs"
            />
            <svg class="absolute left-4 top-1/2 transform -translate-y-1/2 w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>
      </div>
    </div>

    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        <!-- Main Content -->
        <div class="lg:col-span-2 space-y-8">
          
          <!-- Quick Help Cards -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div 
              v-for="category in helpCategories" 
              :key="category.id"
              class="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:scale-105"
              @click="selectedCategory = category.id"
            >
              <div class="flex items-center mb-4">
                <div :class="category.iconBg" class="p-3 rounded-xl">
                  <component :is="category.icon" class="w-6 h-6 text-white" />
                </div>
                <h3 class="text-xl font-semibold ml-4">{{ category.title }}</h3>
              </div>
              <p class="text-gray-600 mb-4">{{ category.description }}</p>
              <span class="text-blue-600 font-medium">{{ category.articleCount }} articles</span>
            </div>
          </div>

          <!-- FAQ Section -->
          <div class="bg-white rounded-2xl shadow-lg p-8">
            <h2 class="text-2xl font-bold mb-6 text-gray-900">Frequently Asked Questions</h2>
            <div class="space-y-4">
              <div 
                v-for="(faq, index) in filteredFAQs" 
                :key="index"
                class="border border-gray-200 rounded-xl overflow-hidden"
              >
                <button
                  @click="toggleFAQ(index)"
                  class="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-gray-50 transition-colors duration-200"
                >
                  <span class="font-medium text-gray-900">{{ faq.question }}</span>
                  <svg 
                    :class="{ 'rotate-180': openFAQ === index }"
                    class="w-5 h-5 text-gray-500 transition-transform duration-200"
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                <transition name="fade-slide">
                  <div v-if="openFAQ === index" class="px-6 pb-4">
                    <p class="text-gray-600 leading-relaxed">{{ faq.answer }}</p>
                  </div>
                </transition>
              </div>
            </div>
          </div>

          <!-- Contact Options -->
          <div class="bg-white rounded-2xl shadow-lg p-8">
            <h2 class="text-2xl font-bold mb-6 text-gray-900">Still need help?</h2>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div class="text-center p-6 border border-gray-200 rounded-xl hover:border-blue-300 transition-colors duration-200">
                <div class="bg-blue-100 p-3 rounded-full w-12 h-12 mx-auto mb-4 flex items-center justify-center">
                  <svg class="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 class="font-semibold mb-2">Email Support</h3>
                <p class="text-gray-600 text-sm mb-4">Get help via email within 24 hours</p>
                <button class="text-blue-600 font-medium hover:text-blue-700">Send Email</button>
              </div>
              
              <div class="text-center p-6 border border-gray-200 rounded-xl hover:border-blue-300 transition-colors duration-200">
                <div class="bg-green-100 p-3 rounded-full w-12 h-12 mx-auto mb-4 flex items-center justify-center">
                  <svg class="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <h3 class="font-semibold mb-2">Phone Support</h3>
                <p class="text-gray-600 text-sm mb-4">Call us Mon-Fri 9AM-6PM</p>
                <button class="text-green-600 font-medium hover:text-green-700">Call Now</button>
              </div>
              
              <div class="text-center p-6 border border-gray-200 rounded-xl hover:border-blue-300 transition-colors duration-200">
                <div class="bg-purple-100 p-3 rounded-full w-12 h-12 mx-auto mb-4 flex items-center justify-center">
                  <svg class="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                </div>
                <h3 class="font-semibold mb-2">Live Chat</h3>
                <p class="text-gray-600 text-sm mb-4">Chat with our AI assistant</p>
                <button 
                  @click="toggleChat"
                  class="text-purple-600 font-medium hover:text-purple-700"
                >
                  Start Chat
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- Sidebar -->
        <div class="space-y-6">
          <!-- Quick Links -->
          <div class="bg-white rounded-2xl shadow-lg p-6">
            <h3 class="text-lg font-semibold mb-4">Quick Links</h3>
            <div class="space-y-3">
              <a href="#" class="flex items-center text-gray-600 hover:text-blue-600 transition-colors duration-200">
                <svg class="w-4 h-4 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Getting Started Guide
              </a>
              <a href="#" class="flex items-center text-gray-600 hover:text-blue-600 transition-colors duration-200">
                <svg class="w-4 h-4 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
                User Manual
              </a>
              <a href="#" class="flex items-center text-gray-600 hover:text-blue-600 transition-colors duration-200">
                <svg class="w-4 h-4 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2H9a2 2 0 01-2-2z" />
                </svg>
                API Documentation
              </a>
              <a href="#" class="flex items-center text-gray-600 hover:text-blue-600 transition-colors duration-200">
                <svg class="w-4 h-4 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Troubleshooting
              </a>
            </div>
          </div>

          <!-- Status -->
          <div class="bg-white rounded-2xl shadow-lg p-6">
            <h3 class="text-lg font-semibold mb-4">System Status</h3>
            <div class="space-y-3">
              <div class="flex items-center justify-between">
                <span class="text-gray-600">Platform</span>
                <div class="flex items-center">
                  <div class="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                  <span class="text-sm text-green-600">Operational</span>
                </div>
              </div>
              <div class="flex items-center justify-between">
                <span class="text-gray-600">Search</span>
                <div class="flex items-center">
                  <div class="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                  <span class="text-sm text-green-600">Operational</span>
                </div>
              </div>
              <div class="flex items-center justify-between">
                <span class="text-gray-600">Payments</span>
                <div class="flex items-center">
                  <div class="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                  <span class="text-sm text-green-600">Operational</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- AI Chat Component -->
    <HelpAIChat v-if="isChatOpen" @close="toggleChat" />
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'

// Meta
definePageMeta({
  title: 'Help & Support - Continentals'
})

// Reactive data
const searchQuery = ref('')
const selectedCategory = ref(null)
const openFAQ = ref(null)
const isChatOpen = ref(false)

// Help categories
const helpCategories = ref([
  {
    id: 1,
    title: 'Getting Started',
    description: 'Learn the basics of using Continentals',
    articleCount: 12,
    icon: 'PlayIcon',
    iconBg: 'bg-blue-500'
  },
  {
    id: 2,
    title: 'Booking & Reservations',
    description: 'Everything about making and managing bookings',
    articleCount: 18,
    icon: 'CalendarIcon',
    iconBg: 'bg-green-500'
  },
  {
    id: 3,
    title: 'Payments & Billing',
    description: 'Payment methods, billing, and refunds',
    articleCount: 8,
    icon: 'CreditCardIcon',
    iconBg: 'bg-purple-500'
  },
  {
    id: 4,
    title: 'Host Resources',
    description: 'Tools and guides for property hosts',
    articleCount: 15,
    icon: 'HomeIcon',
    iconBg: 'bg-orange-500'
  }
])

// FAQ data
const faqs = ref([
  {
    question: 'How do I create an account?',
    answer: 'Creating an account is simple! Click the "Sign Up" button in the top right corner, fill in your details including your name, email, and password. You\'ll receive a confirmation email to verify your account.'
  },
  {
    question: 'How do I book a property?',
    answer: 'To book a property, search for your destination and dates, browse available properties, select your preferred accommodation, and click "Book Now". You\'ll need to provide guest details and payment information to complete your reservation.'
  },
  {
    question: 'What payment methods do you accept?',
    answer: 'We accept all major credit cards (Visa, MasterCard, American Express), PayPal, and bank transfers. All transactions are secure and encrypted for your safety.'
  },
  {
    question: 'Can I cancel my booking?',
    answer: 'Yes, you can cancel your booking according to the property\'s cancellation policy. Free cancellation is often available up to 24-48 hours before check-in. Check your booking details for specific terms.'
  },
  {
    question: 'How do I become a host?',
    answer: 'To become a host, click "Become a Host" in the main menu, create a host profile, list your property with photos and descriptions, set your pricing and availability, and wait for approval. Our team will review your listing within 24 hours.'
  },
  {
    question: 'Is my personal information secure?',
    answer: 'Absolutely! We use industry-standard encryption and security measures to protect your personal information. We never share your data with third parties without your consent, and you can control your privacy settings in your account.'
  },
  {
    question: 'How do I contact customer support?',
    answer: 'You can reach our customer support team through live chat (available 24/7), email at support@continentals.com, or phone at +92-XXX-XXXXXXX during business hours (9 AM - 6 PM PKT).'
  },
  {
    question: 'What if I have issues during my stay?',
    answer: 'If you encounter any issues during your stay, contact us immediately through the app, live chat, or emergency hotline. We have a 24/7 support team ready to help resolve any problems quickly.'
  }
])

// Computed
const filteredFAQs = computed(() => {
  if (!searchQuery.value) return faqs.value
  return faqs.value.filter(faq => 
    faq.question.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
    faq.answer.toLowerCase().includes(searchQuery.value.toLowerCase())
  )
})

// Methods
const toggleFAQ = (index) => {
  openFAQ.value = openFAQ.value === index ? null : index
}

const toggleChat = () => {
  isChatOpen.value = !isChatOpen.value
}

const filterFAQs = () => {
  // This is handled by the computed property
}

// Lifecycle
onMounted(() => {
  // Add any initialization logic here
})
</script>

<style scoped>
.fade-slide-enter-active,
.fade-slide-leave-active {
  transition: all 0.3s ease;
}

.fade-slide-enter-from {
  opacity: 0;
  transform: translateY(-10px);
}

.fade-slide-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
</style>
