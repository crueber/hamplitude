import { useState } from 'react'
import { C, Controls, Diagram, Ln, Readout, Slider, T, Wire, Battery, Dot, useTime, si } from '../kit'

/** A potentiometer as an adjustable resistor: moving the wiper changes the resistance in the circuit, and so the current. */
export function Potentiometer() {
  const [pos, setPos] = useState(50)
  const { t, ref } = useTime(1)
  const R = 1000 * (pos / 100)
  const I = 12 / R
  const x0 = 200, x1 = 440, teeth = 12
  const dx = (x1 - x0) / teeth
  const verts: [number, number][] = [[x0, 70]]
  for (let k = 0; k < teeth; k++) verts.push([x0 + dx * (k + 0.5), k % 2 ? 80 : 60])
  verts.push([x1, 70])
  const wx = x0 + (x1 - x0) * (pos / 100)
  const used: [number, number][] = []
  for (let k = 0; k < verts.length; k++) {
    if (verts[k][0] <= wx) used.push(verts[k])
    else {
      const [ax, ay] = verts[k - 1]
      const [bx, by] = verts[k]
      used.push([wx, ay + ((by - ay) * (wx - ax)) / (bx - ax)])
      break
    }
  }
  const loop: [number, number][] = [[80, 70], [540, 70], [540, 230], [80, 230], [80, 70]]
  const perim = 460 + 160 + 460 + 160
  const speed = Math.min(I * 1000, 140) * 0.9
  const dots = Array.from({ length: 18 }, (_, k) => {
    let d = (((k / 18) * perim + t * speed) % perim + perim) % perim
    for (let s = 0; s < 4; s++) {
      const [ax, ay] = loop[s]
      const [bx, by] = loop[s + 1]
      const len = Math.hypot(bx - ax, by - ay)
      if (d <= len) return { x: ax + ((bx - ax) * d) / len, y: ay + ((by - ay) * d) / len }
      d -= len
    }
    return { x: 80, y: 70 }
  }).filter((d) => !(d.y === 70 && d.x > x0 - 4 && d.x < x1 + 4))
  return (
    <>
      <Diagram w={640} h={280} title={`Potentiometer used as a variable resistor: ${si(R, 'Ω')} in circuit gives ${si(I, 'A')} from a 12 volt battery`} svgRef={ref}
        caption="Slide the wiper: the part of the track in the circuit (amber) is the resistance.">
        <Wire pts={[[80, 70], [x0, 70]]} color={C.muted} width={2.5} />
        <Wire pts={[[x1, 70], [540, 70], [540, 230], [80, 230], [80, 190]]} color={C.muted} width={2.5} />
        <Wire pts={[[80, 70], [80, 110]]} color={C.muted} width={2.5} />
        <rect x={64} y={110} width={32} height={80} fill={C.bg} />
        <Battery x={80} y={150} rot={90} len={80} cells={1} color={C.voltage} />
        <T x={52} y={150} anchor="end" bold color={C.voltage}>12 V</T>
        <polyline points={verts.map((p) => p.join(',')).join(' ')} fill="none" stroke={C.fill2} strokeWidth={3} strokeLinejoin="round" />
        <polyline points={used.map((p) => p.join(',')).join(' ')} fill="none" stroke={C.resist} strokeWidth={3.5} strokeLinejoin="round" strokeLinecap="round" />
        <Wire pts={[[wx, 34], [490, 34], [490, 70]]} color={C.muted} width={2.5} />
        <Ln x1={wx} y1={34} x2={wx} y2={58} color={C.ink} width={2.5} arrow />
        <Dot x={490} y={70} color={C.muted} />
        <T x={x0 + 120} y={104} anchor="middle" size={13} color={C.muted}>potentiometer (wiper arrow)</T>
        {dots.map((d, k) => <circle key={k} cx={d.x} cy={d.y} r={4.5} fill={C.current} opacity={0.9} />)}
      </Diagram>
      <Controls>
        <Slider label="Knob position" value={pos} min={10} max={100} onChange={setPos} format={(v) => `${v}%`} color={C.resist} />
        <Readout label="Resistance" value={si(R, 'Ω')} color={C.resist} />
        <Readout label="Current" value={si(I, 'A')} color={C.current} />
      </Controls>
    </>
  )
}
