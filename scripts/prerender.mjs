#!/usr/bin/env node
/**
 * Static-site generation for the GitHub Pages deploy.
 *
 * Before this existed, every route except `/` was served by public/404.html —
 * with a real HTTP 404 — and only then bounced to `/?p=<path>` by JavaScript.
 * Crawlers saw the 404 and stopped, so /pricing, /hiring and the rest were
 * structurally unindexable. This renders each route to real HTML that GitHub
 * Pages returns with a 200.
 *
 * Runs after `vite build` (which empties dist/) and after the SSR build.
 * Set PRERENDER_BODY=0 to emit head-only shells if a component ever stops
 * being server-renderable — the 200s and the metadata survive either way.
 */

import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { execFileSync } from 'node:child_process';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const DIST = join(ROOT, 'dist');
const SSR_ENTRY = join(ROOT, '.ssr/entry-server.js');
const WITH_BODY = process.env.PRERENDER_BODY !== '0';

if (!existsSync(SSR_ENTRY)) {
  throw new Error(`[prerender] missing ${SSR_ENTRY} — run \`vite build --ssr src/entry-server.tsx --outDir .ssr\` first`);
}

const { render, ROUTES, ROUTE_PATHS, headTags, headGraph, HAND_FONT_HREF } = await import(pathToFileURL(SSR_ENTRY).href);

// A route in one list but not the other would ship a blank indexable page.
const inManifest = new Set(ROUTES.map((r) => r.path));
const inRouter = new Set(ROUTE_PATHS);
for (const p of inManifest) if (!inRouter.has(p)) throw new Error(`[prerender] ${p} is in ROUTES but has no <Route>`);
for (const p of inRouter) if (!inManifest.has(p)) throw new Error(`[prerender] ${p} has a <Route> but is missing from ROUTES`);

// Vite's manifest maps a source module to its emitted chunk and that chunk's
// own imports. Without a modulepreload the browser only discovers a route's
// chunk after the main bundle parses — a serial second round trip before the
// page becomes interactive.
let manifest = {};
try {
  manifest = JSON.parse(readFileSync(join(DIST, '.vite/manifest.json'), 'utf8'));
} catch {
  console.warn('[prerender] no dist/.vite/manifest.json — skipping modulepreload hints');
}

function preloadsFor(route, alreadyInTemplate) {
  const seen = new Set();
  const walk = (key) => {
    const entry = manifest[key];
    if (!entry || seen.has(key)) return;
    seen.add(key);
    (entry.imports ?? []).forEach(walk);
  };
  if (route.entry) walk(route.entry);
  return [...seen]
    .map((k) => manifest[k]?.file)
    .filter((f) => f && !alreadyInTemplate.has(f))
    .map((f) => `<link rel="modulepreload" crossorigin href="/${f}" data-seo />`);
}

const template = readFileSync(join(DIST, 'index.html'), 'utf8');

// Vite already emits modulepreload for the entry's own static imports; adding
// them again would make the browser fetch nothing extra but bloat every page.
const templatePreloads = new Set(
  [...template.matchAll(/(?:href|src)="\/(assets\/[^"]+)"/g)].map((m) => m[1])
);

for (const marker of ['<!--seo:start-->', '<!--seo:end-->', '<div id="root"></div>']) {
  if (!template.includes(marker)) throw new Error(`[prerender] dist/index.html is missing ${marker}`);
}

const esc = (s) =>
  String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

function headHtml(route) {
  const tags = headTags(route).map((t) => {
    if (t.kind === 'link') return `<link rel="${t.key}" href="${esc(t.value)}" data-seo />`;
    const attr = t.kind === 'meta-name' ? 'name' : 'property';
    return `<meta ${attr}="${t.key}" content="${esc(t.value)}" data-seo />`;
  });
  // `</` inside a <script> block would close it early.
  const ld = JSON.stringify(headGraph(route)).replace(/</g, '\\u003c');
  tags.push(`<script type="application/ld+json" data-seo>${ld}</script>`);
  return tags.join('\n    ');
}

