/**
 * Renders the social-sharing cards and the icon set into public/. Run when the branding changes:
 *   bun scripts/make-brand-assets.ts            everything below
 *   bun scripts/make-brand-assets.ts --cards    only the per-article cards (also: bun run cards)
 * Output: og.png (1200x630), icon-192.png, icon-512.png, apple-touch-icon.png, favicon.ico, and one 1200x630 JPEG per
 * compendium article in public/og/<section>/<sub>/<article>.jpg with its hash in src/data/og-cards.json.
 * Cards are incremental: only missing or changed ones are re-rendered (add --all to redo every card).
 */
import { chromium } from 'playwright-core'
import { existsSync, mkdirSync, mkdtempSync, readFileSync, rmSync, statSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { dirname, join, resolve } from 'node:path'
import { pathToFileURL } from 'node:url'
import { FLAT } from '../src/compendium/taxonomy'
import { cardFile, cardHash } from '../src/lib/og-card'

const onlyCards = process.argv.includes('--cards')
const allCards = process.argv.includes('--all')

const ROOT = resolve(import.meta.dir, '..')
const font = (pkg: string, file: string) => pathToFileURL(join(ROOT, 'node_modules', pkg, 'files', file)).href
const FACES = `
@font-face{font-family:'SG';src:url(${font('@fontsource-variable/space-grotesk', 'space-grotesk-latin-wght-normal.woff2')});font-weight:300 700}
@font-face{font-family:'JB';src:url(${font('@fontsource-variable/jetbrains-mono', 'jetbrains-mono-latin-wght-normal.woff2')});font-weight:100 800}
`
const MARK = (size: number, radius = 15) => `<svg width="${size}" height="${size}" viewBox="0 0 64 64"><rect width="64" height="64" rx="${radius}" fill="#0b1218"/><path d="M6 34 C14 34 14 14 22 14 S30 50 38 50 S46 20 52 20 58 34 60 34" fill="none" stroke="#2dd4bf" stroke-width="5" stroke-linecap="round"/><circle cx="22" cy="14" r="4" fill="#fbbf24"/></svg>`

// a carrier whose amplitude is modulated by a slower wave: the idea behind the whole site
function wave(w: number, h: number): string {
  const pts: string[] = []
  for (let i = 0; i <= 400; i++) {
    const x = (i / 400) * w
    const env = 1 + 0.55 * Math.sin((i / 400) * Math.PI * 3)
    pts.push(`${i ? 'L' : 'M'}${x.toFixed(1)},${(h / 2 - h * 0.28 * env * Math.sin((i / 400) * Math.PI * 38)).toFixed(1)}`)
  }
  return `<svg width="${w}" height="${h}" viewBox="0 0 ${w} ${h}"><defs><linearGradient id="g" x1="0" x2="1"><stop offset="0" stop-color="#2dd4bf" stop-opacity="0"/><stop offset=".3" stop-color="#2dd4bf"/><stop offset=".75" stop-color="#fbbf24"/><stop offset="1" stop-color="#fbbf24" stop-opacity="0"/></linearGradient></defs><path d="${pts.join('')}" fill="none" stroke="url(#g)" stroke-width="4" stroke-linecap="round"/></svg>`
}

const OG = `<!doctype html><meta charset="utf-8"><style>${FACES}
*{box-sizing:border-box;margin:0}
body{width:1200px;height:630px;overflow:hidden;background:radial-gradient(1100px 600px at 85% 10%,#16424a 0%,#0b1218 60%);color:#e8eef3;font-family:'SG',sans-serif;position:relative}
.wave{position:absolute;left:0;right:0;bottom:30px;opacity:.9}
.top{position:absolute;left:72px;top:64px;display:flex;align-items:center;gap:18px;font-size:34px;font-weight:700;letter-spacing:-.02em}
.top b{color:#2dd4bf}
h1{position:absolute;left:72px;top:156px;width:1080px;font-size:86px;line-height:1.04;letter-spacing:-.04em;font-weight:700}
h1 em{font-style:normal;color:#2dd4bf}
.chips{position:absolute;left:72px;top:372px;display:flex;gap:14px;font-family:'JB',monospace;font-size:24px;font-weight:600}
.chips span{padding:10px 20px;border-radius:99px;border:2px solid #2d4355;color:#b9c7d3}
.chips .a{color:#fbbf24;border-color:#7a5a12}
</style>
<div class="top">${MARK(56, 13)}<span>Ham<b>plitude</b></span></div>
<h1>Don't memorize ham radio.<br><em>Understand it.</em></h1>
<div class="chips"><span>Technician</span><span>General</span><span>Extra</span><span class="a">Compendium</span></div>
<div class="wave">${wave(1200, 150)}</div>`

const ICON = (px: number, radius: number) => `<!doctype html><meta charset="utf-8"><style>*{margin:0}body{width:${px}px;height:${px}px;background:transparent}</style>${MARK(px, radius)}`

const out = mkdtempSync(join(tmpdir(), 'hx-brand-'))
const browser = await chromium.launch({ executablePath: process.env.CHROMIUM ?? '/usr/bin/chromium', args: ['--no-sandbox', '--allow-file-access-from-files'] })
async function shot(html: string, w: number, h: number, file: string, transparent = false) {
  const f = join(out, file + '.html')
  writeFileSync(f, html)
  const page = await browser.newPage({ viewport: { width: w, height: h } })
  await page.goto(pathToFileURL(f).href)
  await page.waitForTimeout(400)
  await page.evaluate(() => document.fonts.ready)
  await page.screenshot({ path: join(ROOT, 'public', file), omitBackground: transparent })
  await page.close()
  console.log('wrote public/' + file)
}
if (!onlyCards) {
  await shot(OG, 1200, 630, 'og.png')
  await shot(ICON(512, 112), 512, 512, 'icon-512.png', true)
  await shot(ICON(192, 42), 192, 192, 'icon-192.png', true)
  await shot(ICON(180, 0), 180, 180, 'apple-touch-icon.png') // iOS rounds the corners itself
  await shot(ICON(48, 11), 48, 48, 'favicon-48.png', true)

  // favicon.ico: a single 48x48 PNG wrapped in an ICO container
  const png = readFileSync(join(ROOT, 'public/favicon-48.png'))
  const head = Buffer.alloc(22)
  head.writeUInt16LE(0, 0); head.writeUInt16LE(1, 2); head.writeUInt16LE(1, 4)
  head[6] = 48; head[7] = 48; head[8] = 0; head[9] = 0
  head.writeUInt16LE(1, 10); head.writeUInt16LE(32, 12); head.writeUInt32LE(png.length, 14); head.writeUInt32LE(22, 18)
  writeFileSync(join(ROOT, 'public/favicon.ico'), Buffer.concat([head, png]))
  rmSync(join(ROOT, 'public/favicon-48.png'))
  console.log('wrote public/favicon.ico')
}

// ---- per-article cards: the brand card's look, with the article's section, title and summary ----
const CARD = `<!doctype html><meta charset="utf-8"><style>${FACES}
*{box-sizing:border-box;margin:0}
body{width:1200px;height:630px;overflow:hidden;background:radial-gradient(1100px 600px at 85% 10%,#16424a 0%,#0b1218 60%);color:#e8eef3;font-family:'SG',sans-serif;position:relative}
.wave{position:absolute;left:0;right:0;bottom:6px;opacity:.55}
.top{position:absolute;left:72px;top:56px;display:flex;align-items:center;gap:16px;font-size:30px;font-weight:700;letter-spacing:-.02em}
.top b{color:#2dd4bf}
.main{position:absolute;left:72px;right:72px;top:150px}
.kick{font-family:'JB',monospace;font-size:22px;font-weight:600;letter-spacing:.14em;text-transform:uppercase;color:#fbbf24}
.kick i{font-style:normal;color:#8397a8}
h1{margin-top:20px;font-size:72px;line-height:1.06;letter-spacing:-.035em;font-weight:700;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden}
p{margin-top:24px;font-size:31px;line-height:1.35;color:#b9c7d3;max-width:1000px;display:-webkit-box;-webkit-line-clamp:3;-webkit-box-orient:vertical;overflow:hidden}
</style>
<div class="top">${MARK(50, 12)}<span>Ham<b>plitude</b></span></div>
<div class="main"><div class="kick" id="k"></div><h1 id="t"></h1><p id="s"></p></div>
<div class="wave">${wave(1200, 110)}</div>`

const MANIFEST = join(ROOT, 'src/data/og-cards.json')
const old: Record<string, string> = existsSync(MANIFEST) ? JSON.parse(readFileSync(MANIFEST, 'utf8')) : {}
const manifest: Record<string, string> = {}
const todo = FLAT.filter((a) => {
  manifest[a.path] = cardHash({ title: a.title, summary: a.summary, section: a.section.title, adjacent: a.section.adjacent })
  return allCards || old[a.path] !== manifest[a.path] || !existsSync(join(ROOT, 'public', cardFile(a.path)))
})
if (todo.length) {
  const f = join(out, 'card.html')
  writeFileSync(f, CARD)
  const page = await browser.newPage({ viewport: { width: 1200, height: 630 } })
  await page.goto(pathToFileURL(f).href)
  await page.evaluate(() => document.fonts.ready)
  const t0 = Date.now()
  for (const a of todo) {
    const kick = `Compendium · ${a.section.title}${a.section.adjacent ? ' · <i>not amateur radio</i>' : ''}`
    await page.evaluate(([k, t, s]) => {
      document.getElementById('k')!.innerHTML = k
      document.getElementById('t')!.textContent = t
      document.getElementById('s')!.textContent = s
    }, [kick, a.title, a.summary])
    const file = join(ROOT, 'public', cardFile(a.path))
    mkdirSync(dirname(file), { recursive: true })
    await page.screenshot({ path: file, type: 'jpeg', quality: 72 })
  }
  await page.close()
  console.log(`rendered ${todo.length} article card(s) in ${((Date.now() - t0) / 1000).toFixed(1)}s`)
}
await browser.close()
writeFileSync(MANIFEST, JSON.stringify(manifest, null, 1) + '\n')
const bytes = FLAT.reduce((n, a) => n + (existsSync(join(ROOT, 'public', cardFile(a.path))) ? statSync(join(ROOT, 'public', cardFile(a.path))).size : 0), 0)
console.log(`article cards: ${FLAT.length} in public/og/ (${(bytes / 1e6).toFixed(1)} MB), ${todo.length} re-rendered; wrote src/data/og-cards.json`)
