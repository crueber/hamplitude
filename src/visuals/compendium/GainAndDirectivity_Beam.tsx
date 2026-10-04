import { useState } from 'react'
import { C, Controls, Diagram, Ln, Readout, Slider, T, fmt } from '../kit'

/**
 * Gain squeezes the same power into a narrower beam. Idealised single-lobe pattern; beamwidth from the
 * pencil-beam rule of thumb G = 41253 / (BW x BW) with equal beamwidths in both planes.
 */
export function GainAndDirectivity_Beam() {
  const [dbi, setDbi] = useState(10)
  const G = Math.pow(10, dbi / 10)
  const bw = Math.sqrt(41253 / G) // half-power beamwidth, degrees
  const cx = 180, cy = 138, R = 112
  // Field-strength plot: peak field is sqrt(G) times the isotropic field, so the isotropic circle has radius R / sqrt(G).
  const iso = R / Math.sqrt(G)
  const pts: string[] = []
  for (let a = -180; a <= 180; a += 1) {
    const P = Math.exp(-Math.LN2 * Math.pow((2 * a) / bw, 2)) // power pattern, half power at +/- bw/2
    const r = R * Math.sqrt(P)
    const th = (a * Math.PI) / 180
    pts.push(`${pts.length ? 'L' : 'M'}${(cx + r * Math.cos(th)).toFixed(1)},${(cy - r * Math.sin(th)).toFixed(1)}`)
  }
  const half = ((bw / 2) * Math.PI) / 180
  const rh = R * Math.sqrt(0.5)
  const dbd = dbi - 2.15
  const eirp = 100 * G
  return (
    <>
      <Diagram w={640} h={300} title={`An idealised beam with ${fmt(dbi, 3)} dBi of gain: its half-power beamwidth is about ${fmt(bw, 2)} degrees, and its peak field is much stronger than an isotropic radiator's`}
        caption="Same total power, different shape: more gain means a narrower beam. Idealised single-lobe pattern, field-strength scale.">
        {[0.33, 0.66, 1].map((k) => <circle key={k} cx={cx} cy={cy} r={R * k} fill="none" stroke={C.fill2} strokeWidth={1.5} />)}
        <Ln x1={cx - R - 8} y1={cy} x2={cx + R + 8} y2={cy} color={C.fill2} width={1.5} />
        <path d={pts.join('') + 'Z'} fill={C.signal} fillOpacity={0.22} stroke={C.signal} strokeWidth={3} strokeLinejoin="round" />
        <circle cx={cx} cy={cy} r={iso} fill="none" stroke={C.muted} strokeWidth={2} strokeDasharray="5 4" />
        {/* half-power edges */}
        <Ln x1={cx} y1={cy} x2={cx + rh * Math.cos(half) * 1.0} y2={cy - rh * Math.sin(half)} color={C.power} width={2} />
        <Ln x1={cx} y1={cy} x2={cx + rh * Math.cos(half)} y2={cy + rh * Math.sin(half)} color={C.power} width={2} />
        <circle cx={cx + rh * Math.cos(half)} cy={cy - rh * Math.sin(half)} r={4} fill={C.power} />
        <circle cx={cx + rh * Math.cos(half)} cy={cy + rh * Math.sin(half)} r={4} fill={C.power} />
        <T x={cx} y={cy + R + 22} size={12.5} anchor="middle" color={C.muted}>one plane cut through the beam; it points right</T>

        {/* right-hand readout */}
        <Ln x1={372} y1={46} x2={400} y2={46} color={C.signal} width={4} />
        <T x={410} y={46} size={13.5} bold>this antenna: {fmt(dbi, 3)} dBi</T>
        <Ln x1={372} y1={72} x2={400} y2={72} color={C.muted} width={2} dash="5 4" />
        <T x={410} y={72} size={13.5} color={C.muted}>isotropic reference: 0 dBi</T>
        <Ln x1={372} y1={98} x2={400} y2={98} color={C.power} width={3} />
        <T x={410} y={98} size={13.5} color={C.power} bold>half-power edges</T>
        <T x={372} y={140} size={14} bold>{fmt(dbi, 3)} dBi = {fmt(dbd, 3)} dBd</T>
        <T x={372} y={164} size={13.5} color={C.muted}>{fmt(G, 3)} times the power density of an</T>
        <T x={372} y={184} size={13.5} color={C.muted}>isotropic radiator, at the peak</T>
        <T x={372} y={218} size={14} bold color={C.power}>beamwidth about {fmt(bw, 2)}°</T>
        <T x={372} y={242} size={13.5} color={C.muted}>100 W in: about {fmt(eirp, 3)} W EIRP</T>
        <T x={372} y={262} size={12.5} color={C.muted}>lossless, so no extra power is made</T>
      </Diagram>
      <Controls>
        <Slider label="Antenna gain" value={dbi} min={6} max={24} step={0.5} onChange={setDbi} format={(v) => `${fmt(v, 3)} dBi`} color="var(--d-signal)" />
        <Readout label="Beamwidth" value={fmt(bw, 2)} unit="°" color="var(--d-power)" />
        <Readout label="Power ratio" value={fmt(G, 3)} unit="×" color="var(--d-signal)" />
      </Controls>
    </>
  )
}
