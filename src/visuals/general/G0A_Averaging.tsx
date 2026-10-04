import { useState } from 'react'
import { C, Controls, Diagram, Ln, Readout, Slider, T, fmt } from '../kit'

/** Exposure is averaged over time: average = power while on x duty cycle. Compare with the limit. */
export function Averaging() {
  const [peak, setPeak] = useState(3)
  const [duty, setDuty] = useState(30)
  const N = 20, x0 = 40, w = 440, cw = w / N, yb = 232, u = 44
  const on = Array.from({ length: N }, (_, i) => Math.floor(((i + 1) * duty) / 100) > Math.floor((i * duty) / 100))
  const avg = (peak * duty) / 100
  const ok = avg <= 1
  const col = ok ? C.good : C.bad
  return (
    <>
      <Diagram w={640} h={290} title={`Power while transmitting ${peak} times the limit at ${duty} percent duty cycle averages ${fmt(avg, 3)} times the limit: ${ok ? 'within' : 'over'} the exposure limit`}
        caption="The limit applies to the average over the averaging period, not to each instant.">
        <T x={x0} y={22} size={14} bold color={C.power}>RF exposure while on the air</T>
        {on.map((b, i) => (
          <rect key={i} x={x0 + i * cw + 1} y={b ? yb - u * peak : yb - 3} width={cw - 2} height={b ? u * peak : 3} fill={b ? C.power : C.fill2} fillOpacity={b ? 0.8 : 1} rx={2} />
        ))}
        <Ln x1={x0} y1={yb} x2={x0 + w} y2={yb} color={C.muted} width={2} />
        <Ln x1={x0} y1={yb - u} x2={x0 + w + 8} y2={yb - u} color={C.bad} width={3} dash="3 5" />
        <T x={x0 + w + 14} y={yb - u} size={13} bold color={C.bad}>limit</T>
        <Ln x1={x0} y1={yb - u * avg} x2={x0 + w + 8} y2={yb - u * avg} color={col} width={3} dash="9 5" />
        <T x={x0 + w + 14} y={yb - u * avg + (Math.abs(avg - 1) < 0.25 ? 18 : 0)} size={13} bold color={col}>average</T>
        <T x={x0} y={yb + 20} size={13} color={C.muted}>time over the averaging period →</T>
        <T x={x0 + w} y={yb + 44} anchor="end" size={14} bold color={col}>{ok ? 'Average is within the limit' : 'Average is over the limit'}</T>
      </Diagram>
      <Controls>
        <Slider label="Power while transmitting (limit = 1)" value={peak} min={1} max={4} step={0.5} onChange={setPeak} format={(v) => `${v}×`} color="var(--d-power)" />
        <Slider label="Duty cycle" value={duty} min={10} max={100} step={10} onChange={setDuty} format={(v) => `${v}%`} color="var(--d-resist)" />
        <Readout label="Average exposure" value={`${fmt(avg, 3)}×`} unit=" limit" color={ok ? 'var(--d-good)' : 'var(--d-bad)'} />
      </Controls>
    </>
  )
}
