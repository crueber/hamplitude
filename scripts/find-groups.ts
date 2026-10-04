/** Find exam syllabus groups by keyword, to fill in <ExamLink groups="…" />.   bun scripts/find-groups.ts dipole "feed line" */
import { existsSync, readFileSync } from 'node:fs'
import { join, resolve } from 'node:path'
import { LICENSES, POOLS } from '../src/data'

const ROOT = resolve(import.meta.dir, '..')
const kws = process.argv.slice(2).map((k) => k.toLowerCase())
if (!kws.length) { console.error('usage: bun scripts/find-groups.ts <keyword> [keyword…]'); process.exit(1) }
let n = 0
for (const lic of LICENSES)
  for (const s of POOLS[lic].subelements)
    for (const g of s.groups) {
      const f = join(ROOT, 'src/content', lic, `${g.id}.json`)
      const title = existsSync(f) ? JSON.parse(readFileSync(f, 'utf8')).title : ''
      const hay = `${g.topics} ${title}`.toLowerCase()
      if (kws.some((k) => hay.includes(k))) { n++; console.log(`${g.id}  [${lic}]  ${title}  —  ${g.topics.slice(0, 110)}`) }
    }
if (!n) console.log('no matching exam groups')
