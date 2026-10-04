import { useState } from 'react'
import { C, Choice, Controls, Diagram, T, TAU, fmt } from '../kit'

// Four vertical elements at the corners of a square, side 1/4 wavelength, equal current magnitudes.
// The element in the wanted direction lags 180 degrees, its two neighbours lag 90, the far corner 0.
const S = 0.25
const CORNERS = [
  { x: S / 2, y: S / 2, name: 'NE' },
  { x: S / 2, y: -S / 2, name: 'SE' },
  { x: -S / 2, y: -S / 2, name: 'SW' },
  { x: -S / 2, y: S / 2, name: 'NW' },
]
const phases = (k: number) => CORNERS.map((_, i) => { const dist = Math.min((i - k + 4) % 4, (k - i + 4) % 4); return dist === 0 ? -180 : dist === 1 ? -90 : 0 })
const N = 720
function pattern(k: number) {
  const ph = phases(k)
  return Array.from({ length: N }, (_, j) => {
    const a = (j / N) * TAU
    let re = 0, im = 0
    CORNERS.forEach((c, i) => {
      const p = (ph[i] * Math.PI) / 180 + TAU * (c.x * Math.cos(a) + c.y * Math.sin(a))
      re += Math.cos(p); im += Math.sin(p)
    })
    return Math.hypot(re, im)
  })
}

/** A four-square array: four verticals on a quarter-wave square, phased to put one cardioid-like beam toward any corner. Ideal currents assumed. */
export function PhasedArrays_FourSquare() {
  const [k, setK] = useState(0)
  const v = pattern(k)
  const mx = Math.max(...v)
  const iPk = v.indexOf(mx)
  const ms = v.reduce((s, x) => s + x * x, 0) / N
  const gain = 10 * Math.log10((mx * mx) / ms)
  const fb = 20 * Math.log10(mx / v[(iPk + N / 2) % N])
  const cx = 190, cy = 150, R = 116
  const path = Array.from({ length: N + 1 }, (_, i) => {
    const a = ((i % N) / N) * TAU, r = (R * v[i % N]) / mx
    return `${i ? 'L' : 'M'}${(cx + r * Math.cos(a)).toFixed(1)},${(cy - r * Math.sin(a)).toFixed(1)}`
  }).join('')
  const ph = phases(k)
  const sc = 150 // pixels per wavelength for the element positions
  return (
    <>
      <Diagram w={640} h={300}
        title={`Four-square array fed to beam toward the ${CORNERS[k].name} corner. Gain about ${fmt(gain, 2)} dB over one element, front-to-back about ${fmt(fb, 2)} dB, ideal`}
        caption="Four elements on a quarter-wave square. Changing which corner lags 180° swings the whole beam, with no moving parts.">
        <T x={20} y={16} size={13} bold color={C.muted}>Top view (north is up)</T>
        <circle cx={cx} cy={cy} r={R} fill="none" stroke={C.fill2} strokeWidth={1.5} />
        <circle cx={cx} cy={cy} r={R / 2} fill="none" stroke={C.fill2} strokeWidth={1.5} />
        <path d={path + 'Z'} fill={C.signal} fillOpacity={0.22} stroke={C.signal} strokeWidth={3} strokeLinejoin="round" />
        {CORNERS.map((c, i) => (
          <g key={c.name}>
            <circle cx={cx + c.x * sc} cy={cy - c.y * sc} r={8} fill={ph[i] === -180 ? C.voltage : ph[i] === -90 ? C.resist : C.current} stroke={C.bg} strokeWidth={2} />
          </g>
        ))}
        <T x={cx} y={cy - R - 12} anchor="middle" size={12} color={C.muted}>N</T>
        <rect x={400} y={36} width={230} height={118} rx={10} fill={C.fill} />
        <T x={414} y={56} size={13} bold color={C.muted}>Current lag of each element</T>
        <circle cx={420} cy={80} r={7} fill={C.voltage} /><T x={436} y={80} size={13}>180°: toward the beam</T>
        <circle cx={420} cy={106} r={7} fill={C.resist} /><T x={436} y={106} size={13}>90°: the two side corners</T>
        <circle cx={420} cy={132} r={7} fill={C.current} /><T x={436} y={132} size={13}>0°: the far corner</T>
        <rect x={400} y={170} width={230} height={106} rx={10} fill={C.fill} stroke={C.signal} strokeWidth={2} />
        <T x={414} y={190} size={12} color={C.muted}>Beam toward</T>
        <T x={500} y={190} size={15} bold color={C.signal}>{CORNERS[k].name}</T>
        <T x={414} y={216} size={12} color={C.muted}>Gain over one element</T>
        <T x={414} y={238} size={15} bold color={C.good}>about {fmt(gain, 2)} dB</T>
        <T x={414} y={262} size={12} color={C.muted}>Front-to-back: about {fmt(fb, 2)} dB (ideal)</T>
      </Diagram>
      <Controls>
        <div>
          <span className="ctl-label" style={{ display: 'block', marginBottom: 6 }}>Beam toward corner</span>
          <Choice label="Beam direction" value={k} onChange={setK} options={CORNERS.map((c, i) => ({ value: i, label: c.name }))} />
        </div>
      </Controls>
    </>
  )
}
