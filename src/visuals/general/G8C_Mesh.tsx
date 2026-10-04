import { useState } from 'react'
import { C, Choice, Controls, Diagram, Ln, T } from '../kit'

type Id = 'S' | 'A' | 'B' | 'C' | 'D' | 'T'
const P: Record<Id, [number, number]> = { S: [60, 120], A: [220, 60], B: [420, 60], C: [220, 180], D: [420, 180], T: [580, 120] }
const E: [Id, Id][] = [['S', 'A'], ['S', 'C'], ['A', 'B'], ['C', 'D'], ['A', 'C'], ['B', 'D'], ['B', 'T'], ['D', 'T']]

function route(failed: Id | null): Id[] | null {
  const adj = (n: Id) => E.filter(([a, b]) => a === n || b === n).map(([a, b]) => (a === n ? b : a)).filter((m) => m !== failed)
  const q: Id[][] = [['S']]
  const seen = new Set<Id>(['S'])
  while (q.length) {
    const p = q.shift()!
    const n = p[p.length - 1]
    if (n === 'T') return p
    for (const m of adj(n)) if (!seen.has(m)) { seen.add(m); q.push([...p, m]) }
  }
  return null
}

/** Mesh: if one node fails, a packet can still reach its target through another node. */
export function G8C_Mesh() {
  const [failed, setFailed] = useState<Id | null>(null)
  const path = route(failed)
  const onPath = (a: Id, b: Id) => !!path && path.some((n, i) => i < path.length - 1 && ((n === a && path[i + 1] === b) || (n === b && path[i + 1] === a)))
  return (
    <>
      <Diagram w={640} h={250} title={failed ? `Mesh network with node ${failed} failed. The packet still reaches the target by an alternate route through ${path?.slice(1, -1).join(' and ')}` : 'Mesh network: a packet travels from the source to the target through the nodes between them'}
        caption="Many nodes mean many routes: if one fails, the packet takes another.">
        {E.map(([a, b]) => {
          const dead = a === failed || b === failed
          const on = onPath(a, b)
          return <Ln key={a + b} x1={P[a][0]} y1={P[a][1]} x2={P[b][0]} y2={P[b][1]} color={dead ? C.fill2 : on ? C.signal : C.muted} width={on ? 6 : 2.5} dash={dead ? '4 6' : undefined} />
        })}
        {(Object.keys(P) as Id[]).map((n) => {
          const dead = n === failed
          const end = n === 'S' || n === 'T'
          const on = !!path && path.includes(n)
          const col = dead ? C.bad : on ? C.signal : C.muted
          return (
            <g key={n}>
              <circle cx={P[n][0]} cy={P[n][1]} r={end ? 30 : 24} fill={C.fill} stroke={col} strokeWidth={on || dead ? 4 : 2.5} />
              <T x={P[n][0]} y={P[n][1]} anchor="middle" size={end ? 14 : 16} bold color={dead ? C.bad : C.ink}>{dead ? '✗' : n === 'S' ? 'From' : n === 'T' ? 'To' : n}</T>
            </g>
          )
        })}
        <T x={320} y={236} anchor="middle" size={14} bold color={path ? C.good : C.bad}>{path ? (failed ? 'Alternate route found: packet still arrives' : 'Packet takes the shortest route') : 'No route left'}</T>
      </Diagram>
      <Controls>
        <Choice label="Failed node" value={failed ?? 'none'} onChange={(v) => setFailed(v === 'none' ? null : (v as Id))}
          options={[{ value: 'none', label: 'All working' }, { value: 'A', label: 'A fails' }, { value: 'B', label: 'B fails' }, { value: 'C', label: 'C fails' }, { value: 'D', label: 'D fails' }]} />
      </Controls>
    </>
  )
}
