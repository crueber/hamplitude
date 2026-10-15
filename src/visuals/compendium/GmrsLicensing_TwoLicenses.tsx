import { C, Diagram, Lines, T } from '../kit'

interface Panel {
  x: number
  color: string
  title: string
  rule: string
  rows: [string, string][]
}

const PANELS: Panel[] = [
  {
    x: 2, color: C.signal, title: 'GMRS license', rule: '47 CFR Part 95, Subpart E',
    rows: [['Exam', 'None in the rules'], ['Age', '18 or older to apply'], ['Term', 'Ten years, renewable'], ['Covers', 'You, immediate family']],
  },
  {
    x: 334, color: C.current, title: 'Amateur license', rule: '47 CFR Part 97',
    rows: [['Exam', 'Required'], ['Age limit', 'None'], ['Term', 'Ten years, renewable'], ['Privileges', 'Set by license class']],
  },
]

const PW = 304

/** Two separate licenses side by side: the GMRS license that covers a household, and the amateur license with an exam. */
export function GmrsLicensing_TwoLicenses() {
  return (
    <Diagram w={640} h={316}
      title="Two separate licenses. The GMRS license, under 47 CFR Part 95 Subpart E: no exam in the rules, age 18 or older for a new license, ten years, and it covers the licensee and immediate family. The amateur license, under 47 CFR Part 97: an exam is required, no age limit, ten years, with privileges set by license class. Neither license authorizes operating in the other service."
      caption="Same regulator, different rulebooks. Holding one does not give you the other.">
      {PANELS.map((p, pi) => (
        <g key={p.title}>
          <rect x={p.x} y={12} width={PW} height={252} rx={12} fill={C.fill} stroke={p.color} strokeWidth={2.5} />
          <T x={p.x + 16} y={38} size={17} bold>{p.title}</T>
          <T x={p.x + 16} y={60} size={12.5} color={C.muted} mono>{p.rule}</T>

          {/* who the license covers */}
          <g stroke={p.color} strokeWidth={2}>
            {pi === 0 && [[p.x + 150, 94], [p.x + 190, 116], [p.x + 150, 138]].map(([cx, cy]) => (
              <line key={`${cx}-${cy}`} x1={p.x + 94} y1={116} x2={cx - 14} y2={cy} />
            ))}
          </g>
          <circle cx={p.x + 70} cy={116} r={24} fill={C.bg} stroke={p.color} strokeWidth={2.5} />
          <T x={p.x + 70} y={116} anchor="middle" size={13} bold>You</T>
          {pi === 0 ? (
            <>
              {[[p.x + 150, 94], [p.x + 190, 116], [p.x + 150, 138]].map(([cx, cy]) => (
                <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r={14} fill={C.bg} stroke={p.color} strokeWidth={2} />
              ))}
              <Lines x={p.x + 214} y={108} lines={['Immediate', 'family']} lh={17} size={12.5} color={C.muted} />
            </>
          ) : (
            <Lines x={p.x + 112} y={108} lines={['You, within your', 'class privileges']} lh={17} size={12.5} color={C.muted} />
          )}

          {p.rows.map(([label, value], i) => (
            <g key={label}>
              <T x={p.x + 16} y={176 + i * 22} size={12.5} color={C.muted}>{label}</T>
              <T x={p.x + 108} y={176 + i * 22} size={13} bold>{value}</T>
            </g>
          ))}
        </g>
      ))}

      <circle cx={320} cy={138} r={13} fill={C.bg} stroke={C.muted} strokeWidth={2} />
      <T x={320} y={138} anchor="middle" size={16} bold>≠</T>

      <T x={320} y={290} anchor="middle" size={13.5} bold>Neither license authorizes operating in the other service.</T>
    </Diagram>
  )
}
