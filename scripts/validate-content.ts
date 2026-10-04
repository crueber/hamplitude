/**
 * Validates lesson content against the authoring contract (see CONTENT.md).
 *   bun scripts/validate-content.ts                 # everything authored so far
 *   bun scripts/validate-content.ts T1A T1B         # specific groups
 *   bun scripts/validate-content.ts technician      # one licence
 *   bun scripts/validate-content.ts --missing       # also list groups with no content yet
 * Exits non-zero if any error is found. Warnings don't fail the run.
 */
import { existsSync, readFileSync, readdirSync } from 'node:fs'
import { join, resolve } from 'node:path'
import { POOLS, LICENSES, type LicenseId } from '../src/data'

const ROOT = resolve(import.meta.dir, '..')
const args = process.argv.slice(2)
const showMissing = args.includes('--missing')
const filters = args.filter((a) => !a.startsWith('--'))

const words = (s: string) => s.trim().split(/\s+/).filter(Boolean).length
let errors = 0
let warnings = 0
let checked = 0
const missing: string[] = []

const err = (g: string, m: string) => { errors++; console.log(`  ✗ ${g}: ${m}`) }
const warn = (g: string, m: string) => { warnings++; console.log(`  ! ${g}: ${m}`) }

for (const lic of LICENSES as LicenseId[]) {
  if (filters.length && !filters.some((f) => f === lic || POOLS[lic].subelements.some((s) => s.groups.some((g) => g.id === f)))) continue
  for (const sub of POOLS[lic].subelements) {
    for (const group of sub.groups) {
      if (filters.length && !filters.includes(lic) && !filters.includes(group.id)) continue
      const dir = join(ROOT, 'src/content', lic)
      const jsonPath = join(dir, `${group.id}.json`)
      const mdxPath = join(dir, `${group.id}.mdx`)
      if (!existsSync(jsonPath) && !existsSync(mdxPath)) { missing.push(group.id); continue }
      checked++
      const before = errors
      const g = group.id

      // ---- json ----
      let content: any
      try { content = JSON.parse(readFileSync(jsonPath, 'utf8')) } catch (e) { err(g, `json missing or invalid (${e})`); continue }
      if (typeof content.title !== 'string' || !content.title) err(g, 'title missing')
      else if (content.title.length > 60) warn(g, `title is ${content.title.length} chars (aim <= 50)`)
      if (typeof content.blurb !== 'string' || !content.blurb) err(g, 'blurb missing')
      else if (words(content.blurb) > 28) warn(g, `blurb is ${words(content.blurb)} words (aim <= 22)`)
      const why = content.why ?? {}
      for (const qid of group.questions) {
        const w = why[qid]
        if (!w || typeof w.why !== 'string' || !w.why.trim()) { err(g, `no why for ${qid}`); continue }
        const n = words(w.why)
        if (n > 55) err(g, `${qid} why is ${n} words (max 55, aim <= 30)`)
        else if (n > 40) warn(g, `${qid} why is ${n} words (aim <= 30)`)
        if (n < 4) warn(g, `${qid} why is very short`)
        if (w.trap && words(w.trap) > 35) warn(g, `${qid} trap is ${words(w.trap)} words (aim <= 22)`)
        if (/\b(option|choice|answer)\s+[A-D]\b/i.test(w.why)) err(g, `${qid} why refers to a letter; answers are shuffled`)
      }
      for (const k of Object.keys(why)) if (!group.questions.includes(k)) err(g, `why for unknown question ${k}`)

      // ---- mdx ----
      if (!existsSync(mdxPath)) { err(g, 'lesson .mdx missing'); continue }
      const mdx = readFileSync(mdxPath, 'utf8')
      const tags = [...mdx.matchAll(/<Concept\b[^>]*>/g)].map((m) => m[0])
      if (tags.length === 0) err(g, 'no <Concept> cards')
      const ids = new Set<string>()
      const covered = new Set<string>()
      for (const tag of tags) {
        const id = tag.match(/\bid="([^"]+)"/)?.[1]
        const qs = tag.match(/\bqs="([^"]*)"/)?.[1]
        if (!id) { err(g, `<Concept> without id: ${tag.slice(0, 60)}`); continue }
        if (!/^[a-z0-9-]+$/.test(id)) err(g, `concept id "${id}" must be kebab-case`)
        if (ids.has(id)) err(g, `duplicate concept id ${id}`)
        ids.add(id)
        if (!/\btitle="/.test(tag)) err(g, `concept ${id} has no title`)
        if (!qs) { err(g, `concept ${id} has no qs`); continue }
        for (const q of qs.split(/[\s,]+/).filter(Boolean)) {
          if (!group.questions.includes(q)) err(g, `concept ${id} lists ${q}, which is not in ${g}`)
          covered.add(q)
        }
      }
      for (const q of group.questions) if (!covered.has(q)) err(g, `${q} is not covered by any concept's qs`)
      for (const [qid, w] of Object.entries<any>(why)) if (w.concept && !ids.has(w.concept)) err(g, `${qid} points at unknown concept "${w.concept}"`)
      if (tags.length > 7) warn(g, `${tags.length} concept cards: probably too many, merge related ideas`)

      // imports must resolve; visual rules
      const imports = [...mdx.matchAll(/^import\s+.*?from\s+'(@\/[^']+)'/gm)].map((m) => m[1])
      for (const imp of imports) {
        const p = join(ROOT, 'src', imp.slice(2))
        if (!['.tsx', '.ts', ''].some((ext) => existsSync(p + ext))) err(g, `import not found: ${imp}`)
      }
      if (!imports.some((i) => i.startsWith('@/visuals/')) && !/^\|.*\|$/m.test(mdx)) warn(g, 'no visuals and no tables: this lesson is text only')
      const prose = mdx.replace(/^import .*$/gm, '').replace(/<[A-Za-z][^>]*\/>/g, '')
      if (/(^|\s)<\s?\d/.test(prose)) err(g, 'raw "<" before a number breaks MDX; write "less than" or use &lt;')

      // visuals this group owns
      const vdir = join(ROOT, 'src/visuals', lic)
      if (existsSync(vdir)) {
        for (const f of readdirSync(vdir).filter((f) => f.startsWith(g + '_'))) {
          const src = readFileSync(join(vdir, f), 'utf8')
          const hex = src.match(/#[0-9a-fA-F]{6}\b|#[0-9a-fA-F]{3}\b(?![0-9a-zA-Z])/g)
          if (hex) err(g, `${f} hard-codes colours (${[...new Set(hex)].slice(0, 3).join(', ')}); use the C tokens`)
          if (!/title=/.test(src)) warn(g, `${f} has no accessible title on its <Diagram>`)
        }
      }
      console.log(errors === before ? `✓ ${g}  ${content.title}` : `✗ ${g}  ${content.title ?? ''}`)
    }
  }
}

console.log(`\n${checked} group(s) checked, ${errors} error(s), ${warnings} warning(s)`)
if (showMissing || filters.length === 0) {
  const total = LICENSES.reduce((n, l) => n + POOLS[l].subelements.reduce((m, s) => m + s.groups.length, 0), 0)
  console.log(`${total - missing.length}/${total} groups authored${showMissing ? `; missing: ${missing.join(' ')}` : ''}`)
}
process.exit(errors ? 1 : 0)
