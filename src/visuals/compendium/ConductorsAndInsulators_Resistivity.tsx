import { C, Diagram, Ln, T } from '../kit'

const SUP: Record<string, string> = { '-': '⁻', '0': '⁰', '1': '¹', '2': '²', '3': '³', '4': '⁴', '5': '⁵', '6': '⁶', '7': '⁷', '8': '⁸', '9': '⁹' }
const pow10 = (e: number) => '10' + String(e).replace(/./g, (c) => SUP[c])

type Row = { name: string; exp: number; hi?: number; text: string }

// Typical room-temperature resistivities in ohm-metres (approximate; real samples vary, especially water, glass and silicon).
const ROWS: Row[] = [
  { name: 'Silver', exp: Math.log10(1.6e-8), text: '1.6×10⁻⁸' },
  { name: 'Copper', exp: Math.log10(1.7e-8), text: '1.7×10⁻⁸' },
  { name: 'Aluminum', exp: Math.log10(2.7e-8), text: '2.7×10⁻⁸' },
  { name: 'Iron', exp: -7, text: '≈ 10⁻⁷' },
  { name: 'Nichrome', exp: Math.log10(1.1e-6), text: '1.1×10⁻⁶' },
  { name: 'Seawater', exp: Math.log10(0.2), text: '≈ 0.2' },
  { name: 'Silicon, pure', exp: Math.log10(2.3e3), text: '≈ 2×10³' },
  { name: 'Pure water', exp: Math.log10(1.8e5), text: '≈ 2×10⁵' },
  { name: 'Glass', exp: 10, hi: 14, text: '10¹⁰ – 10¹⁴' },
  { name: 'PTFE (Teflon)', exp: 23, text: 'over 10²³' },
]

/** Resistivity of common materials on a logarithmic scale: metals sit far to the left, insulators far to the right. */
export function ConductorsAndInsulators_Resistivity() {
  const x0 = 200, x1 = 620, lo = -8, hi = 24
  const px = (e: number) => x0 + ((x1 - x0) * (e - lo)) / (hi - lo)
  const top = 58, step = 24
  const ticks = [-8, -4, 0, 4, 8, 12, 16, 20, 24]
  const bottom = top + (ROWS.length - 1) * step + 20
  return (
    <Diagram w={640} h={bottom + 58}
      title="Resistivity of common materials on a logarithmic scale, in ohm-metres. Metals such as silver, copper and aluminum are around ten to the minus eight. Silicon is around two thousand. Glass is ten to the ten and up, and PTFE is above ten to the twenty-three. The range is about thirty decades."
      caption="Each gridline is ×10,000. Typical room-temperature values; real samples vary. The hollow dot means &quot;at least&quot;.">
      <T x={x0} y={14} size={13} bold color={C.muted}>← carries current easily</T>
      <T x={x1} y={14} size={13} bold color={C.muted} anchor="end">blocks current →</T>
      {ticks.map((e) => (
        <g key={e}>
          <Ln x1={px(e)} y1={top - 14} x2={px(e)} y2={bottom} color={C.fill2} width={1} />
          <T x={px(e)} y={bottom + 16} anchor="middle" size={12} color={C.muted}>{pow10(e)}</T>
        </g>
      ))}
      {ROWS.map((r, k) => {
        const y = top + k * step
        const col = C.resist
        return (
          <g key={r.name}>
            <T x={12} y={y} size={13} bold>{r.name}</T>
            <T x={188} y={y} anchor="end" size={12} mono color={C.muted}>{r.text}</T>
            {r.hi ? <Ln x1={px(r.exp)} y1={y} x2={px(r.hi)} y2={y} color={col} width={8} /> : r.name.startsWith('PTFE') ? <circle cx={px(r.exp)} cy={y} r={6} fill={C.bg} stroke={col} strokeWidth={3} /> : <circle cx={px(r.exp)} cy={y} r={7} fill={col} stroke={C.bg} strokeWidth={2} />}
                      </g>
        )
      })}
      <T x={(x0 + x1) / 2} y={bottom + 38} anchor="middle" size={12} color={C.muted}>resistivity (Ω·m), logarithmic</T>
    </Diagram>
  )
}
