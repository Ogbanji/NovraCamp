# 🔄 Data Migration Guide: Firebase → Supabase

## Overview
This guide explains how to migrate your data from Firebase Firestore to Supabase PostgreSQL.

---

## ⚠️ Before You Start

### Prerequisites
1. ✅ Supabase project created and configured
2. ✅ All Supabase migrations applied (`supabase db push`)
3. ✅ Firebase service account key downloaded
4. ✅ Backup of all Firebase data
5. ✅ Node.js 18+ installed

### Important Notes
- ⚠️ **This will overwrite existing data in Supabase**
- ⚠️ **Always backup your data first**
- ⚠️ **Test on a staging environment first**
- ⚠️ **Migration is one-way (Firebase → Supabase)**

---

## 📋 Migration Options

### Option 1: Automated Script (Recommended)
Use the provided `migrate-data.js` script for automated migration.

### Option 2: Manual Export/Import
Export from Firebase and manually import to Supabase.

### Option 3: Dual Operation
Run both platforms in parallel without migration.

---

## 🚀 Option 1: Automated Migration

### Step 1: Setup

1. **Download Firebase Service Account Key**
   - Go to Firebase Console → Project Settings → Service Accounts
   - Click "Generate New Private Key"
   - Save as `firebase-service-account.json` in project root

2. **Create `.env` file**
   ```env
   SUPABASE_URL=https://YOUR_PROJECT_REF.supabase.co
   SUPABASE_SERVICE_ROLE_KEY=YOUR_SERVICE_ROLE_KEY
   ```

3. **Install Dependencies**
   ```bash
   npm install firebase-admin @supabase/supabase-js dotenv
   ```

### Step 2: Review Migration Script

Open `migrate-data.js` and review:
- Data transformations
- Field mappings
- Batch sizes
- Error handling

### Step 3: Test Migration (Dry Run)

```bash
# Optional: Modify script to log without inserting
node migrate-data.js --dry-run
```

### Step 4: Run Migration

```bash
# Uncomment the confirmation prompt in migrate-data.js
node migrate-data.js
```

When prompted, type `MIGRATE` to proceed.

### Step 5: Verify Migration

```sql
-- Run in Supabase SQL Editor

-- Check counts
SELECT 'profiles' as table_name, COUNT(*) as count FROM profiles
UNION ALL
SELECT 'admins', COUNT(*) FROM admins
UNION ALL
SELECT 'tasks', COUNT(*) FROM tasks
UNION ALL
SELECT 'submissions', COUNT(*) FROM submissions
UNION ALL
SELECT 'crypto_news', COUNT(*) FROM crypto_news
UNION ALL
SELECT 'x_connections', COUNT(*) FROM x_connections;

-- Sample data
SELECT * FROM profiles LIMIT 5;
SELECT * FROM tasks LIMIT 5;
SELECT * FROM submissions LIMIT 5;
```

---

## 📤 Option 2: Manual Export/Import

### Step 1: Export from Firebase

```bash
# Export all collections
firebase firestore:export ./firestore-backup

# Or use Firebase Console
# Firestore → Import/Export → Export
```

### Step 2: Transform Data

Create a transformation script:

```javascript
// transform-data.js
const fs = require('fs');

// Read Firebase export
const firebaseData = JSON.parse(fs.readFileSync('./firestore-backup/users.json'));

// Transform to Supabase format
const supabaseData = firebaseData.map(user => ({
  id: user.id,
  email: user.email,
  // ... transform fields
}));

// Write Supabase import file
fs.writeFileSync('./supabase-import/profiles.json', JSON.stringify(supabaseData));
```

### Step 3: Import to Supabase

```bash
# Using Supabase CLI
supabase db seed

# Or use SQL
psql -h db.YOUR_PROJECT_REF.supabase.co \
     -U postgres \
     -d postgres \
     -f import.sql
```

---

## 🔄 Option 3: Dual Operation (No Migration)

Run both Firebase and Supabase simultaneously:

### Advantages
- ✅ No downtime
- ✅ Gradual migration
- ✅ Easy rollback
- ✅ Test Supabase with real traffic

### Setup

1. **Keep Firebase Active**
   - Don't change existing Firebase code
   - Continue using Firebase for production

2. **Add Supabase Alongside**
   - New features use Supabase
   - Gradually migrate features one by one

3. **Sync Data (Optional)**
   ```javascript
   // Sync new users to both platforms
   async function createUser(userData) {
     // Create in Firebase
     await firebaseAdmin.auth().createUser(userData);
     
     // Also create in Supabase
     await supabase.auth.signUp(userData);
   }
   ```

---

## 🧪 Testing Migration

### Pre-Migration Tests

```bash
# 1. Count records in Firebase
firebase firestore:count users
firebase firestore:count tasks
firebase firestore:count taskSubmissions

# 2. Export sample data
firebase firestore:export ./test-export --collection users --limit 10
```

