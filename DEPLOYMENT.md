# Deployment Guide - Namecheap Hosting

## Prerequisites
- Active Namecheap hosting plan with Node.js support
- Domain registered (or transfer existing domain)
- GitHub account with this repository

## Step 1: Domain Configuration

### Option A: New Domain on Namecheap
1. Go to Namecheap.com
2. Search and register your domain
3. Add to your account

### Option B: Point Existing Domain
1. Log in to your domain registrar
2. Update nameservers to Namecheap:
   - `dns1.namecheap.com`
   - `dns2.namecheap.com`
   - `dns3.namecheap.com`
   - `dns4.namecheap.com`

## Step 2: Namecheap Hosting Setup

1. **Access cPanel**
   - Log in to Namecheap account
   - Find your hosting package
   - Click "Manage" → "cPanel Login"

2. **Install Node.js**
   - In cPanel, find "Setup Node.js App"
   - Click to create new application
   - Select Node.js version (18+)
   - Set Application Mode: Production

3. **Configure Application**
   - Application Root: `/home/username/public_html/Emperor Picks-web`
   - Application URL: `yourdomain.com`
   - Application Startup File: `npm start`
   - Port: Will be assigned automatically

## Step 3: Environment Variables

In cPanel, set environment variables:

```
NEXTAUTH_SECRET=your-very-secure-random-string-min-32-chars
NEXTAUTH_URL=https://yourdomain.com
NEXT_PUBLIC_API_URL=https://yourdomain.com/api
DATABASE_URL=postgresql://dbuser:password@localhost:5432/Emperor Picks_web
NODE_ENV=production
```

## Step 4: Database Setup

1. **Create PostgreSQL Database**
   - In cPanel, find "PostgreSQL Databases"
   - Create new database
   - Create user with password
   - Grant all privileges
   - Note the connection details

2. **Update DATABASE_URL**
   ```
   postgresql://dbuser:password@localhost:5432/Emperor Picks_web
   ```

## Step 5: Deploy Code

### Option A: Git Deployment (Recommended)
1. In cPanel, find "Git Version Control"
2. Create new repository
3. Clone this repository:
   ```
   https://github.com/Frank56377/Emperor PicksWeb.git
   ```
4. Pull changes to deploy

### Option B: FTP Upload
1. Download all files
2. Upload via FTP to your hosting
3. Run `npm install` in terminal

## Step 6: Build and Start

1. SSH into your server (via cPanel Terminal)
2. Navigate to your application directory
3. Run:
   ```bash
   npm install
   npm run build
   npm start
   ```

4. Application will start on assigned port
5. cPanel will automatically proxy requests

## Step 7: SSL Certificate

1. In cPanel, find "AutoSSL"
2. Check if certificate is auto-installed
3. If not, use "Let's Encrypt AutoSSL"
4. Verify HTTPS works: `https://yourdomain.com`

## Step 8: Database Migrations

```bash
# Run Prisma migrations
npm run db:push

# Seed database with demo data
npm run db:seed
```

## Troubleshooting

### Application Not Starting
- Check error logs in cPanel
- Verify Node.js version compatibility
- Check environment variables are set
- Run `npm install` to ensure dependencies

### Database Connection Error
- Verify DATABASE_URL is correct
- Check PostgreSQL is running
- Confirm database credentials
- Check firewall rules

### Port Already in Use
- Check other applications using the port
- Restart the Node.js application
- Try different port if needed

### SSL Certificate Issues
- Wait 24 hours for DNS propagation
- Manually trigger AutoSSL renewal
- Check domain DNS configuration

## Monitoring

1. **Error Logs**
   - Check cPanel error logs regularly
   - Monitor application performance

2. **Uptime Monitoring**
   - Set up external uptime monitor (UptimeRobot, etc.)
   - Configure alerts

3. **Database Backups**
   - Enable automatic backups in cPanel
   - Download regular manual backups

## Security Recommendations

1. ✅ Use strong passwords
2. ✅ Enable HTTPS (SSL/TLS)
3. ✅ Keep Node.js updated
4. ✅ Use strong NEXTAUTH_SECRET
5. ✅ Enable firewall rules
6. ✅ Regular security updates
7. ✅ Database encryption

## Support

- **Namecheap Support:** https://www.namecheap.com/support/
- **cPanel Documentation:** https://documentation.cpanel.net/
- **Next.js Deployment:** https://nextjs.org/docs/deployment

---

**Your Emperor Picks Web Platform is now live!** 🚀
