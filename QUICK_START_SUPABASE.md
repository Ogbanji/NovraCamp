# 🚀 Quick Start: Move Novra to Supabase

## ✅ Build Fixed!
Your website now builds successfully with Supabase integration.

---

## 🎯 What You Want to Do
Move your entire Novra website from Firebase to Supabase.

---

## 📋 Quick Migration Steps

### Step 1: Deploy Supabase Backend (15 minutes)

```bash
# 1. Login to Supabase
supabase login

# 2. Link your project (get project ref from Supabase dashboard)
supabase link --project-ref YOUR_PROJECT_REF

# 3. Apply database schema
supabase db push

# 4. Deploy Edge Functions
supabase functions deploy

# 5. Set secrets (replace with your actual keys)
supabase secrets set CRYPTOPANIC_API_KEY=e0b803cff443b445d673eef890aede03d537430f
supabase secrets set X_CLIENT_ID=YOUR_X_CLIENT_ID
supabase secrets set X_CLIENT_SECRET=YOUR_X_CLIENT_SECRET
```

### Step 2: Update Environment Variables (2 minutes)

Edit `.env.local`:
```env
# Your Supabase credentials (get from Supabase Dashboard → Settings → API)
VITE_SUPABASE_URL=https://YOUR_PROJECT_REF.supabase.co
VITE_SUPABASE_ANON_KEY=YOUR_ANON_KEY
```

### Step 3: Build & Test (5 minutes)

```bash
# Build the project
npm run build

# Test locally
npm run preview
```

Visit: http://localhost:4173

### Step 4: Choose Your Hosting (10 minutes)

#### Option A: Vercel (Recommended - Easiest)
```bash
# Install Vercel
npm install -g vercel

# Deploy
vercel --prod
```
✅ Your site will be live at: `https://your-project.vercel.app`

#### Option B: Netlify
```bash
# Install Netlify
npm install -g netlify-cli

# Deploy
netlify deploy --prod --dir=dist
```
✅ Your site will be live at: `https://your-project.netlify.app`

#### Option C: Keep Firebase Hosting
```bash
# Deploy to Firebase (works with Supabase backend!)
npm run build
firebase deploy --only hosting
```
✅ Your site stays at: `https://novracamp.web.app`

---

## 🗄️ Migrate Your Data (Optional)

If you have existing users/data in Firebase:

```bash
# 1. Download Firebase service account key
# Firebase Console → Project Settings → Service Accounts → Generate New Private Key

# 2. Save as: firebase-service-account.json

# 3. Create .env file
echo "SUPABASE_URL=https://YOUR_PROJECT_REF.supabase.co" > .env
echo "SUPABASE_SERVICE_ROLE_KEY=YOUR_SERVICE_ROLE_KEY" >> .env

# 4. Run migration
node migrate-data.js
```

---

## 🎯 Current Status

✅ **What's Ready:**
- ✅ Supabase database schema created
- ✅ Edge Functions created
- ✅ Frontend code updated to use Supabase
- ✅ Build working successfully
- ✅ X/Twitter service integrated

⚠️ **What You Need to Do:**
1. Deploy Supabase backend (Step 1 above)
2. Update .env.local with your Supabase credentials
3. Choose hosting platform and deploy
4. Optionally migrate existing data

---

## 🌐 Your Current Website

**Live at**: https://novracamp.web.app (Firebase Hosting)

**Options:**
1. **Keep Firebase Hosting** - Just use Supabase for backend
2. **Move to Vercel** - Modern, fast, free hosting
3. **Move to Netlify** - Alternative free hosting

---

## 📊 What Changes

| Service | Before (Firebase) | After (Supabase) |
|---------|------------------|------------------|
| **Hosting** | Firebase Hosting | Your choice (Vercel/Netlify/Firebase) |
| **Auth** | Firebase Auth | ✅ Supabase Auth |
| **Database** | Firestore | ✅ PostgreSQL |
| **Functions** | Cloud Functions | ✅ Edge Functions |
| **URL** | novracamp.web.app | Your new domain |

---

## 🚀 Fastest Path to Migration

### Total Time: ~30 minutes

```bash
# 1. Deploy Supabase (5 min)
supabase login
supabase link --project-ref YOUR_PROJECT_REF
supabase db push
supabase functions deploy

# 2. Update .env.local (1 min)
# Add your VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY

# 3. Build (1 min)
npm run build

# 4. Deploy to Vercel (3 min)
npm install -g vercel
vercel --prod

# Done! Your site is live on Supabase! 🎉
```

---

## 🔑 Get Your Supabase Credentials

1. Go to: https://app.supabase.com
2. Select your project
3. Go to: Settings → API
4. Copy:
   - **Project URL** → `VITE_SUPABASE_URL`
   - **anon public** key → `VITE_SUPABASE_ANON_KEY`
   - **service_role** key → For migration script only

---

## 📞 Need Help?

- **Full Migration Guide**: [MIGRATE_TO_SUPABASE.md](./MIGRATE_TO_SUPABASE.md)
- **Deployment Guide**: [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md)
- **Data Migration**: [MIGRATION_GUIDE.md](./MIGRATION_GUIDE.md)

---

## ✅ Next Action

**Start here:**
```bash
# 1. Get your Supabase project ref from dashboard
# 2. Run these commands:
supabase login
supabase link --project-ref YOUR_PROJECT_REF
supabase db push
supabase functions deploy
```

Then update `.env.local` and deploy!

---

**🎉 You're ready to move to Supabase!**
