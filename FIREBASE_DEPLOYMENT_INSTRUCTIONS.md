# Firebase Deployment Instructions

## 🚀 Deploy All Changes to Firebase

Your frontend is built and ready! Before deploying, you need to configure Twitter API credentials.

### Step 1: Set Twitter Credentials in Firebase Functions

Run this command to configure your Twitter API credentials:

```bash
firebase functions:config:set twitter.client_id="YOUR_TWITTER_CLIENT_ID" twitter.client_secret="YOUR_TWITTER_CLIENT_SECRET"
```

**Where to get these:**
1. Go to https://developer.twitter.com/en/portal/dashboard
2. Select your app
3. Go to "Keys and tokens" tab
4. Copy your **OAuth 2.0 Client ID** and **Client Secret**

### Step 2: Deploy to Firebase

Once credentials are set, deploy everything:

```bash
# Deploy both hosting and functions
firebase deploy

# Or deploy separately:
firebase deploy --only hosting
firebase deploy --only functions
```

### Step 3: Update Production Environment Variables

After deployment, update your production redirect URI in Twitter Developer Portal:

**Add this callback URL:**
```
https://novra-camp.web.app/auth/twitter/callback
```

### Step 4: Test Your Deployment

1. Visit https://novra-camp.web.app
2. Navigate to your profile
3. Click "Connect Twitter Account"
4. Authorize the app
5. View your Twitter profile and followers!

## 📋 Deployment Checklist

- [ ] Twitter Developer App created
- [ ] OAuth 2.0 Client ID obtained
- [ ] OAuth 2.0 Client Secret obtained
- [ ] Firebase Functions config set with credentials
- [ ] Production callback URL added to Twitter app settings
- [ ] Frontend built (`npm run build`) ✅ DONE
- [ ] Functions dependencies installed ✅ DONE
- [ ] Firebase deployed
- [ ] Production URL tested

## ⚠️ Important Notes

1. **Twitter Elevated Access Required** - For production use of the followers endpoint, you need to apply for Elevated access at the Twitter Developer Portal

2. **Environment Variables** - Make sure your `.env.local` has production values:
   ```env
   VITE_TWITTER_REDIRECT_URI=https://novra-camp.web.app/auth/twitter/callback
   VITE_API_URL=https://us-central1-launchly-99a73.cloudfunctions.net
   ```

3. **Rebuild After Env Changes** - If you change `.env.local`, run `npm run build` again

## 🆘 Troubleshooting

**Issue: "Configuration not set"**
- Solution: Run the `firebase functions:config:set` command above

**Issue: "Invalid redirect URI"**
- Solution: Ensure the callback URL in Twitter app settings exactly matches your Firebase Hosting URL

**Issue: Functions deployment fails**
- Solution: Check that all dependencies are installed in the functions folder
- Run: `cd functions && npm install && cd ..`

**Issue: CORS errors**
- Solution: CORS is configured in `functions/index.js` to allow all origins in development
- For production, update the origin to your specific domain

## 📊 What's Being Deployed

### Hosting (Frontend)
- ✅ React application with Twitter OAuth
- ✅ Wallet Connect integration
- ✅ Twitter Profile display
- ✅ Smart Follower analytics
- ✅ Updated UI components

### Functions (Backend API)
- ✅ Twitter OAuth token exchange
- ✅ Profile fetching endpoint
- ✅ Followers API endpoint
- ✅ Wallet verification endpoints
- ✅ Security and error handling

---

**Ready to deploy!** Run the commands above to push all changes to Firebase.
