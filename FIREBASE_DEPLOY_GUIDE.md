# 🚀 FIREBASE DEPLOYMENT GUIDE

## ✅ What I've Done

I've integrated your custom Twitter OAuth 2.0 implementation directly into **Firebase Cloud Functions**!

1. **Updated `functions/index.js`**: Added robust OAuth 2.0 logic with PKCE and Firestore storage.
2. **Updated `firebase.json`**: Configured `/api/**` to route to your Cloud Functions.
3. **Created Deployment Script**: `deploy-firebase.bat` to handle everything.

---

## ⚡ HOW TO DEPLOY (2 Steps)

### Step 1: Run the Deployment Script

Double-click **`deploy-firebase.bat`** or run in terminal:
```bash
deploy-firebase.bat
```

This will:
- Set your Twitter credentials in Firebase config
- Build your React app
- Deploy everything to Firebase

### Step 2: Update Twitter Developer Portal (CRITICAL)

Since you are now deploying to production, you must update your callback URL:

1. Go to: https://developer.twitter.com/en/portal/dashboard
2. Settings → User authentication settings → Edit
3. **Update Callback URI** to:
   ```
   https://novra-camp.web.app/api/auth/twitter/callback
   ```
   *(Note: It's no longer localhost:3000!)*

4. **Update Website URL** to:
   ```
   https://novra-camp.web.app
   ```

---

## 🔄 Switching Between Local and Production

### For Local Development:
- **Callback**: `http://localhost:3000/api/auth/twitter/callback`
- **Frontend**: `http://localhost:5173`
- **Command**: `npm run dev` + `npm start` (in backend-twitter)

### For Production (Firebase):
- **Callback**: `https://novra-camp.web.app/api/auth/twitter/callback`
- **Frontend**: `https://novra-camp.web.app`
- **Command**: `deploy-firebase.bat`

**Tip**: You can add BOTH callback URLs in Twitter Developer Portal!

---

## 🧪 Testing Production

1. Open **https://novra-camp.web.app**
2. Click **"Connect with Twitter (OAuth 2.0)"**
3. It should redirect to Twitter and back successfully!

---

## 📝 Troubleshooting Deployment

If deployment fails:

**"Error: missing credentials"**
- Run `firebase login` first

**"Error: project not found"**
- Run `firebase use launchly-99a73`

**"Function failed to load"**
- Check logs: `firebase functions:log`

---

**Ready to deploy? Run `deploy-firebase.bat` now!** 🚀
