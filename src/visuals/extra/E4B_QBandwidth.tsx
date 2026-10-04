import { useState } from 'react'
import { C, Controls, Diagram, Ln, Readout, Slider, T, si } from '../kit'

const F0 = 7.1 // MHz
/** Q of a tuned circuit = centre frequency / bandwidth. Narrower response = higher Q. */
export function QBandwidth() {
  const [q, setQ] = useState(20)
  const bw = F0 / q
  const x0 = 40, x1 = 600, base = 176, top = 40
  const f = (x: number) => F0 * (0.85 + ((x - x0) / (x1 - x0)) * 0.3)
  const X = (fr: number) => x0 + ((fr / F0 - 0.85) / 0.3) * (x1 - x0)
  let d = ''
  for (let x = x0; x <= x1; x += 2) {
    const r = f(x) / F0
    const a = 1 / Math.sqrt(1 + q * q * (r - 1 / r) ** 2)
    d += `${d ? 'L' : 'M'}${x},${(base - a * (base - top)).toFixed(1)}`
  }
  const yh = base - 0.7071 * (base - top)
  const xl = X(F0 - bw / 2), xh = X(F0 + bw / 2)
  return (
    <>
      <Diagram w={640} h={244} title={`A tuned circuit with Q of ${q} centred on ${F0} megahertz has a bandwidth of ${si(bw * 1e6, 'Hz')}. Higher Q means a narrower response.`}
        caption="Measure Q from the response: find the −3 dB bandwidth, then Q = centre frequency ÷ bandwidth.">
        <Ln x1={x0} y1={base} x2={x1} y2={base} color={C.ink} width={2} />
        <path d={d} fill="none" stroke={C.signal} strokeWidth={3} />
        <Ln x1={x0} y1={yh} x2={x1} y2={yh} color={C.muted} width={1.5} dash="5 4" />
        <T x={x1} y={yh - 12} anchor="end" size={12} color={C.muted}>−3 dB (half power)</T>
        <Ln x1={X(F0)} y1={top - 6} x2={X(F0)} y2={base} color={C.muted} width={1.5} dash="3 4" />
        <T x={X(F0)} y={base + 16} anchor="middle" size={12} mono color={C.muted}>{F0} MHz</T>
        <Ln x1={xl} y1={yh} x2={xh} y2={yh} color={C.power} width={4} />
        <T x={X(F0) + (q > 60 ? 28 : 0)} y={yh + (q > 60 ? -14 : 16)} anchor={q > 60 ? 'start' : 'middle'} size={13} bold color={C.power}>bandwidth</T>
        <T x={320} y={216} anchor="middle" bold size={16} mono>Q = {F0} MHz ÷ {si(bw * 1e6, 'Hz')} = <tspan fill={C.signal}>{q}</tspan></T>
      </Diagram>
      <Controls>
        <Slider label="Q of circuit" value={q} min={5} max={100} onChange={setQ} color="var(--d-signal)" />
        <Readout label="Bandwidth" value={si(bw * 1e6, 'Hz')} color="var(--d-power)" />
      </Controls>
    </>
  )
}
