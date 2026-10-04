import { useState } from 'react'
import { C, Choice, Diagram, Ln, T } from '../kit'

/** Empty filter capacitors are nearly a short circuit at turn-on. A step-start limits the charging current. */
export function StepStart() {
  const [on, setOn] = useState(false)
  const x0 = 70, x1 = 610, base = 220, top = 60, N = 200
  const X = (u: number) => x0 + u * (x1 - x0)
  const Y = (v: number) => base - v * (base - top)
  const tau = 0.1
  const f = (u: number) => {
    if (!on) return Math.exp(-u / tau) * 1.0 + 0.05
    // limited by a resistor first, then the resistor is bypassed at u=0.5
    const a = u < 0.5 ? 0.22 * Math.exp(-u / 0.12) : 0.05 + 0.1 * Math.exp(-(u - 0.5) / 0.04)
    return a + 0.04
  }
  const pts = Array.from({ length: N + 1 }, (_, i) => { const u = i / N; return `${X(u)},${Y(Math.min(1.05, f(u)))}` }).join(' ')
  return (
    <>
      <Diagram w={640} h={290} title={`Turn-on current into empty filter capacitors, ${on ? 'with a step-start: a resistor limits the current, then is bypassed, so the capacitors charge gradually' : 'with no step-start: a huge inrush spike'}.`}
        caption="Step-start: charge the filter capacitors gradually, then run normally.">
        <rect x={20} y={20} width={600} height={225} rx={10} fill={C.fill} />
        <Ln x1={x0} y1={base} x2={x1} y2={base} color={C.muted} width={1.5} />
        <T x={x0 - 8} y={Y(1)} anchor="end" size={12} color={C.muted}>big</T>
        <T x={x0 - 8} y={base} anchor="end" size={12} color={C.muted}>0</T>
        <T x={X(0.3)} y={40} size={13} bold color={C.current}>input current at turn-on</T>
        <T x={x1} y={base + 16} anchor="end" size={12} color={C.muted}>time →</T>
        <polyline points={pts} fill="none" stroke={on ? C.good : C.bad} strokeWidth={3.5} strokeLinejoin="round" />
        {!on && <T x={X(0.12)} y={Y(0.7)} size={14} bold color={C.bad}>inrush spike</T>}
        {on && <T x={X(0.05)} y={Y(0.42)} size={13} bold color={C.good}>resistor limits the current</T>}
        {on && <Ln x1={X(0.5)} y1={Y(0.5)} x2={X(0.5)} y2={Y(0.2)} color={C.power} width={2} dash="4 3" />}
        {on && <T x={X(0.52)} y={Y(0.55)} size={12} bold color={C.power}>resistor bypassed</T>}
        <T x={320} y={268} anchor="middle" size={14} bold color={on ? C.good : C.bad}>{on ? 'Capacitors charge gradually' : 'Empty capacitors act like a short circuit'}</T>
      </Diagram>
      <div style={{ margin: '-6px 0 14px' }}>
        <Choice label="Step-start" value={on ? 'on' : 'off'} onChange={(v) => setOn(v === 'on')} options={[{ value: 'off', label: 'No step-start' }, { value: 'on', label: 'With step-start' }]} />
      </div>
    </>
  )
}
