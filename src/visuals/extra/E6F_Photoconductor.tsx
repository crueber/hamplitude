import { useState } from 'react'
import { C, Controls, Diagram, Ln, Readout, Slider, T, Wire, Battery } from '../kit'

/** Photoconductive material: light frees charge carriers, so resistance falls and more current flows. */
export function Photoconductor() {
  const [light, setLight] = useState(40)
  const carriers = 4 + Math.round(light / 5)
  const res = 100 / (1 + light / 12) // relative resistance, % of dark value (illustrative)
  const cur = 100 - res
  const pos = Array.from({ length: 24 }, (_, k) => [186 + (k % 6) * 40 + ((k >> 1) % 2) * 9, 126 + Math.floor(k / 6) * 24] as [number, number])
  return (
    <>
      <Diagram w={640} h={260}
        title={`A photoconductive cell lit at ${light} percent. Light frees charge carriers, so its resistance falls to about ${Math.round(res)} percent of the dark value and more current flows.`}
        caption="Light on photoconductive material: resistance decreases, so current rises.">
        {Array.from({ length: 1 + Math.round(light / 20) }).map((_, i) => {
          const x = 220 + i * 50 - (Math.round(light / 20) * 25)
          return <Ln key={i} x1={x + 90} y1={22} x2={x + 90} y2={80} color={C.resist} width={3} arrow />
        })}
        <T x={320} y={14} anchor="middle" size={13} bold color={C.resist}>light</T>
        <rect x={170} y={100} width={300} height={110} rx={6} fill={C.fill2} stroke={C.ink} strokeWidth={2.5} />
        <T x={320} y={226} anchor="middle" size={13} bold>crystalline semiconductor</T>
        {pos.slice(0, carriers).map(([x, y], i) => <circle key={i} cx={x} cy={y} r={5} fill={C.current} />)}
        <Wire pts={[[170, 155], [90, 155], [90, 240], [550, 240], [550, 155], [470, 155]]} color={C.muted} width={2.5} />
        <rect x={74} y={176} width={32} height={50} fill={C.bg} />
        <Battery x={90} y={201} rot={90} len={46} color={C.voltage} />
        <T x={70} y={201} anchor="end" size={13} bold color={C.voltage}>battery</T>
      </Diagram>
      <Controls>
        <Slider label="Light intensity" value={light} min={0} max={100} step={5} onChange={setLight} format={(v) => (v === 0 ? 'dark' : `${v}%`)} color={C.resist} />
        <Readout label="Resistance (of dark value)" value={Math.round(res)} unit=" %" color={C.resist} />
        <Readout label="Current (relative)" value={Math.round(cur)} unit=" %" color={C.current} />
      </Controls>
    </>
  )
}
