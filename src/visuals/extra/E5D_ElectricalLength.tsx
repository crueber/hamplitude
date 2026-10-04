import { useState } from 'react'
import { C, Choice, Controls, Diagram, Ln, Readout, Slider, T, fmt, sinePath, si } from '../kit'

const PRE = [7, 146, 440, 10000] // MHz

/** Electrical length: a wire's length measured in wavelengths. Phase shift along it = 360° x L / λ. */
export function E5D_ElectricalLength() {
  const [lcm, setL] = useState(10)
  const [e, setE] = useState(Math.log10(146)) // log10(MHz)
  const fMHz = 10 ** e
  const lam = 299.8 / fMHz // metres
  const len = lcm / 100
  const frac = len / lam
  const phase = 360 * frac
  const preset = PRE.find((p) => Math.abs(Math.log10(p) - e) < 0.006) ?? 0
  const PX = 30, PW = 580
  const win = Math.max(1, frac) // wavelengths shown
  const wirePx = (frac / win) * PW
  const wy = 190
  return (
    <>
      <Diagram w={640} h={290} title={`A ${lcm} centimetre wire at ${si(fMHz * 1e6, 'Hz')} is ${fmt(frac, 3)} of a wavelength, so the signal shifts ${fmt(phase, 3)} degrees along it.`}
        caption="Short wire at low frequency: no shift. The same wire at microwave frequencies spans many wavelengths.">
        <path d={sinePath(PX, PX + PW, 90, 42, win, 0, 400)} fill="none" stroke={C.signal} strokeWidth={2.5} />
        <Ln x1={PX} y1={90} x2={PX + PW} y2={90} color={C.fill2} width={1} />
        <T x={PX} y={30} size={13} color={C.muted}>{win > 1 ? `${fmt(win, 3)} wavelengths of the signal` : 'one wavelength of the signal'}</T>
        <Ln x1={PX} y1={wy} x2={PX + wirePx} y2={wy} color={C.resist} width={8} />
        <Ln x1={PX} y1={wy - 16} x2={PX} y2={wy + 16} color={C.ink} width={2} />
        <Ln x1={PX + wirePx} y1={wy - 16} x2={PX + wirePx} y2={wy + 16} color={C.ink} width={2} />
        <T x={PX} y={wy + 34} size={14} bold color={C.resist}>wire, {lcm} cm</T>
        <T x={PX + PW} y={wy + 34} anchor="end" size={14} bold>phase shift along the wire: {fmt(phase, 3)}°</T>
        <T x={PX + PW} y={wy + 58} anchor="end" size={13} color={C.muted}>{fmt(360)}° × {fmt(frac, 3)} of a wavelength</T>
      </Diagram>
      <Controls>
        <Choice label="Band" value={preset} onChange={(v) => v && setE(Math.log10(v))} options={[{ value: 7, label: '7 MHz' }, { value: 146, label: '146 MHz' }, { value: 440, label: '440 MHz' }, { value: 10000, label: '10 GHz' }]} />
        <Slider label="Frequency" value={e} min={0} max={4} step={0.01} onChange={setE} format={(v) => si(10 ** v * 1e6, 'Hz', 3)} />
        <Slider label="Wire length" value={lcm} min={1} max={50} onChange={setL} format={(v) => `${v} cm`} color="var(--d-resist)" />
        <Readout label={`Wavelength λ = 299.8 ÷ ${fmt(fMHz, 3)} MHz`} value={si(lam, 'm', 3)} />
      </Controls>
    </>
  )
}
