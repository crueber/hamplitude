import { useState } from 'react'
import { C, Choice, Diagram, Ln, T } from '../kit'

const PX = 0.09 // px per Hz
const CX = 320
const SIG = 2400
const NOISE = Array.from({ length: 90 }, (_, i) => 6 + 10 * Math.abs(Math.sin(i * 12.9898) * Math.cos(i * 4.1414)))
const VERDICT: Record<number, { t: string; col: string }> = {
  500: { t: 'Cuts off most of the voice', col: C.bad },
  1000: { t: 'Cuts off part of the voice', col: C.bad },
  2400: { t: 'Fits the voice, blocks other noise: best', col: C.good },
  5000: { t: 'Voice fits, but lets in extra noise', col: C.resist },
}

/** A receive filter should be about as wide as the signal: narrower loses voice, wider lets in noise. */
export function Filter() {
  const [bw, setBw] = useState(2400)
  const fl = CX - (bw / 2) * PX, fr = CX + (bw / 2) * PX
  const sl = CX - (SIG / 2) * PX, sr = CX + (SIG / 2) * PX
  const il = Math.max(fl, sl), ir = Math.min(fr, sr)
  const base = 190
  const v = VERDICT[bw]
  return (
    <>
      <Diagram w={640} h={250} title={`A ${bw} hertz receive filter on an SSB voice signal about 2400 hertz wide: ${v.t}`}
        caption="Shaded window = filter passband. Orange bars = noise that gets through.">
        <rect x={fl} y={50} width={fr - fl} height={base - 50} fill={C.fill2} opacity={0.8} stroke={C.ink} strokeWidth={2} strokeDasharray="6 4" />
        <rect x={sl} y={base - 74} width={sr - sl} height={74} rx={4} fill="none" stroke={C.signal} strokeWidth={2} strokeDasharray="5 4" />
        {ir > il && <rect x={il} y={base - 74} width={ir - il} height={74} rx={4} fill={C.signal} opacity={0.85} />}
        {NOISE.map((h, i) => {
          const x = 40 + i * 6.4
          const inside = x > fl && x < fr
          return <line key={i} x1={x} y1={base} x2={x} y2={base - h} stroke={inside ? C.resist : C.muted} strokeWidth={3} opacity={inside ? 1 : 0.35} />
        })}
        <T x={CX} y={base - 37} anchor="middle" bold size={14} color={C.bg}>{bw >= 1000 ? 'SSB voice' : ''}</T>
        <Ln x1={40} y1={base} x2={600} y2={base} color={C.muted} width={2} />
        <T x={CX} y={base + 18} anchor="middle" size={12.5} color={C.muted}>signal is about 2.4 kHz wide</T>
        <T x={CX} y={34} anchor="middle" size={14} bold>{bw} Hz filter</T>
        <T x={CX} y={236} anchor="middle" bold size={15} color={v.col}>{v.t}</T>
      </Diagram>
      <div style={{ margin: '-6px 0 14px' }}>
        <Choice label="Filter bandwidth" value={bw} onChange={setBw} options={[500, 1000, 2400, 5000].map((n) => ({ value: n, label: `${n} Hz` }))} />
      </div>
    </>
  )
}
