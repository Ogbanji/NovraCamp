# Novra Admin Dashboard - Complete Setup Guide

## 📋 Overview

This admin dashboard system provides a comprehensive solution for managing your Web3 campaign platform with:

- ✅ **Admin-only access control**
- ✅ **AI-powered task creation**
- ✅ **Submission review and approval**
- ✅ **Automatic point distribution**
- ✅ **Email notifications to admins**
- ✅ **Real-time statistics**
- ✅ **User management**

---

## 🔧 Firebase Configuration

### 1. Environment Variables

Add the following to your `.env.local` file:

```env
# Firebase Functions URL (after deployment)
VITE_FIREBASE_FUNCTIONS_URL=https://us-central1-YOUR-PROJECT-ID.cloudfunctions.net/api

# Your existing Firebase config variables
VITE_FIREBASE_API_KEY=...
VITE_FIREBASE_AUTH_DOMAIN=...
VITE_FIREBASE_PROJECT_ID=...
VITE_FIREBASE_STORAGE_BUCKET=...
VITE_FIREBASE_MESSAGING_SENDER_ID=...
VITE_FIREBASE_APP_ID=...
VITE_FIREBASE_MEASUREMENT_ID=...
```

### 2. Firebase Functions Configuration

Set up the required function configuration variables:

```bash
# OpenAI API Key (for AI-generated task descriptions)
firebase functions:config:set openai.api_key="YOUR_OPENAI_API_KEY"

# Email credentials (for admin notifications)
firebase functions:config:set email.user="your-email@gmail.com"
firebase functions:config:set email.pass="your-app-password"

# Twitter OAuth (already configured)
firebase functions:config:set twitter.client_id="YOUR_CLIENT_ID"
firebase functions:config:set twitter.client_secret="YOUR_CLIENT_SECRET"
```

**Note for Gmail:**
- Use an App Password, not your regular password
- Enable 2FA on your Google account
- Generate an App Password at: https://myaccount.google.com/apppasswords

---

## 📦 Installation

### 1. Install Frontend Dependencies

No additional dependencies needed - everything is already included in your package.json.

### 2. Install Backend Dependencies

```bash
cd functions
npm install
cd ..
```

---

## 🔐 Set Up Admin Users

### Method 1: Using Firestore Console

1. Go to Firebase Console → Firestore Database
2. Create a collection called `admins`
3. Add a document with the UID of your admin user:
   - Document ID: `<USER_UID>` (get this from Firebase Auth)
   - Fields:
     ```
     email: "admin@example.com"
     role: "admin"
     createdAt: <timestamp>
     ```

### Method 2: Using Firebase CLI (Recommended)

Create a helper script `scripts/add-admin.js`:

```javascript
const admin = require('firebase-admin');
const serviceAccount = require('../path-to-service-account-key.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

async function addAdmin(email) {
  try {
    // Get user by email
    const user = await admin.auth().getUserByEmail(email);
    
    // Add to admins collection
    await db.collection('admins').doc(user.uid).set({
      email: user.email,
      role: 'admin',
      createdAt: admin.firestore.FieldValue.serverTimestamp()
    });
    
    console.log(`✅ Admin added: ${email}`);
  } catch (error) {
    console.error('Error adding admin:', error);
  }
}

// Add your admin email
addAdmin('your-admin-email@example.com');
```

Run: `node scripts/add-admin.js`

---

## 🚀 Deployment

### 1. Deploy Firestore Rules

```bash
firebase deploy --only firestore:rules
```

### 2. Deploy Storage Rules

```bash
firebase deploy --only storage:rules
```

### 3. Deploy Cloud Functions

```bash
cd functions
npm install
cd ..
firebase deploy --only functions
```

### 4. Update Functions URL

After deployment, copy the Functions URL and update `.env.local`:

```env
VITE_FIREBASE_FUNCTIONS_URL=https://us-central1-YOUR-PROJECT-ID.cloudfunctions.net/api
```

### 5. Deploy Frontend

```bash
npm run build
firebase deploy --only hosting
```

---

## 📊 Firestore Database Structure

### Collections

#### `admins`
```typescript
{
  uid: string (document ID)
  email: string
  role: "admin"
  createdAt: Timestamp
}
```

#### `users`
```typescript
{
  uid: string (document ID)
  displayName?: string
  twitterHandle?: string
  email?: string
  walletAddress?: string
  points: number (default: 0)
  completedTasks: number (default: 0)
  createdAt: Timestamp
}
```

#### `tasks`
```typescript
{
  id: string (auto-generated)
  title: string
  description: string
  instructions?: string
  reward: number
  campaignId: string
  type: "social" | "wallet" | "referral" | "custom"
  status: "active" | "inactive"
  aiGenerated: boolean
  createdAt: Timestamp
  createdBy: string (admin UID)
  updatedAt: Timestamp
}
```

#### `taskSubmissions`
```typescript
{
  id: string (auto-generated)
  userId: string
  taskId: string
  walletAddress: string
  proofUrl?: string
  proofLink?: string
  proofImage?: string
  status: "pending" | "approved" | "rejected"
  reviewedAt?: Timestamp
  reviewedBy?: string (admin UID)
  reviewComment?: string
  createdAt: Timestamp
}
```

#### `campaigns`
```typescript
{
  id: string (auto-generated)
  name: string
  description: string
  startDate: Timestamp
  endDate: Timestamp
  status: "active" | "inactive" | "completed"
  createdAt: Timestamp
}
```

---

## 🎯 Usage Guide