// React 19 emits <link rel="preload"> hints for server-rendered <img> tags and
// hoists them to the front of the string. They belong in <head>, not in #root.
const HOISTED = /^(?:<link [^>]*>)+/;

let rendered = 0;
for (const route of ROUTES) {
  let body = '';
  if (WITH_BODY) {
    const raw = await render(route.path);
    const hit = raw.match(HOISTED);
    const hoisted = hit ? hit[0] : '';
    body = hit ? raw.slice(hit[0].length) : raw;

    const textLen = body.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim().length;
    if (textLen < 200) {
      throw new Error(`[prerender] ${route.path} rendered only ${textLen} chars of text — route mismatch or SSR failure`);
    }
    route.__hoisted = hoisted;
  }

  // Callback form throughout: the rendered markup contains `$` (prices, the
  // shell prompt in Hero), and the string form would treat `$&` as a pattern.
  let html = template;
  html = html.replace(/<title>[\s\S]*?<\/title>/, () => `<title>${esc(route.title)}</title>`);
  html = html.replace(
    /<!--seo:start-->[\s\S]*?<!--seo:end-->/,
    () => `<!--seo:start-->\n    ${headHtml(route)}\n    <!--seo:end-->`
  );
  const headExtras = [
    route.__hoisted,
    // Only routes that render .hand pay for the handwriting face.
    route.hand ? `<link rel="stylesheet" href="${HAND_FONT_HREF}" data-font-hand />` : '',
    ...preloadsFor(route, templatePreloads),
  ].filter(Boolean);
  if (headExtras.length) {
    html = html.replace('</head>', () => `  ${headExtras.join('\n  ')}\n  </head>`);
  }
  if (body) html = html.replace('<div id="root"></div>', () => `<div id="root">${body}</div>`);

  // GitHub Pages serves `/foo` from `foo.html` with a clean 200, but serves
  // `/foo` from `foo/index.html` only after a 301 to `/foo/`. Write both.
  const rel = route.path.replace(/^\//, '');
  const targets =
    route.path === '/' ? [join(DIST, 'index.html')] : [join(DIST, `${rel}.html`), join(DIST, rel, 'index.html')];
  for (const out of targets) {
    mkdirSync(dirname(out), { recursive: true });
    writeFileSync(out, html);
  }
  rendered += 1;
  console.log(`[prerender] ${route.path.padEnd(28)} ${(html.length / 1024).toFixed(1).padStart(6)} kB`);
}

// ── sitemap.xml + robots.txt, from the same manifest ─────────────────────────

const SITE_URL = 'https://bytesmonks.com';
const buildDate = new Date().toISOString().slice(0, 10);

/** Last commit date touching a route's source, so `lastmod` reflects the page
 *  rather than the deploy. Falls back to the build date outside a git checkout. */
function lastmodFor(route) {
  const paths = [route.entry, 'src/App.tsx', 'src/lib/site.ts'].filter(Boolean);
  const target = route.entry ? [route.entry] : paths;
  try {
    const out = execFileSync('git', ['log', '-1', '--format=%cs', '--', ...target], {
      cwd: ROOT,
      encoding: 'utf8',
      stdio: ['ignore', 'pipe', 'ignore'],
    }).trim();
    return out || buildDate;
  } catch {
    return buildDate;
  }
}

const urls = ROUTES.filter((r) => !r.noindex)
  .map((r) =>
    [
      '  <url>',
      `    <loc>${SITE_URL}${r.path === '/' ? '/' : r.path}</loc>`,
      `    <lastmod>${lastmodFor(r)}</lastmod>`,
      `    <changefreq>${r.changefreq ?? 'monthly'}</changefreq>`,
      `    <priority>${(r.priority ?? 0.5).toFixed(1)}</priority>`,
      '  </url>',
    ].join('\n')
  )
  .join('\n');

writeFileSync(
  join(DIST, 'sitemap.xml'),
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`
);

console.log(`[prerender] ${rendered} routes, ${WITH_BODY ? 'with body' : 'head-only shells'}, sitemap written`);
