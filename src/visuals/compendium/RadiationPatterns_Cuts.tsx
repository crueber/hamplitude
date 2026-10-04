import { useState } from 'react'
import { C, Controls, Diagram, Ln, Readout, Slider, T, fmt } from '../kit'

const RAD = Math.PI / 180

/** Field-strength factor of a thin half-wave dipole for a direction at angle psi from its axis. */
const dipole = (psi: number) => {
  const s = Math.sin(psi)
  return s < 1e-6 ? 0 : Math.abs(Math.cos((Math.PI / 2) * Math.cos(psi)) / s)
}

/**
 * Two slices of one 3-D pattern: a horizontal half-wave dipole one half wavelength above ideal ground.
 * Elevation cut: broadside plane, strength = |sin(2 pi h sin(el))|. Azimuth cut: a ring of directions at one elevation.
 */
export function RadiationPatterns_Cuts() {
  const [el, setEl] = useState(30)
  const h = 0.5 // height in wavelengths
  const ground = (deg: number) => Math.abs(Math.sin(2 * Math.PI * h * Math.sin(deg * RAD)))
  const level = ground(el)
  const dB = level > 0.001 ? 20 * Math.log10(level) : -Infinity

  // azimuth cut (left): wire along x. alpha = angle from the wire axis in the horizontal plane.
  const lx = 150, ly = 168, LR = 104
  const az: string[] = []
  const vals: number[] = []
  for (let a = 0; a <= 360; a += 2) vals.push(dipole(Math.acos(Math.cos(el * RAD) * Math.cos(a * RAD))))
  const peak = Math.max(...vals)
  vals.forEach((v, i) => {
    const a = i * 2 * RAD
    const r = (LR * v) / peak
    az.push(`${i ? 'L' : 'M'}${(lx + r * Math.cos(a)).toFixed(1)},${(ly - r * Math.sin(a)).toFixed(1)}`)
  })

  // elevation cut (right): broadside plane, horizon along x
  const ex = 448, ey = 224, ER = 120
  const el0: string[] = []
  for (let d = 0; d <= 180; d += 1) {
    const dd = d <= 90 ? d : 180 - d
    const r = ER * ground(dd)
    const a = d * RAD
    el0.push(`${d ? 'L' : 'M'}${(ex + r * Math.cos(a)).toFixed(1)},${(ey - r * Math.sin(a)).toFixed(1)}`)
  }
  const ea = el * RAD
  return (
    <>
      <Diagram w={640} h={340} title={`Two slices of one pattern. Left: the azimuth cut of a horizontal half-wave dipole at ${el} degrees elevation. Right: the elevation cut broadside to the wire, with the chosen elevation marked.`}
        caption="Same antenna, two views. The elevation cut shows how strength varies with takeoff angle; the azimuth cut shows how it varies around the compass at one chosen takeoff angle. Relative field strength, linear scale; ideal ground.">
        <T x={lx} y={20} size={14} bold anchor="middle">Azimuth cut: from above</T>
        <T x={lx} y={40} size={12.5} color={C.muted} anchor="middle">at {el}° elevation</T>
        <T x={ex} y={20} size={14} bold anchor="middle">Elevation cut: from the side</T>
        <T x={ex} y={40} size={12.5} color={C.muted} anchor="middle">broadside to the wire, dipole 0.5 λ high</T>

        {[0.5, 1].map((k) => <circle key={k} cx={lx} cy={ly} r={LR * k} fill="none" stroke={C.fill2} strokeWidth={1.5} />)}
        <Ln x1={lx - LR - 6} y1={ly} x2={lx + LR + 6} y2={ly} color={C.fill2} width={1.5} />
        <Ln x1={lx} y1={ly - LR - 6} x2={lx} y2={ly + LR + 6} color={C.fill2} width={1.5} />
        <path d={az.join('') + 'Z'} fill={C.signal} fillOpacity={0.22} stroke={C.signal} strokeWidth={3} strokeLinejoin="round" />
        <Ln x1={lx - 24} y1={ly} x2={lx + 24} y2={ly} color={C.ink} width={5} />
        <T x={lx} y={ly + 16} size={12} color={C.muted} anchor="middle">wire</T>
        <T x={lx} y={ly + LR + 24} size={12.5} color={C.muted} anchor="middle">strongest broadside (up and down)</T>

        {/* elevation plot */}
        <rect x={ex - ER - 14} y={ey} width={2 * ER + 28} height={44} fill={C.fill} />
        <Ln x1={ex - ER - 14} y1={ey} x2={ex + ER + 14} y2={ey} color={C.muted} width={2.5} />
        <T x={ex} y={ey + 24} size={12.5} color={C.muted} anchor="middle">ground</T>
        {[0.5, 1].map((k) => <path key={k} d={`M${ex - ER * k},${ey} A${ER * k},${ER * k} 0 0 1 ${ex + ER * k},${ey}`} fill="none" stroke={C.fill2} strokeWidth={1.5} />)}
        <Ln x1={ex} y1={ey} x2={ex} y2={ey - ER - 6} color={C.fill2} width={1.5} />
        <path d={el0.join('') + 'Z'} fill={C.signal} fillOpacity={0.22} stroke={C.signal} strokeWidth={3} strokeLinejoin="round" />
        <Ln x1={ex} y1={ey} x2={ex + (ER + 8) * Math.cos(ea)} y2={ey - (ER + 8) * Math.sin(ea)} color={C.power} width={2.5} dash="5 4" />
        <circle cx={ex + ER * ground(el) * Math.cos(ea)} cy={ey - ER * ground(el) * Math.sin(ea)} r={5} fill={C.power} />
        <T x={ex + ER + 10} y={ey - 12} size={12} color={C.muted}>horizon</T>
        <T x={ex} y={ey - ER - 16} size={12} color={C.muted} anchor="middle">straight up</T>
      </Diagram>
      <Controls>
        <Slider label="Elevation of the azimuth cut" value={el} min={5} max={85} step={5} onChange={setEl} format={(v) => `${v}°`} color="var(--d-power)" />
        <Readout label="Strength at this angle" value={Number.isFinite(dB) ? fmt(dB, 3) : '−∞'} unit=" dB vs peak" color="var(--d-signal)" />
      </Controls>
    </>
  )
}
