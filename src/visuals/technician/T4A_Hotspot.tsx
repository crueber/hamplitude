import { Box, C, Diagram, Ln, T } from '../kit'

/** A digital-mode hotspot links your handheld to an internet-based digital voice or data network. */
export function Hotspot() {
  return (
    <Diagram w={640} h={150} title="A hotspot connects a nearby transceiver by radio on one side and to a digital voice or data network over the internet on the other"
      caption="Hotspot = a small personal gateway to the network.">
      <Box x={20} y={40} w={150} h={70} label="Your radio" color={C.signal} />
      <Box x={245} y={40} w={150} h={70} label="Hotspot" color={C.power} />
      <Box x={470} y={40} w={150} h={70} label="Digital network" color={C.ink} />
      <Ln x1={172} y1={75} x2={243} y2={75} color={C.signal} width={3} arrow="both" />
      <Ln x1={397} y1={75} x2={468} y2={75} color={C.ink} width={3} arrow="both" />
      <T x={207} y={30} anchor="middle" size={13} color={C.muted}>radio</T>
      <T x={432} y={30} anchor="middle" size={13} color={C.muted}>internet</T>
    </Diagram>
  )
}
