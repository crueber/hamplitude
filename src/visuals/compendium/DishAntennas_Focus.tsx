import { C, Diagram, Ln, T } from '../kit'

/** A parabola sends every parallel ray to one point, the focus, and all paths have equal length so the waves arrive in phase. */
export function DishAntennas_Focus() {
  const vx = 80, cy = 140, f = 85, hh = 105
  const px = (y: number) => vx + (y * y) / (4 * f)
  const prof = Array.from({ length: 41 }, (_, i) => {
    const y = ((i / 40) * 2 - 1) * hh
    return `${i ? 'L' : 'M'}${px(y).toFixed(1)},${(cy + y).toFixed(1)}`
  }).join('')
  const fx = vx + f
  const xr = 392
  const ys = [-82, -48, -18, 18, 48, 82]
  return (
    <Diagram w={640} h={290}
      title="A parabolic dish: waves arriving parallel to its axis reflect off the curved surface and all pass through one point, the focus, where the feed antenna sits. Every path from the wavefront to the focus has the same length, so the waves arrive in phase"
      caption="Every ray travels the same total distance to the focus, so the waves add up there. Transmitting works the same way in reverse.">
      <path d={prof} fill="none" stroke={C.ink} strokeWidth={5} strokeLinecap="round" />
      <Ln x1={xr} y1={cy - hh - 6} x2={xr} y2={cy + hh + 6} color={C.muted} width={1.5} dash="5 4" />
      <T x={xr} y={cy + hh + 22} anchor="middle" size={12} color={C.muted}>wavefront: all in phase</T>
      {ys.map((y) => (
        <g key={y}>
          <Ln x1={xr} y1={cy + y} x2={px(y) + 10} y2={cy + y} color={C.signal} width={2} arrow />
          <Ln x1={px(y)} y1={cy + y} x2={fx} y2={cy} color={C.signal} width={2} />
        </g>
      ))}
      <circle cx={fx} cy={cy} r={8} fill={C.bg} stroke={C.power} strokeWidth={3} />
      <T x={fx + 16} y={cy - 8} size={13} bold color={C.power}>feed at</T>
      <T x={fx + 16} y={cy + 9} size={13} bold color={C.power}>the focus</T>
      <Ln x1={vx} y1={cy + 6} x2={fx} y2={cy + 6} color={C.muted} width={1.5} arrow="both" />
      <circle cx={(vx + fx) / 2} cy={cy + 22} r={9} fill={C.bg} />
      <T x={(vx + fx) / 2} y={cy + 22} anchor="middle" size={13} bold color={C.ink}>f</T>
      <Ln x1={vx - 28} y1={cy - hh} x2={vx - 28} y2={cy + hh} color={C.muted} width={1.5} arrow="both" />
      <T x={vx - 38} y={cy} anchor="end" size={12} color={C.muted}>D</T>
      <T x={452} y={36} size={12} color={C.muted}>f = focal length (vertex to feed)</T>
      <T x={452} y={54} size={12} color={C.muted}>D = diameter</T>
    </Diagram>
  )
}
