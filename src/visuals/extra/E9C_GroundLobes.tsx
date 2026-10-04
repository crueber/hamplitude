import { useState } from 'react'
import { C, Controls, Diagram, Ln, Slider, T, fmt } from '../kit'

const D2R = Math.PI / 180
// Field of a horizontal antenna at height h (wavelengths) over ground sloping by `alpha` degrees (positive = drops away to the right).
function f(theta: number, h: number, alpha: number) {
  const right = theta <= 90
  const th = right ? theta : 180 - theta // elevation above horizon, mirrored
  const psi = right ? th + alpha : th - alpha
  if (psi <= 0) return 0
  return Math.abs(Math.sin(2 * Math.PI * h * Math.cos(alpha * D2R) * Math.sin(psi * D2R))) * Math.pow(Math.cos(th * D2R), 1.3)
}
function lowest(h: number, alpha: number) {
  const he = h * Math.cos(alpha * D2R)
  const s = 1 / (4 * he)
  return s >= 1 ? 90 - alpha : Math.asin(s) / D2R - alpha
}

/** Elevation lobes of a horizontal antenna over ground: height sets the lobe angles, and a slope shifts them. */
export function E9C_GroundLobes() {
  const [h, setH] = useState(1)
  const [a, setA] = useState(0)
  const cx = 230, cy = 226, R = 170
  const path = (alpha: number) => Array.from({ length: 721 }, (_, i) => {
    const t = i / 4, r = R * f(t, h, alpha)
    const ang = t * D2R
    return `${i ? 'L' : 'M'}${(cx + r * Math.cos(ang)).toFixed(1)},${(cy - r * Math.sin(ang)).toFixed(1)}`
  }).join('')
  const flat = lowest(h, 0), down = lowest(h, a), up = lowest(h, -a)
  const g = a * D2R
  return (
    <>
      <Diagram w={640} h={300} title={`Elevation pattern of a horizontal antenna ${fmt(h)} wavelengths above ground${a ? `, ground sloping ${a} degrees` : ''}. Lowest lobe takeoff angle: ${fmt(flat)} degrees over flat ground${a ? `, ${fmt(down)} downhill, ${fmt(up)} uphill` : ''}.`}
        caption="Higher antenna: lower first lobe, more lobes. Downhill slope: lower still (flat ground = dashed).">
        <path d={`M${cx + R},${cy} A${R},${R} 0 0 0 ${cx - R},${cy}`} fill="none" stroke={C.fill2} strokeWidth={2} />
        <Ln x1={cx - R - 6} y1={cy} x2={cx + R + 6} y2={cy} color={C.fill2} width={1} dash="4 4" />
        <path d={path(0)} fill="none" stroke={C.muted} strokeWidth={2} strokeDasharray="5 4" />
        <path d={path(a)} fill={C.signal} fillOpacity={0.22} stroke={C.signal} strokeWidth={3} strokeLinejoin="round" />
        <Ln x1={cx - R} y1={cy + 14 - R * Math.sin(g) * 0.5} x2={cx + R} y2={cy + 14 + R * Math.sin(g) * 0.5} color={C.resist} width={4} />
        <T x={cx - R} y={cy + 36 - R * Math.sin(g) * 0.5} size={12} bold color={C.resist}>uphill</T>
        <T x={cx + R} y={cy + 36 + R * Math.sin(g) * 0.5} anchor="end" size={12} bold color={C.resist}>downhill</T>
        <circle cx={cx} cy={cy} r={5} fill={C.voltage} />
        <T x={cx} y={cy + 34} anchor="middle" size={11} color={C.voltage} bold>antenna</T>
        <T x={400} y={34} size={13} bold color={C.muted}>Lowest lobe, takeoff angle</T>
        <T x={400} y={64} size={13} color={C.ink}>Flat ground:</T><T x={620} y={64} anchor="end" size={14} bold color={C.muted}>{fmt(flat, 3)}°</T>
        <T x={400} y={92} size={13} color={C.ink}>Downhill side:</T><T x={620} y={92} anchor="end" size={14} bold color={C.good}>{down < 0 ? 'below horizon' : `${fmt(down, 3)}°`}</T>
        <T x={400} y={120} size={13} color={C.ink}>Uphill side:</T><T x={620} y={120} anchor="end" size={14} bold color={C.bad}>{up < 0 ? 'below horizon' : `${fmt(up, 3)}°`}</T>
        <T x={400} y={166} size={12} color={C.muted}>Flat ground: angle = arcsin(¼ ÷ height)</T>
        <T x={400} y={184} size={12} color={C.muted}>with height in wavelengths.</T>
        <T x={400} y={206} size={12} color={C.muted}>A slope tips it by the slope angle.</T>
        <T x={400} y={228} size={12} color={C.muted}>Simplified model.</T>
      </Diagram>
      <Controls>
        <Slider label="Antenna height" value={h} min={0.25} max={3} step={0.05} onChange={setH} format={(v) => `${fmt(v)} λ`} color="var(--d-resist)" />
        <Slider label="Ground slope" value={a} min={0} max={15} step={1} onChange={setA} format={(v) => (v ? `${v}° downhill to the right` : 'flat')} color="var(--d-signal)" />
      </Controls>
    </>
  )
}
