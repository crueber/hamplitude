import { useState } from 'react'
import { C, Controls, Diagram, Ln, Readout, Slider, T } from '../kit'

const RE = 6371 // km
/** Straight-line distance to the horizon from height h (km), for an Earth of radius r. */
const horizon = (h: number, r: number) => r * Math.acos(r / (r + h)) // ground distance

/** How far a balloon can be heard: the line of sight to the horizon grows with the square root of height. */
export function Balloons_Horizon() {
  const [h, setH] = useState(30)
  const geo = horizon(h, RE)
  const radio = horizon(h, (RE * 4) / 3) // the atmosphere bends VHF/UHF slightly: effective Earth radius 4/3
  // drawing: heavily exaggerated height and curvature
  const cx = 320, cy = 618, R = 400
  const hd = 12 + h * 3.4
  const lam = Math.acos(R / (R + hd))
  const bx = cx, by = cy - R - hd
  const tx = R * Math.sin(lam), ty = R * Math.cos(lam)
  const lx = cx - tx, rx = cx + tx, gy = cy - ty
  return (
    <>
      <Diagram w={640} h={390}
        title={`A balloon at ${h} kilometres altitude has a line of sight to the horizon about ${geo.toFixed(0)} kilometres away, or about ${radio.toFixed(0)} kilometres allowing for slight bending of VHF and UHF by the atmosphere`}
        caption="Straight-line radio horizon from a balloon. Curvature and height are heavily exaggerated; real distances are in the readouts.">
        <path d={`M${cx - 330},${cy - Math.sqrt(R * R - 330 * 330)} A${R},${R} 0 0 1 ${cx + 330},${cy - Math.sqrt(R * R - 330 * 330)} L${cx + 330},390 L${cx - 330},390 Z`} fill={C.fill2} stroke={C.muted} strokeWidth={2} />
        <Ln x1={bx} y1={by} x2={lx} y2={gy} color={C.signal} width={3} dash="7 5" />
        <Ln x1={bx} y1={by} x2={rx} y2={gy} color={C.signal} width={3} dash="7 5" />
        <Ln x1={bx} y1={by + 8} x2={bx} y2={cy - R - 1} color={C.muted} width={1.5} dash="2 5" />
        <ellipse cx={bx} cy={by - 8} rx={12} ry={14} fill={C.power} stroke={C.bg} strokeWidth={2} />
        <rect x={bx - 5} y={by + 8} width={10} height={8} rx={2} fill={C.ink} />
        <T x={bx + 20} y={by - 4} size={13} bold color={C.power}>balloon, {h} km up</T>
        {[lx, rx].map((x, i) => (
          <g key={i}>
            <Ln x1={x} y1={gy} x2={x} y2={gy - 16} color={C.ink} width={3} />
            <Ln x1={x - 7} y1={gy - 22} x2={x} y2={gy - 16} color={C.ink} width={3} />
            <Ln x1={x + 7} y1={gy - 22} x2={x} y2={gy - 16} color={C.ink} width={3} />
          </g>
        ))}
        <T x={cx} y={346} anchor="middle" size={14} bold color={C.signal}>can be heard out to about {radio.toFixed(0)} km in every direction</T>
        <T x={cx} y={368} anchor="middle" size={12} color={C.muted}>(straight geometry: {geo.toFixed(0)} km; hills, trees and the receiver's sensitivity shrink it)</T>
      </Diagram>
      <Controls>
        <Slider label="Balloon altitude" value={h} min={1} max={40} step={1} onChange={setH} format={(v) => `${v} km (${Math.round(v * 3281).toLocaleString('en-US')} ft)`} color="var(--d-power)" />
        <Readout label="Geometric horizon" value={geo.toFixed(0)} unit=" km" color={C.ink} />
        <Readout label="Radio horizon (4/3 Earth)" value={radio.toFixed(0)} unit=" km" color={C.signal} />
        <Readout label="Radio horizon" value={(radio * 0.621371).toFixed(0)} unit=" mi" color={C.signal} />
      </Controls>
    </>
  )
}
