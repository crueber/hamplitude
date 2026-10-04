import { C, Diagram, Ln, T } from '../kit'

/** Schematic gain versus frequency: a Yagi peaks high in a narrow band; a log-periodic is lower but nearly flat across a wide band. */
export function LogPeriodic_GainCurves() {
  const x0 = 70, x1 = 610, yb = 220, yt = 40
  const X = (u: number) => x0 + (x1 - x0) * u // u: 0..1 across the log-frequency axis
  const Y = (g: number) => yb - (yb - yt) * g
  const yagi = (u: number) => {
    const z = (u - 0.4) / 0.11
    return 0.05 + 0.85 * Math.exp(-z * z)
  }
  const lp = (u: number) => {
    const edge = Math.min(1, Math.max(0, Math.min(u - 0.05, 0.95 - u) / 0.1))
    return 0.05 + 0.5 * Math.pow(edge, 0.7) * (1 - 0.03 * Math.sin(u * 60))
  }
  const path = (f: (u: number) => number) =>
    Array.from({ length: 121 }, (_, i) => `${i ? 'L' : 'M'}${X(i / 120).toFixed(1)},${Y(f(i / 120)).toFixed(1)}`).join('')
  return (
    <Diagram w={640} h={290}
      title="Schematic gain versus frequency: a Yagi has higher gain but only over a narrow band, while a log-periodic antenna has moderate gain that stays nearly constant across a wide band"
      caption="Schematic, not measured. The log-periodic gives up peak gain to cover a wide frequency range.">
      <Ln x1={x0} y1={yb} x2={x1} y2={yb} color={C.muted} width={2} />
      <Ln x1={x0} y1={yt - 8} x2={x0} y2={yb} color={C.muted} width={2} />
      <T x={x0 + 8} y={yt - 14} anchor="start" size={12} color={C.muted}>gain</T>
      <T x={x1} y={yb + 22} anchor="end" size={12} color={C.muted}>frequency, log scale</T>
      <path d={path(yagi)} fill="none" stroke={C.bad} strokeWidth={3.5} strokeLinecap="round" />
      <path d={path(lp)} fill="none" stroke={C.good} strokeWidth={3.5} strokeLinecap="round" />
      <T x={X(0.5)} y={Y(0.93)} size={13} bold color={C.bad}>Yagi</T>
      <T x={X(0.5)} y={Y(0.93) + 16} size={12} color={C.muted}>more gain, narrow</T>
      <T x={X(0.8)} y={Y(0.55) - 38} anchor="middle" size={13} bold color={C.good}>Log-periodic</T>
      <T x={X(0.8)} y={Y(0.55) - 22} anchor="middle" size={12} color={C.muted}>less gain, wide and flat</T>
      <Ln x1={X(0.1)} y1={yb + 36} x2={X(0.9)} y2={yb + 36} color={C.good} width={2} arrow="both" />
      <T x={X(0.5)} y={yb + 54} anchor="middle" size={12} bold color={C.good}>a design bandwidth of 2:1 or more is common</T>
    </Diagram>
  )
}
