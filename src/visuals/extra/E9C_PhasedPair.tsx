import { useState } from 'react'
import { C, Choice, Controls, Diagram, Ln, Slider, T, fmt } from '../kit'

const PRESETS: Record<string, { d: number; p: number }> = {
  fig8a: { d: 0.5, p: 180 },
  cardio: { d: 0.25, p: 90 },
  fig8b: { d: 0.5, p: 0 },
}
const af = (phi: number, d: number, pdeg: number) => Math.abs(Math.cos((2 * Math.PI * d * Math.cos(phi) - (pdeg * Math.PI) / 180) / 2))

function classify(d: number, p: number) {
  const N = 360
  const v = Array.from({ length: N }, (_, i) => af((i / N) * 2 * Math.PI, d, p))
  const mx = Math.max(...v), mn = Math.min(...v)
  const at = (deg: number) => v[Math.round((deg / 360) * N) % N] / mx
  if (mn / mx > 0.8) return 'Nearly omni-directional'
  if (at(0) > 0.97 && at(180) > 0.97 && at(90) < 0.2) return 'Figure-eight along the axis'
  if (at(90) > 0.97 && at(270) > 0.97 && at(0) < 0.2) return 'Figure-eight broadside'
  if ((at(0) > 0.97 && at(180) < 0.1) || (at(180) > 0.97 && at(0) < 0.1)) return 'Cardioid: one direction, a null behind'
  return 'Other: lobes and nulls'
}

/** Two vertical quarter-wave elements seen from above: azimuth pattern from spacing and phase. */
export function E9C_PhasedPair() {
  const [d, setD] = useState(0.5)
  const [p, setP] = useState(180)
  const [pre, setPre] = useState('fig8a')
  const cx = 190, cy = 150, R = 110
  const mx = Math.max(...Array.from({ length: 360 }, (_, i) => af((i / 360) * 2 * Math.PI, d, p)), 0.05)
  const path = Array.from({ length: 361 }, (_, i) => {
    const a = (i / 360) * 2 * Math.PI, r = (R * af(a, d, p)) / mx
    return `${i ? 'L' : 'M'}${(cx + r * Math.cos(a)).toFixed(1)},${(cy - r * Math.sin(a)).toFixed(1)}`
  }).join('') + 'Z'
  const name = classify(d, p)
  const ex = (s: number) => cx + s * d * 100 * 0.9 // draw spacing to scale-ish
  return (
    <>
      <Diagram w={640} h={300} title={`Two vertical elements spaced ${d} wavelength apart, fed ${p} degrees out of phase, seen from above. Pattern: ${name}.`}
        caption="Top view. Dots are the two vertical elements; the shaded shape is where the signal goes.">
        <circle cx={cx} cy={cy} r={R} fill="none" stroke={C.fill2} strokeWidth={1.5} />
        <Ln x1={cx - R - 8} y1={cy} x2={cx + R + 8} y2={cy} color={C.fill2} width={1} dash="4 4" />
        <Ln x1={cx} y1={cy - R - 8} x2={cx} y2={cy + R + 8} color={C.fill2} width={1} dash="4 4" />
        <path d={path} fill={C.signal} fillOpacity={0.22} stroke={C.signal} strokeWidth={3} strokeLinejoin="round" />
        <circle cx={ex(-0.5)} cy={cy} r={8} fill={C.voltage} stroke={C.bg} strokeWidth={2} />
        <circle cx={ex(0.5)} cy={cy} r={8} fill={C.current} stroke={C.bg} strokeWidth={2} />
        <T x={cx} y={14} anchor="middle" size={12} color={C.muted}>top view (north)</T>
        <T x={cx + R + 12} y={cy + 16} anchor="start" size={11} color={C.muted}>axis</T>
        <T x={400} y={46} size={13} bold color={C.muted}>Elements</T>
        <circle cx={410} cy={74} r={7} fill={C.voltage} /><T x={426} y={74} size={13}>left: reference phase</T>
        <circle cx={410} cy={100} r={7} fill={C.current} /><T x={426} y={100} size={13}>right: lags by {p}°</T>
        <T x={400} y={140} size={13} color={C.muted}>Spacing: {fmt(d)} λ ({fmt(d * 360)}°)</T>
        <rect x={394} y={178} width={236} height={72} rx={10} fill={C.fill} stroke={C.signal} strokeWidth={2} />
        <T x={406} y={198} size={12} color={C.muted}>Pattern</T>
        <T x={406} y={222} size={14} bold color={C.signal}>{name.split(':')[0]}</T>
        {name.includes(':') && <T x={406} y={240} size={12} color={C.muted}>{name.split(': ')[1]}</T>}
      </Diagram>
      <Controls>
        <div>
          <span className="ctl-label" style={{ display: 'block', marginBottom: 6 }}>Exam setups</span>
          <Choice label="Exam setups" value={pre} onChange={(v) => { if (v) { setPre(v); setD(PRESETS[v].d); setP(PRESETS[v].p) } }}
            options={[{ value: 'fig8a', label: '½ λ, 180°' }, { value: 'cardio', label: '¼ λ, 90°' }, { value: 'fig8b', label: '½ λ, in phase' }]} />
        </div>
        <Slider label="Spacing" value={d} min={0.1} max={1} step={0.05} onChange={(v) => { setD(v); setPre('') }} format={(v) => `${fmt(v)} λ`} color="var(--d-signal)" />
        <Slider label="Phase difference" value={p} min={0} max={180} step={15} onChange={(v) => { setP(v); setPre('') }} format={(v) => `${v}°`} color="var(--d-power)" />
      </Controls>
    </>
  )
}
