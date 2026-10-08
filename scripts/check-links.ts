/**
 * Checks every external link in compendium articles and lessons actually resolves.
 *   bun scripts/check-links.ts [path-filter]
 * 404/410/DNS failures fail the run. 401/403/405/429/999 usually mean the site blocks automated requests, so they are reported
 * as "unverified" (open them by hand) and do not fail. Be gentle: low concurrency, one request per unique URL.
 */
import { readdirSync, readFileSync, statSync } from 'node:fs'
import { join, resolve } from 'node:path'

const ROOT = resolve(import.meta.dir, '..')
const filter = process.argv[2]
const walk = (d: string): string[] => readdirSync(d).flatMap((f) => { const p = join(d, f); return statSync(p).isDirectory() ? walk(p) : [p] })
const files = [...walk(join(ROOT, 'src/compendium/content')), ...walk(join(ROOT, 'src/content'))].filter((f) => f.endsWith('.mdx') && (!filter || f.includes(filter)))

const where = new Map<string, string[]>()
for (const f of files) {
  const text = readFileSync(f, 'utf8')
  for (const m of text.matchAll(/https?:\/\/[^\s)"'<>\]]+/g)) {
    const url = m[0].replace(/[.,;:]+$/, '')
    if (/example\.com|localhost/.test(url)) continue
    ;(where.get(url) ?? where.set(url, []).get(url)!).push(f.slice(ROOT.length + 1))
  }
}

const UA = 'Mozilla/5.0 (compatible; HamplitudeLinkCheck/1.0; +https://hamplitude.net)'
async function check(url: string): Promise<{ status: number | string }> {
  for (const method of ['HEAD', 'GET']) {
    try {
      const res = await fetch(url, { method, redirect: 'follow', headers: { 'user-agent': UA, accept: 'text/html,*/*' }, signal: AbortSignal.timeout(20_000) })
      if (res.ok) return { status: res.status }
      if (method === 'GET' || ![403, 405, 404, 501].includes(res.status)) return { status: res.status }
    } catch (e) {
      if (method === 'GET') return { status: e instanceof Error ? (e.name === 'TimeoutError' ? 'timeout' : (e.cause as Error | undefined)?.message ?? e.message) : 'error' }
    }
  }
  return { status: 'error' }
}

const urls = [...where.keys()]
const bad: string[] = [], unverified: string[] = []
let next = 0
await Promise.all(Array.from({ length: 6 }, async () => {
  while (next < urls.length) {
    const url = urls[next++]
    const { status } = await check(url)
    const where1 = where.get(url)!.slice(0, 2).join(', ')
    if (status === 200 || (typeof status === 'number' && status < 300)) continue
    if (typeof status === 'number' && [401, 403, 405, 429, 999].includes(status)) unverified.push(`${status}  ${url}  (${where1})`)
    else bad.push(`${status}  ${url}  (${where1})`)
  }
}))
console.log(`${urls.length} unique external links in ${files.length} file(s)`)
if (unverified.length) console.log(`\nunverified (site blocks bots; check by hand):\n  ${unverified.join('\n  ')}`)
if (bad.length) console.log(`\nBROKEN:\n  ${bad.join('\n  ')}`)
else console.log('\n✓ no broken links')
process.exit(bad.length ? 1 : 0)
