import { C, Diagram, T } from '../kit'

const ROWS = [
  { name: 'Handheld', note: 'rubber duck, held', p: 5, h: 5, d: 3.1 },
  { name: 'Mobile', note: 'roof antenna', p: 50, h: 6, d: 3.4 },
  { name: 'Base', note: 'mast antenna', p: 50, h: 40, d: 8.9 },
]
const COLS = [
  { key: 'p' as const, title: 'Power (typical)', unit: 'W', max: 50, c: C.voltage, x: 128 },
  { key: 'h' as const, title: 'Antenna height', unit: 'ft', max: 40, c: C.current, x: 288 },
  { key: 'd' as const, title: 'Radio horizon', unit: 'mi', max: 8.9, c: C.signal, x: 448 },
]

/** Typical power, antenna height and the resulting radio horizon for HT, mobile and base. */
export function VhfUhfMobileAndBase_Reach() {
  const y0 = 56, rh = 66, bw = 84
  return (
    <Diagram w={640} h={y0 + ROWS.length * rh + 8} title="Typical power, antenna height and radio horizon for a handheld, a mobile and a base station: the mobile has ten times the handheld's power but a similar horizon, while a base antenna on a mast sees nearly three times as far"
      caption={<>Illustrative figures. Radio horizon ≈ 1.4 × √(height in feet) miles for one station, on flat ground.</>}>
      {COLS.map(col => (
        <T key={col.key} x={col.x} y={20} bold size={13} color={col.c}>{col.title}</T>
      ))}
      {ROWS.map((r, i) => {
        const y = y0 + i * rh
        return (
          <g key={r.name}>
            <T x={14} y={y + 8} bold size={14}>{r.name}</T>
            <T x={14} y={y + 28} size={12} color={C.muted}>{r.note}</T>
            {COLS.map(col => {
              const v = r[col.key]
              const w = Math.max(5, (v / col.max) * bw)
              return (
                <g key={col.key}>
                  <rect x={col.x} y={y - 4} width={w} height={26} rx={4} fill={col.c} />
                  <T x={col.x + w + 8} y={y + 9} size={13} bold>{v} {col.unit}</T>
                </g>
              )
            })}
          </g>
        )
      })}
    </Diagram>
  )
}
