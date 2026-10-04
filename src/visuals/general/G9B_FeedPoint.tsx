import { useState } from 'react'
import { C, Controls, Diagram, Ln, Readout, Slider, T } from '../kit'

/** Half-wave wire: current is highest at the middle, voltage at the ends. Impedance = V / I rises toward the ends. */
export function G9B_FeedPoint({ start = 0 }: { start?: number }) {
  const [p, setP] = useState(start) // 0 = center, 1 = end
  const x0 = 50, x1 = 590, xc = 320, half = 270
  const fx = xc + p * half
  const ang = (p * Math.PI) / 2
  const cosv = Math.max(Math.cos(ang), 0.02)
  const z = 73 / (cosv * cosv)
  const zTxt = p < 0.97 ? `about ${z < 1000 ? Math.round(z / 5) * 5 : Math.round(z / 100) * 100} Ω` : 'very high'
  const cur = (x: number) => Math.cos(((x - xc) / half) * (Math.PI / 2))
  const curve = (amp: number, y0: number, f: (x: number) => number) =>
    Array.from({ length: 81 }, (_, i) => {
      const x = x0 + ((x1 - x0) * i) / 80
      return `${i ? 'L' : 'M'}${x.toFixed(1)},${(y0 - amp * f(x)).toFixed(1)}`
    }).join('')
  const vol = (x: number) => Math.sin(((x - xc) / half) * (Math.PI / 2))
  return (
    <>
      <Diagram w={640} h={270} title={`Feeding a half-wave wire ${Math.round(p * 100)} percent of the way from center to end: impedance ${zTxt}. It rises steadily toward the ends and is very high at an end`}
        caption="Impedance = voltage ÷ current. Current is greatest at the center, voltage at the ends, so the impedance climbs toward the ends.">
        <Ln x1={x0} y1={135} x2={x1} y2={135} color={C.resist} width={5} />
        <path d={curve(60, 135, (x) => Math.abs(cur(x)))} fill="none" stroke={C.current} strokeWidth={3} transform="translate(0,-14)" />
        <path d={curve(-60, 135, (x) => Math.abs(vol(x)))} fill="none" stroke={C.voltage} strokeWidth={3} transform="translate(0,14)"/>
        <T x={x0} y={30} size={13} bold color={C.current}>current: biggest at the center</T>
        <T x={x1} y={240} anchor="end" size={13} bold color={C.voltage}>voltage: biggest at the ends</T>
        <Ln x1={fx} y1={100} x2={fx} y2={160} color={C.ink} width={2} dash="4 4" />
        <circle cx={fx} cy={135} r={8} fill={C.power} stroke={C.bg} strokeWidth={2.5} />
        <T x={fx} y={88} anchor={p > 0.7 ? 'end' : 'middle'} size={13} bold color={C.power}>feed point</T>
      </Diagram>
      <Controls>
        <Slider label="Feed point, center to end" value={p} min={0} max={1} step={0.01} onChange={setP} format={(v) => (v === 0 ? 'center' : v === 1 ? 'end' : `${Math.round(v * 100)}% out`)} color="var(--d-power)" />
        <Readout label="Feed point impedance" value={zTxt} color={p < 0.4 ? 'var(--d-good)' : 'var(--d-bad)'} />
      </Controls>
    </>
  )
}
