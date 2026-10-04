import { useState } from 'react'
import { C, Controls, Diagram, Ln, Slider, T, fmt } from '../kit'

// Illustrative triode: mu = 20, plate at 250 V, so cutoff is near -Vp/mu = -12.5 V.
const MU = 20, VP = 250, K = 0.00018 // A / V^1.5
const VCUT = -VP / MU
const ip = (vg: number) => { const x = vg + VP / MU; return x > 0 ? K * x ** 1.5 * 1000 : 0 } // mA
const slope = (vg: number) => { const x = vg + VP / MU; return x > 0 ? 1.5 * K * x ** 0.5 * 1000 : 0 } // mA per V
const mi = (n: number) => String(n).replace('-', '−')
const PX0 = 380, PX1 = 610, PY0 = 200, PY1 = 44
const px = (vg: number) => PX0 + ((vg + 14) / 14) * (PX1 - PX0)
const py = (i: number) => PY0 - (i / 10) * (PY0 - PY1)

/** Triode: a negative voltage on the grid repels electrons and throttles the plate current. Illustrative curve, not a real tube. */
export function VacuumTubes_GridControl() {
  const [vg, setVg] = useState(-4)
  const i = ip(vg)
  const n = Math.round((i / ip(0)) * 22)
  const dots = Array.from({ length: 22 }, (_, k) => k)
  const pts: string[] = []
  for (let v = -14; v <= 0.001; v += 0.25) pts.push(`${px(v).toFixed(1)},${py(ip(v)).toFixed(1)}`)
  const off = i === 0
  return (
    <>
      <Diagram w={640} h={330}
        title={`A triode with the grid at ${vg} volts: plate current is ${fmt(i, 2)} milliamps. The more negative the grid, the fewer electrons reach the plate; below about ${VCUT} volts none do.`}
        caption="A few volts on the grid control a much larger flow of electrons to the plate. Illustrative triode, not a real tube.">
        <rect x={24} y={26} width={290} height={190} rx={70} fill={C.fill} stroke={C.ink} strokeWidth={2} />
        {/* cathode, grid, plate */}
        <rect x={64} y={64} width={14} height={110} rx={4} fill={C.resist} fillOpacity={0.5} stroke={C.resist} strokeWidth={2} />
        <Ln x1={160} y1={52} x2={160} y2={190} color={C.signal} width={2.5} dash="3 8" />
        {Array.from({ length: 11 }, (_, k) => <circle key={k} cx={160} cy={58 + k * 13} r={3} fill={C.signal} />)}
        <rect x={262} y={50} width={12} height={142} rx={4} fill={C.voltage} fillOpacity={0.4} stroke={C.voltage} strokeWidth={2} />
        {dots.slice(0, n).map((k) => {
          const u = (k * 0.618) % 1
          const x = 90 + u * 160
          return <circle key={k} cx={x} cy={72 + ((k * 37) % 100)} r={3.5} fill={C.current} opacity={x > 150 && x < 170 ? 0.5 : 0.9} />
        })}
        {[71, 160, 268].map((x) => <Ln key={x} x1={x} y1={x === 71 ? 174 : x === 160 ? 190 : 192} x2={x} y2={236} color={C.muted} width={2.5} />)}
        <T x={71} y={254} anchor="middle" size={13} bold color={C.resist}>Cathode</T>
        <T x={71} y={272} anchor="middle" size={12} color={C.muted}>heated</T>
        <T x={160} y={254} anchor="middle" size={13} bold color={C.signal}>Grid</T>
        <T x={160} y={272} anchor="middle" size={12} bold color={C.voltage}>{mi(vg)} V</T>
        <T x={268} y={254} anchor="middle" size={13} bold color={C.voltage}>Plate</T>
        <T x={268} y={272} anchor="middle" size={12} color={C.muted}>+250 V</T>
        <T x={169} y={300} anchor="middle" size={13} bold color={off ? C.muted : C.current}>{off ? 'Cutoff: no electrons reach the plate' : `electrons: ${n} of 22 shown`}</T>
        {/* plot */}
        <Ln x1={PX0} y1={PY0} x2={PX1 + 6} y2={PY0} color={C.muted} arrow />
        <Ln x1={PX0} y1={PY0} x2={PX0} y2={PY1 - 12} color={C.muted} arrow />
        <T x={PX0} y={PY1 - 24} anchor="middle" size={13} bold color={C.current}>plate current (mA)</T>
        <T x={(PX0 + PX1) / 2} y={PY0 + 36} anchor="middle" size={13} bold color={C.voltage}>grid voltage (V)</T>
        {[0, 5, 10].map((v) => <g key={v}><Ln x1={PX0 - 4} y1={py(v)} x2={PX0} y2={py(v)} color={C.muted} width={1.5} /><T x={PX0 - 8} y={py(v)} anchor="end" size={12} color={C.muted}>{v}</T></g>)}
        {[-14, -10, -5, 0].map((v) => <g key={v}><Ln x1={px(v)} y1={PY0} x2={px(v)} y2={PY0 + 5} color={C.muted} width={1.5} /><T x={px(v)} y={PY0 + 18} anchor="middle" size={12} color={C.muted}>{v}</T></g>)}
        <Ln x1={px(VCUT)} y1={PY0} x2={px(VCUT)} y2={PY0 - 40} color={C.muted} width={1.5} dash="4 4" />
        <T x={px(VCUT) + 6} y={PY0 - 52} size={12} color={C.muted}>cutoff</T>
        <polyline points={pts.join(' ')} fill="none" stroke={C.current} strokeWidth={3} strokeLinejoin="round" />
        <circle cx={px(vg)} cy={py(i)} r={7} fill={C.power} stroke={C.bg} strokeWidth={2} />
        <T x={PX0 + 16} y={PY1 + 4} size={13} bold mono color={C.current}>{fmt(i, 2)} mA</T>
        <T x={PX0 + 16} y={PY1 + 24} size={12} color={C.muted}>slope here: {fmt(slope(vg), 2)} mA per volt</T>
      </Diagram>
      <Controls>
        <Slider label="Grid voltage (relative to cathode)" value={vg} min={-14} max={0} step={0.5} onChange={setVg} format={(v) => `${mi(v)} V`} color={C.voltage} />
      </Controls>
    </>
  )
}
