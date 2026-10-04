import { useMemo } from 'react'
import { Link } from 'react-router-dom'
import { licenseOfQuestion, type Question } from '@/data'
import { getWhy } from '@/content'
import { choiceOrder } from '@/lib/shuffle'
import { useStore } from '@/lib/store'
import { Rich } from './Rich'

const LETTERS = ['A', 'B', 'C', 'D']

export interface QuestionCardProps {
  question: Question
  /** stable seed so the answer order doesn't change while the question is on screen */
  seed: string
  /** display index (into the shuffled order) the learner picked, or null */
  picked: number | null
  /** reveal right/wrong + explanation */
  revealed: boolean
  onPick: (displayIndex: number, originalIndex: number) => void
  /** hide the explanation panel (exam mode) */
  hideFeedback?: boolean
}

export function QuestionCard({ question: q, seed, picked, revealed, onPick, hideFeedback }: QuestionCardProps) {
  const shuffle = useStore((s) => s.settings.shuffle)
  const showRefs = useStore((s) => s.settings.showRefs)
  const license = licenseOfQuestion(q.id)!
  const order = useMemo(() => choiceOrder(q.choices, `${seed}:${q.id}`, shuffle), [q, seed, shuffle])
  const pickedOriginal = picked == null ? null : order[picked]
  const correct = pickedOriginal === q.answer

  return (
    <article className="qcard" data-license={license}>
      <div className="qmeta">
        <span className="qid">{q.id}</span>
        {showRefs && q.refs.length > 0 && <span className="qref">FCC {q.refs.join(', ')}</span>}
      </div>
      <h2 className="qtext">{q.q}</h2>
      {q.figure && (
        <figure className="qfig">
          <img src={`./figures/${q.figure}.svg`} alt={`Figure ${q.figure}`} />
          <figcaption>Figure {q.figure}</figcaption>
        </figure>
      )}
      <div className="choices" role="radiogroup" aria-label="Answers">
        {order.map((orig, di) => {
          const isCorrect = orig === q.answer
          const isPicked = picked === di
          const cls = ['choice']
          if (!revealed && isPicked) cls.push('selected')
          if (revealed && isCorrect) cls.push('correct')
          if (revealed && isPicked && !isCorrect) cls.push('wrong')
          if (revealed && !isCorrect && !isPicked) cls.push('dim')
          return (
            <button
              key={orig} type="button" role="radio" aria-checked={isPicked}
              className={cls.join(' ')} disabled={revealed} onClick={() => onPick(di, orig)}
            >
              <span className="letter">{LETTERS[di]}</span>
              <span className="ctext">{q.choices[orig]}</span>
            </button>
          )
        })}
      </div>
      {revealed && !hideFeedback && <Feedback question={q} correct={correct} order={order} />}
    </article>
  )
}

function Feedback({ question: q, correct, order }: { question: Question; correct: boolean; order: number[] }) {
  const license = licenseOfQuestion(q.id)!
  const why = getWhy(q.group, q.id)
  const letter = LETTERS[order.indexOf(q.answer)]
  return (
    <div className={`feedback ${correct ? 'ok' : 'no'}`} role="status">
      <h4>{correct ? '✓ Correct' : '✗ Not quite'}</h4>
      {!correct && (
        <p className="rightans">
          Answer: <strong>{letter}</strong> — {q.choices[q.answer]}
        </p>
      )}
      {why ? (
        <>
          <p className="why"><Rich text={why.why} /></p>
          {why.trap && !correct && (
            <p className="trap"><b>Common trap:</b> <Rich text={why.trap} /></p>
          )}
        </>
      ) : (
        correct && <p className="why">Right on.</p>
      )}
      <Link className="learn" to={`/${license}/${q.group}${why?.concept ? `#${why.concept}` : ''}`}>
        Review the concept →
      </Link>
    </div>
  )
}
