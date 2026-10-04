import { C, Diagram, Ln, T } from '../kit'

/** APRS: a position beacon travels over RF by digipeaters, and an iGate puts it on the internet map. */
export function Aprs_Network() {
  const box = (x: number, w: number, a: string, b: string, col: string) => (
    <g>
      <rect x={x} y={64} width={w} height={74} rx={12} fill={col} fillOpacity={0.15} stroke={col} strokeWidth={2.4} />
      <T x={x + w / 2} y={88} anchor="middle" size={14.5} bold>{a}</T>
      <T x={x + w / 2} y={112} anchor="middle" size={12.5} color={C.muted}>{b}</T>
    </g>
  )
  return (
    <Diagram w={640} h={342}
      title="How an APRS position report travels. A tracker with GPS beacons on 144.390 megahertz in North America. A digipeater repeats it. An iGate station, with a radio and an internet connection, forwards it to the APRS internet system, which feeds web maps. Messages can come back the other way."
      caption="Radio on the left, internet on the right. The iGate is the bridge.">
      <T x={14} y={26} size={13} bold color={C.signal}>Radio: 144.390 MHz FM in North America, 1200 baud packets</T>
      <T x={470} y={46} size={13} bold color={C.current}>Internet</T>
      {box(10, 120, 'Tracker', 'GPS + radio', C.good)}
      {box(176, 120, 'Digipeater', 'repeats it', C.resist)}
      {box(342, 120, 'iGate', 'radio + internet', C.power)}
      {box(498, 132, 'APRS-IS', 'internet servers', C.current)}
      <Ln x1={132} y1={101} x2={174} y2={101} color={C.signal} width={3} arrow />
      <Ln x1={298} y1={101} x2={340} y2={101} color={C.signal} width={3} arrow />
      <Ln x1={464} y1={101} x2={496} y2={101} color={C.ink} width={3} arrow />
      <Ln x1={564} y1={140} x2={564} y2={172} color={C.ink} width={3} arrow />
      <rect x={498} y={174} width={132} height={44} rx={10} fill={C.fill} stroke={C.current} strokeWidth={2} />
      <T x={564} y={196} anchor="middle" size={13.5} bold>Web map</T>
      <T x={14} y={172} size={13} bold color={C.muted}>One position report carries:</T>
      {['position and symbol', 'speed and course', 'a short comment', 'optional weather or status'].map((l, i) => (
        <T key={l} x={22} y={196 + i * 20} size={13}>{'•  ' + l}</T>
      ))}
      <Ln x1={380} y1={140} x2={380} y2={170} color={C.muted} width={2} arrow dash="6 4" />
      <T x={390} y={184} size={12.5} color={C.muted}>messages can</T>
      <T x={390} y={202} size={12.5} color={C.muted}>go back out</T>
      <T x={390} y={220} size={12.5} color={C.muted}>over radio</T>
      <rect x={14} y={286} width={616} height={44} rx={10} fill={C.fill} stroke={C.fill2} strokeWidth={1.6} />
      <T x={26} y={308} size={13}>A beacon is sent once and never acknowledged; repeats make it likely to be heard.</T>
    </Diagram>
  )
}
