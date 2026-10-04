import { C, Diagram, Ln, T } from '../kit'

// Relative change in average power density for a person in the far field.
// P and G multiply, duty cycle multiplies, distance divides by its square.
const ROWS: { label: string; sub: string; f: number; txt: string }[] = [
  { label: 'Half the distance', sub: 'closer in', f: 4, txt: '×4' },
  { label: 'Double the power', sub: 'say 50 W to 100 W', f: 2, txt: '×2' },
  { label: '+3 dB of antenna gain', sub: 'toward the person', f: 2, txt: '×2' },
  { label: 'Half the time on air', sub: 'duty cycle 100% to 50%', f: 0.5, txt: '×½' },
  { label: 'Double the distance', sub: 'farther away', f: 0.25, txt: '×¼' },
]

const X0 = 450, PER = 70 // x of "no change", pixels per doubling
const px = (f: number) => X0 + Math.log2(f) * PER

/** How each lever changes average RF exposure (far-field estimate), on a log scale. */
export function RfExposure_Levers() {
  const top = 62, rh = 44
  const axisY = top + ROWS.length * rh + 6
  return (
    <Diagram w={640} h={axisY + 56}
      title="Effect on average RF exposure of changing one thing at a time, far-field estimate: half the distance gives four times the exposure, double the power or add 3 dB of gain doubles it, half the time on air halves it, and double the distance cuts it to a quarter"
      caption="Relative and far-field only. Very close to an antenna, the distance rule fails. See near field and far field.">
      <T x={20} y={20} size={14} bold>Exposure ∝ power × gain × duty cycle ÷ distance²</T>
      <T x={20} y={42} size={13} color={C.muted}>Change one thing, everything else the same</T>
      <T x={X0 - 12} y={42} anchor="end" size={13} color={C.good} bold>less exposure</T>
      <T x={X0 + 12} y={42} size={13} color={C.bad} bold>more exposure</T>
      {[0.25, 0.5, 1, 2, 4].map((f) => (
        <g key={f}>
          <Ln x1={px(f)} y1={top - 8} x2={px(f)} y2={axisY} color={f === 1 ? C.ink : C.muted} width={f === 1 ? 2 : 1} dash={f === 1 ? undefined : '3 4'} />
          <T x={px(f)} y={axisY + 16} anchor="middle" size={13} color={C.muted}>{f === 1 ? '×1' : f === 0.25 ? '×¼' : f === 0.5 ? '×½' : `×${f}`}</T>
        </g>
      ))}
      {ROWS.map((r, i) => {
        const y = top + i * rh
        const x = px(r.f)
        const up = r.f > 1
        const col = up ? C.bad : C.good
        return (
          <g key={r.label}>
            <T x={20} y={y + 12} size={14} bold>{r.label}</T>
            <T x={20} y={y + 30} size={12} color={C.muted}>{r.sub}</T>
            <rect x={Math.min(x, X0)} y={y + 6} width={Math.abs(x - X0)} height={26} rx={4} fill={col} fillOpacity={0.4} stroke={col} strokeWidth={2} />
            <T x={up ? x + 8 : x - 8} y={y + 19} anchor={up ? 'start' : 'end'} size={14} bold color={col}>{r.txt}</T>
          </g>
        )
      })}
      <T x={X0} y={axisY + 40} anchor="middle" size={12} color={C.muted}>doubling steps, logarithmic scale</T>
    </Diagram>
  )
}
