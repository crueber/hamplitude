import { useState } from 'react'
import { C, Choice, Controls, Diagram, Ln, Readout, Slider, T, fmt } from '../kit'

const PRE = [3.55, 14.25, 28.5]
const lo = 3.5, hi = 30
const pOf = (f: number) => Math.log(f / lo) / Math.log(hi / lo)

/** Half-wave dipole = 468 / f(MHz) feet; quarter-wave monopole = 234 / f. */
export function G9B_DipoleLength() {
  const [p, setP] = useState(pOf(14.25))
  const f = Math.round(lo * Math.pow(hi / lo, p) * 100) / 100
  const dip = 468 / f, mono = 234 / f
  const px = 3.6
  const x0 = 60
  const preset = PRE.find((v) => Math.abs(v - f) < 0.02) ?? -1
  return (
    <>
      <Diagram w={640} h={230} title={`At ${fmt(f, 4)} megahertz a half-wave dipole is about ${fmt(dip, 3)} feet and a quarter-wave monopole about ${fmt(mono, 3)} feet`}
        caption="Bars are drawn to the same scale. Half the wavelength, half the wire: the monopole is exactly half a dipole.">
        <T x={x0} y={24} size={13} bold color={C.muted}>Half-wave dipole</T>
        <Ln x1={x0} y1={60} x2={x0 + dip * px} y2={60} color={C.voltage} width={7} />
        <circle cx={x0 + (dip * px) / 2} cy={60} r={5} fill={C.ink} />
        <T x={x0 + dip * px + 10} y={60} size={14} bold color={C.voltage}>{fmt(dip, 3)} ft</T>
        <T x={x0} y={90} size={13} color={C.muted}>= 468 ÷ {fmt(f, 4)} MHz</T>
        <T x={x0} y={136} size={13} bold color={C.muted}>Quarter-wave monopole</T>
        <Ln x1={x0} y1={172} x2={x0 + mono * px} y2={172} color={C.signal} width={7} />
        <T x={x0 + mono * px + 10} y={172} size={14} bold color={C.signal}>{fmt(mono, 3)} ft</T>
        <T x={x0} y={202} size={13} color={C.muted}>= 234 ÷ {fmt(f, 4)} MHz</T>
      </Diagram>
      <Controls>
        <Slider label="Frequency" value={p} min={0} max={1} step={0.002} onChange={setP} format={() => `${fmt(f, 4)} MHz`} color="var(--d-signal)" />
        <Readout label="Dipole 468 ÷ f" value={fmt(dip, 3)} unit=" ft" color="var(--d-voltage)" />
        <Readout label="Monopole 234 ÷ f" value={fmt(mono, 3)} unit=" ft" color="var(--d-signal)" />
      </Controls>
      <div style={{ margin: '-6px 0 14px' }}>
        <Choice label="Presets" value={preset} onChange={(v) => setP(pOf(v))} options={PRE.map((v) => ({ value: v, label: `${v} MHz` }))} />
      </div>
    </>
  )
}
