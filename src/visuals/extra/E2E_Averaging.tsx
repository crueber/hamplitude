import { useState } from 'react'
import { C, Controls, Diagram, Ln, Slider, T } from '../kit'

const NPTS = 140
const rnd = (i: number) => { const x = Math.sin(i * 78.233 + 1.7) * 43758.5453; return x - Math.floor(x) }
/** roughly Gaussian noise from summed uniforms */
const noise = (cycle: number, i: number) => (rnd(cycle * 997 + i * 3 + 1) + rnd(cycle * 997 + i * 3 + 2) + rnd(cycle * 997 + i * 3 + 3) - 1.5) * 2
const sig = (i: number) => 1.3 * Math.exp(-(((i - 70) / 6) ** 2))

/** Q65 averages several receive cycles: the repeating signal adds up, the random noise averages out. */
export function E2E_Averaging() {
  const [n, setN] = useState(12)
  const GX0 = 30, GX1 = 610
  const x = (i: number) => GX0 + (i / (NPTS - 1)) * (GX1 - GX0)
  const trace = (cy: number, cycles: number) => {
    const pts: string[] = []
    for (let i = 0; i < NPTS; i++) {
      let v = 0
      for (let c = 0; c < cycles; c++) v += noise(c, i)
      v = v / cycles + sig(i)
      pts.push(`${i ? 'L' : 'M'}${x(i).toFixed(1)},${(cy - v * 16).toFixed(1)}`)
    }
    return pts.join('')
  }
  return (
    <>
      <Diagram w={640} h={298} title="Averaging receive cycles: one receive cycle shows a weak signal buried in noise. Averaging more cycles makes the repeating signal add up while the random noise cancels, so the signal stands out. Q65 does this, JT65 does not."
        caption="Same signal each cycle. Noise is different each time, so it averages away.">
        <T x={GX0} y={18} size={14} bold color={C.muted}>One cycle (JT65 style)</T>
        <Ln x1={GX0} y1={86} x2={GX1} y2={86} color={C.fill2} width={1.5} />
        <path d={trace(86, 1)} fill="none" stroke={C.muted} strokeWidth={1.8} strokeLinejoin="round" />
        <T x={GX0} y={152} size={14} bold color={C.signal}>Average of {n} cycle{n > 1 ? 's' : ''} (Q65)</T>
        <Ln x1={GX0} y1={220} x2={GX1} y2={220} color={C.fill2} width={1.5} />
        <path d={trace(220, n)} fill="none" stroke={C.signal} strokeWidth={2.5} strokeLinejoin="round" />
        <T x={x(70)} y={278} anchor="middle" size={13} bold color={C.signal}>{n < 3 ? 'signal hidden in noise' : 'signal stands out'}</T>
      </Diagram>
      <Controls>
        <Slider label="Cycles averaged" value={n} min={1} max={16} step={1} onChange={setN} format={(v) => `${v}`} color="var(--d-signal)" />
      </Controls>
    </>
  )
}
