import { C, Diagram, Ln, T } from '../kit'

const base = 236
const spike = (x: number, h: number, color: string, dash?: string, op = 1) => (
  <path d={`M${x - 12},${base} Q${x - 3},${base} ${x},${base - h} Q${x + 3},${base} ${x + 12},${base}`} fill={color} fillOpacity={0.25} stroke={color} strokeWidth={3} strokeLinejoin="round" strokeDasharray={dash} opacity={op} />
)

/** Sensitivity (detect weak) vs selectivity (separate close). */
export function SensSel() {
  const noise = (x0: number, x1: number, h: number) => {
    const pts: string[] = []
    for (let x = x0; x <= x1; x += 8) pts.push(`${x},${base - h + ((x * 7) % 5) - 2}`)
    return pts.join(' ')
  }
  return (
    <Diagram w={640} h={290} title="Left: sensitivity is detecting a weak signal that barely rises above the noise. Right: selectivity is a passband that accepts the wanted signal and rejects its neighbours."
      caption="Sensitivity: how weak can it hear? Selectivity: how close can it tell apart?">
      {/* Sensitivity */}
      <T x={160} y={22} anchor="middle" bold size={16} color={C.signal}>Sensitivity</T>
      <T x={160} y={44} anchor="middle" size={13} color={C.muted}>detect a weak signal</T>
      <polygon points={`10,${base} ${noise(10, 310, 34)} 310,${base}`} fill={C.fill2} stroke="none" />
      <polyline points={noise(10, 310, 34)} fill="none" stroke={C.muted} strokeWidth={2} />
      <Ln x1={10} y1={base} x2={310} y2={base} color={C.ink} width={2} />
      {spike(60, 24, C.bad, '5 4', 0.7)}
      {spike(150, 78, C.signal)}
      {spike(250, 140, C.signal)}
      <T x={60} y={base - 50} anchor="middle" size={12} color={C.bad} bold>too weak</T>
      <T x={150} y={base - 98} anchor="middle" size={12} color={C.signal} bold>weak: heard</T>
      <T x={250} y={base - 160} anchor="middle" size={12} color={C.signal} bold>strong</T>
      <T x={14} y={base - 20} size={12} color={C.muted}>noise</T>
      <T x={160} y={base + 24} anchor="middle" size={12} color={C.muted}>frequency →</T>

      {/* Selectivity */}
      <T x={480} y={22} anchor="middle" bold size={16} color={C.power}>Selectivity</T>
      <T x={480} y={44} anchor="middle" size={13} color={C.muted}>pick one signal from many</T>
      <rect x={438} y={64} width={84} height={base - 64} rx={6} fill={C.power} fillOpacity={0.14} stroke={C.power} strokeWidth={2} strokeDasharray="6 4" />
      <T x={480} y={78} anchor="middle" size={12} color={C.power} bold>passband</T>
      <Ln x1={330} y1={base} x2={630} y2={base} color={C.ink} width={2} />
      {spike(400, 80, C.bad, '5 4', 0.7)}
      {spike(480, 120, C.signal)}
      {spike(560, 90, C.bad, '5 4', 0.7)}
      <T x={400} y={base - 100} anchor="middle" size={12} color={C.bad} bold>rejected</T>
      <T x={480} y={base - 140} anchor="middle" size={12} color={C.signal} bold>wanted</T>
      <T x={560} y={base - 110} anchor="middle" size={12} color={C.bad} bold>rejected</T>
      <T x={480} y={base + 24} anchor="middle" size={12} color={C.muted}>frequency →</T>
      <Ln x1={320} y1={34} x2={320} y2={base + 36} color={C.fill2} width={2} />
    </Diagram>
  )
}
