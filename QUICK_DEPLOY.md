# 🚀 Quick Deployment Commands

## Firebase Deployment

### Deploy Firestore Rules Only
```bash
firebase deploy --only firestore:rules
```

### Deploy Functions Only
```bash
firebase deploy --only functions
```

### Deploy Everything
```bash
firebase deploy
```

### Set Environment Variables
```bash
# X/Twitter OAuth
firebase functions:config:set x.client_id="YOUR_X_CLIENT_ID"
firebase functions:config:set x.client_secret="YOUR_X_CLIENT_SECRET"
firebase functions:config:set x.callback_url="https://us-central1-YOUR_PROJECT.cloudfunctions.net/api/auth/twitter/callback"

# CryptoPanic API
firebase functions:config:set cryptopanic.key="e0b803cff443b445d673eef890aede03d537430f"

# App URL
firebase functions:config:set app.frontend_url="https://novracamp.web.app"

# Redeploy functions after config changes
firebase deploy --only functions
```

---

## Supabase Deployment

### Run All Migrations
```bash
supabase db push
```

### Deploy All Edge Functions
```bash
supabase functions deploy
```

### Deploy Specific Function
```bash
supabase functions deploy verify-twitter
supabase functions deploy fetch-crypto-news
supabase functions deploy track-login
supabase functions deploy admin-api
```

### Set Secrets
```bash
# X/Twitter API v1.1 (for verify-twitter function)
supabase secrets set TWITTER_CONSUMER_KEY=YOUR_KEY
supabase secrets set TWITTER_CONSUMER_SECRET=YOUR_SECRET
supabase secrets set TWITTER_ACCESS_TOKEN=YOUR_TOKEN
supabase secrets set TWITTER_ACCESS_TOKEN_SECRET=YOUR_TOKEN_SECRET

# X OAuth2
supabase secrets set X_CLIENT_ID=YOUR_CLIENT_ID
supabase secrets set X_CLIENT_SECRET=YOUR_CLIENT_SECRET
supabase secrets set X_CALLBACK_URL=YOUR_CALLBACK_URL

# CryptoPanic
supabase secrets set CRYPTOPANIC_API_KEY=e0b803cff443b445d673eef890aede03d537430f

# App URL
supabase secrets set APP_FRONTEND_URL=https://novracamp.web.app
```

### View Function Logs
```bash
supabase functions logs verify-twitter
supabase functions logs fetch-crypto-news --follow
```

---

## Testing Locally

### Firebase Emulators
```bash
firebase emulators:start
```

### Supabase Local Development
```bash
supabase start
supabase functions serve
```

---

## Create Admin User (Supabase)

```sql
-- Run in Supabase SQL Editor
INSERT INTO public.admins (id, email)
VALUES ('YOUR_USER_UUID', 'admin@example.com')
ON CONFLICT (id) DO NOTHING;
```

---

## Setup Cron Job (Supabase)

In Supabase Dashboard → Database → Cron Jobs:

**Name**: fetch-crypto-news  
**Schedule**: `0 */2 * * *` (every 2 hours)  
**SQL**:
```sql
SELECT net.http_post(
  url := 'https://YOUR_PROJECT_REF.supabase.co/functions/v1/fetch-crypto-news',
  headers := jsonb_build_object(
    'Authorization', 'Bearer YOUR_SERVICE_ROLE_KEY',
    'Content-Type', 'application/json'
  )
);
```

---

## Verify Deployment

### Firebase
```bash
# Check function logs
firebase functions:log

# Test health endpoint
curl https://us-central1-YOUR_PROJECT.cloudfunctions.net/api/health
```

### Supabase
```bash
# Test function
curl -X POST https://YOUR_PROJECT_REF.supabase.co/functions/v1/fetch-crypto-news \
  -H "Authorization: Bearer YOUR_ANON_KEY"

# Check database
supabase db diff
```

---

## Rollback (if needed)

### Firebase
```bash
# Rollback to previous function version
firebase functions:delete FUNCTION_NAME
firebase deploy --only functions
```

### Supabase
```bash
# Rollback migration
supabase migration down

# Redeploy previous function version
supabase functions deploy FUNCTION_NAME
```

---

## Common Issues

### Firebase: "Node version not supported"
```bash
# Update Node.js to 18+
nvm install 18
nvm use 18
```

### Supabase: "RLS policy blocking query"
```sql
-- Temporarily disable RLS for testing (NOT for production!)
ALTER TABLE table_name DISABLE ROW LEVEL SECURITY;
```

### Both: CORS errors
- Check CORS headers in functions
- Verify allowed origins
- Test with Postman/curl first

---

## 📋 Pre-Deployment Checklist

- [ ] All environment variables set
- [ ] Migrations tested locally
- [ ] Functions tested locally
- [ ] Admin users created
- [ ] Backup current data
- [ ] Review security rules/policies
- [ ] Update frontend .env file

---

## 🎯 One-Command Deploy (Both Platforms)

```bash
# Deploy Firebase
firebase deploy --only firestore:rules,functions

# Deploy Supabase
supabase db push && supabase functions deploy

# Done! 🎉
```
