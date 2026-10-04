import { C, Diagram, T } from '../kit'

const GY = 160

function Board({ c, pads }: { c: number; pads: number[] }) {
  return (
    <g>
      <rect x={c - 70} y={GY + 14} width={140} height={14} rx={3} fill={C.fill2} stroke={C.muted} strokeWidth={1.5} />
      {pads.map((p) => (
        <g key={p}>
          <rect x={c + p - 26} y={GY} width={52} height={14} rx={2} fill={C.resist} fillOpacity={0.5} stroke={C.ink} strokeWidth={1.5} />
          <rect x={c + p - 4} y={64} width={8} height={GY - 36} fill={C.fill} stroke={C.ink} strokeWidth={1.5} />
        </g>
      ))}
    </g>
  )
}

const blob = { fill: C.muted, fillOpacity: 0.45, stroke: C.ink, strokeWidth: 1.5, strokeLinejoin: 'round' as const }

/** Three common faults seen in side view: too little solder, too much solder, and a bridge between neighbouring pads. */
export function Soldering_Faults() {
  const cs = [110, 320, 530]
  return (
    <Diagram w={640} h={282}
      title="Three common soldering faults. Too little solder leaves the pad barely covered. Too much solder forms a ball that can hide a poor joint. A bridge joins two neighbouring pads and shorts them together."
      caption="Judge a joint by its shape: a good one is a smooth, shiny cone that fans out over the pad. See the earlier comparison of good and cold joints.">
      <Board c={cs[0]} pads={[0]} />
      <Board c={cs[1]} pads={[0]} />
      <Board c={cs[2]} pads={[-38, 38]} />
      <path d={`M${cs[0] - 18},${GY} Q${cs[0] - 6},${GY - 4} ${cs[0] - 4},${GY - 26} L${cs[0] + 4},${GY - 26} Q${cs[0] + 6},${GY - 4} ${cs[0] + 18},${GY} Z`} {...blob} />
      <circle cx={cs[1]} cy={GY - 30} r={34} {...blob} />
      <path d={`M${cs[2] - 38 - 28},${GY} Q${cs[2] - 38 - 6},${GY - 4} ${cs[2] - 38 - 4},${GY - 44} L${cs[2] - 38 + 4},${GY - 44} Q${cs[2]},${GY - 14} ${cs[2] + 38 - 4},${GY - 44} L${cs[2] + 38 + 4},${GY - 44} Q${cs[2] + 38 + 6},${GY - 4} ${cs[2] + 38 + 28},${GY} Z`} {...blob} />
      <ellipse cx={cs[2]} cy={GY - 8} rx={18} ry={11} fill="none" stroke={C.bad} strokeWidth={2.5} strokeDasharray="4 3" />
      {['Too little solder', 'Too much solder', 'Solder bridge'].map((t, i) => (
        <T key={t} x={cs[i]} y={26} anchor="middle" size={14} bold color={C.bad}>{t}</T>
      ))}
      <T x={cs[0]} y={218} anchor="middle" size={12.5} color={C.muted}>pad barely wetted: weak,</T>
      <T x={cs[0]} y={236} anchor="middle" size={12.5} color={C.muted}>can crack or fail intermittently</T>
      <T x={cs[1]} y={218} anchor="middle" size={12.5} color={C.muted}>a ball sits on the lead and can</T>
      <T x={cs[1]} y={236} anchor="middle" size={12.5} color={C.muted}>hide a poor connection underneath</T>
      <T x={cs[2]} y={218} anchor="middle" size={12.5} color={C.muted}>two pads shorted together:</T>
      <T x={cs[2]} y={236} anchor="middle" size={12.5} color={C.muted}>reheat and wick the excess away</T>
      <T x={cs[1]} y={264} anchor="middle" size={12.5} color={C.muted}>Fix by reheating, removing the excess with braid or a pump, then re-doing the joint.</T>
    </Diagram>
  )
}
