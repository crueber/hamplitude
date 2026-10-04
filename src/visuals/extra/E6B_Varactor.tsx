import { useState } from 'react'
import { C, Controls, Diagram, Ln, Readout, Slider, T, fmt } from '../kit'

/** Varactor: reverse voltage widens the depletion region, which acts like a wider gap between capacitor plates. */
export function Varactor() {
  const [v, setV] = useState(4)
  const w = Math.sqrt(1 + v / 0.7) // relative depletion width
  const cap = 1 / w // relative capacitance (1 at zero bias)
  const dw = 34 + w * 22
  const mid = 210
  return (
    <>
      <Diagram w={640} h={236}
        title={`A varactor with ${v} volts of reverse bias. The depletion region is ${fmt(w, 2)} times as wide as at zero bias, so capacitance falls to ${fmt(cap * 100, 2)} percent.`}
        caption="Reverse voltage widens the depletion layer, like moving capacitor plates apart: less capacitance.">
        <rect x={50} y={60} width={mid - 50} height={90} fill={C.resist} opacity={0.2} />
        <rect x={mid} y={60} width={370 - mid} height={90} fill={C.current} opacity={0.2} />
        <rect x={mid - dw / 2} y={60} width={dw} height={90} fill={C.fill2} />
        <rect x={50} y={60} width={320} height={90} fill="none" stroke={C.ink} strokeWidth={2} />
        <T x={100} y={105} anchor="middle" bold size={16} color={C.resist}>P</T>
        <T x={320} y={105} anchor="middle" bold size={16} color={C.current}>N</T>
        <T x={mid} y={105} anchor="middle" size={12} bold color={C.muted}>insulating</T>
        <Ln x1={mid - dw / 2} y1={168} x2={mid + dw / 2} y2={168} width={2} arrow="both" color={C.muted} />
        <T x={mid} y={188} anchor="middle" size={13} color={C.muted}>depletion region</T>
        <T x={210} y={36} anchor="middle" size={14} bold color={C.voltage}>reverse bias {v} V</T>
        <T x={210} y={216} anchor="middle" size={13} color={C.muted}>the two charged sides act as capacitor plates</T>

        <T x={500} y={36} anchor="middle" size={14} bold>Capacitance</T>
        <rect x={470} y={50} width={60} height={150} rx={6} fill={C.fill} />
        <rect x={470} y={200 - 150 * cap} width={60} height={150 * cap} rx={6} fill={C.power} />
        <T x={500} y={218} anchor="middle" size={13} bold color={C.power}>{fmt(cap * 100, 2)}% of zero-bias</T>
      </Diagram>
      <Controls>
        <Slider label="Reverse voltage" value={v} min={0} max={20} step={1} onChange={setV} format={(x) => `${x} V`} color={C.voltage} />
        <Readout label="Relative capacitance" value={fmt(cap, 2)} color={C.power} />
      </Controls>
    </>
  )
}
