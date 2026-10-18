import { C, Diagram, Lines, Ln, T, Box } from '../kit'

const W = 118, GAP = 50, X0 = 4
const NODES = [
  { label: 'Companion', sub: 'you', color: C.current, note: ['Talks to a phone', 'or computer.', 'Never repeats.'] },
  { label: 'Repeater', sub: 'on a hill', color: C.resist, note: ['Forwards packets', 'toward the', 'destination.'] },
  { label: 'Repeater', sub: 'on a roof', color: C.resist, note: ['Forwards packets', 'toward the', 'destination.'] },
  { label: 'Companion', sub: 'a friend', color: C.current, note: ['Talks to a phone', 'or computer.', 'Never repeats.'] },
]

/** A message hops companion - repeater - repeater - companion; only the repeaters relay. */
export function WhatIsMeshcore_Chain() {
  return (
    <Diagram w={640} h={250}
      title="A MeshCore message crossing the mesh. A companion node on the left sends over LoRa to a repeater, which forwards it to a second repeater, which forwards it to the companion node on the right. Only the repeaters forward packets; companion nodes do not repeat."
      caption="Illustrative. Companions are the ends of the conversation; repeaters carry it between them.">
      <T x={320} y={34} anchor="middle" size={14} bold>One message, two repeaters in the middle</T>
      {NODES.map((n, i) => {
        const x = X0 + i * (W + GAP)
        return (
          <g key={i}>
            <Box x={x} y={64} w={W} h={64} label={n.label} sub={n.sub} color={n.color} size={14} />
            <Lines x={x + W / 2} y={158} lines={n.note} lh={17} size={12.5} color={C.muted} anchor="middle" />
          </g>
        )
      })}
      {NODES.slice(0, -1).map((_, i) => {
        const x1 = X0 + i * (W + GAP) + W + 4
        return (
          <g key={i}>
            <Ln x1={x1} y1={96} x2={x1 + GAP - 8} y2={96} color={C.muted} width={2} arrow />
            <T x={x1 + (GAP - 8) / 2} y={84} anchor="middle" size={12} color={C.muted}>LoRa</T>
          </g>
        )
      })}
    </Diagram>
  )
}
