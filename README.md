# BetGenie Web Platform

**AI-Powered Betting Prediction Platform - Web Version**

🌐 Full-featured website for BetGenie betting predictions, accumulators, and community insights.

## 🎯 Features

- ✨ **AI Predictions** - Daily tips with confidence scores
- 🎲 **Accumulator Builder** - Interactive odds calculator
- 📊 **Dashboard** - User portfolio and betting history
- 👥 **Community** - Leaderboards and social features
- 💰 **Subscription Tiers** - Free, Premium, and Elite plans
- 📈 **Analytics** - Detailed betting statistics
- 🔐 **Authentication** - Secure login and registration
- 📱 **Responsive Design** - Works on all devices

## 🛠 Tech Stack

- **Framework:** Next.js 14
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Database:** PostgreSQL + Prisma ORM
- **Auth:** NextAuth.js
- **State:** Zustand
- **Charts:** Chart.js
- **Forms:** React Hook Form + Zod

## 📦 Project Structure

```
BetgenieWeb/
├── src/
│   ├── app/
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   ├── (auth)/
│   │   ├── (dashboard)/
│   │   ├── predictions/
│   │   ├── accumulators/
│   │   ├── community/
│   │   ├── admin/
│   │   └── api/
│   ├── components/
│   ├── lib/
│   ├── hooks/
│   ├── types/
│   └── styles/
├── prisma/
│   └── schema.prisma
├── public/
├── .env.example
└── package.json
```

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- PostgreSQL 14+
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone https://github.com/Frank56377/BetgenieWeb.git
cd BetgenieWeb
```

2. Install dependencies
```bash
npm install
```

3. Setup environment
```bash
cp .env.example .env.local
# Edit .env.local with your database URL and secrets
```

4. Setup database
```bash
npm run db:push
npm run db:seed
```

5. Start development server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## 🌐 Deployment to Namecheap

### Domain Setup
1. Register domain on Namecheap
2. Update DNS nameservers
3. Point to your Namecheap hosting

### Hosting Configuration
1. Access cPanel in Namecheap hosting
2. Install Node.js
3. Create Node.js app entry
4. Set environment variables
5. Deploy via Git or upload files

See `DEPLOYMENT.md` for detailed instructions.

## 📚 API Documentation

API endpoints are available at `/api/*`. See `API_DOCS.md` for full documentation.

## 🔐 Environment Variables

Required environment variables:
- `DATABASE_URL` - PostgreSQL connection string
- `NEXTAUTH_SECRET` - Secret key for authentication
- `NEXTAUTH_URL` - Your application URL
- `NEXT_PUBLIC_API_URL` - Public API endpoint

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## 📄 License

MIT License - see LICENSE file for details

## 📞 Support

For support, email support@betgenie.com or open an issue.

---

**Built with ❤️ for BetGenie**
