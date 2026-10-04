import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { POOLS, getGroup, type LicenseId, type Question } from '@/data'
import { getGroupContent, getWhy } from '@/content'
import { recordAnswer } from '@/lib/srs'
import { update, type ExamResult } from '@/lib/store'
import { examSession } from '@/lib/sessions'
import { QuestionCard } from './QuestionCard'
import { Rich } from './Rich'

const LETTERS = ['A', 'B', 'C', 'D']
const mmss = (s: number) => `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`

export function ExamRunner({ license }: { license: LicenseId }) {
  const pool = POOLS[license]
  const seed = useRef(Math.random().toString(36).slice(2)).current
  const [qs, setQs] = useState<Question[]>(() => examSession(license))
  const [answers, setAnswers] = useState<Record<string, number>>({}) // qid -> original index
  const [picked, setPicked] = useState<Record<string, number>>({}) // qid -> display index
  const [flags, setFlags] = useState<Set<string>>(new Set())
  const [i, setI] = useState(0)
  const [result, setResult] = useState<ExamResult | null>(null)
  const [elapsed, setElapsed] = useState(0)
  const t0 = useRef(Date.now())

  useEffect(() => {
    if (result) return
    const id = setInterval(() => setElapsed(Math.floor((Date.now() - t0.current) / 1000)), 1000)
    return () => clearInterval(id)
  }, [result])

  const q = qs[i]
  const answered = Object.keys(answers).length

  function submit() {
    const missed = qs.filter((x) => answers[x.id] !== x.answer).map((x) => x.id)
    const correct = qs.length - missed.length
    const r: ExamResult = {
      id: Math.random().toString(36).slice(2),
      license,
      at: Date.now(),
      correct,
      total: qs.length,
      passed: correct >= pool.exam.toPass,
      seconds: Math.floor((Date.now() - t0.current) / 1000),
      missed,
    }
    // exam answers feed spaced repetition too — missed ones become due
    for (const x of qs) recordAnswer(x.id, answers[x.id] === x.answer)
    update((s) => ({ ...s, exams: [r, ...s.exams].slice(0, 30) }))
    setResult(r)
    window.scrollTo({ top: 0 })
  }

  if (result) return <ExamResultView license={license} result={result} qs={qs} answers={answers} onRetry={() => { setQs(examSession(license)); setAnswers({}); setPicked({}); setFlags(new Set()); setI(0); setResult(null); t0.current = Date.now(); setElapsed(0) }} />

  return (
    <div className="quiz" data-license={license}>
      <div className="quiz-top">
        <Link className="x" to={`/${license}`} onClick={(e) => { if (answered && !confirm('Leave the exam? Your answers will be lost.')) e.preventDefault() }}>✕ Exit</Link>
        <div className="quiz-bar"><i style={{ width: `${(answered / qs.length) * 100}%` }} /></div>
        <span className="quiz-count">{answered}/{qs.length} answered</span>
        <span className="timer">{mmss(elapsed)}</span>
      </div>
      <div className="exam-nav">
        {qs.map((x, n) => (
          <button
            key={x.id} onClick={() => setI(n)} aria-label={`Question ${n + 1}`}
            className={[x.id in answers ? 'answered' : '', n === i ? 'current' : '', flags.has(x.id) ? 'flagged' : ''].join(' ')}
          >{n + 1}</button>
        ))}
      </div>
      <QuestionCard
        key={q.id} question={q} seed={`${seed}`} hideFeedback revealed={false}
        picked={q.id in picked ? picked[q.id] : null}
        onPick={(di, orig) => { setPicked((p) => ({ ...p, [q.id]: di })); setAnswers((a) => ({ ...a, [q.id]: orig })) }}
      />
      <div className="quiz-actions">
        <div style={{ display: 'flex', gap: 8 }}>
          <button className="btn" disabled={i === 0} onClick={() => setI(i - 1)}>← Back</button>
          <button className="btn btn-ghost" onClick={() => setFlags((f) => { const n = new Set(f); n.has(q.id) ? n.delete(q.id) : n.add(q.id); return n })}>
            {flags.has(q.id) ? '⚑ Unflag' : '⚐ Flag'}
          </button>
        </div>
        {i < qs.length - 1 ? (
          <button className="btn btn-primary btn-lg" onClick={() => setI(i + 1)}>Next →</button>
        ) : (
          <button className="btn btn-primary btn-lg" onClick={() => { if (answered === qs.length || confirm(`${qs.length - answered} unanswered. Submit anyway?`)) submit() }}>Submit exam</button>
        )}
      </div>
    </div>
  )
}

