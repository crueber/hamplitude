import { useState } from 'react'
import { C, Controls, Diagram, Ln, Readout, Slider, T } from '../kit'

const F1 = 146.52, RX = 146.7
const r2 = (n: number) => Math.round(n * 100) / 100
/** Two signals in a nonlinear stage create 2f1-f2 and 2f2-f1: evenly spaced beyond the pair. */
export function ImdProducts() {
  const [f2, setF2] = useState(146.34)
  const lo = 145.8, hi = 147.4, x0 = 30, x1 = 610, base = 150
  const X = (f: number) => x0 + ((f - lo) / (hi - lo)) * (x1 - x0)
  const a = r2(2 * F1 - f2), b = r2(2 * f2 - F1)
  const hit = Math.abs(a - RX) < 0.005 || Math.abs(b - RX) < 0.005
  const spike = (f: number, h: number, col: string, label?: string, key?: string) => f < lo || f > hi ? null : (
    <g key={key}>
      <path d={`M${X(f) - 6},${base} L${X(f)},${base - h} L${X(f) + 6},${base}`} fill={col} fillOpacity={0.3} stroke={col} strokeWidth={3} strokeLinejoin="round" />
      {label && <T x={X(f)} y={base + 16} anchor="middle" size={12} bold mono color={col}>{label}</T>}
    </g>
  )
  return (
    <>
      <Diagram w={640} h={236} title={`Two signals at ${F1} and ${f2} megahertz create third-order products at ${a} and ${b} megahertz. A receiver tuned to ${RX} megahertz ${hit ? 'hears one of them' : 'does not hear one'}.`}
        caption="Third-order products sit the same spacing beyond each signal: 2f₁ − f₂ and 2f₂ − f₁.">
        <Ln x1={x0} y1={base} x2={x1} y2={base} color={C.ink} width={2} />
        <Ln x1={X(RX)} y1={34} x2={X(RX)} y2={base} color={C.good} width={2} dash="5 4" />
        <T x={X(RX)} y={22} anchor="middle" size={13} bold color={C.good}>receiver {RX.toFixed(2)}</T>
        {spike(F1, 90, C.signal, F1.toFixed(2), 'f1')}
        {spike(f2, 90, C.signal, f2.toFixed(2), 'f2')}
        {spike(a, 48, hit && Math.abs(a - RX) < 0.005 ? C.bad : C.resist, undefined, 'a')}
        {spike(b, 48, hit && Math.abs(b - RX) < 0.005 ? C.bad : C.resist, undefined, 'b')}
        <T x={320} y={190} anchor="middle" size={14} mono bold>2 × {F1.toFixed(2)} − {f2.toFixed(2)} = <tspan fill={C.resist}>{a.toFixed(2)}</tspan></T>
        <T x={320} y={212} anchor="middle" size={14} mono bold>2 × {f2.toFixed(2)} − {F1.toFixed(2)} = <tspan fill={C.resist}>{b.toFixed(2)}</tspan></T>
      </Diagram>
      <Controls>
        <Slider label="Second transmitter" value={f2} min={146.1} max={147.1} step={0.01} onChange={(v) => setF2(r2(v))} format={(v) => `${v.toFixed(2)} MHz`} color="var(--d-signal)" />
        <Readout label="Receiver at 146.70" value={hit ? 'interference' : 'clear'} color={hit ? 'var(--d-bad)' : 'var(--d-good)'} />
      </Controls>
    </>
  )
}
