# Bytes Monks

Marketing site for Bytes Monks — React 19 + Vite, deployed to GitHub Pages.

```bash
npm install
npm run dev      # vite dev server
npm run build    # typecheck -> client build -> SSR build -> prerender
npm run preview  # serve dist/
```

## The build is not a plain SPA build

`npm run build` runs four steps, in order:

```
tsc                                                    typecheck
vite build                                             client bundle -> dist/
vite build --ssr src/entry-server.tsx --outDir .ssr    server bundle -> .ssr/ (gitignored)
node scripts/prerender.mjs                             static HTML per route -> dist/
```

The prerender step exists because GitHub Pages has no server-side routing. Before
it, every route except `/` was served by `public/404.html` **with a real HTTP 404**
and only then bounced to `/?p=<path>` by JavaScript — so crawlers saw a dead URL
and none of those pages could be indexed. `scripts/prerender.mjs` now writes real
HTML for every route, which Pages returns with a 200.

For each route it emits **both** `dist/<route>.html` and `dist/<route>/index.html`:
Pages serves `/foo` from `foo.html` directly, but serves `/foo` from
`foo/index.html` only after a 301 to `/foo/`.

`npm run build:spa` skips the prerender if you ever need the plain SPA output.

## Where SEO lives

One route manifest feeds everything — runtime, prerender, and sitemap — so they
cannot drift:

| File | Responsibility |
| --- | --- |
| `src/lib/site.ts` | `ROUTES`: path, title, description, keywords, OG image, breadcrumb, priority |
| `src/lib/head.ts` | The head, described once, as data |
| `src/lib/schema.ts` | JSON-LD builders (WebPage, BreadcrumbList, Service, FAQPage, JobPosting, …) |
| `src/lib/pageSchema.ts` | Which JSON-LD nodes each route gets |
| `src/components/Seo.tsx` | Applies the head to the live DOM on client-side navigation |
| `scripts/prerender.mjs` | Serialises the same head into static HTML, and writes `sitemap.xml` |

`index.html` carries only the **site-wide** graph (Organization + WebSite). Page-level
nodes come from `pageSchema.ts`. Keep the two sets disjoint or nodes get declared twice.

**Adding a route** means touching two places: `ROUTE_PATHS` + a `<Route>` in
`src/routes.tsx`, and an entry in `ROUTES` in `src/lib/site.ts`. The prerender
asserts they match, so forgetting one fails the build rather than shipping a
blank indexable page.

## The two sourcing lines

There are two, and they are unrelated — keep them apart:

| Route | Latin | What it sells | Content |
| --- | --- | --- | --- |
| `/talent-sourcing` | Ars Vocandi | Software engineers, designers, leads | `src/data/talentSourcing.ts` |
| `/product-sourcing` | Ars Mercatoria | Physical goods sourced from China | `src/data/productSourcing.ts` |

Both pages share their section shapes and sub-components (`src/components/sourcingUi.tsx`),
so a change to the FAQ accordion or the form plumbing lands on both.

Each data file opens with an **owner checklist** of the commercial terms and
capability claims that need confirming, and a `TERMS` object whose figures are
`null` until someone sets them. Nothing on either page states a metric, price,
client name, or testimonial the business cannot yet evidence — if you add one,
add the evidence with it.

## Verifying a build

```bash
npm run build
npm i --no-save jsdom && node scripts/check-hydration.mjs
LAZY_DELAY_MS=300 node scripts/check-hydration.mjs   # simulate slow route chunks
```

A hydration mismatch makes React throw the prerendered DOM away and re-render on
the client — the whole benefit disappears with nothing failing in CI. This script
hydrates every generated page in jsdom with React in development mode and fails
on any recoverable error or blank flash.

## Regenerating assets

Both are manual — their output is committed, so they are deliberately not in `npm run build`:

```bash
python3 scripts/generate-brand-assets.py   # OG cards, apple-touch-icon, PWA icons
python3 scripts/optimize-images.py         # re-encode rasters to their render size
```

## Design system

`src/index.css` holds the whole palette as CSS custom properties, with three themes
(`:root` parchment, `[data-theme="candlelight"]`, `[data-theme="ink"]`). Components
style themselves inline from those variables; Tailwind is present but barely used.

Copy voice: the monastic frame stays (Latin discipline names, roman numerals,
"the Order", the wax seal), but the prose is plain and short — no paragraph over
two sentences, no sentence much over 18 words, no self-praise adjectives. If a
new string reads like a brochure, it is wrong.

Typography: EB Garamond (`.serif`), Inter (`.sans`), JetBrains Mono (`.mono`), and
Caveat (`.hand`). `.hand` is a **marginalia layer** — display lines and asides only,
and it is loaded per route (`hand: true` in the manifest), not site-wide.
Its guardrails are in the comment above the rule: minimum 18px, weight 600 below
24px, ~90 characters per run, and never for body copy, form labels, prices, or
legal text. Vermillion set in `.hand` must stay ≥24px, because `--vermillion` on the
candlelight theme is 3.27:1 — AA-large only.
