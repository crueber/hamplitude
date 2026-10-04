import { useState } from 'react'
import { C, Choice, Controls, Diagram, Ln, Readout, Slider, T, fmt } from '../kit'

const AWG = [14, 12, 10, 8, 6] as const
/** Conservative current ratings for copper building wiring. */
const RATING: Record<number, number> = { 14: 15, 12: 20, 10: 30, 8: 40, 6: 55 }
const ohmsPerFt = (n: number) => {
  const mm = 0.127 * 92 ** ((36 - n) / 39)
  return (1.724e-8 * 0.3048) / ((Math.PI / 4) * (mm * 1e-3) ** 2)
}

/** Voltage lost in the two power leads of a 13.8 V radio: V = I x R, with R from the AWG diameter formula. */
export function WireGaugeAndFusing_Drop() {
  const [awg, setAwg] = useState<number>(12)
  const [amps, setAmps] = useState(20)
  const [ft, setFt] = useState(10)
  const Vs = 13.8
  const R = ohmsPerFt(awg) * ft * 2
  const drop = amps * R
  const vr = Vs - drop
  const heat = amps * amps * R
  const over = amps > RATING[awg]
  const x0 = 190, W = 330
  return (
    <>
      <Diagram w={640} h={196} title={`A 13.8 volt supply feeding ${amps} amps through ${ft} feet of AWG ${awg} wire each way: ${fmt(drop, 3)} volts are lost in the wire, so the radio sees ${fmt(vr, 4)} volts, and the wire dissipates ${fmt(heat, 3)} watts.`}
        caption="The wire is a resistor in series with the radio. Resistance is from the AWG diameter formula (copper, 20 °C); the run is out and back, so twice the length.">
        <T x={14} y={34} size={13.5} bold>At the supply</T>
        <rect x={x0} y={18} width={W} height={32} rx={6} fill={C.voltage} fillOpacity={0.85} />
        <T x={x0 + W + 12} y={34} size={14} bold>13.8 V</T>
        <T x={14} y={90} size={13.5} bold>At the radio</T>
        <rect x={x0} y={74} width={W} height={32} rx={6} fill={C.fill} />
        <rect x={x0} y={74} width={(W * vr) / Vs} height={32} rx={6} fill={C.voltage} fillOpacity={0.85} />
        <rect x={x0 + (W * vr) / Vs} y={74} width={(W * drop) / Vs} height={32} fill={C.resist} />
        <T x={x0 + W + 12} y={90} size={14} bold>{fmt(vr, 4)} V</T>
        <Ln x1={x0 + W - 1} y1={108} x2={x0 + W - 1} y2={120} color={C.resist} width={2.5} />
        <T x={x0 + W} y={134} anchor="end" size={13} bold>lost in the wire (amber): {fmt(drop, 3)} V, {fmt((drop / Vs) * 100, 3)} %</T>
        <T x={14} y={166} size={13}>Heat in the wire: <tspan fontWeight={700}>{fmt(heat, 3)} W</tspan></T>
        <T x={14} y={186} size={13} color={over ? C.bad : C.muted}>
          {over ? `Over the conservative ${RATING[awg]} A rating for AWG ${awg}: use thicker wire.` : `Within the conservative ${RATING[awg]} A rating for AWG ${awg} building wire.`}
        </T>
      </Diagram>
      <Controls>
        <Choice label="Wire gauge" value={awg} onChange={setAwg} options={AWG.map((a) => ({ value: a, label: `${a} AWG` }))} />
        <Slider label="Current" value={amps} min={5} max={30} step={1} onChange={setAmps} format={(v) => `${v} A`} color="var(--d-current)" />
        <Slider label="Run length, one way" value={ft} min={2} max={30} step={1} onChange={setFt} format={(v) => `${v} ft`} color="var(--d-resist)" />
        <Readout label="Wire resistance" value={fmt(R * 1000, 3)} unit=" mΩ" />
      </Controls>
    </>
  )
}
