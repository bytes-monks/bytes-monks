#!/usr/bin/env node
/**
 * Hydration guard for the prerendered build.
 *
 * A hydration mismatch makes React throw the prerendered DOM away and
 * re-render everything on the client — the whole SSG benefit disappears
 * silently, with nothing failing in CI. This loads every generated page into
 * jsdom, hydrates it with React in DEVELOPMENT mode (the only mode that
 * reports mismatches), and fails on any recoverable error.
 *
 * Requires a build first, and jsdom, which is deliberately not a project
 * dependency:
 *
 *     npm run build
 *     npm i --no-save jsdom && node scripts/check-hydration.mjs
 *
 * Verified to actually catch a mismatch: corrupt a text node inside
 * <div id="root"> in any dist/*.html and this reports it.
 */

import { readFileSync } from 'node:fs'
import { readFile } from 'node:fs/promises'
import { build } from 'esbuild'
import { JSDOM, VirtualConsole } from 'jsdom'

const ROOT = '/home/somebodyawesome/bytes-monks'
const SP = process.env.SP

// LAZY_DELAY_MS simulates a route chunk arriving over the network. Without it
// the bundled dynamic imports settle on a microtask, which never exercises the
// path where React must hold the prerendered HTML while the chunk is in flight.
const LAZY_DELAY_MS = Number(process.env.LAZY_DELAY_MS ?? 0)

const delayLazyChunks = {
  name: 'delay-lazy-chunks',
  setup(b) {
    if (!LAZY_DELAY_MS) return
    b.onLoad({ filter: /src[\\/]routes\.tsx$/ }, async (args) => ({
      contents: (await readFile(args.path, 'utf8')).replace(
        /lazy\(\(\) => import\((['"][^'"]+['"])\)\)/g,
        (_m, spec) =>
          `lazy(() => new Promise((r) => setTimeout(() => r(import(${spec})), ${LAZY_DELAY_MS})))`
      ),
      loader: 'tsx',
    }))
  },
}

const out = await build({
  entryPoints: [`${ROOT}/scripts/hydration-entry.tsx`],
  bundle: true, format: 'iife', platform: 'browser', write: false,
  jsx: 'automatic', absWorkingDir: ROOT, logLevel: 'error',
  define: { 'process.env.NODE_ENV': '"development"', __BUILD_YEAR__: JSON.stringify(String(new Date().getFullYear())) },
  loader: { '.css': 'empty' },
  plugins: [delayLazyChunks],
})
const bundle = out.outputFiles[0].text

const ROUTES = [
  ['/', 'dist/index.html'],
  ['/talent-sourcing', 'dist/talent-sourcing.html'],
  ['/product-sourcing', 'dist/product-sourcing.html'],
  ['/pricing', 'dist/pricing.html'],
  ['/hiring', 'dist/hiring.html'],
  ['/privacy', 'dist/privacy.html'],
  ['/terms', 'dist/terms.html'],
  ['/refund', 'dist/refund.html'],
  ['/cosmo-eat-stars/privacy', 'dist/cosmo-eat-stars/privacy.html'],
]

let failures = 0
for (const [path, file] of ROUTES) {
  const html = readFileSync(`${ROOT}/${file}`, 'utf8')
  const vc = new VirtualConsole()
  const logs = []
  vc.on('jsdomError', (e) => logs.push('jsdomError: ' + e.message))
  vc.on('error', (...a) => logs.push('console.error: ' + a.join(' ')))
  vc.on('warn', (...a) => logs.push('console.warn: ' + a.join(' ')))

  const dom = new JSDOM(html, { url: `https://bytesmonks.com${path}`, pretendToBeVisual: true, runScripts: 'outside-only', virtualConsole: vc })
  const { window } = dom
  // jsdom gaps the app touches from effects.
  window.IntersectionObserver = class { observe() {} unobserve() {} disconnect() {} }
  window.scrollTo = () => {}
  window.matchMedia = window.matchMedia || (() => ({ matches: false, addEventListener() {}, removeEventListener() {}, addListener() {}, removeListener() {} }))
  window.Element.prototype.scrollIntoView = () => {}

  const before = window.document.getElementById('root').innerHTML.length
  try {
    window.eval(bundle)
  } catch (e) {
    logs.push('THREW: ' + e.message)
  }
  // Sample mid-flight: if React discarded the prerendered HTML while waiting
  // for a lazy chunk, the user would see a blank flash. The DOM must not empty.
  await new Promise((r) => setTimeout(r, Math.max(20, LAZY_DELAY_MS / 3)))
  const during = window.document.getElementById('root').innerHTML.length
  await new Promise((r) => setTimeout(r, 400 + LAZY_DELAY_MS))

  const errs = window.__HYDRATION_ERRORS__ ?? []
  const after = window.document.getElementById('root').innerHTML.length
  const mismatches = logs.filter((l) => /hydrat|did not match|server rendered|Warning: Text content|Expected server/i.test(l))
  const other = logs.filter((l) => !mismatches.includes(l))

  const blanked = during < before * 0.5
  const bad = errs.length || mismatches.length || blanked
  if (bad) failures++
  console.log(
    `${bad ? '✗' : '✓'} ${path.padEnd(26)} dom ${String(before).padStart(6)} -> ${String(after).padStart(6)}  ` +
    `midflight ${String(during).padStart(6)}${blanked ? ' BLANKED' : ''}  ` +
    `recoverable=${errs.length} mismatchLogs=${mismatches.length} otherLogs=${other.length}`
  )
  for (const e of errs.slice(0, 4)) console.log(`      ! ${e.slice(0, 170)}`)
  for (const e of mismatches.slice(0, 4)) console.log(`      ! ${e.slice(0, 170)}`)
  for (const e of other.slice(0, 3)) console.log(`      · ${e.slice(0, 150)}`)
  dom.window.close()
}
console.log(failures ? `\n${failures} route(s) with hydration problems` : '\nAll routes hydrated cleanly')
process.exit(failures ? 1 : 0)
