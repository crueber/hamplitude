import { Box, C, Diagram, Ln, T } from '../kit'

const pt = (cx: number, cy: number, r: number, deg: number): [number, number] => [cx + r * Math.cos((deg * Math.PI) / 180), cy + r * Math.sin((deg * Math.PI) / 180)]

function Section({ cx, cy, foam }: { cx: number; cy: number; foam?: boolean }) {
  const bubbles: [number, number][] = []
  for (let ring = 0; ring < 3; ring++) {
    const r = 22 + ring * 15
    const n = 5 + ring * 4
    for (let i = 0; i < n; i++) bubbles.push(pt(cx, cy, r, (360 / n) * i + ring * 20))
  }
  return (
    <g>
      <circle cx={cx} cy={cy} r={86} fill={C.ink} fillOpacity={0.55} stroke={C.ink} strokeWidth={2} />
      <circle cx={cx} cy={cy} r={72} fill={C.fill2} stroke={C.muted} strokeWidth={5} strokeDasharray="2 3" />
      <circle cx={cx} cy={cy} r={64} fill={C.fill} stroke={C.ink} strokeWidth={1.5} />
      {foam && bubbles.map(([x, y], i) => <circle key={i} cx={x} cy={y} r={4} fill={C.bg} stroke={C.muted} strokeWidth={1.2} />)}
      <circle cx={cx} cy={cy} r={12} fill={C.resist} stroke={C.ink} strokeWidth={2} />
    </g>
  )
}

/** Coax cross-sections (solid vs foam) and how moisture kills a cable. */
export function CoaxLayers() {
  const cx = 340, cy = 104
  const labels: { deg: number; r: number; y: number; head: string; sub: string }[] = [
    { deg: -52, r: 80, y: 30, head: 'Outer jacket', sub: 'UV-resistant, keeps water out' },
    { deg: -22, r: 68, y: 72, head: 'Braid shield', sub: 'woven copper' },
    { deg: 22, r: 42, y: 122, head: 'Dielectric', sub: 'insulator between the two' },
    { deg: 55, r: 8, y: 170, head: 'Center conductor', sub: 'carries the signal' },
  ]
  return (
    <Diagram w={640} h={340} title="Coax cross-section: center conductor, dielectric, braid shield and outer jacket. Solid dielectric versus foam dielectric. Below, how UV damage or a leaky connector lets water into the cable and fails it."
      caption="Foam is mostly air, so it loses less per foot. Water in the cable is what kills it.">
      <Section cx={110} cy={cy} />
      <Section cx={cx} cy={cy} foam />
      <T x={110} y={216} anchor="middle" bold size={14}>Solid dielectric</T>
      <T x={110} y={236} anchor="middle" size={13} color={C.muted}>more loss per foot</T>
      <T x={cx} y={216} anchor="middle" bold size={14}>Foam dielectric</T>
      <T x={cx} y={236} anchor="middle" size={13} bold color={C.good}>less loss per foot</T>
      {labels.map((l) => {
        const [x, y] = pt(cx, cy, l.r, l.deg)
        return (
          <g key={l.head}>
            <Ln x1={x} y1={y} x2={446} y2={l.y} color={C.ink} width={1.5} />
            <circle cx={x} cy={y} r={3} fill={C.ink} stroke={C.bg} strokeWidth={1} />
            <T x={452} y={l.y - 7} bold size={13}>{l.head}</T>
            <T x={452} y={l.y + 10} size={12} color={C.muted}>{l.sub}</T>
          </g>
        )
      })}
      <T x={6} y={266} bold size={13} color={C.bad}>How coax fails</T>
      {[['UV light', 'cracks the jacket'], ['Water gets in', 'cracks, connectors'], ['Moisture', 'ruins the cable'], ['Cable fails', 'loss soars']].map(([a, b], i) => (
        <g key={a}>
          <Box x={6 + i * 160} y={278} w={140} h={52} label={a} sub={b} size={14} color={i === 3 ? C.bad : C.muted} />
          {i < 3 && <Ln x1={148 + i * 160} y1={304} x2={164 + i * 160} y2={304} color={C.muted} width={2.5} arrow />}
        </g>
      ))}
    </Diagram>
  )
}
