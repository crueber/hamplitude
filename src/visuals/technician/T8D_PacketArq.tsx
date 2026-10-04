import { C, Diagram, Ln, T } from '../kit'

/** Packet anatomy and ARQ: the receiver detects an error and asks for a resend. */
export function PacketArq() {
  const parts = [
    { x: 20, w: 190, label: 'Header', sub: 'to / from call signs', col: C.current },
    { x: 214, w: 210, label: 'Data', sub: 'the message', col: C.signal },
    { x: 428, w: 192, label: 'Checksum', sub: 'detects errors', col: C.resist },
  ]
  const L = 130, R = 510
  return (
    <Diagram w={640} h={360} title="A packet has a header with call signs, the data, and a checksum for error detection. With ARQ, the receiver finds a checksum failure and asks the sender to retransmit" caption="Checksum detects the error. ARQ asks for the resend.">
      <T x={20} y={20} size={14} bold color={C.muted}>A packet</T>
      {parts.map((p) => (
        <g key={p.label}>
          <rect x={p.x} y={34} width={p.w} height={58} rx={8} fill={p.col} fillOpacity={0.2} stroke={p.col} strokeWidth={2.5} />
          <T x={p.x + p.w / 2} y={55} anchor="middle" size={16} bold color={p.col}>{p.label}</T>
          <T x={p.x + p.w / 2} y={77} anchor="middle" size={13} color={C.muted}>{p.sub}</T>
        </g>
      ))}
      <T x={20} y={126} size={14} bold color={C.muted}>ARQ: automatic repeat request</T>
      <T x={L} y={156} anchor="middle" size={15} bold>Sender</T>
      <T x={R} y={156} anchor="middle" size={15} bold>Receiver</T>
      <Ln x1={L} y1={170} x2={L} y2={350} color={C.fill2} width={3} />
      <Ln x1={R} y1={170} x2={R} y2={350} color={C.fill2} width={3} />
      <Ln x1={L + 6} y1={196} x2={R - 6} y2={216} color={C.signal} width={2.5} arrow />
      <T x={320} y={192} anchor="middle" size={13} bold color={C.signal}>packet</T>
      <T x={R + 12} y={226} size={13} bold color={C.bad}>checksum fails ✗</T>
      <Ln x1={R - 6} y1={252} x2={L + 6} y2={272} color={C.resist} width={2.5} arrow />
      <T x={320} y={248} anchor="middle" size={13} bold color={C.resist}>please resend</T>
      <Ln x1={L + 6} y1={292} x2={R - 6} y2={312} color={C.signal} width={2.5} arrow />
      <T x={320} y={288} anchor="middle" size={13} bold color={C.signal}>packet again</T>
      <T x={R + 12} y={322} size={13} bold color={C.good}>checksum OK ✓</T>
    </Diagram>
  )
}
