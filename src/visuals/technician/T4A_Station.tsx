import { Antenna, Box, C, Diagram, Ln, T } from '../kit'

/** Basic station block diagram: the RF power / SWR meter sits in the feed line. */
export function Station() {
  return (
    <Diagram w={640} h={290} title="Station block diagram: power supply and microphone connect to the transceiver; the RF power or SWR meter sits in the feed line between the transceiver and the antenna"
      caption="Meters go in the feed line, not on the power cable.">
      <Box x={40} y={100} w={140} h={90} label="Transceiver" color={C.signal} />
      <Box x={40} y={14} w={140} h={50} label="Microphone" />
      <Box x={40} y={226} w={140} h={50} label="Power supply" sub="13.8 V DC" color={C.voltage} />
      <Ln x1={110} y1={64} x2={110} y2={100} color={C.signal} width={3} arrow />
      <Ln x1={110} y1={226} x2={110} y2={190} color={C.voltage} width={3} arrow />
      <T x={124} y={82} size={13} color={C.muted}>audio</T>
      <T x={124} y={208} size={13} color={C.muted}>power</T>
      <Ln x1={180} y1={145} x2={270} y2={145} color={C.ink} width={3.5} />
      <Box x={270} y={105} w={190} h={80} label="RF power / SWR meter" sub="in the feed line" color={C.power} size={14} />
      <Ln x1={460} y1={145} x2={590} y2={145} color={C.ink} width={3.5} />
      <Ln x1={590} y1={145} x2={590} y2={178} color={C.ink} width={3.5} />
      <Antenna x={590} y={204} />
      <T x={225} y={128} anchor="middle" size={13} color={C.muted}>coax</T>
      <T x={525} y={128} anchor="middle" size={13} color={C.muted}>coax</T>
      <T x={590} y={238} anchor="middle" bold size={14}>Antenna</T>
      <T x={365} y={222} anchor="middle" size={13} color={C.muted}>choose for your</T>
      <T x={365} y={240} anchor="middle" size={13} bold color={C.power}>frequency and power</T>
    </Diagram>
  )
}
