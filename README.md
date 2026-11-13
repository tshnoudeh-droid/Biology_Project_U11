# Alvea Wellness

A fictional luxury retreat inside the human respiratory system, built for the SBI3U1 "Beautiful Body-Works" Travel Info Video
(Tawfic, Max, Ben and Oliver). *Every breath, a destination.*

## Run locally

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # type-check + production build into dist/
npm run preview  # serve the production build
```

## Deploy (Vercel)

```bash
npx vercel --prod
```

Or import the GitHub repo at vercel.com/new (framework preset: Vite). `vercel.json` rewrites every route to `index.html`
so deep links like `/tour/alveoli` work.

## Recording route (1920×1080)

Home → Tour map → **Follow a breath** → Stops 1–7 → 7b Gas Exchange → 8 Diaphragm (play each thrill ride) → Concierge →
Check-out → Advisories → Book a package → confirmation → footer contact info → Sources.

## Structure

- `src/data/tour.ts`: all stop content, quizzes and tour order (Previous/Next follows this array)
- `src/diagrams/`: hand-built labelled SVG diagrams, one per stop
- `src/rides/`: interactive thrill rides (asthma, surfactant, gas exchange, diaphragm, CO₂ dial)
- `src/components/AirwayArt.tsx` + `src/lib/useBreath.ts`: the resort map and the Follow-a-breath animation
- `src/styles/global.css`: brand tokens

Static site only: the booking form stores and sends nothing.
