/**
 * Validates compendium articles against the authoring contract (see CONTENT-COMPENDIUM.md).
 *   bun scripts/validate-compendium.ts                       # all written articles
 *   bun scripts/validate-compendium.ts antennas/wire         # a section, a section/sub, or a section/sub/article
 *   bun scripts/validate-compendium.ts half-wave-dipole      # by bare slug
 *   bun scripts/validate-compendium.ts --missing             # also list articles not written yet
 * Errors fail the run; warnings don't.
 */
import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs'
import { join, resolve } from 'node:path'
import { FLAT, SECTIONS, resolveArticle } from '../src/compendium/taxonomy'
import { getGroup } from '../src/data'

const ROOT = resolve(import.meta.dir, '..')
const CONTENT = join(ROOT, 'src/compendium/content')
const args = process.argv.slice(2)
const showMissing = args.includes('--missing')
const filters = args.filter((a) => !a.startsWith('--'))
const words = (s: string) => s.trim().split(/\s+/).filter(Boolean).length

let errors = 0, warnings = 0, checked = 0
const missing: string[] = []
const err = (p: string, m: string) => { errors++; console.log(`  ✗ ${p}: ${m}`) }
const warn = (p: string, m: string) => { warnings++; console.log(`  ! ${p}: ${m}`) }

// ---- orphan files (written but not in the taxonomy) ----
const known = new Set(FLAT.map((a) => a.path))
const walk = (d: string): string[] => (existsSync(d) ? readdirSync(d).flatMap((f) => { const p = join(d, f); return statSync(p).isDirectory() ? walk(p) : [p] }) : [])
for (const f of walk(CONTENT)) {
  const rel = f.slice(CONTENT.length + 1)
  if (!rel.endsWith('.mdx')) { err(rel, 'only .mdx files belong in content/'); continue }
  if (!known.has(rel.replace(/\.mdx$/, ''))) err(rel, 'not in taxonomy.ts (orphan article)')
}

const pascal = (slug: string) => slug.split('-').map((w) => w[0].toUpperCase() + w.slice(1)).join('')
const slugOfFile = new Map(FLAT.map((a) => [pascal(a.slug), a.path]))

const wanted = (path: string, slug: string) =>
  !filters.length || filters.some((f) => path === f || path.startsWith(f + '/') || slug === f)

for (const a of FLAT) {
  if (!wanted(a.path, a.slug)) continue
  const f = join(CONTENT, `${a.path}.mdx`)
  if (!existsSync(f)) { missing.push(a.path); continue }
  checked++
  const before = errors
  const mdx = readFileSync(f, 'utf8')
  const p = a.path

  const prose = mdx.replace(/^import .*$/gm, ' ').replace(/<[A-Za-z][^>]*\/>/g, ' ').replace(/<\/?[A-Za-z][^>]*>/g, ' ').replace(/[`*_#>|]/g, ' ')
  const n = words(prose)
  // reference tables (glossary, formula sheet, band chart...) are legitimately long
  const ref = p.startsWith('reference/tables/')
  const [hard, soft] = ref ? [3200, 2600] : [1100, 750]
  if (n < 120) err(p, `only ~${n} words (min 120)`)
  else if (n > hard) err(p, `~${n} words (max ${hard}, aim 250-600)`)
  else if (n > soft) warn(p, `~${n} words (aim 250-600; be concise)`)

  if (/^# /m.test(mdx)) err(p, 'do not use an h1: the page title comes from the taxonomy')
  const h2s = [...mdx.matchAll(/^## (.+)$/gm)].map((m) => m[1])
  if (h2s.length < 2) warn(p, 'fewer than 2 "##" sections')
  if (h2s.length > 8) warn(p, `${h2s.length} "##" sections: too fragmented`)
  if (/^## Related$/m.test(mdx)) err(p, 'use <Related to="…" /> instead of a hand-written "## Related" heading')

  const imports = [...mdx.matchAll(/^import\s+.*?from\s+'(@\/[^']+)'/gm)].map((m) => m[1])
  for (const imp of imports) {
    const ip = join(ROOT, 'src', imp.slice(2))
    if (!['.tsx', '.ts', ''].some((ext) => existsSync(ip + ext))) err(p, `import not found: ${imp}`)
  }
  if (!imports.some((i) => i.startsWith('@/visuals/')) && !/^\|.*\|$/m.test(mdx)) warn(p, 'no visual and no table: text only')
  if (!/<Related\b/.test(mdx)) warn(p, 'no <Related to="…" /> at the end')

  for (const m of mdx.matchAll(/<Related\s+to="([^"]*)"/g))
    for (const r of m[1].split(/[\s,]+/).filter(Boolean)) if (!resolveArticle(r)) err(p, `<Related> points at unknown article "${r}"`)
  for (const m of mdx.matchAll(/<Ref\s+to="([^"]*)"/g)) if (!resolveArticle(m[1])) err(p, `<Ref> points at unknown article "${m[1]}"`)
  for (const m of mdx.matchAll(/<ExamLink\s+groups="([^"]*)"/g))
    for (const g of m[1].split(/[\s,]+/).filter(Boolean)) if (!getGroup(g)) err(p, `<ExamLink> unknown exam group "${g}"`)
  for (const m of mdx.matchAll(/<Related\s+to="([^"]*)"/g))
    if (m[1].split(/[\s,]+/).some((r) => resolveArticle(r)?.path === p)) err(p, '<Related> links to itself')

  if (/(^|[\s(])<\s?\d/.test(mdx.replace(/^import .*$/gm, ''))) err(p, 'raw "<" before a number breaks MDX: write "less than" or use &lt;')
  if (/\bTODO\b|\bTBD\b|lorem ipsum/i.test(mdx)) err(p, 'contains TODO/TBD/placeholder text')

  console.log(errors === before ? `✓ ${p}  (~${n} words, ${imports.length} visual import${imports.length === 1 ? '' : 's'})` : `✗ ${p}`)
}

// ---- compendium visuals ----
const vdir = join(ROOT, 'src/visuals/compendium')
for (const f of walk(vdir).filter((f) => f.endsWith('.tsx'))) {
  const name = f.slice(vdir.length + 1)
  const src = readFileSync(f, 'utf8')
  const hex = src.match(/#[0-9a-fA-F]{6}\b|#[0-9a-fA-F]{3}\b(?![0-9a-zA-Z])/g)
  if (hex) err(name, `hard-codes colours (${[...new Set(hex)].slice(0, 3).join(', ')}); use the C tokens`)
  const prefix = name.split('_')[0]
  if (!slugOfFile.has(prefix)) warn(name, `name should start with an article slug in PascalCase, e.g. HalfWaveDipole_Pattern.tsx`)
  if (!/title=/.test(src)) warn(name, 'no accessible title on its <Diagram>')
}

const total = FLAT.length
console.log(`\n${checked} article(s) checked, ${errors} error(s), ${warnings} warning(s)`)
if (!filters.length || showMissing) console.log(`${total - missing.length}/${total} articles written${showMissing && missing.length ? `\nmissing:\n  ${missing.join('\n  ')}` : ''}`)
void SECTIONS
process.exit(errors ? 1 : 0)
