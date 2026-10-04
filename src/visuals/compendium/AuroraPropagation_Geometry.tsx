import { C, Diagram, Ln, T, useTime } from '../kit'

/** Aurora backscatter is aspect-sensitive: it returns strongly only when the beam meets the field-aligned irregularities at right angles. */
export function AuroraPropagation_Geometry() {
  const { t, ref } = useTime(0.5)
  const gy = 262
  // field lines lean toward the south going up (left on screen); beam is perpendicular to them
  const ux = -0.34, uy = -0.94 // up along a field line, screen coords
  const bx = 0.94, by = -0.342 // beam direction, perpendicular to the field lines
  const sx = 70, sy = gy - 6
  const L = 380
  const ex = sx + bx * L, ey = sy + by * L
  const f = (t % 1.6) / 1.6
  const out = f < 0.5
  const k = out ? f * 2 : (1 - f) * 2 + 0
  const dx = sx + bx * L * k, dy = sy + by * L * k
  return (
    <Diagram w={640} h={300} svgRef={ref}
      title="Auroral backscatter geometry: the aurora contains irregularities stretched along the Earth's magnetic field lines. A beam aimed north at a low angle meets those lines at right angles and is scattered back toward its source, so the signal returns only when the beam and field lines are at right angles"
      caption="Schematic side view, north to the right. Not to scale.">
      <rect x={20} y={gy} width={600} height={30} rx={8} fill={C.fill} stroke={C.muted} strokeWidth={1.5} />
      {[210, 310, 410, 510, 600].map((x) => (
        <Ln key={x} x1={x} y1={gy} x2={x + ux * 215} y2={gy + uy * 215} color={C.muted} width={1.5} dash="6 6" opacity={0.8} />
      ))}
      <T x={30} y={52} size={12.5} color={C.muted}>dashed: Earth's magnetic field lines</T>
      <g stroke={C.good} strokeWidth={7} strokeLinecap="round" opacity={0.5}>
        {[-3, -2, -1, 0, 1, 2, 3].map((i) => {
          const cx = ex + i * 17, cy = ey - Math.abs(i) * 2
          return <line key={i} x1={cx - ux * 36} y1={cy - uy * 36} x2={cx + ux * 36} y2={cy + uy * 36} />
        })}
      </g>
      <T x={ex} y={ey - 64} anchor="middle" size={13} bold color={C.good}>aurora: stripes along the field lines</T>
      <Ln x1={sx} y1={sy} x2={ex - 14} y2={ey + 5} color={C.signal} width={3} dash="2 7" />
      <circle cx={dx} cy={dy} r={7} fill={C.signal} stroke={C.bg} strokeWidth={2} />
      <Ln x1={sx} y1={gy} x2={sx} y2={gy - 14} color={C.ink} width={3} />
      <T x={sx} y={gy + 17} anchor="middle" size={13} bold>You</T>
      <T x={sx - 4} y={gy - 118} style={{ paintOrder: 'stroke', stroke: 'var(--d-bg)', strokeWidth: 5 }} size={13} bold color={C.signal}>beam aimed north,</T>
      <T x={sx - 4} y={gy - 100} style={{ paintOrder: 'stroke', stroke: 'var(--d-bg)', strokeWidth: 5 }} size={13} bold color={C.signal}>low elevation</T>
      <T x={620} y={ey + 74} anchor="end" style={{ paintOrder: 'stroke', stroke: 'var(--d-bg)', strokeWidth: 5 }} size={12.5} color={C.muted}>strong echo only at right angles</T>
      <T x={30} y={30} size={14} bold color={C.muted}>S</T>
      <T x={608} y={30} anchor="end" size={14} bold color={C.muted}>N</T>
    </Diagram>
  )
}
