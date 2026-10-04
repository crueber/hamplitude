import { useState } from 'react'
import { C, Choice, Controls, Diagram, Ln, Resistor, T, TAU, Wire } from '../kit'

const POWERS = [5, 50, 100, 500, 1500]
const R = 50
const f1 = (v: number) => (v >= 100 ? v.toFixed(0) : v.toFixed(1))

/** A steady carrier into 50 ohms: P = V² ÷ R, so the voltage is set by the power. A scope across the load would see this wave. */
export function DummyLoads_Voltage() {
  const [p, setP] = useState(100)
  const vrms = Math.sqrt(p * R)
  const vpk = vrms * Math.SQRT2
  const vpp = vpk * 2
  const irms = Math.sqrt(p / R)
  const wx0 = 460, wx1 = 610, wy = 104, wa = 62
  const pts: string[] = []
  for (let i = 0; i <= 120; i++) pts.push(`${i ? 'L' : 'M'}${(wx0 + ((wx1 - wx0) * i) / 120).toFixed(1)},${(wy - wa * Math.sin(TAU * 2 * (i / 120))).toFixed(1)}`)
  const rr = wa / Math.SQRT2
  return (
    <>
      <Diagram w={640} h={268}
        title={`A steady ${p} watt carrier into a 50 ohm dummy load is ${f1(vrms)} volts RMS, ${f1(vpk)} volts peak and ${f1(vpp)} volts peak-to-peak, with ${irms.toFixed(2)} amps of current.`}
        caption="Same power, three ways to state the voltage. A scope shows peak-to-peak; a meter reads RMS.">
        <rect x={14} y={60} width={92} height={60} rx={10} fill={C.fill} stroke={C.ink} strokeWidth={2} />
        <T x={60} y={90} anchor="middle" size={13} bold>Transmitter</T>
        <Wire pts={[[106, 90], [160, 90]]} />
        <Resistor x={190} y={90} len={60} />
        <Wire pts={[[220, 90], [260, 90], [260, 160], [60, 160], [60, 120]]} />
        <T x={190} y={62} anchor="middle" size={13} bold color={C.resist}>50 Ω load</T>
        <T x={190} y={122} anchor="middle" size={12.5} color={C.muted}>power becomes heat</T>
        <T x={20} y={196} size={14} bold color={C.power}>{`${p} W`}</T>
        <T x={20} y={218} size={13} color={C.muted}>{`V = √(P × R) = √(${p} × 50)`}</T>
        <T x={20} y={238} size={13} color={C.muted}>{`I = √(P ÷ R) = ${irms.toFixed(2)} A`}</T>
        <rect x={330} y={30} width={290} height={150} rx={10} fill={C.fill} />
        <Ln x1={wx0} y1={wy} x2={wx1} y2={wy} color={C.muted} width={1} dash="3 4" />
        <path d={pts.join('')} fill="none" stroke={C.signal} strokeWidth={3} />
        <Ln x1={wx0} y1={wy - wa} x2={wx1} y2={wy - wa} color={C.voltage} width={1.5} dash="5 4" />
        <Ln x1={wx0} y1={wy + wa} x2={wx1} y2={wy + wa} color={C.voltage} width={1.5} dash="5 4" />
        <Ln x1={wx0} y1={wy - rr} x2={wx1} y2={wy - rr} color={C.resist} width={1.5} dash="2 4" />
        <T x={338} y={wy - wa} size={12} bold color={C.voltage}>{`peak ${f1(vpk)} V`}</T>
        <T x={338} y={wy - rr} size={12} bold color={C.resist}>{`RMS ${f1(vrms)} V`}</T>
        <T x={338} y={wy + wa} size={12} bold color={C.voltage}>{`peak-to-peak ${f1(vpp)} V`}</T>
        <T x={480} y={204} anchor="middle" size={12.5} color={C.muted}>the carrier waveform (a sine wave)</T>
      </Diagram>
      <Controls>
        <Choice label="Transmitter power" value={p} onChange={setP} options={POWERS.map((v) => ({ value: v, label: `${v} W` }))} />
      </Controls>
    </>
  )
}
