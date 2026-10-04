/**
 * Interaction fuzz: for every authored lesson, drives every slider to min / max / mid and clicks every
 * interactive control inside the lesson, then reports page errors and NaN/Infinity/undefined leaking into text.
 *   bun scripts/interact.ts [technician|general|extra|T5D ...]
 */
import { chromium } from 'playwright-core'
import { readdirSync } from 'node:fs'
import { join, resolve } from 'node:path'

const ROOT = resolve(import.meta.dir, '..')
const filters = process.argv.slice(2)
const ids: { lic: string; id: string }[] = []
for (const lic of ['technician', 'general', 'extra'])
  for (const f of readdirSync(join(ROOT, 'src/content', lic)).filter((f) => f.endsWith('.mdx')))
    ids.push({ lic, id: f.replace('.mdx', '') })
const todo = ids.filter((x) => !filters.length || filters.includes(x.lic) || filters.includes(x.id))

const BAD = /\b(NaN|Infinity)\b|(?<!is )\bundefined\b/
const b = await chromium.launch({ executablePath: '/usr/bin/chromium', args: ['--no-sandbox'] })
const p = await (await b.newContext({ viewport: { width: 1200, height: 900 } })).newPage()
const errs: string[] = []
p.on('pageerror', (e) => errs.push(String(e).slice(0, 160)))
p.on('console', (m) => m.type() === 'error' && errs.push(m.text().slice(0, 160)))

let bad = 0, controls = 0
for (const { lic, id } of todo) {
  errs.length = 0
  const problems: string[] = []
  await p.goto(`http://localhost:5173/#/${lic}/${id}`)
  await p.waitForSelector('.concept', { timeout: 8000 }).catch(() => problems.push('no .concept'))
  await p.waitForTimeout(200)
  const check = async (when: string) => {
    const t = await p.evaluate(() => document.querySelector('.lesson-body')?.textContent ?? '')
    const m = t.match(BAD)
    if (m) problems.push(`"${m[0]}" in text ${when}`)
  }
  await check('on load')

  // sliders: min, max, mid
  const ranges = await p.$$('.lesson-body input[type=range]')
  for (let i = 0; i < ranges.length; i++) {
    controls++
    for (const f of [0, 1, 0.5, 0.97, 0.03]) {
      await p.evaluate(([i, f]) => {
        const el = document.querySelectorAll<HTMLInputElement>('.lesson-body input[type=range]')[i as number]
        const min = Number(el.min || 0), max = Number(el.max || 100)
        const v = min + (max - min) * (f as number)
        const set = Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, 'value')!.set!
        set.call(el, String(v)); el.dispatchEvent(new Event('input', { bubbles: true }))
      }, [i, f])
      await p.waitForTimeout(30)
      await check(`after slider ${i} at ${f}`)
    }
  }
  // buttons / radios / svg buttons / checkboxes inside the lesson body
  const sel = '.lesson-body button, .lesson-body [role=button], .lesson-body [role=radio], .lesson-body input[type=checkbox], .lesson-body input[type=radio], .lesson-body select'
  const n = await p.$$eval(sel, (els) => els.length)
  for (let i = 0; i < n; i++) {
    controls++
    const el = (await p.$$(sel))[i]
    if (!el) continue
    try { await el.click({ timeout: 800, force: true }) } catch { /* detached or covered; fine */ }
    await p.waitForTimeout(30)
    if (i % 4 === 3 || i === n - 1) await check(`after click ${i}`)
  }
  await p.waitForTimeout(100)
  const all = [...new Set([...errs, ...problems])]
  if (all.length) { bad++; console.log(`✗ ${lic}/${id}: ${all.slice(0, 4).join(' | ')}`) }
}
console.log(bad ? `\n${bad} lesson(s) with problems (${controls} controls driven)` : `\n✓ ${todo.length} lessons, ${controls} controls driven, no errors and no NaN/undefined`)
await b.close()
process.exit(bad ? 1 : 0)
