import { useState } from 'react'
import { C, Controls, Diagram, Readout, Slider, T } from '../kit'

const MILES_PER_SQRT_FT = 1.41 // radio horizon, d(mi) = 1.41 * sqrt(height in feet)

/** Direct (simplex) range is set by how far each antenna can "see": the sum of the two radio horizons. */
export function Simplex_Range() {
  const [ha, setHa] = useState(6)
  const [hb, setHb] = useState(50)
  const da = MILES_PER_SQRT_FT * Math.sqrt(ha)
  const db = MILES_PER_SQRT_FT * Math.sqrt(hb)
  const total = da + db
  const px = 14, ax = 40
  const bx = ax + total * px
  const mx = ax + da * px
  const gy = 190
  const mast = (x: number, h: number, col: string, label: string) => {
    const top = gy - (10 + Math.sqrt(h) * 6)
    return (
      <g>
        <line x1={x} y1={gy} x2={x} y2={top} stroke={col} strokeWidth={4} strokeLinecap="round" />
        <circle cx={x} cy={top} r={6} fill={col} />
        <T x={x} y={top - 16} anchor="middle" size={14} bold color={col}>{label}</T>
      </g>
    )
  }
  return (
    <>
      <Diagram w={640} h={266}
        title={`Two stations with antennas at ${ha} feet and ${hb} feet can reach each other over a distance of about ${total.toFixed(0)} miles if nothing blocks the path`}
        caption="Each antenna sees about 1.41 × √height (feet) miles. Add the two. Hills, buildings and trees only shorten it. Masts not to scale.">
        <rect x={20} y={gy} width={600} height={40} rx={8} fill={C.fill2} />
        <line x1={ax} y1={gy + 18} x2={mx} y2={gy + 18} stroke={C.current} strokeWidth={5} strokeLinecap="round" />
        <line x1={mx} y1={gy + 18} x2={bx} y2={gy + 18} stroke={C.resist} strokeWidth={5} strokeLinecap="round" />
        <line x1={mx} y1={gy - 6} x2={mx} y2={gy + 30} stroke={C.ink} strokeWidth={2} strokeDasharray="3 4" />
        <T x={mx} y={gy + 52} anchor="middle" size={12.5} color={C.muted}>the two horizons meet</T>
        {mast(ax, ha, C.current, 'A')}
        {mast(bx, hb, C.resist, 'B')}
        <T x={20} y={22} size={14} bold>Total direct range</T>
        <T x={20} y={42} size={22} bold mono color={C.signal}>{total.toFixed(1)} miles</T>
      </Diagram>
      <Controls>
        <Slider label="Antenna A height" value={ha} min={3} max={200} onChange={setHa} format={(v) => `${v} ft`} color={C.current} />
        <Slider label="Antenna B height" value={hb} min={3} max={200} onChange={setHb} format={(v) => `${v} ft`} color={C.resist} />
        <Readout label="A sees" value={da.toFixed(1)} unit=" mi" color={C.current} />
        <Readout label="B sees" value={db.toFixed(1)} unit=" mi" color={C.resist} />
      </Controls>
    </>
  )
}
