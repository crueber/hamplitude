import { update, dayKey, type CardState, type State } from './store'

const DAY = 86_400_000
/** days until next review, by Leitner box reached */
const INTERVALS = [0, 1, 3, 7, 14, 30]
export const MASTERED_BOX = 3

export const emptyCard = (): CardState => ({ box: 0, due: 0, right: 0, wrong: 0, last: 0 })

export function nextCard(card: CardState | undefined, correct: boolean, now = Date.now()): CardState {
  const c = card ?? emptyCard()
  if (correct) {
    const box = Math.min(5, c.box + 1)
    return { ...c, box, due: now + INTERVALS[box] * DAY, right: c.right + 1, last: now }
  }
  // a miss drops you back, but a well-known card isn't wiped entirely
  const box = c.box >= MASTERED_BOX ? c.box - 2 : 0
  return { ...c, box, due: now, wrong: c.wrong + 1, last: now }
}

/** Record an answer: updates the spaced-repetition card and today's activity count. */
export function recordAnswer(qid: string, correct: boolean) {
  update((s: State) => ({
    ...s,
    cards: { ...s.cards, [qid]: nextCard(s.cards[qid], correct) },
    activity: { ...s.activity, [dayKey()]: (s.activity[dayKey()] ?? 0) + 1 },
  }))
}

export const isMastered = (c: CardState | undefined) => !!c && c.box >= MASTERED_BOX
export const isSeen = (c: CardState | undefined) => !!c && c.right + c.wrong > 0
export const isDue = (c: CardState | undefined, now = Date.now()) => !!c && isSeen(c) && c.due <= now

export function streakDays(activity: Record<string, number>): number {
  let n = 0
  const d = new Date()
  // today not yet practised doesn't break the streak
  if (!activity[dayKey(d)]) d.setDate(d.getDate() - 1)
  while (activity[dayKey(d)]) {
    n++
    d.setDate(d.getDate() - 1)
  }
  return n
}
