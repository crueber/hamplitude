import { C, Diagram, T, Wire } from '../kit'

/** N-channel MOSFET cross-section: the gate sits on a thin insulating layer, away from the channel. */
export function Mosfet() {
  return (
    <Diagram w={640} h={290} title="Cross-section of a MOSFET. The metal gate sits on a thin insulating layer of oxide above the channel between the source and drain, so no current flows into the gate."
      caption="MOSFET: the gate is insulated from the channel by a thin layer.">
      <rect x={90} y={170} width={460} height={80} fill={C.fill} stroke={C.ink} strokeWidth={2} />
      <T x={320} y={236} anchor="middle" size={13} color={C.muted}>silicon body</T>
      <rect x={120} y={170} width={110} height={44} fill={C.signal} fillOpacity={0.3} stroke={C.signal} strokeWidth={2} />
      <rect x={410} y={170} width={110} height={44} fill={C.signal} fillOpacity={0.3} stroke={C.signal} strokeWidth={2} />
      <rect x={230} y={170} width={180} height={12} fill={C.current} fillOpacity={0.35} />
      <rect x={230} y={150} width={180} height={20} fill={C.resist} fillOpacity={0.45} stroke={C.resist} strokeWidth={2} />
      <rect x={230} y={112} width={180} height={38} rx={4} fill={C.fill2} stroke={C.ink} strokeWidth={2} />
      <Wire pts={[[320, 112], [320, 70]]} color={C.ink} width={2.5} />
      <Wire pts={[[175, 170], [175, 130], [175, 70]]} color={C.ink} width={2.5} />
      <Wire pts={[[465, 170], [465, 70]]} color={C.ink} width={2.5} />
      <T x={175} y={54} anchor="middle" bold size={15}>Source</T>
      <T x={320} y={54} anchor="middle" bold size={15}>Gate</T>
      <T x={465} y={54} anchor="middle" bold size={15}>Drain</T>
      <T x={320} y={131} anchor="middle" size={13} bold>metal gate</T>
      <T x={320} y={160} anchor="middle" size={12} bold color={C.resist}>thin insulating layer</T>
      <T x={320} y={196} anchor="middle" size={12} bold color={C.current}>channel</T>
      <T x={175} y={192} anchor="middle" size={12} bold color={C.signal}>n</T>
      <T x={465} y={192} anchor="middle" size={12} bold color={C.signal}>n</T>
      <T x={320} y={276} anchor="middle" size={13} bold color={C.muted}>gate and channel are not electrically connected</T>
    </Diagram>
  )
}
