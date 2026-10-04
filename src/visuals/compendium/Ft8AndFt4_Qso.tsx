import { C, Diagram, T } from '../kit'

const ROWS = [
  { who: 'A', msg: 'CQ K1ABC FN42', note: 'calling CQ, with grid square' },
  { who: 'B', msg: 'K1ABC W9XYZ EN52', note: 'answers: both calls and own grid' },
  { who: 'A', msg: 'W9XYZ K1ABC -12', note: 'signal report in dB' },
  { who: 'B', msg: 'K1ABC W9XYZ R-08', note: 'R = received yours, and sends a report' },
  { who: 'A', msg: 'W9XYZ K1ABC RR73', note: 'got it; 73 means best wishes' },
  { who: 'B', msg: 'K1ABC W9XYZ 73', note: 'optional goodbye' },
]

/** A standard FT8 QSO is six short messages, one per time slot, alternating between the stations. */
export function Ft8AndFt4_Qso() {
  const top = 56, rh = 50
  return (
    <Diagram w={640} h={top + ROWS.length * rh + 14}
      title="A typical FT8 contact in six steps. Station A calls CQ with a grid square. Station B answers with both call signs and its grid. A sends a signal report, B sends a report with R for received, A sends RR73, and B may send 73. Each step is one time slot, and the stations alternate."
      caption="One message per slot, alternating. Example call signs and reports are illustrative.">
      <T x={160} y={20} anchor="middle" size={14} bold color={C.resist}>Station A (calls CQ)</T>
      <T x={480} y={20} anchor="middle" size={14} bold color={C.current}>Station B (answers)</T>
      <line x1={320} y1={34} x2={320} y2={top + ROWS.length * rh} stroke={C.fill2} strokeWidth={2} strokeDasharray="4 5" />
      {ROWS.map((r, i) => {
        const y = top + i * rh
        const left = r.who === 'A'
        const col = left ? C.resist : C.current
        const x = left ? 14 : 346
        return (
          <g key={i}>
            <rect x={x} y={y} width={280} height={42} rx={9} fill={col} fillOpacity={0.14} stroke={col} strokeWidth={2} />
            <T x={x + 12} y={y + 13} size={14} bold mono>{r.msg}</T>
            <T x={x + 12} y={y + 31} size={12} color={C.muted}>{r.note}</T>
            <circle cx={320} cy={y + 21} r={12} fill={C.bg} stroke={col} strokeWidth={2} />
            <T x={320} y={y + 21} anchor="middle" size={12.5} bold>{i + 1}</T>
          </g>
        )
      })}
    </Diagram>
  )
}
