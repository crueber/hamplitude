import { C, Diagram, Ln, T } from '../kit'

/** A multiplier stage multiplies frequency AND deviation. 12.21 MHz x 12 = 146.52 MHz, so 5 kHz / 12 = 416.7 Hz at the oscillator. */
export function G8B_Multiplier() {
  const sw = (cx: number, y: number, px: number, col: string) => (
    <g>
      <Ln x1={cx - px} y1={y} x2={cx + px} y2={y} color={col} width={8} />
      <Ln x1={cx} y1={y - 12} x2={cx} y2={y + 12} color={C.ink} width={2} />
    </g>
  )
  return (
    <Diagram w={640} h={250} title="A reactance modulated oscillator at 12.21 megahertz swings 416.7 hertz. A times-12 multiplier makes 146.52 megahertz and multiplies the swing to 5 kilohertz"
      caption="The multiplier scales the frequency and the deviation by the same number.">
      <rect x={14} y={30} width={170} height={74} rx={10} fill={C.fill} stroke={C.resist} strokeWidth={2} />
      <T x={99} y={52} anchor="middle" size={14} bold>Modulated oscillator</T>
      <T x={99} y={76} anchor="middle" size={13} bold mono color={C.resist}>12.21 MHz</T>
      <T x={99} y={94} anchor="middle" size={12} mono color={C.muted}>±416.7 Hz</T>
      <Ln x1={186} y1={67} x2={236} y2={67} color={C.signal} width={2.5} arrow />
      <rect x={240} y={30} width={160} height={74} rx={10} fill={C.fill} stroke={C.power} strokeWidth={2.5} />
      <T x={320} y={52} anchor="middle" size={14} bold>Multiplier</T>
      <T x={320} y={82} anchor="middle" size={22} bold color={C.power}>× 12</T>
      <Ln x1={402} y1={67} x2={452} y2={67} color={C.signal} width={2.5} arrow />
      <rect x={456} y={30} width={170} height={74} rx={10} fill={C.fill} stroke={C.signal} strokeWidth={2} />
      <T x={541} y={52} anchor="middle" size={14} bold>Transmit frequency</T>
      <T x={541} y={76} anchor="middle" size={13} bold mono color={C.signal}>146.52 MHz</T>
      <T x={541} y={94} anchor="middle" size={12} mono color={C.muted}>±5 kHz</T>
      <T x={14} y={140} size={13} bold color={C.muted}>Frequency swing (deviation), drawn to scale</T>
      {sw(99, 176, 416.7 / 5000 * 72, C.resist)}
      {sw(541, 176, 72, C.signal)}
      <T x={99} y={206} anchor="middle" size={12.5} color={C.resist} bold>416.7 Hz</T>
      <T x={541} y={206} anchor="middle" size={12.5} color={C.signal} bold>5 kHz</T>
      <T x={320} y={176} anchor="middle" size={13} color={C.muted}>12× bigger</T>
      <T x={320} y={232} anchor="middle" size={13} bold>146.52 ÷ 12.21 = 12   →   5 kHz ÷ 12 = 416.7 Hz</T>
    </Diagram>
  )
}
