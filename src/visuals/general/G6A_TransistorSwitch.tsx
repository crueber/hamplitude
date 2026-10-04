import { useState } from 'react'
import { C, Controls, Diagram, Ln, Readout, Slider, T } from '../kit'

const VCC = 12, RL = 2.4, BETA = 100 // mA = V / kΩ
const ISAT = VCC / RL // 5 mA
const X0 = 70, X1 = 380, Y0 = 250, Y1 = 50
const px = (v: number) => X0 + (v / VCC) * (X1 - X0)
const py = (i: number) => Y0 - (i / 6) * (Y0 - Y1)

/** Output curves with a load line: cutoff and saturation are the two ends (switch), the middle is the active region (amplifier). */
export function TransistorSwitch() {
  const [ib, setIb] = useState(0)
  const want = (ib * BETA) / 1000
  const ic = Math.min(want, ISAT)
  const vce = VCC - ic * RL
  const state = ib === 0 ? 'cutoff' : want >= ISAT ? 'saturation' : 'active'
  const label = { cutoff: 'Cutoff: OFF', saturation: 'Saturation: ON', active: 'Active region: amplifier' }[state]
  const col = state === 'active' ? C.power : state === 'cutoff' ? C.muted : C.good
  const family = [10, 20, 30, 40, 50].map((b) => {
    const cur = (b * BETA) / 1000
    const pts = Array.from({ length: 41 }, (_, k) => {
      const v = (k / 40) * VCC
      return `${px(v).toFixed(1)},${py(cur * (1 - Math.exp(-v / 0.7))).toFixed(1)}`
    })
    return pts.join(' ')
  })
  return (
    <>
      <Diagram w={640} h={310} title={`A bipolar transistor's collector current against collector voltage, with a load line. The operating point is now in ${label}. A switch uses only the two ends of the line, cutoff and saturation.`}
        caption="As a switch, a transistor lives at the two ends of the load line: fully off or fully on.">
        <Ln x1={X0} y1={Y0} x2={X1 + 14} y2={Y0} color={C.muted} arrow />
        <Ln x1={X0} y1={Y0} x2={X0} y2={Y1 - 16} color={C.muted} arrow />
        <T x={X1 + 12} y={Y0 + 20} anchor="end" size={12} color={C.muted}>collector voltage</T>
        <T x={X0 - 6} y={26} size={12} color={C.muted}>collector current</T>
        {family.map((p, i) => <polyline key={i} points={p} fill="none" stroke={C.fill2} strokeWidth={2.5} />)}
        <Ln x1={px(VCC)} y1={py(0)} x2={px(0)} y2={py(ISAT)} color={C.resist} width={2.5} dash="6 5" />
        <T x={px(5.4)} y={py(2.9) - 14} anchor="middle" size={12} color={C.resist} bold>load line</T>
        <circle cx={px(VCC)} cy={py(0)} r={9} fill="none" stroke={C.muted} strokeWidth={2} />
        <circle cx={px(0.1)} cy={py(ISAT)} r={9} fill="none" stroke={C.good} strokeWidth={2} />
        <circle cx={px(vce)} cy={py(ic)} r={7} fill={col} />
        <T x={px(VCC) + 10} y={py(0) - 44} anchor="end" size={12} bold color={C.muted}>cutoff</T>
        <T x={px(0.1) + 18} y={py(ISAT) - 2} size={12} bold color={C.good}>saturation</T>
        <T x={X0} y={Y0 + 20} anchor="middle" size={12} color={C.muted}>0</T>

        <rect x={420} y={60} width={200} height={190} rx={12} fill={C.fill} />
        <T x={520} y={82} anchor="middle" bold size={14}>As a switch</T>
        {[
          { y: 112, t: 'Cutoff', d: 'no base current', e: 'open switch', c: C.muted, on: state === 'cutoff' },
          { y: 172, t: 'Saturation', d: 'plenty of base current', e: 'closed switch', c: C.good, on: state === 'saturation' },
        ].map((r) => (
          <g key={r.t} opacity={r.on ? 1 : 0.55}>
            <T x={436} y={r.y} bold size={14} color={r.c}>{r.t}</T>
            <T x={436} y={r.y + 18} size={12} color={C.muted}>{r.d}</T>
            <T x={436} y={r.y + 34} size={12} bold>{r.e}</T>
          </g>
        ))}
        <T x={520} y={236} anchor="middle" size={12} color={C.muted}>between the two: active</T>
        <T x={X0 + 120} y={294} anchor="middle" bold size={14} color={col}>{label}</T>
      </Diagram>
      <Controls>
        <Slider label="Base current" value={ib} min={0} max={60} onChange={setIb} format={(v) => `${v} µA`} color={C.current} />
        <Readout label="Collector current" value={ic.toFixed(1)} unit="mA" color={C.current} />
      </Controls>
    </>
  )
}
