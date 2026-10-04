import { useState } from 'react'
import { C, Controls, Diagram, Ln, Readout, Slider, T } from '../kit'

const AX = 190, AY = 180, R = 172
const NX = 322, NY = 142
const RAD = Math.PI / 180
const lobe = (psi: number) => R * (0.15 + 0.85 * Math.pow((1 + Math.cos(psi * RAD)) / 2, 6))

/** Top view: the main lobe of a directional antenna is where exposure is highest. Rotate it away from occupied areas. */
export function ExposureZone() {
  const [h, setH] = useState(350)
  const pts = Array.from({ length: 73 }, (_, i) => {
    const a = i * 5
    const r = lobe(a - h)
    return `${(AX + r * Math.cos(a * RAD)).toFixed(1)},${(AY + r * Math.sin(a * RAD)).toFixed(1)}`
  }).join(' ')
  const ang = (Math.atan2(NY - AY, NX - AX) / RAD + 360) % 360
  const dist = Math.hypot(NX - AX, NY - AY)
  const exposed = dist < lobe(ang - h)
  const col = exposed ? C.bad : C.good
  const hx = Math.cos(h * RAD), hy = Math.sin(h * RAD)
  return (
    <>
      <Diagram w={640} h={340} title={`Top view. The antenna's main lobe, where exposure may exceed the limit, points ${exposed ? 'at the neighbor: the neighbor may be over the limit' : 'away from the neighbor: no excess exposure'}`}
        caption="Schematic top view. Red = area where exposure may exceed the limit.">
        <polygon points={pts} fill={C.bad} fillOpacity={0.18} stroke={C.bad} strokeWidth={2} strokeDasharray="6 4" />
        <rect x={NX - 38} y={NY - 28} width={76} height={56} rx={6} fill={C.fill} stroke={col} strokeWidth={3} />
        <path d={`M${NX - 44},${NY - 28} L${NX},${NY - 50} L${NX + 44},${NY - 28}`} fill="none" stroke={col} strokeWidth={3} strokeLinejoin="round" />
        <circle cx={NX} cy={NY + 2} r={6} fill={col} />
        <T x={NX} y={NY + 46} anchor="middle" size={13} bold>Neighbor</T>
        <Ln x1={AX - 16 * hx} y1={AY - 16 * hy} x2={AX + 22 * hx} y2={AY + 22 * hy} color={C.ink} width={5} />
        {[-14, 0, 14].map((d) => <Ln key={d} x1={AX + d * hx - 12 * hy} y1={AY + d * hy + 12 * hx} x2={AX + d * hx + 12 * hy} y2={AY + d * hy - 12 * hx} color={C.ink} width={3} />)}
        <T x={AX} y={AY + 62} anchor="middle" size={13} bold>Your beam antenna</T>
        <T x={20} y={22} size={15} bold color={col}>{exposed ? 'Neighbor in the main lobe: may be over the limit' : 'Neighbor outside the lobe: within limits'}</T>
        <T x={20} y={322} size={13} color={C.muted}>{exposed ? 'Make sure it cannot point there while they are present.' : 'Evaluate each heading, not only the one you use most.'}</T>
      </Diagram>
      <Controls>
        <Slider label="Beam heading" value={h} min={0} max={355} step={5} onChange={setH} format={(v) => `${v}°`} color="var(--d-signal)" />
        <Readout label="Neighbor" value={exposed ? 'exposed' : 'clear'} color={exposed ? 'var(--d-bad)' : 'var(--d-good)'} />
      </Controls>
    </>
  )
}
