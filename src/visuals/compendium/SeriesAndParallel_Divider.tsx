import { useState } from 'react'
import { C, Controls, Diagram, Ln, Readout, Slider, T, Wire, Battery, Resistor, fmt } from '../kit'

/** Voltage divider: two series resistors share the supply in proportion to their resistance. */
export function SeriesAndParallel_Divider() {
  const [e, setE] = useState(12)
  const [r1, setR1] = useState(30)
  const [r2, setR2] = useState(10)
  const i = e / (r1 + r2)
  const v1 = i * r1, v2 = i * r2
  const by = 56, bh = 170
  const split = by + (bh * v1) / e
  return (
    <>
      <Diagram w={640} h={290}
        title={`Voltage divider: ${e} volts across ${r1} and ${r2} ohms in series. The current is ${fmt(i)} amperes, R1 drops ${fmt(v1)} volts and R2 drops ${fmt(v2)} volts.`}
        caption="The same current flows through both, so the bigger resistor takes the bigger share of the voltage.">
        <Wire pts={[[80, 70], [330, 70], [330, 240], [80, 240], [80, 70]]} color={C.muted} width={2.5} />
        <rect x={64} y={120} width={32} height={70} fill={C.bg} />
        <Battery x={80} y={155} rot={90} len={70} color={C.voltage} />
        <T x={52} y={155} anchor="end" bold color={C.voltage}>{e} V</T>
        <rect x={165} y={54} width={100} height={32} fill={C.bg} />
        <Resistor x={215} y={70} len={90} color={C.resist} />
        <T x={215} y={36} anchor="middle" bold size={13} color={C.resist}>R1  <tspan fontWeight={500} fill={C.muted}>{r1} Ω</tspan></T>
        <rect x={314} y={110} width={32} height={90} fill={C.bg} />
        <Resistor x={330} y={155} rot={90} len={90} color={C.resist} />
        <T x={348} y={140} anchor="start" bold size={13} color={C.resist}>R2</T>
        <T x={348} y={158} anchor="start" size={12} mono color={C.muted}>{r2} Ω</T>
        <T x={348} y={182} anchor="start" size={14} bold color={C.voltage}>{fmt(v2)} V</T>
        <T x={348} y={200} anchor="start" size={12} color={C.muted}>across R2</T>
        <T x={215} y={110} anchor="middle" size={14} bold color={C.voltage}>{fmt(v1)} V</T>
        <T x={215} y={128} anchor="middle" size={12} color={C.muted}>across R1</T>
        <T x={215} y={205} anchor="middle" size={14} bold color={C.current}>I = {fmt(i)} A</T>
        <T x={215} y={223} anchor="middle" size={12} color={C.muted}>the same everywhere</T>

        {/* stacked bar of the supply */}
        <T x={480} y={26} anchor="middle" bold size={13} color={C.muted}>Where the {e} V goes</T>
        <rect x={450} y={by} width={60} height={split - by} fill={C.voltage} opacity={0.35} stroke={C.voltage} strokeWidth={2} />
        <rect x={450} y={split} width={60} height={by + bh - split} fill={C.voltage} opacity={0.7} stroke={C.voltage} strokeWidth={2} />
        <T x={525} y={by + 12} size={13} bold>R1: {fmt(v1)} V</T>
        <T x={525} y={by + bh - 12} size={13} bold>R2: {fmt(v2)} V</T>
        <T x={480} y={by + bh + 22} anchor="middle" size={12} mono color={C.muted}>V = E × R ÷ (R1 + R2)</T>
        <Ln x1={440} y1={by} x2={440} y2={by + bh} color={C.muted} width={1.5} arrow="both" />
      </Diagram>
      <Controls>
        <Slider label="Supply (E)" value={e} min={1} max={24} onChange={setE} format={(v) => `${v} V`} color="var(--d-voltage)" />
        <Slider label="R1" value={r1} min={1} max={100} onChange={setR1} format={(v) => `${v} Ω`} color="var(--d-resist)" />
        <Slider label="R2" value={r2} min={1} max={100} onChange={setR2} format={(v) => `${v} Ω`} color="var(--d-resist)" />
        <Readout label="Voltage across R2 (the divider output)" value={fmt(v2)} unit="V" color="var(--d-voltage)" />
      </Controls>
    </>
  )
}
