import { C, Diagram, Ln, T } from '../kit'

/** Two kinds of spot: reported by a person, or decoded by a receiver, and what each tells you. */
export function SpottingNetworks_Sources() {
  return (
    <Diagram w={640} h={360} title="Two kinds of spot. A human spot comes from an operator who heard or worked a station and posts it to a cluster; it tells you who is active and where, but only where people are looking. An automatic spot comes from a receiver running a decoder that uploads every signal it hears; it tells you which paths are open right now, from wherever receivers are. Both are reports of what was heard at a place, not guarantees about where you are." caption="A spot says 'heard here'. It says nothing about stations that nobody was listening for.">
      <rect x={8} y={12} width={306} height={226} rx={12} fill={C.fill} stroke={C.resist} strokeWidth={2.4} />
      <T x={161} y={36} anchor="middle" bold size={15} color={C.resist}>Human spot</T>
      <T x={161} y={58} anchor="middle" size={12.5} color={C.muted}>an operator posts what they heard or worked</T>
      <circle cx={60} cy={110} r={22} fill={C.fill2} stroke={C.ink} strokeWidth={2} />
      <T x={60} y={110} anchor="middle" size={12} bold>you</T>
      <Ln x1={84} y1={110} x2={130} y2={110} color={C.resist} width={2.4} arrow />
      <rect x={134} y={86} width={80} height={48} rx={10} fill={C.fill2} stroke={C.resist} strokeWidth={2} />
      <T x={174} y={110} anchor="middle" size={12.5} bold>cluster</T>
      <Ln x1={216} y1={110} x2={262} y2={110} color={C.resist} width={2.4} arrow />
      <T x={286} y={110} anchor="middle" size={12.5} bold>all</T>
      <T x={22} y={166} size={13}>Shows who is on the air and where.</T>
      <T x={22} y={190} size={13}>Often flags rare or wanted stations.</T>
      <T x={22} y={214} size={13} color={C.muted}>Depends on people bothering to post.</T>

      <rect x={326} y={12} width={306} height={226} rx={12} fill={C.fill} stroke={C.signal} strokeWidth={2.4} />
      <T x={479} y={36} anchor="middle" bold size={15} color={C.signal}>Automatic spot</T>
      <T x={479} y={58} anchor="middle" size={12.5} color={C.muted}>a receiver decodes and uploads by software</T>
      <rect x={338} y={86} width={80} height={48} rx={10} fill={C.fill2} stroke={C.signal} strokeWidth={2} />
      <T x={378} y={110} anchor="middle" size={12.5} bold>receiver</T>
      <Ln x1={420} y1={110} x2={466} y2={110} color={C.signal} width={2.4} arrow />
      <rect x={470} y={86} width={80} height={48} rx={10} fill={C.fill2} stroke={C.signal} strokeWidth={2} />
      <T x={510} y={110} anchor="middle" size={12.5} bold>database</T>
      <Ln x1={552} y1={110} x2={584} y2={110} color={C.signal} width={2.4} arrow />
      <T x={608} y={110} anchor="middle" size={12.5} bold>map</T>
      <T x={340} y={166} size={13}>Shows which paths are open now.</T>
      <T x={340} y={190} size={13}>Covers only what receivers <tspan fontWeight={700}>heard</tspan>.</T>
      <T x={340} y={214} size={13} color={C.muted}>Thin where there are few receivers.</T>

      <rect x={8} y={256} width={624} height={92} rx={12} fill="none" stroke={C.bad} strokeWidth={2} strokeDasharray="6 5" />
      <T x={320} y={278} anchor="middle" size={14} bold color={C.bad}>Read with care</T>
      <T x={320} y={302} anchor="middle" size={13}>A missing spot does not mean a closed band. Spots reflect where listeners are,</T>
      <T x={320} y={324} anchor="middle" size={13}>so a quiet map can mean no one was listening or no one was calling.</T>
    </Diagram>
  )
}
