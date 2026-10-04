import { C, Diagram, Ln, T } from '../kit'

const ROWS: [string, string, string, string][] = [
  ['QRS', 'Send slower', 'S = Slow', C.resist],
  ['QRL?', 'Are you busy? Is this frequency in use?', 'ask before you call', C.bad],
  ['QSL', 'I have received and understood', 'QSL card = confirmed', C.good],
  ['QRN', 'I am troubled by static', 'N = Noise', C.signal],
  ['QRV', 'I am ready to receive', 'ready for you', C.power],
]

/** Q signals from the pool: code, meaning, memory hook. */
export function G2C_QSignals() {
  return (
    <Diagram w={640} h={330} title="Q signals: QRS means send slower, QRL question mark means are you busy or is this frequency in use, QSL means I have received and understood, QRN means I am troubled by static, QRV means I am ready to receive" caption="A question mark turns a Q signal into a question: QRL? asks, QRL answers.">
      <T x={14} y={18} size={13} bold color={C.muted}>CODE</T>
      <T x={104} y={18} size={13} bold color={C.muted}>MEANING</T>
      <T x={470} y={18} size={13} bold color={C.muted}>HOOK</T>
      {ROWS.map(([code, mean, hook, col], i) => {
        const y = 32 + i * 58
        return (
          <g key={code}>
            <rect x={10} y={y} width={620} height={50} rx={10} fill={col} fillOpacity={0.12} stroke={col} strokeWidth={1.8} />
            <T x={22} y={y + 25} size={20} bold mono color={col}>{code}</T>
            <T x={104} y={y + 25} size={14}>{mean}</T>
            <Ln x1={460} y1={y + 10} x2={460} y2={y + 40} color={C.fill2} width={1.5} />
            <T x={470} y={y + 25} size={13.5} color={C.muted}>{hook}</T>
          </g>
        )
      })}
    </Diagram>
  )
}
