import { useSyncExternalStore } from 'react'
import type { LicenseId } from '@/data'

const KEY = 'hamplitude:v1'

export interface CardState {
  /** Leitner box 0–5. 0 = still learning, >= 3 counts as mastered. */
  box: number
  /** epoch ms when due for review */
  due: number
  right: number
  wrong: number
  last: number
}

export interface ExamResult {
  id: string
  license: LicenseId
  at: number
  correct: number
  total: number
  passed: boolean
  seconds: number
  /** question ids answered wrong or skipped */
  missed: string[]
}

export interface Settings {
  theme: 'system' | 'light' | 'dark'
  shuffle: boolean
  /** hide FCC rule citations on questions */
  showRefs: boolean
}

export interface State {
  v: 1
  cards: Record<string, CardState>
  lessonsRead: Record<string, number>
  exams: ExamResult[]
  /** yyyy-mm-dd -> number of questions answered */
  activity: Record<string, number>
  settings: Settings
}

const DEFAULTS: State = {
  v: 1,
  cards: {},
  lessonsRead: {},
  exams: [],
  activity: {},
  settings: { theme: 'system', shuffle: true, showRefs: true },
}

function load(): State {
  try {
    const raw = localStorage.getItem(KEY)
    if (!raw) return structuredClone(DEFAULTS)
    const parsed = JSON.parse(raw)
    return { ...structuredClone(DEFAULTS), ...parsed, settings: { ...DEFAULTS.settings, ...parsed.settings } }
  } catch {
    return structuredClone(DEFAULTS)
  }
}

let state: State = load()
const listeners = new Set<() => void>()

function persist() {
  try {
    localStorage.setItem(KEY, JSON.stringify(state))
  } catch {
    /* private mode / quota: progress just won't persist */
  }
}

export function update(fn: (s: State) => State) {
  state = fn(state)
  persist()
  listeners.forEach((l) => l())
}

export const getState = () => state

export function useStore<T>(selector: (s: State) => T): T {
  return useSyncExternalStore(
    (cb) => {
      listeners.add(cb)
      return () => listeners.delete(cb)
    },
    () => selector(state),
    // Prerendered pages (and the first hydration pass) must not depend on this browser's saved progress.
    () => selector(DEFAULTS),
  )
}

// keep tabs in sync (browser only: this module is also imported while prerendering)
if (typeof window !== 'undefined')
  window.addEventListener('storage', (e) => {
    if (e.key === KEY) {
      state = load()
      listeners.forEach((l) => l())
    }
  })

export const dayKey = (d = new Date()) =>
  `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`

export function resetProgress() {
  update((s) => ({ ...structuredClone(DEFAULTS), settings: s.settings }))
}

export function exportProgress(): string {
  return JSON.stringify(state)
}

export function importProgress(json: string): boolean {
  try {
    const parsed = JSON.parse(json)
    if (parsed?.v !== 1 || typeof parsed.cards !== 'object') return false
    update(() => ({ ...structuredClone(DEFAULTS), ...parsed, settings: { ...DEFAULTS.settings, ...parsed.settings } }))
    return true
  } catch {
    return false
  }
}
