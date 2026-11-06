# Lumora-Manifest

Marketing site for LUMORA Manifest, a mobile app that creates personalized, AI-narrated dream-life audio stories in the listener’s own voice.

The site is dark and product-led: large type, and phone mockups of the app.

## Stack

- Next.js 14 (App Router) and TypeScript
- Tailwind CSS and shadcn-style UI primitives
- Framer Motion for scroll reveals
- next-intl for English, Russian, Arabic (RTL), Bahasa Indonesia, Spanish, and Chinese
- react-hook-form and Zod on the support form

## Getting started

Node.js 18.18 or newer.

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Where to edit content

| What | Where |
| --- | --- |
| Prices, store links, social links, testimonials, preset voices | `config/site.ts` |
| All interface copy | `messages/en.json` |
| Other languages | `messages/ru.json`, `ar.json`, `id.json`, `es.json`, `zh.json` |
| Logo and hero background | `public/Logo.jpeg`, `public/Bg.jpeg` |

Russian, Arabic, Indonesian, Spanish, and Chinese currently reuse the English strings so every key exists. Replace the values in each file. Arabic layout is already `dir="rtl"`.

Outfit is loaded for Latin and Latin Extended. Arabic, Chinese, and Cyrillic fall back to system fonts so those scripts stay readable without extra font downloads.

Plan names stay in the translation files. Amounts, billing intervals, and daily story counts are in `config/site.ts`. The support form validates in the browser and confirms on the page. Connect it to an inbox before launch.

## Scripts

```bash
npm run dev
npm run lint
npm run build
npm run start
npm run format
```

## Deploy on Vercel

1. Push the project to a Git host.
2. In Vercel, import the repository. Framework preset: Next.js.
3. Leave the build command as `next build` and the output as the default.
4. No environment variables are required for the marketing site.
5. After deploy, set `url` in `config/site.ts` to the production domain so canonical URLs, Open Graph, sitemap, and JSON-LD match the live site.

## Project map

```
app/
  [locale]/           home, terms, privacy, support
  sitemap.ts
  robots.ts
components/           Navbar, Waveform, PhoneMockup, and sections
config/site.ts        editable product content
i18n/                 next-intl routing
messages/             one JSON file per language
public/               logo and hero background
```

## Accessibility and motion

Focus rings are pink on the plum background. `prefers-reduced-motion` turns off the float and waveform animations and the scroll reveals.
