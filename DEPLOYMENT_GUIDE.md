# 🚀 Firebase & Supabase Deployment Guide

## Overview
This guide covers deploying all changes to both Firebase and Supabase platforms.

---

## 📋 Prerequisites

### Firebase
- Firebase CLI installed: `npm install -g firebase-tools`
- Logged in: `firebase login`
- Project initialized: `firebase init`

### Supabase
- Supabase CLI installed: `npm install -g supabase`
- Logged in: `supabase login`
- Project linked: `supabase link --project-ref YOUR_PROJECT_REF`

---

## 🔥 Firebase Deployment

### 1. Deploy Firestore Rules
```bash
firebase deploy --only firestore:rules
```

### 2. Deploy Firebase Functions
```bash
cd functions
npm install
cd ..
firebase deploy --only functions
```

### 3. Deploy Firebase Hosting (if needed)
```bash
npm run build
firebase deploy --only hosting
```

### 4. Set Firebase Environment Variables
```bash
# X/Twitter OAuth
firebase functions:config:set x.client_id="YOUR_X_CLIENT_ID"
firebase functions:config:set x.client_secret="YOUR_X_CLIENT_SECRET"
firebase functions:config:set x.callback_url="YOUR_CALLBACK_URL"

# CryptoPanic API
firebase functions:config:set cryptopanic.key="e0b803cff443b445d673eef890aede03d537430f"

# Email (optional)
firebase functions:config:set email.user="YOUR_EMAIL"
firebase functions:config:set email.pass="YOUR_EMAIL_PASSWORD"

# OpenAI (optional)
firebase functions:config:set openai.api_key="YOUR_OPENAI_API_KEY"

# App Frontend URL
firebase functions:config:set app.frontend_url="https://novracamp.web.app"
```

### 5. Verify Deployment
```bash
firebase functions:log
```

---

## 🌊 Supabase Deployment

### 1. Run Database Migrations
```bash
# Apply all migrations
supabase db push

# Or apply specific migration
supabase migration up
```

### 2. Deploy Edge Functions
```bash
# Deploy all functions
supabase functions deploy

# Or deploy specific functions
supabase functions deploy verify-twitter
supabase functions deploy fetch-crypto-news
supabase functions deploy track-login
supabase functions deploy admin-api
```

### 3. Set Supabase Secrets
```bash
# X/Twitter OAuth
supabase secrets set TWITTER_CONSUMER_KEY=YOUR_CONSUMER_KEY
supabase secrets set TWITTER_CONSUMER_SECRET=YOUR_CONSUMER_SECRET
supabase secrets set TWITTER_ACCESS_TOKEN=YOUR_ACCESS_TOKEN
supabase secrets set TWITTER_ACCESS_TOKEN_SECRET=YOUR_ACCESS_TOKEN_SECRET

# X OAuth2
supabase secrets set X_CLIENT_ID=YOUR_X_CLIENT_ID
supabase secrets set X_CLIENT_SECRET=YOUR_X_CLIENT_SECRET
supabase secrets set X_CALLBACK_URL=YOUR_CALLBACK_URL

# CryptoPanic API
supabase secrets set CRYPTOPANIC_API_KEY=YOUR_CRYPTOPANIC_API_KEY

# App Frontend URL
supabase secrets set APP_FRONTEND_URL=https://novracamp.web.app
```

### 4. Set Up Cron Jobs (for scheduled functions)
In your Supabase Dashboard:
1. Go to Database → Cron Jobs
2. Create a new cron job:
   - **Name**: `fetch-crypto-news`
   - **Schedule**: `0 */2 * * *` (every 2 hours)
   - **SQL**: 
   ```sql
   SELECT net.http_post(
     url := 'https://YOUR_PROJECT_REF.supabase.co/functions/v1/fetch-crypto-news',
     headers := '{"Authorization": "Bearer YOUR_SERVICE_ROLE_KEY"}'::jsonb
   );
   ```

### 5. Enable Row Level Security
All tables should have RLS enabled (already done in migrations). Verify in Supabase Dashboard:
- Go to Database → Tables
- Check that RLS is enabled for all tables

### 6. Create Admin Users
```sql
-- In Supabase SQL Editor
INSERT INTO public.admins (id, email)
VALUES ('YOUR_USER_ID', 'admin@example.com')
ON CONFLICT (id) DO NOTHING;
```

