import { useState } from 'react'
import { C, Controls, Diagram, Ln, Readout, Slider, T } from '../kit'

const Zmax = 10
const zOf = (l: number) => Math.min(Math.abs(Math.tan(2 * Math.PI * l)), Zmax) / Zmax

/** An idealised ground wire: impedance at the equipment end rises with length and peaks at a quarter wavelength. */
export function GroundZ() {
  const [len, setLen] = useState(0.06)
  const z = zOf(len)
  const hot = z > 0.55
  const col = hot ? C.bad : z > 0.2 ? C.resist : C.good
  const X = (l: number) => 50 + (l / 0.5) * 380
  const Y = (v: number) => 210 - v * 160
  const curve = Array.from({ length: 201 }, (_, i) => {
    const l = (i / 200) * 0.5
    return `${i ? 'L' : 'M'}${X(l).toFixed(1)},${Y(zOf(l)).toFixed(1)}`
  }).join('')
  const level = z * 150
  return (
    <>
      <Diagram w={640} h={274} title={`Ideal ground wire: impedance at the equipment end versus wire length in wavelengths. It rises as the wire gets longer and is very high at a quarter wavelength, so RF voltage appears on the chassis. This wire is ${len.toFixed(2)} wavelength.`}
        caption="At a quarter wavelength the ground wire acts like an open circuit, not a ground.">
        <Ln x1={50} y1={210} x2={430} y2={210} color={C.muted} width={2} />
        <Ln x1={X(0.25)} y1={50} x2={X(0.25)} y2={210} color={C.fill2} width={2} dash="5 5" />
        <path d={curve} fill="none" stroke={C.resist} strokeWidth={3.5} />
        <circle cx={X(len)} cy={Y(z)} r={8} fill={col} stroke={C.bg} strokeWidth={3} />
        {[[0, '0'], [0.25, '¼ λ'], [0.5, '½ λ']].map(([l, t]) => <T key={String(l)} x={X(l as number)} y={230} anchor="middle" size={12} color={C.muted}>{t}</T>)}
        <T x={X(0.25)} y={34} anchor="middle" size={12} bold color={C.bad}>resonant: very high Z</T>
        <T x={240} y={254} anchor="middle" size={12} color={C.muted}>ground wire length →</T>
        <T x={50} y={34} size={12} color={C.muted}>impedance</T>
        {/* chassis bar */}
        <rect x={500} y={52} width={56} height={150} rx={8} fill={C.fill} stroke={C.ink} strokeWidth={2} />
        <rect x={500} y={202 - level} width={56} height={level} rx={8} fill={col} fillOpacity={0.45} stroke="none" />
        <T x={528} y={34} anchor="middle" size={12} bold>RF on chassis</T>
        <T x={528} y={222} anchor="middle" size={12} color={col} bold>{hot ? 'RF burns' : z > 0.2 ? 'rising' : 'low'}</T>
      </Diagram>
      <Controls>
        <Slider label="Ground wire length" value={len} min={0.01} max={0.49} step={0.01} onChange={setLen} format={(v) => `${v.toFixed(2)} λ`} color="var(--d-resist)" />
        <Readout label="At the equipment" value={hot ? 'High RF voltage' : z > 0.2 ? 'Getting worse' : 'Low impedance'} color={hot ? 'var(--d-bad)' : 'var(--d-good)'} />
      </Controls>
    </>
  )
}
