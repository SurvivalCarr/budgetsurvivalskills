# Budget Survival Skills

Live at: **https://budgetsurvivalskills.com**

A comprehensive financial blog platform delivering region-specific financial advice across the US, UK, Australia, and Canada with affiliate marketing and email systems.

## Features

- **Multi-Regional Content**: Tailored financial advice for US, UK, Australia, and Canada
- **40+ SEO-Optimized Posts**: Covering emergency funds, debt payoff, side hustles, and regional benefits
- **Email Signup System**: Region-specific PDF guides sent via SendGrid
- **Mobile-Responsive Design**: Optimized for all devices
- **Regional Filtering**: Content automatically filtered by user's selected region

## Tech Stack

- **Frontend**: React, TypeScript, TailwindCSS, Wouter
- **Backend**: Express.js, PostgreSQL, Drizzle ORM
- **Email**: SendGrid integration for PDF delivery
- **Deployment**: GitHub + Cloudflare Pages

## Quick Start

1. Clone the repository
2. Install dependencies: `npm install`
3. Set up environment variables (see below)
4. Run database migration: `npm run db:push`
5. Start development server: `npm run dev`

## Environment Variables

```bash
DATABASE_URL=your_postgresql_connection_string
SENDGRID_API_KEY=your_sendgrid_api_key
```

## Deployment

This project is configured for automatic deployment to Cloudflare Pages via GitHub Actions.

### GitHub Secrets Required

- `DATABASE_URL`: PostgreSQL connection string
- `SENDGRID_API_KEY`: SendGrid API key for email functionality
- `CLOUDFLARE_API_TOKEN`: Cloudflare API token
- `CLOUDFLARE_ACCOUNT_ID`: Your Cloudflare account ID

## Content Management

The blog includes 99+ posts across 4 regions:
- **US**: Credit building, tax refunds, Social Security, SNAP benefits
- **UK**: ISAs, Universal Credit, energy savings, buy-to-let property
- **Australia**: Superannuation, Centrelink, tax returns, property investment
- **Canada**: RRSP/TFSA, CCB, mortgages, EI benefits

## SEO Features

- Region-specific outbound links to government resources
- Internal linking between related posts
- Unique images for each post (60+ unique URLs)
- Meta tags and structured data
- Mobile-optimized design

## Email System

- Collects user name, email, and region
- Sends personalized PDF guides (2,000+ words each)
- Forwards subscriber details to admin email
- Prevents duplicate signups

## License

MIT License - see LICENSE file for details