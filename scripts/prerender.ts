/**
 * Static site generation. Runs after `vite build` and `vite build --ssr`:
 * renders every indexable route to dist/<route>/index.html with full content and SEO tags, so crawlers get real
 * pages without running JavaScript, and the browser hydrates them. Also writes sitemap.xml, robots.txt,
 * site.webmanifest, 404.html (the SPA fallback for practice/exam/etc.) and the IndexNow key file.
 */
import { mkdirSync, readFileSync, statSync, writeFileSync } from 'node:fs'
import { dirname, join, resolve } from 'node:path'
import { pathToFileURL } from 'node:url'
import { siteConfig } from '../site.config.ts'
import seoConfig from '../seo.config.json'

const ROOT = resolve(import.meta.dir, '..')
const site = siteConfig(ROOT)
const DIST = join(ROOT, 'dist')
const ssr = await import(pathToFileURL(join(ROOT, 'dist-ssr/entry-server.js')).href)
const template = readFileSync(join(DIST, 'index.html'), 'utf8')
const leads: Record<string, string> = JSON.parse(readFileSync(join(ROOT, 'src/compendium/generated/descriptions.json'), 'utf8'))

const extraLinks = [
  `<link rel="icon" href="${site.base}favicon.ico" sizes="48x48">`,
  `<link rel="apple-touch-icon" href="${site.base}apple-touch-icon.png">`,
  `<link rel="manifest" href="${site.base}site.webmanifest">`,
].join('\n    ')

// optional privacy-friendly analytics: injected only when a GoatCounter site code is configured
const analytics = seoConfig.goatcounterCode
  ? `\n    <script data-goatcounter="https://${seoConfig.goatcounterCode}.goatcounter.com/count" data-goatcounter-settings='{"no_onload":true}' async src="https://gc.zgo.at/count.js"></script>`
  : ''

function assemble(seo: unknown, body: string, prerenderedPath: string | null): string {
  let h = template
    .replace(/<title>[\s\S]*?<\/title>\s*/, '')
    .replace(/<meta name="description"[^>]*>\s*/, '')
    .replace('</head>', `    ${ssr.headHtml(seo)}\n    ${extraLinks}${analytics}\n  </head>`)
    .replace('<div id="root"></div>', `<div id="root">${body}</div>`)
  // the page records which URL it was rendered for, so the browser only hydrates it when it is really at that URL
  if (prerenderedPath !== null) h = h.replace('<html lang="en">', `<html lang="en" data-prerendered data-pre-path="${site.base.replace(/\/$/, '')}${prerenderedPath === '/' ? '/' : prerenderedPath + '/'}">`)
  return h
}

const write = (rel: string, data: string) => {
  const f = join(DIST, rel)
  mkdirSync(dirname(f), { recursive: true })
  writeFileSync(f, data)
}

// ---- pages ----
const paths: string[] = ssr.allPages()
let largest = { path: '', bytes: 0 }
let total = 0
const failures: string[] = []

async function one(path: string) {
  const { html, status } = await ssr.render(path)
  const seo = ssr.seoFor(path)
  // an article's opening paragraph makes a far better description than its one-line summary
  const lead = path.startsWith('/compendium/') ? leads[path.replace('/compendium/', '')] : ''
  if (lead) seo.description = ssr.clip(lead.length >= 80 ? lead : `${seo.description} ${lead}`)
  if (status !== 200 || !html.includes('<h1')) throw new Error(`bad render (status ${status}, ${html.includes('<h1') ? 'has' : 'no'} <h1>)`)
  const out = assemble(seo, html, path)
  write(path === '/' ? 'index.html' : `${path}/index.html`, out)
  total += out.length
  if (out.length > largest.bytes) largest = { path, bytes: out.length }
}

const t0 = Date.now()
for (let i = 0; i < paths.length; i += 8)
  await Promise.all(paths.slice(i, i + 8).map((p) => one(p).catch((e) => failures.push(`${p}: ${e instanceof Error ? e.message : e}`))))
if (failures.length) {
  console.error(`prerender failed for ${failures.length} page(s):\n  ${failures.slice(0, 15).join('\n  ')}`)
  process.exit(1)
}

// ---- SPA fallback (GitHub Pages serves 404.html for unknown paths): practice, exam, review, settings... ----
write('404.html', assemble(ssr.seoFor('/404'), '', null))

// ---- sitemap, robots, manifest, IndexNow key ----
const today = new Date().toISOString().slice(0, 10)
write('sitemap.xml', `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${paths.map((p) => `  <url><loc>${ssr.canonicalUrl(p)}</loc><lastmod>${today}</lastmod></url>`).join('\n')}
</urlset>
`)
write('robots.txt', `User-agent: *\nAllow: /\n\nSitemap: ${site.url}/sitemap.xml\n`)
write('site.webmanifest', JSON.stringify({
  name: 'Hamplitude', short_name: 'Hamplitude', lang: 'en',
  description: 'Visual, concept-first ham radio exam prep and a free ham radio compendium.',
  start_url: site.base, scope: site.base, display: 'standalone', background_color: '#0b1218', theme_color: '#0b1218',
  icons: [
    { src: `${site.base}icon-192.png`, sizes: '192x192', type: 'image/png' },
    { src: `${site.base}icon-512.png`, sizes: '512x512', type: 'image/png' },
  ],
}, null, 2))
if (seoConfig.indexNowKey) write(`${seoConfig.indexNowKey}.txt`, seoConfig.indexNowKey)

const mb = (n: number) => (n / 1e6).toFixed(1)
console.log(`prerendered ${paths.length} pages in ${((Date.now() - t0) / 1000).toFixed(1)}s (${mb(total)} MB HTML; largest ${largest.path} ${(largest.bytes / 1e3).toFixed(0)} KB)`)
console.log(`site: ${site.url}/  (base ${site.base})  ·  wrote 404.html, sitemap.xml, robots.txt, site.webmanifest`)
void statSync
