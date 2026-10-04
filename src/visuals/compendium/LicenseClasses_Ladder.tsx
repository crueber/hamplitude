import { C, Diagram, T } from '../kit'

const STEPS = [
  { name: 'Technician', el: 'Exam: 35 questions', pass: 'pass with 26', c: C.signal, top: 134,
    lines: ['Every band above 30 MHz', 'HF: 10 m voice, plus a', 'few CW and data slices'] },
  { name: 'General', el: 'Exam: 35 questions', pass: 'pass with 26', c: C.resist, top: 90,
    lines: ['Everything a Technician has', 'All HF bands, minus Extra-', 'only slices on 80, 40, 20', 'and 15 m'] },
  { name: 'Amateur Extra', el: 'Exam: 50 questions', pass: 'pass with 37', c: C.power, top: 46,
    lines: ['Everything a General has', 'Every amateur privilege on', 'every amateur band, including', 'the Extra-only slices'] },
]

/** The three US license classes as a staircase, each adding to the one below. */
export function LicenseClasses_Ladder() {
  const w = 204, gap = 12, base = 340
  return (
    <Diagram w={640} h={356} title="The three US license classes as a staircase. Technician: all privileges above 30 MHz and limited HF. General: adds almost all of HF. Amateur Extra: every privilege on every band. Each exam needs 74 percent to pass"
      caption="Each class includes everything below it. Passing the next exam moves you up.">
      {STEPS.map((s, i) => {
        const x = 2 + i * (w + gap)
        return (
          <g key={s.name}>
            <rect x={x} y={s.top} width={w} height={base - s.top} rx={12} fill={C.fill} stroke={s.c} strokeWidth={2.4} />
            <path d={`M${x},${(s.top)+44} V${(s.top)+12} a12,12 0 0 1 12,-12 H${(x)+w-12} a12,12 0 0 1 12,12 V${(s.top)+44} Z`} fill={s.c} fillOpacity={0.22} />
            <T x={x + 14} y={s.top + 22} size={16} bold>{s.name}</T>
            <T x={x + 14} y={s.top + 62} size={12.5} bold color={s.c}>{s.el}</T>
            <T x={x + 14} y={s.top + 80} size={12.5} color={C.muted}>{s.pass} (74%)</T>
            {s.lines.map((l, j) => (
              <T key={l} x={x + 14} y={s.top + 108 + j * 20} size={12.5}>{l}</T>
            ))}
          </g>
        )
      })}
    </Diagram>
  )
}
