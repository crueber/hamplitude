import { useState } from 'react'
import { C, Controls, Diagram, Ln, Readout, Slider, T } from '../kit'

/** Average power = key-down power x duty cycle. A high-duty mode can push the average past the transmitter's rating. */
export function G8B_DutyCycle() {
  const [duty, setDuty] = useState(40)
  const P = 100, rating = 50 // illustrative watts
  const avg = (P * duty) / 100
  const over = avg > rating
  const N = 20
  const on = Array.from({ length: N }, (_, i) => Math.floor(((i + 1) * duty) / 100) > Math.floor((i * duty) / 100))
  const x0 = 40, w = 420, cw = w / N, yb = 150, ht = 100
  const col = over ? C.bad : C.good
  const ya = yb - (ht * avg) / P, yr = yb - (ht * rating) / P
  return (
    <>
      <Diagram w={640} h={236} title={`Transmitting ${duty} percent of the time at ${P} watts averages ${avg} watts. The transmitter's average power rating here is ${rating} watts, so it is ${over ? 'exceeded' : 'within its rating'}`}
        caption="Average power is output power times the share of time you transmit. High-duty modes can exceed the transmitter's rating.">
        <T x={x0} y={14} size={13} bold color={C.muted}>Transmitter output over time</T>
        {on.map((b, i) => <rect key={i} x={x0 + i * cw + 1} y={b ? yb - ht : yb - 4} width={cw - 2} height={b ? ht : 4} rx={2} fill={b ? C.power : C.fill2} fillOpacity={b ? 0.8 : 1} />)}
        <Ln x1={x0} y1={yb} x2={x0 + w} y2={yb} color={C.muted} width={2} />
        <Ln x1={x0} y1={yr} x2={x0 + w + 14} y2={yr} color={C.resist} width={3} dash="8 5" />
        <T x={x0 + w + 20} y={yr} size={12.5} bold color={C.resist}>rating</T>
        <T x={x0 + w + 20} y={yr + 16} size={12} color={C.muted}>(average)</T>
        <Ln x1={x0} y1={ya} x2={x0 + w + 14} y2={ya} color={col} width={3.5} />
        <T x={x0 + w + 20} y={ya + (ya > yr ? 14 : -4)} size={12.5} bold color={col}>average</T>
        <T x={x0} y={yb + 24} size={13} color={C.muted}>time →</T>
        <T x={x0 + w} y={yb + 24} anchor="end" size={13} bold color={col}>{over ? 'too hot: average exceeds the rating' : 'average is within the rating'}</T>
        <T x={x0} y={yb + 48} size={12.5} color={C.muted}>Example numbers: 100 W key-down, 50 W average rating.</T>
      </Diagram>
      <Controls>
        <Slider label="Duty cycle (share of time transmitting)" value={duty} min={10} max={100} step={10} onChange={setDuty} format={(v) => `${v}%`} color="var(--d-power)" />
        <Readout label="Average power" value={`${avg} W`} color={over ? 'var(--d-bad)' : 'var(--d-good)'} />
      </Controls>
    </>
  )
}
