import { Antenna, C, Diagram, Ln, T } from '../kit'

/** A repeater duplexer: cavity filters let one antenna share transmit and receive frequencies. */
export function Duplexer() {
  return (
    <Diagram w={640} h={250} title="A repeater duplexer. One antenna connects through two cavity filters: one passes only the transmit frequency from the transmitter, the other passes only the receive frequency to the receiver."
      caption="Cavity filters let one antenna share transmit and receive.">
      <Antenna x={110} y={130} />
      <T x={110} y={162} anchor="middle" size={13} bold>One antenna</T>
      <Ln x1={110} y1={130} x2={196} y2={64} color={C.ink} width={2.5} />
      <Ln x1={110} y1={130} x2={196} y2={180} color={C.ink} width={2.5} />
      <rect x={200} y={36} width={190} height={56} rx={10} fill={C.fill} stroke={C.power} strokeWidth={2.5} />
      <T x={295} y={56} anchor="middle" size={14} bold color={C.power}>Cavity filter</T>
      <T x={295} y={76} anchor="middle" size={12} color={C.muted}>passes transmit frequency</T>
      <rect x={200} y={152} width={190} height={56} rx={10} fill={C.fill} stroke={C.power} strokeWidth={2.5} />
      <T x={295} y={172} anchor="middle" size={14} bold color={C.power}>Cavity filter</T>
      <T x={295} y={192} anchor="middle" size={12} color={C.muted}>passes receive frequency</T>
      <Ln x1={430} y1={64} x2={394} y2={64} color={C.signal} width={2.5} arrow />
      <Ln x1={394} y1={180} x2={430} y2={180} color={C.signal} width={2.5} arrow />
      <rect x={434} y={36} width={170} height={56} rx={10} fill={C.fill} stroke={C.ink} strokeWidth={2} />
      <T x={519} y={64} anchor="middle" size={14} bold>Transmitter</T>
      <rect x={434} y={152} width={170} height={56} rx={10} fill={C.fill} stroke={C.ink} strokeWidth={2} />
      <T x={519} y={180} anchor="middle" size={14} bold>Receiver</T>
    </Diagram>
  )
}
