# Local Development Setup Guide

## Prerequisites
- Node.js 18+ installed
- PostgreSQL 14+ installed and running
- Git installed

## Step-by-Step Setup

### 1. Clone the Repository
```bash
git clone https://github.com/Frank56377/BetgenieWeb.git
cd BetgenieWeb
```

### 2. Install Dependencies
```bash
npm install
```
This installs all required packages from package.json.

### 3. Setup PostgreSQL Database

#### Option A: Using Docker (Easiest)
```bash
# Pull and run PostgreSQL
docker run --name betgenie-db \
  -e POSTGRES_USER=betgenie \
  -e POSTGRES_PASSWORD=betgenie123 \
  -e POSTGRES_DB=betgenie_web \
  -p 5432:5432 \
  -d postgres:14
```

#### Option B: Manual PostgreSQL Installation
1. Install PostgreSQL from https://www.postgresql.org/download/
2. Open pgAdmin or psql terminal
3. Create database:
```sql
CREATE DATABASE betgenie_web;
CREATE USER betgenie WITH PASSWORD 'betgenie123';
ALTER ROLE betgenie SET client_encoding TO 'utf8';
ALTER ROLE betgenie SET default_transaction_isolation TO 'read committed';
ALTER ROLE betgenie SET default_transaction_deferrable TO on;
ALTER ROLE betgenie SET default_transaction_read_only TO off;
GRANT ALL PRIVILEGES ON DATABASE betgenie_web TO betgenie;
```

### 4. Environment Variables
```bash
# Copy example env file
cp .env.example .env.local
```

Edit `.env.local` with your settings:
```
# Database
DATABASE_URL="postgresql://betgenie:betgenie123@localhost:5432/betgenie_web"

# Authentication
NEXTAUTH_SECRET="your-super-secret-key-minimum-32-characters-here!!"
NEXTAUTH_URL="http://localhost:3000"

# API
NEXT_PUBLIC_API_URL="http://localhost:3000/api"
```

### 5. Setup Database Schema
```bash
# Create tables from Prisma schema
npm run db:push
```

You'll see output like:
```
✔ Your database has been successfully initialized!
```

### 6. Seed Database (Optional)
```bash
# Add demo data
npm run db:seed
```

### 7. Start Development Server
```bash
npm run dev
```

You should see:
```
> next dev

  ▲ Next.js 14.0.0
  - Local:        http://localhost:3000
  - Environments: .env.local
```

### 8. Open in Browser
Visit: **http://localhost:3000**

---

## Testing the Application

### Create a Test Account
1. Click "Sign Up" on homepage
2. Enter test credentials:
   - Name: John Doe
   - Email: john@test.com
   - Password: Test123!

### Test Features
- ✅ Login with your account
- ✅ View Dashboard with stats
- ✅ Check Predictions page
- ✅ Build Accumulators
- ✅ Browse Community

---

## Troubleshooting

### Error: "Cannot find module 'next'"
```bash
# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install
```

### Error: "ECONNREFUSED 127.0.0.1:5432"
PostgreSQL is not running. Start it:
```bash
# macOS
brew services start postgresql

# Windows
net start PostgreSQL-x64-14

# Linux
sudo service postgresql start

# Or with Docker
docker start betgenie-db
```

### Error: "Database does not exist"
```bash
# Push schema again
npm run db:push
```

### Error: "NEXTAUTH_SECRET is not set"
Make sure `.env.local` has `NEXTAUTH_SECRET` set with 32+ characters.

### Port 3000 Already in Use
```bash
# Run on different port
npm run dev -- -p 3001
# Visit http://localhost:3001
```

### Database Connection Issues
Verify connection string in `.env.local`:
```
DATABASE_URL="postgresql://USERNAME:PASSWORD@localhost:5432/DATABASE_NAME"
```

---

## Useful Commands

```bash
# Start dev server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Type checking
npm run type-check

# Lint code
npm run lint

# Database migrations
npm run db:migrate

# Reset database
npx prisma migrate reset
```

---

## Project Structure

```
BetgenieWeb/
├── src/
│   ├── app/                    # Next.js pages & layouts
│   │   ├── (auth)/             # Auth pages
│   │   ├── dashboard/          # Dashboard
│   │   ├── predictions/        # Predictions
│   │   ├── accumulators/       # Accumulators
│   │   ├── community/          # Community
│   │   └── api/                # API routes (to be created)
│   ├── components/             # Reusable components
│   ├── lib/                    # Utilities & database
│   ├── types/                  # TypeScript types
│   └── styles/                 # Global styles
├── prisma/
│   ├── schema.prisma           # Database schema
│   └── seed.js                 # Demo data
├── public/                     # Static files
├── .env.example                # Example env variables
└── package.json                # Dependencies
```

---

## Next Steps

1. **Run locally** using the steps above
2. **Create test accounts** and explore all pages
3. **Check database** using Prisma Studio:
   ```bash
   npx prisma studio
   ```
4. **Build API routes** for backend connectivity
5. **Deploy to Namecheap** when ready

---

## Need More Help?

- Check Prisma docs: https://www.prisma.io/docs/
- Next.js docs: https://nextjs.org/docs
- PostgreSQL docs: https://www.postgresql.org/docs/

**Your local setup is complete!** 🎉
