# 🚀 Novra Camp

A modern Web3 creator platform built with React, Vite, and Supabase.

## 🌐 Live Demo

**Website**: [https://novracamp.web.app](https://novracamp.web.app)

## ✨ Features

- 🔐 **Authentication** - Secure user authentication with Supabase
- 🐦 **X/Twitter Integration** - Connect and verify X/Twitter accounts
- 📊 **Admin Dashboard** - Comprehensive admin panel for managing tasks and users
- ✅ **Task Management** - Create, assign, and track tasks
- 📝 **Submission System** - Submit and review task completions
- 💰 **Points & Rewards** - Earn points for completing tasks
- 🔥 **Daily Streaks** - Track daily login streaks with bonus rewards
- 📰 **Crypto News** - Real-time cryptocurrency news integration
- 👛 **Wallet Connect** - Connect Web3 wallets
- 📈 **Analytics** - Track user engagement and performance

## 🛠️ Tech Stack

### Frontend
- **React** - UI framework
- **TypeScript** - Type safety
- **Vite** - Build tool
- **Tailwind CSS** - Styling
- **Shadcn/ui** - UI components
- **React Router** - Navigation
- **Lucide Icons** - Icon library

### Backend
- **Supabase** - Backend as a Service
  - PostgreSQL Database
  - Authentication
  - Edge Functions
  - Row Level Security (RLS)
- **Firebase** - Hosting & Legacy support
  - Firebase Hosting
  - Cloud Functions (legacy)

### Integrations
- **X/Twitter API** - Social authentication
- **CryptoPanic API** - Crypto news feed
- **Web3** - Wallet connections

## 📦 Installation

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Supabase account
- Firebase account (for hosting)

### Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/YOUR_USERNAME/novra-camp.git
   cd novra-camp
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Variables**
   
   Create `.env.local` file:
   ```env
   # Supabase
   VITE_SUPABASE_URL=your_supabase_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   
   # Firebase (optional - for hosting)
   VITE_FIREBASE_API_KEY=your_firebase_api_key
   VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
   VITE_FIREBASE_PROJECT_ID=your_project_id
   ```

4. **Setup Supabase**
   
   Run migrations:
   ```bash
   npx supabase link --project-ref YOUR_PROJECT_REF
   npx supabase db push
   ```

5. **Run development server**
   ```bash
   npm run dev
   ```

   Visit: http://localhost:5173

## 🚀 Deployment

### Build
```bash
npm run build
```

### Deploy to Firebase Hosting
```bash
firebase deploy --only hosting
```

### Deploy to Vercel
```bash
vercel --prod
```

### Deploy to Netlify
```bash
netlify deploy --prod --dir=dist
```

## 📁 Project Structure

```
novra-camp/
├── src/
│   ├── components/        # React components
│   │   ├── ui/           # Shadcn UI components
│   │   ├── AuthProvider.tsx
│   │   ├── AdminGuard.tsx
│   │   └── ...
│   ├── pages/            # Page components
│   │   ├── Home.tsx
│   │   ├── Auth.tsx
│   │   ├── Dashboard.tsx
│   │   ├── AdminDashboard.tsx
│   │   └── ...
│   ├── lib/              # Utilities
│   │   ├── supabase.ts   # Supabase client
│   │   ├── firebase.ts   # Firebase config
│   │   └── utils.ts
│   ├── services/         # API services
│   │   └── supabaseService.ts
│   └── App.tsx           # Main app component
├── supabase/
│   ├── migrations/       # Database migrations
│   └── functions/        # Edge functions
├── functions/            # Firebase functions (legacy)
├── public/              # Static assets
└── docs/                # Documentation

```

## 🗄️ Database Schema

### Main Tables
- **profiles** - User profiles with X/Twitter integration
- **admins** - Admin users
- **tasks** - Tasks created by admins
- **submissions** - Task submissions from creators
- **crypto_news** - Cached crypto news
- **x_connections** - X/Twitter account mappings

See `supabase/migrations/` for complete schema.

## 🔐 Security

- Row Level Security (RLS) enabled on all tables
- Environment variables for sensitive data
- Firebase service account keys excluded from git
- Secure authentication with Supabase Auth

## 📚 Documentation

- **[DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md)** - Complete deployment guide
- **[MIGRATE_TO_SUPABASE.md](./MIGRATE_TO_SUPABASE.md)** - Migration from Firebase
- **[QUICK_START_SUPABASE.md](./QUICK_START_SUPABASE.md)** - Quick start guide
- **[ADMIN_DASHBOARD_SETUP.md](./ADMIN_DASHBOARD_SETUP.md)** - Admin setup
- **[MIGRATION_GUIDE.md](./MIGRATION_GUIDE.md)** - Data migration

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Supabase](https://supabase.com) - Backend infrastructure
- [Firebase](https://firebase.google.com) - Hosting
- [Shadcn/ui](https://ui.shadcn.com) - UI components
- [CryptoPanic](https://cryptopanic.com) - Crypto news API
- [X/Twitter](https://developer.twitter.com) - Social integration

## 📧 Contact

- **Website**: [https://novracamp.web.app](https://novracamp.web.app)
- **GitHub**: [@YOUR_USERNAME](https://github.com/YOUR_USERNAME)

## 🎯 Roadmap

- [ ] Mobile app (React Native)
- [ ] NFT rewards system
- [ ] Advanced analytics dashboard
- [ ] Multi-language support
- [ ] Email notifications
- [ ] AI-powered task recommendations

---

**Built with ❤️ by the Novra Team**
