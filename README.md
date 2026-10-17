# KhmerMart: Cambodia e-commerce starter

Next.js (App Router) · Tailwind CSS · PostgreSQL + Prisma · Telegram order alerts

## Features
- **Storefront**: home, product catalog with category filter, search, sort, pagination, product detail with gallery
- **Cart & checkout**: client-side cart (Zustand + localStorage), guest checkout with phone + province + address, COD / ABA Pay / KHQR / bank transfer, order confirmation page
- **Safe orders**: prices and stock are re-read from the database inside a transaction; stock is decremented atomically
- **Admin** (`/admin`): dashboard, orders (filter, status Pending / Paid / Shipped / Delivered / Cancelled), products (create, edit, hide), quick stock editing, categories
- **Telegram**: alert sent to your chat whenever a new order is placed

## Setup
```bash
npm install
cp .env.example .env          # then fill in the values
docker compose up -d          # local PostgreSQL (or use your own DATABASE_URL)
npx prisma migrate dev --name init
npm run db:seed               # sample products + first admin user
npm run dev
```
- Store: http://localhost:3000
- Admin: http://localhost:3000/admin/login (email and password come from `ADMIN_EMAIL` / `ADMIN_PASSWORD` in `.env`)

Generate `AUTH_SECRET` with `openssl rand -base64 32`. **Change the admin password** before going live.

## Telegram alerts
1. In Telegram, talk to **@BotFather**, send `/newbot`, and copy the token into `TELEGRAM_BOT_TOKEN`.
2. Open a chat with your new bot (or add it to a group) and send any message.
3. Visit `https://api.telegram.org/bot<TOKEN>/getUpdates` and copy `chat.id` into `TELEGRAM_CHAT_ID` (group ids start with `-`).
4. Set `NEXT_PUBLIC_SITE_URL` so the alert includes an "Open in admin" link.

## Things to customise
- Shipping rates: `src/lib/shipping.ts` (placeholder values)
- Brand name and colours: `src/app/layout.tsx`, `src/components/store/site-header.tsx`, `src/app/globals.css`
- Product images are URLs entered in the admin form. For uploads, add Cloudinary or S3/R2 later, and restrict `images.remotePatterns` in `next.config.ts`.
- Payment: ABA Pay / KHQR / bank transfer are recorded as the chosen method, and you confirm payment manually then set the order to Paid. Automatic confirmation needs the ABA PayWay or Bakong API.

## Before production
- Add rate limiting to the login and checkout actions (for example Upstash Ratelimit)
- Deploy to Vercel with Neon or Supabase Postgres (set the same env vars), and run `npx prisma migrate deploy`
- Back up the database regularly
