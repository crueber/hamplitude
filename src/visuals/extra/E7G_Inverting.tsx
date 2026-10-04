import { useState } from 'react'
import { C, Choice, Controls, Diagram, Dot, Ground, Ln, Resistor, Slider, T, Wire, fmt, si } from '../kit'
import { OpAmpSymbol } from '../shared/OpAmpSymbol'

const PARTS = [10, 22, 47, 100, 220, 470, 1000, 1800, 2200, 3300, 4700, 10000, 22000, 47000, 68000, 100000]
const PRESETS: { r1: number; rf: number }[] = [
  { r1: 10, rf: 470 },
  { r1: 1000, rf: 10000 },
  { r1: 1800, rf: 68000 },
  { r1: 3300, rf: 47000 },
]
const ohm = (v: number) => si(v, 'Ω')
const m = (s: string) => s.replace('-', '−')

/** Figure E7-3: the inverting amplifier. Gain = −RF ÷ R1. */
export function Inverting() {
  const [i1, setI1] = useState(PARTS.indexOf(1000))
  const [i2, setI2] = useState(PARTS.indexOf(10000))
  const [vin, setVin] = useState(0.23)
  const r1 = PARTS[i1], rf = PARTS[i2]
  const gain = -rf / r1
  const vout = vin * gain
  const cur = vin / r1
  const clip = Math.abs(vout) > 12
  const preset = PRESETS.findIndex((p) => p.r1 === r1 && p.rf === rf)
  const A = 195 // node x
  return (
    <>
      <Diagram w={640} h={372}
        title={`Inverting amplifier from figure E7-3 with R1 ${ohm(r1)} and RF ${ohm(rf)}: gain is minus RF over R1, ${fmt(gain)}. ${vin} volts in gives ${fmt(vout)} volts out.`}
        caption="Plus input at ground, so the minus input sits at about 0 V. The input current has nowhere to go but through RF.">
        {/* input terminal and R1 */}
        <circle cx={28} cy={150} r={8} fill={C.bg} stroke={C.ink} strokeWidth={2.2} />
        <Wire pts={[[36, 150], [A, 150]]} />
        <Resistor x={110} y={150} len={80} label={`R1 = ${ohm(r1)}`} />
        <Dot x={A} y={150} />
        <Ln x1={42} y1={150} x2={64} y2={150} color={C.current} width={2} arrow />
        <T x={28} y={174} anchor="middle" size={13} bold color={C.voltage}>Vin</T>
        {/* RF feedback path */}
        <Wire pts={[[A, 150], [A, 60], [420, 60], [420, 180]]} />
        <Resistor x={300} y={60} len={100} label={`RF = ${ohm(rf)}`} />
        <Ln x1={366} y1={60} x2={400} y2={60} color={C.current} width={2} arrow />
        {/* op-amp */}
        <OpAmpSymbol x={235} y={180} w={150} h={140} />
        <Wire pts={[[A, 150], [235, 150]]} />
        <Wire pts={[[235, 210], [A, 210], [A, 238]]} />
        <Dot x={A} y={210} />
        <Ground x={A} y={238} />
        <Wire pts={[[385, 180], [500, 180]]} />
        <Dot x={420} y={180} />
        <circle cx={508} cy={180} r={8} fill={C.bg} stroke={C.ink} strokeWidth={2.2} />
        <T x={508} y={204} anchor="middle" size={13} bold color={C.voltage}>Vout</T>
        <T x={A - 8} y={174} anchor="end" size={12} color={C.muted}>≈ 0 V</T>
        {/* working */}
        <rect x={14} y={268} width={612} height={94} rx={12} fill={C.fill} />
        <T x={28} y={288} size={14} mono><tspan fill={C.current} fontWeight={700}>I</tspan> = Vin ÷ R1 = {fmt(vin)} V ÷ {ohm(r1)} = {si(cur, 'A')}</T>
        <T x={28} y={314} size={14} mono>Vout = −I × RF = −{si(cur, 'A')} × {ohm(rf)} = <tspan fill={clip ? C.muted : C.voltage} fontWeight={700}>{m(fmt(vout))} V</tspan></T>
        <T x={28} y={340} size={14} mono>Gain = −RF ÷ R1 = −{fmt(rf)} ÷ {fmt(r1)} = <tspan fill={C.power} fontWeight={700}>{m(fmt(gain))}</tspan></T>
        {clip && <T x={612} y={314} anchor="end" size={12} color={C.bad}>real output would clip at the supply</T>}
      </Diagram>
      <Controls>
        <Slider label="R1" value={i1} min={0} max={PARTS.length - 1} onChange={setI1} format={(v) => ohm(PARTS[v])} color="var(--d-resist)" />
        <Slider label="RF" value={i2} min={0} max={PARTS.length - 1} onChange={setI2} format={(v) => ohm(PARTS[v])} color="var(--d-resist)" />
        <Slider label="Input voltage" value={vin} min={0.05} max={1} step={0.01} onChange={setVin} format={(v) => `${v.toFixed(2)} V`} color="var(--d-voltage)" />
        <div>
          <span className="ctl-label" style={{ display: 'block', marginBottom: 6 }}>Try these (R1 / RF)</span>
          <Choice label="Examples" value={preset} onChange={(k) => { if (k >= 0) { setI1(PARTS.indexOf(PRESETS[k].r1)); setI2(PARTS.indexOf(PRESETS[k].rf)) } }}
            options={PRESETS.map((p, k) => ({ value: k, label: `${si(p.r1, 'Ω', 2)} / ${si(p.rf, 'Ω', 2)}` }))} />
        </div>
      </Controls>
    </>
  )
}
