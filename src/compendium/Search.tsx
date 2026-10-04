import { useEffect, useMemo, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { loadSearchIndex, type SearchDoc } from './loader'
import { articleHref, getArticle } from './taxonomy'

const tokens = (q: string) => q.toLowerCase().split(/[^a-z0-9.+/-]+/).filter((t) => t.length > 0)

function search(index: SearchDoc[], q: string) {
  const ts = tokens(q)
  if (!ts.length) return []
  const out: { doc: SearchDoc; score: number; snippet: string }[] = []
  for (const doc of index) {
    const title = doc.t.toLowerCase(), sum = doc.s.toLowerCase(), text = doc.x.toLowerCase()
    let score = 0
    let ok = true
    for (const t of ts) {
      const inTitle = title.includes(t), inSum = sum.includes(t)
      const inText = text.split(t).length - 1
      if (!inTitle && !inSum && !inText) { ok = false; break }
      score += (inTitle ? 12 : 0) + (title.startsWith(t) ? 6 : 0) + (inSum ? 4 : 0) + Math.min(inText, 5)
    }
    if (!ok) continue
    const i = text.indexOf(ts[0])
    const snippet = i < 0 ? doc.s : (i > 40 ? '…' : '') + doc.x.slice(Math.max(0, i - 40), i + 90).trim() + '…'
    out.push({ doc, score, snippet })
  }
  return out.sort((a, b) => b.score - a.score).slice(0, 8)
}

export function Search({ big = false, onNavigate }: { big?: boolean; onNavigate?: () => void }) {
  const [q, setQ] = useState('')
  const [index, setIndex] = useState<SearchDoc[] | null>(null)
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLInputElement>(null)
  const results = useMemo(() => (index ? search(index, q) : []), [index, q])

  // "/" focuses search from anywhere on the page
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const t = e.target as HTMLElement
      if (e.key === '/' && !/INPUT|TEXTAREA|SELECT/.test(t.tagName) && !t.isContentEditable) { e.preventDefault(); ref.current?.focus() }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  const ensureIndex = () => { if (!index) loadSearchIndex().then(setIndex) }

  return (
    <div className={`cmp-search${big ? ' big' : ''}`} onBlur={(e) => { if (!e.currentTarget.contains(e.relatedTarget)) setOpen(false) }}>
      <input
        ref={ref} type="search" value={q} placeholder="Search the compendium…  ( / )" aria-label="Search the compendium"
        onFocus={() => { ensureIndex(); setOpen(true) }}
        onChange={(e) => { setQ(e.target.value); setOpen(true) }}
        onKeyDown={(e) => { if (e.key === 'Escape') { setQ(''); (e.target as HTMLInputElement).blur() } }}
      />
      {open && q.trim() && (
        <div className="cmp-results" role="listbox">
          {!index ? <div className="cmp-none">Loading…</div> : results.length === 0 ? <div className="cmp-none">No matches for “{q}”.</div> : results.map(({ doc, snippet }) => {
            const a = getArticle(doc.p)
            return (
              <Link key={doc.p} to={articleHref(doc.p)} role="option" onClick={() => { setOpen(false); setQ(''); onNavigate?.() }}>
                <strong>{doc.t}</strong>
                <em>{a?.section.title} › {a?.sub.title}</em>
                <span>{snippet}</span>
              </Link>
            )
          })}
        </div>
      )}
    </div>
  )
}
