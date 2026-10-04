import { Antenna, Box, C, Diagram, Ln, T } from '../kit'

/** The blocks of a repeater: duplexer, receiver, controller, transmitter, and the support gear. */
export function RepeatersAndControllers_Blocks() {
  const fns = ['Detects signal and tone', 'Keys the transmitter', 'Timeout timer', 'Station ID, courtesy tone', 'Links and remote control']
  return (
    <Diagram w={640} h={340} title="Inside a repeater: the antenna feeds a duplexer, whose receive side feeds the receiver; the receiver hands audio and a carrier-detect signal to the controller; the controller keys the transmitter and passes the audio on; the transmitter returns through the duplexer to the same antenna"
      caption="Receiver, controller and transmitter in a loop, sharing one antenna through the duplexer.">
      <Antenna x={64} y={48} />
      <T x={82} y={34} size={13} bold>Antenna</T>
      <Ln x1={64} y1={48} x2={64} y2={112} width={2.5} />
      <Box x={14} y={112} w={100} h={150} label="Duplexer" sub="cavity filters" color={C.power} size={14} />

      <Box x={200} y={40} w={130} h={56} label="Receiver" sub="input frequency" color={C.resist} size={14} />
      <Box x={200} y={278} w={130} h={56} label="Transmitter" sub="output frequency" color={C.signal} size={14} />

      <rect x={420} y={96} width={210} height={190} rx={12} fill={C.fill2} stroke={C.current} strokeWidth={2.5} />
      <T x={525} y={116} anchor="middle" bold size={15} color={C.current}>Controller</T>
      {fns.map((f, i) => (
        <T key={f} x={436} y={144 + i * 26} size={12.5}>{`• ${f}`}</T>
      ))}

      {/* duplexer receive side to receiver */}
      <Ln x1={116} y1={140} x2={160} y2={140} color={C.resist} width={2.5} />
      <Ln x1={160} y1={140} x2={160} y2={68} color={C.resist} width={2.5} />
      <Ln x1={160} y1={68} x2={198} y2={68} color={C.resist} width={2.5} arrow />
      {/* receiver to controller */}
      <Ln x1={332} y1={68} x2={375} y2={68} color={C.muted} width={2.5} />
      <Ln x1={375} y1={68} x2={375} y2={130} color={C.muted} width={2.5} />
      <Ln x1={375} y1={130} x2={418} y2={130} color={C.muted} width={2.5} arrow />
      <T x={338} y={52} size={12} color={C.muted}>audio + carrier</T>
      {/* controller to transmitter */}
      <Ln x1={418} y1={252} x2={375} y2={252} color={C.muted} width={2.5} />
      <Ln x1={375} y1={252} x2={375} y2={306} color={C.muted} width={2.5} />
      <Ln x1={375} y1={306} x2={332} y2={306} color={C.muted} width={2.5} arrow />
      <T x={338} y={324} size={12} color={C.muted}>audio + PTT</T>
      {/* transmitter back to duplexer */}
      <Ln x1={198} y1={306} x2={160} y2={306} color={C.signal} width={2.5} />
      <Ln x1={160} y1={306} x2={160} y2={234} color={C.signal} width={2.5} />
      <Ln x1={160} y1={234} x2={116} y2={234} color={C.signal} width={2.5} arrow />
      <T x={206} y={190} size={12} color={C.muted}>Receive and transmit run</T>
      <T x={206} y={208} size={12} color={C.muted}>at the same time, on two</T>
      <T x={206} y={226} size={12} color={C.muted}>frequencies.</T>
    </Diagram>
  )
}
