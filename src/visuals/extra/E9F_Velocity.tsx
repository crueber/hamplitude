import { useState } from 'react'
import { C, Choice, Controls, Diagram, Ln, Readout, Slider, T, fmt } from '../kit'

const F = 14.1 // MHz, as in the exam question
const HALF = 299.792458 / F / 2 // free-space half wavelength, metres

const PRESETS = [
  { v: 0.66, label: 'Solid plastic coax ≈ 0.66' },
  { v: 0.8, label: 'Foam coax ≈ 0.8' },
  { v: 1, label: 'Air-insulated ≈ 1' },
]

/** Velocity factor: waves are slower in a line, so the same electrical length is physically shorter. */
export function Velocity() {
  const [vf, setVf] = useState(0.66)
  const len = HALF * vf
  const x0 = 60, full = 520
  const wx = (m: number) => x0 + (m / HALF) * full
  return (
    <>
      <Diagram w={640} h={250} title={`At 14.10 megahertz a half-wave of free space is ${fmt(HALF, 3)} metres. In a line with velocity factor ${fmt(vf, 3)} the same half wave is ${fmt(len, 3)} metres long.`}
        caption="Slower wave, shorter wavelength in the line, so the line is physically shorter for the same electrical length.">
        <T x={x0} y={22} size={13} bold color={C.signal}>Half wave in free space (air)</T>
        <Ln x1={x0} y1={50} x2={x0 + full} y2={50} color={C.signal} width={8} />
        <T x={x0 + full} y={76} anchor="end" size={14} bold color={C.signal} mono>{fmt(HALF, 3)} m</T>
        <T x={x0} y={118} size={13} bold color={C.resist}>Same electrical half wave, in the line</T>
        <Ln x1={x0} y1={146} x2={wx(len)} y2={146} color={C.resist} width={8} />
        <Ln x1={wx(len)} y1={138} x2={wx(len)} y2={154} color={C.ink} width={2} />
        <T x={Math.max(wx(len), x0 + 110)} y={172} anchor="end" size={14} bold color={C.resist} mono>{fmt(len, 3)} m</T>
        <T x={x0} y={208} size={13} color={C.muted}>length = half wave × velocity factor</T>
        <T x={x0} y={230} size={13} color={C.muted} mono>{fmt(HALF, 3)} × {fmt(vf, 3)} = {fmt(len, 3)} m</T>
      </Diagram>
      <Controls>
        <Slider label="Velocity factor" value={vf} min={0.5} max={1} step={0.01} onChange={setVf} format={(v) => fmt(v, 3)} color="var(--d-resist)" />
        <Readout label="Wave speed in line" value={fmt(vf * 100, 3)} unit="% of light" color="var(--d-signal)" />
        <Readout label="Physical half-wave length" value={fmt(len, 3)} unit="m" color="var(--d-resist)" />
      </Controls>
      <div style={{ margin: '-6px 0 14px' }}>
        <Choice label="Line type" value={PRESETS.find((p) => Math.abs(p.v - vf) < 0.005)?.v ?? -1} onChange={setVf} options={PRESETS.map((p) => ({ value: p.v, label: p.label }))} />
      </div>
    </>
  )
}
