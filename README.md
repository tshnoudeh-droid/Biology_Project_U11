# Alvea Wellness

A fictional luxury retreat inside the human respiratory system, built for the SBI3U1 "Beautiful Body-Works" Travel Info Video
(Tawfic, Max, Ben and Oliver). *Every breath, a destination.*

## Run locally

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # type-check + production build into dist/
```

## Deploy (Vercel)

```bash
npx vercel --prod
```

Or import the GitHub repo at vercel.com/new (preset: Vite). `vercel.json` rewrites every route to `index.html`.

## How the site is organised

**One scrolling home page** (`/`), with the top menu jumping between sections:

1. **Hero**: what Alvea is, plus the 3 steps (watch → explore → book)
2. **Tour** (`#tour`): the animated film, 11 scenes, with captions and a scene stepper
3. **Resort map** (`#map`): click any of the 8 stops; extras shown as cards underneath
4. **Book** (`#book`): packages, form and confirmation (nothing is stored or sent)
5. **Sources** (`#sources`): team, about, and the MLA Works Cited

**Stop pages** (`/tour/:stop`) all use one template: hero → **one interactive labelled figure** → 3 key facts → quiz.

Old addresses (`/book`, `/tour`, `/stops`, `/sources`, `/about`) redirect to the matching home-page section.

## Code layout

| Folder | What lives there |
|---|---|
| `src/data/` | `tour.ts` (all stop content, in tour order), `numbers.ts` |
| `src/sections/` | the five home-page sections |
| `src/figures/` | one interactive figure per stop, all built on `Figure.tsx` (controls → SVG → caption) and `parts.tsx` (labels, palette) |
| `src/film/` | the tour film: `scenes.ts` (captions + timing), `scenesA/B.tsx` (art), `interior.tsx` (hotel kit), `FilmPlayer.tsx` |
| `src/components/` | nav, footer, resort map, stepper, quiz, logo, icons |
| `src/styles/` | `global.css` (brand tokens) + one stylesheet per area |

## Recording route (1920×1080)

Home → Tour (play through, splitting scenes between narrators) → Resort map → click through stops 1–8 and try each figure →
extras → Book a package → confirmation → Sources.
