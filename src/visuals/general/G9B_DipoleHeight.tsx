import { useState } from 'react'
import { C, Controls, Diagram, Ln, Readout, Slider, T, TAU, fmt } from '../kit'

/** Horizontal dipole over ground: height sets the elevation pattern; at high angles the figure-8 fills in. */
export function G9B_DipoleHeight() {
  const [h, setH] = useState(0.2) // wavelengths
  const [el, setEl] = useState(60) // elevation angle, degrees
  const N = 90
  const ground = (e: number) => Math.abs(Math.sin(TAU * h * Math.sin(e)))
  let mx = 0
  for (let i = 0; i <= N; i++) mx = Math.max(mx, ground((i / N) * (Math.PI / 2)))
  // elevation pattern, plane broadside to the wire, right-hand quadrant mirrored
  const cx = 225, cy = 250, R = 140
  const pts: string[] = []
  for (let i = -N; i <= N; i++) {
    const th = (i / N) * (Math.PI / 2) // angle from straight up
    const r = ground(Math.PI / 2 - Math.abs(th)) / mx
    pts.push(`${i === -N ? 'M' : 'L'}${(cx + R * r * Math.sin(th)).toFixed(1)},${(cy - R * r * Math.cos(th)).toFixed(1)}`)
  }
  const ee = (el * Math.PI) / 180
  // azimuth pattern at the chosen elevation (dipole's own pattern; ground factor is constant around the circle)
  const az = (phi: number) => {
    const c = Math.cos(ee) * Math.cos(phi)
    const s = Math.sqrt(1 - c * c)
    return s < 1e-4 ? 0 : Math.abs(Math.cos((Math.PI / 2) * c) / s)
  }
  const acx = 500, acy = 150, AR = 90
  const apts: string[] = []
  let amin = 1e9, amax = 0
  for (let i = 0; i <= 120; i++) {
    const p = (i / 120) * TAU
    const r = az(p)
    amin = Math.min(amin, r); amax = Math.max(amax, r)
    apts.push(`${i ? 'L' : 'M'}${(acx + AR * r * Math.cos(p)).toFixed(1)},${(acy - AR * r * Math.sin(p)).toFixed(1)}`)
  }
  const dB = 20 * Math.log10(amax / Math.max(amin, 1e-3))
  const gh = h * 130
  return (
    <>
      <Diagram w={640} h={290} title={`Horizontal dipole ${fmt(h, 2)} wavelength high. At ${el} degrees elevation the azimuth pattern is ${dB < 3 ? 'almost a circle' : 'a figure-eight'}: strongest to weakest differ by ${fmt(dB, 2)} dB`}
        caption="Left: pattern looking along the wire. Right: pattern from above at the chosen elevation. Low antenna, high angle, nearly round.">
        <T x={cx} y={14} anchor="middle" size={13} bold color={C.muted}>Elevation pattern, end-on view</T>
        <Ln x1={10} y1={cy} x2={cx + R + 8} y2={cy} color={C.muted} width={3} />
        <T x={10} y={cy + 14} size={12} color={C.muted}>ground</T>
        <path d={pts.join('') + 'Z'} fill={C.signal} fillOpacity={0.2} stroke={C.signal} strokeWidth={3} strokeLinejoin="round" />
        <Ln x1={cx} y1={cy} x2={cx + (R + 6) * Math.sin(Math.PI / 2 - ee)} y2={cy - (R + 6) * Math.cos(Math.PI / 2 - ee)} color={C.resist} width={2} dash="5 4" />
        <T x={cx + (R + 10) * Math.cos(ee) - 4} y={cy - (R + 10) * Math.sin(ee) - 8} anchor="end" size={12} bold color={C.resist}>{el}°</T>
        <Ln x1={34} y1={cy} x2={34} y2={cy - gh} color={C.muted} width={2} arrow />
        <circle cx={34} cy={cy - gh} r={6} fill={C.voltage} />
        <T x={46} y={cy - gh - 14} size={12} bold color={C.voltage}>wire, {fmt(h, 2)} λ up</T>

        <T x={acx} y={14} anchor="middle" size={13} bold color={C.muted}>From above, at {el}° elevation</T>
        <circle cx={acx} cy={acy} r={AR} fill="none" stroke={C.muted} strokeWidth={1.5} strokeDasharray="4 4" />
        <path d={apts.join('') + 'Z'} fill={C.signal} fillOpacity={0.2} stroke={C.signal} strokeWidth={3} strokeLinejoin="round" />
        <Ln x1={acx - 38} y1={acy} x2={acx + 38} y2={acy} color={C.resist} width={5} />
        <T x={acx} y={acy + 22} anchor="middle" size={12} bold color={C.resist}>wire</T>
        <T x={acx} y={acy + AR + 22} anchor="middle" size={14} bold color={dB < 3 ? C.good : C.bad}>{dB < 3 ? 'almost omnidirectional' : 'figure-eight'}</T>
        <T x={acx} y={acy + AR + 42} anchor="middle" size={12} color={C.muted}>strongest vs weakest: {fmt(dB, 2)} dB</T>
      </Diagram>
      <Controls>
        <Slider label="Height above ground" value={h} min={0.05} max={1} step={0.01} onChange={setH} format={(v) => `${fmt(v, 2)} λ`} color="var(--d-resist)" />
        <Slider label="Elevation angle" value={el} min={5} max={85} step={1} onChange={setEl} format={(v) => `${v}°`} color="var(--d-signal)" />
        <Readout label="Max minus min (azimuth)" value={fmt(dB, 2)} unit=" dB" color="var(--d-power)" />
      </Controls>
    </>
  )
}
