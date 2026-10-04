import { useState } from 'react'
import { C, Box, Controls, Diagram, Ln, Readout, Slider, T } from '../kit'

/** Screwdriver antenna: a motor moves a contact along a base coil, changing the loading inductance. */
export function G9D_Screwdriver() {
  const [p, setP] = useState(0.55) // fraction of the coil in use
  const turns = 9, x = 200, top = 96, bot = 196
  const used = Math.round(p * turns)
  const coilPt = (i: number) => ({ x: x + (i % 2 ? 22 : -22), y: top + ((bot - top) / turns) * i })
  const pts = Array.from({ length: turns + 1 }, (_, i) => coilPt(i))
  const split = (bot - top) * (1 - used / turns) + top // contact height
  return (
    <>
      <Diagram w={640} h={270} title={`Screwdriver mobile antenna: a motor slides a contact along the base coil, so about ${Math.round(p * 100)} percent of the coil is in use. It adjusts the base loading inductance`}
        caption="The motor changes how much of the coil is in the circuit: the loading inductance changes, and so does where the antenna resonates.">
        <Ln x1={x} y1={top} x2={x} y2={28} color={C.voltage} width={5} />
        <T x={x + 12} y={36} size={13} bold color={C.voltage}>whip</T>
        <path d={pts.map((q, i) => `${i ? 'L' : 'M'}${q.x},${q.y}`).join('')} fill="none" stroke={C.muted} strokeWidth={4} strokeLinejoin="round" />
        <path d={pts.slice(pts.length - used - 1).map((q, i) => `${i ? 'L' : 'M'}${q.x},${q.y}`).join('')} fill="none" stroke={C.power} strokeWidth={5} strokeLinejoin="round" />
        <Ln x1={x + 26} y1={split} x2={x + 90} y2={split} color={C.ink} width={3} />
        <circle cx={x + 26} cy={split} r={5} fill={C.ink} />
        <Box x={x + 90} y={split - 20} w={110} h={40} label="Motor" sub="slides the contact" color={C.resist} size={13} />
        <Ln x1={x} y1={bot} x2={x} y2={228} color={C.ink} width={4} />
        <rect x={80} y={228} width={320} height={22} fill={C.fill2} />
        <T x={240} y={239} anchor="middle" size={12} color={C.muted}>vehicle body</T>
        <T x={x - 40} y={top + 50} anchor="end" size={13} bold color={C.power}>base loading coil</T>
        <T x={440} y={120} size={14} bold color={C.power}>{p < 0.34 ? 'little coil in use' : p < 0.67 ? 'part of the coil in use' : 'most of the coil in use'}</T>
        <T x={440} y={146} size={13} color={C.muted}>more coil: more inductance</T>
      </Diagram>
      <Controls>
        <Slider label="Coil in use" value={p} min={0.1} max={1} step={0.01} onChange={setP} format={(v) => `${Math.round(v * 100)}%`} color="var(--d-power)" />
        <Readout label="Base loading inductance" value={p < 0.34 ? 'low' : p < 0.67 ? 'medium' : 'high'} color="var(--d-power)" />
      </Controls>
    </>
  )
}
