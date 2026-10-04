import { POOLS, allGroups, type LicenseId, type Question, getGroup } from '@/data'
import { getState } from './store'
import { isDue, isMastered, isSeen } from './srs'
import { shuffled } from './shuffle'

const byId = (license: LicenseId) => new Map(POOLS[license].questions.map((q) => [q.id, q]))

/** Practise one group: weakest first, mastered last, ties shuffled. */
export function groupSession(groupId: string): Question[] {
  const info = getGroup(groupId)
  if (!info) return []
  const { cards } = getState()
  const qs = byId(info.license)
  const score = (id: string) => {
    const c = cards[id]
    if (!isSeen(c)) return 1 // unseen
    return isMastered(c) ? 3 : 0 // learning is most urgent
  }
  return shuffled(info.group.questions)
    .sort((a, b) => score(a) - score(b))
    .map((id) => qs.get(id)!)
}

/** Mixed review across a licence: due cards first, then new material. */
export function reviewSession(license: LicenseId, size = 15): Question[] {
  const { cards, lessonsRead } = getState()
  const pool = POOLS[license]
  const now = Date.now()
  const due = pool.questions.filter((q) => isDue(cards[q.id], now)).sort((a, b) => cards[a.id].due - cards[b.id].due)
  const picked = due.slice(0, size)
  if (picked.length < size) {
    // new questions, preferring groups whose lesson you've read
    const unseen = pool.questions.filter((q) => !isSeen(cards[q.id]))
    const read = shuffled(unseen.filter((q) => lessonsRead[q.group]))
    const rest = shuffled(unseen.filter((q) => !lessonsRead[q.group]))
    picked.push(...[...read, ...rest].slice(0, size - picked.length))
  }
  return shuffled(picked)
}

export const dueCount = (license: LicenseId) => {
  const { cards } = getState()
  const now = Date.now()
  return POOLS[license].questions.filter((q) => isDue(cards[q.id], now)).length
}

/** Real-exam shape: exactly one question drawn from every group of the pool. */
export function examSession(license: LicenseId): Question[] {
  const qs = byId(license)
  return allGroups(license).map((g) => qs.get(g.questions[Math.floor(Math.random() * g.questions.length)])!)
}
