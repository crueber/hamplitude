import { useState } from 'react'
import { C, Controls, Diagram, Ln, Readout, Slider, T, fmt } from '../kit'

const FC = 7 // MHz: critical frequency of the layer for a signal sent straight up
const RAD = Math.PI / 180

/** A wave returns only if its takeoff angle is at or below the critical angle: asin(fc / f). */
export function CriticalAngle() {
  const [f, setF] = useState(14)
  const [ang, setAng] = useState(25)
  const crit = f <= FC ? 90 : Math.asin(FC / f) / RAD
  const back = ang <= crit + 1e-9
  const tx = 70, gy = 250, ly = 100, h = gy - 18 - ly
  const dx = h / Math.tan(ang * RAD)
  const col = back ? C.good : C.bad
  const endX = tx + 2 * dx
  const up: [number, number][] = back
    ? [[tx, gy - 18], [tx + dx, ly], endX <= 612 ? [endX, gy - 18] : [612, ly + ((612 - tx - dx) * h) / dx]]
    : [[tx, gy - 18], [tx + (gy - 18 - 36) / Math.tan(ang * RAD), 36]]
  const wedge = (a: number) => [tx + 180 * Math.cos(a * RAD), gy - 18 - 180 * Math.sin(a * RAD)]
  const [cx, cy] = wedge(Math.max(crit, 0.1))
  return (
    <>
      <Diagram w={640} h={300} title={`At ${f} megahertz the critical angle is ${fmt(crit, 3)} degrees. A ${ang} degree takeoff ${back ? 'is refracted back to Earth' : 'is too steep and passes through the ionosphere'}`}
        caption={`Layer critical frequency fixed at ${FC} MHz (straight-up limit). Flat-layer sketch.`}>
        <rect x={20} y={ly - 14} width={600} height={30} rx={8} fill={C.power} fillOpacity={0.18} stroke={C.power} strokeDasharray="5 5" />
        <T x={608} y={ly - 28} anchor="end" size={13} bold color={C.power}>F region</T>
        <rect x={20} y={gy} width={600} height={30} rx={8} fill={C.fill} stroke={C.muted} strokeWidth={1.5} />
        <path d={`M${tx},${gy - 18} L${tx + 180},${gy - 18} L${cx},${cy} Z`} fill={C.good} fillOpacity={0.12} />
        <Ln x1={tx} y1={gy - 18} x2={cx} y2={cy} color={C.muted} width={2} dash="6 5" />
        {crit < 89.5 && <T x={(tx + cx) / 2 - 10} y={(gy - 18 + cy) / 2 - 12} anchor="end" size={13} bold color={C.muted}>critical angle</T>}
        {crit < 89.5 && <T x={tx + 100} y={gy - 30} size={13} bold color={C.good}>returns</T>}
        <Ln x1={tx} y1={gy} x2={tx} y2={gy - 18} color={C.ink} width={3} />
        <polyline points={up.map((p) => p.join(',')).join(' ')} fill="none" stroke={col} strokeWidth={3} strokeDasharray="2 7" strokeLinecap="round" strokeLinejoin="round" />
        <T x={330} y={290} anchor="middle" size={14} bold color={col}>{back ? 'Takeoff angle at or below critical: returns' : 'Too steep for this frequency: passes through'}</T>
      </Diagram>
      <Controls>
        <Slider label="Frequency" value={f} min={3} max={30} onChange={setF} format={(v) => `${v} MHz`} color="var(--d-signal)" />
        <Slider label="Takeoff angle above horizon" value={ang} min={15} max={90} step={1} onChange={setAng} format={(v) => `${v}°`} color="var(--d-current)" />
        <Readout label="Critical angle" value={crit >= 90 ? '90 (any)' : fmt(crit, 3)} unit={crit >= 90 ? '' : '°'} color="var(--d-good)" />
      </Controls>
    </>
  )
}
