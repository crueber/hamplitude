import { C, Diagram, Ln, T } from '../kit'

/** A mobile whip is a monopole over a vehicle body: the metal body is the ground plane. */
export function MobileWhipsAndLoading_Vehicle() {
  const mx = 220, roof = 140
  return (
    <Diagram w={640} h={300}
      title="A mobile whip on the center of a car roof. The metal body acts as the ground plane that the whip works against: return current spreads out through the roof and body. A loading coil near the base makes a short whip electrically longer"
      caption="The whip is only half the antenna. The vehicle body is the other half.">
      <path d="M40,236 L40,206 Q40,192 60,188 L120,180 L160,140 L280,140 L320,178 L360,186 Q380,192 380,208 L380,236 Z" fill={C.fill} stroke={C.ink} strokeWidth={3} strokeLinejoin="round" />
      <circle cx={110} cy={238} r={24} fill={C.fill2} stroke={C.ink} strokeWidth={3} />
      <circle cx={310} cy={238} r={24} fill={C.fill2} stroke={C.ink} strokeWidth={3} />
      <path d="M130,182 L164,146 L216,146 L216,182 Z M228,182 L228,146 L276,146 L308,182 Z" fill={C.bg} stroke={C.muted} strokeWidth={1.5} />
      <Ln x1={mx} y1={roof} x2={mx} y2={124} color={C.ink} width={5} />
      <path d={`M${mx},124 ` + Array.from({ length: 5 }, () => 'a8,4 0 0 1 0,-8').join(' ')} fill="none" stroke={C.power} strokeWidth={3.5} strokeLinecap="round" />
      <Ln x1={mx} y1={84} x2={mx} y2={16} color={C.ink} width={5} />
      <circle cx={mx} cy={roof} r={6} fill={C.bg} stroke={C.power} strokeWidth={3} />
      <Ln x1={mx + 16} y1={110} x2={mx + 16} y2={56} color={C.current} width={3} arrow />
      <Ln x1={166} y1={132} x2={mx - 14} y2={132} color={C.resist} width={3} arrow />
      <Ln x1={274} y1={132} x2={mx + 14} y2={132} color={C.resist} width={3} arrow />
      <path d="M62,198 Q110,166 150,150" fill="none" stroke={C.resist} strokeWidth={3} strokeDasharray="1 7" strokeLinecap="round" markerEnd="url(#hx-arrow)" />
      <path d="M362,198 Q330,170 296,150" fill="none" stroke={C.resist} strokeWidth={3} strokeDasharray="1 7" strokeLinecap="round" markerEnd="url(#hx-arrow)" />

      <Ln x1={mx + 26} y1={34} x2={430} y2={34} color={C.muted} width={1} />
      <T x={436} y={30} size={13} bold>whip: the radiating half</T>
      <T x={436} y={48} size={12} color={C.muted}>current flows up it</T>
      <Ln x1={mx + 14} y1={104} x2={430} y2={104} color={C.muted} width={1} />
      <T x={436} y={100} size={13} bold color={C.power}>loading coil</T>
      <T x={436} y={118} size={12} color={C.muted}>makes a short whip resonate</T>
      <Ln x1={296} y1={166} x2={430} y2={166} color={C.muted} width={1} />
      <T x={436} y={162} size={13} bold color={C.resist}>return current in the body</T>
      <T x={436} y={180} size={12} color={C.muted}>roof center gives the most</T>
      <T x={436} y={196} size={12} color={C.muted}>even pattern all round</T>
      <T x={mx - 6} y={272} anchor="middle" size={13} color={C.muted}>the whole metal body is the ground plane</T>
    </Diagram>
  )
}
