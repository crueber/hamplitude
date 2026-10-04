import { C, Diagram, Ln, T } from '../kit'

/** A course map with net control at event headquarters and operators at checkpoints. */
export function PublicServiceEvents_Course() {
  const pts: [number, number, string, string][] = [
    [90, 200, 'Start', C.good],
    [210, 110, 'Aid 1', C.signal],
    [370, 90, 'Aid 2', C.signal],
    [530, 150, 'Turn', C.signal],
    [470, 262, 'Aid 3', C.signal],
    [250, 270, 'Finish', C.good],
  ]
  return (
    <Diagram w={640} h={340} title="Public service event communications. A looped course runs from the start, past aid stations and a turnaround, to the finish. Amateur operators sit at the start, the aid stations and the finish and report to a net control station at event headquarters. A mobile operator rides the course as a sweep or in a support vehicle. Everything on the radio goes through net control." caption="Operators report to event headquarters; headquarters decides what happens next.">
      <path d="M 90 200 Q 120 90 210 110 T 370 90 T 530 150 T 470 262 T 250 270 T 90 200" fill="none" stroke={C.muted} strokeWidth={5} strokeLinecap="round" strokeLinejoin="round" opacity={0.45} />
      <rect x={236} y={150} width={128} height={64} rx={12} fill={C.fill} stroke={C.power} strokeWidth={2.6} />
      <T x={300} y={172} anchor="middle" bold size={14}>Net control</T>
      <T x={300} y={194} anchor="middle" size={12.5} color={C.muted}>event HQ</T>
      {pts.map(([x, y, label, col]) => (
        <g key={label}>
          <Ln x1={x} y1={y} x2={x < 300 ? 236 : 364} y2={y < 182 ? 166 : 200} color={col} width={1.6} dash="5 5" />
          <circle cx={x} cy={y} r={20} fill={C.fill} stroke={col} strokeWidth={2.6} />
          <T x={x} y={y} anchor="middle" size={12} bold>{label}</T>
        </g>
      ))}
      <rect x={14} y={14} width={190} height={56} rx={10} fill="none" stroke={C.resist} strokeWidth={1.8} strokeDasharray="5 4" />
      <T x={109} y={34} anchor="middle" size={13} bold color={C.resist}>Mobile / sweep</T>
      <T x={109} y={54} anchor="middle" size={12.5} color={C.muted}>follows the last participant</T>
      <T x={620} y={318} anchor="end" size={12.5} color={C.muted}>dashed lines: radio reports to net control</T>
    </Diagram>
  )
}
