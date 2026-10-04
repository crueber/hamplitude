import { C, Diagram, Ln, Lines, T } from '../kit'

const PHASES: [string, string[], string][] = [
  ['Open', ['call the net', 'to order, state', 'purpose, ID'], C.power],
  ['Priority', ['ask for any', 'emergency or', 'priority traffic'], C.bad],
  ['Check-in', ['take calls in', 'a set order,', 'log each one'], C.signal],
  ['Traffic', ['direct who', 'passes what', 'to whom'], C.resist],
  ['Close', ['thank stations,', 'release the net,', 'ID'], C.good],
]

/** Typical flow of a directed net, with the net log. */
export function NetControl_Session() {
  return (
    <Diagram w={640} h={330} title="Typical phases of a directed net run by the net control station: open the net, ask for emergency and priority traffic first, take check-ins and log them, direct the passing of traffic, then close the net and identify. Throughout, net control keeps a log of who checked in, when, and what traffic was passed." caption="A typical order, not a rule: your net's own procedure comes first.">
      {PHASES.map(([a, lines, col], i) => {
        const x = 6 + i * 128
        return (
          <g key={a}>
            <rect x={x} y={20} width={116} height={138} rx={12} fill={C.fill} stroke={col} strokeWidth={2.4} />
            <circle cx={x + 22} cy={42} r={12} fill={col} fillOpacity={0.2} stroke={col} strokeWidth={2} />
            <T x={x + 22} y={42} anchor="middle" bold size={13}>{i + 1}</T>
            <T x={x + 58} y={78} anchor="middle" bold size={15}>{a}</T>
            <Lines x={x + 58} y={106} lines={lines} lh={18} anchor="middle" size={12.5} color={C.muted} />
            {i < 4 && <Ln x1={x + 118} y1={89} x2={x + 126} y2={89} color={C.ink} width={2} arrow />}
          </g>
        )
      })}
      <rect x={6} y={186} width={628} height={128} rx={12} fill={C.fill} stroke={C.muted} strokeWidth={1.8} />
      <T x={22} y={208} size={14} bold>The net log (kept by net control, start to finish)</T>
      {['Time', 'Call sign', 'Name', 'Location', 'Traffic / notes'].map((h, i) => (
        <g key={h}>
          <rect x={22 + i * 120} y={226} width={116} height={28} rx={6} fill={C.signal} fillOpacity={0.15} stroke={C.signal} strokeWidth={1.4} />
          <T x={80 + i * 120} y={240} anchor="middle" size={12.5} bold>{h}</T>
        </g>
      ))}
      <T x={22} y={282} size={13} color={C.muted}>One row per check-in. Never rely on memory: after the net, the log is the record.</T>
    </Diagram>
  )
}
