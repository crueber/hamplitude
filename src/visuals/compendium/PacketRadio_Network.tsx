import { C, Diagram, Ln, T } from '../kit'

/** Packet radio: a digipeater on high ground relays between stations that cannot hear each other. */
export function PacketRadio_Network() {
  const station = (x: number, l: string) => (
    <g>
      <rect x={x} y={170} width={150} height={78} rx={12} fill={C.fill} stroke={C.signal} strokeWidth={2.5} />
      <T x={x + 75} y={192} anchor="middle" size={14} bold>{l}</T>
      <T x={x + 75} y={214} anchor="middle" size={12.5} color={C.muted}>computer + TNC</T>
      <T x={x + 75} y={232} anchor="middle" size={12.5} color={C.muted}>+ radio</T>
    </g>
  )
  return (
    <Diagram w={640} h={330}
      title="Two packet stations that cannot hear each other directly because of distance or terrain. A digipeater on high ground hears both and repeats each packet. The packet carries the call signs and the digipeater path. Below, connected mode uses acknowledgements and retries, while unconnected mode sends once with no acknowledgement."
      caption="VHF is line of sight, so a digipeater on high ground extends the reach of every station that can hear it.">
      {station(14, 'Station A')}
      {station(476, 'Station B')}
      <path d="M 285 60 L 320 6 L 355 60 Z" fill={C.fill2} stroke={C.muted} strokeWidth={2} />
      <rect x={250} y={62} width={140} height={58} rx={10} fill={C.resist} fillOpacity={0.16} stroke={C.resist} strokeWidth={2.5} />
      <T x={320} y={82} anchor="middle" size={14} bold>Digipeater</T>
      <T x={320} y={102} anchor="middle" size={12.5} color={C.muted}>on high ground</T>
      <Ln x1={110} y1={166} x2={262} y2={124} color={C.good} width={3} arrow />
      <Ln x1={378} y1={124} x2={530} y2={166} color={C.good} width={3} arrow />
      <Ln x1={168} y1={210} x2={470} y2={210} color={C.bad} width={2.2} dash="7 6" />
      <circle cx={320} cy={210} r={13} fill={C.bg} stroke={C.bad} strokeWidth={2.2} />
      <T x={320} y={210} anchor="middle" size={16} bold color={C.bad}>×</T>
      <T x={320} y={236} anchor="middle" size={12.5} color={C.bad}>direct path blocked</T>
      <T x={14} y={140} size={12.5} bold color={C.good}>path: via digipeater</T>
      <rect x={14} y={264} width={300} height={56} rx={10} fill={C.fill} stroke={C.current} strokeWidth={2} />
      <T x={26} y={282} size={13.5} bold color={C.current}>Connected</T>
      <T x={26} y={303} size={12.5}>Each frame acknowledged, resent if lost.</T>
      <rect x={326} y={264} width={300} height={56} rx={10} fill={C.fill} stroke={C.power} strokeWidth={2} />
      <T x={338} y={282} size={13.5} bold color={C.power}>Unconnected (UI)</T>
      <T x={338} y={303} size={12.5}>Sent once to anyone listening. No ACK.</T>
    </Diagram>
  )
}