### 7. Verify Deployment
```bash
# Test edge functions
curl -X POST https://YOUR_PROJECT_REF.supabase.co/functions/v1/fetch-crypto-news \
  -H "Authorization: Bearer YOUR_ANON_KEY"

# Check logs
supabase functions logs verify-twitter
supabase functions logs fetch-crypto-news
```

---

## 🔄 Data Migration (Firebase → Supabase)

### Option 1: Manual Migration Script
Create a migration script to copy data from Firebase to Supabase:

```javascript
// migrate-data.js
const admin = require('firebase-admin');
const { createClient } = require('@supabase/supabase-js');

// Initialize Firebase
admin.initializeApp();
const db = admin.firestore();

// Initialize Supabase
const supabase = createClient(
  'YOUR_SUPABASE_URL',
  'YOUR_SERVICE_ROLE_KEY'
);

async function migrateUsers() {
  const usersSnapshot = await db.collection('users').get();
  const users = usersSnapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  }));

  for (const user of users) {
    await supabase.from('profiles').upsert({
      id: user.id,
      email: user.email,
      full_name: user.displayName,
      x_id: user.x_id,
      x_username: user.x_username,
      // ... map other fields
    });
  }
}

async function migrateTasks() {
  const tasksSnapshot = await db.collection('tasks').get();
  // Similar migration logic
}

// Run migrations
(async () => {
  await migrateUsers();
  await migrateTasks();
  console.log('Migration complete!');
})();
```

### Option 2: Export/Import
1. Export Firebase data:
   ```bash
   firebase firestore:export ./firestore-export
   ```

2. Transform and import to Supabase using custom script

---

## 🧪 Testing

### Test Firebase Functions
```bash
# Local testing
firebase emulators:start

# Test endpoints
curl http://localhost:5001/YOUR_PROJECT/us-central1/api/health
```

### Test Supabase Functions
```bash
# Local testing
supabase functions serve

# Test endpoints
curl http://localhost:54321/functions/v1/verify-twitter
```

---

## 📊 Monitoring

### Firebase
- Console: https://console.firebase.google.com
- Functions logs: `firebase functions:log`
- Firestore usage: Check Firebase Console

### Supabase
- Dashboard: https://app.supabase.com
- Function logs: `supabase functions logs FUNCTION_NAME`
- Database metrics: Check Supabase Dashboard

---

## 🔐 Security Checklist

- [ ] Firestore rules deployed and tested
- [ ] Supabase RLS policies enabled on all tables
- [ ] Environment variables/secrets set correctly
- [ ] API keys secured (not in code)
- [ ] CORS configured properly
- [ ] Admin users created
- [ ] Test user access controls
- [ ] Verify OAuth flows work

---

## 🚨 Troubleshooting

### Firebase Issues
- **Functions not deploying**: Check Node.js version (should be 18+)
- **CORS errors**: Ensure CORS is configured in functions
- **Auth errors**: Verify Firebase config in frontend

### Supabase Issues
- **RLS blocking queries**: Check policies match your use case
- **Edge function errors**: Check logs with `supabase functions logs`
- **Migration errors**: Run migrations one at a time

---

## 📝 Post-Deployment

1. **Update Frontend Environment Variables**
   ```env
   VITE_SUPABASE_URL=https://YOUR_PROJECT_REF.supabase.co
   VITE_SUPABASE_ANON_KEY=YOUR_ANON_KEY
   VITE_FIREBASE_API_KEY=YOUR_FIREBASE_API_KEY
   # ... other vars
   ```

2. **Test All Features**
   - [ ] User authentication
   - [ ] X/Twitter connection
   - [ ] Task creation (admin)
   - [ ] Task submission (creator)
   - [ ] Crypto news display
   - [ ] Daily streaks
   - [ ] Admin dashboard

3. **Monitor for 24 hours**
   - Check error logs
   - Monitor API usage
   - Verify cron jobs running

---

## 🎯 Quick Deploy Commands

### Deploy Everything (Firebase)
```bash
npm run build && firebase deploy
```

### Deploy Everything (Supabase)
```bash
supabase db push && supabase functions deploy
```

### Deploy Both Platforms
```bash
# Firebase
firebase deploy --only firestore:rules,functions

# Supabase
supabase db push && supabase functions deploy
```

---

## 📞 Support

If you encounter issues:
1. Check the logs first
2. Review the documentation
3. Check GitHub issues
4. Contact support

**Firebase Support**: https://firebase.google.com/support
**Supabase Support**: https://supabase.com/support
