import { useState } from 'react'
import { C, Choice, Diagram, Ln, T } from '../kit'

const X0 = 30, X1 = 610, FMAX = 160
const px = (f: number) => X0 + (f / FMAX) * (X1 - X0)
const BANDS = [
  { name: 'TV 2–4', lo: 54, hi: 72 },
  { name: 'TV 5–6', lo: 76, hi: 88 },
  { name: 'FM radio', lo: 88, hi: 108 },
  { name: 'Aircraft', lo: 108, hi: 137 },
  { name: '2 m', lo: 144, hi: 148 },
]
const FUNDS = [7.15, 14.2, 21.3, 28.4, 50.1]
/** Illustrative relative heights of the 2nd to 5th harmonics of an unfiltered stage. */
const HGT = [40, 54, 26, 32]
const hit = (f: number) => BANDS.find((b) => f >= b.lo && f <= b.hi)

/** Harmonics are whole-number multiples of the fundamental. Pick a fundamental to see which of its harmonics land on other services. */
export function HarmonicsAndSpurs_Landing() {
  const [f, setF] = useState(21.3)
  const [lpf, setLpf] = useState(false)
  const base = 156
  const harms = [2, 3, 4, 5].map((n, i) => ({ n, f: n * f, h: HGT[i] }))
  const landings = harms.filter((h) => hit(h.f))
  return (
    <>
      <Diagram w={640} h={290} title={`A transmitter on ${f} megahertz makes harmonics at ${harms.map((h) => `${+h.f.toFixed(2)}`).join(', ')} megahertz. ${landings.length ? landings.map((h) => `The ${h.n === 2 ? 'second' : h.n === 3 ? 'third' : h.n === 4 ? 'fourth' : 'fifth'} harmonic lands in ${hit(h.f)!.name}.`).join(' ') : 'None of them lands on a broadcast or aircraft band.'} ${lpf ? 'A low-pass filter cuts them to almost nothing.' : ''}`}
        caption="Illustrative harmonic levels. Real ones depend on the stage, and the filter removes them before the antenna.">
        <Ln x1={X0} y1={base} x2={X1} y2={base} color={C.ink} width={2} />
        {BANDS.map((b) => {
          const wide = px(b.hi) - px(b.lo) > 50
          const lit = harms.some((h) => h.f >= b.lo && h.f <= b.hi)
          return (
            <g key={b.name}>
              <rect x={px(b.lo)} y={base + 6} width={px(b.hi) - px(b.lo)} height={24} rx={4} fill={lit ? C.bad : C.fill2} fillOpacity={lit ? 0.35 : 0.6} stroke={lit ? C.bad : C.muted} strokeWidth={lit ? 2.5 : 1.5} />
              <T x={(px(b.lo) + px(b.hi)) / 2} y={wide ? base + 18 : base + 44} anchor="middle" size={12} bold color={lit ? C.bad : C.muted}>{b.name}</T>
            </g>
          )
        })}
        {[0, 30, 60, 90, 120, 150].map((m) => (
          <g key={m}>
            <Ln x1={px(m)} y1={base} x2={px(m)} y2={base - 5} color={C.muted} width={1.5} />
            <T x={px(m)} y={base + 62} anchor="middle" size={12} color={C.muted}>{m}</T>
          </g>
        ))}
        <T x={X1} y={base + 82} anchor="end" size={12} color={C.muted}>frequency, MHz</T>

        <Ln x1={px(f)} y1={base} x2={px(f)} y2={base - 100} color={C.signal} width={6} />
        <T x={px(f) + 8} y={base - 106} size={13} bold color={C.signal}>{f} MHz</T>
        {harms.map((h) => {
          const bad = !!hit(h.f)
          const height = lpf ? 3 : h.h
          if (h.f > FMAX) return null
          return (
            <g key={h.n}>
              <Ln x1={px(h.f)} y1={base} x2={px(h.f)} y2={base - height} color={lpf ? C.good : bad ? C.bad : C.resist} width={4.5} dash={lpf ? '3 3' : undefined} />
              <T x={px(h.f)} y={base - height - 12} anchor="middle" size={12} bold color={lpf ? C.good : bad ? C.bad : C.resist}>{`${h.n}f`}</T>
            </g>
          )
        })}
        <T x={20} y={20} size={13} bold color={C.muted}>{lpf ? 'With a low-pass filter after the transmitter' : 'Unfiltered output'}</T>
        <T x={20} y={268} size={13} bold mono>{harms.filter((h) => h.f <= FMAX).map((h) => `${h.n}×${f}=${+h.f.toFixed(2)}`).join('  ')}</T>
      </Diagram>
      <div style={{ margin: '-6px 0 14px', display: 'flex', flexWrap: 'wrap', gap: 10 }}>
        <Choice label="Fundamental" value={f} onChange={setF} options={FUNDS.map((v) => ({ value: v, label: `${v} MHz` }))} />
        <Choice label="Filter" value={lpf ? 'on' : 'off'} onChange={(v) => setLpf(v === 'on')} options={[{ value: 'off', label: 'No filter' }, { value: 'on', label: 'Low-pass filter' }]} />
      </div>
    </>
  )
}
