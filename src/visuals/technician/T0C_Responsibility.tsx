import { C, Box, Diagram, Ln, T } from '../kit'

/** Who ensures compliance, how to check it, and when to re-check. */
export function Responsibility() {
  return (
    <Diagram w={640} h={300} title="The station licensee is responsible for RF exposure compliance. Re-evaluate whenever any transmitter or antenna part changes, by calculation with OET Bulletin 65, computer modeling or measurement with calibrated equipment"
      caption="Change something, re-check. Any of the three methods is acceptable. The licensee answers for it.">
      <Box x={14} y={30} w={170} h={74} label="Change something" sub="antenna, radio, power" color={C.resist} />
      <Ln x1={184} y1={67} x2={236} y2={67} color={C.ink} width={3} arrow />
      <Box x={238} y={30} w={170} h={74} label="Re-evaluate" sub="the whole station" color={C.signal} />
      <Ln x1={408} y1={67} x2={460} y2={67} color={C.ink} width={3} arrow />
      <Box x={462} y={30} w={170} h={74} label="You are responsible" sub="the station licensee" color={C.good} />
      <T x={323} y={142} anchor="middle" size={14} bold color={C.signal}>Any one of these will do</T>
      <Ln x1={323} y1={104} x2={323} y2={128} color={C.signal} width={2} />
      <Box x={14} y={166} w={190} h={80} label="Calculate" sub="FCC OET Bulletin 65" color={C.signal} />
      <Box x={225} y={166} w={190} h={80} label="Computer model" sub="software prediction" color={C.signal} />
      <Box x={436} y={166} w={190} h={80} label="Measure" sub="calibrated equipment" color={C.signal} />
      <T x={323} y={274} anchor="middle" size={13} color={C.muted}>Not the FCC, not the neighbors, not the zoning board: you.</T>
    </Diagram>
  )
}
