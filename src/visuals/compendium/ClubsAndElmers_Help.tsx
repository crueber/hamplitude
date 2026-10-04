import { C, Diagram, Ln, T } from '../kit'

type N = { t: string; d: string[]; c: string }
const LEFT: N[] = [
  { t: 'Elmer (mentor)', d: ['One-to-one help with gear,', 'antennas and first contacts'], c: C.signal },
  { t: 'Radio club', d: ['Meetings, classes, repeaters,', 'a shared station, Field Day'], c: C.current },
  { t: 'Volunteer examiners', d: ['Run exam sessions, often', 'hosted by a local club'], c: C.power },
]
const RIGHT: N[] = [
  { t: 'Nets', d: ['Practise on-air procedure', 'in friendly company'], c: C.resist },
  { t: 'Hamfests', d: ['Swap meets, talks, demos', 'and sometimes exams'], c: C.good },
  { t: 'Online groups', d: ['Forums, video calls and', 'study groups, any hour'], c: C.voltage },
]

/** Where a newcomer finds help: six sources of community around you. */
export function ClubsAndElmers_Help() {
  const bw = 206, bh = 86, ys = [8, 112, 216]
  const cx = 320, cy = 170
  const node = (n: N, x: number, y: number) => (
    <g key={n.t}>
      <rect x={x} y={y} width={bw} height={bh} rx={12} fill={C.fill} stroke={n.c} strokeWidth={2.2} />
      <T x={x + 14} y={y + 22} size={14} bold color={n.c}>{n.t}</T>
      <T x={x + 14} y={y + 46} size={12.5}>{n.d[0]}</T>
      <T x={x + 14} y={y + 64} size={12.5}>{n.d[1]}</T>
    </g>
  )
  return (
    <Diagram w={640} h={318} title="Six sources of help for a new amateur: an Elmer or mentor, a radio club, volunteer examiners, on-air nets, hamfests, and online groups, all connected to you at the centre"
      caption="Clubs host exams, run nets and organise hamfests; many members are Elmers.">
      {LEFT.map((n, i) => <Ln key={n.t} x1={cx - 42} y1={cy + (i - 1) * 22} x2={8 + bw + 2} y2={ys[i] + bh / 2} color={n.c} width={2} />)}
      {RIGHT.map((n, i) => <Ln key={n.t} x1={cx + 42} y1={cy + (i - 1) * 22} x2={640 - 8 - bw - 2} y2={ys[i] + bh / 2} color={n.c} width={2} />)}
      {LEFT.map((n, i) => node(n, 8, ys[i]))}
      {RIGHT.map((n, i) => node(n, 640 - 8 - bw, ys[i]))}
      <circle cx={cx} cy={cy} r={44} fill={C.signal} fillOpacity={0.18} stroke={C.signal} strokeWidth={3} />
      <T x={cx} y={cy - 8} anchor="middle" size={16} bold>You</T>
      <T x={cx} y={cy + 12} anchor="middle" size={12.5} color={C.muted}>new ham</T>
    </Diagram>
  )
}
