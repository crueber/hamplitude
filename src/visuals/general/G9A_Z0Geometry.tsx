import { useState } from 'react'
import { C, Controls, Diagram, Ln, Readout, Slider, T, fmt } from '../kit'

/** Parallel-conductor line: Z0 depends on spacing and conductor radius, never on length or frequency. */
export function G9A_Z0Geometry() {
  const [sp, setSp] = useState(1.0) // centre-to-centre spacing, inches
  const [rad, setRad] = useState(0.04) // conductor radius, inches
  const [len, setLen] = useState(100) // length, feet
  const z0 = 276 * Math.log10(sp / rad) // ideal air-spaced line: 276 log10(2D/d) with d = 2r
  const px = 80 // pixels per inch
  const cx = 150, cy = 120
  const r = Math.max(rad * px * 2, 3)
  const x1 = cx - (sp * px) / 2, x2 = cx + (sp * px) / 2
  return (
    <>
      <Diagram w={640} h={250} title={`Parallel-conductor line with ${fmt(sp, 2)} inch spacing and ${fmt(rad, 2)} inch radius has a characteristic impedance of about ${Math.round(z0)} ohms; length does not change it`}
        caption="Cross-section (left) sets Z₀. Slide the length: nothing changes.">
        <T x={cx} y={20} anchor="middle" size={13} bold color={C.muted}>Cross-section, end-on</T>
        <circle cx={x1} cy={cy} r={r} fill={C.resist} />
        <circle cx={x2} cy={cy} r={r} fill={C.resist} />
        <Ln x1={x1} y1={cy + 34} x2={x2} y2={cy + 34} color={C.ink} width={2} arrow="both" />
        <T x={cx} y={cy + 54} anchor="middle" size={13} bold>spacing (center to center)</T>
        <T x={x1} y={cy - 28} anchor="middle" size={13} bold color={C.resist}>radius</T>
        <T x={cx} y={cy + 84} anchor="middle" size={13} color={C.muted}>radius drawn 2× larger</T>

        <T x={470} y={20} anchor="middle" size={13} bold color={C.muted}>Side view</T>
        <Ln x1={310} y1={56} x2={630} y2={56} color={C.resist} width={5} />
        <Ln x1={310} y1={70 + sp * 14} x2={630} y2={70 + sp * 14} color={C.resist} width={5} />
        <Ln x1={310} y1={190} x2={310 + (len / 500) * 320} y2={190} color={C.signal} width={4} arrow="both" />
        <T x={470} y={212} anchor="middle" size={13} color={C.muted}>length: {len} ft (no effect on Z₀)</T>
        <T x={470} y={150} anchor="middle" size={20} bold color={C.power}>Z₀ ≈ {Math.round(z0)} Ω</T>
      </Diagram>
      <Controls>
        <Slider label="Spacing" value={sp} min={0.5} max={3} step={0.05} onChange={setSp} format={(v) => `${fmt(v, 3)} in`} color="var(--d-resist)" />
        <Slider label="Conductor radius" value={rad} min={0.02} max={0.1} step={0.005} onChange={setRad} format={(v) => `${fmt(v, 3)} in`} color="var(--d-resist)" />
        <Slider label="Line length" value={len} min={20} max={500} step={10} onChange={setLen} format={(v) => `${v} ft`} color="var(--d-signal)" />
        <Readout label="Z₀ (ideal, air spaced)" value={Math.round(z0)} unit=" Ω" color="var(--d-power)" />
      </Controls>
    </>
  )
}
