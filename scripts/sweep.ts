/**
 * Render sweep: opens every authored lesson in light + dark (desktop) and mobile, and reports
 * console/page errors, horizontal page overflow, concept cards with no rendered diagram where one was imported,
 * and SVG <text> that falls outside its svg viewBox (clipped labels).
 *   bun scripts/sweep.ts [technician|general|extra|T5D ...]
 */
import { chromium } from 'playwright-core'
import { readdirSync } from 'node:fs'
import { join, resolve } from 'node:path'
import { targets } from './targets'

const ROOT = resolve(import.meta.dir, '..')
const filters = process.argv.slice(2)
const todo = targets(filters)

const b = await chromium.launch({ executablePath: '/usr/bin/chromium', args: ['--no-sandbox'] })
let bad = 0
for (const mode of ['light', 'dark', 'mobile'] as const) {
  const ctx = await b.newContext({
    viewport: mode === 'mobile' ? { width: 390, height: 844 } : { width: 1200, height: 900 },
    colorScheme: mode === 'dark' ? 'dark' : 'light',
  })
  const p = await ctx.newPage()
  const errs: string[] = []
  p.on('pageerror', (e) => errs.push(String(e)))
  p.on('console', (m) => m.type() === 'error' && errs.push(m.text()))
  for (const { label, url, wait } of todo) {
    errs.length = 0
    await p.goto(`http://localhost:5173/#${url}`)
    await p.waitForSelector(wait, { timeout: 8000 }).catch(() => errs.push(`nothing rendered (${wait})`))
    await p.waitForTimeout(250)
    const r = await p.evaluate(() => {
      const out: string[] = []
      if (document.documentElement.scrollWidth > document.documentElement.clientWidth + 2) out.push('page overflows horizontally')
      document.querySelectorAll('.diagram svg').forEach((svg, i) => {
        const vb = (svg as SVGSVGElement).viewBox.baseVal
        const box = svg.getBoundingClientRect()
        const scale = box.width / vb.width
        if (!svg.querySelector('*:not(defs):not(title)')) out.push(`diagram ${i} is empty`)
        let clipped = 0
        svg.querySelectorAll('text').forEach((t) => {
          const r = t.getBoundingClientRect()
          if (!r.width) return
          const x0 = (r.left - box.left) / scale, x1 = (r.right - box.left) / scale
          const y0 = (r.top - box.top) / scale, y1 = (r.bottom - box.top) / scale
          if (x0 < -2 || y0 < -2 || x1 > vb.width + 2 || y1 > vb.height + 2) clipped++
        })
        if (clipped) out.push(`diagram ${i}: ${clipped} text label(s) outside the viewBox (clipped)`)
      })
      return out
    })
    const all = [...errs, ...r]
    if (all.length) { bad++; console.log(`✗ [${mode}] ${label}: ${all.join(' | ')}`) }
  }
  await ctx.close()
}
console.log(bad ? `\n${bad} issue(s) across ${todo.length} lessons` : `\n✓ ${todo.length} lessons clean in light, dark and mobile`)
await b.close()
process.exit(bad ? 1 : 0)
