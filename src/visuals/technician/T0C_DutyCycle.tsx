import { useState } from 'react'
import { C, Controls, Diagram, Ln, Readout, Slider, T, fmt } from '../kit'

/** Duty cycle: the share of time you transmit. Exposure is averaged over time, so less on-air time means a higher allowed level. */
export function DutyCycle() {
  const [duty, setDuty] = useState(50)
  const N = 20
  const on = Array.from({ length: N }, (_, i) => Math.floor(((i + 1) * duty) / 100) > Math.floor((i * duty) / 100))
  const x0 = 40, w = 490, cw = w / N
  const yb = 190, ht = 90
  return (
    <>
      <Diagram w={640} h={250} title={`Transmitting ${duty} percent of the time: average exposure is ${duty} percent of the full-time level, so the allowed level is ${fmt(100 / duty, 3)} times higher`}
        caption="Exposure limits use the average over time, so transmitting less of the time lets the allowed level rise.">
        <T x={x0} y={22} size={14} bold color={C.power}>Transmitter on (power) during the averaging time</T>
        {on.map((b, i) => (
          <rect key={i} x={x0 + i * cw + 1} y={b ? yb - ht : yb - 4} width={cw - 2} height={b ? ht : 4} fill={b ? C.power : C.fill2} fillOpacity={b ? 0.85 : 1} rx={2} />
        ))}
        <Ln x1={x0} y1={yb} x2={x0 + w} y2={yb} color={C.muted} width={2} />
        <Ln x1={x0} y1={yb - (ht * duty) / 100} x2={x0 + w} y2={yb - (ht * duty) / 100} color={C.resist} width={3} dash="8 5" />
        <T x={x0 + w + 10} y={yb - (ht * duty) / 100} size={13} bold color={C.resist}>average</T>
        <T x={x0} y={yb + 24} size={13} color={C.muted}>time →</T>
        <T x={x0 + w} y={yb + 24} anchor="end" size={13} color={C.muted}>duty cycle = % of time transmitting</T>
      </Diagram>
      <Controls>
        <Slider label="Duty cycle" value={duty} min={10} max={100} step={10} onChange={setDuty} format={(v) => `${v}%`} color="var(--d-power)" />
        <Readout label="Allowed level" value={`×${fmt(100 / duty, 3)}`} color="var(--d-good)" />
      </Controls>
    </>
  )
}
