import { useState } from 'react'
import { C, Choice, Controls, Diagram, Ln, Readout, Slider, T } from '../kit'

// Copper resistance in ohms per 1000 ft at about 20 C (standard wire tables)
const OHMS_PER_KFT: Record<number, number> = { 14: 2.525, 12: 1.588, 10: 0.9989, 8: 0.6282, 6: 0.3951 }
const V = 13.8

/** Voltage lost in the DC power cable: current times the resistance of both wires (out and back). */
export function ShackPowerSupplies_WireDrop() {
  const [awg, setAwg] = useState(12)
  const [len, setLen] = useState(6)
  const [amps, setAmps] = useState(20)
  const r = (OHMS_PER_KFT[awg] / 1000) * 2 * len
  const drop = amps * r
  const lost = amps * drop
  const at = V - drop
  const pct = (drop / V) * 100
  const col = pct <= 3 ? C.good : pct <= 5 ? C.resist : C.bad
  const th = Math.max(3, 16 - (awg - 6) * 1.5)
  return (
    <>
      <Diagram w={640} h={200}
        title={`A 13.8 volt supply sends ${amps} amperes through two ${len} foot lengths of ${awg} gauge wire, losing ${drop.toFixed(2)} volts, so the radio sees ${at.toFixed(2)} volts`}
        caption="Copper wire at about 20 °C. The resistance of both wires counts: the red one out and the black one back.">
        <rect x={20} y={54} width={130} height={92} rx={12} fill={C.fill} stroke={C.voltage} strokeWidth={3} />
        <T x={85} y={92} anchor="middle" size={15} bold>Supply</T>
        <T x={85} y={116} anchor="middle" size={13} color={C.muted}>13.8 V</T>
        <rect x={490} y={54} width={130} height={92} rx={12} fill={C.fill} stroke={C.signal} strokeWidth={3} />
        <T x={555} y={92} anchor="middle" size={15} bold>Radio</T>
        <T x={555} y={116} anchor="middle" size={13} bold color={col}>{`${at.toFixed(2)} V`}</T>
        <Ln x1={150} y1={80} x2={490} y2={80} color={C.voltage} width={th} />
        <Ln x1={150} y1={122} x2={490} y2={122} color={C.ink} width={th} />
        <T x={320} y={56} anchor="middle" size={13} bold color={C.voltage}>{`+ ${amps} A, ${len} ft`}</T>
        <T x={320} y={148} anchor="middle" size={13} bold>{`− ${len} ft back`}</T>
        <T x={320} y={178} anchor="middle" size={13} bold color={col}>{`${drop.toFixed(2)} V lost (${pct.toFixed(1)} %) as heat in the wire`}</T>
      </Diagram>
      <Controls>
        <Choice label="Wire gauge (AWG)" value={awg} onChange={setAwg}
          options={[14, 12, 10, 8, 6].map((n) => ({ value: n, label: `${n} AWG` }))} />
        <Slider label="One-way cable length" value={len} min={1} max={20} onChange={setLen} format={(v) => `${v} ft`} color="var(--d-resist)" />
        <Slider label="Transmit current" value={amps} min={5} max={40} onChange={setAmps} format={(v) => `${v} A`} color="var(--d-current)" />
        <Readout label="Voltage at the radio" value={at.toFixed(2)} unit=" V" color={col} />
        <Readout label="Heat in the wire" value={lost.toFixed(1)} unit=" W" color="var(--d-power)" />
      </Controls>
    </>
  )
}
