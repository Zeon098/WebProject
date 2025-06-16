<template>
  <div class="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-end justify-end p-4">
    <transition name="chat-slide" appear>
      <div class="bg-white rounded-3xl shadow-2xl w-full max-w-md h-[600px] flex flex-col overflow-hidden">
        <!-- Header -->
        <div class="bg-gradient-to-r from-purple-600 to-blue-600 p-4 text-white flex items-center justify-between">
          <div class="flex items-center space-x-3">
            <div class="relative">
              <div class="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" />
                </svg>
              </div>
              <div class="absolute -bottom-1 -right-1 w-3 h-3 bg-green-400 rounded-full border-2 border-white"></div>
            </div>
            <div>
              <h3 class="font-semibold">AI Assistant</h3>
              <p class="text-xs text-purple-100">Online • Ready to help</p>
            </div>
          </div>
          <button 
            @click="$emit('close')"
            class="p-2 hover:bg-white/20 rounded-full transition-colors duration-200"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <!-- Chat Messages -->
        <div 
          ref="messagesContainer"
          class="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50"
        >
          <div 
            v-for="(message, index) in messages" 
            :key="index"
            :class="message.sender === 'user' ? 'flex justify-end' : 'flex justify-start'"
          >
            <div 
              :class="[
                'max-w-xs lg:max-w-md px-4 py-2 rounded-2xl shadow-sm',
                message.sender === 'user' 
                  ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white' 
                  : 'bg-white text-gray-800 border border-gray-200'
              ]"
            >
              <p class="text-sm leading-relaxed">{{ message.text }}</p>
              <p 
                :class="[
                  'text-xs mt-1',
                  message.sender === 'user' ? 'text-purple-100' : 'text-gray-500'
                ]"
              >
                {{ formatTime(message.timestamp) }}
              </p>
            </div>
          </div>

          <!-- Typing indicator -->
          <div v-if="isTyping" class="flex justify-start">
            <div class="bg-white text-gray-800 border border-gray-200 px-4 py-2 rounded-2xl shadow-sm">
              <div class="flex space-x-1">
                <div class="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                <div class="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style="animation-delay: 0.1s"></div>
                <div class="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style="animation-delay: 0.2s"></div>
              </div>
            </div>
          </div>
        </div>

        <!-- Quick Suggestions -->
        <div v-if="showSuggestions" class="px-4 py-2 bg-gray-50 border-t border-gray-200">
          <p class="text-xs text-gray-500 mb-2">Quick questions:</p>
          <div class="flex flex-wrap gap-2">
            <button
              v-for="suggestion in suggestions"
              :key="suggestion"
              @click="sendMessage(suggestion)"
              class="px-3 py-1 text-xs bg-white border border-gray-300 rounded-full hover:bg-gray-50 transition-colors duration-200"
            >
              {{ suggestion }}
            </button>
          </div>
        </div>

        <!-- Input Area -->
        <div class="p-4 bg-white border-t border-gray-200">
          <div class="flex items-center space-x-2">
            <div class="flex-1 relative">
              <input
                v-model="newMessage"
                @keypress.enter="sendUserMessage"
                type="text"
                placeholder="Type your message..."
                class="w-full px-4 py-3 pr-12 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
              />
              <button
                @click="sendUserMessage"
                :disabled="!newMessage.trim() || isTyping"
                class="absolute right-2 top-1/2 transform -translate-y-1/2 p-2 text-purple-600 hover:text-purple-700 disabled:text-gray-400 disabled:cursor-not-allowed transition-colors duration-200"
              >
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { ref, onMounted, nextTick, watch } from 'vue'

// Emits
defineEmits(['close'])

// Reactive data
const messages = ref([])
const newMessage = ref('')
const isTyping = ref(false)
const showSuggestions = ref(true)
const messagesContainer = ref(null)

// Quick suggestions
const suggestions = ref([
  'How do I book a property?',
  'What are your cancellation policies?',
  'How do I become a host?',
  'Payment methods available?',
  'Contact customer support'
])

