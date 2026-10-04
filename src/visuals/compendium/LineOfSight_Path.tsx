import { useState } from 'react'
import { C, Controls, Diagram, Ln, Readout, Slider, T } from '../kit'

const K = 1.41 // radio horizon, statute miles = 1.41 * sqrt(height in feet), with the standard 4/3-earth allowance
const XL = 80, XR = 560, GY = 150

/**
 * Two antennas at the longest line-of-sight distance. Drawn in the frame where both bases sit on the same level:
 * the ground bulges up between them (a parabola, bulge = x(D-x)/2 ft) and the straight ray just grazes it at the horizon.
 * The picture rescales to fit, so heights and distances are consistent but not to a fixed scale.
 */
export function LineOfSight_Path() {
  const [h1, setH1] = useState(50)
  const [h2, setH2] = useState(200)
  const d1 = K * Math.sqrt(h1), d2 = K * Math.sqrt(h2), D = d1 + d2
  const c = 90 / Math.max(h1, h2) // px per foot
  const s = (XR - XL) / D // px per mile
  const gx = XL + s * d1 // the point where the ray grazes the ground
  const ground = Array.from({ length: 81 }, (_, i) => {
    const x = (D * i) / 80
    return `${i ? 'L' : 'M'}${(XL + s * x).toFixed(1)},${(GY - c * ((x * (D - x)) / 2)).toFixed(1)}`
  }).join('')
  const top1 = GY - c * h1, top2 = GY - c * h2
  const gyAt = GY - c * Math.sqrt(h1 * h2)
  const mi = (v: number) => (v < 9.95 ? v.toFixed(1) : Math.round(v).toString())
  return (
    <>
      <Diagram w={640} h={250}
        title={`Antennas ${h1} feet and ${h2} feet high can see each other out to about ${mi(D)} miles: ${mi(d1)} miles from the first to its radio horizon plus ${mi(d2)} miles from the second`}
        caption="Each antenna's radio horizon is 1.41 × √height. The two horizons meet where the ray just clears the ground. Not to scale.">
        <path d={`${ground} L${XR},${GY + 14} L${XL},${GY + 14} Z`} fill={C.fill} stroke={C.muted} strokeWidth={2} />
        <Ln x1={XL} y1={GY} x2={XL} y2={top1} color={C.ink} width={5} />
        <Ln x1={XR} y1={GY} x2={XR} y2={top2} color={C.ink} width={5} />
        <Ln x1={XL} y1={top1} x2={XR} y2={top2} color={C.signal} width={3.5} dash="2 7" />
        <circle cx={gx} cy={gyAt} r={6} fill={C.signal} stroke={C.bg} strokeWidth={2} />
        <T x={XL + 14} y={top1 - 14} size={13} bold>{`${h1} ft`}</T>
        <T x={XR - 14} y={top2 - 14} size={13} bold anchor="end">{`${h2} ft`}</T>
        <circle cx={26} cy={16} r={6} fill={C.signal} stroke={C.bg} strokeWidth={2} />
        <T x={38} y={16} size={12.5} bold color={C.signal}>where the two horizons meet</T>
        <Ln x1={XL} y1={GY + 44} x2={gx} y2={GY + 44} color={C.current} width={2.5} arrow="both" />
        <Ln x1={gx} y1={GY + 44} x2={XR} y2={GY + 44} color={C.power} width={2.5} arrow="both" />
        <T x={(XL + gx) / 2} y={GY + 64} anchor="middle" size={13} bold color={C.current}>{`${mi(d1)} mi`}</T>
        <T x={(gx + XR) / 2} y={GY + 64} anchor="middle" size={13} bold color={C.power}>{`${mi(d2)} mi`}</T>
        <T x={(XL + XR) / 2} y={GY + 84} anchor="middle" size={14} bold>{`about ${mi(D)} miles in all`}</T>
      </Diagram>
      <Controls>
        <Slider label="Left antenna height" value={h1} min={10} max={500} step={5} onChange={setH1} format={(v) => `${v} ft`} color="var(--d-current)" />
        <Slider label="Right antenna height" value={h2} min={10} max={500} step={5} onChange={setH2} format={(v) => `${v} ft`} color="var(--d-power)" />
        <Readout label="Maximum distance" value={mi(D)} unit="miles" color={C.signal} />
      </Controls>
    </>
  )
}
