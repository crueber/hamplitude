import { C, Diagram, Ln, T } from '../kit'

const zig = (x: number, y: number, h: number) => 'M' + Array.from({ length: 13 }, (_, i) => `${x + (i % 2 ? 7 : -7)},${(y - (h * i) / 12).toFixed(1)}`).join('L')

/** Four common HT antennas for 2 m, drawn to scale (3.6 px per inch). */
export function HandheldAntennas_Lengths() {
  const k = 3.6, base = 210
  const items = [
    { x: 80, len: 7, name: 'Rubber duck', size: 'about 7 in (typical)', note: 'compact, loaded', duck: true },
    { x: 240, len: 19.2, name: '¼ λ whip', size: '19 in', note: 'better, simple', duck: false },
    { x: 400, len: 38.4, name: '½ λ telescopic', size: '38 in', note: 'less body-dependent', duck: false },
    { x: 560, len: 48, name: '5/8 λ whip', size: 'about 4 ft', note: 'most gain on paper', duck: false },
  ]
  return (
    <Diagram w={640} h={384}
      title="Four antennas for a 2 meter handheld drawn to scale: a rubber duck of about 7 inches, a 19 inch quarter-wave whip, a 38 inch half-wave telescopic and a roughly 4 foot five-eighths-wave whip. Longer antennas are closer to full size and are generally more efficient"
      caption="Drawn to scale for 146 MHz. On 70 cm each is about a third as long. Rubber duck length is typical, not exact.">
      {items.map((a) => {
        const top = base - a.len * k
        return (
          <g key={a.name}>
            <rect x={a.x - 24} y={base} width={48} height={100} rx={9} fill={C.fill} stroke={C.ink} strokeWidth={2.5} />
            <rect x={a.x - 15} y={base + 14} width={30} height={20} rx={3} fill={C.bg} stroke={C.muted} strokeWidth={1.5} />
            {a.duck ? (
              <path d={zig(a.x, base, a.len * k)} fill="none" stroke={C.power} strokeWidth={3} strokeLinecap="round" strokeLinejoin="round" />
            ) : (
              <Ln x1={a.x} y1={base} x2={a.x} y2={top} color={C.resist} width={4} />
            )}
            <T x={a.x} y={base + 120} anchor="middle" size={13} bold>{a.name}</T>
            <T x={a.x} y={base + 138} anchor="middle" size={12} color={C.muted}>{a.size}</T>
            <T x={a.x} y={base + 156} anchor="middle" size={12} color={C.muted}>{a.note}</T>
          </g>
        )
      })}
    </Diagram>
  )
}
