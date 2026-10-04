import { C, Diagram, T } from '../kit'

/** Where a band's voice segment is shared with Amateur Extra, the General class gets the top of it. */
export function G1A_VoiceTop() {
  return (
    <Diagram w={640} h={150} title="Within a voice segment that General class cannot use entirely, the lower frequency part is Amateur Extra only and the upper frequency part is available to General" caption="Schematic, not to scale.">
      <T x={6} y={14} size={13} color={C.muted}>lower frequency</T>
      <T x={634} y={14} size={13} color={C.muted} anchor="end">higher frequency</T>
      <rect x={6} y={32} width={240} height={60} rx={8} fill={C.bad} fillOpacity={0.2} stroke={C.bad} strokeWidth={2} />
      <T x={126} y={54} anchor="middle" bold size={15}>Extra only</T>
      <T x={126} y={74} anchor="middle" size={13} color={C.muted}>bottom of the voice segment</T>
      <rect x={246} y={32} width={388} height={60} rx={8} fill={C.good} fillOpacity={0.2} stroke={C.good} strokeWidth={2} />
      <T x={440} y={54} anchor="middle" bold size={15}>General can use</T>
      <T x={440} y={74} anchor="middle" size={13} color={C.muted}>the upper portion</T>
      <T x={320} y={122} anchor="middle" size={14} bold>The same on every band: upper part, never the lower</T>
    </Diagram>
  )
}
