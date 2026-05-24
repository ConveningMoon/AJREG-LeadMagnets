# Guía del Comprador Hispano — Landing Page

Premium lead magnet landing page for A&J Real Estate Group.
Deploys to `lm.ajrealestateva.com`.

## Quick Start

```bash
npm install
cp .env.example .env.local   # edit with your real channel ID
npm run dev
```

Open http://localhost:3000

## Environment Variables

| Variable | Required | Description |
|----------|----------|-------------|
| `NEXT_PUBLIC_ITMANO_BASE_URL` | No | ITMANO base URL (default: https://app.itmano.com) |
| `NEXT_PUBLIC_ITMANO_CHANNEL_ID` | **Yes** | Public channel ID from ITMANO → Sources |

### Getting Your Channel ID
1. Log in to ITMANO → **Sources**
2. Find or create the "Guía del Comprador Hispano" lead magnet channel
3. Copy its `public_id` (format: `chn_xxxxx`)
4. Paste into `NEXT_PUBLIC_ITMANO_CHANNEL_ID` in `.env.local`

Without a channel ID, intake.js won't load and the form will use the direct fetch fallback.

## Replacing Content Placeholders

Search the codebase for `REEMPLAZAR` to find all content the client must supply:

| File | What to replace |
|------|----------------|
| `components/sections/AgentIntro.tsx` | Adriana's real bio, years of experience, families served |
| `components/sections/Testimonials.tsx` | Real client testimonials (name, quote, location) |
| `components/sections/Footer.tsx` | Real social media profile URLs |

## Adding Real Images

See `public/images/ASSETS.md` for dimensions and instructions.

When testimonial photos and logo are ready:
1. Drop files at the paths listed in `ASSETS.md`
2. In `Testimonials.tsx`: uncomment the `<Image>` block, remove `<ImagePlaceholder>`
3. In `Footer.tsx`: uncomment the `<Image>` block, remove `<ImagePlaceholder>`

## Deploy to Vercel

```bash
# 1. Push to GitHub
git push origin main

# 2. Import project at vercel.com/new
# 3. Set env vars in Vercel dashboard:
#    NEXT_PUBLIC_ITMANO_BASE_URL = https://app.itmano.com
#    NEXT_PUBLIC_ITMANO_CHANNEL_ID = chn_xxxxx

# 4. Add custom domain: lm.ajrealestateva.com
```

Framework preset: Next.js (auto-detected). Build command: `npm run build`. Output: `.next`.

## Scripts

```bash
npm run dev      # development server
npm run build    # production build
npm run lint     # ESLint
npx tsc --noEmit # type check
```
