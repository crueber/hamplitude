import { chromium } from 'playwright-core'
const BASE = 'http://localhost:4173/hamplitude'
const b = await chromium.launch({ executablePath: '/usr/bin/chromium', args: ['--no-sandbox'] })
const pages = ['/', '/technician/', '/technician/T5D/', '/general/G9B/', '/extra/E9G/', '/compendium/', '/compendium/antennas/', '/compendium/antennas/wire/', '/compendium/antennas/wire/half-wave-dipole/', '/compendium/modes/cw/morse-alphabet/', '/compendium/emergency/practice/', '/compendium/reference/tables/glossary/']
let bad = 0
for (const mode of ['light', 'dark']) {
  const ctx = await b.newContext({ viewport: { width: 1200, height: 900 }, colorScheme: mode as 'light' | 'dark' })
  const p = await ctx.newPage()
  const errs: string[] = []
  p.on('pageerror', (e) => errs.push('pageerror: ' + String(e).slice(0, 200)))
  p.on('console', (m) => (m.type() === 'error' || m.type() === 'warning') && errs.push(`${m.type()}: ${m.text().slice(0, 220)}`))
  p.on('response', (r) => r.status() >= 400 && errs.push(`HTTP ${r.status()} ${r.url()}`))
  for (const path of pages) {
    errs.length = 0
    const res = await p.goto(BASE + path)
    await p.waitForTimeout(1200)
    const prerendered = await p.evaluate(() => document.documentElement.hasAttribute('data-prerendered'))
    const h1 = await p.locator('h1').first().innerText().catch(() => '(no h1)')
    const hyd = errs.filter((e) => /hydrat|did not match|Minified React error #(418|423|425|419|422)/i.test(e))
    const ok = res?.status() === 200 && prerendered && errs.length === 0
    if (!ok) bad++
    console.log(`${ok ? '✓' : '✗'} [${mode}] ${path}  (${res?.status()}) h1="${h1.slice(0, 40)}"${errs.length ? '\n     ' + errs.slice(0, 3).join('\n     ') : ''}${hyd.length ? '\n     HYDRATION: ' + hyd[0] : ''}`)
  }
  await ctx.close()
}
console.log(bad ? `\n${bad} page(s) with problems` : '\n✓ all prerendered pages load and hydrate without errors')
await b.close()
