import { C, Diagram, T } from '../kit'

type Node = { id: string; x: number; y: number }
const R = 100 // two nodes can hear each other when they are within this distance (illustrative)
const NODES: Node[] = [
  { id: 'A', x: 40, y: 130 },
  { id: 'B', x: 115, y: 70 },
  { id: 'C', x: 190, y: 125 },
  { id: 'D', x: 115, y: 195 },
  { id: 'F', x: 215, y: 195 },
  { id: 'E', x: 255, y: 105 },
]

const near = (a: Node, b: Node) => Math.hypot(a.x - b.x, a.y - b.y) <= R

/** One panel: nodes joined by radio links, with one multi-hop route highlighted. `gone` is a node that has left. */
function Panel({ ox, title, gone, route }: { ox: number; title: string; gone?: string; route: string[] }) {
  const nodes = NODES.filter((n) => n.id !== gone)
  const links: [Node, Node][] = []
  nodes.forEach((a, i) => nodes.slice(i + 1).forEach((b) => { if (near(a, b)) links.push([a, b]) }))
  const onRoute = (a: Node, b: Node) => route.some((id, i) => i < route.length - 1 && ((id === a.id && route[i + 1] === b.id) || (id === b.id && route[i + 1] === a.id)))
  const ghost = NODES.find((n) => n.id === gone)
  return (
    <g transform={`translate(${ox} 0)`}>
      <T x={150} y={26} anchor="middle" size={14} bold>{title}</T>
      {links.map(([a, b]) => (
        <line key={a.id + b.id} x1={a.x} y1={a.y} x2={b.x} y2={b.y}
          stroke={onRoute(a, b) ? C.signal : C.muted} strokeWidth={onRoute(a, b) ? 4 : 1.5} strokeOpacity={onRoute(a, b) ? 1 : 0.5} />
      ))}
      {ghost && (
        <g>
          <circle cx={ghost.x} cy={ghost.y} r={15} fill="none" stroke={C.muted} strokeWidth={2} strokeDasharray="4 4" />
          <T x={ghost.x} y={ghost.y + 34} anchor="middle" size={12} color={C.muted}>{ghost.id} has left</T>
        </g>
      )}
      {nodes.map((n) => {
        const end = n.id === route[0] || n.id === route[route.length - 1]
        const on = route.includes(n.id)
        return (
          <g key={n.id}>
            <circle cx={n.x} cy={n.y} r={15} fill={C.bg} stroke={end ? C.resist : on ? C.signal : C.muted} strokeWidth={on ? 3 : 2} />
            <T x={n.x} y={n.y} anchor="middle" size={13} bold>{n.id}</T>
          </g>
        )
      })}
    </g>
  )
}

/** A message from A to E has no direct link, so it hops through other nodes; when a relay leaves, another route is found. */
export function WhatIsAManet_Hops() {
  return (
    <Diagram w={640} h={270}
      title="Two snapshots of a small wireless network. In the first, node A cannot reach node E directly, so its message hops through nodes B and C to E. In the second, node C has left, and the message instead hops through nodes D and F. Thin lines show which nodes can hear each other."
      caption="Illustrative layout. Thin lines are radio links; the thick line is the route one message takes.">
      <Panel ox={10} title="Now: A to E in three hops" route={['A', 'B', 'C', 'E']} />
      <Panel ox={330} title="A moment later: C has left" gone="C" route={['A', 'D', 'F', 'E']} />
      <line x1={320} y1={44} x2={320} y2={250} stroke={C.muted} strokeOpacity={0.3} strokeDasharray="3 5" />
    </Diagram>
  )
}
