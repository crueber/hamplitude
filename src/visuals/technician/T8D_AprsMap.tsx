import { C, Diagram, T } from '../kit'

/** APRS: stations report positions, weather and messages onto a shared map. */
export function AprsMap() {
  const pin = (x: number, y: number, col: string, glyph: string) => (
    <g>
      <circle cx={x} cy={y} r={16} fill={col} stroke={C.bg} strokeWidth={3} />
      <T x={x} y={y} anchor="middle" size={15} bold color={C.bg}>{glyph}</T>
    </g>
  )
  const tag = (x: number, y: number, w: number, a: string, b: string, col: string) => (
    <g>
      <rect x={x} y={y} width={w} height={44} rx={8} fill={C.bg} stroke={col} strokeWidth={2} />
      <T x={x + 10} y={y + 14} size={13} bold color={col}>{a}</T>
      <T x={x + 10} y={y + 31} size={12.5}>{b}</T>
    </g>
  )
  return (
    <Diagram w={640} h={250} title="An APRS map: stations report GPS position, weather data and short text messages, all shown on a map" caption="APRS = packets (position, weather, messages) plotted on a map in real time.">
      <rect x={10} y={10} width={620} height={230} rx={12} fill={C.fill} stroke={C.fill2} strokeWidth={2} />
      <path d="M10,205 C140,170 220,225 330,195 S520,170 630,200" fill="none" stroke={C.current} strokeWidth={8} opacity={0.35} strokeLinecap="round" />
      <path d="M30,226 C180,240 400,215 620,232" fill="none" stroke={C.muted} strokeWidth={4} opacity={0.5} strokeDasharray="14 8" />
      {pin(44, 62, C.signal, '▶')}
      {tag(68, 40, 210, 'N0ABC-9 · car', 'GPS position', C.signal)}
      {pin(344, 62, C.good, '▲')}
      {tag(368, 40, 210, 'KA0GHI · hiker', 'GPS position', C.good)}
      {pin(44, 142, C.resist, '☀')}
      {tag(68, 120, 210, 'W0XYZ-13 · weather', '54°F, wind 5 mph', C.resist)}
      {pin(344, 142, C.power, '✉')}
      {tag(368, 120, 210, 'K0DEF-7 → N0ABC-9', '"Meet at 5 pm"', C.power)}
    </Diagram>
  )
}
