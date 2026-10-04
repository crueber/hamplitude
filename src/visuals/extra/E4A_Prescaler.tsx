import { C, Diagram, Ln, T } from '../kit'

/** A prescaler divides a too-fast signal down to something the counter can count. */
export function Prescaler() {
  return (
    <Diagram w={640} h={170} title="A prescaler divides a high input frequency, for example 145 megahertz by 10 to 14.5 megahertz, so a counter with a lower operating range can count it. The display multiplies the result back."
      caption="The prescaler reduces the signal frequency to within the counter's operating range.">
      <rect x={14} y={36} width={130} height={64} rx={10} fill={C.fill} stroke={C.signal} strokeWidth={2} />
      <T x={79} y={56} anchor="middle" bold size={14}>Signal</T>
      <T x={79} y={80} anchor="middle" size={14} bold mono color={C.signal}>145 MHz</T>
      <rect x={220} y={30} width={140} height={76} rx={10} fill={C.fill} stroke={C.power} strokeWidth={2.5} />
      <T x={290} y={56} anchor="middle" bold size={15} color={C.power}>Prescaler</T>
      <T x={290} y={82} anchor="middle" size={14} mono color={C.power} bold>÷ 10</T>
      <rect x={436} y={36} width={190} height={64} rx={10} fill={C.fill} stroke={C.ink} strokeWidth={2} />
      <T x={531} y={56} anchor="middle" bold size={14}>Frequency counter</T>
      <T x={531} y={80} anchor="middle" size={13} color={C.muted}>counts 14.5 MHz</T>
      <Ln x1={146} y1={68} x2={218} y2={68} color={C.signal} width={2.5} arrow />
      <Ln x1={362} y1={68} x2={434} y2={68} color={C.signal} width={2.5} arrow />
      <T x={182} y={52} anchor="middle" size={12} color={C.muted}>too fast</T>
      <T x={398} y={52} anchor="middle" size={12} color={C.muted}>in range</T>
      <T x={320} y={140} anchor="middle" size={14} bold>14.5 MHz × 10 = <tspan fill={C.signal}>145 MHz</tspan> on the display</T>
    </Diagram>
  )
}
