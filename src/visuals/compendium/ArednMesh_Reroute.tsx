import { useState } from 'react'
import { C, Choice, Controls, Diagram, Ln, T } from '../kit'

const NODES: { id: string; x: number; y: number; label: string }[] = [
  { id: 'S', x: 60, y: 118, label: 'Shelter' },
  { id: '1', x: 190, y: 52, label: '1' },
  { id: '2', x: 190, y: 188, label: '2' },
  { id: '3', x: 320, y: 118, label: '3' },
  { id: '4', x: 450, y: 52, label: '4' },
  { id: '5', x: 450, y: 188, label: '5' },
  { id: 'D', x: 580, y: 118, label: 'EOC' },
]
const EDGES: [string, string][] = [['S', '1'], ['S', '2'], ['1', '3'], ['2', '3'], ['1', '4'], ['2', '5'], ['3', '4'], ['3', '5'], ['4', 'D'], ['5', 'D']]
const SCENES: { key: string; label: string; down: string[] }[] = [
  { key: 'ok', label: 'All nodes up', down: [] },
  { key: 'n3', label: 'Node 3 fails', down: ['3'] },
  { key: 'n34', label: 'Nodes 3 and 4 fail', down: ['3', '4'] },
  { key: 'n12', label: 'Nodes 1 and 2 fail', down: ['1', '2'] },
]

function route(down: string[]): string[] | null {
  const adj = new Map<string, string[]>()
  for (const [a, b] of EDGES) {
    if (down.includes(a) || down.includes(b)) continue
    adj.set(a, [...(adj.get(a) ?? []), b])
    adj.set(b, [...(adj.get(b) ?? []), a])
  }
  const prev = new Map<string, string>([['S', '']])
  const q = ['S']
  while (q.length) {
    const n = q.shift()!
    if (n === 'D') break
    for (const m of adj.get(n) ?? []) if (!prev.has(m)) { prev.set(m, n); q.push(m) }
  }
  if (!prev.has('D')) return null
  const path: string[] = []
  for (let n = 'D'; n; n = prev.get(n)!) path.unshift(n)
  return path
}

/** A mesh finds another route when a node is lost, unless the failure cuts the network in two. */
export function ArednMesh_Reroute() {
  const [scene, setScene] = useState('ok')
  const sc = SCENES.find((s) => s.key === scene)!
  const path = route(sc.down)
  const pos = (id: string) => NODES.find((n) => n.id === id)!
  const onPath = (a: string, b: string) => !!path && path.some((n, i) => i < path.length - 1 && ((n === a && path[i + 1] === b) || (n === b && path[i + 1] === a)))
  return (
    <>
      <Diagram w={640} h={286}
        title={`Mesh routing. ${sc.label}. ${path ? `Traffic from the shelter to the emergency operations center takes ${path.length - 1} hops via ${path.join(', ')}.` : 'No route remains: the failed nodes cut the network in two.'}`}
        caption="Conceptual mesh. Every node relays for its neighbours, so a lost node usually just changes the route.">
        {EDGES.map(([a, b]) => {
          const A = pos(a), B = pos(b)
          const dead = sc.down.includes(a) || sc.down.includes(b)
          const used = onPath(a, b)
          return <Ln key={a + b} x1={A.x} y1={A.y} x2={B.x} y2={B.y} color={used ? C.good : C.muted} width={used ? 5 : 2} dash={dead ? '3 6' : undefined} opacity={dead ? 0.45 : used ? 1 : 0.7} />
        })}
        {NODES.map((n) => {
          const dead = sc.down.includes(n.id)
          const end = n.id === 'S' || n.id === 'D'
          const col = dead ? C.bad : end ? C.ink : C.signal
          return (
            <g key={n.id}>
              <circle cx={n.x} cy={n.y} r={end ? 20 : 17} fill={C.fill} stroke={col} strokeWidth={3} strokeDasharray={dead ? '4 3' : undefined} />
              {dead ? <T x={n.x} y={n.y} anchor="middle" size={18} bold color={C.bad}>×</T> : end ? null : <circle cx={n.x} cy={n.y} r={5} fill={C.signal} />}
              <T x={n.x} y={n.y + (end ? 36 : n.y > 130 ? 32 : -30)} anchor="middle" size={13} bold color={dead ? C.bad : C.ink}>{end ? n.label : `Node ${n.label}`}</T>
            </g>
          )
        })}
        <rect x={160} y={246} width={320} height={30} rx={8} fill={C.fill} stroke={path ? C.good : C.bad} strokeWidth={2} />
        <T x={320} y={261} anchor="middle" size={13.5} bold color={path ? C.good : C.bad}>{path ? `Route: ${path.length - 1} hops, data still gets through` : 'No route: the network is split'}</T>
      </Diagram>
      <Controls>
        <Choice label="Failure" value={scene} onChange={setScene} options={SCENES.map((s) => ({ value: s.key, label: s.label }))} />
      </Controls>
    </>
  )
}
