import { useState } from 'react'
import { C, Controls, Diagram, Dot, Ground, Ln, Resistor, Slider, T, Transistor, Wire, fmt, si } from '../kit'

const VCC = 12, RC = 1000, VSAT = 0.2
const IMAX = 150 // µA, plot range
const PX0 = 380, PX1 = 610, PY0 = 214, PY1 = 50
const px = (ib: number) => PX0 + (ib / IMAX) * (PX1 - PX0)
const py = (v: number) => PY0 - (v / VCC) * (PY0 - PY1)

/** NPN transistor with a collector resistor: base current sets collector current, up to saturation. Illustrative values. */
export function BipolarTransistors_Bias() {
  const [ibu, setIb] = useState(40) // µA
  const [beta, setBeta] = useState(100)
  const isat = (VCC - VSAT) / RC // A
  const ib = ibu * 1e-6
  const icRaw = beta * ib
  const sat = icRaw >= isat
  const ic = Math.min(icRaw, isat)
  const vout = VCC - ic * RC
  const state = ibu === 0 ? 'Cutoff: off' : sat ? 'Saturation: fully on' : 'Active: amplifying'
  const stateCol = ibu === 0 ? C.muted : sat ? C.good : C.signal
  const ibSat = (isat / beta) * 1e6
  const pts = (ibSat < IMAX ? [0, ibSat, IMAX] : [0, IMAX]).map((x) => [px(x), py(Math.max(VSAT, VCC - beta * x * 1e-6 * RC))])
  return (
    <>
      <Diagram w={640} h={350}
        title={`An NPN transistor with a 12 volt supply and 1 kilohm collector resistor. With base current ${ibu} microamps and beta ${beta}, collector current is ${si(ic, 'A', 3)} and the output is ${fmt(vout, 3)} volts. The transistor is in ${state}.`}
        caption="Illustrative values (12 V supply, 1 kΩ load). Small base current steers a much larger collector current, until the load limits it.">
        {/* circuit */}
        <Wire pts={[[164, 22], [164, 60]]} />
        <T x={176} y={22} size={13} bold color={C.voltage}>+12 V</T>
        <Resistor x={164} y={90} rot={90} len={60} />
        <T x={186} y={90} size={13} bold color={C.resist}>Rc 1 kΩ</T>
        <Wire pts={[[164, 120], [164, 150]]} />
        <Dot x={164} y={135} />
        <Wire pts={[[164, 135], [250, 135]]} />
        <T x={258} y={135} size={13} bold color={C.voltage}>Vout</T>
        <Transistor x={150} y={190} kind="npn" parts />
        <Wire pts={[[164, 230], [164, 250]]} />
        <Ground x={164} y={250} />
        <Wire pts={[[120, 190], [50, 190]]} />
        <Ln x1={58} y1={176} x2={96} y2={176} color={C.current} width={2.5} arrow />
        <T x={20} y={156} size={13} bold color={C.current}>Ib = {ibu} µA</T>
        <T x={20} y={176} size={12} color={C.muted}>base</T>
        <Ln x1={226} y1={150} x2={226} y2={200} color={C.current} width={2.5} arrow />
        <T x={236} y={160} size={13} bold color={C.current}>Ic</T>
        <T x={236} y={180} size={12} mono color={C.current}>{si(ic, 'A', 3)}</T>
        {/* plot */}
        <Ln x1={PX0} y1={PY0} x2={PX1 + 6} y2={PY0} color={C.muted} arrow />
        <Ln x1={PX0} y1={PY0} x2={PX0} y2={PY1 - 12} color={C.muted} arrow />
        <T x={PX0 - 8} y={PY1 - 22} size={13} bold color={C.voltage} anchor="middle">Vout</T>
        <T x={(PX0 + PX1) / 2} y={PY0 + 34} anchor="middle" size={13} bold color={C.current}>base current Ib (µA)</T>
        {[0, 6, 12].map((v) => <g key={v}><Ln x1={PX0 - 4} y1={py(v)} x2={PX0} y2={py(v)} color={C.muted} width={1.5} /><T x={PX0 - 10} y={py(v)} anchor="end" size={12} color={C.muted}>{v}</T></g>)}
        {[0, 50, 100, 150].map((x) => <g key={x}><Ln x1={px(x)} y1={PY0} x2={px(x)} y2={PY0 + 5} color={C.muted} width={1.5} /><T x={px(x)} y={PY0 + 17} anchor="middle" size={12} color={C.muted}>{x}</T></g>)}
        <rect x={px(ibSat)} y={PY1} width={Math.max(0, PX1 - px(ibSat))} height={PY0 - PY1} fill={C.good} opacity={0.12} />
        {ibSat < IMAX - 25 && <T x={(px(ibSat) + PX1) / 2} y={PY1 + 12} anchor="middle" size={12} bold color={C.good}>saturated</T>}
        <T x={px(ibSat / 2) + 30} y={PY0 - 14} anchor="middle" size={12} bold color={C.signal}>active</T>
        <polyline points={pts.map((p) => p.join(',')).join(' ')} fill="none" stroke={C.voltage} strokeWidth={3} strokeLinejoin="round" />
        <Ln x1={px(ibu)} y1={PY0} x2={px(ibu)} y2={py(vout)} color={C.muted} width={1.5} dash="4 4" />
        <circle cx={px(ibu)} cy={py(vout)} r={7} fill={C.power} stroke={C.bg} strokeWidth={2} />
        {/* working */}
        <rect x={14} y={274} width={612} height={64} rx={12} fill={C.fill} />
        <T x={28} y={292} size={13.5} mono>Ic = β × Ib = {beta} × {ibu} µA = {sat ? <tspan>{si(icRaw, 'A', 3)}, capped at <tspan fill={C.good} fontWeight={700}>{si(isat, 'A', 3)}</tspan></tspan> : <tspan fill={C.current} fontWeight={700}>{si(ic, 'A', 3)}</tspan>}</T>
        <T x={28} y={316} size={13.5} mono>Vout = 12 − Ic × 1 kΩ = <tspan fill={C.voltage} fontWeight={700}>{fmt(vout, 3)} V</tspan></T>
        <T x={612} y={316} anchor="end" size={13.5} bold color={stateCol}>{state}</T>
      </Diagram>
      <Controls>
        <Slider label="Base current Ib" value={ibu} min={0} max={150} step={1} onChange={setIb} format={(v) => `${v} µA`} color={C.current} />
        <Slider label="Current gain β (varies part to part)" value={beta} min={50} max={300} step={10} onChange={setBeta} format={(v) => `${v}`} color={C.power} />
      </Controls>
    </>
  )
}
