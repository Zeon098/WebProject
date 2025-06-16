# 🏨 Hotel Management System - PakBnb

A comprehensive hotel and property management system built with modern web technologies. This project provides a complete solution for managing hotel bookings, property listings, user authentication, and interactive maps.

## 🚀 Project Overview

**Project Name:** Hotel Management System  
**Technology Stack:** Nuxt.js, Vue.3, TypeScript, Tailwind CSS  
**Database:** Algolia Search, Firebase Authentication  
**Maps Integration:** Mapbox GL  
**Payment Processing:** Stripe  

## ✨ Key Features

### 🏠 Property Management
- **Property Listings** - Browse and search available properties
- **Interactive Maps** - View property locations with custom markers
- **Property Details** - Comprehensive property information with image galleries
- **Price Display** - Real-time pricing and availability

### 👥 User Management
- **User Authentication** - Secure login/signup with Firebase
- **Profile Management** - User profiles with avatar upload
- **Host Information** - Detailed host profiles and reviews

### 🔍 Search & Filter
- **Advanced Search** - Location-based property search
- **Map Integration** - Visual property exploration on interactive maps
- **Real-time Results** - Instant search results with pagination

### 💳 Booking System
- **Secure Payments** - Stripe integration for secure transactions
- **Booking Management** - Complete booking workflow
- **Success Pages** - Confirmation and success handling

### 🎨 User Experience
- **Responsive Design** - Mobile-first approach with Tailwind CSS
- **Modern UI** - Clean, professional interface
- **Interactive Elements** - Smooth animations and transitions
- **Help System** - Built-in AI chat support

## 🛠️ Technical Implementation

### Frontend Architecture
- **Nuxt.js 3** - Full-stack Vue.js framework
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first styling
- **Pinia** - State management

### Backend Services
- **Algolia Search** - Fast and relevant search functionality
- **Firebase Auth** - User authentication and management
- **Stripe API** - Payment processing
- **Mapbox GL** - Interactive maps and geolocation

### Key Components
- Property search and listing system
- User authentication and profile management
- Interactive map with property markers
- Image upload and gallery system
- Booking and payment workflow

## 📦 Installation & Setup

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn package manager
- Git

### Environment Setup
1. Clone the repository
```bash
git clone <your-repo-url>
cd pakbnb
```

2. Install dependencies
```bash
npm install
```

3. Environment Configuration
```bash
cp .env.example .env
```

4. Configure your API keys in `.env`:
```bash
# Algolia Configuration
ALGOLIA_APP_ID=your_algolia_app_id
ALGOLIA_API_KEY=your_algolia_api_key

# Mapbox Configuration
MAPBOX_ACCESS_TOKEN=your_mapbox_token

# Firebase Configuration
FIREBASE_API_KEY=your_firebase_api_key
FIREBASE_AUTH_DOMAIN=your_auth_domain
FIREBASE_PROJECT_ID=your_project_id
FIREBASE_STORAGE_BUCKET=your_storage_bucket
FIREBASE_MESSAGING_SENDER_ID=your_sender_id
FIREBASE_APP_ID=your_app_id

# Stripe Configuration
STRIPE_SECRET=your_stripe_secret_key
```

5. Start the development server
```bash
npm run dev
```

## 📱 Usage Guide

### For Users
1. **Browse Properties** - Visit the homepage to see available properties
2. **Search Locations** - Use the search functionality to find properties in specific areas
3. **View on Map** - Click on map markers to see property details
4. **User Account** - Sign up/login to manage bookings and profile
5. **Book Properties** - Complete bookings through the secure payment system

### For Admins
1. **Property Management** - Add and manage property listings
2. **User Management** - Monitor user accounts and activities
3. **Booking Oversight** - Track and manage all bookings
4. **Analytics** - View system performance and usage statistics

## 🏗️ Project Structure

```
pakbnb/
├── components/          # Reusable Vue components
│   ├── auth/           # Authentication components
│   ├── home/           # Property-related components
│   ├── layouts/        # Layout components
│   ├── profile/        # User profile components
│   └── search/         # Search and map components
├── pages/              # Application pages
├── plugins/            # Nuxt plugins
├── store/              # Pinia stores
├── types/              # TypeScript type definitions
├── utils/              # Utility functions
└── assets/             # Static assets
```

## 🔧 Development Features

- **Hot Module Replacement** - Instant development feedback
- **TypeScript Support** - Full type safety
- **ESLint & Prettier** - Code quality and formatting
- **Responsive Design** - Works on all device sizes
- **SEO Optimized** - Meta tags and structured data

## 🚀 Deployment

The application is ready for deployment on platforms like:
- Vercel
- Netlify
- Firebase Hosting
- AWS Amplify

## 📊 Performance Features

- **Image Optimization** - Lazy loading and responsive images
- **Code Splitting** - Optimized bundle sizes
- **Caching** - Efficient data caching strategies
- **SEO** - Search engine optimization

## 🤝 Contributing

This project was developed as part of a web development course and demonstrates modern full-stack development practices.

## 📄 License

This project is for educational purposes.

## 👨‍💻 Developer

**Student Name:** [Your Name]  
**Course:** Web Development  
**Institution:** [Your Institution]  
**Submission Date:** June 16, 2025

---

**Note:** This is a comprehensive hotel management system demonstrating modern web development practices including responsive design, real-time search, payment integration, and user management.

Build the application for production:

```bash
npm run build
yarn build
```

Locally preview production build:

```bash
npm run preview
yarn preview
```

Check out the [deployment documentation](https://nuxt.com/docs/getting-started/deployment) for more information.
