# 🚀 Complete Migration: Firebase → Supabase

## Overview
This guide will help you completely migrate your Novra Camp website from Firebase to Supabase.

---

## 📋 Current Status

✅ **What You Have:**
- Firebase Hosting: https://novracamp.web.app
- Firebase Authentication
- Firebase Firestore Database
- Firebase Cloud Functions

✅ **What You're Moving To:**
- Supabase Hosting (via Vercel/Netlify)
- Supabase Authentication
- Supabase PostgreSQL Database
- Supabase Edge Functions

---

## 🎯 Migration Strategy

### Phase 1: Setup Supabase (30 minutes)
### Phase 2: Migrate Database (1-2 hours)
### Phase 3: Update Frontend Code (2-3 hours)
### Phase 4: Deploy to New Hosting (1 hour)
### Phase 5: Test & Verify (1 hour)

**Total Time: ~6-8 hours**

---

## 📦 Phase 1: Setup Supabase

### Step 1.1: Apply Database Migrations

```bash
# Navigate to your project
cd "c:\Users\acer\Desktop\novra Camp"

# Login to Supabase (if not already)
supabase login

# Link to your Supabase project
supabase link --project-ref YOUR_PROJECT_REF

# Apply all migrations
supabase db push
```

### Step 1.2: Deploy Edge Functions

```bash
# Deploy all functions
supabase functions deploy verify-twitter
supabase functions deploy fetch-crypto-news
supabase functions deploy track-login
supabase functions deploy admin-api
```

### Step 1.3: Set Environment Secrets

```bash
# X/Twitter OAuth
supabase secrets set TWITTER_CONSUMER_KEY=YOUR_KEY
supabase secrets set TWITTER_CONSUMER_SECRET=YOUR_SECRET
supabase secrets set TWITTER_ACCESS_TOKEN=YOUR_TOKEN
supabase secrets set TWITTER_ACCESS_TOKEN_SECRET=YOUR_TOKEN_SECRET

# X OAuth2
supabase secrets set X_CLIENT_ID=YOUR_CLIENT_ID
supabase secrets set X_CLIENT_SECRET=YOUR_CLIENT_SECRET
supabase secrets set X_CALLBACK_URL=https://YOUR_DOMAIN.com/auth/callback

# CryptoPanic API
supabase secrets set CRYPTOPANIC_API_KEY=e0b803cff443b445d673eef890aede03d537430f

# App URL (will update after deploying)
supabase secrets set APP_FRONTEND_URL=https://YOUR_DOMAIN.com
```

### Step 1.4: Create Admin Users

```sql
-- Run in Supabase SQL Editor
-- First, sign up as a user in your app, then get your user ID
-- Then run this to make yourself an admin:

INSERT INTO public.admins (id, email)
VALUES ('YOUR_USER_ID_FROM_AUTH', 'your-email@example.com')
ON CONFLICT (id) DO NOTHING;
```

---

## 🗄️ Phase 2: Migrate Database

### Option A: Automated Migration (Recommended)

```bash
# Install dependencies
npm install firebase-admin @supabase/supabase-js dotenv

# Download Firebase service account key
# Go to: Firebase Console → Project Settings → Service Accounts
# Click "Generate New Private Key"
# Save as: firebase-service-account.json

# Create .env file with Supabase credentials
echo "SUPABASE_URL=https://YOUR_PROJECT_REF.supabase.co" > .env
echo "SUPABASE_SERVICE_ROLE_KEY=YOUR_SERVICE_ROLE_KEY" >> .env

# Run migration script
node migrate-data.js
```

### Option B: Manual Migration

See [MIGRATION_GUIDE.md](./MIGRATION_GUIDE.md) for detailed manual migration steps.

---

## 💻 Phase 3: Update Frontend Code

### Step 3.1: Update Environment Variables

Create/update `.env.local`:

```env
# Remove Firebase variables (comment out or delete)
# VITE_FIREBASE_API_KEY=...
# VITE_FIREBASE_AUTH_DOMAIN=...
# etc.

# Add Supabase variables
VITE_SUPABASE_URL=https://YOUR_PROJECT_REF.supabase.co
VITE_SUPABASE_ANON_KEY=YOUR_ANON_KEY
```