### Post-Migration Tests

```sql
-- 1. Verify counts match
SELECT COUNT(*) FROM profiles;

-- 2. Check for missing data
SELECT * FROM profiles WHERE email IS NULL;

-- 3. Verify relationships
SELECT 
  t.id,
  t.title,
  COUNT(s.id) as submission_count
FROM tasks t
LEFT JOIN submissions s ON s.task_id = t.id
GROUP BY t.id, t.title;

-- 4. Check X connections
SELECT 
  p.email,
  p.x_username,
  xc.x_id
FROM profiles p
LEFT JOIN x_connections xc ON xc.uid = p.id
WHERE p.x_id IS NOT NULL;
```

---

## 🔧 Troubleshooting

### Issue: "Foreign key constraint violation"
**Solution**: Migrate in correct order:
1. profiles (users)
2. admins
3. tasks
4. submissions
5. crypto_news
6. x_connections

### Issue: "Duplicate key error"
**Solution**: Use `upsert` instead of `insert`:
```javascript
await supabase.from('profiles').upsert(data, { onConflict: 'id' });
```

### Issue: "RLS policy blocking insert"
**Solution**: Use service role key, not anon key:
```javascript
const supabase = createClient(url, SERVICE_ROLE_KEY); // Not ANON_KEY
```

### Issue: "Timestamp conversion errors"
**Solution**: Convert Firestore timestamps:
```javascript
const date = firestoreTimestamp?.toDate?.() || new Date();
```

---

## 📊 Migration Checklist

### Before Migration
- [ ] Backup all Firebase data
- [ ] Test migration script on sample data
- [ ] Verify Supabase schema is correct
- [ ] Set up Supabase service role key
- [ ] Download Firebase service account key
- [ ] Notify users of potential downtime

### During Migration
- [ ] Put app in maintenance mode (optional)
- [ ] Run migration script
- [ ] Monitor for errors
- [ ] Verify data counts
- [ ] Test relationships

### After Migration
- [ ] Verify all data migrated
- [ ] Test authentication
- [ ] Test all features
- [ ] Update frontend to use Supabase
- [ ] Monitor for 24 hours
- [ ] Keep Firebase as backup (1 week)

---

## 🎯 Migration Strategies

### Strategy 1: Big Bang Migration
- Migrate everything at once
- Short downtime
- Higher risk

### Strategy 2: Gradual Migration
- Migrate one collection at a time
- Test after each migration
- Lower risk, longer timeline

### Strategy 3: Feature-by-Feature
- Migrate by feature, not collection
- Example: Migrate auth first, then tasks, etc.
- Allows testing each feature

---

## 📈 Performance Tips

### Batch Processing
```javascript
// Process in batches of 100
const batchSize = 100;
for (let i = 0; i < items.length; i += batchSize) {
  const batch = items.slice(i, i + batchSize);
  await Promise.all(batch.map(processItem));
}
```

### Rate Limiting
```javascript
// Add delay between batches
await new Promise(resolve => setTimeout(resolve, 100));
```

### Parallel Processing
```javascript
// Migrate multiple collections in parallel
await Promise.all([
  migrateUsers(),
  migrateCryptoNews(), // Independent of users
]);
```

---

## 🔐 Security Considerations

1. **Service Account Key**
   - Never commit to git
   - Store securely
   - Rotate after migration

2. **Service Role Key**
   - Only use for migration
   - Never expose to frontend
   - Store in environment variables

3. **Data Privacy**
   - Ensure compliance (GDPR, etc.)
   - Anonymize sensitive data if needed
   - Audit data access

---

## 📞 Support

If migration fails:
1. Check error logs
2. Verify data format
3. Test with smaller dataset
4. Review field mappings
5. Contact support if needed

---

## 🎉 Post-Migration

### Update Frontend
```javascript
// Old (Firebase)
import { db } from './firebase';
const users = await db.collection('users').get();

// New (Supabase)
import { supabase } from './supabase';
const { data: users } = await supabase.from('profiles').select();
```

### Update Environment Variables
```env
# Remove or comment out Firebase
# VITE_FIREBASE_API_KEY=...

# Use Supabase
VITE_SUPABASE_URL=https://YOUR_PROJECT_REF.supabase.co
VITE_SUPABASE_ANON_KEY=YOUR_ANON_KEY
```

### Monitor Performance
- Check query performance
- Monitor error rates
- Verify all features work
- Get user feedback

---

## ✅ Success Criteria

Migration is successful when:
- ✅ All data counts match
- ✅ All relationships intact
- ✅ Authentication works
- ✅ All features functional
- ✅ No errors in logs
- ✅ Users can access their data
- ✅ Performance acceptable

---

**Good luck with your migration! 🚀**
