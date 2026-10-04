import { useState } from 'react'
import { C, Controls, Diagram, Ln, Readout, Slider, T, fmt } from '../kit'

const VIN = 12

/** Switching regulator: chop the input into pulses, filter to the average. Duty cycle sets the output. */
export function SwitchReg() {
  const [duty, setDuty] = useState(40)
  const d = duty / 100
  const vout = d * VIN
  const x0 = 70, x1 = 610, top = 150, bot = 260, per = 90
  const Y = (v: number) => bot - (v / VIN) * (bot - top)
  const pts: string[] = []
  const nP = Math.floor((x1 - x0) / per)
  for (let i = 0; i < nP; i++) {
    const s = x0 + i * per
    pts.push(`${s},${Y(0)}`, `${s},${Y(VIN)}`, `${s + per * d},${Y(VIN)}`, `${s + per * d},${Y(0)}`, `${s + per},${Y(0)}`)
  }
  return (
    <>
      <Diagram w={640} h={310} title={`Switching regulator: 12 volt input chopped at ${duty} percent duty cycle, then filtered, gives an average output of ${fmt(vout, 3)} volts.`}
        caption="The control circuit changes the duty cycle of pulses going into a filter.">
        {[{ x: 14, t: 'Input', s: '12 V DC', c: C.voltage }, { x: 170, t: 'Fast switch', s: 'on / off, duty cycle D', c: C.power }, { x: 350, t: 'Filter (L + C)', s: 'averages the pulses', c: C.signal }, { x: 510, t: 'Output', s: `${fmt(vout, 3)} V DC`, c: C.good }].map((b, i, a) => (
          <g key={b.t}>
            <rect x={b.x} y={20} width={i === 1 ? 160 : i === 2 ? 140 : 110} height={56} rx={10} fill={C.fill} stroke={b.c} strokeWidth={2.5} />
            <T x={b.x + (i === 1 ? 80 : i === 2 ? 70 : 55)} y={40} anchor="middle" size={13} bold color={b.c}>{b.t}</T>
            <T x={b.x + (i === 1 ? 80 : i === 2 ? 70 : 55)} y={60} anchor="middle" size={12} color={C.muted}>{b.s}</T>
            {i < a.length - 1 && <Ln x1={b.x + (i === 1 ? 160 : i === 2 ? 140 : 110) + 2} y1={48} x2={a[i + 1].x - 2} y2={48} color={C.muted} width={2} arrow />}
          </g>
        ))}
        <rect x={20} y={100} width={600} height={190} rx={10} fill={C.fill} />
        <T x={x0} y={118} size={13} bold color={C.power}>pulses into the filter</T>
        <Ln x1={x0} y1={Y(0)} x2={x1} y2={Y(0)} color={C.muted} width={1.5} />
        <T x={x0 - 8} y={Y(VIN)} anchor="end" size={12} color={C.muted}>12</T>
        <T x={x0 - 8} y={Y(0)} anchor="end" size={12} color={C.muted}>0</T>
        <polyline points={pts.join(' ')} fill="none" stroke={C.power} strokeWidth={3} strokeLinejoin="round" />
        <Ln x1={x0} y1={Y(vout)} x2={x1} y2={Y(vout)} color={C.good} width={3.5} dash="8 5" />
        <T x={x1} y={118} anchor="end" size={13} bold color={C.good}>{`average = D × 12 V = ${fmt(d, 2)} × 12 = ${fmt(vout, 3)} V`}</T>
      </Diagram>
      <Controls>
        <Slider label="Duty cycle (fraction of time on)" value={duty} min={10} max={90} step={5} onChange={setDuty} format={(v) => `${v}%`} color={C.power} />
        <Readout label="Average output" value={fmt(vout, 3)} unit="V" color={C.good} />
      </Controls>
    </>
  )
}
