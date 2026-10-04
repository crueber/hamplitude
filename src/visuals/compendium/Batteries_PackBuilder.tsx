import { useState } from 'react'
import { Battery, C, Choice, Controls, Diagram, Dot, Readout, Slider, T, Wire, fmt } from '../kit'

interface Chem { id: string; name: string; v: number; note: string }
const CHEMS: Chem[] = [
  { id: 'pb', name: 'Lead-acid', v: 2.0, note: '6 cells make a 12 V battery' },
  { id: 'nimh', name: 'NiMH', v: 1.2, note: 'rechargeable AA and AAA cells' },
  { id: 'li', name: 'Li-ion', v: 3.7, note: 'often written 3.6 V or 3.7 V' },
  { id: 'lfp', name: 'LiFePO4', v: 3.2, note: '4 cells make about 12.8 V' },
]

/** Cells in series add voltage; strings in parallel add capacity. Nominal cell voltages are by chemistry. */
export function Batteries_PackBuilder() {
  const [chem, setChem] = useState('lfp')
  const [ns, setNs] = useState(4)
  const [np, setNp] = useState(1)
  const [ah, setAh] = useState(10)
  const c = CHEMS.find((x) => x.id === chem)!
  const volts = c.v * ns
  const cap = ah * np
  const wh = volts * cap
  const dx = 40, rowH = 44, yc = 100
  const x0 = 320 - (dx * ns) / 2, xEnd = x0 + dx * ns
  return (
    <>
      <Diagram w={640} h={262}
        title={`${ns} ${c.name} cells in series, ${np} string${np > 1 ? 's' : ''} in parallel: ${fmt(volts)} volts nominal, ${fmt(cap)} amp-hours, ${fmt(wh)} watt-hours`}
        caption="Series adds voltage; parallel adds capacity. Nominal values: real voltage rises when charged and sags when discharged.">
        <T x={20} y={22} size={14} bold>{ns} × {c.name} in series, {np} string{np > 1 ? 's' : ''} in parallel</T>
        {Array.from({ length: np }, (_, r) => {
          const y = yc + (r - (np - 1) / 2) * rowH
          return (
            <g key={r}>
              <Wire pts={[[x0 - 20, y], [xEnd + 20, y]]} />
              {Array.from({ length: ns }, (_, i) => (
                <g key={i}>
                  <rect x={x0 + i * dx + 4} y={y - 14} width={dx - 8} height={28} fill={C.bg} />
                  <Battery x={x0 + i * dx + dx / 2} y={y} len={dx - 8} color={C.voltage} />
                </g>
              ))}
              <Dot x={x0 - 20} y={y} /><Dot x={xEnd + 20} y={y} />
            </g>
          )
        })}
        {np > 1 && <Wire pts={[[x0 - 20, yc - ((np - 1) / 2) * rowH], [x0 - 20, yc + ((np - 1) / 2) * rowH]]} />}
        {np > 1 && <Wire pts={[[xEnd + 20, yc - ((np - 1) / 2) * rowH], [xEnd + 20, yc + ((np - 1) / 2) * rowH]]} />}
        <T x={x0 - 34} y={yc} anchor="end" size={16} bold color={C.voltage}>+</T>
        <T x={xEnd + 34} y={yc} anchor="start" size={16} bold color={C.muted}>−</T>

        <T x={40} y={186} size={13} color={C.muted}>one cell, nominal</T>
        <T x={40} y={210} size={22} bold mono color={C.voltage}>{fmt(c.v)} V</T>
        <T x={240} y={186} size={13} color={C.muted}>pack voltage</T>
        <T x={240} y={210} size={22} bold mono color={C.voltage}>{fmt(volts)} V</T>
        <T x={440} y={186} size={13} color={C.muted}>energy = V × Ah</T>
        <T x={440} y={210} size={22} bold mono color={C.power}>{fmt(wh)} Wh</T>
        <T x={40} y={242} size={12} color={C.muted}>{c.note}</T>
      </Diagram>
      <Controls>
        <Choice label="Chemistry" value={chem} onChange={setChem} options={CHEMS.map((x) => ({ value: x.id, label: x.name }))} />
        <Slider label="Cells in series" value={ns} min={1} max={8} onChange={setNs} color={C.voltage} />
        <Slider label="Strings in parallel" value={np} min={1} max={3} onChange={setNp} color={C.current} />
        <Slider label="Capacity per cell" value={ah} min={1} max={50} onChange={setAh} format={(v) => `${v} Ah`} color={C.power} />
        <Readout label="Pack" value={`${fmt(volts)} V · ${fmt(cap)} Ah`} color={C.voltage} />
      </Controls>
    </>
  )
}
