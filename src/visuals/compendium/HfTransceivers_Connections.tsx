import { Box, C, Diagram, Ln, T } from '../kit'

/** What plugs into the back and front of a typical HF base-station transceiver. */
export function HfTransceivers_Connections() {
  return (
    <Diagram w={640} h={330} title="An HF transceiver at the centre of a station: antenna through a tuner, a 13.8 volt power supply, microphone or key and headphones, a computer for control and digital modes, an optional amplifier, and a station ground"
      caption="The usual connections around an HF rig. Most are optional except power, antenna and a way to key or talk.">
      <Box x={225} y={10} w={130} h={46} label="Antenna tuner" sub="built in or external" color={C.power} size={13} />
      <Box x={440} y={10} w={140} h={46} label="Antenna" sub="via coax" color={C.signal} size={13} />
      <Ln x1={357} y1={33} x2={438} y2={33} color={C.signal} width={2.5} arrow="both" />
      <Ln x1={290} y1={116} x2={290} y2={58} color={C.signal} width={2.5} arrow="both" />

      <rect x={235} y={116} width={170} height={100} rx={12} fill={C.fill2} stroke={C.ink} strokeWidth={2.5} />
      <T x={320} y={150} anchor="middle" bold size={16}>HF transceiver</T>
      <T x={320} y={176} anchor="middle" size={13} color={C.muted}>typically 100 W output</T>
      <T x={320} y={196} anchor="middle" size={13} color={C.muted}>160 m to 10 m</T>

      <Box x={10} y={110} w={170} h={46} label="13.8 V DC supply" sub="typically 20 A or more" color={C.voltage} size={13} />
      <Ln x1={182} y1={133} x2={233} y2={133} color={C.voltage} width={2.5} arrow />
      <Box x={10} y={172} w={170} h={46} label="Mic, key, headphones" sub="audio and keying" color={C.resist} size={13} />
      <Ln x1={182} y1={195} x2={233} y2={195} color={C.resist} width={2.5} arrow="both" />

      <Box x={460} y={110} w={170} h={46} label="Computer" sub="CAT control + audio (USB)" color={C.current} size={13} />
      <Ln x1={407} y1={133} x2={458} y2={133} color={C.current} width={2.5} arrow="both" />
      <Box x={460} y={172} w={170} h={46} label="Linear amplifier" sub="optional; sits in the RF line" color={C.power} size={13} />
      <Ln x1={407} y1={195} x2={458} y2={195} color={C.power} width={2.5} arrow="both" />

      <Box x={235} y={262} w={170} h={46} label="Station ground" sub="bonding and safety" color={C.muted} size={13} dash="5 4" />
      <Ln x1={320} y1={218} x2={320} y2={260} color={C.muted} width={2.5} dash="5 4" />
    </Diagram>
  )
}
