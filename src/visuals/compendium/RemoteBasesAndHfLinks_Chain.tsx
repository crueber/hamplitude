import { Box, C, Diagram, Ln, T } from '../kit'

function Badge({ x, y, n }: { x: number; y: number; n: number }) {
  return (
    <g>
      <circle cx={x} cy={y} r={11} fill={C.power} stroke={C.bg} strokeWidth={2} />
      <T x={x} y={y} anchor="middle" size={13} bold color={C.bg}>{n}</T>
    </g>
  )
}

const NOTES = [
  'Remote control: the control operator is the user, with privileges for the HF frequency used.',
  'A radio control link must use an auxiliary station: 2 m or shorter, in certain segments.',
  'If the link fails, the transmitter must stop within 3 minutes; keep unauthorized users out.',
  'The HF signal needs the station\'s call sign, the band plan and a clear frequency.',
]

/** A remote base: user, repeater or link, controller, link, HF radio and antenna, with the four rules that apply along the chain. */
export function RemoteBasesAndHfLinks_Chain() {
  return (
    <Diagram w={640} h={362}
      title="A remote base chain. A user on a VHF or UHF handheld reaches a repeater or link, which passes audio and control commands over a control link to a remote site with a controller, an HF radio and an antenna. Four rules apply along the chain: the user is the control operator, a radio control link must use an auxiliary station, the transmitter must stop within three minutes if the link fails, and the HF signal must follow identification and band-plan rules."
      caption="Part 97 does not use the term remote base; it is a remotely controlled station. Rule numbers are 47 CFR 97.109, 97.201, 97.213, 97.119.">
      <Box x={8} y={52} w={118} h={72} label="User" sub="handheld" color={C.ink} />
      <Ln x1={126} y1={88} x2={170} y2={88} color={C.signal} width={2.5} arrow="both" />
      <Box x={170} y={52} w={124} h={72} label="Repeater" sub="or link" color={C.signal} />
      <Ln x1={294} y1={88} x2={340} y2={88} color={C.signal} width={2.5} arrow="both" />
      <T x={317} y={70} anchor="middle" size={12} color={C.muted}>link</T>

      <rect x={340} y={14} width={292} height={222} rx={12} fill={C.fill2} stroke={C.muted} strokeWidth={2} strokeDasharray="6 5" />
      <T x={622} y={32} anchor="end" size={12.5} bold color={C.muted}>Remote site</T>
      <Box x={356} y={48} w={120} h={60} label="Controller" sub="commands, timer" color={C.power} />
      <Ln x1={416} y1={108} x2={416} y2={140} color={C.signal} width={2.5} arrow="both" />
      <Box x={356} y={140} w={120} h={60} label="HF radio" sub="TX and RX" color={C.current} />
      <Ln x1={476} y1={170} x2={520} y2={170} color={C.signal} width={2.5} arrow="both" />

      {/* antenna: mast with an inverted V */}
      <Ln x1={558} y1={116} x2={558} y2={206} color={C.ink} width={2.5} />
      <Ln x1={558} y1={124} x2={524} y2={160} color={C.ink} width={2.5} />
      <Ln x1={558} y1={124} x2={592} y2={160} color={C.ink} width={2.5} />
      <T x={558} y={220} anchor="middle" size={12.5} bold>HF antenna</T>
      <path d="M 596 96 q 12 -16 0 -32 M 608 100 q 18 -20 0 -40" fill="none" stroke={C.signal} strokeWidth={2.5} strokeLinecap="round" />

      <Badge x={20} y={46} n={1} />
      <Badge x={317} y={106} n={2} />
      <Badge x={366} y={44} n={3} />
      <Badge x={366} y={140} n={4} />

      {NOTES.map((t, i) => (
        <g key={i}>
          <circle cx={24} cy={260 + i * 28} r={10} fill={C.power} />
          <T x={24} y={260 + i * 28} anchor="middle" size={12} bold color={C.bg}>{i + 1}</T>
          <T x={44} y={260 + i * 28} size={12.5}>{t}</T>
        </g>
      ))}
    </Diagram>
  )
}
