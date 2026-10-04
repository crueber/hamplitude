import { C, Diagram, Ln, T } from '../kit'

const BLOCKS = ['Antenna', 'Preamp', 'Mixer', 'IF filter', 'IF amp', 'Detector', 'Audio amp', 'Speaker']

type State = 'good' | 'suspect' | 'fault' | 'open'
const ROUNDS: { text: string; probe: number; state: State[] }[] = [
  { text: '1  Probe after the IF filter: the signal is there, so the fault is later', probe: 3, state: ['good', 'good', 'good', 'good', 'suspect', 'suspect', 'suspect', 'suspect'] },
  { text: '2  Probe after the detector: no signal, so the fault is before it', probe: 5, state: ['good', 'good', 'good', 'good', 'suspect', 'suspect', 'open', 'open'] },
  { text: '3  Probe after the IF amp: no signal, so the fault is the IF amp', probe: 4, state: ['good', 'good', 'good', 'good', 'fault', 'open', 'open', 'open'] },
]
const FILL: Record<State, [string, number]> = { good: [C.good, 0.25], suspect: [C.resist, 0.3], fault: [C.bad, 0.4], open: [C.fill, 1] }

/** Half-splitting a receiver chain: each probe halves the number of suspect stages. */
export function Troubleshooting_HalfSplit() {
  const bw = 70, gap = 8, x0 = 12, bh = 38
  return (
    <Diagram w={640} h={340}
      title="Half-splitting a receiver. Probe the middle of the signal chain, decide which half holds the fault, and repeat. Three probes find the faulty stage among eight."
      caption="Eight stages, three tests. Each test rules out half of what is left.">
      {ROUNDS.map((r, ri) => {
        const top = 14 + ri * 100
        return (
          <g key={ri}>
            <T x={14} y={top + 8} size={13} bold>{r.text}</T>
            {BLOCKS.map((b, i) => {
              const x = x0 + i * (bw + gap)
              const [fill, op] = FILL[r.state[i]]
              return (
                <g key={b}>
                  <rect x={x} y={top + 32} width={bw} height={bh} rx={6} fill={fill} fillOpacity={op} stroke={C.ink} strokeWidth={1.5} />
                  <T x={x + bw / 2} y={top + 32 + bh / 2} anchor="middle" size={12} bold>{b}</T>
                  {i < 7 && <Ln x1={x + bw + 1} y1={top + 32 + bh / 2} x2={x + bw + gap - 1} y2={top + 32 + bh / 2} width={1.5} color={C.muted} />}
                </g>
              )
            })}
            {(() => {
              const gx = x0 + (r.probe + 1) * (bw + gap) - gap / 2
              return (
                <g>
                  <Ln x1={gx} y1={top + 24} x2={gx} y2={top + 32 + bh + 6} color={C.signal} width={3} />
                  <circle cx={gx} cy={top + 24} r={5} fill={C.signal} />
                </g>
              )
            })()}
          </g>
        )
      })}
      {([['good', 'tested good'], ['suspect', 'still suspect'], ['fault', 'the fault'], ['open', 'not yet in question']] as [State, string][]).map(([s, label], i) => (
        <g key={s}>
          <rect x={14 + i * 150} y={312} width={16} height={16} rx={3} fill={FILL[s][0]} fillOpacity={FILL[s][1]} stroke={C.ink} strokeWidth={1.2} />
          <T x={36 + i * 150} y={321} size={12} color={C.muted}>{label}</T>
        </g>
      ))}
    </Diagram>
  )
}
