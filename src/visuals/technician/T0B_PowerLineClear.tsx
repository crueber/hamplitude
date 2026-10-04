import { useState } from 'react'
import { C, Controls, Diagram, Ln, Readout, Slider, T, fmt } from '../kit'

const SC = 3.2 // px per foot
const WIRE_H = 30 // example height of the power wires, ft

/** If the antenna falls toward the line, the nearest part must stay at least 10 feet from the wires. */
export function PowerLineClear() {
  const [H, setH] = useState(40) // total antenna height, ft
  const [d, setD] = useState(70) // horizontal distance to the line, ft
  const gy = 275, bx = 70
  const wx = bx + d * SC, wy = gy - WIRE_H * SC
  const dist = Math.hypot(d, WIRE_H)
  const gap = dist - H // closest the tip gets, if it falls toward the wires
  const ok = gap >= 10
  const ux = (d * SC) / (dist * SC), uy = (WIRE_H * SC) / (dist * SC)
  const tipX = bx + ux * H * SC, tipY = gy - uy * H * SC
  const col = ok ? C.good : C.bad
  return (
    <>
      <Diagram w={640} h={310} title={`Antenna ${H} feet tall, ${d} feet from the power line: if it falls toward the line it ends ${gap > 0 ? fmt(gap, 3) + ' feet short of' : 'past'} the wires. ${ok ? 'Safe, at least 10 feet clear' : 'Unsafe, under 10 feet'}`}
        caption="Example numbers. The rule: if it falls, no part may come within 10 feet of the power wires.">
        <Ln x1={20} y1={gy} x2={620} y2={gy} color={C.muted} width={4} />
        {/* fall circle */}
        <path d={`M${bx},${gy - H * SC} A${H * SC},${H * SC} 0 0 1 ${bx + H * SC},${gy}`} fill="none" stroke={C.muted} strokeWidth={2} strokeDasharray="5 5" />
        {/* tower */}
        <Ln x1={bx} y1={gy} x2={bx} y2={gy - H * SC} color={C.ink} width={6} />
        <T x={bx} y={gy + 20} anchor="middle" size={13} bold>tower + antenna</T>
        {/* fallen ghost */}
        <Ln x1={bx} y1={gy} x2={tipX} y2={tipY} color={col} width={4} dash="7 5" />
        <circle cx={tipX} cy={tipY} r={6} fill={col} />
        {/* pole + wires */}
        <Ln x1={wx + 30} y1={gy} x2={wx + 30} y2={wy - 20} color={C.resist} width={9} />
        <Ln x1={wx - 22} y1={wy - 20} x2={wx + 82} y2={wy - 20} color={C.resist} width={7} />
        <circle cx={wx} cy={wy} r={SC * 10} fill={C.bad} fillOpacity={0.15} stroke={C.bad} strokeWidth={2} strokeDasharray="4 4" />
        <circle cx={wx} cy={wy} r={5.5} fill={C.bad} />
        <T x={wx + 14} y={wy - 40 + 4} size={13} bold color={C.bad}>power wire</T>
        {/* gap */}
        <Ln x1={tipX} y1={tipY} x2={wx} y2={wy} color={col} width={2} />
        <rect x={20} y={14} width={250} height={32} rx={8} fill={C.fill} />
        <T x={32} y={30} size={15} bold color={col}>{ok ? 'Safe: 10 ft or more clear' : 'Too close: under 10 ft'}</T>
      </Diagram>
      <Controls>
        <Slider label="Tower + antenna height (example)" value={H} min={20} max={60} step={1} onChange={setH} format={(v) => `${v} ft`} color="var(--d-resist)" />
        <Slider label="Distance to power line" value={d} min={10} max={100} step={1} onChange={setD} format={(v) => `${v} ft`} color="var(--d-bad)" />
        <Readout label="Closest it gets if it falls" value={gap > 0 ? fmt(gap, 3) : '0'} unit="ft" color={ok ? 'var(--d-good)' : 'var(--d-bad)'} />
      </Controls>
    </>
  )
}
