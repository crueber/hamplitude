import { useState } from 'react'
import { C, Choice, Controls, Diagram, Ln, Readout, Slider, T } from '../kit'

const CKMS = 299792.458
const MOON_R = 1737.4 // km
const SIGMA = 0.065 * Math.PI * (MOON_R * 1000) ** 2 // m^2: Moon's radar cross-section, about 6.5% of its disc area
const BANDS = [
  { f: 144, label: '2 m' },
  { f: 432, label: '70 cm' },
  { f: 1296, label: '23 cm' },
  { f: 10368, label: '3 cm' },
]

const sup = (n: number) => String(n).replace(/\d/g, (c) => '⁰¹²³⁴⁵⁶⁷⁸⁹'[Number(c)])

/** EME round-trip: delay from distance, loss from the radar equation with 0 dBi antennas and a Moon of typical reflectivity. */
export function EmeMoonbounce_Budget() {
  const [band, setBand] = useState(144)
  const [d, setD] = useState(384400)
  const lam = (CKMS * 1000) / (band * 1e6)
  const D = d * 1000
  const oneWay = 20 * Math.log10((4 * Math.PI * D) / lam)
  const loss = 10 * Math.log10(((4 * Math.PI) ** 3 * D ** 4) / (lam * lam * SIGMA))
  const delay = (2 * d) / CKMS
  const ex = 40, mx = 520, y = 112
  const label = d < 365000 ? 'near perigee' : d > 400000 ? 'near apogee' : 'about average'
  return (
    <>
      <Diagram w={640} h={236}
        title={`Moonbounce at ${band} megahertz with the Moon ${d.toLocaleString('en-US')} kilometres away: round trip about ${delay.toFixed(2)} seconds, path loss about ${loss.toFixed(0)} decibels`}
        caption="Loss is for isotropic (0 dBi) antennas: antenna gain at both ends comes off it dB for dB. Not to scale.">
        <circle cx={ex} cy={y} r={34} fill={C.current} fillOpacity={0.3} stroke={C.current} strokeWidth={2.5} />
        <T x={ex} y={y} anchor="middle" size={14} bold>Earth</T>
        <circle cx={mx} cy={y} r={16} fill={C.fill2} stroke={C.muted} strokeWidth={2.5} />
        <T x={mx} y={y + 32} anchor="middle" size={14} bold color={C.muted}>Moon</T>
        <Ln x1={ex + 40} y1={y - 8} x2={mx - 22} y2={y - 8} color={C.signal} width={3} arrow />
        <Ln x1={mx - 22} y1={y + 8} x2={ex + 40} y2={y + 8} color={C.voltage} width={3} arrow />
        <T x={(ex + mx) / 2} y={y - 26} anchor="middle" size={13} bold color={C.signal}>out: {(d / CKMS).toFixed(2)} s</T>
        <T x={(ex + mx) / 2} y={y + 28} anchor="middle" size={13} bold color={C.voltage}>back: {(d / CKMS).toFixed(2)} s</T>
        <T x={20} y={20} size={12} color={C.muted}>Round trip</T>
        <T x={20} y={42} size={20} bold mono color={C.ink}>{delay.toFixed(2)} s</T>
        <T x={620} y={20} anchor="end" size={12} color={C.muted}>Path loss, there and back</T>
        <T x={620} y={42} anchor="end" size={20} bold mono color={C.bad}>{loss.toFixed(0)} dB</T>
        <T x={20} y={206} size={12} color={C.muted}>One-way free-space loss alone: {oneWay.toFixed(0)} dB. The echo returns about 1 part in 10{sup(Math.round(loss / 10))} of the power sent.</T>
      </Diagram>
      <Controls>
        <div>
          <span className="ctl-label" style={{ display: 'block', marginBottom: 6 }}>Band</span>
          <Choice label="Band" value={band} onChange={setBand} options={BANDS.map((b) => ({ value: b.f, label: b.label }))} />
        </div>
        <Slider label="Moon distance" value={d} min={356500} max={406700} step={500} onChange={setD} format={(v) => `${v.toLocaleString('en-US')} km (${label})`} color="var(--d-power)" />
        <Readout label="Delay" value={delay.toFixed(2)} unit=" s" color={C.ink} />
        <Readout label="Loss" value={loss.toFixed(1)} unit=" dB" color={C.bad} />
      </Controls>
    </>
  )
}
