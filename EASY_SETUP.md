# Easy Local Setup - No PostgreSQL Required!

## ⚡ Quick Start (5 Minutes)

### 1. Clone Repository
```bash
git clone https://github.com/Frank56377/Emperor PicksWeb.git
cd Emperor PicksWeb
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Create Environment File
```bash
cp .env.example .env.local
```

### 4. Edit `.env.local`

Replace the content with:
```
# Use SQLite (no database server needed!)
DATABASE_URL="file:./prisma/dev.db"

# Authentication
NEXTAUTH_SECRET="your-super-secret-key-minimum-32-characters-here!!"
NEXTAUTH_URL="http://localhost:3000"

# API
NEXT_PUBLIC_API_URL="http://localhost:3000/api"
```

**That's it!** No PostgreSQL, no Docker, no passwords needed.

### 5. Setup Database
```bash
npm run db:push
```

You'll see:
```
✔ Your database has been successfully initialized!
```

### 6. Start Development Server
```bash
npm run dev
```

Open browser: **http://localhost:3000**

---

## ✅ What You Just Did

- ✅ Created a local SQLite database (file-based, no server)
- ✅ Synced your database schema
- ✅ Started the development server
- ✅ Ready to test the app!

---

## 🧪 Test the Application

### Create Test Account
1. Go to **http://localhost:3000**
2. Click **"Sign Up"**
3. Fill in details:
   - Name: John Doe
   - Email: test@example.com
   - Password: Test123!
4. Click Sign Up

### Explore Pages
- ✅ Dashboard
- ✅ Predictions
- ✅ Accumulators
- ✅ Community

---

## 🛠️ Useful Commands

```bash
# Start dev server
npm run dev

# View database in browser GUI
npx prisma studio

# Reset database (delete all data)
npx prisma migrate reset

# Build for production
npm run build
```

---

## ❓ Still Having Issues?

### "npm install" taking forever?
```bash
# Clear cache and retry
npm cache clean --force
npm install
```

### "npm: command not found"
- Node.js not installed properly
- Download from: https://nodejs.org/
- Restart terminal after installing

### "Cannot read file .env.local"
- Make sure you're in the `Emperor PicksWeb` folder
- Check that `.env.local` file exists
- Run: `ls -la` (Mac/Linux) or `dir` (Windows) to see files

### Still not working?
1. Share the exact error message
2. Tell me your operating system (Windows/Mac/Linux)
3. Show output of: `node --version` and `npm --version`

---

## 📁 Your Database

SQLite creates a file at: `prisma/dev.db`

To view data in GUI:
```bash
npx prisma studio
```
This opens a browser interface to see all your data!

---

## 🎉 You're All Set!

Your Emperor Picks app is running locally with **zero database setup needed**!

**Next Steps:**
1. Test all pages
2. Explore the database with `npx prisma studio`
3. When ready to deploy, upgrade to PostgreSQL

**Questions?** Just ask! 💬