// AI responses database
const aiResponses = {
  'booking': {
    keywords: ['book', 'reservation', 'reserve', 'booking process'],
    response: 'To book a property on PakBnB: 1) Search for your destination and dates, 2) Browse available properties, 3) Select your preferred accommodation, 4) Click "Book Now" and provide guest details and payment information. Your booking will be confirmed instantly!'
  },
  'cancellation': {
    keywords: ['cancel', 'cancellation', 'refund', 'policy'],
    response: 'Our cancellation policy varies by property. Most hosts offer free cancellation up to 24-48 hours before check-in. You can cancel your booking from your account dashboard or contact our support team for assistance with your specific reservation.'
  },
  'host': {
    keywords: ['host', 'list property', 'become host', 'hosting'],
    response: 'Becoming a host is easy! Click "Become a Host" in the main menu, create your host profile, list your property with photos and descriptions, set your pricing and availability. Our team will review and approve your listing within 24 hours.'
  },
  'payment': {
    keywords: ['payment', 'pay', 'methods', 'credit card', 'paypal'],
    response: 'We accept all major credit cards (Visa, MasterCard, American Express), PayPal, and bank transfers. All transactions are secured with industry-standard encryption to protect your financial information.'
  },
  'support': {
    keywords: ['support', 'help', 'contact', 'customer service'],
    response: 'You can reach our 24/7 customer support through: Live chat (right here!), Email: support@pakbnb.com, Phone: +92-XXX-XXXXXXX (9 AM - 6 PM PKT). We\'re always here to help!'
  },
  'account': {
    keywords: ['account', 'profile', 'login', 'sign up', 'register'],
    response: 'To create an account, click "Sign Up" and fill in your details. To manage your account, go to your profile settings where you can update personal information, payment methods, and preferences.'
  },
  'security': {
    keywords: ['security', 'safe', 'privacy', 'data', 'secure'],
    response: 'Your security is our priority. We use industry-standard encryption, secure payment processing, verified host profiles, and 24/7 customer support. Your personal data is protected and never shared without consent.'
  }
}

// Methods
const sendUserMessage = () => {
  if (!newMessage.value.trim() || isTyping.value) return

  const userMsg = {
    sender: 'user',
    text: newMessage.value,
    timestamp: new Date()
  }

  messages.value.push(userMsg)
  const userQuestion = newMessage.value
  newMessage.value = ''
  showSuggestions.value = false

  // Simulate AI thinking
  isTyping.value = true
  
  setTimeout(() => {
    const aiResponse = generateAIResponse(userQuestion)
    messages.value.push({
      sender: 'ai',
      text: aiResponse,
      timestamp: new Date()
    })
    isTyping.value = false
    scrollToBottom()
  }, 1000 + Math.random() * 1000) // Random delay between 1-2 seconds
}

const sendMessage = (message) => {
  newMessage.value = message
  sendUserMessage()
}

const generateAIResponse = (question) => {
  const lowerQuestion = question.toLowerCase()
  
  // Check for specific keywords and return appropriate response
  for (const [category, data] of Object.entries(aiResponses)) {
    if (data.keywords.some(keyword => lowerQuestion.includes(keyword))) {
      return data.response
    }
  }

  // Default responses for common greetings
  if (lowerQuestion.includes('hello') || lowerQuestion.includes('hi') || lowerQuestion.includes('hey')) {
    return 'Hello! Welcome to PakBnB support. I\'m here to help you with any questions about bookings, hosting, payments, or general inquiries. How can I assist you today?'
  }

  if (lowerQuestion.includes('thank') || lowerQuestion.includes('thanks')) {
    return 'You\'re welcome! I\'m glad I could help. Is there anything else you\'d like to know about PakBnB?'
  }

  if (lowerQuestion.includes('bye') || lowerQuestion.includes('goodbye')) {
    return 'Goodbye! Thank you for using PakBnB. If you need any more help, feel free to chat with me anytime. Have a great day!'
  }

  // Default fallback response
  return 'I understand you\'re asking about "' + question + '". While I try to help with most questions, you might want to contact our human support team for more specific assistance. You can reach them via email at support@pakbnb.com or phone at +92-XXX-XXXXXXX. Is there anything else I can help you with?'
}

const formatTime = (timestamp) => {
  return timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
}

const scrollToBottom = () => {
  nextTick(() => {
    if (messagesContainer.value) {
      messagesContainer.value.scrollTop = messagesContainer.value.scrollHeight
    }
  })
}

// Watchers
watch(messages, () => {
  scrollToBottom()
}, { deep: true })

// Lifecycle
onMounted(() => {
  // Welcome message
  messages.value.push({
    sender: 'ai',
    text: 'Hi there! 👋 I\'m your AI assistant for PakBnB. I can help you with bookings, hosting questions, payment info, and more. What would you like to know?',
    timestamp: new Date()
  })
  scrollToBottom()
})
</script>

<style scoped>
.chat-slide-enter-active,
.chat-slide-leave-active {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.chat-slide-enter-from {
  opacity: 0;
  transform: translateX(100%) translateY(100%);
}

.chat-slide-leave-to {
  opacity: 0;
  transform: translateX(100%) translateY(100%);
}

.chat-slide-enter-to,
.chat-slide-leave-from {
  opacity: 1;
  transform: translateX(0) translateY(0);
}

/* Custom scrollbar */
.overflow-y-auto::-webkit-scrollbar {
  width: 4px;
}

.overflow-y-auto::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 10px;
}

.overflow-y-auto::-webkit-scrollbar-thumb {
  background: #d1d5db;
  border-radius: 10px;
}

.overflow-y-auto::-webkit-scrollbar-thumb:hover {
  background: #9ca3af;
}

/* Animation for typing dots */
@keyframes bounce {
  0%, 80%, 100% {
    transform: scale(1);
    opacity: 0.5;
  }
  40% {
    transform: scale(1.2);
    opacity: 1;
  }
}

.animate-bounce {
  animation: bounce 1.4s infinite;
}
</style>