### Accessing the Admin Dashboard

1. Log in with an admin account (email must be in `admins` collection)
2. Navigate to `/admin`
3. You'll see the dashboard with statistics and management tabs

### Creating Tasks

1. Go to **Tasks** tab
2. Click **Create Task**
3. Fill in:
   - Title (required)
   - Description (AI will enhance this)
   - Task Type (social, wallet, referral, custom)
   - Reward Points (required)
   - Campaign ID (optional, defaults to "default")
4. Click **Create Task** - AI will generate optimized description and instructions
5. Email notification sent to all admins

### Reviewing Submissions

1. Go to **Submissions** tab
2. View pending submissions with:
   - User details
   - Task information
   - Proof links/images
3. Click **Approve** or **Reject**
4. Add optional comment
5. Upon approval:
   - Points automatically added to user profile
   - Email notification sent to admins
   - User can see updated points

### Managing Users

1. Go to **Users** tab
2. View all users sorted by points
3. See user statistics:
   - Total points earned
   - Tasks completed
   - Wallet address
   - Twitter handle

---

## 🤖 AI Features

### Task Description Generation

When creating a task, AI automatically:
- Enhances the basic description
- Generates clear step-by-step instructions
- Optimizes for engagement

**Requirements:**
- OpenAI API key configured
- Uses GPT-4 model

**Fallback:**
If AI is unavailable, uses the basic description provided.

### Email Summary Generation

AI generates professional email summaries for:
- Task created
- Task completed (submission)
- Task approved

**Template includes:**
- Event type
- User information
- Task details
- Points awarded
- Timestamp

---

## 📧 Email Notifications

Admins receive emails for:

1. **Task Created**
   - Task title and details
   - Reward amount
   - Campaign ID

2. **Submission Received**
   - User information
   - Task details
   - Proof links

3. **Submission Approved**
   - User information
   - Points awarded
   - Approval timestamp

---

## 🔒 Security

### Firestore Rules

- Only admins can:
  - Create, edit, delete tasks
  - Approve/reject submissions
  - View all user data
  
- Users can:
  - Read tasks
  - Create their own submissions
  - Update their own profile

### Storage Rules

- Users can upload proof images to their own submission folder
- Admins can access all files
- Profile images publicly readable

### Function Security

- All admin endpoints protected by `verifyAdmin` middleware
- Validates Firebase Auth token
- Checks `admins` collection for authorization

---

## 🧪 Testing

### Test Admin Access

1. Create test admin user in Firestore
2. Log in with that account
3. Navigate to `/admin`
4. Should see dashboard (non-admins redirected to home)

### Test Task Creation

1. Create a task with AI
2. Check Firestore `tasks` collection
3. Verify AI-generated description
4. Check admin email for notification

### Test Submission Flow

1. As regular user, submit a task
2. As admin, view in Submissions tab
3. Approve the submission
4. Check user's points updated
5. Verify email notification received

---

## 📱 Frontend Components

### Key Components

- `AdminGuard.tsx` - Protects admin routes
- `AdminDashboard.tsx` - Main dashboard page
- `StatsOverview.tsx` - Statistics cards
- `TaskManager.tsx` - Task CRUD operations
- `SubmissionManager.tsx` - Review submissions
- `UserManager.tsx` - View user leaderboard

### UI Features

- Modern gradient design
- Responsive layout
- Real-time updates
- Loading states
- Toast notifications

---

## 🐛 Troubleshooting

### "Admin access required" error

**Solution:**
- Ensure user's UID is in `admins` collection
- Check Firestore rules are deployed
- Verify user is logged in

### AI features not working

**Solution:**
- Check OpenAI API key is configured:
  ```bash
  firebase functions:config:get
  ```
- Ensure you have API credits
- Check function logs for errors

### Email notifications not sending

**Solution:**
- Verify email credentials configured
- Check Gmail App Password (not regular password)
- Enable "Less secure app access" if needed
- Check function logs for SMTP errors

### Functions returning 401/403

**Solution:**
- Ensure Firebase Auth token is valid
- Check admin verification in Firestore
- Redeploy functions if recently updated

---

## 📈 Monitoring

### View Function Logs

```bash
firebase functions:log
```

### View Specific Function

```bash
firebase functions:log --only api
```

### Real-time Logs

```bash
firebase functions:log --follow
```

---

## 🔄 Updates and Maintenance

### Updating Task Structure

1. Modify Firestore rules if needed
2. Update TypeScript interfaces
3. Redeploy functions and frontend

### Adding New Admin Endpoints

1. Add route in `functions/index.js`
2. Use `verifyAdmin` middleware
3. Redeploy functions

### Customizing Email Templates

Edit `getDefaultEmailTemplate()` in `functions/index.js`

---

## 💡 Best Practices

1. **Always test in emulator first:**
   ```bash
   firebase emulators:start
   ```

2. **Use environment variables** for sensitive data

3. **Monitor function usage** to avoid unexpected costs

4. **Regular backups** of Firestore data

5. **Review security rules** periodically

6. **Keep dependencies updated**

---

## 📞 Support

For issues or questions:
1. Check Firebase Console logs
2. Review Firestore security rules
3. Verify environment variables
4. Check function configuration

---

## 🎉 You're All Set!

Your Novra Admin Dashboard is ready to use. Navigate to `/admin` to get started!

**Next Steps:**
1. Add your first admin user
2. Create sample tasks
3. Configure email notifications
4. Set up OpenAI for AI features
5. Deploy to production

Happy managing! 🚀
