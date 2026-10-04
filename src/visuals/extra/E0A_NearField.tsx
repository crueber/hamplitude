import { C, Diagram, Ln, T } from '../kit'

/** Near a dipole, E-field and H-field peaks sit in different places: E at the ends, H at the center. */
export function NearField() {
  const x0 = 80, x1 = 560, cy = 140
  const e = Array.from({ length: 97 }, (_, i) => {
    const t = i / 96
    return `${i ? 'L' : 'M'}${(x0 + (x1 - x0) * t).toFixed(1)},${(cy - 14 - 64 * Math.abs(Math.sin(Math.PI * (t - 0.5) * 1))).toFixed(1)}`
  }).join('')
  const h = Array.from({ length: 97 }, (_, i) => {
    const t = i / 96
    return `${i ? 'L' : 'M'}${(x0 + (x1 - x0) * t).toFixed(1)},${(cy + 14 + 64 * Math.cos(Math.PI * (t - 0.5))).toFixed(1)}`
  }).join('')
  return (
    <Diagram w={640} h={300} title="Near a dipole antenna the electric field is strongest near the ends and the magnetic field is strongest near the center, so their intensity peaks occur at different locations"
      caption="Near-field of a dipole, schematic. That is why E and H limits are listed separately below 300 MHz.">
      <path d={e} fill="none" stroke={C.voltage} strokeWidth={4} />
      <path d={h} fill="none" stroke={C.current} strokeWidth={4} />
      <Ln x1={x0} y1={cy} x2={x1} y2={cy} color={C.ink} width={7} />
      <circle cx={(x0 + x1) / 2} cy={cy} r={6} fill={C.resist} />
      <T x={x0} y={26} size={14} bold color={C.voltage}>E field: peaks near the ends</T>
      <T x={(x0 + x1) / 2} y={274} anchor="middle" size={14} bold color={C.current}>H field: peaks near the center</T>
      <T x={x0 - 8} y={cy + 28} anchor="end" size={12} color={C.muted}>end</T>
      <T x={x1 + 8} y={cy + 28} size={12} color={C.muted}>end</T>
    </Diagram>
  )
}
