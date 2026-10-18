import { C, Diagram, Ln, Box, T } from '../kit'

const NODES = [150, 270, 390, 510]
const LIMITS = ['3', '2', '1']

/** Phone, four radio nodes and a second phone: a message hops across the mesh and its hop limit drops at each relay. */
export function WhatIsMeshtastic_Hops() {
  return (
    <Diagram w={640} h={250}
      title="A message crossing a mesh. A phone hands the message to its nearby node over Bluetooth, Wi-Fi, Ethernet or serial. The node broadcasts it by LoRa radio. Two nodes in between each rebroadcast it, and the hop limit carried in the packet goes down by one at every relay: 3, then 2, then 1. The last node passes it to the second phone."
      caption="Illustrative hop limits. Every relay lowers the hop limit by one, and a node that receives it at zero does not rebroadcast it.">
      <Box x={8} y={95} w={64} h={60} label="Phone" color={C.current} size={14} />
      <Ln x1={72} y1={125} x2={128} y2={125} color={C.current} width={2} dash="4 5" />
      {NODES.map((cx, i) => (
        <g key={cx}>
          <circle cx={cx} cy={125} r={22} fill={C.fill} stroke={C.signal} strokeWidth={2.5} />
          <T x={cx} y={125} size={13} bold anchor="middle">{i === 0 ? 'A' : i === 3 ? 'D' : i === 1 ? 'B' : 'C'}</T>
          <T x={cx} y={168} size={12.5} color={C.muted} anchor="middle">{i === 0 ? 'Your node' : i === 3 ? 'Their node' : 'Relay'}</T>
        </g>
      ))}
      {LIMITS.map((l, i) => (
        <g key={l}>
          <Ln x1={NODES[i] + 26} y1={125} x2={NODES[i + 1] - 26} y2={125} color={C.signal} width={2.5} arrow />
          <T x={(NODES[i] + NODES[i + 1]) / 2} y={104} size={12} color={C.muted} anchor="middle">limit {l}</T>
        </g>
      ))}
      <Ln x1={532} y1={125} x2={568} y2={125} color={C.current} width={2} dash="4 5" />
      <Box x={568} y={95} w={64} h={60} label="Phone" color={C.current} size={14} />

      <Ln x1={20} y1={216} x2={52} y2={216} color={C.current} width={2} dash="4 5" />
      <T x={60} y={216} size={12.5} color={C.muted}>Bluetooth, Wi-Fi, Ethernet or serial</T>
      <Ln x1={330} y1={216} x2={362} y2={216} color={C.signal} width={2.5} arrow />
      <T x={370} y={216} size={12.5} color={C.muted}>LoRa radio hop</T>
    </Diagram>
  )
}
