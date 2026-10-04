import { C, Diagram, Ln, T } from '../kit'

/** The FM capture effect: when two signals share a channel, an FM receiver locks onto the stronger one; AM/SSB receivers pass both. */
export function FmVoice_Capture() {
  const bar = (x: number, y: number, w: number, color: string, op = 1) => (
    <rect x={x} y={y} width={w} height={16} rx={8} fill={color} fillOpacity={op} />
  )
  return (
    <Diagram w={640} h={290}
      title="Capture effect: with two stations on the same channel, an FM receiver reproduces only the stronger one, while an AM or SSB receiver lets you hear both mixed together"
      caption="Illustrative. In FM, a signal only a few dB stronger wins outright; the weaker one disappears rather than fading under it.">
      <T x={14} y={22} size={15} bold>Two stations, same channel</T>
      <T x={14} y={66} size={13} bold color={C.signal}>Station A</T>
      <T x={14} y={84} size={12} color={C.muted}>strong signal</T>
      {bar(14, 98, 220, C.signal)}
      <T x={14} y={146} size={13} bold color={C.resist}>Station B</T>
      <T x={14} y={164} size={12} color={C.muted}>weak signal</T>
      {bar(14, 178, 90, C.resist)}
      <T x={14} y={226} size={12} color={C.muted}>length = signal strength at the receiver</T>

      <Ln x1={250} y1={140} x2={298} y2={140} color={C.muted} width={2.5} arrow />

      <rect x={306} y={14} width={320} height={122} rx={12} fill={C.fill} stroke={C.signal} strokeWidth={2} />
      <T x={322} y={36} size={15} bold color={C.signal}>FM receiver</T>
      <T x={322} y={60} size={13}>You hear: Station A only</T>
      {bar(322, 78, 150, C.signal)}
      {bar(322, 100, 60, C.resist, 0.2)}
      <T x={392} y={108} size={12} color={C.muted}>B suppressed</T>

      <rect x={306} y={150} width={320} height={122} rx={12} fill={C.fill} stroke={C.resist} strokeWidth={2} />
      <T x={322} y={172} size={15} bold color={C.resist}>AM or SSB receiver</T>
      <T x={322} y={196} size={13}>You hear: both, mixed together</T>
      {bar(322, 214, 150, C.signal)}
      {bar(322, 236, 60, C.resist)}
      <T x={392} y={244} size={12} color={C.muted}>B still audible</T>
    </Diagram>
  )
}
