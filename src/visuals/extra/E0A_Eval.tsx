import { C, Diagram, Ln, T } from '../kit'

const ROWS: { t: string; ok: boolean }[] = [
  { t: 'Hand-held transceiver sold before May 3, 2021', ok: true },
  { t: 'Low output power (under 7 W or under 100 W)', ok: false },
  { t: 'Low ERP (under 10 W) or CW mode', ok: false },
  { t: 'Antenna that radiates only in the near field', ok: false },
  { t: 'Dish under one meter across', ok: false },
]

/** Pool view of exemptions: only hand-helds sold before May 3, 2021. Everything else gets evaluated. */
export function Eval() {
  return (
    <Diagram w={640} h={276} title="Exempt from RF exposure evaluation in the pool: hand-held transceivers sold before May 3, 2021. Low power, low ERP, CW mode, near-field-only antennas and small dishes are not exemptions in the pool. For an 80 meter station the exam answer is that an evaluation must always be performed"
      caption="What gets you out of an RF exposure evaluation, according to this exam's question pool.">
      {ROWS.map((r, i) => {
        const y = 28 + i * 44
        const col = r.ok ? C.good : C.bad
        return (
          <g key={r.t}>
            <circle cx={36} cy={y} r={15} fill={col} fillOpacity={0.2} stroke={col} strokeWidth={2.5} />
            {r.ok ? (
              <path d={`M${28},${y} L${34},${y + 7} L${46},${y - 8}`} fill="none" stroke={col} strokeWidth={3.5} strokeLinecap="round" strokeLinejoin="round" />
            ) : (
              <>
                <Ln x1={29} y1={y - 7} x2={43} y2={y + 7} color={col} width={3.5} />
                <Ln x1={43} y1={y - 7} x2={29} y2={y + 7} color={col} width={3.5} />
              </>
            )}
            <T x={64} y={y} size={14} bold={r.ok} color={r.ok ? C.good : C.ink}>{r.t}</T>
            <T x={620} y={y} anchor="end" size={13} bold color={col}>{r.ok ? 'exempt' : 'not a pool exemption'}</T>
          </g>
        )
      })}
      <rect x={20} y={236} width={600} height={30} rx={8} fill={C.fill} />
      <T x={320} y={251} anchor="middle" size={14} bold color={C.signal}>80 m station: the exam says an evaluation must always be performed</T>
    </Diagram>
  )
}
