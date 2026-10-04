import { C, Diagram, Ln, T } from '../kit'

/** v = L x di/dt: a coil only shows voltage while its current is changing, and faster change means more voltage. */
export function Inductance_BackEmf() {
  const X0 = 70, X1 = 610, TMAX = 30 // ms
  const xt = (ms: number) => X0 + (ms / TMAX) * (X1 - X0)
  const iTop = 30, iH = 100 // current plot: 0 A at iTop+iH, 1 A at iTop
  const yi = (a: number) => iTop + iH - a * iH
  const vZero = 252, vPer = 8 // voltage plot: 8 px per volt
  const yv = (v: number) => vZero - v * vPer
  const cur = `${xt(0)},${yi(0)} ${xt(10)},${yi(1)} ${xt(20)},${yi(1)} ${xt(21)},${yi(0)} ${xt(30)},${yi(0)}`
  const vol = `${xt(0)},${yv(0)} ${xt(0)},${yv(1)} ${xt(10)},${yv(1)} ${xt(10)},${yv(0)} ${xt(20)},${yv(0)} ${xt(20)},${yv(-10)} ${xt(21)},${yv(-10)} ${xt(21)},${yv(0)} ${xt(30)},${yv(0)}`
  return (
    <Diagram w={640} h={366}
      title="A 10 millihenry coil: current rises over 10 milliseconds, holds, then falls in 1 millisecond. Voltage across it is 1 volt while rising, zero while steady, and minus 10 volts during the fast fall."
      caption="Voltage appears only while the current changes, in proportion to how fast. v = L × ΔI ÷ Δt, with L = 10 mH.">
      <T x={X0 - 8} y={iTop - 12} anchor="start" size={13} bold color={C.current}>Current through the coil (1 A peak)</T>
      <Ln x1={X0} y1={yi(0)} x2={X1} y2={yi(0)} color={C.muted} width={1.5} />
      <Ln x1={X0} y1={iTop - 4} x2={X0} y2={yi(0)} color={C.muted} width={1.5} />
      <polyline points={cur} fill="none" stroke={C.current} strokeWidth={3.5} strokeLinejoin="round" />
      <T x={xt(5) - 28} y={yi(0.5) - 8} anchor="end" size={12} color={C.muted}>rising</T>
      <T x={xt(15)} y={yi(1) - 12} anchor="middle" size={12} color={C.muted}>steady</T>
      <T x={xt(24)} y={yi(0.5)} anchor="start" size={12} color={C.muted}>falls fast</T>
      <T x={X0 - 8} y={168} anchor="start" size={13} bold color={C.voltage}>Voltage across the coil</T>
      <Ln x1={X0} y1={yv(0)} x2={X1} y2={yv(0)} color={C.muted} width={1.5} />
      <Ln x1={X0} y1={180} x2={X0} y2={yv(-12) + 8} color={C.muted} width={1.5} />
      <polyline points={vol} fill="none" stroke={C.voltage} strokeWidth={3.5} strokeLinejoin="round" />
      <T x={xt(5)} y={yv(1) - 14} anchor="middle" size={13} bold color={C.voltage}>+1 V</T>
      <T x={xt(15)} y={yv(0) - 14} anchor="middle" size={13} bold color={C.voltage}>0 V</T>
      <T x={xt(21) + 8} y={yv(-10)} anchor="start" size={13} bold color={C.voltage}>−10 V</T>
      <T x={xt(5)} y={yv(-3)} anchor="middle" size={12} color={C.muted}>10 mH × 1 A ÷ 10 ms</T>
      <T x={xt(5)} y={yv(-3) + 18} anchor="middle" size={12} color={C.muted}>the coil resists the rise</T>
      <T x={xt(13.5)} y={yv(-9.4)} anchor="end" size={12} color={C.muted}>10 mH × 1 A ÷ 1 ms: the coil</T>
      <T x={xt(13.5)} y={yv(-9.4) + 18} anchor="end" size={12} color={C.muted}>fights the fall, hard</T>
      <T x={X1} y={358} anchor="end" size={12} color={C.muted}>time (ms): 0 to 30</T>
    </Diagram>
  )
}
