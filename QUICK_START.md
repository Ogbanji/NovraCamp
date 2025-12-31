# 🚀 Quick Start Guide - Twitter OAuth & Wallet Connect

## ⚡ Fast Setup (5 Minutes)

### Step 1: Configure Environment Variables

Edit `.env.local` and add your Twitter Client ID:

```env
VITE_TWITTER_CLIENT_ID=your_actual_client_id_here
VIT_TWITTER_REDIRECT_URI=http://localhost:5173/auth/twitter/callback
VITE_API_URL=http://localhost:5001/launchly-99a73/us-central1
```

### Step 2: Get Twitter API Credentials

1. Go to https://developer.twitter.com/en/portal/dashboard
2. Create a new app or use existing one
3. Navigate to **"User authentication settings"** → **"Set up"**
4. Configure OAuth 2.0:
   - Enable OAuth 2.0
   - Type: Web App
   - Callback URL: `http://localhost:5173/auth/twitter/callback`
   - App permissions: Read
5. Copy your **Client ID** to `.env.local`

### Step 3: Install Dependencies

```bash
npm install
```

### Step 4: Setup Firebase Functions

```bash
# Navigate to functions directory
cd functions

# Install dependencies
npm install

# Set Twitter credentials
firebase functions:config:set \
  twitter.client_id="YOUR_CLIENT_ID" \
  twitter.client_secret="YOUR_CLIENT_SECRET"

# Go back to root
cd ..
```

### Step 5: Run Development Servers

**Terminal 1 - Frontend:**
```bash
npm run dev
```

**Terminal 2 - Firebase Functions Emulator:**
```bash
firebase emulators:start --only functions
```

### Step 6: Test the Integration

1. Open http://localhost:5173
2. Navigate to Profile page
3. Click "Connect Twitter Account"
4. Authorize the app on Twitter
5. You'll be redirected back with your profile loaded!

---

## 📱 Features You Can Use

### Twitter Integration

**Profile Display:**
- Full name, username, bio
- Profile picture
- Verification badge
- Follower/following counts
- Tweet count
- Account creation date

**Followers Analytics:**
- Paginated follower list
- Smart follower detection (scores 60+)
- Follower metrics (followers, tweets, etc.)
- Search and filter capabilities

**Smart Follower Scoring:**
- Automatic quality scoring (0-100)
- Based on engagement, activity, verification
- Visual badges for high-quality followers

### Wallet Integration

**Supported Wallets:**
- ✅ MetaMask (EVM chains)
- ✅ Phantom (Solana)
- 🔜 WalletConnect (coming soon)
- 🔜 Tonkeeper (TON, coming soon)

**Features:**
- One-click connection
- Signature verification
- Multi-chain support
- Address display

---

## 🔧 Common Customizations

### Change Smart Follower Threshold

Edit `src/lib/twitterAuth.ts`:

```typescript
export function isSmartFollower(follower: TwitterUser): boolean {
    return calculateSmartFollowerScore(follower) >= 70; // Change from 60 to 70
}
```

### Modify Scoring Algorithm

Edit `calculateSmartFollowerScore()` in `src/lib/twitterAuth.ts`:

```typescript
// Example: Give more weight to verified users
if (follower.verified) {
    score += 30; // Changed from 20
}
```

### Add More Profile Fields

Edit the Twitter API call in `functions/index.js`:

```javascript
const url = 'https://api.twitter.com/2/users/me?user.fields=id,name,username,profile_image_url,description,verified,created_at,public_metrics,location,url';
// Added: location, url
```

---

## 🎨 UI Customization

### Change Twitter Button Style

Edit `src/pages/Profile.tsx`:

```tsx
<Button
    onClick={handleConnectTwitter}
    variant="outline" // Change to: "default", "ghost", "glow"
    size="lg" // Change to: "sm", "md", "lg"
>
    <Twitter className="h-4 w-4 mr-2" />
    Connect Twitter Account
</Button>
```

### Customize Smart Follower Badge

Edit `src/components/TwitterProfile.tsx`:

```tsx
<Badge 
    variant="outline" 
    className="text-orange-600 border-orange-600" // Change colors
>
    Smart
</Badge>
```

---

## 🐛 Troubleshooting

### Issue: "Client ID not configured"
**Fix:** Set `VITE_TWITTER_CLIENT_ID` in `.env.local`

### Issue: "Invalid redirect URI"
**Fix:** Ensure redirect URI in Twitter app settings matches exactly

### Issue: "Failed to fetch followers"
**Fix:** You need Twitter API Elevated access (apply at developer portal)

### Issue: Functions not working
**Fix:** 
```bash
# Check if emulator is running
firebase emulators:start --only functions

# Check functions logs
firebase functions:log
```

### Issue: CORS errors
**Fix:** Ensure both frontend and functions are running on correct ports

### Issue: MetaMask not detected
**Fix:** Install MetaMask browser extension

---

## 📊 Testing Smart Followers

To test the smart follower algorithm:

1. Connect your Twitter account
2. Load followers
3. Check console for scores:

```javascript
// In browser console
localStorage.getItem('twitter_access_token')
```

---

## 🚀 Deploy to Production

### 1. Update Environment Variables

`.env.local` (production):
```env
VITE_TWITTER_REDIRECT_URI=https://novra-camp.web.app/auth/twitter/callback
VITE_API_URL=https://us-central1-launchly-99a73.cloudfunctions.net
```

### 2. Update Twitter App Settings

Add production callback URL:
```
https://novra-camp.web.app/auth/twitter/callback
```

### 3. Deploy

```bash
# Build frontend
npm run build

# Deploy to Firebase Hosting
firebase deploy --only hosting

# Deploy backend functions
firebase deploy --only functions
```

### 4. Test Production

Visit https://novra-camp.web.app and test the full flow!

---

## 📚 Next Steps

1. **Request Twitter Elevated Access** for followers endpoint
2. **Add Token Refresh** logic for long-term sessions
3. **Implement Database Storage** for profiles in Firestore
4. **Add Analytics** to track user engagement
5. **Enable WalletConnect** for more wallet options

---

## 🆘 Need Help?

1. Check `TWITTER_OAUTH_SETUP.md` for detailed docs
2. Review browser console for errors
3. Check Firebase Functions logs: `firebase functions:log`
4. Ensure all environment variables are set

---

## ✅ Checklist

- [ ] Twitter Developer account created
- [ ] OAuth 2.0 app configured
- [ ] Client ID added to `.env.local`
- [ ] Firebase Functions configured
- [ ] Dependencies installed
- [ ] Emulators running
- [ ] Frontend running on localhost:5173
- [ ] Test Twitter OAuth flow
- [ ] Test wallet connection
- [ ] Request Twitter Elevated access (for production)

---

**🎉 You're all set! Enjoy your Twitter OAuth + Wallet Connect integration!**

For detailed documentation, see `TWITTER_OAUTH_SETUP.md`
