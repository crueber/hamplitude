import { C, Diagram, Ln, T } from '../kit'

/** TEP: a north-south path crossing the geomagnetic equator, about 2,000-3,000 miles, afternoon/early evening. */
export function Tep() {
  const bx0 = 30, bx1 = 610
  const eq = (x: number) => 122 + 14 * Math.sin((x - 30) / 90)
  const band = Array.from({ length: 59 }, (_, i) => `${i ? 'L' : 'M'}${bx0 + i * 10},${eq(bx0 + i * 10).toFixed(1)}`).join('')
  const sx = 330
  const tx0 = 40, tx1 = 600, ty = 276
  const H = (h: number) => tx0 + (h / 24) * (tx1 - tx0)
  return (
    <Diagram w={640} h={322} title="Transequatorial propagation: signals cross the geomagnetic equator on a north-south path, typically 2,000 to 3,000 miles and at most about 5,000 miles, and mostly in the afternoon and early evening. A path along the equator does not work"
      caption="Schematic map. Path across the geomagnetic equator, afternoon to early evening.">
      <rect x={bx0} y={8} width={bx1 - bx0} height={228} rx={10} fill={C.fill} stroke={C.muted} strokeWidth={1.5} />
      <path d={band} fill="none" stroke={C.power} strokeWidth={22} opacity={0.18} />
      <path d={band} fill="none" stroke={C.power} strokeWidth={3} strokeDasharray="8 6" />
      <T x={bx1 - 12} y={eq(bx1) + 34} anchor="end" size={13} bold color={C.power}>geomagnetic equator</T>
      <Ln x1={sx} y1={40} x2={sx} y2={206} color={C.good} width={4} arrow="both" />
      <circle cx={sx} cy={30} r={7} fill={C.ink} stroke={C.bg} strokeWidth={2} />
      <circle cx={sx} cy={212} r={7} fill={C.ink} stroke={C.bg} strokeWidth={2} />
      <T x={sx + 14} y={30} size={13} bold>Station N</T>
      <T x={sx + 14} y={212} size={13} bold>Station S</T>
      <T x={sx - 14} y={64} anchor="end" size={14} bold color={C.good}>2,000 – 3,000 mi typical</T>
      <T x={sx - 14} y={84} anchor="end" size={13} color={C.good}>about 5,000 mi at most</T>
      <Ln x1={44} y1={eq(44) + 2} x2={206} y2={eq(206) + 2} color={C.bad} width={4} dash="3 6" />
      <T x={44} y={eq(44) + 26} size={13} bold color={C.bad}>along the equator: no</T>
      <Ln x1={tx0} y1={ty} x2={tx1} y2={ty} color={C.muted} width={2} />
      <rect x={H(13)} y={ty - 10} width={H(21) - H(13)} height={20} rx={4} fill={C.good} fillOpacity={0.3} stroke={C.good} strokeWidth={2} />
      {[0, 6, 12, 18, 24].map((h) => <T key={h} x={H(h)} y={ty + 24} anchor="middle" size={12} color={C.muted}>{`${String(h).padStart(2, '0')}:00`}</T>)}
      <T x={(H(13) + H(21)) / 2} y={ty - 26} anchor="middle" size={14} bold color={C.good}>afternoon / early evening</T>
    </Diagram>
  )
}
