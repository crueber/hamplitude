import { useState } from 'react'
import { Battery, C, Capacitor, Controls, Diagram, Ln, Readout, Resistor, Slider, T, Wire, fmt } from '../kit'

const VS = 10 // supply volts
const R = 10e3 // ohms

/** Charging an RC circuit, scrubbed in time constants: capacitor voltage climbs, current falls. */
export function TimeConstants_RcCharge() {
  const [n, setN] = useState(1)
  const vc = VS * (1 - Math.exp(-n))
  const i = (VS / R) * Math.exp(-n) * 1000 // mA
  const PX = 340, PW = 270, PT = 44, PH = 180, PB = PT + PH, NT = 5
  const xt = (k: number) => PX + (k / NT) * PW
  const yv = (p: number) => PB - p * PH
  const curve = (fn: (k: number) => number) => Array.from({ length: 101 }, (_, j) => { const k = (NT * j) / 100; return `${xt(k).toFixed(1)},${yv(fn(k)).toFixed(1)}` }).join(' ')
  const fill = 1 - Math.exp(-n)
  return (
    <>
      <Diagram w={640} h={300}
        title={`Charging a capacitor through a resistor: after ${fmt(n)} time constants the capacitor is at ${fmt(vc, 3)} volts of ${VS} and the current has fallen to ${fmt(i, 3)} milliamps.`}
        caption="Illustrative: 10 V supply, 10 kΩ, 100 µF, so one time constant is 1 s. The shape is the same for any R and C.">
        <Wire pts={[[100, 150], [100, 80], [135, 80]]} />
        <Wire pts={[[205, 80], [250, 80], [250, 130]]} />
        <Wire pts={[[250, 170], [250, 220], [100, 220], [100, 190]]} />
        <Battery x={100} y={170} rot={90} len={40} cells={1} />
        <Resistor x={170} y={80} len={70} label="R = 10 kΩ" />
        <Capacitor x={250} y={150} rot={90} len={40} label="C" />
        <T x={250} y={238} anchor="middle" size={12} color={C.muted} mono>100 µF</T>
        <T x={64} y={170} anchor="end" size={13} bold color={C.voltage}>10 V</T>
        <T x={175} y={268} anchor="middle" size={12} color={C.muted}>switch closed at t = 0</T>
        <rect x={286} y={110} width={16} height={80} rx={3} fill="none" stroke={C.muted} strokeWidth={1.5} />
        <rect x={286} y={190 - 80 * fill} width={16} height={80 * fill} rx={3} fill={C.voltage} opacity={0.85} />
        <T x={294} y={100} anchor="middle" size={12} color={C.muted}>Vc</T>
        <Ln x1={PX} y1={PB} x2={PX + PW} y2={PB} color={C.muted} width={1.5} />
        <Ln x1={PX} y1={PT - 6} x2={PX} y2={PB} color={C.muted} width={1.5} />
        {[0, 1, 2, 3, 4, 5].map((k) => <T key={k} x={xt(k)} y={PB + 15} anchor="middle" size={12} color={C.muted}>{k}τ</T>)}
        <T x={PX - 8} y={yv(1)} anchor="end" size={12} color={C.muted}>100%</T>
        <T x={PX - 8} y={yv(0)} anchor="end" size={12} color={C.muted}>0</T>
        <polyline points={curve((k) => 1 - Math.exp(-k))} fill="none" stroke={C.voltage} strokeWidth={3.5} strokeLinecap="round" />
        <polyline points={curve((k) => Math.exp(-k))} fill="none" stroke={C.current} strokeWidth={3.5} strokeLinecap="round" />
        <Ln x1={xt(n)} y1={PT - 6} x2={xt(n)} y2={PB} color={C.ink} width={1.5} dash="4 4" />
        <circle cx={xt(n)} cy={yv(1 - Math.exp(-n))} r={6} fill={C.voltage} stroke={C.bg} strokeWidth={2.5} />
        <circle cx={xt(n)} cy={yv(Math.exp(-n))} r={6} fill={C.current} stroke={C.bg} strokeWidth={2.5} />
        <T x={PX} y={22} size={13} bold color={C.voltage}>capacitor voltage</T>
        <T x={PX + PW} y={22} anchor="end" size={13} bold color={C.current}>current</T>
        <T x={PX + PW / 2} y={PB + 38} anchor="middle" size={12} color={C.muted}>time since the switch closed</T>
      </Diagram>
      <Controls>
        <Slider label="Time since switch closed" value={n} min={0} max={5} step={0.05} onChange={setN} format={(v) => `${fmt(v)} τ (${fmt(v)} s)`} color="var(--d-signal)" />
        <Readout label="Capacitor voltage" value={fmt(vc, 3)} unit={` V (${fmt((vc / VS) * 100, 3)}%)`} color="var(--d-voltage)" />
        <Readout label="Current" value={fmt(i, 3)} unit=" mA" color="var(--d-current)" />
      </Controls>
    </>
  )
}
