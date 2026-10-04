import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import type { LicenseId, Question } from '@/data'
import { recordAnswer } from '@/lib/srs'
import { choiceOrder } from '@/lib/shuffle'
import { getState } from '@/lib/store'
import { QuestionCard } from './QuestionCard'

interface QuizProps {
  license: LicenseId
  questions: Question[]
  backTo: string
  backLabel: string
  /** shown on the finish screen */
  title: string
  onRestart?: () => void
  extraAction?: { to: string; label: string }
}

/**
 * Practice runner. First attempt at each question updates spaced repetition;
 * missed questions are asked again later in the same session for reinforcement.
 */
export function Quiz({ license, questions, backTo, backLabel, title, onRestart, extraAction }: QuizProps) {
  const seed = useRef(Math.random().toString(36).slice(2)).current
  const [queue, setQueue] = useState<Question[]>(questions)
  const [i, setI] = useState(0)
  const [picked, setPicked] = useState<number | null>(null)
  const [firstTry, setFirstTry] = useState<Record<string, boolean>>({})
  const [requeued, setRequeued] = useState<Set<string>>(new Set())

  const q = queue[i]
  const done = i >= queue.length
  const revealed = picked != null
  const attemptSeed = `${seed}:${i}`

  const order = useMemo(
    () => (q ? choiceOrder(q.choices, `${attemptSeed}:${q.id}`, getState().settings.shuffle) : []),
    [q, attemptSeed],
  )

  const pick = useCallback(
    (di: number, orig: number) => {
      if (!q || picked != null) return
      setPicked(di)
      const correct = orig === q.answer
      if (!(q.id in firstTry)) {
        recordAnswer(q.id, correct)
        setFirstTry((f) => ({ ...f, [q.id]: correct }))
      }
      if (!correct && !requeued.has(q.id)) {
        setRequeued((s) => new Set(s).add(q.id))
        setQueue((cur) => {
          const next = [...cur]
          next.splice(Math.min(cur.length, i + 4), 0, q)
          return next
        })
      }
    },
    [q, picked, firstTry, requeued, i],
  )

  const next = useCallback(() => {
    setPicked(null)
    setI((n) => n + 1)
  }, [])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.metaKey || e.ctrlKey || e.altKey) return
      const k = e.key.toLowerCase()
      if (!revealed) {
        const idx = 'abcd'.indexOf(k) >= 0 ? 'abcd'.indexOf(k) : '1234'.indexOf(k)
        if (idx >= 0 && idx < 4 && q) pick(idx, order[idx])
      } else if (k === 'enter' || k === ' ' || k === 'arrowright') {
        e.preventDefault()
        next()
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [revealed, q, order, pick, next])

  if (queue.length === 0)
    return (
      <div className="quiz" data-license={license}>
        <div className="summary">
          <h2>Nothing to practise yet</h2>
          <p>You're all caught up. New cards appear as you learn more lessons.</p>
          <div className="actions"><Link className="btn btn-primary" to={backTo}>{backLabel}</Link></div>
        </div>
      </div>
    )

  if (done) {
    const total = Object.keys(firstTry).length
    const right = Object.values(firstTry).filter(Boolean).length
    const pct = total ? Math.round((right / total) * 100) : 0
    return (
      <div className="quiz" data-license={license}>
        <div className="summary">
          <div style={{ fontSize: 44 }}>{pct >= 80 ? '📡' : pct >= 50 ? '📶' : '🔧'}</div>
          <h2>{right} / {total} first try</h2>
          <p>
            {pct >= 80 ? 'Strong. The ideas are sticking.' : pct >= 50 ? 'Getting there — the missed ones will come back for review.' : 'Worth another look at the lesson, then try again.'}
          </p>
          <p style={{ fontSize: 14, color: 'var(--muted)' }}>{title}</p>
          <div className="actions">
            {onRestart && <button className="btn btn-primary" onClick={onRestart}>Practise again</button>}
            {extraAction && <Link className="btn btn-primary" to={extraAction.to}>{extraAction.label}</Link>}
            <Link className="btn" to={backTo}>{backLabel}</Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="quiz" data-license={license}>
      <div className="quiz-top">
        <Link className="x" to={backTo}>✕ Exit</Link>
        <div className="quiz-bar" role="progressbar" aria-valuenow={i} aria-valuemax={queue.length}>
          <i style={{ width: `${(i / queue.length) * 100}%` }} />
        </div>
        <span className="quiz-count">{i + 1}/{queue.length}</span>
      </div>
      <QuestionCard key={`${i}-${q.id}`} question={q} seed={attemptSeed} picked={picked} revealed={revealed} onPick={pick} />
      <div className="quiz-actions">
        <span className="kbd-hint">
          {revealed ? <><kbd>Enter</kbd> next</> : <><kbd>1</kbd>–<kbd>4</kbd> or <kbd>A</kbd>–<kbd>D</kbd> to answer</>}
        </span>
        <button className="btn btn-primary btn-lg" disabled={!revealed} onClick={next}>
          {i + 1 === queue.length ? 'Finish' : 'Next'} →
        </button>
      </div>
    </div>
  )
}
