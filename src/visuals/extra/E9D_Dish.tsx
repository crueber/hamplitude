import { useState } from 'react'
import { C, Controls, Diagram, Ln, Slider, T, fmt } from '../kit'

const CM = 299.792458 // wavelength (m) = CM / f(MHz)
const gainDb = (dM: number, fGHz: number) => 10 * Math.log10((Math.PI * dM * fGHz * 1000 / CM) ** 2) // ideal: (π D / λ)²

/** Ideal parabolic dish gain = (π D / λ)². Double the frequency (or the diameter) and gain rises 6 dB. */
export function E9D_Dish() {
  const [d, setD] = useState(1)
  const [f, setF] = useState(5)
  const g = gainDb(d, f), g2 = gainDb(d, 2 * f), gD = gainDb(2 * d, f)
  const half = 3 + 13 * Math.exp(-(d * f * 1000 / CM) / 12) // beam half-angle (degrees, schematic) shrinks as D/λ grows
  const cx = 130, cy = 140, hh = 40 + d * 28 // dish half-height in px
  const depth = 30 + d * 6
  const pts = Array.from({ length: 41 }, (_, i) => { const t = (i / 40) * 2 - 1; return `${i ? 'L' : 'M'}${(cx - depth * (1 - t * t)).toFixed(1)},${(cy + t * hh).toFixed(1)}` }).join('')
  const L = 240, a = (half * Math.PI) / 180
  return (
    <>
      <Diagram w={640} h={290} title={`Ideal parabolic dish, ${fmt(d)} metre diameter at ${f} GHz: gain ${g.toFixed(1)} dBi. Doubling the frequency adds 6 dB, giving ${g2.toFixed(1)} dBi.`}
        caption="Gain = (π × diameter ÷ wavelength)². Bigger across, or shorter wavelength: narrower beam, more gain.">
        <path d={pts} fill="none" stroke={C.ink} strokeWidth={5} strokeLinecap="round" />
        <Ln x1={cx - depth + 4} y1={cy} x2={cx - depth + 40} y2={cy} color={C.muted} width={3} />
        <circle cx={cx - 8} cy={cy} r={5} fill={C.power} />
        <T x={cx - 8} y={cy - 16} anchor="middle" size={12} bold color={C.power}>feed</T>
        <path d={`M${cx + 6},${cy - 6} L${cx + L},${cy - L * Math.tan(a)} L${cx + L},${cy + L * Math.tan(a)} L${cx + 6},${cy + 6} Z`} fill={C.signal} fillOpacity={0.2} stroke={C.signal} strokeWidth={2} />
        <T x={cx + L / 2} y={cy} anchor="middle" size={13} bold color={C.signal}>beam</T>
        <T x={cx - depth - 8} y={cy + hh + 18} size={12} color={C.muted}>{fmt(d)} m across</T>
        <rect x={406} y={22} width={224} height={236} rx={12} fill={C.fill} />
        <T x={420} y={44} size={13} bold color={C.muted}>Ideal gain</T>
        <T x={420} y={76} size={28} bold color={C.good}>{g.toFixed(1)} dBi</T>
        <T x={420} y={118} size={13} color={C.ink}>Double the frequency:</T>
        <T x={420} y={142} size={16} bold color={C.power}>{g2.toFixed(1)} dBi  (+{(g2 - g).toFixed(1)} dB)</T>
        <T x={420} y={178} size={13} color={C.ink}>Double the diameter:</T>
        <T x={420} y={202} size={16} bold color={C.power}>{gD.toFixed(1)} dBi  (+{(gD - g).toFixed(1)} dB)</T>
        <T x={420} y={238} size={12} color={C.muted}>x2 size in λ = x4 power = +6 dB</T>
      </Diagram>
      <Controls>
        <Slider label="Frequency" value={f} min={1} max={24} step={1} onChange={setF} format={(v) => `${v} GHz`} color="var(--d-signal)" />
        <Slider label="Dish diameter" value={d} min={0.5} max={3} step={0.25} onChange={setD} format={(v) => `${fmt(v)} m`} color="var(--d-resist)" />
      </Controls>
    </>
  )
}