function ExamResultView({ license, result, qs, answers, onRetry }: { license: LicenseId; result: ExamResult; qs: Question[]; answers: Record<string, number>; onRetry: () => void }) {
  const pool = POOLS[license]
  const missed = qs.filter((q) => result.missed.includes(q.id))
  const bySub = pool.subelements.map((s) => {
    const mine = qs.filter((q) => q.group.startsWith(s.id))
    const right = mine.filter((q) => answers[q.id] === q.answer).length
    return { id: s.id, title: s.title, total: mine.length, right }
  })
  return (
    <div className="quiz" data-license={license} style={{ maxWidth: 820 }}>
      <div className="summary">
        <span className={`verdict ${result.passed ? 'pass' : 'fail'}`}>{result.passed ? 'PASSED' : 'NOT YET'}</span>
        <div className="score-hero">
          <div>
            <div className="score-num">{result.correct}<span style={{ color: 'var(--muted)', fontSize: 32 }}>/{result.total}</span></div>
            <div style={{ color: 'var(--muted)', fontSize: 14 }}>{Math.round((result.correct / result.total) * 100)}% · pass line {pool.exam.toPass}/{pool.exam.questions} (74%) · {mmss(result.seconds)}</div>
          </div>
        </div>
        <div className="breakdown">
          {bySub.map((b) => (
            <div className="bd-row" key={b.id}>
              <span className="sid">{b.id}</span>
              <div>
                <div style={{ fontSize: 13, color: 'var(--ink-2)', marginBottom: 3 }}>{titleCase(b.title)}</div>
                <div className="meter"><i className={b.right < b.total ? 'bad' : ''} style={{ width: `${(b.right / b.total) * 100}%`, background: b.right === b.total ? 'var(--good)' : undefined }} /></div>
              </div>
              <span style={{ textAlign: 'right', fontFamily: 'var(--font-mono)', fontSize: 13 }}>{b.right}/{b.total}</span>
            </div>
          ))}
        </div>
        <div className="actions">
          <button className="btn btn-primary" onClick={onRetry}>New exam</button>
          <Link className="btn" to={`/${license}`}>Back to lessons</Link>
        </div>
      </div>
      {missed.length > 0 && (
        <>
          <h2 className="section-title" style={{ marginTop: 36 }}>Review what you missed</h2>
          <div className="missed-list">
            {missed.map((q) => {
              const why = getWhy(q.group, q.id)
              const mine = answers[q.id]
              const info = getGroup(q.group)
              return (
                <div className="missed" key={q.id}>
                  <div className="qmeta"><span className="qid">{q.id}</span></div>
                  <p className="qtext">{q.q}</p>
                  <p className="a">{mine == null ? 'Unanswered.' : <>You: {LETTERS[mine]}. {q.choices[mine]}</>}</p>
                  <p className="a"><b>Answer: {q.choices[q.answer]}</b></p>
                  {why && <p className="a"><Rich text={why.why} /></p>}
                  <Link to={`/${license}/${q.group}${why?.concept ? `#${why.concept}` : ''}`} style={{ fontSize: 14, fontWeight: 650 }}>
                    Lesson: {getGroupContent(q.group)?.title ?? info?.group.id} →
                  </Link>
                </div>
              )
            })}
          </div>
        </>
      )}
    </div>
  )
}

const titleCase = (s: string) => s.toLowerCase().replace(/(^|\s|-)([a-z])/g, (_, a, b) => a + b.toUpperCase())
