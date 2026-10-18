import { Box, C, Diagram, Ln, T } from '../kit'

/** Who relays in a MeshCore network: companions and room servers stay at the edges, repeaters carry the packets. */
export function MeshcoreNodeRoles_Topology() {
  return (
    <Diagram w={640} h={290}
      title="A MeshCore network with four kinds of device. A companion on the left and another on the right send and receive messages but never relay. Two repeaters in the middle forward packets between them. A room server below stores posts for later and is linked to a repeater."
      caption="Each role is a fixed job set by the firmware. Only repeaters carry packets across the network.">
      <T x={320} y={34} anchor="middle" size={15} bold>Only repeaters carry the packets</T>

      <Box x={16} y={110} w={120} h={64} label="Companion" sub="never relays" color={C.current} size={14} />
      <Box x={188} y={110} w={116} h={64} label="Repeater" sub="relays" color={C.signal} size={14} />
      <Box x={336} y={110} w={116} h={64} label="Repeater" sub="relays" color={C.signal} size={14} />
      <Box x={504} y={110} w={120} h={64} label="Companion" sub="never relays" color={C.current} size={14} />
      <Box x={252} y={214} w={136} h={58} label="Room server" sub="stores posts" color={C.power} size={14} />

      <Ln x1={140} y1={142} x2={184} y2={142} color={C.muted} width={2} arrow="both" />
      <Ln x1={308} y1={142} x2={332} y2={142} color={C.muted} width={2} arrow="both" />
      <Ln x1={456} y1={142} x2={500} y2={142} color={C.muted} width={2} arrow="both" />
      <Ln x1={262} y1={178} x2={290} y2={210} color={C.muted} width={2} arrow="both" />

      <T x={76} y={196} anchor="middle" size={12.5} color={C.muted}>phone or computer</T>
      <T x={564} y={196} anchor="middle" size={12.5} color={C.muted}>phone or computer</T>
    </Diagram>
  )
}
