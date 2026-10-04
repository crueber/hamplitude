import { C, Diagram, Ln, T } from '../kit'

const ROWS: [string, string, string, string][] = [
  ['Output', '146.940 MHz', 'Receive frequency', C.signal],
  ['Offset', '-0.600 MHz', 'Transmit = 146.340 MHz', C.resist],
  ['Tone (PL)', '100.0 Hz', 'CTCSS tone to transmit', C.power],
  ['Mode', 'FM', 'Analog FM', C.good],
  ['Notes', 'open, linked', 'Check access before use', C.muted],
]

/** A directory listing and the radio memory fields it fills. Values are illustrative. */
export function RepeaterDirectories_Entry() {
  return (
    <Diagram w={640} h={330} title="One repeater directory listing mapped onto the memory fields of an FM radio. The output frequency is what you listen to. The offset gives the transmit frequency: here 146.940 megahertz minus 0.600 megahertz is 146.340 megahertz. The access tone is sent with your signal so the repeater accepts it. The values are an invented example, not a real repeater." caption="Illustrative listing (not a real repeater). Always confirm by listening.">
      <rect x={8} y={10} width={288} height={254} rx={12} fill={C.fill} stroke={C.ink} strokeWidth={2} />
      <T x={152} y={34} anchor="middle" bold size={14}>Directory listing</T>
      {ROWS.map(([a, b, , col], i) => (
        <g key={a}>
          <rect x={22} y={52 + i * 40} width={260} height={32} rx={7} fill={C.fill2} stroke={col} strokeWidth={1.8} />
          <T x={34} y={68 + i * 40} size={13} color={C.muted}>{a}</T>
          <T x={270} y={68 + i * 40} anchor="end" size={13.5} bold mono>{b}</T>
        </g>
      ))}
      <T x={320} y={34} anchor="middle" size={12.5} color={C.muted}>fills</T>
      {ROWS.map(([, , , col], i) => (
        <Ln key={i} x1={298} y1={68 + i * 40} x2={344} y2={68 + i * 40} color={col} width={2} arrow />
      ))}
      <rect x={346} y={10} width={286} height={254} rx={12} fill={C.fill} stroke={C.signal} strokeWidth={2.2} />
      <T x={489} y={34} anchor="middle" bold size={14}>Radio memory</T>
      {ROWS.map(([, , c, col], i) => (
        <g key={c}>
          <rect x={358} y={52 + i * 40} width={262} height={32} rx={7} fill={C.fill2} stroke={col} strokeWidth={1.8} />
          <T x={489} y={68 + i * 40} anchor="middle" size={13}>{c}</T>
        </g>
      ))}
      <T x={320} y={296} anchor="middle" size={13} color={C.muted}>Then listen first: the listing may be out of date, or the repeater may be closed.</T>
    </Diagram>
  )
}
