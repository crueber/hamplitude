import { C, Diagram, Ln, T } from '../kit'

// Monopole over ground, field vs angle from vertical: [cos(kL·cosθ) − cos(kL)] / sinθ
const mono = (kL: number) => (th: number) => Math.abs((Math.cos(kL * Math.cos(th)) - Math.cos(kL)) / Math.sin(th))
const N = 90
function curve(f: (t: number) => number) {
  return Array.from({ length: N }, (_, i) => {
    const th = ((i + 0.5) / N) * (Math.PI / 2)
    return { th, r: f(th) }
  })
}
// equal total radiated power over the hemisphere: ∫ r² sinθ dθ
const power = (c: { th: number; r: number }[]) => c.reduce((s, p) => s + p.r * p.r * Math.sin(p.th), 0)

/** Elevation patterns of a 1/4-wave and 5/8-wave whip: 5/8 squeezes energy toward the horizon. */
export function WhipElevation() {
  const q = curve(mono(Math.PI / 2)), e = curve(mono((5 * Math.PI) / 4))
  const pq = power(q), pe = power(e)
  const k = 1 / Math.sqrt(pq)
  const sq = q.map((p) => ({ ...p, r: p.r * k })), se = e.map((p) => ({ ...p, r: (p.r * Math.sqrt(pq / pe)) * k }))
  const maxR = Math.max(...sq.map((p) => p.r * Math.sin(p.th)), ...se.map((p) => p.r * Math.sin(p.th)))
  const cx = 320, gy = 258, S = 270 / maxR
  const full = (c: typeof sq) => {
    const right = c.map((p) => `${(cx + S * p.r * Math.sin(p.th)).toFixed(1)},${(gy - S * p.r * Math.cos(p.th)).toFixed(1)}`)
    const left = c.map((p) => `${(cx - S * p.r * Math.sin(p.th)).toFixed(1)},${(gy - S * p.r * Math.cos(p.th)).toFixed(1)}`).reverse()
    return 'M' + [...left, ...right].join('L')
  }
  return (
    <Diagram w={640} h={300} title="Side view of radiation from a quarter-wave whip and a five-eighths-wave whip on a vehicle roof. The five-eighths wave sends more of its signal toward the horizon, giving more gain"
      caption="Side view, equal power. The 5/8 wave sends more signal toward the horizon, where the other station is.">
      <path d={full(sq)} fill="none" stroke={C.muted} strokeWidth={3} strokeDasharray="6 5" />
      <path d={full(se)} fill={C.signal} fillOpacity={0.2} stroke={C.signal} strokeWidth={3} strokeLinejoin="round" />
      <Ln x1={30} y1={gy} x2={610} y2={gy} color={C.ink} width={4} />
      <Ln x1={cx} y1={gy} x2={cx} y2={gy - 46} color={C.resist} width={5} />
      <T x={cx} y={gy + 24} anchor="middle" size={13} color={C.muted}>metal roof (ground plane)</T>
      <T x={cx} y={18} anchor="middle" size={13} color={C.muted}>sky</T>
      <T x={30} y={36} size={14} bold color={C.signal}>5/8 wave: flatter, more gain</T>
      <T x={30} y={58} size={14} bold color={C.muted}>¼ wave (dashed): taller, rounder</T>
      <T x={612} y={gy + 24} anchor="end" size={13} bold color={C.good}>horizon →</T>
    </Diagram>
  )
}
