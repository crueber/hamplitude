import { useState } from 'react'
import { C, Controls, Diagram, Ln, Readout, Slider, T, Wire, Battery, Resistor, fmt } from '../kit'

/** Kirchhoff's voltage law: walk once around a loop and the rises (battery) and falls (resistors) cancel to zero. */
export function KirchhoffLaws_Loop() {
  const [e, setE] = useState(12)
  const [r1, setR1] = useState(10)
  const [r2, setR2] = useState(20)
  const [r3, setR3] = useState(30)
  const i = e / (r1 + r2 + r3)
  const d = [i * r1, i * r2, i * r3]
  const base = 232, scale = 7.5 // px per volt, E max 24 V -> 180 px
  const cols = [364, 444, 524, 604]
  const names = ['Battery', 'R1', 'R2', 'R3']
  const tops = [e, e - d[0], e - d[0] - d[1], e - d[0] - d[1] - d[2]]
  const bars = [
    { lo: 0, hi: e, label: `+${fmt(e)}`, color: C.voltage },
    { lo: tops[1], hi: tops[0], label: `−${fmt(d[0], 3)}`, color: C.resist },
    { lo: tops[2], hi: tops[1], label: `−${fmt(d[1], 3)}`, color: C.resist },
    { lo: 0, hi: tops[2], label: `−${fmt(d[2], 3)}`, color: C.resist },
  ]
  const y = (v: number) => base - v * scale
  return (
    <>
      <Diagram w={640} h={306}
        title={`Kirchhoff's voltage law: a ${e} volt battery raises the voltage, then R1, R2 and R3 drop ${fmt(d[0])}, ${fmt(d[1])} and ${fmt(d[2])} volts. Around the loop the changes add up to zero.`}
        caption="Around any loop, the rises and drops cancel to zero.">
        <Wire pts={[[50, 70], [270, 70], [270, 240], [50, 240], [50, 70]]} color={C.muted} width={2.5} />
        <rect x={34} y={120} width={32} height={70} fill={C.bg} />
        <Battery x={50} y={155} rot={90} len={70} color={C.voltage} />
        <T x={22} y={155} anchor="middle" size={12} bold color={C.voltage}>{e}V</T>
        <rect x={110} y={54} width={100} height={32} fill={C.bg} />
        <Resistor x={160} y={70} len={90} color={C.resist} />
        <T x={160} y={40} anchor="middle" size={13} bold color={C.resist}>R1  <tspan fontWeight={500} fill={C.muted}>{r1} Ω</tspan></T>
        <rect x={254} y={110} width={32} height={90} fill={C.bg} />
        <Resistor x={270} y={155} rot={90} len={90} color={C.resist} />
        <T x={288} y={146} anchor="start" size={13} bold color={C.resist}>R2</T>
        <T x={288} y={164} anchor="start" size={12} mono color={C.muted}>{r2} Ω</T>
        <rect x={110} y={224} width={100} height={32} fill={C.bg} />
        <Resistor x={160} y={240} len={90} color={C.resist} />
        <T x={160} y={270} anchor="middle" size={13} bold color={C.resist}>R3  <tspan fontWeight={500} fill={C.muted}>{r3} Ω</tspan></T>
        <Ln x1={110} y1={128} x2={210} y2={128} color={C.current} width={2.5} arrow />
        <T x={160} y={150} anchor="middle" size={13} bold color={C.current}>I = {fmt(i)} A</T>
        <T x={160} y={168} anchor="middle" size={12} color={C.muted}>same all the way round</T>

        <T x={492} y={16} anchor="middle" size={13} bold color={C.muted}>Voltage as you walk the loop</T>
        <Ln x1={340} y1={base} x2={640} y2={base} color={C.muted} width={2} />
        <T x={344} y={base + 12} size={12} color={C.muted}>0 V</T>
        {bars.map((b, k) => (
          <g key={k}>
            <rect x={cols[k] - 24} y={y(b.hi)} width={48} height={Math.max(2, (b.hi - b.lo) * scale)} fill={b.color} opacity={0.4} stroke={b.color} strokeWidth={2} />
            <T x={cols[k]} y={y(b.hi) - 12} anchor="middle" size={13} bold color={b.color}>{b.label} V</T>
            <T x={cols[k]} y={base + 28} anchor="middle" size={13} bold>{names[k]}</T>
          </g>
        ))}
        <T x={492} y={base + 50} anchor="middle" size={13} mono bold>+{fmt(e)} − {fmt(d[0])} − {fmt(d[1])} − {fmt(d[2])} = 0</T>
      </Diagram>
      <Controls>
        <Slider label="Battery (E)" value={e} min={1} max={24} onChange={setE} format={(v) => `${v} V`} color="var(--d-voltage)" />
        <Slider label="R1" value={r1} min={1} max={100} onChange={setR1} format={(v) => `${v} Ω`} color="var(--d-resist)" />
        <Slider label="R2" value={r2} min={1} max={100} onChange={setR2} format={(v) => `${v} Ω`} color="var(--d-resist)" />
        <Slider label="R3" value={r3} min={1} max={100} onChange={setR3} format={(v) => `${v} Ω`} color="var(--d-resist)" />
        <Readout label="Sum of drops" value={fmt(d[0] + d[1] + d[2])} unit="V" color="var(--d-voltage)" />
      </Controls>
    </>
  )
}
