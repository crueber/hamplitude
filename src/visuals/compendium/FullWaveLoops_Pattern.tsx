import { C, Diagram, Ln, T } from '../kit'

/** A full-wave square loop seen face-on (feed point, current flow) and the top-view pattern: strongest at right angles to the loop's plane. */
export function FullWaveLoops_Pattern() {
  const lx0 = 70, lx1 = 220, ly0 = 70, ly1 = 220, fx = 145
  const cx = 480, cy = 150
  // fat figure-8 lobes: r = a + b|cos|, aimed left and right (broadside to the loop's edge-on line)
  const pts: string[] = []
  for (let i = 0; i <= 120; i++) {
    const a = (i / 120) * Math.PI * 2
    const r = 24 + 96 * Math.abs(Math.cos(a)) ** 1.4
    pts.push(`${i ? 'L' : 'M'}${(cx + r * Math.cos(a)).toFixed(1)},${(cy + r * Math.sin(a) * 0.62).toFixed(1)}`)
  }
  return (
    <Diagram w={640} h={330}
      title="A full-wave loop: one wavelength of wire in a closed shape, here a square with a quarter wavelength per side and the feed point at the bottom. Current is strongest along the bottom and top, flowing the same way in both. Seen from above, its pattern is strongest at right angles to the plane of the loop."
      caption="Fed at the bottom of a vertical loop, polarization is horizontal; fed in a side, it is vertical.">
      <T x={145} y={22} anchor="middle" size={14} bold>The loop, face-on</T>
      <path d={`M${fx},${ly1} L${lx0},${ly1} L${lx0},${ly0} L${lx1},${ly0} L${lx1},${ly1} L${fx},${ly1}`} fill="none" stroke={C.resist} strokeWidth={5} strokeLinejoin="round" strokeLinecap="round" />
      <circle cx={fx} cy={ly1} r={8} fill={C.bg} stroke={C.power} strokeWidth={3} />
      <Ln x1={fx - 50} y1={ly1 - 18} x2={fx + 50} y2={ly1 - 18} color={C.current} width={2.5} arrow />
      <Ln x1={fx - 50} y1={ly0 + 18} x2={fx + 50} y2={ly0 + 18} color={C.current} width={2.5} arrow />
      <T x={fx} y={ly1 - 34} anchor="middle" size={12} color={C.current} bold>I</T>
      <T x={fx} y={ly0 + 34} anchor="middle" size={12} color={C.current} bold>I</T>
      <T x={fx} y={ly1 + 24} anchor="middle" size={13} bold color={C.power}>feed point</T>
      <T x={145} y={ly0 - 16} anchor="middle" size={12} color={C.muted}>¼ λ per side, 1 λ in all</T>
      <T x={145} y={ly1 + 48} anchor="middle" size={12} color={C.muted}>current peaks at bottom and top,</T>
      <T x={145} y={ly1 + 66} anchor="middle" size={12} color={C.muted}>near zero mid-side</T>
      <Ln x1={320} y1={34} x2={320} y2={300} color={C.fill2} width={2} dash="4 5" />
      <T x={cx} y={22} anchor="middle" size={14} bold>Seen from above</T>
      <path d={pts.join('')} fill={C.signal} fillOpacity={0.18} stroke={C.signal} strokeWidth={3} strokeLinejoin="round" />
      <Ln x1={cx} y1={cy - 52} x2={cx} y2={cy + 52} color={C.resist} width={6} />
      <T x={cx + 10} y={cy + 66} size={12} color={C.resist} bold>loop, edge-on</T>
      <T x={cx - 100} y={cy - 84} anchor="middle" size={13} bold color={C.signal}>strongest</T>
      <T x={cx - 100} y={cy - 68} anchor="middle" size={12} color={C.muted}>at right angles</T>
      <T x={cx + 100} y={cy - 84} anchor="middle" size={13} bold color={C.signal}>strongest</T>
      <T x={cx + 100} y={cy - 68} anchor="middle" size={12} color={C.muted}>at right angles</T>
      <T x={cx} y={cy + 88} anchor="middle" size={12} color={C.muted}>weaker in the plane of the loop</T>
      <T x={cx} y={296} anchor="middle" size={12} color={C.muted}>shape is illustrative: it depends on height and ground</T>
    </Diagram>
  )
}
