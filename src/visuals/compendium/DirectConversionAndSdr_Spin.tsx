import { C, Diagram, Ln, T, TAU, useTime } from '../kit'

function Wheel({ cx, cy, dir, t, color, title, sub }: { cx: number; cy: number; dir: 1 | -1; t: number; color: string; title: string; sub: string }) {
  const r = 62
  const th = dir * TAU * t * 0.35 + 0.6 * dir
  const px = cx + r * Math.cos(th), py = cy - r * Math.sin(th)
  return (
    <g>
      <T x={cx} y={cy - r - 36} anchor="middle" bold size={14} color={color}>{title}</T>
      <T x={cx} y={cy - r - 18} anchor="middle" size={12.5} color={C.muted}>{sub}</T>
      <circle cx={cx} cy={cy} r={r} fill={C.fill} stroke={C.muted} strokeOpacity={0.5} strokeWidth={1.5} />
      <Ln x1={cx - r - 8} y1={cy} x2={cx + r + 8} y2={cy} color={C.muted} width={1.5} />
      <Ln x1={cx} y1={cy + r + 8} x2={cx} y2={cy - r - 8} color={C.muted} width={1.5} />
      <T x={cx + r + 12} y={cy} size={12.5} bold color={C.current}>I</T>
      <T x={cx + 10} y={cy + r + 14} size={12.5} bold color={C.voltage}>Q</T>
      <Ln x1={cx} y1={cy} x2={px} y2={py} color={color} width={3} arrow />
      {/* shadows on each axis */}
      <Ln x1={px} y1={py} x2={px} y2={cy} color={C.current} width={1.5} dash="3 3" />
      <Ln x1={px} y1={py} x2={cx} y2={py} color={C.voltage} width={1.5} dash="3 3" />
      <circle cx={px} cy={cy} r={5.5} fill={C.current} />
      <circle cx={cx} cy={py} r={5.5} fill={C.voltage} />
      {/* turning-direction arc */}
      <path d={dir === 1 ? `M${cx + 22},${cy - 4} A22,22 0 0 0 ${cx + 4},${cy - 22}` : `M${cx + 4},${cy - 22} A22,22 0 0 1 ${cx + 22},${cy - 4}`} fill="none" stroke={color} strokeWidth={2} markerEnd="url(#hx-arrow)" />
    </g>
  )
}

/** A signal above the local oscillator spins one way on the I/Q plane; below it spins the other way. */
export function DirectConversionAndSdr_Spin() {
  const { t, ref } = useTime(1)
  return (
    <Diagram w={640} h={290} svgRef={ref}
      title="I/Q plane. A signal 1 kHz above the local oscillator is a point spinning counter-clockwise once per millisecond; one 1 kHz below it spins clockwise. The I shadow (horizontal axis) moves the same way for both; only the Q shadow (vertical axis) tells the two apart."
      caption="Signal relative to the LO is a spinning arrow. The I shadow (blue) is the same for both; the Q shadow (red) moves oppositely.">
      <Wheel cx={165} cy={150} dir={1} t={t} color={C.signal} title="1 kHz above the LO" sub="spins counter-clockwise" />
      <Wheel cx={475} cy={150} dir={-1} t={t} color={C.power} title="1 kHz below the LO" sub="spins clockwise" />
      <T x={320} y={150} anchor="middle" size={12.5} color={C.muted}>I alone</T>
      <T x={320} y={168} anchor="middle" size={12.5} color={C.muted}>cannot tell</T>
      <T x={320} y={266} anchor="middle" size={12.5} bold color={C.ink}>I + Q together: which way it spins, so which side of the LO</T>
    </Diagram>
  )
}
