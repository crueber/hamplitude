import { useState } from 'react'
import { C, Choice, Controls, Diagram, Ln, Slider, T, TAU, fmt } from '../kit'

// Two identical vertical elements, equal currents, seen from above. Left element at x = -d/2 (phase 0),
// right element at x = +d/2 (current lags by psi). Far-field amplitude (relative): |cos((2π d cosφ − ψ)/2)|.
const af = (phi: number, d: number, psi: number) => Math.abs(Math.cos((TAU * d * Math.cos(phi) - (psi * Math.PI) / 180) / 2))
const N = 720

const PRESETS: Record<string, { d: number; p: number; label: string }> = {
  broad: { d: 0.5, p: 0, label: 'Broadside' },
  fig8: { d: 0.5, p: 180, label: 'Figure-8 along axis' },
  cardioid: { d: 0.25, p: 90, label: 'Cardioid' },
}

/** Pattern of two equal elements from spacing and phase; also reports gain over one element and front-to-back. Ideal: ignores mutual coupling. */
export function PhasedArrays_Pair() {
  const [d, setD] = useState(0.25)
  const [p, setP] = useState(90)
  const [pre, setPre] = useState('cardioid')
  const v = Array.from({ length: N }, (_, i) => af((i / N) * TAU, d, p))
  const mx = Math.max(...v, 1e-6)
  const ms = v.reduce((s, x) => s + x * x, 0) / N
  const gain = 10 * Math.log10((mx * mx) / ms) // relative to one element; same elevation pattern
  const iPk = v.indexOf(mx)
  const opp = v[(iPk + N / 2) % N]
  const fb = 20 * Math.log10(mx / Math.max(opp, 1e-6))
  // lobes: local maxima above 0.7 of the peak, merged
  const lobes: number[] = []
  for (let i = 0; i < N; i++) {
    const a = v[(i + N - 1) % N], b = v[i], c = v[(i + 1) % N]
    if (b >= a && b > c && b > 0.7 * mx) lobes.push(Math.round(((i / N) * 360) / 5) * 5 % 360)
  }
  const lobeText = mx > 0 && Math.min(...v) / mx > 0.8 ? 'nearly circular' : lobes.map((x) => `${x}°`).join(' and ')
  const fbText = fb > 30 ? 'over 30 dB' : fb < 0.5 ? '0 dB' : `${fmt(fb, 2)} dB`
  const cx = 185, cy = 150, R = 112
  const path = Array.from({ length: N + 1 }, (_, i) => {
    const a = ((i % N) / N) * TAU, r = (R * v[i % N]) / mx
    return `${i ? 'L' : 'M'}${(cx + r * Math.cos(a)).toFixed(1)},${(cy - r * Math.sin(a)).toFixed(1)}`
  }).join('')
  const ex = (s: number) => cx + s * d * 100
  const name = lobes.length === 1 ? 'One main lobe (a cardioid or a beam)' : lobes.length === 2 ? 'Two lobes (a figure-8)' : lobes.length === 0 ? 'Nearly circular' : 'Several lobes'
  return (
    <>
      <Diagram w={640} h={300}
        title={`Two vertical elements ${fmt(d, 2)} wavelength apart, right element lagging by ${p} degrees, seen from above. ${name}. Gain over one element ${fmt(gain, 2)} dB, front-to-back ${fbText}`}
        caption="Top view. Equal currents, ideal elements, no mutual coupling. The beam favours the lagging element when the spacing is a quarter wave.">
        <circle cx={cx} cy={cy} r={R} fill="none" stroke={C.fill2} strokeWidth={1.5} />
        <circle cx={cx} cy={cy} r={R / 2} fill="none" stroke={C.fill2} strokeWidth={1.5} />
        <Ln x1={cx - R - 8} y1={cy} x2={cx + R + 8} y2={cy} color={C.fill2} width={1} dash="4 4" />
        <path d={path + 'Z'} fill={C.signal} fillOpacity={0.22} stroke={C.signal} strokeWidth={3} strokeLinejoin="round" />
        <circle cx={ex(-0.5)} cy={cy} r={8} fill={C.voltage} stroke={C.bg} strokeWidth={2} />
        <circle cx={ex(0.5)} cy={cy} r={8} fill={C.current} stroke={C.bg} strokeWidth={2} />
        <T x={20} y={16} size={13} bold color={C.muted}>Pattern from above</T>
        <T x={cx + R + 14} y={cy + 16} size={12} color={C.muted}>0°</T>
        <circle cx={400} cy={46} r={7} fill={C.voltage} /><T x={414} y={46} size={13}>left: reference phase</T>
        <circle cx={400} cy={72} r={7} fill={C.current} /><T x={414} y={72} size={13}>right: current lags {p}°</T>
        <T x={394} y={104} size={13} color={C.muted}>Spacing {fmt(d, 2)} λ = {fmt(d * 360, 3)}°</T>
        <rect x={388} y={126} width={242} height={150} rx={10} fill={C.fill} stroke={C.signal} strokeWidth={2} />
        <T x={402} y={148} size={12} color={C.muted}>Lobes at (0° = to the right)</T>
        <T x={402} y={170} size={15} bold color={C.signal}>{lobeText}</T>
        <T x={402} y={202} size={12} color={C.muted}>Gain over one element</T>
        <T x={402} y={224} size={15} bold color={C.good}>{fmt(gain, 2)} dB</T>
        <T x={402} y={252} size={12} color={C.muted}>Front-to-back:</T>
        <T x={494} y={252} size={13} bold color={C.bad}>{fbText}</T>
      </Diagram>
      <Controls>
        <div>
          <span className="ctl-label" style={{ display: 'block', marginBottom: 6 }}>Presets</span>
          <Choice label="Presets" value={pre} onChange={(k) => { if (k) { setPre(k); setD(PRESETS[k].d); setP(PRESETS[k].p) } }}
            options={Object.entries(PRESETS).map(([value, x]) => ({ value, label: x.label }))} />
        </div>
        <Slider label="Spacing" value={d} min={0.1} max={1} step={0.05} onChange={(x) => { setD(x); setPre('') }} format={(x) => `${fmt(x, 2)} λ`} color="var(--d-signal)" />
        <Slider label="Phase lag of right element" value={p} min={0} max={180} step={15} onChange={(x) => { setP(x); setPre('') }} format={(x) => `${x}°`} color="var(--d-power)" />
      </Controls>
    </>
  )
}
