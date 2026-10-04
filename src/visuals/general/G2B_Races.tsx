import { C, Diagram, Ln, T } from '../kit'

/** RACES: control operator needs an FCC amateur licence; routine drills are capped at 1 hour per week. */
export function G2B_Races() {
  const wk = (x: number, n: number) => (
    <g key={n}>
      <rect x={x} y={176} width={134} height={50} rx={8} fill={C.fill} stroke={C.muted} strokeWidth={1.8} />
      <T x={x + 67} y={190} anchor="middle" size={12.5} color={C.muted}>week {n}</T>
      <rect x={x + 8} y={202} width={20} height={16} rx={3} fill={C.power} fillOpacity={0.5} stroke={C.power} strokeWidth={2} />
      <T x={x + 38} y={210} size={13} bold color={C.power}>up to 1 h</T>
    </g>
  )
  return (
    <Diagram w={640} h={290} title="RACES, the Radio Amateur Civil Emergency Service. The control operator must hold an FCC-issued amateur operator license; a government official without one does not qualify. Routine RACES training drills and tests are limited to one hour per week" caption="Licensed amateur at the key. Routine drills: no more than 1 hour each week.">
      <T x={14} y={20} size={14} bold color={C.current}>Who may be control operator?</T>
      <rect x={14} y={38} width={296} height={84} rx={12} fill={C.good} fillOpacity={0.14} stroke={C.good} strokeWidth={2} />
      <T x={162} y={62} anchor="middle" size={14} bold color={C.good}>Yes</T>
      <T x={162} y={88} anchor="middle" size={13.5}>Someone holding an</T>
      <T x={162} y={106} anchor="middle" size={13.5} bold>FCC-issued amateur license</T>
      <rect x={330} y={38} width={296} height={84} rx={12} fill={C.bad} fillOpacity={0.14} stroke={C.bad} strokeWidth={2} />
      <T x={478} y={62} anchor="middle" size={14} bold color={C.bad}>No</T>
      <T x={478} y={88} anchor="middle" size={13.5}>A government official</T>
      <T x={478} y={106} anchor="middle" size={13.5} bold>with no amateur license</T>
      <Ln x1={14} y1={146} x2={626} y2={146} color={C.fill2} width={1.5} dash="4 4" />
      <T x={14} y={166} size={14} bold color={C.power}>Routine training drills and tests</T>
      {[14, 168, 322, 476].map((x, i) => wk(x, i + 1))}
      <T x={14} y={254} size={13.5} color={C.muted}>Without special authorization, more than 1 hour in a week is too much.</T>
    </Diagram>
  )
}
