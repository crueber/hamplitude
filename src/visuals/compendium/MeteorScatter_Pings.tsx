import { C, Diagram, Ln, T } from '../kit'

// Illustrative received-signal trace: quick rise then decay for faint (underdense) trails, longer and stronger for dense ones.
const pings = [
  { t: 1.2, peak: 0.45, rise: 0.04, decay: 0.28, kind: 'ping' },
  { t: 3.6, peak: 1, rise: 0.06, decay: 1.4, kind: 'burst' },
  { t: 7.4, peak: 0.3, rise: 0.04, decay: 0.2, kind: 'ping' },
]
const level = (s: number) =>
  pings.reduce((m, p) => {
    const d = s - p.t
    const v = d < 0 ? 0 : d < p.rise ? (p.peak * d) / p.rise : p.peak * Math.exp(-(d - p.rise) / p.decay)
    return Math.max(m, v)
  }, 0)

/** What a meteor-scatter contact sounds and looks like: mostly silence, broken by short bursts. */
export function MeteorScatter_Pings() {
  const x0 = 50, x1 = 610, y0 = 232, top = 60
  const X = (s: number) => x0 + (s / 10) * (x1 - x0)
  const Y = (v: number) => y0 - 14 - v * (y0 - top - 14)
  const pts = Array.from({ length: 401 }, (_, i) => i / 40)
  const d = pts.map((s, i) => `${i ? 'L' : 'M'}${X(s).toFixed(1)},${Y(level(s) + 0.012 * Math.sin(i * 3.1) + 0.012).toFixed(1)}`).join('')
  const th = 0.16
  return (
    <Diagram w={640} h={300}
      title="Schematic of a meteor-scatter signal over ten seconds: mostly noise, broken by a short weak ping, a stronger longer burst from a denser trail, and another brief ping. A message is completed by catching enough of these bursts"
      caption="Illustrative, not real data. Most bursts last a fraction of a second; a few last several seconds.">
      <Ln x1={x0} y1={y0} x2={x1 + 8} y2={y0} color={C.muted} width={2} arrow />
      <Ln x1={x0} y1={y0} x2={x0} y2={top - 16} color={C.muted} width={2} arrow />
      <T x={x0 + 8} y={top - 28} size={13} bold color={C.muted}>received signal strength</T>
      <T x={x1} y={y0 + 40} anchor="end" size={12} color={C.muted}>time (seconds, schematic)</T>
      {[0, 2, 4, 6, 8, 10].map((s) => (
        <T key={s} x={X(s)} y={y0 + 18} anchor="middle" size={12} color={C.muted}>{s}</T>
      ))}
      <Ln x1={x0} y1={Y(th)} x2={x1} y2={Y(th)} color={C.muted} width={1.5} dash="5 5" />
      <T x={166} y={Y(th) - 11} size={12} color={C.muted}>decode limit</T>
      <path d={d} fill="none" stroke={C.signal} strokeWidth={3} strokeLinejoin="round" />
      <T x={X(1.2) + 6} y={Y(0.5) - 24} size={13} bold color={C.resist}>short ping</T>
      <T x={X(1.2) + 6} y={Y(0.5) - 8} size={12.5} color={C.muted}>faint trail, gone in a flash</T>
      <T x={X(3.6) + 14} y={Y(1) + 2} size={13} bold color={C.good}>longer burst</T>
      <T x={X(3.6) + 14} y={Y(1) + 18} size={12.5} color={C.muted}>denser trail: stronger, lasts longer</T>
      <T x={X(7.4) + 10} y={Y(0.34)} size={13} bold color={C.resist}>ping</T>
    </Diagram>
  )
}
