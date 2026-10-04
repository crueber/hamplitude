import { C, Diagram, Ln, T } from '../kit'

/** Coax cross-section: centre conductor, insulator, braided shield, jacket. */
export function CoaxCross() {
  const cx = 150, cy = 150
  const labels: { y: number; n: string; sub: string; color: string; tx: number; ty: number }[] = [
    { y: 52, n: 'Outer jacket', sub: 'weatherproof cover', color: C.muted, tx: cx + 74, ty: cy - 58 },
    { y: 112, n: 'Shield (braid)', sub: 'keeps the signal in, noise out', color: C.signal, tx: cx + 58, ty: cy - 30 },
    { y: 172, n: 'Insulator (dielectric)', sub: 'holds the center in place', color: C.power, tx: cx + 30, ty: cy + 22 },
    { y: 232, n: 'Center conductor', sub: 'carries the signal', color: C.resist, tx: cx + 4, ty: cy + 2 },
  ]
  return (
    <Diagram w={640} h={290} title="Coaxial cable cross-section: a center conductor, an insulator, a braided shield and an outer jacket. Common amateur coax is 50 ohms"
      caption="One conductor inside another, sharing a center line: that's what 'co-axial' means.">
      <circle cx={cx} cy={cy} r={100} fill={C.fill2} stroke={C.muted} strokeWidth={4} />
      <circle cx={cx} cy={cy} r={82} fill="none" stroke={C.signal} strokeWidth={9} strokeDasharray="7 3" />
      <circle cx={cx} cy={cy} r={68} fill={C.bg} stroke={C.signal} strokeWidth={2} />
      <circle cx={cx} cy={cy} r={64} fill={C.power} fillOpacity={0.16} />
      <circle cx={cx} cy={cy} r={18} fill={C.resist} stroke={C.bg} strokeWidth={3} />
      {labels.map((l) => (
        <g key={l.n}>
          <Ln x1={l.tx} y1={l.ty} x2={330} y2={l.y} color={l.color} width={2} />
          <circle cx={l.tx} cy={l.ty} r={3.5} fill={l.color} />
          <T x={340} y={l.y - 8} size={15} bold color={l.color}>{l.n}</T>
          <T x={340} y={l.y + 12} size={13} color={C.muted}>{l.sub}</T>
        </g>
      ))}
      <rect x={470} y={246} width={150} height={32} rx={8} fill={C.fill} />
      <T x={545} y={262} anchor="middle" size={15} bold>Typically 50 Ω</T>
    </Diagram>
  )
}
