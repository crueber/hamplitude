import { C, Box, Diagram, Ln, T } from '../kit'

/** Power limits are PEP, measured at the transmitter output. */
export function G1C_PepPoint() {
  return (
    <Diagram w={640} h={170} title="The FCC power limit is peak envelope power measured at the transmitter output, before the feed line and antenna" caption="The rule counts transmitter output, not what reaches the antenna.">
      <Box x={6} y={50} w={150} h={64} label="Transmitter" color={C.signal} />
      <Ln x1={156} y1={82} x2={470} y2={82} color={C.ink} width={3} />
      <T x={313} y={102} anchor="middle" size={13} color={C.muted}>feed line (loses some power)</T>
      <Box x={470} y={50} w={160} h={64} label="Antenna" color={C.ink} />
      <rect x={156} y={36} width={30} height={92} rx={6} fill={C.power} fillOpacity={0.3} stroke={C.power} strokeWidth={2.5} />
      <T x={171} y={22} anchor="middle" size={14} bold color={C.power}>measure PEP here</T>
      <T x={320} y={146} anchor="middle" size={14} bold>PEP output from the transmitter</T>
    </Diagram>
  )
}
