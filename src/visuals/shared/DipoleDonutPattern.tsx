import { C, Diagram, Ln, T, TAU } from '../kit'

/** Half-wave dipole radiation: figure-8 seen from above, circle seen end-on (a donut around the wire). */
export function DipoleDonutPattern() {
  const W = 640, H = 335
  const cx = 160, cy = 185, R = 100
  // field of a half-wave dipole vs angle from the wire axis: cos(π/2·cosφ) / sinφ
  const pts: string[] = []
  for (let i = 0; i <= 180; i++) {
    const a = (i / 180) * TAU
    const s = Math.sin(a)
    const r = Math.abs(s) < 1e-4 ? 0 : Math.abs(Math.cos((Math.PI / 2) * Math.cos(a)) / s)
    pts.push(`${i ? 'L' : 'M'}${(cx + R * r * Math.cos(a)).toFixed(1)},${(cy - R * r * s).toFixed(1)}`)
  }
  const ex = 480
  return (
    <Diagram w={W} h={H} title="Half-wave dipole radiation pattern: a figure-eight seen from above, strongest broadside to the wire and weakest off its ends; seen end-on it is a circle, so the 3-D shape is a donut around the wire"
      caption="The wire is the hole of the donut. Signal is strongest straight out from its side, weakest off its ends.">
      <T x={cx} y={16} anchor="middle" bold size={15} color={C.muted}>Seen from above</T>
      <path d={pts.join('') + 'Z'} fill={C.signal} fillOpacity={0.2} stroke={C.signal} strokeWidth={3} strokeLinejoin="round" />
      <Ln x1={cx - 62} y1={cy} x2={cx + 62} y2={cy} color={C.resist} width={6} />
      <T x={cx} y={cy + 22} anchor="middle" size={12} bold color={C.resist}>wire</T>
      <Ln x1={cx} y1={cy - 106} x2={cx} y2={cy - 134} color={C.good} width={3} arrow />
      <Ln x1={cx} y1={cy + 106} x2={cx} y2={cy + 134} color={C.good} width={3} arrow />
      <T x={cx + 12} y={cy - 128} size={13} bold color={C.good}>strongest: broadside</T>
      <T x={cx - 68} y={cy - 14} anchor="end" size={12} bold color={C.bad}>weak off</T>
      <T x={cx - 68} y={cy + 4} anchor="end" size={12} bold color={C.bad}>the ends</T>
      <T x={cx + 68} y={cy - 14} size={12} bold color={C.bad}>weak off</T>
      <T x={cx + 68} y={cy + 4} size={12} bold color={C.bad}>the ends</T>

      <T x={ex} y={16} anchor="middle" bold size={15} color={C.muted}>Seen end-on</T>
      <circle cx={ex} cy={cy} r={84} fill={C.signal} fillOpacity={0.2} stroke={C.signal} strokeWidth={3} />
      <circle cx={ex} cy={cy} r={9} fill={C.resist} />
      <circle cx={ex} cy={cy} r={2.5} fill={C.bg} />
      {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => {
        const a = (i * TAU) / 8
        return <Ln key={i} x1={ex + 24 * Math.cos(a)} y1={cy + 24 * Math.sin(a)} x2={ex + 66 * Math.cos(a)} y2={cy + 66 * Math.sin(a)} color={C.good} width={2} arrow />
      })}
      <T x={ex} y={cy + 106} anchor="middle" size={13} bold color={C.good}>equal all around the wire</T>
      <T x={ex} y={cy + 130} anchor="middle" size={13} color={C.muted}>(wire points at you)</T>
    </Diagram>
  )
}
