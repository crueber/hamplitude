import { useState } from 'react'
import { C, Choice, Controls, Diagram, Ln, Readout, Slider, T, fmt } from '../kit'

const sgn = (n: number) => (n < 0 ? `−${-n}` : `${n}`)

/** Admittance is the reciprocal of impedance: reciprocal of the magnitude, negated angle. */
export function E5B_Reciprocal() {
  const [z, setZ] = useState(50)
  const [a, setA] = useState(30)
  const y = 1 / z // siemens
  const rad = (a * Math.PI) / 180
  const tidy = (n: number) => (Math.abs(n) < 1e-9 ? 0 : n)
  const g = tidy(Math.cos(rad) * y * 1000), b = tidy(-Math.sin(rad) * y * 1000) // mS
  const R = 100
  const arrow = (cx: number, cy: number, len: number, ang: number, col: string) => (
    <Ln x1={cx} y1={cy} x2={cx + len * Math.cos((ang * Math.PI) / 180)} y2={cy - len * Math.sin((ang * Math.PI) / 180)} color={col} width={4} arrow />
  )
  const plane = (cx: number, cy: number, xl: string, yl: string, name: string) => (
    <g>
      <Ln x1={cx - R - 10} y1={cy} x2={cx + R + 10} y2={cy} color={C.muted} width={1.5} />
      <Ln x1={cx} y1={cy - R - 6} x2={cx} y2={cy + R + 6} color={C.muted} width={1.5} />
      <T x={cx + R + 12} y={cy + 14} anchor="end" size={12} color={C.muted}>{xl}</T>
      <T x={cx + 8} y={cy - R - 4} size={12} color={C.muted}>{yl}</T>
      <T x={cx} y={cy + R + 28} anchor="middle" bold size={14}>{name}</T>
    </g>
  )
  const cz = 160, cy = 138, cyy = 480
  const lenZ = R * (0.4 + (0.6 * (z - 10)) / 90)
  const lenY = R * (0.4 + (0.6 * (y - 0.01)) / 0.09)
  return (
    <>
      <Diagram w={640} h={300} title={`Impedance ${z} ohms at ${a} degrees has admittance ${fmt(y * 1000)} millisiemens at ${-a} degrees`}
        caption="Admittance is the flip of impedance: invert the size, mirror the angle. Arrows are not to scale.">
        {plane(cz, cy, 'R', 'jX', `Z = ${z} Ω ∠ ${sgn(a)}°`)}
        {plane(cyy, cy, 'G', 'jB', `Y = ${fmt(y * 1000)} mS ∠ ${sgn(-a)}°`)}
        {arrow(cz, cy, lenZ, a, C.resist)}
        {arrow(cyy, cy, lenY, -a, C.signal)}
        <T x={320} y={cy - 10} anchor="middle" bold size={22}>→</T>
        <T x={320} y={cy + 14} anchor="middle" size={13} bold>1 ÷ Z</T>
      </Diagram>
      <Controls>
        <Choice label="Examples" value={a === 90 ? 'l' : a === 0 ? 'r' : a === -90 ? 'c' : 'x'} onChange={(v) => setA(v === 'l' ? 90 : v === 'r' ? 0 : v === 'c' ? -90 : a)}
          options={[{ value: 'l', label: 'Pure inductor +90°' }, { value: 'r', label: 'Pure resistor 0°' }, { value: 'c', label: 'Pure capacitor −90°' }]} />
        <Slider label="Impedance magnitude |Z|" value={z} min={10} max={100} onChange={setZ} format={(v) => `${v} Ω`} color="var(--d-resist)" />
        <Slider label="Impedance angle" value={a} min={-90} max={90} step={5} onChange={setA} format={(v) => `${v}°`} />
        <Readout label="Y = G + jB" value={`${fmt(g)} ${b < 0 ? '−' : '+'} j${fmt(Math.abs(b))}`} unit=" mS" color="var(--d-signal)" />
      </Controls>
    </>
  )
}
