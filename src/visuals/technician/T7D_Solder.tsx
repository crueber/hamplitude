import { C, Diagram, T } from '../kit'

function Joint({ cx, good }: { cx: number; good: boolean }) {
  const gy = 176
  return (
    <g>
      <rect x={cx - 110} y={gy} width={220} height={18} rx={3} fill={C.fill2} stroke={C.muted} strokeWidth={2} />
      <rect x={cx - 7} y={50} width={14} height={gy - 50} fill={C.fill} stroke={C.ink} strokeWidth={2} />
      {good ? (
        <>
          <path d={`M${cx - 78},${gy} Q${cx - 16},${gy - 6} ${cx - 7},${gy - 62} L${cx + 7},${gy - 62} Q${cx + 16},${gy - 6} ${cx + 78},${gy} Z`} fill={C.bg} />
          <path d={`M${cx - 78},${gy} Q${cx - 16},${gy - 6} ${cx - 7},${gy - 62} L${cx + 7},${gy - 62} Q${cx + 16},${gy - 6} ${cx + 78},${gy} Z`} fill={C.muted} fillOpacity={0.35} stroke={C.ink} strokeWidth={2} strokeLinejoin="round" />
          <path d={`M${cx - 50},${gy - 8} Q${cx - 22},${gy - 14} ${cx - 15},${gy - 44}`} fill="none" stroke={C.bg} strokeWidth={3.5} strokeLinecap="round" />
          <path d={`M${cx + 50},${gy - 8} Q${cx + 22},${gy - 14} ${cx + 15},${gy - 44}`} fill="none" stroke={C.bg} strokeWidth={3.5} strokeLinecap="round" />
        </>
      ) : (
        <>
          <path d={`M${cx - 60},${gy} Q${cx - 66},${gy - 14} ${cx - 48},${gy - 20} Q${cx - 44},${gy - 40} ${cx - 26},${gy - 38} Q${cx - 24},${gy - 66} ${cx - 7},${gy - 56} L${cx + 7},${gy - 56} Q${cx + 26},${gy - 70} ${cx + 28},${gy - 40} Q${cx + 50},${gy - 44} ${cx + 48},${gy - 20} Q${cx + 70},${gy - 16} ${cx + 62},${gy} Z`} fill={C.bg} />
          <path d={`M${cx - 60},${gy} Q${cx - 66},${gy - 14} ${cx - 48},${gy - 20} Q${cx - 44},${gy - 40} ${cx - 26},${gy - 38} Q${cx - 24},${gy - 66} ${cx - 7},${gy - 56} L${cx + 7},${gy - 56} Q${cx + 26},${gy - 70} ${cx + 28},${gy - 40} Q${cx + 50},${gy - 44} ${cx + 48},${gy - 20} Q${cx + 70},${gy - 16} ${cx + 62},${gy} Z`} fill={C.muted} fillOpacity={0.35} stroke={C.ink} strokeWidth={2} strokeLinejoin="round" strokeDasharray="1 5" strokeLinecap="round" />
          <path d={`M${cx - 7},${gy - 30} L${cx - 14},${gy - 20}`} stroke={C.bad} strokeWidth={2.5} strokeLinecap="round" />
          <path d={`M${cx + 7},${gy - 18} L${cx + 15},${gy - 8}`} stroke={C.bad} strokeWidth={2.5} strokeLinecap="round" />
        </>
      )}
    </g>
  )
}

/** Good solder joint vs cold joint. */
export function SolderJoints() {
  return (
    <Diagram w={640} h={262} title="A good solder joint is shiny and smooth with a concave fillet. A cold solder joint looks rough, lumpy and dull."
      caption="A cold joint didn't get hot enough to flow: it's weak and a poor connection.">
      <Joint cx={165} good />
      <Joint cx={475} good={false} />
      <T x={165} y={22} anchor="middle" bold size={15} color={C.good}>Good joint</T>
      <T x={165} y={228} anchor="middle" size={13} color={C.ink}>bright, smooth, shiny</T>
      <T x={475} y={22} anchor="middle" bold size={15} color={C.bad}>Cold joint</T>
      <T x={475} y={228} anchor="middle" size={13} color={C.ink}>rough, lumpy, dull</T>
      <T x={165} y={248} anchor="middle" size={12} color={C.muted}>solder flowed and wetted the lead</T>
      <T x={475} y={248} anchor="middle" size={12} color={C.muted}>solder balled up</T>
    </Diagram>
  )
}
