import { C, Diagram, Ln, T } from '../kit'

const ROWS: { need: string; kind: string; sub: string; c: string }[] = [
  { need: 'Local chats via repeaters, on foot', kind: 'Handheld', sub: 'VHF/UHF, a few watts', c: C.signal },
  { need: 'Local range from car or home', kind: 'VHF/UHF mobile or base', sub: 'more power, better antenna', c: C.current },
  { need: 'Talk across the world', kind: 'HF transceiver', sub: 'SSB, CW, digital', c: C.voltage },
  { need: 'Operate HF from a summit or camp', kind: 'QRP / portable rig', sub: 'small, low power', c: C.resist },
  { need: 'See the whole band on screen', kind: 'SDR transceiver', sub: 'software does the radio', c: C.power },
  { need: 'Just listen: scanning, airband', kind: 'Receiver or scanner', sub: 'no transmitter', c: C.muted },
]

/** A chooser: what you want to do, and the kind of radio that suits it. */
export function HandheldTransceivers_Chooser() {
  const y0 = 38, rh = 52
  return (
    <Diagram w={640} h={y0 + ROWS.length * rh + 6} title="A chooser matching what you want to do to a kind of radio: handheld for local repeater chats on foot, VHF/UHF mobile or base for more local range, HF transceiver for worldwide contacts, QRP for portable HF, SDR transceiver for a full-band display, and a receiver or scanner for listening only"
      caption="What do you want to do? Each need points to a kind of radio that suits it.">
      <T x={20} y={16} bold size={13} color={C.muted}>I want to…</T>
      <T x={350} y={16} bold size={13} color={C.muted}>Kind of radio</T>
      {ROWS.map((r, i) => {
        const y = y0 + i * rh
        return (
          <g key={r.kind}>
            <rect x={14} y={y} width={290} height={42} rx={10} fill={C.fill} stroke={C.muted} strokeWidth={1.5} />
            <T x={28} y={y + 21} size={13}>{r.need}</T>
            <Ln x1={308} y1={y + 21} x2={342} y2={y + 21} color={r.c} width={2.5} arrow />
            <rect x={346} y={y} width={280} height={42} rx={10} fill={C.fill} stroke={r.c} strokeWidth={2.2} />
            <T x={360} y={y + 14} bold size={14}>{r.kind}</T>
            <T x={360} y={y + 31} size={12} color={C.muted}>{r.sub}</T>
          </g>
        )
      })}
    </Diagram>
  )
}
