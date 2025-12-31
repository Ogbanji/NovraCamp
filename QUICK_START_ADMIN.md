# Novra Admin Dashboard - Quick Start Guide

This guide will get your admin dashboard up and running in **15 minutes**.

---

## ⚡ Prerequisites

- Firebase project already set up ✅ (you have this)
- Node.js installed
- Firebase CLI installed (`npm install -g firebase-tools`)

---

## 🚀 Quick Setup (5 Steps)

### Step 1: Install Dependencies

```bash
# Install backend dependencies
cd functions
npm install
cd ..
```

### Step 2: Configure Firebase Functions

```bash
# Set OpenAI API key (get from https://platform.openai.com/api-keys)
firebase functions:config:set openai.api_key="sk-..."

# Set email credentials (Gmail App Password)
firebase functions:config:set email.user="your-email@gmail.com"
firebase functions:config:set email.pass="your-app-password"

# Verify configuration
firebase functions:config:get
```

**Gmail App Password Setup:**
1. Enable 2FA: https://myaccount.google.com/security
2. Generate App Password: https://myaccount.google.com/apppasswords
3. Use the 16-character password (no spaces)

### Step 3: Deploy Firebase

```bash
# Deploy everything at once
firebase deploy

# Or deploy individually
firebase deploy --only firestore:rules
firebase deploy --only storage:rules
firebase deploy --only functions
```

**Note the Functions URL** from the deployment output:
```
✔  functions[api(us-central1)]: Successful create operation.
Function URL: https://us-central1-PROJECT-ID.cloudfunctions.net/api
```

### Step 4: Update Environment Variables

Add to `.env.local`:

```env
VITE_FIREBASE_FUNCTIONS_URL=https://us-central1-YOUR-PROJECT-ID.cloudfunctions.net/api
```

### Step 5: Add Your First Admin

**Option A: Using Firebase Console**
1. Go to Firestore Database
2. Create collection: `admins`
3. Add document with your user UID:
   ```
   Document ID: YOUR_USER_UID
   Fields:
     email: "your@email.com"
     role: "admin"
     createdAt: [current timestamp]
   ```

**Option B: Using Script** (Recommended)
```bash
# First, download service account key from Firebase Console
# Project Settings > Service Accounts > Generate New Private Key
# Save as serviceAccountKey.json in project root

# Then run:
node scripts/add-admin.js add your@email.com
```

---

## ✅ Verify Installation

### 1. Run Locally

```bash
npm run dev
```

Visit: `http://localhost:5173/admin`

You should see the admin dashboard if you're logged in as an admin.

### 2. Test Features

**Create a Task:**
1. Go to Tasks tab
2. Click "Create Task"
3. Fill in details
4. Check your email for notification
5. Verify task appears in Firestore

**Review a Submission:**
1. Create a test submission (as regular user)
2. Go to Submissions tab (as admin)
3. Approve or reject
4. Check user points updated

---

## 🎯 Optional: Seed Sample Data

```bash
# Add sample campaigns and tasks
node scripts/seed-data.js

# Clear and reseed
node scripts/seed-data.js --clear
```

---

## 📦 Build for Production

```bash
# Build frontend
npm run build

# Deploy to Firebase Hosting
firebase deploy --only hosting
```

Visit: `https://novra-camp.web.app/admin`

---

## 🔧 Configuration Checklist

- [x] Firebase Functions deployed
- [x] Firestore rules deployed
- [x] Storage rules deployed
- [x] OpenAI API key configured
- [x] Email credentials configured
- [x] Functions URL in .env.local
- [x] At least one admin user added
- [x] Sample data seeded (optional)

---

## 📱 Access the Dashboard

### Local Development
```
http://localhost:5173/admin
```

### Production
```
https://novra-camp.web.app/admin
```

**Login Requirements:**
- User must be authenticated (Firebase Auth)
- User UID must be in `admins` collection
- Non-admins are redirected to home page

---

## 🎨 Dashboard Features

### Stats Overview
- Total tasks and active tasks
- Total registered users
- Pending submissions
- Approved submissions

### Task Management
- Create tasks (AI-enhanced)
- Edit existing tasks
- Delete tasks
- View all tasks with filters

### Submission Review
- View pending submissions
- See user details and proof
- Approve with automatic point distribution
- Reject with optional feedback
- Email notifications on approval

### User Management
- View all users
- See leaderboard by points
- View user stats (points, completed tasks)
- User wallet addresses

---

## 🤖 AI Features

### Task Creation
When you create a task, AI automatically:
- Enhances your description
- Generates step-by-step instructions
- Optimizes for clarity and engagement

**Example Input:**
```
Title: Follow on Twitter
Description: Follow us
```

**AI Output:**
```
Description: "Join our growing community by following our official 
Twitter account! Stay updated with the latest news, exclusive 
announcements, and special giveaways."

Instructions:
1. Visit twitter.com/NovraOfficial
2. Click the "Follow" button
3. Ensure you're following the account
4. Submit your Twitter handle below
```

### Email Notifications
AI generates professional email summaries for:
- New task created
- Task submitted by user
- Task approved

---

## 🐛 Common Issues

### "Admin access required"
- Check user is logged in
- Verify user UID in `admins` collection
- Clear browser cache and re-login

### AI features not working
- Check OpenAI API key: `firebase functions:config:get`
- Verify you have API credits
- Check function logs: `firebase functions:log`

### Email not sending
- Use Gmail App Password (not regular password)
- Check email config: `firebase functions:config:get`
- Verify 2FA is enabled
- Check spam folder

### Functions returning 404
- Verify Functions URL in .env.local
- Check functions deployed: `firebase functions:list`
- Ensure `/api` is included in URL

---

## 📚 Next Steps

1. **Customize Email Templates**
   - Edit `functions/index.js` → `getDefaultEmailTemplate()`

2. **Add More Task Types**
   - Extend the `type` field in task creation

3. **Implement Analytics**
   - Track task completion rates
   - Monitor user engagement

4. **Add Bulk Operations**
   - Approve multiple submissions
   - Delete multiple tasks

5. **Create Admin Roles**
   - Super admin vs regular admin
   - Different permission levels

---

## 📖 Full Documentation

- [Complete Setup Guide](./ADMIN_DASHBOARD_SETUP.md)
- [API Reference](./ADMIN_API_REFERENCE.md)

---

## 🎉 You're Ready!

Your admin dashboard is now fully functional. Log in and start managing your Web3 campaign!

**Quick Access:**
```bash
# Start dev server
npm run dev

# Open admin dashboard
open http://localhost:5173/admin
```

Happy managing! 🚀
