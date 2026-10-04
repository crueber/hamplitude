import { useState } from 'react'
import { C, Choice, Controls, Diagram, Ln, Readout, T, fmt } from '../kit'

const N = 240
/** Speech-like envelope power: bursty syllables. Exponent chosen so mean power / peak power = 0.4 (2.5 : 1). */
function speech(): number[] {
  const raw = Array.from({ length: N }, (_, i) => {
    const t = i / N
    const syl = Math.abs(Math.sin(Math.PI * 7.3 * t + 0.4)) * (0.55 + 0.45 * Math.sin(Math.PI * 2.9 * t + 1.1) ** 2)
    const fine = 0.65 + 0.35 * Math.abs(Math.sin(Math.PI * 31 * t + 2 * Math.sin(17 * t)))
    return syl * fine
  })
  const mx = Math.max(...raw)
  const base = raw.map((v) => v / mx)
  let lo = 0.5, hi = 8
  for (let k = 0; k < 50; k++) {
    const m = (lo + hi) / 2
    const mean = base.reduce((a, v) => a + v ** m, 0) / N
    if (mean > 0.4) lo = m; else hi = m
  }
  return base.map((v) => v ** ((lo + hi) / 2))
}
const SPEECH = speech()

/** PEP vs average power of an unprocessed SSB signal: a steady tone is 1:1, speech about 2.5:1. */
export function Pep() {
  const [mode, setMode] = useState<'tone' | 'speech'>('speech')
  const x0 = 50, x1 = 500, yb = 190, H = 140
  const p = mode === 'tone' ? Array(N).fill(1) : SPEECH
  const avg = p.reduce((a, v) => a + v, 0) / N
  const area = `M${x0},${yb} ` + p.map((v, i) => `L${(x0 + ((x1 - x0) * i) / (N - 1)).toFixed(1)},${(yb - H * v).toFixed(1)}`).join('') + ` L${x1},${yb} Z`
  const ratio = 1 / avg
  return (
    <>
      <Diagram w={640} h={236} title={`Power of an SSB signal over time. Peak envelope power is the highest peak; average power is ${fmt(avg, 2)} of that, a ratio of ${fmt(ratio, 2)} to 1.`}
        caption="PEP is the tallest peak. Average power is the mean height.">
        <T x={14} y={14} size={13} bold color={C.muted}>Transmitted power over time</T>
        <path d={area} fill={C.signal} fillOpacity={0.35} stroke={C.signal} strokeWidth={1.5} strokeLinejoin="round" />
        <Ln x1={x0} y1={yb - H} x2={x1} y2={yb - H} color={C.power} width={2.5} />
        <T x={x1 + 10} y={yb - H} size={12.5} bold color={C.power}>PEP (peak)</T>
        <Ln x1={x0} y1={yb - H * avg} x2={x1} y2={yb - H * avg} color={C.resist} width={2.5} dash="7 5" />
        <T x={x1 + 10} y={yb - H * avg} size={12.5} bold color={C.resist}>average</T>
        <Ln x1={x0} y1={yb} x2={x1} y2={yb} color={C.muted} width={2} />
        <T x={x1} y={yb + 20} anchor="end" size={12.5} color={C.muted}>time →</T>
      </Diagram>
      <Controls>
        <Choice label="Modulating signal" value={mode} onChange={setMode} options={[{ value: 'tone', label: 'Steady tone' }, { value: 'speech', label: 'Speech' }]} />
        <Readout label="PEP : average" value={mode === 'tone' ? '1 : 1' : '2.5 : 1'} color="var(--d-power)" />
      </Controls>
    </>
  )
}
