import { POOLS, allGroups, type LicenseId } from '@/data'
import type { CardState } from './store'
import { isMastered, isSeen } from './srs'

export interface Stats {
  total: number
  seen: number
  mastered: number
}

export function groupStats(cards: Record<string, CardState>, questionIds: string[]): Stats {
  let seen = 0
  let mastered = 0
  for (const id of questionIds) {
    const c = cards[id]
    if (isSeen(c)) seen++
    if (isMastered(c)) mastered++
  }
  return { total: questionIds.length, seen, mastered }
}

export function licenseStats(cards: Record<string, CardState>, license: LicenseId): Stats {
  return groupStats(cards, POOLS[license].questions.map((q) => q.id))
}

/** Per-group mastery, keyed by group id. */
export function allGroupStats(cards: Record<string, CardState>, license: LicenseId) {
  return new Map(allGroups(license).map((g) => [g.id, groupStats(cards, g.questions)]))
}

export const pct = (n: number, d: number) => (d ? Math.round((n / d) * 100) : 0)
