import { C, Diagram, T } from '../kit'

const FIELDS: { label: string; tag: string; value: string }[] = [
  { label: 'Date (UTC)', tag: 'QSO_DATE', value: '20260412' },
  { label: 'Time (UTC)', tag: 'TIME_ON', value: '153000' },
  { label: 'Their call', tag: 'CALL', value: 'N0CALL' },
  { label: 'Band', tag: 'BAND', value: '20m' },
  { label: 'Mode', tag: 'MODE', value: 'SSB' },
  { label: 'Report sent', tag: 'RST_SENT', value: '59' },
  { label: 'Report received', tag: 'RST_RCVD', value: '57' },
]

/** One logged contact, written as an ADIF record: each field is <name:length>value. */
export function LoggingAndQsl_Adif() {
  return (
    <Diagram w={640} h={326} title="One logged contact shown as an ADIF record. Each field is written as a name in angle brackets, a colon, the number of characters in the value, then the value itself. The record ends with EOR."
      caption="ADIF is plain text, so any logging program can read it. The length tells the reader where each value ends.">
      <T x={14} y={18} size={12.5} bold color={C.muted}>IN YOUR LOG</T>
      <T x={170} y={18} size={12.5} bold color={C.muted}>IN AN ADIF FILE</T>
      <T x={440} y={18} size={12.5} bold color={C.muted}>HOW TO READ IT</T>
      {FIELDS.map((f, i) => {
        const y = 36 + i * 36
        return (
          <g key={f.tag}>
            <rect x={8} y={y} width={624} height={30} rx={7} fill={C.fill} />
            <T x={16} y={y + 15} size={13}>{f.label}</T>
            <text x={170} y={y + 15} dominantBaseline="central" fontSize={14} fontWeight={700} style={{ fontFamily: 'var(--font-mono)' }}>
              <tspan fill={C.signal}>&lt;{f.tag}</tspan>
              <tspan fill={C.resist}>:{f.value.length}</tspan>
              <tspan fill={C.signal}>&gt;</tspan>
              <tspan fill={C.ink}>{f.value}</tspan>
            </text>
            <T x={440} y={y + 15} size={12.5} color={C.muted}>{`${f.value.length} characters follow`}</T>
          </g>
        )
      })}
      <rect x={8} y={36 + 7 * 36} width={624} height={26} rx={7} fill={C.fill} />
      <T x={16} y={36 + 7 * 36 + 13} size={13}>End of record</T>
      <T x={170} y={36 + 7 * 36 + 13} mono bold size={14} color={C.signal}>&lt;EOR&gt;</T>
      <T x={440} y={36 + 7 * 36 + 13} size={12.5} color={C.muted}>next contact starts after it</T>
    </Diagram>
  )
}
