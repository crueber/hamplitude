import { C, Diagram, Ln, T } from '../kit'

/** Packet frame, then two ways to handle errors: ARQ asks again (and gives up), FEC fixes it alone. */
export function G8C_ErrorFix() {
  const parts = [
    { x: 20, w: 190, label: 'Header', sub: 'routing and handling info', col: C.current },
    { x: 214, w: 210, label: 'Data', sub: 'the message', col: C.signal },
    { x: 428, w: 192, label: 'Trailer', sub: 'end of frame, error check', col: C.resist },
  ]
  const L = 60, R = 250
  return (
    <Diagram w={640} h={420} title="A packet frame has a header with routing and handling information, the data, and a trailer. With ARQ the receiver answers NAK to request a retransmission, and too many failed attempts drops the connection. With forward error correction the sender includes redundant information so the receiver fixes errors itself"
      caption="ARQ: ask again, then give up. FEC: send extra so the receiver can repair it alone.">
      {parts.map((p) => (
        <g key={p.label}>
          <rect x={p.x} y={14} width={p.w} height={54} rx={8} fill={p.col} fillOpacity={0.2} stroke={p.col} strokeWidth={2.5} />
          <T x={p.x + p.w / 2} y={33} anchor="middle" size={15} bold color={p.col}>{p.label}</T>
          <T x={p.x + p.w / 2} y={54} anchor="middle" size={12} color={C.muted}>{p.sub}</T>
        </g>
      ))}
      <T x={20} y={96} size={15} bold color={C.resist}>ARQ: ask for a resend</T>
      <T x={L} y={124} anchor="middle" size={14} bold>Sender</T>
      <T x={R} y={124} anchor="middle" size={14} bold>Receiver</T>
      <Ln x1={L} y1={136} x2={L} y2={404} color={C.fill2} width={3} />
      <Ln x1={R} y1={136} x2={R} y2={404} color={C.fill2} width={3} />
      <Ln x1={L + 6} y1={156} x2={R - 6} y2={172} color={C.signal} width={2.5} arrow />
      <T x={156} y={150} anchor="middle" size={12.5} bold color={C.signal}>packet</T>
      <Ln x1={R - 6} y1={198} x2={L + 6} y2={214} color={C.bad} width={2.5} arrow />
      <T x={156} y={192} anchor="middle" size={12.5} bold color={C.bad}>NAK: send it again</T>
      <Ln x1={L + 6} y1={240} x2={R - 6} y2={256} color={C.signal} width={2.5} arrow />
      <T x={156} y={234} anchor="middle" size={12.5} bold color={C.signal}>packet again</T>
      <Ln x1={R - 6} y1={282} x2={L + 6} y2={298} color={C.bad} width={2.5} arrow />
      <T x={156} y={276} anchor="middle" size={12.5} bold color={C.bad}>NAK again …</T>
      <T x={156} y={330} anchor="middle" size={12.5} color={C.muted}>… too many attempts</T>
      <rect x={20} y={352} width={260} height={40} rx={8} fill={C.bad} fillOpacity={0.15} stroke={C.bad} strokeWidth={2.5} />
      <T x={150} y={372} anchor="middle" size={14} bold color={C.bad}>connection dropped</T>
      <Ln x1={320} y1={96} x2={320} y2={410} color={C.fill2} width={2} dash="4 6" />
      <T x={340} y={96} size={15} bold color={C.good}>FEC: fix it at the receiver</T>
      <rect x={340} y={124} width={130} height={52} rx={8} fill={C.signal} fillOpacity={0.2} stroke={C.signal} strokeWidth={2.5} />
      <T x={405} y={150} anchor="middle" size={14} bold color={C.signal}>data</T>
      <T x={480} y={150} anchor="middle" size={20} bold>+</T>
      <rect x={494} y={124} width={126} height={52} rx={8} fill={C.good} fillOpacity={0.2} stroke={C.good} strokeWidth={2.5} />
      <T x={557} y={143} anchor="middle" size={13} bold color={C.good}>redundant</T>
      <T x={557} y={161} anchor="middle" size={13} bold color={C.good}>information</T>
      <Ln x1={480} y1={184} x2={480} y2={222} color={C.ink} width={2.5} arrow />
      <rect x={340} y={228} width={280} height={52} rx={8} fill={C.fill} stroke={C.ink} strokeWidth={2} />
      <T x={480} y={246} anchor="middle" size={14} bold>Receiver spots errors</T>
      <T x={480} y={265} anchor="middle" size={13} color={C.muted}>and corrects them itself</T>
      <T x={480} y={312} anchor="middle" size={13} bold color={C.good}>no reply needed</T>
      <T x={480} y={334} anchor="middle" size={13} color={C.muted}>costs extra bits on every message</T>
    </Diagram>
  )
}
