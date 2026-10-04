import { C, Diagram, Ln, T } from '../kit'

const STEPS: [string, string, string, string][] = [
  ['1', 'Listen', 'before you key up', C.signal],
  ['2', 'Write it down', 'exactly as given', C.resist],
  ['3', 'Relay it', 'word for word', C.power],
  ['4', 'Confirm', 'read it back', C.good],
]

/** Emergency message loop: listen, record, relay verbatim, confirm. */
export function EmcommPrinciples_Loop() {
  return (
    <Diagram w={640} h={330} title="The emergency message loop: listen first, write the message down exactly as given, relay it word for word, then confirm by reading it back. Accuracy comes before speed. Beneath it, three ground rules: stay within your assigned role, use plain language, and do not release information you have not been authorized to release." caption="Accuracy first: a slow, correct message beats a fast, wrong one.">
      {STEPS.map(([n, a, b, col], i) => {
        const x = 14 + i * 156
        return (
          <g key={a}>
            <rect x={x} y={34} width={132} height={104} rx={12} fill={C.fill} stroke={col} strokeWidth={2.4} />
            <circle cx={x + 22} cy={56} r={13} fill={col} fillOpacity={0.2} stroke={col} strokeWidth={2} />
            <T x={x + 22} y={56} anchor="middle" bold size={14}>{n}</T>
            <T x={x + 66} y={92} anchor="middle" bold size={16}>{a}</T>
            <T x={x + 66} y={116} anchor="middle" size={13} color={C.muted}>{b}</T>
            {i < 3 && <Ln x1={x + 134} y1={86} x2={x + 154} y2={86} color={C.ink} width={2.2} arrow />}
          </g>
        )
      })}
      <path d="M 560 140 L 560 160 L 80 160 L 80 142" fill="none" stroke={C.muted} strokeWidth={2} strokeDasharray="6 5" strokeLinecap="round" markerEnd="url(#hx-arrow)" />
      <T x={320} y={178} anchor="middle" size={13} color={C.muted}>an error found at the confirm step sends you back round the loop</T>

      <T x={14} y={214} size={14} bold color={C.power}>Ground rules</T>
      {[
        ['Stay in your role', 'do the job you were assigned', C.signal],
        ['Plain language', 'say it in ordinary words', C.resist],
        ['No unauthorized release', 'the served agency decides', C.bad],
      ].map(([a, b, col], i) => {
        const x = 14 + i * 208
        return (
          <g key={a}>
            <rect x={x} y={232} width={196} height={78} rx={10} fill={C.fill} stroke={col} strokeWidth={2} />
            <T x={x + 98} y={258} anchor="middle" bold size={13.5}>{a}</T>
            <T x={x + 98} y={284} anchor="middle" size={12.5} color={C.muted}>{b}</T>
          </g>
        )
      })}
    </Diagram>
  )
}
