import { useState } from 'react'
import { C, Controls, Diagram, Ln, Readout, Slider, T, Wire, Battery, Resistor, Dot, fmt } from '../kit'

/** Kirchhoff's current law: at each junction the current arriving equals the current leaving. */
export function KirchhoffLaws_Node() {
  const [e, setE] = useState(12)
  const [r1, setR1] = useState(20)
  const [r2, setR2] = useState(30)
  const [r3, setR3] = useState(60)
  const rs = [r1, r2, r3]
  const is = rs.map((r) => e / r)
  const tot = is[0] + is[1] + is[2]
  const bx = [230, 370, 510]
  const rail = [tot, tot - is[0], tot - is[0] - is[1]]
  return (
    <>
      <Diagram w={640} h={310}
        title={`Kirchhoff's current law: ${fmt(tot)} amperes leave the battery. At the first junction ${fmt(is[0])} amperes turn down through R1 and ${fmt(rail[1])} continue, and so on. At every junction, current in equals current out.`}
        caption="Each junction hands current to a branch and passes the rest along. Nothing is lost or created.">
        <Wire pts={[[60, 70], [510, 70]]} color={C.muted} width={2.5} />
        <Wire pts={[[60, 240], [510, 240]]} color={C.muted} width={2.5} />
        <Wire pts={[[60, 70], [60, 120]]} color={C.muted} width={2.5} />
        <Wire pts={[[60, 190], [60, 240]]} color={C.muted} width={2.5} />
        <Battery x={60} y={155} rot={90} len={70} color={C.voltage} />
        <T x={36} y={155} anchor="end" bold size={13} color={C.voltage}>{e} V</T>
        {bx.map((x, k) => (
          <g key={x}>
            <Wire pts={[[x, 70], [x, 110]]} color={C.muted} width={2.5} />
            <Wire pts={[[x, 200], [x, 240]]} color={C.muted} width={2.5} />
            <Resistor x={x} y={155} rot={90} len={90} color={C.resist} />
            <T x={x - 24} y={155} anchor="end" size={13} bold color={C.resist}>R{k + 1}</T>
            <T x={x - 24} y={173} anchor="end" size={12} mono color={C.muted}>{rs[k]} Ω</T>
            <Dot x={x} y={70} color={C.ink} />
            <T x={x + 18} y={155} anchor="start" size={13} bold color={C.current}>↓ {fmt(is[k])} A</T>
            <T x={x + 14} y={50} anchor="start" size={12} color={C.muted}>junction {k + 1}</T>
          </g>
        ))}
        {[0, 1, 2].map((k) => {
          const xa = k === 0 ? 60 : bx[k - 1], xb = bx[k]
          const mid = (xa + xb) / 2 + (k === 0 ? 10 : 0)
          return (
            <g key={k}>
              <Ln x1={mid - 40} y1={86} x2={mid + 30} y2={86} color={C.current} width={2.5} arrow />
              <T x={mid - 5} y={104} anchor="middle" size={13} bold color={C.current}>{fmt(rail[k])} A</T>
            </g>
          )
        })}
        <T x={320} y={278} anchor="middle" size={14} mono bold>
          {fmt(tot)} A = {fmt(is[0])} + {fmt(is[1])} + {fmt(is[2])} A
        </T>
        <T x={320} y={298} anchor="middle" size={12} color={C.muted}>current from the battery = sum of the branch currents</T>
      </Diagram>
      <Controls>
        <Slider label="Battery (E)" value={e} min={1} max={24} onChange={setE} format={(v) => `${v} V`} color="var(--d-voltage)" />
        <Slider label="R1" value={r1} min={5} max={100} step={5} onChange={setR1} format={(v) => `${v} Ω`} color="var(--d-resist)" />
        <Slider label="R2" value={r2} min={5} max={100} step={5} onChange={setR2} format={(v) => `${v} Ω`} color="var(--d-resist)" />
        <Slider label="R3" value={r3} min={5} max={100} step={5} onChange={setR3} format={(v) => `${v} Ω`} color="var(--d-resist)" />
        <Readout label="Total current from the battery" value={fmt(tot)} unit="A" color="var(--d-current)" />
      </Controls>
    </>
  )
}
