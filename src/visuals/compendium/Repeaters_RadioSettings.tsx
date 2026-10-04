import { C, Diagram, Ln, T } from '../kit'

/** A typical FM radio's repeater memory: what each field does. Values are examples only. */
export function Repeaters_RadioSettings() {
  const rows: { y: number; k: string; v: string; head: string; sub: string; col: string }[] = [
    { y: 78, k: 'RX', v: '146.940 MHz', head: "The repeater's output", sub: 'you listen here', col: C.signal },
    { y: 118, k: 'Offset', v: '− 0.600 MHz', head: 'Shift applied on transmit', sub: 'the radio does the sums', col: C.power },
    { y: 158, k: 'TX', v: '146.340 MHz', head: "The repeater's input", sub: 'you transmit here', col: C.resist },
    { y: 198, k: 'Tone', v: '100.0 Hz', head: 'CTCSS access tone', sub: "must match the repeater's", col: C.current },
    { y: 238, k: 'Mode', v: 'FM', head: 'Modulation', sub: 'FM; match wide or narrow', col: C.ink },
  ]
  return (
    <Diagram w={640} h={290}
      title="A transceiver's repeater memory: receive frequency, offset, the resulting transmit frequency, access tone and mode, each with what it does"
      caption="Example values only. Your radio's menu may call the tone field TONE, T-SQL or PL; the repeater directory gives the right numbers.">
      <rect x={14} y={32} width={290} height={236} rx={14} fill={C.fill} stroke={C.ink} strokeWidth={2.5} />
      <T x={30} y={50} size={13} color={C.muted}>Memory channel (example)</T>
      {rows.map((r) => (
        <g key={r.k}>
          <T x={30} y={r.y} size={14} bold color={r.col}>{r.k}</T>
          <T x={290} y={r.y} size={15} bold mono anchor="end">{r.v}</T>
          <Ln x1={310} y1={r.y} x2={346} y2={r.y} color={r.col} width={2} arrow />
          <T x={356} y={r.y - 8} size={14} bold color={r.col}>{r.head}</T>
          <T x={356} y={r.y + 10} size={12.5} color={C.muted}>{r.sub}</T>
        </g>
      ))}
    </Diagram>
  )
}
