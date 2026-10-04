import { C, Diagram, Ln, T } from '../kit'

const STAGES = [
  { n: '1', head: 'Open', col: C.power, lines: ['Net control gives', "the net's name,", 'purpose and rules.'], quote: '"Net is open"' },
  { n: '2', head: 'Check in', col: C.signal, lines: ['Stations give their', 'call sign when', 'invited, then wait.'], quote: '"Checking in"' },
  { n: '3', head: 'Business', col: C.resist, lines: ['Net control directs', 'each exchange:', 'news or traffic.'], quote: '"K2BB, go ahead"' },
  { n: '4', head: 'Close', col: C.good, lines: ['Thank everyone,', 'announce the next', 'net, and sign off.'], quote: '"Net is closed"' },
]

/** A typical voice net, in four stages, with example phrases. */
export function VoiceNets_Outline() {
  const w = 147, gap = 12, x0 = 14
  return (
    <Diagram w={640} h={250}
      title="The four stages of a typical voice net: open, check in, business, close, each with what net control and the stations do and an example phrase"
      caption="Example phrases only. Each net has its own script, and net control is always the one who invites each speaker.">
      {STAGES.map((s, i) => {
        const x = x0 + i * (w + gap)
        return (
          <g key={s.n}>
            <rect x={x} y={20} width={w} height={206} rx={12} fill={C.fill} stroke={s.col} strokeWidth={2} />
            <circle cx={x + 24} cy={46} r={14} fill={s.col} />
            <T x={x + 24} y={46} anchor="middle" size={14} bold color={C.bg}>{s.n}</T>
            <T x={x + 46} y={46} size={16} bold color={s.col}>{s.head}</T>
            {s.lines.map((l, j) => <T key={j} x={x + 10} y={88 + j * 20} size={12.5}>{l}</T>)}
            <rect x={x + 8} y={170} width={w - 16} height={40} rx={8} fill={C.bg} stroke={s.col} strokeWidth={1.5} />
            <T x={x + w / 2} y={190} anchor="middle" mono size={12} color={C.ink}>{s.quote}</T>
            {i < 3 && <Ln x1={x + w + 2} y1={46} x2={x + w + gap - 2} y2={46} color={C.muted} width={2.5} arrow />}
          </g>
        )
      })}
    </Diagram>
  )
}
