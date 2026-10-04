import { C, Diagram, Ln, T } from '../kit'

const STEPS = [
  { t: 'You', s: 'write it', y: 232, col: C.ink },
  { t: 'Local net', s: 'collects', y: 182, col: C.signal },
  { t: 'Regional net', s: 'carries', y: 132, col: C.power },
  { t: 'Long-haul net', s: 'crosses', y: 82, col: C.resist },
  { t: 'Regional net', s: 'carries', y: 132, col: C.power },
  { t: 'Local net', s: 'distributes', y: 182, col: C.signal },
  { t: 'Recipient', s: 'delivered', y: 232, col: C.good },
]

/** Message relay in layers: local nets feed wider nets, which carry traffic across a distance and back down. */
export function NtsAndMars_Relay() {
  const cx = (i: number) => 52 + i * 89, bw = 84, bh = 38
  return (
    <Diagram w={640} h={285}
      title="A formal message relayed in layers: from the sender to a local net, up to a regional net, across on a long-haul net, then down through a regional and a local net to the recipient"
      caption="The idea behind a traffic system (layered nets, each handing on to the next). Real names and schedules vary.">
      {STEPS.slice(0, -1).map((s, i) => {
        const n = STEPS[i + 1]
        const up = n.y < s.y, dn = n.y > s.y
        const y1 = up ? s.y - bh / 2 : s.y + bh / 2
        const y2 = dn ? n.y - bh / 2 : n.y + bh / 2
        return <Ln key={i} x1={cx(i) + 14} y1={y1} x2={cx(i + 1) - 14} y2={y2} color={C.muted} width={2.5} arrow />
      })}
      {STEPS.map((s, i) => (
        <g key={i}>
          <rect x={cx(i) - bw / 2} y={s.y - bh / 2} width={bw} height={bh} rx={8} fill={C.fill} stroke={s.col} strokeWidth={2.5} />
          <T x={cx(i)} y={s.y - 7} anchor="middle" size={12} bold>{s.t}</T>
          <T x={cx(i)} y={s.y + 10} anchor="middle" size={12} color={C.muted}>{s.s}</T>
        </g>
      ))}
      <T x={14} y={24} size={13} color={C.muted}>higher level = wider area</T>
    </Diagram>
  )
}
