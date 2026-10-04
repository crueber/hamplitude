import { C, Diagram, Ln, T } from '../kit'

const IN = [
  { t: 'Your keyboard', d: 'call, report, notes', c: C.signal },
  { t: 'Radio (CAT)', d: 'frequency, band, mode', c: C.current },
  { t: 'Callbook lookup', d: 'name, location, grid', c: C.resist },
  { t: 'Spots', d: 'who is on, and where', c: C.power },
]
const FEATS = ['Dupe check', 'Bearing and distance', 'Band map', 'Needed-award flags', 'Keyer / macros']
const OUT = [
  { t: 'ADIF file', d: 'move to any program', c: C.good },
  { t: 'Cabrillo file', d: 'contest log entry', c: C.voltage },
  { t: 'LoTW / eQSL', d: 'online confirmation', c: C.current },
  { t: 'Award tracking', d: 'what is worked or needed', c: C.power },
]

/** What flows into a logging program, what it does with it, and what comes out. */
export function LoggingSoftware_Flow() {
  const bh = 52
  return (
    <Diagram w={640} h={298}
      title="Logging software as a hub: inputs from your keyboard, the radio over CAT, callbook lookups and spots flow into the program, which checks for duplicates, shows bearing and distance, flags needed awards and sends keyer messages; outputs are ADIF and Cabrillo files, online confirmation uploads and award tracking."
      caption="Features and names vary by program. Contest loggers lean on speed; general loggers on records and awards.">
      {IN.map((n, i) => (
        <g key={n.t}>
          <rect x={8} y={14 + i * 68} width={176} height={bh} rx={10} fill={C.fill} stroke={n.c} strokeWidth={2} />
          <T x={20} y={14 + i * 68 + 18} size={13.5} bold color={n.c}>{n.t}</T>
          <T x={20} y={14 + i * 68 + 38} size={12.5} color={C.muted}>{n.d}</T>
          <Ln x1={186} y1={14 + i * 68 + bh / 2} x2={228} y2={14 + i * 68 + bh / 2} color={n.c} width={2} arrow />
        </g>
      ))}
      <rect x={230} y={14} width={180} height={254} rx={14} fill={C.fill2} stroke={C.ink} strokeWidth={2} />
      <T x={320} y={36} anchor="middle" size={14.5} bold>The logger</T>
      {FEATS.map((f, i) => (
        <g key={f}>
          <rect x={244} y={56 + i * 40} width={152} height={30} rx={8} fill={C.bg} stroke={C.muted} strokeWidth={1.5} />
          <T x={320} y={71 + i * 40} anchor="middle" size={12.5}>{f}</T>
        </g>
      ))}
      {OUT.map((n, i) => (
        <g key={n.t}>
          <rect x={456} y={14 + i * 68} width={176} height={bh} rx={10} fill={C.fill} stroke={n.c} strokeWidth={2} />
          <T x={468} y={14 + i * 68 + 18} size={13.5} bold color={n.c}>{n.t}</T>
          <T x={468} y={14 + i * 68 + 38} size={12.5} color={C.muted}>{n.d}</T>
          <Ln x1={412} y1={14 + i * 68 + bh / 2} x2={454} y2={14 + i * 68 + bh / 2} color={n.c} width={2} arrow />
        </g>
      ))}
    </Diagram>
  )
}
