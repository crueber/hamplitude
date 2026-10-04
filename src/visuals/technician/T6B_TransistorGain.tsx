import { useState } from 'react'
import { C, Controls, Diagram, Readout, Slider, T, Wire, Battery, Transistor, useTime, si } from '../kit'
import { LampDome } from '@/visuals/shared/SchematicSymbolGallery'

const BETA = 100
const IMAX = 5 // mA the lamp circuit can supply

/** A small base current controls a much larger collector current: switch (off/on) and amplifier (in between). */
export function TransistorGain() {
  const [ib, setIb] = useState(20) // µA
  const { t, ref } = useTime(1)
  const want = (ib * BETA) / 1000 // mA
  const ic = Math.min(want, IMAX)
  const sat = want >= IMAX
  const mode = ib === 0 ? 'OFF: no base current, no collector current' : sat ? 'ON (saturated): acts like a closed switch' : `Amplifying: collector current is ${BETA}× the base current`

  const path: [number, number][] = [[500, 150], [500, 50], [284, 50], [284, 110], [284, 190], [284, 230], [500, 230], [500, 150]]
  const segs = path.slice(0, -1).map((p, i) => ({ a: p, b: path[i + 1], len: Math.hypot(path[i + 1][0] - p[0], path[i + 1][1] - p[1]) }))
  const perim = segs.reduce((s, g) => s + g.len, 0)
  const nC = Math.round((ic / IMAX) * 16)
  const dotsC = Array.from({ length: nC }, (_, k) => {
    let d = (((k / Math.max(nC, 1)) * perim + t * 70) % perim + perim) % perim
    for (const g of segs) {
      if (d <= g.len) return { x: g.a[0] + ((g.b[0] - g.a[0]) * d) / g.len, y: g.a[1] + ((g.b[1] - g.a[1]) * d) / g.len }
      d -= g.len
    }
    return { x: 500, y: 150 }
  }).filter((d) => !(d.x === 284 && d.y > 106 && d.y < 194) && !(d.y === 50 && d.x > 350 && d.x < 430) && !(d.x === 500 && d.y > 106 && d.y < 194))
  const nB = ib === 0 ? 0 : Math.max(1, Math.round((ib / 60) * 3))
  const dotsB = Array.from({ length: nB }, (_, k) => ({ x: 60 + ((((k / nB) * 180 + t * 40) % 180) + 180) % 180, y: 150 }))

  return (
    <>
      <Diagram w={640} h={280} svgRef={ref}
        title={`Transistor: ${ib} microamps into the base lets ${si(ic / 1000, 'A')} flow through the lamp. ${mode}`}
        caption="A tiny base current steers a big collector current. That is gain.">
        <Wire pts={[[60, 150], [240, 150]]} color={C.muted} width={2.5} />
        <T x={60} y={126} size={13} bold color={C.muted}>small input</T>
        <Wire pts={[[500, 150], [500, 50], [425, 50]]} color={C.muted} width={2.5} />
        <Wire pts={[[355, 50], [284, 50], [284, 110]]} color={C.muted} width={2.5} />
        <Wire pts={[[284, 190], [284, 230], [500, 230], [500, 190]]} color={C.muted} width={2.5} />
        <rect x={484} y={110} width={32} height={80} fill={C.bg} />
        <Battery x={500} y={150} rot={90} len={80} color={C.voltage} />
        {ic > 0 && <circle cx={390} cy={42} r={30} fill={C.resist} opacity={0.15 + 0.5 * (ic / IMAX)} />}
        <g transform="translate(390,42)"><LampDome len={70} /></g>
        <Transistor x={270} y={150} kind="npn" parts />
        {dotsB.map((d, k) => <circle key={`b${k}`} cx={d.x} cy={d.y} r={3} fill={C.current} />)}
        {dotsC.map((d, k) => <circle key={`c${k}`} cx={d.x} cy={d.y} r={4.5} fill={C.current} opacity={0.9} />)}
        <T x={150} y={176} anchor="middle" size={13} color={C.muted}>base current</T>
        <T x={150} y={194} anchor="middle" size={13} bold color={C.current}>{ib} µA</T>
        <T x={420} y={126} anchor="middle" size={13} color={C.muted}>collector current</T>
        <T x={420} y={144} anchor="middle" size={13} bold color={C.current}>{ic.toFixed(ic < 1 ? 2 : 1)} mA</T>
        <T x={320} y={266} anchor="middle" size={14} bold color={sat ? C.good : ib === 0 ? C.muted : C.power}>{mode}</T>
      </Diagram>
      <Controls>
        <Slider label="Base current (input)" value={ib} min={0} max={60} onChange={setIb} format={(v) => `${v} µA`} color={C.current} />
        <Readout label="Collector current (output)" value={ic.toFixed(ic < 1 ? 2 : 1)} unit="mA" color={C.current} />
      </Controls>
    </>
  )
}
