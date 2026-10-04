import { C, Diagram, Lines, Ln, T } from '../kit'

const PX0 = 380, PX1 = 620, PY0 = 190, PY1 = 70
const px = (f: number) => PX0 + f * (PX1 - PX0)
const py = (z: number) => PY0 - z * (PY0 - PY1)
const bump = (c: number, w: number) => Array.from({ length: 41 }, (_, k) => {
  const f = k / 40
  return `${px(f).toFixed(1)},${py(0.08 + 0.85 * Math.exp(-(((f - c) / w) ** 2))).toFixed(1)}`
}).join(' ')

/** A ferrite toroid: field stays inside the core, and the core's mix sets the frequency range it works at. */
export function Toroid() {
  return (
    <Diagram w={640} h={290} title="Left: a ferrite toroid with a winding. The magnetic field circles inside the core. Right: two cores of different mix, each works best in a different frequency range."
      caption="Toroid: big inductance from few turns, field kept in the core, and the mix tuned to a frequency range.">
      <ellipse cx={130} cy={110} rx={96} ry={62} fill={C.fill2} stroke={C.ink} strokeWidth={2} />
      <ellipse cx={130} cy={110} rx={50} ry={26} fill={C.bg} stroke={C.ink} strokeWidth={2} />
      <ellipse cx={130} cy={110} rx={73} ry={44} fill="none" stroke={C.signal} strokeWidth={3} strokeDasharray="7 6" />
      {[25, 45, 65, 85, 105, 125, 145, 165].map((deg) => {
        const a = (deg * Math.PI) / 180, co = Math.cos(a), si = Math.sin(a)
        return <line key={deg} x1={130 + 44 * co} y1={110 + 21 * si} x2={130 + 102 * co} y2={110 + 68 * si} stroke={C.resist} strokeWidth={3.5} strokeLinecap="round" />
      })}
      <T x={130} y={22} anchor="middle" size={13} bold color={C.signal}>field loops stay in the core</T>
      <T x={130} y={202} anchor="middle" size={13} bold color={C.resist}>winding</T>
      <Lines x={130} y={246} anchor="middle" size={12.5} color={C.muted} lh={18} lines={['A lot of inductance from few turns,', 'and little field leaks out.']} />

      <line x1={320} y1={16} x2={320} y2={272} stroke={C.fill2} strokeWidth={2} strokeDasharray="4 5" />
      <T x={500} y={26} anchor="middle" bold size={14}>Core mix sets where it works</T>
      <Ln x1={PX0} y1={PY0} x2={PX1 + 10} y2={PY0} color={C.muted} arrow />
      <Ln x1={PX0} y1={PY0} x2={PX0} y2={PY1 - 14} color={C.muted} arrow />
      <T x={PX1 + 10} y={PY0 + 18} anchor="end" size={12} color={C.muted}>frequency →</T>
      <T x={PX0} y={PY0 + 18} size={12} color={C.muted}>response</T>
      <polyline points={bump(0.25, 0.16)} fill="none" stroke={C.power} strokeWidth={3} />
      <polyline points={bump(0.72, 0.16)} fill="none" stroke={C.good} strokeWidth={3} />
      <T x={px(0.25)} y={py(1) - 8} anchor="middle" bold size={13} color={C.power}>mix A</T>
      <T x={px(0.72)} y={py(1) - 8} anchor="middle" bold size={13} color={C.good}>mix B</T>
      <Lines x={500} y={236} anchor="middle" size={12.5} color={C.muted} lh={18} lines={['Same size, different material:', 'different frequency range.']} />
    </Diagram>
  )
}
