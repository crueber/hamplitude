/** Small deterministic PRNG so a question's shuffled answer order is stable within a session. */
export function mulberry32(seed: number) {
  let a = seed >>> 0
  return () => {
    a = (a + 0x6d2b79f5) >>> 0
    let t = a
    t = Math.imul(t ^ (t >>> 15), t | 1)
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61)
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

export function hashString(s: string): number {
  let h = 2166136261
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i)
    h = Math.imul(h, 16777619)
  }
  return h >>> 0
}

export function shuffled<T>(arr: readonly T[], rand: () => number = Math.random): T[] {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(rand() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

/** "All these choices are correct" style options refer to the others, so they stay last. */
const REFERS_TO_OTHERS =
  /\b(all|none|any|both|neither|either)\s+(of\s+)?(these|the\s+(above|choices|answers|options|statements)|them)\b/i

/**
 * Returns indices into `choices` in display order. Shuffled when `shuffle` is true;
 * options that refer to the other options are kept at the end in original order.
 */
export function choiceOrder(choices: readonly string[], seed: string, shuffle: boolean): number[] {
  const idx = choices.map((_, i) => i)
  if (!shuffle) return idx
  const pinned = idx.filter((i) => REFERS_TO_OTHERS.test(choices[i]))
  const free = idx.filter((i) => !pinned.includes(i))
  return [...shuffled(free, mulberry32(hashString(seed))), ...pinned]
}
