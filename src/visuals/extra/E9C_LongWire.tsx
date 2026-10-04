import { useMemo, useState } from 'react'
import { C, Choice, Controls, Diagram, Ln, Slider, T, fmt } from '../kit'

const N = 90
// radiation from a straight wire of length L (wavelengths), wire along the 0°–180° axis.
function field(theta: number, L: number, term: boolean) {
  const s = Math.sin(theta), c = Math.cos(theta)
  if (term) {
    const a = 2 * Math.PI * (c - 1) // traveling wave out to the right
    return Math.abs(s) * Math.abs(Math.abs(a) < 1e-6 ? L : Math.sin((a * L) / 2) / (a / 2)) / L
  }
  // standing wave: current sin(k(L/2 - |z|)), centre-fed
  let sum = 0
  const k = 2 * Math.PI
  for (let i = 0; i < N; i++) {
    const z = ((i + 0.5) / N) * (L / 2)
    sum += Math.sin(k * (L / 2 - z)) * Math.cos(k * z * c)
  }
  return Math.abs(s * sum)
}

/** Long wire patterns: more lobes, drawn closer to the wire, as the wire gets longer; a terminating resistor kills the lobes pointing backward. */
export function E9C_LongWire() {
  const [L, setL] = useState(2)
  const [term, setTerm] = useState(false)
  const data = useMemo(() => {
    const v = Array.from({ length: 361 }, (_, i) => field((i * Math.PI) / 180, L, term))
    const mx = Math.max(...v)
    return v.map((x) => x / mx)
  }, [L, term])
  const cx = 230, cy = 148, R = 124
  // pattern is symmetric about the wire: mirror theta over the upper and lower half
  const path = Array.from({ length: 361 }, (_, i) => {
    const th = i <= 180 ? i : 360 - i
    const r = R * data[th]
    const a = (i * Math.PI) / 180
    return `${i ? 'L' : 'M'}${(cx + r * Math.cos(a)).toFixed(1)},${(cy - r * Math.sin(a)).toFixed(1)}`
  }).join('') + 'Z'
  // lobes: local maxima over 0..180
  let lobes = 0, best = 0, bi = 0
  for (let i = 1; i < 180; i++) if (data[i] > data[i - 1] && data[i] >= data[i + 1] && data[i] > 0.08) { lobes++; if (data[i] > best) { best = data[i]; bi = i } }
  const mainAngle = term ? bi : Math.min(bi, 180 - bi)
  const wl = Math.min(L * 28, 100)
  return (
    <>
      <Diagram w={640} h={300} title={`Pattern of a ${L} wavelength long wire, ${term ? 'terminated with a resistor' : 'unterminated'}, in the plane containing the wire. About ${mainAngle} degrees off the wire is the strongest direction.`}
        caption="Plane containing the wire; the full pattern spins around it like a cone-shaped lobe. Longer wire: lobes crowd toward the wire axis.">
        <circle cx={cx} cy={cy} r={R} fill="none" stroke={C.fill2} strokeWidth={1.5} />
        <path d={path} fill={C.signal} fillOpacity={0.22} stroke={C.signal} strokeWidth={2.5} strokeLinejoin="round" />
        <Ln x1={cx - wl} y1={cy} x2={cx + wl} y2={cy} color={C.resist} width={5} />
        {term && <><rect x={cx + wl + 4} y={cy - 8} width={22} height={16} rx={3} fill={C.fill} stroke={C.bad} strokeWidth={2} /><T x={cx + wl + 15} y={cy} anchor="middle" size={11} bold color={C.bad}>R</T></>}
        <T x={cx - R - 10} y={cy + 24} size={12} color={C.muted}>wire axis</T>
        <T x={400} y={46} size={13} bold color={C.muted}>Wire length</T>
        <T x={400} y={72} size={24} bold color={C.resist}>{fmt(L)} λ</T>
        <T x={400} y={112} size={13} color={C.ink}>Lobes in this plane: {lobes}</T>
        <T x={400} y={136} size={13} color={C.ink}>Strongest lobe: {mainAngle}° from wire</T>
        <rect x={394} y={170} width={236} height={64} rx={10} fill={C.fill} stroke={term ? C.good : C.muted} strokeWidth={2} />
        <T x={406} y={192} size={14} bold color={term ? C.good : C.ink}>{term ? 'Unidirectional' : 'Bidirectional'}</T>
        <T x={406} y={214} size={12} color={C.muted}>{term ? 'resistor absorbs the wave at the end' : 'reflected wave runs both ways'}</T>
      </Diagram>
      <Controls>
        <Slider label="Wire length" value={L} min={0.5} max={8} step={0.5} onChange={setL} format={(v) => `${fmt(v)} λ`} color="var(--d-resist)" />
        <Choice label="Termination" value={term ? 'on' : 'off'} onChange={(v) => setTerm(v === 'on')} options={[{ value: 'off', label: 'No terminating resistor' }, { value: 'on', label: 'Terminated' }]} />
      </Controls>
    </>
  )
}
