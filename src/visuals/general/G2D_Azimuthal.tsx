import { C, Diagram, Ln, T } from '../kit'

/** Azimuthal map centred on home: spokes are true bearings, rings are distance. Long path is 180 degrees from short path. */
export function G2D_Azimuthal() {
  const cx = 200, cy = 160, R = 130
  const hd = 50
  const pt = (deg: number, r: number) => ({ x: cx + r * Math.sin((deg * Math.PI) / 180), y: cy - r * Math.cos((deg * Math.PI) / 180) })
  const sp = pt(hd, R - 10), lp = pt(hd + 180, R - 10), st = pt(hd, 80)
  return (
    <Diagram w={640} h={330} title="An azimuthal projection map centered on your station: straight lines from the center are true bearings and the rings are true distances. A long-path contact points the antenna 180 degrees from the short-path heading" caption="Centre = you. Any straight line from the centre is a true bearing, and ring spacing is distance.">
      {[1, 2, 3].map((k) => <circle key={k} cx={cx} cy={cy} r={(R * k) / 3} fill="none" stroke={C.fill2} strokeWidth={1.5} />)}
      {[0, 45, 90, 135, 180, 225, 270, 315].map((d) => {
        const p = pt(d, R)
        return <Ln key={d} x1={cx} y1={cy} x2={p.x} y2={p.y} color={C.fill2} width={1} />
      })}
      <T x={cx} y={cy - R - 14} anchor="middle" size={13} bold color={C.muted}>N 0°</T>
      <T x={cx + R + 8} y={cy} size={13} bold color={C.muted}>E</T>
      <T x={cx} y={cy + R + 14} anchor="middle" size={13} bold color={C.muted}>S</T>
      <T x={cx - R - 8} y={cy} anchor="end" size={13} bold color={C.muted}>W</T>
      <Ln x1={cx} y1={cy} x2={sp.x} y2={sp.y} color={C.good} width={3.5} arrow />
      <Ln x1={cx} y1={cy} x2={lp.x} y2={lp.y} color={C.bad} width={3.5} dash="8 5" arrow />
      <circle cx={st.x} cy={st.y} r={7} fill={C.good} />
      <circle cx={cx} cy={cy} r={8} fill={C.ink} />
      <T x={cx + 14} y={cy + 20} size={13} bold>you</T>
      <rect x={380} y={80} width={246} height={64} rx={12} fill={C.good} fillOpacity={0.14} stroke={C.good} strokeWidth={2} />
      <T x={394} y={100} size={14} bold color={C.good}>Short path: 50°</T>
      <T x={394} y={124} size={13.5}>the direct, shorter way round</T>
      <rect x={380} y={166} width={246} height={64} rx={12} fill={C.bad} fillOpacity={0.14} stroke={C.bad} strokeWidth={2} />
      <T x={394} y={186} size={14} bold color={C.bad}>Long path: 230°</T>
      <T x={394} y={210} size={13.5}>180° from short: 50 + 180</T>
      <T x={380} y={256} size={13.5} color={C.muted}>Same station, reached the other</T>
      <T x={380} y={276} size={13.5} color={C.muted}>way round the Earth.</T>
    </Diagram>
  )
}
