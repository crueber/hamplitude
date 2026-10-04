import { useState } from 'react'
import { C, Choice, Controls, Diagram, Ln, Readout, Slider, T } from '../kit'

const BANDS = [
  { value: 3.6, label: '80 m' },
  { value: 7.1, label: '40 m' },
  { value: 14.2, label: '20 m' },
  { value: 28.4, label: '10 m' },
]

/** Schematic feed-point impedance of an end-fed wire versus its length in wavelengths: 1 / sin^2(2 pi L / lambda), relative to its lowest value. */
export function LongAndRandomWires_FeedZ() {
  const [f, setF] = useState(7.1)
  const [ft, setFt] = useState(70)
  const lam = 983.6 / f
  const L = ft / lam
  const s2 = Math.sin(2 * Math.PI * L) ** 2
  const rel = 1 / Math.max(s2, 1e-6)
  const verdict = rel >= 10 ? 'very high: avoid' : rel >= 3 ? 'high' : 'moderate'
  const vcol = rel >= 10 ? 'var(--d-bad)' : rel >= 3 ? 'var(--d-resist)' : 'var(--d-good)'
  const X0 = 60, X1 = 620, YT = 54, YB = 230, XMAX = 4
  const px = (l: number) => X0 + (l / XMAX) * (X1 - X0)
  const py = (r: number) => YB - (Math.log10(Math.min(Math.max(r, 1), 100)) / 2) * (YB - YT)
  const pts: string[] = []
  for (let i = 0; i <= 1600; i++) {
    const l = (i / 1600) * XMAX
    const r = 1 / Math.max(Math.sin(2 * Math.PI * l) ** 2, 1e-6)
    pts.push(`${i ? 'L' : 'M'}${px(l).toFixed(1)},${py(r).toFixed(1)}`)
  }
  return (
    <>
      <Diagram w={640} h={290}
        title={`Schematic feed point impedance of an end-fed wire against its length. It repeats every half wavelength and is very high at every multiple of a half wavelength. A ${ft} foot wire on ${BANDS.find((b) => b.value === f)?.label} is ${L.toFixed(2)} wavelengths long: impedance ${verdict}`}
        caption="Schematic, ideal wire. Shaded: within 0.05 λ of a half-wave multiple. High impedance means high voltage and a hard job for the tuner.">
        {[0, 0.5, 1, 1.5, 2, 2.5, 3, 3.5, 4].filter((l) => l > 0).map((l) => (
          <rect key={l} x={px(l - 0.05)} y={YT} width={px(0.1) - X0} height={YB - YT} fill={C.resist} opacity={0.18} />
        ))}
        <Ln x1={X0} y1={YB} x2={X1} y2={YB} color={C.muted} width={2} />
        <Ln x1={X0} y1={YT} x2={X0} y2={YB} color={C.muted} width={2} />
        {[0, 1, 2, 3, 4].map((l) => (
          <g key={l}>
            <Ln x1={px(l)} y1={YB} x2={px(l)} y2={YB + 6} color={C.muted} width={2} />
            <T x={px(l)} y={YB + 20} anchor="middle" size={12} color={C.muted}>{l === 0 ? '0' : `${l} λ`}</T>
          </g>
        ))}
        {[['1×', 0], ['10×', 1], ['100×', 2]].map(([t, e]) => (
          <T key={t} x={X0 - 8} y={YB - (Number(e) / 2) * (YB - YT)} anchor="end" size={12} color={C.muted}>{t}</T>
        ))}
        <path d={pts.join('')} fill="none" stroke={C.resist} strokeWidth={2.5} />
        <T x={X0 + 4} y={16} size={13} bold>Feed point impedance (relative to its lowest value)</T>
        <T x={X1} y={YB + 42} anchor="end" size={13} bold color={C.muted}>wire length in wavelengths on the chosen band</T>
        <Ln x1={px(L)} y1={YT} x2={px(L)} y2={YB} color={C.power} width={2} dash="5 4" />
        <circle cx={px(L)} cy={py(rel)} r={7} fill={C.bg} stroke={C.power} strokeWidth={3} />
      </Diagram>
      <Controls>
        <Choice label="Band" options={BANDS.map((b) => ({ value: b.value, label: b.label }))} value={f} onChange={setF} />
        <Slider label="Wire length" value={ft} min={20} max={130} onChange={setFt} format={(v) => `${v} ft`} color="var(--d-resist)" />
        <Readout label="Length on this band" value={L.toFixed(2)} unit=" λ" color="var(--d-signal)" />
        <Readout label="Feed point impedance" value={verdict} color={vcol} />
      </Controls>
    </>
  )
}
