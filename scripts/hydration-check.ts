/**
 * Loads every prerendered page from the production build and fails on any console error, page error, hydration
 * mismatch or HTTP error. Needs `bun run build` and a preview server:
 *   bunx vite preview --port 4173 &      HX_BASE=http://localhost:4173/hamplitude bun scripts/hydration-check.ts [filter]
 */
import { chromium } from 'playwright-core'
import { readFileSync } from 'node:fs'

const BASE = process.env.HX_BASE ?? 'http://localhost:4173'
const filter = process.argv[2]
const urls = [...readFileSync('dist/sitemap.xml', 'utf8').matchAll(/<loc>([^<]+)<\/loc>/g)]
  .map((m) => new URL(m[1]).pathname.replace(new RegExp('^' + (process.env.HX_PREFIX ?? '')), ''))
  .filter((p) => !filter || p.includes(filter))

const browser = await chromium.launch({ executablePath: '/usr/bin/chromium', args: ['--no-sandbox'] })
let bad = 0
const WORKERS = 4
let next = 0
async function worker() {
  const ctx = await browser.newContext({ viewport: { width: 1200, height: 900 } })
  await ctx.route(/gc\.zgo\.at|goatcounter\.com/, (r) => r.fulfill({ contentType: 'image/gif', body: '' })) // tests must never count as real visits
  const page = await ctx.newPage()
  const errs: string[] = []
  page.on('pageerror', (e) => errs.push('pageerror: ' + String(e).slice(0, 160)))
  page.on('console', (m) => (m.type() === 'error' || m.type() === 'warning') && errs.push(`${m.type()}: ${m.text().slice(0, 160)}`))
  page.on('response', (r) => r.status() >= 400 && errs.push(`HTTP ${r.status()} ${r.url()}`))
  while (next < urls.length) {
    const path = urls[next++]
    errs.length = 0
    const res = await page.goto(BASE + path, { waitUntil: 'load' })
    await page.waitForTimeout(500)
    const pre = await page.evaluate(() => document.documentElement.hasAttribute('data-prerendered'))
    if (res?.status() !== 200 || !pre || errs.length) { bad++; console.log(`✗ ${path}  ${res?.status()} prerendered=${pre}  ${errs.slice(0, 2).join(' | ')}`) }
  }
}
await Promise.all(Array.from({ length: WORKERS }, worker))
console.log(bad ? `\n${bad} of ${urls.length} page(s) with problems` : `\n✓ ${urls.length} prerendered pages load and hydrate with no errors`)
await browser.close()
process.exit(bad ? 1 : 0)
