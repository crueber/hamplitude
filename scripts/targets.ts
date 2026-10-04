/** Shared by sweep.ts and interact.ts: which pages to visit, selected by CLI filters. */
import { existsSync, readdirSync } from 'node:fs'
import { join, resolve } from 'node:path'
import { FLAT } from '../src/compendium/taxonomy'

const ROOT = resolve(import.meta.dir, '..')
export interface Target { label: string; url: string; wait: string }

export function targets(filters: string[]): Target[] {
  const out: Target[] = []
  const all = !filters.length
  // exam lessons: filter by licence name or group id
  for (const lic of ['technician', 'general', 'extra']) {
    for (const f of readdirSync(join(ROOT, 'src/content', lic)).filter((f) => f.endsWith('.mdx'))) {
      const id = f.replace('.mdx', '')
      if (all || filters.includes(lic) || filters.includes(id)) out.push({ label: `${lic}/${id}`, url: `/${lic}/${id}`, wait: '.concept' })
    }
  }
  // compendium articles: filter by "compendium", a section, "section/sub", a full path, or a bare slug
  for (const a of FLAT) {
    if (!existsSync(join(ROOT, 'src/compendium/content', `${a.path}.mdx`))) continue
    if (all || filters.some((f) => f === 'compendium' || a.path === f || a.path.startsWith(f + '/') || a.slug === f))
      out.push({ label: `compendium/${a.path}`, url: `/compendium/${a.path}`, wait: '.article-body h2' })
  }
  return out
}
