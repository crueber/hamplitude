import { useMemo, useState } from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'
import { POOLS, isLicense } from '@/data'
import { getWhy } from '@/content'
import { Rich } from '@/components/Rich'

export function Browse() {
  const { license } = useParams()
  const [term, setTerm] = useState('')
  const pool = isLicense(license) ? POOLS[license] : null
  const hits = useMemo(() => {
    if (!pool) return []
    const t = term.trim().toLowerCase()
    if (!t) return pool.questions.slice(0, 40)
    return pool.questions.filter((q) => q.id.toLowerCase().includes(t) || q.q.toLowerCase().includes(t) || q.choices.some((c) => c.toLowerCase().includes(t))).slice(0, 80)
  }, [pool, term])
  if (!pool || !isLicense(license)) return <Navigate to="/" replace />
  return (
    <div className="wrap" data-license={license} style={{ maxWidth: 820 }}>
      <div className="page-head">
        <h1>{pool.name} question bank</h1>
        <p className="meta">All {pool.questions.length} official questions. Search by words or id (e.g. "T5D02").</p>
      </div>
      <input className="search" placeholder="Search questions…" value={term} onChange={(e) => setTerm(e.target.value)} autoFocus />
      <div className="qlist">
        {hits.map((q) => {
          const why = getWhy(q.group, q.id)
          return (
            <details key={q.id} className="qrow" style={{ display: 'block' }}>
              <summary style={{ cursor: 'pointer', display: 'flex', gap: 12 }}>
                <span className="qid">{q.id}</span><span>{q.q}</span>
              </summary>
              <div style={{ marginTop: 10, paddingLeft: 4 }}>
                {q.choices.map((c, i) => (
                  <div key={i} style={{ padding: '3px 0', fontWeight: i === q.answer ? 700 : 400, color: i === q.answer ? 'var(--good)' : 'var(--ink-2)' }}>
                    {'ABCD'[i]}. {c}
                  </div>
                ))}
                {why && <p style={{ marginTop: 8, color: 'var(--ink-2)' }}><Rich text={why.why} /></p>}
                <Link to={`/${license}/${q.group}`} style={{ fontSize: 14 }}>Lesson {q.group} →</Link>
              </div>
            </details>
          )
        })}
        {hits.length === 0 && <div className="empty">No questions match.</div>}
      </div>
    </div>
  )
}
