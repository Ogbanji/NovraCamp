# 🎯 Novra Admin Dashboard

> **Complete Admin System for Web3 Campaign Management**

A full-featured, production-ready admin dashboard for managing your Novra Web3 campaign platform with AI-powered task creation, automated workflows, and comprehensive user management.

![Admin Dashboard](https://img.shields.io/badge/Status-Production%20Ready-success)
![Firebase](https://img.shields.io/badge/Firebase-v12-orange)
![React](https://img.shields.io/badge/React-v18-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-v5-blue)

---

## 🌟 Features

### 🔐 **Security & Access Control**
- Admin-only authentication via Firebase Auth
- Firestore security rules enforcement
- Protected API endpoints with middleware
- Route guards for frontend protection

### 📋 **Task Management**
- Create tasks with AI-enhanced descriptions
- Edit and delete tasks
- Multiple task types: Social, Wallet, Referral, Custom
- Campaign assignment
- Real-time task list

### 👥 **User Management**
- View all registered users
- Leaderboard sorted by points
- User statistics and activity tracking
- Wallet address display
- Twitter integration

### 📬 **Submission Review**
- View pending submissions with proof
- Approve/reject with automatic point distribution
- View proof images and links
- Review comments and feedback
- Email notifications on actions

### 🤖 **AI Integration**
- GPT-4 powered task description generation
- Automatic instruction creation
- AI-generated email summaries
- Smart fallback mechanisms

### 📧 **Email Notifications**
- Automated admin notifications
- Task creation alerts
- Submission notifications
- Approval confirmations
- Professional HTML templates

### 📊 **Analytics Dashboard**
- Real-time statistics
- Task metrics
- User engagement data
- Submission tracking

---

## 🚀 Quick Start

### 1. Install Dependencies
```bash
cd functions
npm install
```

### 2. Configure Firebase
```bash
# OpenAI API Key
firebase functions:config:set openai.api_key="YOUR_KEY"

# Email Configuration
firebase functions:config:set email.user="your@email.com"
firebase functions:config:set email.pass="app-password"
```

### 3. Deploy
```bash
firebase deploy --only firestore:rules,storage:rules,functions
```

### 4. Add Admin User
```bash
node scripts/add-admin.js add admin@example.com
```

### 5. Access Dashboard
```
http://localhost:5173/admin (development)
https://novra-camp.web.app/admin (production)
```

📖 **Full Guide:** [QUICK_START_ADMIN.md](./QUICK_START_ADMIN.md)

---

## 📚 Documentation

| Document | Description |
|----------|-------------|
| [Quick Start Guide](./QUICK_START_ADMIN.md) | Get up and running in 15 minutes |
| [Complete Setup](./ADMIN_DASHBOARD_SETUP.md) | Detailed configuration and deployment |
| [API Reference](./ADMIN_API_REFERENCE.md) | Complete API documentation |
| [Implementation Details](./ADMIN_IMPLEMENTATION.md) | Technical architecture and features |

---

## 🏗️ Architecture

```
┌─────────────────────────────────────────────────────────┐
│                   Admin Dashboard UI                     │
│  (React + TypeScript + Tailwind + ShadCN)               │
└───────────────────┬─────────────────────────────────────┘
                    │
                    │ HTTPS + Firebase Auth Token
                    │
┌───────────────────▼─────────────────────────────────────┐
│              Cloud Functions (Express API)               │
│  • Admin Verification Middleware                         │
│  • Task CRUD Operations                                  │
│  • Submission Review                                     │
│  • AI Integration (OpenAI)                               │
│  • Email Notifications (Nodemailer)                      │
└───────────────────┬─────────────────────────────────────┘
                    │
        ┌───────────┼───────────┐
        │           │           │
┌───────▼──┐  ┌────▼────┐  ┌──▼──────┐
│ Firestore│  │ Storage │  │ OpenAI  │
│  - admins│  │ - proofs│  │ GPT-4   │
│  - tasks │  │ - images│  └─────────┘
│  - users │  └─────────┘
│  - subs  │
└──────────┘
```

---

## 📊 Database Schema

### Collections

#### `admins`
```typescript
{
  uid: string           // Document ID
  email: string
  role: "admin"
  createdAt: Timestamp
}
```

#### `tasks`
```typescript
{
  title: string
  description: string
  instructions: string
  reward: number
  campaignId: string
  type: "social" | "wallet" | "referral" | "custom"
  status: "active" | "inactive"
  aiGenerated: boolean
  createdAt: Timestamp
  createdBy: string
}
```

#### `taskSubmissions`
```typescript
{
  userId: string
  taskId: string
  walletAddress: string
  proofUrl: string
  proofImage: string
  status: "pending" | "approved" | "rejected"
  reviewedBy: string
  reviewComment: string
  createdAt: Timestamp
}
```

Full schema: [ADMIN_IMPLEMENTATION.md](./ADMIN_IMPLEMENTATION.md#-database-schema)

---

## 🔌 API Endpoints

### Admin Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/admin/stats` | Dashboard statistics |
| `POST` | `/api/admin/tasks` | Create task (AI-powered) |
| `PUT` | `/api/admin/tasks/:id` | Update task |
| `DELETE` | `/api/admin/tasks/:id` | Delete task |
| `GET` | `/api/admin/submissions` | Get submissions (filtered) |
| `POST` | `/api/admin/submissions/:id/approve` | Approve + award points |
| `POST` | `/api/admin/submissions/:id/reject` | Reject submission |

**Authentication:** All endpoints require `Authorization: Bearer <FIREBASE_TOKEN>`

Full API docs: [ADMIN_API_REFERENCE.md](./ADMIN_API_REFERENCE.md)

---

## 🛠️ Tech Stack

### Frontend
- **React 18** - UI library
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **ShadCN UI** - Component library
- **React Router** - Routing
- **Lucide Icons** - Icons

### Backend
- **Firebase Cloud Functions** - Serverless backend
- **Express.js** - API framework
- **Firebase Admin SDK** - Server-side Firebase
- **OpenAI API** - AI integration
- **Nodemailer** - Email sending

### Database & Storage
- **Firestore** - NoSQL database
- **Firebase Storage** - File storage
- **Firebase Auth** - Authentication

---

## 📸 Screenshots

### Dashboard Overview
```
┌─────────────────────────────────────────────────────────┐
│  📊 Novra Admin Dashboard                               │
├─────────────────────────────────────────────────────────┤
│  ┌──────┐  ┌──────┐  ┌──────┐  ┌──────┐               │
│  │ 24   │  │ 156  │  │ 12   │  │ 45   │               │
│  │Tasks │  │Users │  │Pend. │  │Appr. │               │
│  └──────┘  └──────┘  └──────┘  └──────┘               │
│                                                         │
│  [ Tasks ] [ Submissions ] [ Users ]                   │
│                                                         │
│  ┌─────────────────────────────────────────────┐      │
│  │ ✅ Follow us on Twitter   100 pts  [Edit]  │      │
│  │ 🤖 AI-enhanced description...              │      │
│  └─────────────────────────────────────────────┘      │
└─────────────────────────────────────────────────────────┘
```

---

## 🔧 Configuration

### Environment Variables

Required in `.env.local`:
```env
VITE_FIREBASE_FUNCTIONS_URL=https://us-central1-PROJECT-ID.cloudfunctions.net/api
VITE_FIREBASE_API_KEY=...
VITE_FIREBASE_AUTH_DOMAIN=...
VITE_FIREBASE_PROJECT_ID=...
VITE_FIREBASE_STORAGE_BUCKET=...
VITE_FIREBASE_MESSAGING_SENDER_ID=...
VITE_FIREBASE_APP_ID=...
```

### Firebase Functions Config

```bash
firebase functions:config:set \
  openai.api_key="sk-..." \
  email.user="admin@example.com" \
  email.pass="app-password" \
  twitter.client_id="..." \
  twitter.client_secret="..."
```

---

## 🧪 Testing

### Run Emulators

```bash
firebase emulators:start
```

### Test Admin Access

1. Add test admin: `node scripts/add-admin.js add test@admin.com`
2. Login with test account
3. Navigate to `/admin`
4. Should see dashboard

### Test Task Creation

1. Click "Create Task"
2. Fill in details
3. Submit
4. Check Firestore for new task
5. Check email for notification

---

## 📦 Utility Scripts

### Add Admin User
```bash
# Add admin
node scripts/add-admin.js add admin@example.com

# Remove admin
node scripts/add-admin.js remove user@example.com

# List admins
node scripts/add-admin.js list
```

### Seed Sample Data
```bash
# Seed campaigns and tasks
node scripts/seed-data.js

# Clear and reseed
node scripts/seed-data.js --clear
```

---

## 🐛 Troubleshooting

### Common Issues

**"Admin access required"**
```bash
# Verify user is in admins collection
node scripts/add-admin.js list

# Add if missing
node scripts/add-admin.js add your@email.com
```

**AI features not working**
```bash
# Check config
firebase functions:config:get

# Set API key
firebase functions:config:set openai.api_key="sk-..."
```

**Emails not sending**
```
Use Gmail App Password (not regular password)
Enable 2FA: https://myaccount.google.com/security
Generate App Password: https://myaccount.google.com/apppasswords
```

Full troubleshooting: [ADMIN_DASHBOARD_SETUP.md](./ADMIN_DASHBOARD_SETUP.md#-troubleshooting)

---

## 📈 Monitoring

### View Logs
```bash
# All logs
firebase functions:log

# Real-time
firebase functions:log --follow

# Specific function
firebase functions:log --only api
```

### Firebase Console
- **Functions:** https://console.firebase.google.com → Functions
- **Firestore:** https://console.firebase.google.com → Firestore
- **Storage:** https://console.firebase.google.com → Storage

---

## 🔒 Security

### Access Control
- ✅ Admin-only routes protected by `AdminGuard`
- ✅ API endpoints verified by `verifyAdmin` middleware
- ✅ Firestore rules enforce permissions
- ✅ Storage rules protect file uploads

### Best Practices
- Never commit service account keys
- Use environment variables for secrets
- Enable Firebase App Check in production
- Regular security audits
- Monitor function logs for suspicious activity

---

## 🚢 Deployment

### Development
```bash
npm run dev
# http://localhost:5173/admin
```

### Production
```bash
# Build
npm run build

# Deploy all
firebase deploy

# Deploy specific
firebase deploy --only functions
firebase deploy --only hosting
```

---

## 📞 Support

### Quick Links
- [Quick Start](./QUICK_START_ADMIN.md)
- [Full Setup](./ADMIN_DASHBOARD_SETUP.md)
- [API Docs](./ADMIN_API_REFERENCE.md)
- [Implementation](./ADMIN_IMPLEMENTATION.md)

### Scripts
- `scripts/add-admin.js` - Manage admins
- `scripts/seed-data.js` - Sample data

### Logs
```bash
firebase functions:log
```

---

## 🎯 Key Features Checklist

- [x] Admin authentication & authorization
- [x] AI-powered task creation
- [x] Submission review workflow
- [x] Automatic point distribution
- [x] Email notifications
- [x] User management & leaderboard
- [x] Real-time statistics
- [x] Security rules & middleware
- [x] Responsive modern UI
- [x] Comprehensive documentation

---

## 🎉 Ready to Go!

Your admin dashboard is **production-ready** and fully documented.

### Next Steps

1. **Deploy:** `firebase deploy`
2. **Add Admin:** `node scripts/add-admin.js add your@email.com`
3. **Access:** Visit `/admin` and start managing!

---

## 📝 License

This admin dashboard system is part of the Novra project.

---

## 🙏 Acknowledgments

Built with:
- Firebase for backend infrastructure
- OpenAI for AI capabilities
- React ecosystem for frontend
- ShadCN UI for beautiful components

---

**🚀 Start managing your Web3 campaign platform today!**

For detailed instructions, see [QUICK_START_ADMIN.md](./QUICK_START_ADMIN.md)
