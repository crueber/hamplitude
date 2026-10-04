/**
 * Generates src/compendium/generated/{search-index,exam-links}.json from the article MDX files.
 * Runs automatically before `dev` and `build`. The generated folder is git-ignored.
 *   search-index.json  [{ p: path, t: title, s: summary, x: plain text }]   (lazy-loaded by the search box)
 *   exam-links.json    { "T9A": ["antennas/wire/half-wave-dipole", ...] }   (powers "Go deeper" on lessons)
 */
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import { join, resolve } from 'node:path'
import { FLAT } from '../src/compendium/taxonomy'

const ROOT = resolve(import.meta.dir, '..')
const OUT = join(ROOT, 'src/compendium/generated')
mkdirSync(OUT, { recursive: true })

const plain = (mdx: string) =>
  mdx
    .replace(/^import .*$/gm, ' ')
    .replace(/<ExamLink[^>]*\/>/g, ' ')
    .replace(/<Facts[\s\S]*?\/>/g, (m) => [...m.matchAll(/\[\s*'([^']*)'\s*,\s*'([^']*)'/g)].map((x) => `${x[1]} ${x[2]}`).join('. '))
    .replace(/<[^>]+>/g, ' ')
    .replace(/[`*_#>|]/g, ' ')
    .replace(/\[([^\]]*)\]\([^)]*\)/g, '$1')
    .replace(/\{[^}]*\}/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()

const index: { p: string; t: string; s: string; x: string }[] = []
const examLinks: Record<string, string[]> = {}
let written = 0
for (const a of FLAT) {
  const f = join(ROOT, 'src/compendium/content', `${a.path}.mdx`)
  let text = ''
  if (existsSync(f)) {
    const mdx = readFileSync(f, 'utf8')
    text = plain(mdx).slice(0, 5000)
    written++
    for (const m of mdx.matchAll(/<ExamLink\s+groups="([^"]+)"/g))
      for (const g of m[1].split(/[\s,]+/).filter(Boolean)) (examLinks[g] ??= []).push(a.path)
  }
  index.push({ p: a.path, t: a.title, s: a.summary, x: text })
}
writeFileSync(join(OUT, 'search-index.json'), JSON.stringify(index))
writeFileSync(join(OUT, 'exam-links.json'), JSON.stringify(examLinks))
console.log(`compendium: ${written}/${FLAT.length} articles indexed, ${Object.keys(examLinks).length} exam groups linked`)
