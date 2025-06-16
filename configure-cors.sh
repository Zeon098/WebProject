#!/bin/bash

# Firebase Storage CORS Configuration Script
# This script helps configure CORS settings for Firebase Storage

echo "🔥 Firebase Storage CORS Configuration"
echo "======================================"
echo ""

# Check if gsutil is installed
if ! command -v gsutil &> /dev/null; then
    echo "❌ gsutil is not installed."
    echo "Please install Google Cloud SDK first:"
    echo "https://cloud.google.com/sdk/docs/install"
    echo ""
    echo "After installation, run:"
    echo "gcloud auth login"
    echo "gcloud config set project pakbnb-82f4f"
    echo ""
    exit 1
fi

echo "📋 Your Firebase Storage bucket: pakbnb-82f4f.firebasestorage.app"
echo ""

# Apply CORS configuration
echo "🚀 Applying CORS configuration..."
gsutil cors set cors.json gs://pakbnb-82f4f.firebasestorage.app

if [ $? -eq 0 ]; then
    echo "✅ CORS configuration applied successfully!"
    echo ""
    echo "🔍 Current CORS configuration:"
    gsutil cors get gs://pakbnb-82f4f.firebasestorage.app
else
    echo "❌ Failed to apply CORS configuration."
    echo "Please make sure you're authenticated and have proper permissions."
    echo ""
    echo "Try running:"
    echo "gcloud auth login"
    echo "gcloud config set project pakbnb-82f4f"
fi

echo ""
echo "📚 Additional steps if issues persist:"
echo "1. Check Firebase Storage Security Rules"
echo "2. Verify your Firebase project settings"
echo "3. Ensure you're authenticated with the correct Google account"
echo ""
echo "🔗 Useful links:"
echo "- Firebase Console: https://console.firebase.google.com/project/pakbnb-82f4f"
echo "- Storage Rules: https://console.firebase.google.com/project/pakbnb-82f4f/storage/rules"
