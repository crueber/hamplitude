import { useState } from 'react'
import { C, Choice, Controls, Diagram, Ln, Readout, Slider, T } from '../kit'

const CM = 299792.458 // km/ms... wavelength (m) = 299792.458 / f(kHz)
const BANDS = [
  { f: 137, label: '2200 m (about 137 kHz)' },
  { f: 475, label: '630 m (about 475 kHz)' },
]

/** A short vertical over ground: radiation resistance is tiny, so ground loss decides how much you radiate. */
export function LfAndMf_Efficiency() {
  const [f, setF] = useState(137)
  const [h, setH] = useState(30)
  const [loss, setLoss] = useState(10)
  const lam = CM / f
  const rr = 395 * (h / lam) ** 2 // ohms: short vertical over ground, current tapering to zero at the top (top loading raises it, toward 4x)
  const eff = rr / (rr + loss)
  const db = 10 * Math.log10(eff)
  const gx0 = 40, gx1 = 600
  const heat = 1 - eff
  const mastPx = Math.max(6, (h / lam) * (gx1 - gx0) * 1.0)
  return (
    <>
      <Diagram w={640} h={264}
        title={`A ${h} metre vertical at ${f} kilohertz is ${(h / lam * 100).toFixed(1)} percent of a wavelength tall, with radiation resistance about ${rr.toFixed(3)} ohms. With ${loss} ohms of ground loss only ${(eff * 100).toFixed(2)} percent of the power is radiated`}
        caption="Radiation resistance of a short vertical ≈ 395 × (height ÷ wavelength)² Ω (illustrative: current tapers to zero at the top; top loading raises it).">
        <T x={14} y={20} size={13} bold>Your antenna against one wavelength</T>
        <Ln x1={gx0} y1={96} x2={gx1} y2={96} color={C.muted} width={1.5} dash="3 5" />
        <Ln x1={gx0} y1={96 - 6} x2={gx0} y2={96 + 6} color={C.muted} width={2} />
        <Ln x1={gx1} y1={96 - 6} x2={gx1} y2={96 + 6} color={C.muted} width={2} />
        <T x={(gx0 + gx1) / 2} y={80} anchor="middle" size={12} color={C.muted}>one wavelength = {lam.toFixed(0)} m</T>
        <rect x={gx0} y={170} width={gx1 - gx0} height={24} fill={C.fill2} />
        <Ln x1={gx0 + 16} y1={170} x2={gx0 + 16} y2={170 - mastPx} color={C.ink} width={4} />
        <T x={gx0 + 30} y={138} size={12} bold>{h} m mast</T>
        <T x={gx0 + 30} y={156} size={12} color={C.muted}>{(h / lam * 100).toFixed(1)}% of a wavelength</T>

        <T x={14} y={216} size={13} bold>Where the transmitter power goes</T>
        <rect x={14} y={228} width={612} height={22} rx={5} fill={C.bad} fillOpacity={0.35} stroke={C.bad} strokeWidth={1.5} />
        <rect x={14} y={228} width={Math.max(3, 612 * eff)} height={22} rx={5} fill={C.good} stroke={C.good} strokeWidth={1.5} />
        <T x={620} y={239} anchor="end" size={12} bold>{(heat * 100).toFixed(1)}% heats the ground and coil</T>
      </Diagram>
      <Controls>
        <div>
          <span className="ctl-label" style={{ display: 'block', marginBottom: 6 }}>Band</span>
          <Choice label="Band" value={f} onChange={setF} options={BANDS.map((b) => ({ value: b.f, label: b.label }))} />
        </div>
        <Slider label="Antenna height" value={h} min={10} max={60} step={1} onChange={setH} format={(v) => `${v} m`} color="var(--d-signal)" />
        <Slider label="Ground and coil loss" value={loss} min={2} max={40} step={1} onChange={setLoss} format={(v) => `${v} Ω`} color="var(--d-resist)" />
        <Readout label="Radiation resistance" value={rr.toFixed(rr < 1 ? 3 : 2)} unit=" Ω" color={C.signal} />
        <Readout label="Efficiency" value={(eff * 100).toFixed(eff < 0.1 ? 2 : 1)} unit=" %" color={C.good} />
        <Readout label="Loss" value={db.toFixed(1)} unit=" dB" color={C.bad} />
      </Controls>
    </>
  )
}
