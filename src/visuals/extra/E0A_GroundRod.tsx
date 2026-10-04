import { C, Diagram, Ln, T } from '../kit'

const bolt = 'M120,18 L104,60 L120,60 L104,100'

/** An external ground rod gives lightning charge a path into the earth to dissipate. */
export function GroundRod() {
  const gy = 190
  return (
    <Diagram w={640} h={300} title="An external earth connection or ground rod is there for lightning charge dissipation: a strike on the tower is carried down and spread into the earth"
      caption="The rod's job: let lightning's charge spread into the earth.">
      <rect x={20} y={gy} width={600} height={90} fill={C.fill} />
      <Ln x1={20} y1={gy} x2={620} y2={gy} color={C.muted} width={3} />
      <path d={bolt} fill="none" stroke={C.resist} strokeWidth={6} strokeLinejoin="round" strokeLinecap="round" />
      <T x={140} y={26} size={13} bold color={C.resist}>lightning</T>
      <Ln x1={120} y1={100} x2={120} y2={gy} color={C.ink} width={6} />
      <Ln x1={96} y1={100} x2={144} y2={100} color={C.resist} width={5} />
      <T x={152} y={140} size={13} bold>tower</T>
      <Ln x1={120} y1={gy} x2={120} y2={gy + 66} color={C.good} width={9} />
      <T x={140} y={gy + 80} size={13} bold color={C.good}>ground rod</T>
      {[-1, 1].map((d) => [24, 48, 72].map((r) => (
        <path key={`${d}${r}`} d={`M${120 + d * 14},${gy + 40} q${d * r},${-8} ${d * r * 1.3},${30}`} fill="none" stroke={C.current} strokeWidth={2} strokeDasharray="3 5" opacity={0.8} />
      )))}
      <T x={300} y={gy + 44} size={13} bold color={C.current}>charge spreads out in the earth</T>
      <T x={290} y={34} size={16} bold color={C.good}>Ground rod: lightning</T>
      <T x={290} y={58} size={14} color={C.muted}>Carries a strike's charge into the earth.</T>
      <T x={290} y={104} size={14} bold color={C.bad}>Not its primary job:</T>
      <T x={290} y={128} size={14} color={C.muted}>static on power lines</T>
      <T x={290} y={150} size={14} color={C.muted}>reducing RF current between equipment</T>
      <T x={290} y={172} size={14} color={C.muted}>protecting the breaker panel</T>
    </Diagram>
  )
}
