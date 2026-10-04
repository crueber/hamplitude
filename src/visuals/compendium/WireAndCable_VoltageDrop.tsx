import { useState } from 'react'
import { Box, C, Choice, Controls, Diagram, Readout, Slider, T, Wire, fmt } from '../kit'

const SUPPLY = 13.8
const awgMm = (n: number) => 0.127 * Math.pow(92, (36 - n) / 39) // AWG diameter in mm
// copper at about 20 C: resistivity 1.724e-8 ohm-metre; result in ohms per foot
const ohmsPerFoot = (n: number) => (1.724e-8 / (Math.PI * (awgMm(n) / 2000) ** 2)) * 0.3048

/** Voltage lost in the two power leads between a 13.8 V supply and a radio. */
export function WireAndCable_VoltageDrop() {
  const [awg, setAwg] = useState(12)
  const [feet, setFeet] = useState(10)
  const [amps, setAmps] = useState(20)
  const r = 2 * feet * ohmsPerFoot(awg) // out and back
  const drop = amps * r
  const heat = amps * amps * r
  const pct = (drop / SUPPLY) * 100
  const col = pct <= 3 ? C.good : pct <= 6 ? C.resist : C.bad
  const th = Math.max(2, awgMm(awg) * 3)
  return (
    <>
      <Diagram w={640} h={246}
        title={`${amps} amps through ${feet} feet of AWG ${awg} wire each way loses ${fmt(drop, 2)} volts, so the radio sees ${fmt(SUPPLY - drop, 3)} volts instead of ${SUPPLY}`}
        caption="Copper at about 20 °C. Both leads count: the current goes out on one wire and returns on the other.">
        <Box x={20} y={50} w={110} h={70} label="Supply" sub={`${SUPPLY} V`} color={C.voltage} />
        <Box x={510} y={50} w={110} h={70} label="Radio" sub={`${fmt(SUPPLY - drop, 3)} V`} color={col} />
        <Wire pts={[[130, 72], [510, 72]]} color={C.voltage} width={th} />
        <Wire pts={[[130, 98], [510, 98]]} color={C.ink} width={th} />
        <T x={320} y={50} anchor="middle" size={13} bold color={C.muted}>{feet} ft each way · AWG {awg}</T>
        <T x={320} y={122} anchor="middle" size={13} color={C.muted}>{amps} A flows through both wires</T>
        <T x={20} y={162} size={13} color={C.muted}>wire resistance (round trip)</T>
        <T x={20} y={186} size={20} bold mono color={C.resist}>{fmt(r * 1000, 3)} mΩ</T>
        <T x={250} y={162} size={13} color={C.muted}>voltage lost</T>
        <T x={250} y={186} size={20} bold mono color={col}>{fmt(drop, 2)} V ({fmt(pct, 2)}%)</T>
        <T x={470} y={162} size={13} color={C.muted}>heat in the wire</T>
        <T x={470} y={186} size={20} bold mono color={C.power}>{fmt(heat, 3)} W</T>
        <T x={20} y={218} size={12} color={C.muted}>This shows voltage drop only. Whether the wire may carry the current safely is a</T>
        <T x={20} y={234} size={12} color={C.muted}>separate rating: see the wire gauge and fusing reference.</T>
      </Diagram>
      <Controls>
        <Choice label="Wire gauge (AWG)" value={awg} onChange={setAwg} options={[8, 10, 12, 14, 16, 18].map((n) => ({ value: n, label: `AWG ${n}` }))} />
        <Slider label="Length, one way" value={feet} min={1} max={30} onChange={setFeet} format={(v) => `${v} ft`} color={C.resist} />
        <Slider label="Current" value={amps} min={1} max={40} onChange={setAmps} format={(v) => `${v} A`} color={C.current} />
        <Readout label="Voltage at radio" value={`${fmt(SUPPLY - drop, 3)} V`} color={col} />
      </Controls>
    </>
  )
}
