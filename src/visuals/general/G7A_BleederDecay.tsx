import { C, Diagram, Ln, T } from '../kit'

const X0 = 70, X1 = 600, Y0 = 220, Y1 = 50
const px = (t: number) => X0 + t * (X1 - X0)
const py = (v: number) => Y0 - v * (Y0 - Y1)

/** After switching off, the filter capacitor stays charged unless a bleeder drains it. */
export function BleederDecay() {
  const curve = (tau: number) => Array.from({ length: 51 }, (_, k) => {
    const t = k / 50
    return `${px(t).toFixed(1)},${py(Math.exp(-t / tau)).toFixed(1)}`
  }).join(' ')
  return (
    <Diagram w={640} h={300} title="Filter capacitor voltage after power is switched off. With a bleeder resistor the voltage falls quickly to nearly zero. Without one the charge lingers and can still shock."
      caption="The bleeder discharges the filter capacitors once power is removed.">
      <Ln x1={X0} y1={Y0} x2={X1 + 14} y2={Y0} color={C.muted} arrow />
      <Ln x1={X0} y1={Y0} x2={X0} y2={Y1 - 16} color={C.muted} arrow />
      <T x={X1 + 12} y={Y0 + 20} anchor="end" size={12} color={C.muted}>time after power off</T>
      <T x={X0 + 10} y={24} size={12} color={C.muted}>capacitor voltage</T>
      <Ln x1={px(0)} y1={Y1 - 4} x2={px(0)} y2={Y0} color={C.fill2} width={2} dash="4 5" />
      <polyline points={curve(40)} fill="none" stroke={C.bad} strokeWidth={3.2} />
      <polyline points={curve(0.12)} fill="none" stroke={C.good} strokeWidth={3.2} />
      <T x={px(0.45)} y={py(0.85) - 6} anchor="middle" bold size={14} color={C.bad}>No bleeder: stays charged, shock hazard</T>
      <T x={px(0.22)} y={py(0.3) - 14} anchor="start" bold size={14} color={C.good}>With bleeder: drains quickly</T>
      <T x={px(0)} y={Y0 + 18} anchor="middle" size={12} color={C.muted}>off</T>
    </Diagram>
  )
}
