# Bikfayah Baptist Church — Website

A complete, production-ready bilingual (English/Arabic) church website built with Next.js 14, TypeScript, Tailwind CSS, Framer Motion, next-intl, and Sanity v3 CMS.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 14 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS v3 + custom warm palette |
| Animations | Framer Motion |
| i18n | next-intl (EN + AR with RTL) |
| CMS | Sanity v3 |
| Email | Resend (optional, drop-in) |
| Hosting | Vercel (recommended) |

---

## Quick Start

### 1. Install dependencies

```bash
npm install
```

### 2. Set up environment variables

```bash
cp .env.example .env.local
# Edit .env.local with your Sanity project ID and other values
```

### 3. Set up Sanity CMS

1. Install the Sanity CLI: `npm install -g @sanity/cli`
2. Create a new project at [sanity.io](https://sanity.io) or run `sanity init` in a new folder
3. Copy your **Project ID** into `.env.local` as `NEXT_PUBLIC_SANITY_PROJECT_ID`
4. Set dataset to `production` (default)
5. In Sanity project settings → API → CORS origins, add `http://localhost:3000` and your production URL
6. Create an API token (read+write) and add it as `SANITY_API_TOKEN`
7. The Studio will be available at `/studio` once the app is running

### 4. Compile CSS (required for guaranteed style loading)

```bash
npm run compile-css
```

This runs Tailwind and outputs `public/compiled.css`, which is linked directly in the HTML head.

### 5. Start development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) — the app will redirect to `/en`.

---

## Project Structure

```
bikfayah-church/
├── app/
│   ├── [locale]/               # All pages under locale prefix
│   │   ├── layout.tsx          # Locale layout (html, dir, fonts, intl)
│   │   ├── page.tsx            # Home page
│   │   ├── jesus/page.tsx      # Who is Jesus / Gospel
│   │   ├── about/page.tsx      # Beliefs, Leadership, History (tabbed)
│   │   ├── community/page.tsx  # Youth, Bible study, Ministries, Testimonials
│   │   ├── sermons/
│   │   │   ├── page.tsx        # Sermon list with search + filters
│   │   │   └── [slug]/page.tsx # Individual sermon detail
│   │   ├── join-us/page.tsx    # Service times, Location, FAQ
│   │   └── contact/page.tsx    # Contact + Prayer request forms
│   ├── api/
│   │   ├── contact/route.ts    # Contact form handler
│   │   └── prayer/route.ts     # Prayer request handler
│   ├── studio/[[...tool]]/     # Sanity Studio (embedded)
│   └── layout.tsx              # Root layout
├── components/                 # 14 reusable UI components
├── messages/
│   ├── en.json                 # English translations
│   └── ar.json                 # Arabic translations (RTL)
├── sanity/
│   ├── schemas/                # Sermon, Staff, Event, Testimonial, Homepage
│   └── lib/client.ts           # Sanity client + image URL builder
├── lib/
│   └── fallback-data.ts        # 8 sermons, 3 testimonials, staff, service times
├── styles/globals.css          # Tailwind + Google Fonts + custom utilities
├── public/compiled.css         # Pre-compiled CSS (always loads)
├── i18n.ts                     # next-intl config
├── middleware.ts               # Locale routing middleware
├── sanity.config.ts            # Sanity Studio config with custom sidebar
├── tailwind.config.ts          # Custom warm color palette
└── .env.example                # Environment variable template
```

---

## Bilingual Content Guide

### Language routing
- English: `yourdomain.com/en/...`
- Arabic: `yourdomain.com/ar/...`
- Middleware auto-redirects bare `/` to `/en`

### Adding/editing translations
Edit `messages/en.json` and `messages/ar.json`. Every key must exist in both files.

### RTL layout
When locale is `ar`, the `<html>` tag gets `dir="rtl"` and the body uses Amiri font. All flexbox and border utilities flip automatically via CSS logical properties where possible.

### Arabic numerals
Use `toLocaleDateString('ar-LB', ...)` and `toLocaleString('ar-LB')` for Arabic-formatted dates and numbers.

---

## Sanity CMS Schemas

| Schema | Fields |
|---|---|
| **Sermon** | title/titleAr, slug, speaker/speakerAr, date, series/seriesAr, scripture, duration, youtubeUrl, audioFile, thumbnail, excerpt/excerptAr, transcript/transcriptAr, tags, featured |
| **Staff** | name/nameAr, role/roleAr, bio/bioAr, photo, email, order |
| **Event** | title/titleAr, date, location, description/descriptionAr, image, category |
| **Testimonial** | quote/quoteAr, author, role, photo, featured |
| **Homepage** | heroTitle/Ar, heroSubtitle/Ar, heroImage, welcomeText/Ar, marqueeVerses, featuredSermon |

---

## Weekly Sermon Workflow

1. Record and upload sermon to YouTube
2. Open `/studio` in your browser
3. Go to **Sermons → Create new**
4. Fill in English fields: title, speaker, date, series, scripture, duration, YouTube URL, excerpt
5. Fill in Arabic fields (titleAr, speakerAr, etc.)
6. Add relevant tags
7. Upload thumbnail (optional — warm placeholder shows if absent)
8. Toggle **Featured** ON to promote it on the homepage
9. **Publish** → sermon appears live immediately

---

## Deploying to Vercel

1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com) → Import Project → select your repo
3. Add all environment variables from `.env.example`
4. Build command: `npm run build` (this runs `compile-css` first)
5. Output directory: `.next` (default)
6. Click **Deploy**

### Post-deploy Sanity CORS
In your Sanity project → Settings → API → CORS origins, add your production Vercel URL (e.g. `https://bikfayabaptist.vercel.app`).

---

## Email Setup (Resend)

1. Sign up at [resend.com](https://resend.com) (free tier: 100 emails/day)
2. Add your domain and verify DNS
3. Copy your API key into `.env.local` as `RESEND_API_KEY`
4. In `app/api/contact/route.ts` and `app/api/prayer/route.ts`, uncomment the Resend integration block
5. Run `npm install resend`

---

## Color Reference

| Token | Hex | Usage |
|---|---|---|
| `warm-white` | `#FDFBF7` | Page backgrounds |
| `parchment` | `#F2EBD9` | Section alternates |
| `brown-deep` | `#1C1208` | Primary headings & text |
| `brown-mid` | `#4A3E30` | Body text |
| `brown-muted` | `#7A6E60` | Secondary/muted text |
| `gold` | `#B8860B` | Accents, buttons, borders |
| `hero-dark` | `#2C1A08` | Hero & dark sections |
| `hero-darker` | `#3D2410` | Hero gradient end |

---

## Fonts

| Font | Usage | Source |
|---|---|---|
| Cormorant Garamond | Headings, titles, quotes | Google Fonts |
| DM Sans | Body text, UI, navigation | Google Fonts |
| Amiri | All Arabic content | Google Fonts |

Fonts are loaded via `<link>` in the locale layout head, not `next/font`, to guarantee universal loading.

---

## License

Built for Bikfayah Baptist Church, Bikfaya, Lebanon. All rights reserved.
