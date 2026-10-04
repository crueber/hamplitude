import { C, Diagram, Ln, T, useTime } from '../kit'

/** Why one sporadic-E hop is limited to about 2,200 km: the lowest ray leaves along the horizon and meets the layer about 100 km up. */
export function SporadicE_Reach() {
  const { t, ref } = useTime(0.3)
  const R = 520, h = 60 // exaggerated: the real E layer is only about 1.6% of the Earth's radius up
  const cx = 320, cy = 700
  const phi = Math.acos(R / (R + h))
  const ax = cx - R * Math.sin(phi), ay = cy - R * Math.cos(phi)
  const bx = cx + R * Math.sin(phi)
  const topY = cy - (R + h)
  const f = Math.min(1, (t % 1.5) / 1.2)
  const leg = f < 0.5 ? f * 2 : (f - 0.5) * 2
  const px = f < 0.5 ? ax + (cx - ax) * leg : cx + (bx - cx) * leg
  const py = f < 0.5 ? ay + (topY + 4 - ay) * leg : topY + 4 + (ay - topY - 4) * leg
  return (
    <Diagram w={640} h={300} svgRef={ref}
      title="Geometry of a single sporadic E hop. The lowest ray leaves a station along its horizon and meets the E layer about 100 kilometres up, so one hop spans at most about 2,200 kilometres. Typical hops are somewhat shorter"
      caption="Not to scale: the layer height is exaggerated about seven times. Real single hops are typically 1,000 to 2,000 km.">
      <circle cx={cx} cy={cy} r={R} fill={C.fill} stroke={C.muted} strokeWidth={2} />
      <circle cx={cx} cy={cy} r={R + h} fill="none" stroke={C.muted} strokeWidth={1.5} strokeDasharray="5 5" />
      <T x={22} y={104} size={13} bold color={C.muted}>E region, about 100 km up</T>
      <g fill={C.power} fillOpacity={0.4} stroke={C.power} strokeWidth={1.5}>
        <ellipse cx={cx - 36} cy={topY + 3} rx={44} ry={9} />
        <ellipse cx={cx + 30} cy={topY + 2} rx={36} ry={8} />
      </g>
      <T x={cx} y={topY - 18} anchor="middle" size={13} bold color={C.power}>sporadic-E cloud</T>
      <polyline points={`${ax},${ay} ${cx},${topY + 4} ${bx},${ay}`} fill="none" stroke={C.signal} strokeWidth={3} strokeDasharray="2 7" strokeLinecap="round" />
      <circle cx={px} cy={py} r={7} fill={C.signal} stroke={C.bg} strokeWidth={2} />
      {[ax, bx].map((x, i) => {
        const a = i ? phi : -phi
        const ux = Math.sin(a), uy = -Math.cos(a)
        return (
          <g key={i}>
            <Ln x1={x} y1={ay} x2={x + ux * 20} y2={ay + uy * 20} color={C.ink} width={3} />
            <T x={x + ux * 20} y={ay + uy * 20 - 16} anchor="middle" bold size={13}>{i ? 'Station B' : 'Station A'}</T>
          </g>
        )
      })}
      <Ln x1={ax} y1={ay + 28} x2={bx} y2={ay + 28} color={C.good} width={2} arrow="both" />
      <rect x={cx - 130} y={ay + 17} width={260} height={22} rx={11} fill={C.fill} stroke={C.good} strokeWidth={1.5} />
      <T x={cx} y={ay + 28} anchor="middle" size={13} bold color={C.good}>about 2,200 km at most</T>
      <T x={cx} y={ay + 55} anchor="middle" size={12.5} color={C.muted}>a ray leaving along the horizon, the longest single hop</T>
    </Diagram>
  )
}
