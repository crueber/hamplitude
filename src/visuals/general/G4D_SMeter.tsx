import { useState } from 'react'
import { C, Controls, Diagram, Ln, Readout, Slider, T, fmt } from '../kit'

// reading steps: S1..S9, then +10 .. +60 dB over S9
const STEPS: { label: string; db: number }[] = [
  ...Array.from({ length: 9 }, (_, i) => ({ label: `S${i + 1}`, db: -(8 - i) * 6 })),
  ...[10, 20, 30, 40, 50, 60].map((d) => ({ label: `S9+${d}`, db: d })),
]
const posOf = (i: number) => (i <= 8 ? (i / 8) * 0.6 : 0.6 + ((STEPS[i].db / 60) * 0.4))
const CX = 320, CY = 206, R = 170
const ang = (p: number) => Math.PI * (5 / 6) - p * Math.PI * (2 / 3)
const pt = (p: number, r: number): [number, number] => [CX + r * Math.cos(ang(p)), CY - r * Math.sin(ang(p))]

/** S units are 6 dB apart; above S9 the meter reads in dB over S9. */
export function SMeter() {
  const [i, setI] = useState(7)
  const st = STEPS[i]
  const ratio = 10 ** (st.db / 10)
  const rtxt = ratio >= 1 ? `×${fmt(ratio, 3)}` : `÷${fmt(1 / ratio, 3)}`
  const [nx, ny] = pt(posOf(i), R - 12)
  const major = [0, 2, 4, 6, 8, 10, 12, 14]
  const arc = Array.from({ length: 41 }, (_, k) => pt(k / 40, R)).map(([x, y], k) => `${k ? 'L' : 'M'}${x.toFixed(1)},${y.toFixed(1)}`).join('')
  const arcHot = Array.from({ length: 17 }, (_, k) => pt(0.6 + (k / 16) * 0.4, R)).map(([x, y], k) => `${k ? 'L' : 'M'}${x.toFixed(1)},${y.toFixed(1)}`).join('')
  return (
    <>
      <Diagram w={640} h={296} title={`S meter reading ${st.label}: ${st.db === 0 ? 'the reference level' : `${Math.abs(st.db)} dB ${st.db > 0 ? 'above' : 'below'} S9`}, which is ${st.db === 0 ? 'the same power' : `${rtxt} the power`} of an S9 signal. One S unit is 6 dB.`}
        caption="Each S unit is 6 dB, about 4 times the power. Above S9, the scale counts dB over S9.">
        <path d={arc} fill="none" stroke={C.fill2} strokeWidth={10} strokeLinecap="round" />
        <path d={arcHot} fill="none" stroke={C.bad} strokeWidth={10} strokeLinecap="round" opacity={0.55} />
        {STEPS.map((_, k) => {
          const [a, b] = pt(posOf(k), R - 6), [c, d] = pt(posOf(k), R + 8)
          return <Ln key={k} x1={a} y1={b} x2={c} y2={d} color={C.muted} width={major.includes(k) ? 2.5 : 1.5} />
        })}
        {major.map((k) => {
          const [x, y] = pt(posOf(k), R + 26)
          const lab = k <= 8 ? STEPS[k].label.slice(1) : '+' + STEPS[k].db
          return <T key={k} x={x} y={y} anchor="middle" size={13} bold={k === 8} color={k > 8 ? C.bad : C.ink}>{lab}</T>
        })}
        <Ln x1={CX} y1={CY} x2={nx} y2={ny} color={C.ink} width={3.5} />
        <circle cx={CX} cy={CY} r={9} fill={C.ink} />
        <T x={CX} y={248} anchor="middle" bold size={22} color={st.db > 0 ? C.bad : C.ink}>{st.label}{st.db < 0 ? ` = ${st.db} dB vs S9` : st.db === 0 ? ' = reference' : ' dB over'}</T>
        <T x={CX} y={274} anchor="middle" size={14} color={C.muted}>power vs S9: <tspan fontWeight={700}>{st.db === 0 ? '×1' : rtxt}</tspan></T>
      </Diagram>
      <Controls>
        <Slider label="S meter reading" value={i} min={0} max={14} step={1} onChange={setI} format={() => st.label} color="var(--d-signal)" />
        <Readout label="vs S9" value={st.db === 0 ? '0 dB' : `${st.db > 0 ? '+' : '−'}${Math.abs(st.db)} dB`} color={st.db > 0 ? 'var(--d-bad)' : 'var(--d-signal)'} />
        <Readout label="Power" value={st.db === 0 ? '×1' : rtxt} />
      </Controls>
    </>
  )
}
