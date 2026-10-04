import { useState } from 'react'
import { C, Controls, Diagram, Ln, Readout, Slider, T, Ground, Box } from '../kit'

const V = 13.8, I = 12

/** The radio draws about 12 A: resistance in the power wires drops voltage right when you transmit. */
export function PowerFeed() {
  const [r, setR] = useState(0.02)
  const drop = I * r
  const at = V - drop
  const w = 12 - 55 * r // line thickness: thicker for lower resistance
  const thick = Math.max(2, Math.min(11, w))
  const col = at > 13.2 ? C.good : at > 12.4 ? C.resist : C.bad
  return (
    <>
      <Diagram w={640} h={250} title={`A 13.8 volt supply feeds a transceiver drawing 12 amperes through power wires with ${r.toFixed(2)} ohms of resistance, so the radio sees ${at.toFixed(1)} volts`}
        caption="Illustrative values: 12 A flows when a 50 W FM radio transmits.">
        <Box x={30} y={70} w={150} h={110} label="Battery" sub="13.8 V" color={C.voltage} />
        <Box x={460} y={70} w={150} h={110} label="Transceiver" sub="50 W FM" color={C.signal} />
        <Ln x1={180} y1={100} x2={460} y2={100} color={C.voltage} width={thick} />
        <Ln x1={180} y1={150} x2={400} y2={150} color={C.ink} width={thick} />
        <Ln x1={400} y1={150} x2={460} y2={150} color={C.ink} width={thick} />
        <T x={320} y={78} anchor="middle" size={13} bold color={C.voltage}>+ red, about 12 A</T>
        <T x={320} y={174} anchor="middle" size={13} bold>negative</T>
        <Ground x={110} y={180} />
        <T x={110} y={216} anchor="middle" size={13} color={C.muted}>battery / chassis ground</T>
        <T x={535} y={216} anchor="middle" size={13} bold color={col}>{at.toFixed(1)} V at the radio</T>
      </Diagram>
      <Controls>
        <Slider label="Wire (short and heavy to long and thin)" value={r} min={0.01} max={0.2} step={0.01} onChange={setR} format={(v) => `${v.toFixed(2)} Ω`} color="var(--d-resist)" />
        <Readout label="Voltage lost in wires" value={drop.toFixed(1)} unit="V" color={col} />
      </Controls>
    </>
  )
}