### Step 3.2: Update Authentication Code

The app already uses Supabase! Check these files:
- ✅ `src/lib/supabase.ts` - Supabase client
- ✅ `src/components/AuthProvider.tsx` - Supabase auth provider
- ✅ `src/pages/Auth.tsx` - Supabase authentication
- ✅ `src/lib/x-service.ts` - X/Twitter integration (just created)

### Step 3.3: Verify All Services Use Supabase

Check that these services are using Supabase:
- ✅ `src/services/supabaseService.ts`
- ✅ Authentication flows
- ✅ Database queries
- ✅ File uploads (if any)

### Step 3.4: Test Build

```bash
# Build the project
npm run build

# If successful, you'll see:
# ✓ built in XXXms
```

---

## 🌐 Phase 4: Deploy to New Hosting

You have several options for hosting:

### Option A: Vercel (Recommended - Free)

1. **Install Vercel CLI**
   ```bash
   npm install -g vercel
   ```

2. **Login to Vercel**
   ```bash
   vercel login
   ```

3. **Deploy**
   ```bash
   vercel --prod
   ```

4. **Your site will be live at**: `https://your-project.vercel.app`

5. **Add Custom Domain** (optional)
   - Go to Vercel Dashboard → Your Project → Settings → Domains
   - Add `novracamp.com` or your custom domain

### Option B: Netlify (Free)

1. **Install Netlify CLI**
   ```bash
   npm install -g netlify-cli
   ```

2. **Login to Netlify**
   ```bash
   netlify login
   ```

3. **Deploy**
   ```bash
   netlify deploy --prod --dir=dist
   ```

4. **Your site will be live at**: `https://your-project.netlify.app`

### Option C: Keep Firebase Hosting

You can keep using Firebase Hosting even with Supabase backend:

```bash
# Just deploy as usual
npm run build
firebase deploy --only hosting
```

Your site stays at: `https://novracamp.web.app`

---

## 🧪 Phase 5: Test & Verify

### Test Checklist

```bash
# 1. Test Authentication
- [ ] Sign up new user
- [ ] Login existing user
- [ ] Logout
- [ ] Password reset

# 2. Test X/Twitter Connection
- [ ] Connect X account
- [ ] View X profile data
- [ ] Disconnect X account

# 3. Test Tasks (Admin)
- [ ] Create new task
- [ ] Edit task
- [ ] Delete task
- [ ] View all tasks

# 4. Test Submissions (Creator)
- [ ] Submit task
- [ ] View my submissions
- [ ] Check submission status

# 5. Test Admin Dashboard
- [ ] View statistics
- [ ] Approve submission
- [ ] Reject submission
- [ ] View all users

# 6. Test Other Features
- [ ] Crypto news display
- [ ] Daily streak tracking
- [ ] Profile updates
- [ ] Wallet connection
```

### Verify Database

```sql
-- Run in Supabase SQL Editor

-- Check data counts
SELECT 'profiles' as table_name, COUNT(*) as count FROM profiles
UNION ALL
SELECT 'tasks', COUNT(*) FROM tasks
UNION ALL
SELECT 'submissions', COUNT(*) FROM submissions
UNION ALL
SELECT 'admins', COUNT(*) FROM admins;

-- Check sample data
SELECT * FROM profiles LIMIT 5;
SELECT * FROM tasks WHERE status = 'active' LIMIT 5;
```

---

## 🔄 Update URLs

After deploying to new hosting, update these:

### 1. Supabase Edge Function Secrets
```bash
# Update with your new domain
supabase secrets set APP_FRONTEND_URL=https://your-new-domain.com
supabase secrets set X_CALLBACK_URL=https://your-new-domain.com/auth/callback
```

### 2. X/Twitter Developer Portal
- Go to: https://developer.twitter.com/en/portal/projects-and-apps
- Update callback URL to: `https://your-new-domain.com/auth/callback`

### 3. Update .env.local
```env
VITE_SUPABASE_URL=https://YOUR_PROJECT_REF.supabase.co
VITE_SUPABASE_ANON_KEY=YOUR_ANON_KEY
```

---

## 📊 Migration Comparison

