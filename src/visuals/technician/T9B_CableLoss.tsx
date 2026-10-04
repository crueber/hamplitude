import { useState } from 'react'
import { C, Controls, Diagram, Ln, Slider, T, si } from '../kit'

// Illustrative: loss grows with frequency, and falls with a bigger / better cable.
const CABLES = [
  { n: 'RG-58', k: 1.0, color: C.bad },
  { n: 'RG-213', k: 0.45, color: C.resist },
  { n: 'Air hardline', k: 0.12, color: C.good },
]
const F0 = 1.8, F1 = 1000

/** Loss versus frequency for three feed lines (schematic, no absolute scale). */
export function CableLoss() {
  const [p, setP] = useState(0.45)
  const f = F0 * Math.pow(F1 / F0, p)
  const W = 640, H = 306, x0 = 50, x1 = 520, yb = 250, yt = 36
  const X = (fr: number) => x0 + (Math.log(fr / F0) / Math.log(F1 / F0)) * (x1 - x0)
  const loss = (k: number, fr: number) => k * Math.sqrt(fr)
  const maxL = loss(1, F1)
  const Y = (l: number) => yb - (l / maxL) * (yb - yt)
  const curve = (k: number) => Array.from({ length: 90 }, (_, i) => {
    const fr = F0 * Math.pow(F1 / F0, i / 89)
    return `${i ? 'L' : 'M'}${X(fr).toFixed(1)},${Y(loss(k, fr)).toFixed(1)}`
  }).join('')
  return (
    <>
      <Diagram w={W} h={H} title="Loss versus frequency for RG-58, RG-213 and air-insulated hardline. Every cable loses more as frequency rises; RG-213 loses less than RG-58 and hardline least of all"
        caption="Schematic: no scale on the loss axis. The order and the upward slope are what matter.">
        <Ln x1={x0} y1={yb} x2={x0} y2={yt - 8} color={C.muted} width={2} arrow />
        <Ln x1={x0} y1={yb} x2={x1 + 16} y2={yb} color={C.muted} width={2} />
        <T x={x0 + 12} y={yt + 2} size={13} bold color={C.muted}>more loss</T>
        {[[3.5, '3.5'], [14, '14'], [146, '146'], [446, '446']].map(([v, l]) => (
          <g key={l as string}>
            <Ln x1={X(v as number)} y1={yb} x2={X(v as number)} y2={yb + 6} color={C.muted} width={2} />
            <T x={X(v as number)} y={yb + 20} anchor="middle" size={12} color={C.muted}>{l as string}</T>
          </g>
        ))}
        <T x={(x0 + x1) / 2} y={yb + 42} anchor="middle" size={13} color={C.muted}>frequency (MHz)</T>
        {CABLES.map((c) => <path key={c.n} d={curve(c.k)} fill="none" stroke={c.color} strokeWidth={3.5} strokeLinecap="round" />)}
        <Ln x1={X(f)} y1={yt} x2={X(f)} y2={yb} color={C.ink} width={1.5} dash="4 4" />
        {CABLES.map((c) => <circle key={c.n} cx={X(f)} cy={Y(loss(c.k, f))} r={6} fill={c.color} stroke={C.bg} strokeWidth={2.5} />)}
        {CABLES.map((c) => <T key={c.n} x={x1 + 6} y={Y(loss(c.k, F1))} size={13} bold color={c.color}>{c.n}</T>)}
      </Diagram>
      <Controls>
        <Slider label="Frequency" value={p} min={0} max={1} step={0.002} onChange={setP} format={() => si(f * 1e6, 'Hz')} color="var(--d-signal)" />
      </Controls>
    </>
  )
}
