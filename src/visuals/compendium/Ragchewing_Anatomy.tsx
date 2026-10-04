import { C, Diagram, Ln, T } from '../kit'

interface Seg { w: number; head: string; col: string; lines: string[] }
const SEGS: Seg[] = [
  { w: 92, head: 'CQ', col: C.signal, lines: ['Call', 'and', 'answer'] },
  { w: 112, head: 'Basics', col: C.current, lines: ['Report,', 'name,', 'location'] },
  { w: 276, head: 'The conversation', col: C.power, lines: ['Radios, antennas, weather, work,', 'other hobbies, travel, the band', 'itself. No script, and no hurry.'] },
  { w: 100, head: '73', col: C.good, lines: ['Thanks,', 'sign off,', 'final ID'] },
]

/** The shape of a ragchew: a short opening, a long open-ended middle, a short close, with station IDs marked. */
export function Ragchewing_Anatomy() {
  const x0 = 20, gap = 4
  let x = x0
  const xs = SEGS.map((s) => { const cur = x; x += s.w + gap; return cur })
  const end = x - gap
  return (
    <Diagram w={640} h={250}
      title="The shape of a ragchew as a timeline: a short call and answer, a brief exchange of signal report name and location, a long open-ended conversation, and a short sign-off. Station identification marks sit at the start, at least every ten minutes, and at the end."
      caption="Illustrative proportions. A ragchew can last five minutes or an hour.">
      {SEGS.map((s, i) => (
        <g key={s.head}>
          <rect x={xs[i]} y={34} width={s.w} height={34} rx={8} fill={s.col} fillOpacity={0.2} stroke={s.col} strokeWidth={2} />
          <T x={xs[i] + s.w / 2} y={51} anchor="middle" size={13.5} bold color={s.col}>{s.head}</T>
          {s.lines.map((l, j) => <T key={j} x={xs[i] + s.w / 2} y={90 + j * 19} anchor="middle" size={12.5}>{l}</T>)}
        </g>
      ))}
      {/* ID ticks */}
      <Ln x1={x0 + 14} y1={34} x2={x0 + 14} y2={24} color={C.resist} width={3} />
      <Ln x1={xs[2] + 150} y1={34} x2={xs[2] + 150} y2={24} color={C.resist} width={3} />
      <Ln x1={end - 14} y1={34} x2={end - 14} y2={24} color={C.resist} width={3} />
      <T x={x0 + 14} y={11} size={12.5} bold color={C.resist} anchor="start">ID</T>
      <T x={xs[2] + 150} y={11} size={12.5} bold color={C.resist} anchor="middle">ID at least every 10 min</T>
      <T x={end - 14} y={11} size={12.5} bold color={C.resist} anchor="end">ID</T>
      {/* turn taking */}
      <rect x={x0} y={160} width={end - x0} height={74} rx={10} fill={C.fill} stroke={C.fill2} strokeWidth={2} />
      <T x={x0 + 14} y={180} size={13.5} bold>Taking turns</T>
      <T x={x0 + 14} y={202} size={12.5} color={C.muted}>Talk for a minute or two, then hand over: "...back to you."</T>
      <T x={x0 + 14} y={221} size={12.5} color={C.muted}>Pause between overs so others can break in.</T>
    </Diagram>
  )
}
