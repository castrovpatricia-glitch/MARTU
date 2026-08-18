# MARTU

Personal finance app with an editorial / risograph-zine visual language. Local-first: all data lives in the browser (IndexedDB via Dexie), no login, no server.

## Stack

Next.js (App Router) · React · TypeScript · Tailwind CSS v4 · Dexie (IndexedDB) · Zustand

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). First run shows an onboarding flow — choose "Empezar de cero" or "Ver demo" to explore with fictional data.

## Scripts

- `npm run dev` — dev server
- `npm run build` — production build
- `npm run start` — run the production build
- `npm run lint` — ESLint

## Structure

- `src/lib` — data model (`types.ts`), persistence (`db.ts`, `repo.ts`), calculations (`calc.ts`), insights engine (`insights.ts`), formatting, demo data, export/import.
- `src/components/ds` — design system primitives (Block, Button, Input, Sheet, etc).
- `src/components/doodles` — hand-drawn-style SVG icon set.
- `src/components/forms` — the transaction quick-add form.
- `src/components/shell` — navigation (sidebar, bottom nav, FAB) and app-wide chrome.
- `src/app` — one route per screen (Home, Movimientos, Mes, Presupuestos, Ahorros, Metas, Fijos, Suscripciones, Tarjetas, Historial, Ajustes, Onboarding).

Data export (CSV/JSON) and JSON import/backup live under Ajustes.
