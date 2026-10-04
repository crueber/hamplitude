/**
 * Screenshot helper for visual QA.
 *   bun scripts/shot.ts <route> [out.png] [--dark] [--mobile] [--full] [--wait=ms] [--click=selector]
 * Expects the dev server on :5173 (bun run dev). Routes are hash routes, e.g. /technician/T3B
 */
import { chromium } from 'playwright-core'

const args = process.argv.slice(2)
const route = args.find((a) => !a.startsWith('--')) ?? '/'
const out = args.filter((a) => !a.startsWith('--'))[1] ?? 'shot.png'
const flag = (n: string) => args.includes(`--${n}`)
const opt = (n: string) => args.find((a) => a.startsWith(`--${n}=`))?.split('=').slice(1).join('=')

const browser = await chromium.launch({ executablePath: '/usr/bin/chromium', args: ['--no-sandbox'] })
const ctx = await browser.newContext({
  viewport: flag('mobile') ? { width: 390, height: 844 } : { width: 1280, height: 900 },
  colorScheme: flag('dark') ? 'dark' : 'light',
  deviceScaleFactor: 1,
})
const page = await ctx.newPage()
const errors: string[] = []
page.on('pageerror', (e) => errors.push(String(e)))
page.on('console', (m) => m.type() === 'error' && errors.push(m.text()))
await page.goto(`${opt('base') ?? 'http://localhost:5173'}/#${route}`)
await page.waitForTimeout(Number(opt('wait') ?? 900))
const click = opt('click')
if (click) { await page.click(click); await page.waitForTimeout(500) }
await page.screenshot({ path: out, fullPage: flag('full') })
console.log(`saved ${out}${errors.length ? `\nconsole errors:\n  ${errors.join('\n  ')}` : ' (no console errors)'}`)
await browser.close()
