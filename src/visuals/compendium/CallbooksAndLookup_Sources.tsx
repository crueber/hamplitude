import { C, Diagram, Ln, T } from '../kit'

const SRC: [string, string, string, string][] = [
  ['Official licensing database', 'name, class, address,', 'grant and expiry dates', C.good],
  ['Community callbook sites', 'the same, plus whatever', 'the operator adds', C.signal],
  ['Your logging software', 'looks up as you type and', 'fills in name and grid', C.resist],
]

/** A call sign goes in; different sources return different kinds of information. */
export function CallbooksAndLookup_Sources() {
  return (
    <Diagram w={640} h={330} title="Looking up a call sign. You type a call sign and a lookup finds a record. The official licensing database is the authoritative record of the license itself. Community callbook websites add information the operator chose to publish, such as a photo or QSL instructions. Logging software can query these sources for you and fill in name and grid square as you log. Always check the date of the information, since entries can be out of date." caption="The license record is the authority; everything else is optional, self-reported or cached.">
      <rect x={10} y={116} width={116} height={66} rx={12} fill={C.fill} stroke={C.ink} strokeWidth={2.2} />
      <T x={68} y={140} anchor="middle" bold size={14}>call sign</T>
      <T x={68} y={162} anchor="middle" size={13} mono color={C.muted}>N0CALL</T>
      {SRC.map(([a, l1, l2, col], i) => {
        const y = 14 + i * 100
        return (
          <g key={a}>
            <Ln x1={128} y1={149} x2={170} y2={y + 36} color={col} width={2} arrow />
            <rect x={172} y={y} width={246} height={74} rx={12} fill={C.fill} stroke={col} strokeWidth={2.4} />
            <T x={295} y={y + 20} anchor="middle" bold size={14}>{a}</T>
            <T x={295} y={y + 42} anchor="middle" size={12.5} color={C.muted}>{l1}</T>
            <T x={295} y={y + 60} anchor="middle" size={12.5} color={C.muted}>{l2}</T>
            <Ln x1={420} y1={y + 36} x2={456} y2={y + 36} color={col} width={2} arrow />
          </g>
        )
      })}
      <rect x={458} y={14} width={174} height={274} rx={12} fill={C.fill} stroke={C.ink} strokeWidth={2} />
      <T x={545} y={36} anchor="middle" bold size={14}>A record may show</T>
      {['Name', 'License class', 'Mailing address', 'Grid square', 'Expiry date', 'QSL instructions'].map((f, i) => (
        <T key={f} x={474} y={68 + i * 28} size={13}>{`•  ${f}`}</T>
      ))}
      <T x={545} y={262} anchor="middle" size={12} color={C.muted}>(varies by source)</T>
      <T x={320} y={314} anchor="middle" size={12.5} color={C.muted}>The call sign N0CALL is a placeholder, not a real station.</T>
    </Diagram>
  )
}
