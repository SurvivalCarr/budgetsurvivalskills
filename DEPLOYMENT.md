# Deployment Guide for budgetsurvivalskills.com

## Step 1: Push Code to GitHub

Run these commands in your terminal to push the complete project to your GitHub repository:

```bash
# Add your GitHub repository as remote
git remote add origin https://github.com/SurvivalCarr/budgetsurvivalskills.git

# Add all files to git
git add .

# Commit all changes
git commit -m "Initial deployment of Budget Survival Skills platform"

# Push to GitHub
git push -u origin main
```

## Step 2: Set up Cloudflare Pages

1. **Create Cloudflare Account**
   - Go to cloudflare.com and sign up
   - Add your domain budgetsurvivalskills.com
   - Update nameservers to Cloudflare's (they'll provide these)

2. **Create Pages Project**
   - In Cloudflare dashboard, go to Pages
   - Click "Create a project"
   - Connect to GitHub and select your repository
   - Project name: `budgetsurvivalskills`
   - Build command: `npm run build`
   - Build output directory: `dist`

## Step 3: Configure Environment Variables

In Cloudflare Pages settings, add these environment variables:

```
DATABASE_URL=your_neon_postgres_url
SENDGRID_API_KEY=your_sendgrid_api_key
NODE_ENV=production
```

## Step 4: Set up Database (Neon PostgreSQL)

1. Go to neon.tech and create free account
2. Create new project: "Budget Survival Skills"
3. Copy the connection string
4. Add to Cloudflare environment variables

## Step 5: Configure Custom Domain

1. In Cloudflare Pages project settings
2. Go to "Custom domains"
3. Add: budgetsurvivalskills.com
4. DNS will automatically configure
5. SSL certificate will be issued automatically

## Step 6: GitHub Secrets (for deployment)

In your GitHub repository settings, add these secrets:

1. Go to Settings > Secrets and variables > Actions
2. Add these repository secrets:
   - `CLOUDFLARE_API_TOKEN`: From Cloudflare dashboard
   - `CLOUDFLARE_ACCOUNT_ID`: From Cloudflare dashboard
   - `DATABASE_URL`: Your Neon PostgreSQL URL
   - `SENDGRID_API_KEY`: Your SendGrid API key

## Deployment Features

Your site includes:
- 104+ SEO-optimized articles
- Region-specific affiliate marketing
- Email signup with PDF delivery
- Financial calculators
- Multi-region theming (US, UK, AU, CA)
- Contact form (sends to survivalcarr@gmail.com)

## Post-Deployment

After successful deployment:
1. Test all regions (US, UK, AU, CA)
2. Verify email signup works
3. Test contact form
4. Check affiliate links display correctly
5. Confirm SEO pages load properly

## Support

For deployment issues: survivalcarr@gmail.com

## Expected Timeline

- GitHub push: 2 minutes
- Cloudflare setup: 10 minutes  
- Domain propagation: 1-24 hours
- First deployment: 5-10 minutes