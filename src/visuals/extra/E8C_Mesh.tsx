import { C, Diagram, Ln, T } from '../kit'

const N: { x: number; y: number; ip: string }[] = [
  { x: 90, y: 90, ip: '10.1.4.11' },
  { x: 250, y: 60, ip: '10.1.4.27' },
  { x: 420, y: 100, ip: '10.1.4.58' },
  { x: 560, y: 70, ip: '10.1.4.93' },
  { x: 170, y: 200, ip: '10.1.4.42' },
  { x: 340, y: 230, ip: '10.1.4.76' },
  { x: 520, y: 220, ip: '10.1.4.120' },
]
const L: [number, number][] = [[0, 1], [0, 4], [1, 2], [1, 4], [1, 5], [2, 3], [2, 5], [2, 6], [3, 6], [4, 5], [5, 6]]
const PATH = [0, 1, 2, 3]

/** A mesh: every node has an IP address and discovers neighbours to build links. */
export function Mesh() {
  const onPath = (a: number, b: number) => PATH.some((p, i) => i < PATH.length - 1 && ((p === a && PATH[i + 1] === b) || (p === b && PATH[i + 1] === a)))
  return (
    <Diagram w={640} h={296} title="A mesh network of seven nodes. Each node has an IP address, finds its neighbours with discovery and link establishment protocols, and traffic can hop across several nodes."
      caption="Nodes find each other, link up, and relay traffic by IP address.">
      {L.map(([a, b]) => {
        const p = onPath(a, b)
        return <Ln key={`${a}-${b}`} x1={N[a].x} y1={N[a].y} x2={N[b].x} y2={N[b].y} color={p ? C.signal : C.fill2} width={p ? 4 : 2.5} dash={p ? undefined : '6 5'} />
      })}
      {N.map((n, i) => (
        <g key={i}>
          <circle cx={n.x} cy={n.y} r={14} fill={C.fill} stroke={PATH.includes(i) ? C.signal : C.muted} strokeWidth={2.5} />
          <T x={n.x} y={n.y + 30} anchor="middle" size={12.5} mono bold>{n.ip}</T>
        </g>
      ))}
      <T x={14} y={280} size={12.5} color={C.muted}>dashed = link a node discovered</T>
      <T x={626} y={280} anchor="end" size={12.5} bold color={C.signal}>solid = path a message takes, hop by hop</T>
    </Diagram>
  )
}
