import { useState } from 'react'
import { C, Choice, Controls, Diagram, Ln, Slider, T, fmt } from '../kit'

const CM = 299.792458 // wavelength (m) = CM / f(MHz)
const BANDS = [
  { v: 1296, label: '1.3 GHz' },
  { v: 2304, label: '2.3 GHz' },
  { v: 5760, label: '5.7 GHz' },
  { v: 10368, label: '10 GHz' },
  { v: 24192, label: '24 GHz' },
]

/** Dish gain = efficiency x (pi D / lambda)^2; beamwidth about 70 lambda / D degrees. Efficiency 50 to 65 percent is typical. */
export function DishAntennas_Gain() {
  const [d, setD] = useState(1)
  const [band, setBand] = useState(10368)
  const [eff, setEff] = useState(55)
  const lam = CM / band
  const ideal = 10 * Math.log10((Math.PI * d / lam) ** 2)
  const gain = ideal + 10 * Math.log10(eff / 100)
  const bw = (70 * lam) / d
  const dispHalf = Math.min(22, Math.max(3, bw)) / 2 // drawn angle, not to scale
  const cx = 120, cy = 130, hh = 28 + d * 16, depth = 14 + d * 4
  const prof = Array.from({ length: 41 }, (_, i) => {
    const t = (i / 40) * 2 - 1
    return `${i ? 'L' : 'M'}${(cx - depth * (1 - t * t)).toFixed(1)},${(cy + t * hh).toFixed(1)}`
  }).join('')
  const L = 230, a = (dispHalf * Math.PI) / 180
  return (
    <>
      <Diagram w={640} h={270}
        title={`A ${fmt(d, 2)} metre dish at ${fmt(band / 1000, 3)} GHz with ${eff} percent efficiency: gain about ${gain.toFixed(1)} dBi and beamwidth about ${bw.toFixed(1)} degrees`}
        caption="Beam width is drawn schematically. Gain = efficiency × (π D ÷ λ)². Typical amateur dishes reach 50 to 65% efficiency.">
        <path d={prof} fill="none" stroke={C.ink} strokeWidth={5} strokeLinecap="round" />
        <circle cx={cx + 12} cy={cy} r={5} fill={C.power} />
        <path d={`M${cx + 4},${cy - hh * 0.92} L${cx + L},${cy - hh * 0.92 - L * Math.tan(a)} L${cx + L},${cy + hh * 0.92 + L * Math.tan(a)} L${cx + 4},${cy + hh * 0.92} Z`} fill={C.signal} fillOpacity={0.2} stroke={C.signal} strokeWidth={2} />
        <T x={cx + L / 2 + 10} y={cy} anchor="middle" size={13} bold color={C.signal}>beam</T>
        <Ln x1={cx - depth - 20} y1={cy - hh} x2={cx - depth - 20} y2={cy + hh} color={C.muted} width={1.5} arrow="both" />
        <T x={cx - depth - 28} y={cy} anchor="end" size={12} color={C.muted}>{fmt(d, 2)} m</T>
        <rect x={400} y={20} width={230} height={230} rx={12} fill={C.fill} />
        <T x={414} y={42} size={12} color={C.muted}>Gain (with efficiency)</T>
        <T x={414} y={74} size={28} bold color={C.good}>{gain.toFixed(1)} dBi</T>
        <T x={414} y={110} size={12} color={C.muted}>Ideal, 100% efficient</T>
        <T x={414} y={130} size={15} bold color={C.ink}>{ideal.toFixed(1)} dBi</T>
        <T x={414} y={166} size={12} color={C.muted}>Beamwidth (about 70 λ ÷ D)</T>
        <T x={414} y={188} size={15} bold color={C.signal}>{bw.toFixed(1)}°</T>
        <T x={414} y={224} size={12} color={C.muted}>Wavelength {lam >= 0.1 ? `${(lam * 100).toFixed(1)} cm` : `${(lam * 1000).toFixed(1)} mm`}</T>
      </Diagram>
      <Controls>
        <Slider label="Dish diameter" value={d} min={0.3} max={4} step={0.1} onChange={setD} format={(v) => `${fmt(v, 2)} m`} color="var(--d-resist)" />
        <div>
          <span className="ctl-label" style={{ display: 'block', marginBottom: 6 }}>Frequency</span>
          <Choice label="Frequency" value={band} onChange={setBand} options={BANDS.map((b) => ({ value: b.v, label: b.label }))} />
        </div>
        <Slider label="Aperture efficiency" value={eff} min={40} max={75} step={5} onChange={setEff} format={(v) => `${v}%`} color="var(--d-power)" />
      </Controls>
    </>
  )
}
