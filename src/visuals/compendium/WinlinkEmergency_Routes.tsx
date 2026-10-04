import { C, Diagram, Ln, T } from '../kit'

function N({ x, y, w, a, b, col }: { x: number; y: number; w: number; a: string; b: string; col: string }) {
  return (
    <g>
      <rect x={x} y={y} width={w} height={64} rx={12} fill={C.fill} stroke={col} strokeWidth={2.2} />
      <T x={x + w / 2} y={y + 24} anchor="middle" bold size={14}>{a}</T>
      <T x={x + w / 2} y={y + 46} anchor="middle" size={12.5} color={C.muted}>{b}</T>
    </g>
  )
}

/** Two Winlink routes: via a gateway to the internet, and peer-to-peer. */
export function WinlinkEmergency_Routes() {
  return (
    <Diagram w={640} h={330} title="Two ways a Winlink message can travel. Route one: your station connects by radio to a gateway, which passes the message on over the internet to the recipient's email. This needs the gateway to have a working internet connection. Route two: peer to peer, where your station connects by radio directly to another Winlink station, such as one at an emergency operations centre, with no gateway and no internet needed." caption="Gateway route needs the gateway's internet. Peer-to-peer needs only two stations in radio range.">
      <T x={14} y={20} size={14} bold color={C.resist}>Via a gateway</T>
      <N x={14} y={36} w={150} a="Your station" b="client + radio" col={C.signal} />
      <N x={245} y={36} w={150} a="Gateway" b="radio + internet link" col={C.resist} />
      <N x={476} y={36} w={150} a="Recipient" b="email address" col={C.current} />
      <Ln x1={166} y1={68} x2={243} y2={68} color={C.signal} width={3} arrow="both" />
      <T x={204} y={52} anchor="middle" size={12.5} bold color={C.signal}>radio</T>
      <Ln x1={397} y1={68} x2={474} y2={68} color={C.ink} width={3} arrow="both" />
      <T x={436} y={52} anchor="middle" size={12.5} bold>internet</T>
      <T x={320} y={118} anchor="middle" size={13} color={C.muted}>If the gateway loses its internet link, this route stops there.</T>

      <Ln x1={14} y1={144} x2={626} y2={144} color={C.muted} width={1.4} dash="4 4" />

      <T x={14} y={168} size={14} bold color={C.good}>Peer to peer</T>
      <N x={14} y={184} w={150} a="Your station" b="client + radio" col={C.signal} />
      <N x={245} y={184} w={150} a="Another station" b="e.g. at a shelter or EOC" col={C.good} />
      <Ln x1={166} y1={216} x2={243} y2={216} color={C.signal} width={3} arrow="both" />
      <T x={204} y={200} anchor="middle" size={12.5} bold color={C.signal}>radio</T>
      <rect x={430} y={186} width={196} height={60} rx={10} fill="none" stroke={C.muted} strokeWidth={1.6} strokeDasharray="5 4" />
      <T x={528} y={208} anchor="middle" size={13} color={C.muted}>no gateway,</T>
      <T x={528} y={228} anchor="middle" size={13} color={C.muted}>no internet</T>
      <T x={320} y={272} anchor="middle" size={13} color={C.muted}>Same software, same message forms. The message ends at that station,</T>
      <T x={320} y={294} anchor="middle" size={13} color={C.muted}>so it suits stations that can hear each other.</T>
    </Diagram>
  )
}
