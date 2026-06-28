# TOKYO Sports — Vercel Deployment Guide

## Prerequisites
- Vercel account (free tier works)
- Git repository (GitHub / GitLab / Bitbucket)

---

## Step 1: Push to Git

```bash
git init
git add .
git commit -m "Initial commit: TOKYO Sports Shop"
git remote add origin https://github.com/YOUR_USERNAME/ecom-tokyo.git
git push -u origin main
```

---

## Step 2: Deploy to Vercel

1. Go to [vercel.com/new](https://vercel.com/new)
2. Click **"Import Git Repository"**
3. Select your `ecom-tokyo` repository
4. Vercel auto-detects **Next.js** — no framework config needed
5. Click **Deploy**

---

## Step 3: Set Environment Variables

In your Vercel project dashboard → **Settings → Environment Variables**, add:

| Variable | Value | Required |
|---|---|---|
| `ADMIN_PASSWORD` | Your secure password | ✅ |
| `NEXT_PUBLIC_WHATSAPP_NUMBER` | Your WhatsApp number (no + or spaces) | ✅ |
| `NEXT_PUBLIC_SHOP_NAME` | TOKYO Sports | Optional |
| `SESSION_SECRET` | Random 32-char string | ✅ |
| `BLOB_READ_WRITE_TOKEN` | From Vercel Blob storage | For image uploads |

---

## Step 4: Set Up Vercel Blob (for image uploads)

1. In Vercel dashboard → **Storage → Create → Blob**
2. Name it `tokyo-products` (or any name)
3. Copy the `BLOB_READ_WRITE_TOKEN`
4. Add it to Environment Variables (Step 3)
5. Redeploy

> Without this token, the admin can still enter image URLs manually.

---

## Step 5: Upgrading to a Persistent Database

The current data layer uses in-memory storage (resets on every server restart).

To persist data in production, replace `lib/data.ts` with one of:

### Option A: Vercel KV (Redis) — Recommended for simplicity
```bash
npm install @vercel/kv
```

### Option B: Vercel Postgres (SQL)
```bash
npm install @vercel/postgres
```

### Option C: Supabase
```bash
npm install @supabase/supabase-js
```

The function signatures in `lib/data.ts` are already designed to be swapped — just replace the implementations.

---

## Admin Panel

- URL: `https://your-domain.vercel.app/admin`
- Default password: `admin123` ← **CHANGE THIS before deploying!**
- Set `ADMIN_PASSWORD` env var to your secure password

---

## WhatsApp Integration

Update `NEXT_PUBLIC_WHATSAPP_NUMBER` to your real WhatsApp Business number.

Format: Country code + number, no spaces or `+` sign.

Example: `919876543210` for India (+91 98765 43210)

---

## Local Development

```bash
npm install
npm run dev
# Open http://localhost:3000
```

Copy `.env.example` to `.env.local` and fill in your values.
