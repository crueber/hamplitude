import { useState } from 'react'
import { C, Choice, Controls, Diagram, Ln, T } from '../kit'

const N: Record<string, [number, number]> = { A: [90, 150], B: [250, 80], C: [250, 220], D: [410, 150], E: [550, 150] }
const E: [string, string][] = [['A', 'B'], ['A', 'C'], ['B', 'D'], ['C', 'D'], ['B', 'C'], ['D', 'E']]

function route(down: string | null) {
  const adj: Record<string, string[]> = {}
  for (const [a, b] of E) if (a !== down && b !== down) { (adj[a] ??= []).push(b); (adj[b] ??= []).push(a) }
  const prev: Record<string, string | null> = { A: null }
  const q = ['A']
  while (q.length) { const x = q.shift()!; for (const y of adj[x] ?? []) if (!(y in prev)) { prev[y] = x; q.push(y) } }
  const path: string[] = []
  for (let c: string | null = 'E'; c; c = prev[c] ?? null) path.unshift(c)
  return path[0] === 'A' ? path : []
}

/** Mesh: ordinary wireless routers with custom firmware, each relaying for its neighbours on shared unlicensed-band frequencies. */
export function E2C_Mesh() {
  const [down, setDown] = useState<'none' | 'B'>('none')
  const path = route(down === 'B' ? 'B' : null)
  const on = (a: string, b: string) => path.some((p, i) => path[i + 1] && ((p === a && path[i + 1] === b) || (p === b && path[i + 1] === a)))
  return (
    <>
      <Diagram w={640} h={290} title="A mesh network: wireless routers running custom firmware link to each other. Traffic from one end to the other hops through whichever routers are working, so if one fails it finds another path. The links use frequencies shared with unlicensed wireless data services."
        caption="Wi-Fi style hardware, new firmware, shared unlicensed frequencies.">
        {E.map(([a, b]) => (
          <Ln key={a + b} x1={N[a][0]} y1={N[a][1]} x2={N[b][0]} y2={N[b][1]} color={on(a, b) ? C.signal : C.fill2} width={on(a, b) ? 5 : 2.5} dash={a === down || b === down ? '3 7' : undefined} />
        ))}
        {Object.entries(N).map(([k, [x, y]]) => {
          const dead = k === down
          return (
            <g key={k} opacity={dead ? 0.35 : 1}>
              <rect x={x - 30} y={y - 20} width={60} height={40} rx={8} fill={C.fill} stroke={path.includes(k) ? C.signal : C.ink} strokeWidth={path.includes(k) ? 3 : 2} />
              <T x={x} y={y - 3} anchor="middle" size={14} bold>{k === 'A' ? 'You' : k === 'E' ? 'Far end' : 'Router'}</T>
              <T x={x} y={y + 12} anchor="middle" size={11.5} color={C.muted}>{dead ? 'down' : 'node ' + k}</T>
            </g>
          )
        })}
        <T x={20} y={22} size={14} bold color={C.signal}>{path.length ? `path: ${path.join(' → ')}` : 'no path'}</T>
        <rect x={20} y={254} width={600} height={26} rx={8} fill={C.fill} stroke={C.fill2} strokeWidth={2} />
        <T x={320} y={267} anchor="middle" size={13}>Equipment: a <tspan fontWeight={700}>wireless router with custom firmware</tspan>, not a 2 m or 440 MHz TNC rig.</T>
      </Diagram>
      <Controls>
        <Choice label="Network state" value={down} onChange={setDown} options={[{ value: 'none', label: 'All routers up' }, { value: 'B', label: 'Router B fails' }]} />
      </Controls>
    </>
  )
}
