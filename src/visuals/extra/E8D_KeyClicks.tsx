import { useState } from 'react'
import { C, Controls, Diagram, Ln, Readout, Slider, T, fmt } from '../kit'

const PULSE = 60 // ms, one dot at about 20 WPM
const FMIN = 10, FMAX = 3000
/** Asymptotic spectrum of a keyed pulse: falls 20 dB/decade, then 40 dB/decade past 1/(pi x rise time). Returns dB. */
const spec = (f: number, tr: number) => {
  const a = Math.min(1, 1 / (Math.PI * f * (PULSE / 1000)))
  const b = Math.min(1, 1 / (Math.PI * f * (tr / 1000)))
  return 20 * Math.log10(a * b)
}

/** Key clicks: a sharp keying edge puts energy far from the carrier. Slower rise and fall times shrink it. */
export function KeyClicks() {
  const [tr, setTr] = useState(4)
  const x0 = 56, x1 = 610
  // envelope panel
  const ty0 = 24, ty1 = 100
  const T0 = 16, T1 = T0 + PULSE, span = 92
  const tx = (ms: number) => x0 + (ms / span) * (x1 - x0)
  const env = `M${tx(T0 - tr / 2)},${ty1} L${tx(T0 + tr / 2)},${ty0} L${tx(T1 - tr / 2)},${ty0} L${tx(T1 + tr / 2)},${ty1}`
  // spectrum panel
  const sy0 = 150, sy1 = 262, dbMin = -100
  const fx = (f: number) => x0 + (Math.log10(f / FMIN) / Math.log10(FMAX / FMIN)) * (x1 - x0)
  const dy = (db: number) => sy0 + (-db / -dbMin) * (sy1 - sy0)
  const curve = (t: number) => {
    const pts: string[] = []
    for (let i = 0; i <= 120; i++) {
      const f = FMIN * Math.pow(FMAX / FMIN, i / 120)
      pts.push(`${i ? 'L' : 'M'}${fx(f).toFixed(1)},${dy(Math.max(dbMin, spec(f, t))).toFixed(1)}`)
    }
    return pts.join('')
  }
  const at500 = spec(500, tr)
  return (
    <>
      <Diagram w={640} h={316} title={`A CW key-down pulse with ${tr} millisecond rise and fall times, and how far its energy spreads from the carrier. Longer rise and fall times make the spectrum fall off faster, so fewer key clicks.`}
        caption="Illustrative model of a 60 ms dot. Slower edges, fewer clicks.">
        <T x={14} y={12} size={13} bold color={C.muted}>Keying envelope (carrier amplitude)</T>
        <Ln x1={x0} y1={ty1} x2={x1} y2={ty1} color={C.fill2} width={1.5} />
        <path d={env} fill="none" stroke={C.resist} strokeWidth={3} strokeLinejoin="round" />
        <T x={tx(T0 + PULSE / 2)} y={ty0 + 18} anchor="middle" size={12.5} color={C.muted}>key down</T>
        <T x={14} y={132} size={13} bold color={C.muted}>Signal energy away from the carrier</T>
        <Ln x1={x0} y1={sy1} x2={x1} y2={sy1} color={C.muted} width={1.5} />
        {[10, 100, 1000].map((f) => (
          <g key={f}>
            <Ln x1={fx(f)} y1={sy0} x2={fx(f)} y2={sy1} color={C.fill2} width={1} />
            <T x={fx(f)} y={sy1 + 16} anchor="middle" size={12} color={C.muted}>{f >= 1000 ? '1 kHz' : `${f} Hz`}</T>
          </g>
        ))}
        <path d={curve(0.5)} fill="none" stroke={C.muted} strokeWidth={1.5} strokeDasharray="5 4" />
        <path d={curve(tr)} fill="none" stroke={C.signal} strokeWidth={2.5} strokeLinejoin="round" />
        <T x={x1} y={sy0 + 8} anchor="end" size={12.5} color={C.muted}>dashed: near-instant edges</T>
        <T x={x1} y={sy0 + 26} anchor="end" size={12.5} bold color={C.signal}>solid: your rise and fall time</T>
        <T x={x1} y={sy1 + 36} anchor="end" size={12.5} color={C.muted}>distance from carrier →</T>
        <T x={x0 - 6} y={sy0} anchor="end" size={12} color={C.muted}>0 dB</T>
      </Diagram>
      <Controls>
        <Slider label="Keying rise and fall time" value={tr} min={0.5} max={10} step={0.5} onChange={setTr} format={(v) => `${fmt(v)} ms`} color="var(--d-resist)" />
        <Readout label="Level 500 Hz from carrier" value={fmt(at500, 3)} unit=" dB" color="var(--d-resist)" />
      </Controls>
    </>
  )
}
