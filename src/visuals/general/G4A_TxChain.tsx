import { Antenna, Box, C, Diagram, Ln, T } from '../kit'

/** Transceiver, amplifier and tuner with the three control lines the questions ask about. */
export function TxChain() {
  return (
    <Diagram w={640} h={284} title="Transmit chain: transceiver feeds an amplifier, then an antenna tuner, then the antenna. The amplifier sends ALC voltage back to the transceiver to limit drive. The transceiver's keying line tells the amplifier to switch its relay, and RF is delayed until that finishes."
      caption="ALC protects against too much drive; the key-line delay lets the relay finish switching.">
      <Box x={20} y={100} w={130} h={80} label="Transceiver" color={C.signal} />
      <Box x={230} y={100} w={130} h={80} label="Amplifier" sub="relay inside" color={C.power} />
      <Box x={440} y={100} w={90} h={80} label="Tuner" />
      <Ln x1={150} y1={140} x2={230} y2={140} color={C.ink} width={3.5} arrow />
      <Ln x1={360} y1={140} x2={440} y2={140} color={C.ink} width={3.5} arrow />
      <Ln x1={530} y1={140} x2={590} y2={140} color={C.ink} width={3.5} />
      <Ln x1={590} y1={140} x2={590} y2={170} color={C.ink} width={3.5} />
      <Antenna x={590} y={196} />
      <T x={590} y={230} anchor="middle" bold size={14}>Antenna</T>
      <T x={190} y={124} anchor="middle" size={12} color={C.muted}>RF</T>
      {/* ALC feedback */}
      <polyline points="260,100 260,52 85,52 85,98" fill="none" stroke={C.bad} strokeWidth={3} strokeLinejoin="round" markerEnd="url(#hx-arrow)" />
      <T x={172} y={34} anchor="middle" bold size={13} color={C.bad}>ALC: too much drive, back off</T>
      {/* key line */}
      <polyline points="85,182 85,224 260,224 260,184" fill="none" stroke={C.voltage} strokeWidth={3} strokeLinejoin="round" markerEnd="url(#hx-arrow)" />
      <T x={172} y={246} anchor="middle" bold size={13} color={C.voltage}>keying line: RF waits for the relay</T>
      <T x={485} y={72} anchor="middle" size={13} bold>Matches the antenna</T>
      <T x={485} y={90} anchor="middle" size={13} bold>to what the radio wants</T>
    </Diagram>
  )
}
