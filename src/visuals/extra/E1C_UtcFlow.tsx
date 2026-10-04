import { C, Box, Diagram, Ln, T } from '../kit'

/** 630 m / 2200 m: notify the UTC, then wait 30 days. */
export function E1C_UtcFlow() {
  return (
    <Diagram w={640} h={196} title="Before using 630 meters or 2200 meters you inform the Utilities Technology Council of your call sign and station coordinates, wait 30 days, then may operate unless told your station is within 1 kilometer of power line carrier systems using those frequencies." caption="No approval needed, but the 30-day wait and the 1 km check are.">
      <Box x={6} y={30} w={190} h={84} label="Tell the UTC" sub="call sign + coordinates" color={C.power} />
      <Ln x1={200} y1={72} x2={228} y2={72} color={C.signal} width={2.5} arrow />
      <Box x={232} y={30} w={170} h={84} label="Wait 30 days" sub="no approval needed" color={C.resist} />
      <Ln x1={406} y1={72} x2={434} y2={72} color={C.signal} width={2.5} arrow />
      <Box x={438} y={30} w={196} h={84} label="May operate" sub="unless told within 1 km" color={C.good} />
      <T x={536} y={140} anchor="middle" size={13} bold color={C.bad}>if you are told: within 1 km</T>
      <T x={536} y={158} anchor="middle" size={13} bold color={C.bad}>of a PLC system on these</T>
      <T x={536} y={176} anchor="middle" size={13} bold color={C.bad}>frequencies, do not operate</T>
      <Ln x1={536} y1={118} x2={536} y2={130} color={C.bad} width={2.5} arrow />
      <T x={6} y={150} size={14} bold>Phone is allowed on the entire 630 m band.</T>
    </Diagram>
  )
}