| Aspect | Firebase | Supabase | Status |
|--------|----------|----------|--------|
| **Hosting** | Firebase Hosting | Vercel/Netlify | ⚠️ Choose new host |
| **Auth** | Firebase Auth | Supabase Auth | ✅ Ready |
| **Database** | Firestore | PostgreSQL | ✅ Schema ready |
| **Functions** | Cloud Functions | Edge Functions | ✅ Deployed |
| **Storage** | Firebase Storage | Supabase Storage | ⚠️ If needed |
| **Domain** | novracamp.web.app | Custom domain | ⚠️ Configure |

---

## 💰 Cost Comparison

### Firebase (Current)
- **Free Tier**: Limited
- **Spark Plan**: $0/month (limited)
- **Blaze Plan**: Pay as you go

### Supabase (New)
- **Free Tier**: 
  - 500MB database
  - 1GB file storage
  - 50,000 monthly active users
  - 2GB bandwidth
- **Pro Plan**: $25/month (if needed)

### Hosting
- **Vercel**: Free for personal projects
- **Netlify**: Free for personal projects
- **Firebase Hosting**: Free (can keep)

---

## 🚨 Important Notes

### Before Migration
1. ⚠️ **Backup all Firebase data**
2. ⚠️ **Test on staging first** (if possible)
3. ⚠️ **Notify users** of potential downtime
4. ⚠️ **Keep Firebase running** as backup for 1 week

### During Migration
1. ✅ Migrate during low-traffic hours
2. ✅ Monitor error logs
3. ✅ Have rollback plan ready

### After Migration
1. ✅ Monitor for 24-48 hours
2. ✅ Check all features work
3. ✅ Verify data integrity
4. ✅ Update documentation

---

## 🔧 Troubleshooting

### Build Fails
```bash
# Clear cache and rebuild
rm -rf node_modules dist
npm install
npm run build
```

### Database Connection Issues
```bash
# Verify Supabase URL and keys
echo $VITE_SUPABASE_URL
echo $VITE_SUPABASE_ANON_KEY
```

### Edge Functions Not Working
```bash
# Check function logs
supabase functions logs verify-twitter --follow
```

### Authentication Fails
- Check Supabase Dashboard → Authentication → URL Configuration
- Verify redirect URLs are correct
- Check email templates are configured

---

## ✅ Post-Migration Cleanup

### After 1 Week of Stable Operation

1. **Disable Firebase Services** (optional)
   ```bash
   # Stop Firebase functions
   firebase functions:delete api
   
   # Disable Firestore (in console)
   # Keep Firebase Hosting if you want
   ```

2. **Update Documentation**
   - Update README.md
   - Update API documentation
   - Update deployment guides

3. **Archive Firebase Data**
   ```bash
   # Export final backup
   firebase firestore:export ./firebase-final-backup
   ```

---

## 🎉 Success Criteria

Migration is successful when:
- ✅ All users can authenticate
- ✅ All features work correctly
- ✅ Data is intact and accessible
- ✅ No errors in logs
- ✅ Performance is acceptable
- ✅ X/Twitter OAuth works
- ✅ Admin dashboard functional
- ✅ Crypto news updating

---

## 📞 Quick Commands Reference

```bash
# Build and test locally
npm run build
npm run preview

# Deploy to Vercel
vercel --prod

# Deploy to Netlify
netlify deploy --prod --dir=dist

# Deploy to Firebase (if keeping)
firebase deploy --only hosting

# Check Supabase functions
supabase functions list
supabase functions logs FUNCTION_NAME

# Database operations
supabase db push
supabase db diff
supabase db reset
```

---

## 🚀 Ready to Migrate?

Follow these phases in order:
1. ✅ Phase 1: Setup Supabase
2. ✅ Phase 2: Migrate Database
3. ✅ Phase 3: Update Frontend
4. ✅ Phase 4: Deploy to Hosting
5. ✅ Phase 5: Test & Verify

**Good luck with your migration! 🎉**

---

**Need help?** Check:
- [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md)
- [MIGRATION_GUIDE.md](./MIGRATION_GUIDE.md)
- [Supabase Documentation](https://supabase.com/docs)
