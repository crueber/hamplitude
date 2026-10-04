/**
 * Renders the social-sharing card and the icon set into public/. Run when the branding changes:
 *   bun scripts/make-brand-assets.ts
 * Output: og.png (1200x630), icon-192.png, icon-512.png, apple-touch-icon.png, favicon.ico
 */
import { chromium } from 'playwright-core'
import { mkdtempSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join, resolve } from 'node:path'
import { pathToFileURL } from 'node:url'

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
h1{position:absolute;left:72px;top:156px;width:1080px;font-size:94px;line-height:1.04;letter-spacing:-.04em;font-weight:700}
h1 em{font-style:normal;color:#2dd4bf}
.chips{position:absolute;left:72px;top:372px;display:flex;gap:14px;font-family:'JB',monospace;font-size:24px;font-weight:600}
.chips span{padding:10px 20px;border-radius:99px;border:2px solid #2d4355;color:#b9c7d3}
.chips .a{color:#fbbf24;border-color:#7a5a12}
</style>
<div class="top">${MARK(56, 13)}<span>Ham<b>plitude</b></span></div>
<h1>Understand ham radio.<br><em>Don't memorize it.</em></h1>
<div class="chips"><span>Technician</span><span>General</span><span>Extra</span><span class="a">Compendium</span></div>
<div class="wave">${wave(1200, 150)}</div>`

const ICON = (px: number, radius: number) => `<!doctype html><meta charset="utf-8"><style>*{margin:0}body{width:${px}px;height:${px}px;background:transparent}</style>${MARK(px, radius)}`

const out = mkdtempSync(join(tmpdir(), 'hx-brand-'))
const browser = await chromium.launch({ executablePath: '/usr/bin/chromium', args: ['--no-sandbox', '--allow-file-access-from-files'] })
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
await shot(OG, 1200, 630, 'og.png')
await shot(ICON(512, 112), 512, 512, 'icon-512.png', true)
await shot(ICON(192, 42), 192, 192, 'icon-192.png', true)
await shot(ICON(180, 0), 180, 180, 'apple-touch-icon.png') // iOS rounds the corners itself
await shot(ICON(48, 11), 48, 48, 'favicon-48.png', true)
await browser.close()

// favicon.ico: a single 48x48 PNG wrapped in an ICO container
import { readFileSync, unlinkSync } from 'node:fs'
const png = readFileSync(join(ROOT, 'public/favicon-48.png'))
const head = Buffer.alloc(22)
head.writeUInt16LE(0, 0); head.writeUInt16LE(1, 2); head.writeUInt16LE(1, 4)
head[6] = 48; head[7] = 48; head[8] = 0; head[9] = 0
head.writeUInt16LE(1, 10); head.writeUInt16LE(32, 12); head.writeUInt32LE(png.length, 14); head.writeUInt32LE(22, 18)
writeFileSync(join(ROOT, 'public/favicon.ico'), Buffer.concat([head, png]))
unlinkSync(join(ROOT, 'public/favicon-48.png'))
console.log('wrote public/favicon.ico')
