import { C, Diagram, Ln, T } from '../kit'

const NODES = [
  { x: 70, l: 'A', s: 'sender', col: C.resist },
  { x: 230, l: 'B', s: 'hears A', col: C.signal },
  { x: 410, l: 'C', s: 'hears B and D', col: C.signal },
  { x: 570, l: 'D', s: 'addressee', col: C.current },
]

/** JS8Call keeps FT8's weak-signal modulation but adds keyboard messages that can hop between stations. */
export function Js8call_Hops() {
  const y = 78
  return (
    <Diagram w={640} h={298}
      title="JS8Call message relay. Station A cannot reach station D directly. The message hops to B, then C, then D, each station acknowledging. Below, three things JS8Call adds to FT8 modulation: free-text keyboard messages, directed messages with acknowledgement, and relaying through other stations."
      caption="Illustrative: a relay chain over HF. Each hop is its own short transmission, in timed slots.">
      <path d="M 76 46 Q 320 -12 564 46" fill="none" stroke={C.bad} strokeWidth={2.2} strokeDasharray="6 5" />
      <rect x={200} y={6} width={240} height={22} rx={6} fill={C.bg} />
      <T x={320} y={17} anchor="middle" size={13} bold color={C.bad}>A and D cannot hear each other</T>
      {[0, 1, 2].map((i) => (
        <g key={i}>
          <Ln x1={NODES[i].x + 30} y1={y} x2={NODES[i + 1].x - 30} y2={y} color={C.good} width={3} arrow />
          <T x={(NODES[i].x + NODES[i + 1].x) / 2} y={y - 16} anchor="middle" size={13} bold color={C.good}>hop {i + 1}</T>
        </g>
      ))}
      {NODES.map((n) => (
        <g key={n.l}>
          <circle cx={n.x} cy={y} r={28} fill={n.col} fillOpacity={0.18} stroke={n.col} strokeWidth={2.5} />
          <T x={n.x} y={y} anchor="middle" size={20} bold>{n.l}</T>
          <T x={n.x} y={y + 46} anchor="middle" size={12.5} color={C.muted}>{n.s}</T>
        </g>
      ))}
      {[
        { x: 14, t: 'Free text', d: 'Type ordinary messages, not a fixed set of FT8 phrases.', col: C.signal },
        { x: 222, t: 'Directed messages', d: 'Address a station; it can acknowledge, so you know it arrived.', col: C.resist },
        { x: 430, t: 'Relaying', d: 'A station that hears both ends can pass the message along.', col: C.good },
      ].map((b) => (
        <g key={b.t}>
          <rect x={b.x} y={160} width={196} height={118} rx={10} fill={C.fill} stroke={b.col} strokeWidth={2} />
          <T x={b.x + 12} y={182} size={14} bold color={b.col}>{b.t}</T>
          {wrap(b.d, 24).map((l, i) => <T key={i} x={b.x + 12} y={210 + i * 20} size={13}>{l}</T>)}
        </g>
      ))}
    </Diagram>
  )
}

function wrap(s: string, n: number): string[] {
  const out: string[] = []
  let cur = ''
  for (const w of s.split(' ')) {
    if ((cur + ' ' + w).trim().length > n) { out.push(cur); cur = w } else cur = (cur + ' ' + w).trim()
  }
  if (cur) out.push(cur)
  return out
}
