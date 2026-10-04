import { useEffect, useRef, useState } from 'react'

/** Semantic colours for diagrams. Meaning is consistent everywhere in the site. */
export const C = {
  voltage: 'var(--d-voltage)',
  current: 'var(--d-current)',
  resist: 'var(--d-resist)',
  power: 'var(--d-power)',
  signal: 'var(--d-signal)',
  good: 'var(--d-good)',
  bad: 'var(--d-bad)',
  ink: 'var(--d-ink)',
  muted: 'var(--d-muted)',
  fill: 'var(--d-fill)',
  fill2: 'var(--d-fill-2)',
  bg: 'var(--d-bg)',
} as const

export const TAU = Math.PI * 2

/** SVG path for a sine wave across [x0,x1], centred on cy. `cycles` may be fractional. */
export function sinePath(x0: number, x1: number, cy: number, amp: number, cycles: number, phase = 0, steps = 160): string {
  const pts: string[] = []
  for (let i = 0; i <= steps; i++) {
    const t = i / steps
    const x = x0 + (x1 - x0) * t
    const y = cy - amp * Math.sin(TAU * cycles * t + phase)
    pts.push(`${i === 0 ? 'M' : 'L'}${x.toFixed(2)},${y.toFixed(2)}`)
  }
  return pts.join('')
}

/** Format a number with sensible significant digits, no trailing zeros. */
export function fmt(n: number, digits = 3): string {
  if (!isFinite(n)) return '—'
  const s = Number(n.toPrecision(digits)).toString()
  return s.includes('e') ? Number(n.toPrecision(digits)).toExponential(digits - 1) : s
}

const SI: [number, string][] = [
  [1e12, 'T'], [1e9, 'G'], [1e6, 'M'], [1e3, 'k'], [1, ''], [1e-3, 'm'], [1e-6, 'µ'], [1e-9, 'n'], [1e-12, 'p'],
]
/** 0.0047 + "A" -> "4.7 mA";  14_200_000 + "Hz" -> "14.2 MHz" */
export function si(value: number, unit: string, digits = 3): string {
  if (value === 0) return `0 ${unit}`
  const abs = Math.abs(value)
  const [scale, prefix] = SI.find(([s]) => abs >= s) ?? SI[SI.length - 1]
  return `${fmt(value / scale, digits)} ${prefix}${unit}`
}

export const clamp = (v: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, v))

export function usePrefersReducedMotion(): boolean {
  const [reduced, setReduced] = useState(
    () => typeof matchMedia !== 'undefined' && matchMedia('(prefers-reduced-motion: reduce)').matches,
  )
  useEffect(() => {
    const mq = matchMedia('(prefers-reduced-motion: reduce)')
    const on = () => setReduced(mq.matches)
    mq.addEventListener('change', on)
    return () => mq.removeEventListener('change', on)
  }, [])
  return reduced
}

/**
 * Seconds elapsed, updating every frame while the element is on screen.
 * Returns 0 forever for users who prefer reduced motion (visuals should still read as a still frame).
 * Attach `ref` to the SVG/figure so animation pauses when scrolled away.
 */
export function useTime(speed = 1) {
  const ref = useRef<SVGSVGElement | null>(null)
  const [t, setT] = useState(0)
  const reduced = usePrefersReducedMotion()
  useEffect(() => {
    if (reduced) return
    const el = ref.current
    let raf = 0
    let visible = true
    let start = performance.now()
    const loop = (now: number) => {
      if (visible) setT(Math.max(0, ((now - start) / 1000) * speed))
      raf = requestAnimationFrame(loop)
    }
    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting
      if (visible) start = performance.now() - (t / speed) * 1000
    })
    if (el) io.observe(el)
    raf = requestAnimationFrame(loop)
    return () => {
      cancelAnimationFrame(raf)
      io.disconnect()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reduced, speed])
  return { t: reduced ? 0 : t, ref, reduced }
}
