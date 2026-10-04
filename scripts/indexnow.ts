/**
 * Tells IndexNow-enabled search engines (Bing, and through it DuckDuckGo, Yandex, Naver, Seznam...) which URLs
 * changed, so they crawl them within hours instead of weeks. Runs after each deploy (see the workflow).
 * Only active once public/CNAME exists, because IndexNow verifies the key file on the live host.
 *   bun scripts/indexnow.ts
 */
import { siteConfig } from '../site.config.ts'
import seoConfig from '../seo.config.json'

const site = siteConfig()
if (!site.cname) { console.log('indexnow: no custom domain configured (public/CNAME), skipping'); process.exit(0) }
if (!seoConfig.indexNowKey) { console.log('indexnow: no key in seo.config.json, skipping'); process.exit(0) }

const sitemap = await (await fetch(`${site.url}/sitemap.xml`)).text()
const urlList = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1])
if (!urlList.length) { console.error('indexnow: sitemap had no URLs'); process.exit(1) }

// Right after a deploy the CDN may not serve the new key file yet, which IndexNow reports as 403/422: retry with a pause.
let status = 0
for (let attempt = 1; attempt <= 5; attempt++) {
  const res = await fetch('https://api.indexnow.org/indexnow', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
    body: JSON.stringify({ host: site.cname, key: seoConfig.indexNowKey, keyLocation: `${site.url}/${seoConfig.indexNowKey}.txt`, urlList }),
  })
  status = res.status
  console.log(`indexnow: attempt ${attempt}: submitted ${urlList.length} URLs for ${site.cname} -> HTTP ${status}`)
  if (status === 200 || status === 202) break
  if (attempt < 5) await new Promise((r) => setTimeout(r, 30_000))
}
// 200/202 = accepted.
process.exit(status === 200 || status === 202 ? 0 : 1)
