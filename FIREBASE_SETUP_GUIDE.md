# Firebase Configuration Setup Guide

## ⚠️ IMPORTANT: Missing Firebase Credentials

Your application is currently missing Firebase configuration. This is causing the error:
```
Firebase: Error (auth/invalid-api-key)
```

## How to Get Your Firebase Credentials

### Step 1: Go to Firebase Console
1. Visit [Firebase Console](https://console.firebase.google.com/)
2. Select your project (or create a new one if needed)

### Step 2: Access Project Settings
1. Click the **gear icon** (⚙️) next to "Project Overview"
2. Select **Project settings**

### Step 3: Find Your Web App Configuration
1. Scroll down to the **"Your apps"** section
2. If you already have a web app, click on it
3. If not, click **"Add app"** → Select **Web** (</>) icon
4. Register your app with a nickname (e.g., "Novra Web")

### Step 4: Copy Your Configuration
You'll see a configuration object that looks like this:

```javascript
const firebaseConfig = {
  apiKey: "AIzaSyXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
  authDomain: "your-project-id.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-project-id.appspot.com",
  messagingSenderId: "123456789012",
  appId: "1:123456789012:web:abcdef123456",
  measurementId: "G-XXXXXXXXXX"
};
```

### Step 5: Update Your `.env.local` File
Replace the placeholder values in `.env.local` with your actual Firebase credentials:

```bash
# Firebase Configuration
VITE_FIREBASE_API_KEY=AIzaSyXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
VITE_FIREBASE_AUTH_DOMAIN=your-project-id.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your-project-id
VITE_FIREBASE_STORAGE_BUCKET=your-project-id.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=123456789012
VITE_FIREBASE_APP_ID=1:123456789012:web:abcdef123456
VITE_FIREBASE_MEASUREMENT_ID=G-XXXXXXXXXX
```

### Step 6: Restart Your Development Server
After updating `.env.local`:
1. Stop your dev server (Ctrl+C)
2. Restart it with: `npm run dev`

## ✅ What Was Fixed

1. **Added Firebase Environment Variables** to `.env.local` (you need to fill in the actual values)
2. **Removed Deprecated Meta Tag** (`apple-mobile-web-app-capable`) from `index.html`

## 📝 Other Notes

### MetaMask Error
The error "Failed to connect to MetaMask - MetaMask extension not found" is **expected** if:
- MetaMask browser extension is not installed
- You're testing on a device without MetaMask

This is not a code error - it's just the app detecting that MetaMask isn't available.

## 🔒 Security Note
- **Never commit `.env.local` to Git** - it's already in `.gitignore`
- Keep your Firebase API keys secure
- For production, use Firebase App Check for additional security

## Need Help?
If you don't have a Firebase project yet:
1. Go to https://console.firebase.google.com/
2. Click "Add project"
3. Follow the setup wizard
4. Enable Authentication and Firestore in the Firebase console
