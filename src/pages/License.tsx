import { Link, Navigate, useParams } from 'react-router-dom'
import { LICENSE_BLURB, POOLS, isLicense } from '@/data'
import { getGroupContent, hasLesson } from '@/content'
import { useStore } from '@/lib/store'
import { allGroupStats, licenseStats, pct } from '@/lib/stats'
import { dueCount } from '@/lib/sessions'
import { Ring } from '@/components/Ring'

const titleCase = (s: string) => s.toLowerCase().replace(/(^|\s|-|\/)([a-z])/g, (_, a, b) => a + b.toUpperCase()).replace(/\bAnd\b/g, 'and')

export function LicensePage() {
  const { license } = useParams()
  const cards = useStore((s) => s.cards)
  const read = useStore((s) => s.lessonsRead)
  const exams = useStore((s) => s.exams)
  if (!isLicense(license)) return <Navigate to="/" replace />
  const pool = POOLS[license]
  const gs = allGroupStats(cards, license)
  const st = licenseStats(cards, license)
  const due = dueCount(license)
  const mine = exams.filter((e) => e.license === license).slice(0, 6)

  return (
    <div className="wrap" data-license={license}>
      <div className="page-head">
        <div className="row">
          <Ring value={pct(st.mastered, st.total)} size={84} stroke={8} />
          <div>
            <span className="badge">{LICENSE_BLURB[license].tagline}</span>
            <h1>{pool.name} class</h1>
            <p className="meta">
              {st.mastered} of {st.total} questions mastered · {pool.exam.questions}-question exam, {pool.exam.toPass} to pass · {pool.release}
            </p>
          </div>
        </div>
        <div className="actions">
          <Link className="btn btn-primary" to={`/${license}/review`}>
            {due > 0 ? `Review ${due} due` : 'Smart practice'}
          </Link>
          <Link className="btn" to={`/${license}/exam`}>Practice exam</Link>
          <Link className="btn btn-ghost" to={`/browse/${license}`}>Browse all questions</Link>
        </div>
        {mine.length > 0 && (
          <div className="history" aria-label="Recent exams">
            {mine.map((e) => (
              <span key={e.id} className={`hist ${e.passed ? 'pass' : 'fail'}`}>
                {e.correct}/{e.total} · {new Date(e.at).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
              </span>
            ))}
          </div>
        )}
      </div>

      {pool.subelements.map((s) => (
        <section key={s.id}>
          <div className="sub-head">
            <span className="sub-id">{s.id}</span>
            <h2>{titleCase(s.title)}</h2>
            <span className="weight">{s.examQuestions} of {pool.exam.questions} exam questions</span>
          </div>
          <div className="group-grid">
            {s.groups.map((g) => {
              const c = getGroupContent(g.id)
              const stat = gs.get(g.id)!
              return (
                <Link key={g.id} to={`/${license}/${g.id}`} className="group-card">
                  <div className="gid">
                    <span>{g.id}</span>
                    {read[g.id] ? <span title="Lesson read">✓ read</span> : !hasLesson(g.id) ? <span className="soon">soon</span> : null}
                  </div>
                  <h3>{c?.title ?? g.topics.split(';')[0]}</h3>
                  <p>{c?.blurb ?? g.topics}</p>
                  <div className="meter" aria-hidden>
                    <i style={{ width: `${pct(stat.mastered, stat.total)}%` }} />
                    <i className="seen" style={{ width: `${pct(stat.seen - stat.mastered, stat.total)}%` }} />
                  </div>
                  <div className="gstat"><span>{stat.mastered}/{stat.total} mastered</span><span>{stat.total} Qs</span></div>
                </Link>
              )
            })}
          </div>
        </section>
      ))}
    </div>
  )
}
