import { C, Diagram, Ln, T } from '../kit'

interface N { id: number; x: number; y: number; color: string; dash?: boolean; step: string }

const R = 22
const NODES: N[] = [
  { id: 0, x: 80, y: 140, color: C.signal, step: 'A sends first' },
  { id: 1, x: 220, y: 70, color: C.muted, dash: true, step: 'B stays quiet' },
  { id: 2, x: 270, y: 205, color: C.resist, step: 'C relays first' },
  { id: 3, x: 470, y: 150, color: C.resist, step: 'D relays next' },
]
const by = (id: number) => NODES.find((n) => n.id === id)!

/** An arrow between two nodes, trimmed so it starts and ends at the node edges. */
function Arrow({ a, b, color, dash, width = 2 }: { a: number; b: number; color: string; dash?: string; width?: number }) {
  const p = by(a), q = by(b)
  const dx = q.x - p.x, dy = q.y - p.y, d = Math.hypot(dx, dy)
  const k = (R + 3) / d
  return <Ln x1={p.x + dx * k} y1={p.y + dy * k} x2={q.x - dx * k} y2={q.y - dy * k} color={color} dash={dash} width={width} arrow />
}

/** Four nodes, A sends: the farthest node that heard it relays first, the nearer one hears that and stays quiet. */
export function MeshtasticManagedFlooding_Topology() {
  return (
    <Diagram w={640} h={330}
      title="Four nodes, A to D. A sends a broadcast that only B and C can hear. C is farther away, so it hears the packet at a lower signal-to-noise ratio and waits less before relaying, so it relays first. A hears that relay, which counts as an acknowledgement. B also hears it and stays quiet. D hears the packet for the first time and relays it on."
      caption="Illustrative. C receives A's packet at a lower signal-to-noise ratio than B does, so its random wait is shorter and it relays first.">
      {/* step 1: the original broadcast */}
      <Arrow a={0} b={1} color={C.signal} />
      <Arrow a={0} b={2} color={C.signal} />
      {/* C's relay is heard by A, B and D */}
      <Arrow a={2} b={0} color={C.resist} dash="5 4" width={1.6} />
      <Arrow a={2} b={1} color={C.resist} dash="5 4" width={1.6} />
      <Arrow a={2} b={3} color={C.resist} />
      {/* D carries it onward */}
      <Ln x1={494} y1={150} x2={560} y2={150} color={C.resist} arrow />
      <T x={566} y={150} size={12.5} color={C.muted}>onward</T>

      {NODES.map((n) => (
        <g key={n.id}>
          <circle cx={n.x} cy={n.y} r={R} fill={C.bg} stroke={n.color} strokeWidth={2.5} strokeDasharray={n.dash ? '5 4' : undefined} />
          <T x={n.x} y={n.y} size={15} bold anchor="middle" color={n.dash ? C.muted : C.ink}>{'ABCD'[n.id]}</T>
          <T x={n.x} y={n.y + 40} size={13} bold anchor="middle" color={n.dash ? C.muted : C.ink}>{n.step}</T>
        </g>
      ))}

      <T x={24} y={272} size={13} color={C.muted}>Dashed arrows: C's relay, heard by A and B, who need not repeat it.</T>
      <T x={24} y={296} size={13} color={C.muted}>A counts that relay as an acknowledgement, though no one sent a reply.</T>
    </Diagram>
  )
}
