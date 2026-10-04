import { useState } from 'react'
import { C, Controls, Diagram, Ln, Slider, T } from '../kit'

/** Log-periodic: each element is a fixed ratio longer than the last, and so is each gap. Different elements work at different frequencies. */
export function G9D_LogPeriodic() {
  const [f, setF] = useState(0.5)
  const n = 9, r = 1.22
  const els = Array.from({ length: n }, (_, k) => ({ h: 20 * Math.pow(r, k), s: 16 * Math.pow(r, k) }))
  let x = 50
  const xs = els.map((e) => { const cur = x; x += e.s; return cur })
  const idx = (1 - f) * (n - 1) // resonant element: long for low frequency
  const cy = 150
  return (
    <>
      <Diagram w={640} h={290} title="Log-periodic antenna: element length and spacing both grow by a constant ratio along the boom. Only the elements near half-wave length for the signal frequency are active, so it works over a wide band"
        caption="Every element is the same ratio longer than its neighbor, and so is every gap. The working part slides along the boom with frequency.">
        <Ln x1={xs[0] - 10} y1={cy} x2={xs[n - 1] + 20} y2={cy} color={C.muted} width={5} />
        {els.map((e, k) => {
          const d = Math.abs(k - idx)
          const on = d < 1
          return <Ln key={k} x1={xs[k]} y1={cy - e.h} x2={xs[k]} y2={cy + e.h} color={on ? C.good : C.signal} width={on ? 7 : 4} />
        })}
        <T x={xs[0]} y={cy + els[0].h + 20} anchor="middle" size={12} bold color={C.muted}>short</T>
        <T x={xs[n - 1]} y={cy + els[n - 1].h + 18} anchor="middle" size={12} bold color={C.muted}>long</T>
        <T x={320} y={18} anchor="middle" size={14} bold color={C.good}>green: the active elements at this frequency</T>
        <T x={560} y={100} anchor="middle" size={13} bold color={C.power}>element length</T>
        <T x={560} y={120} anchor="middle" size={13} bold color={C.power}>and spacing</T>
        <T x={560} y={140} anchor="middle" size={13} bold color={C.power}>change by a</T>
        <T x={560} y={160} anchor="middle" size={13} bold color={C.power}>constant ratio</T>
      </Diagram>
      <Controls>
        <Slider label="Signal frequency" value={f} min={0} max={1} step={0.01} onChange={setF} format={(v) => (v < 0.34 ? 'low end' : v < 0.67 ? 'middle' : 'high end')} color="var(--d-signal)" />
      </Controls>
    </>
  )
}
