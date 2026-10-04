/**
 * Find reusable visuals. Prints each visual's exported component(s) and its doc comment.
 *   bun scripts/list-visuals.ts              # everything
 *   bun scripts/list-visuals.ts dipole swr   # only those whose file name, exports or description match any keyword
 * Import with:  import { Name } from '@/visuals/<folder>/<File>'
 */
import { readdirSync, readFileSync } from 'node:fs'
import { join, resolve } from 'node:path'

const ROOT = resolve(import.meta.dir, '..')
const kws = process.argv.slice(2).map((k) => k.toLowerCase())
const rows: string[] = []
for (const dir of ['shared', 'technician', 'general', 'extra', 'compendium']) {
  let files: string[] = []
  try { files = readdirSync(join(ROOT, 'src/visuals', dir)).filter((f) => f.endsWith('.tsx')).sort() } catch { continue }
  for (const f of files) {
    const src = readFileSync(join(ROOT, 'src/visuals', dir, f), 'utf8')
    const exports = [...src.matchAll(/export (?:function|const) ([A-Z]\w*)/g)].map((m) => m[1])
    if (!exports.length) continue
    const doc = src.match(/\/\*\*\s*([\s\S]*?)\*\//)?.[1]?.replace(/\s*\*\s*/g, ' ').trim().slice(0, 150) ?? ''
    const line = `@/visuals/${dir}/${f.replace('.tsx', '')}  { ${exports.join(', ')} }  ${doc}`
    if (!kws.length || kws.some((k) => line.toLowerCase().includes(k))) rows.push(line)
  }
}
console.log(rows.join('\n'))
console.error(`\n${rows.length} visual file(s)`)
