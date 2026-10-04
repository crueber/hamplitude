import { C, Box, Diagram, Ln, T } from '../kit'

/** RACES: certified station, same frequencies as its control operator. */
export function E1B_Races() {
  return (
    <Diagram w={640} h={202} title="An amateur station operates under RACES rules when it is certified by the responsible civil defense organization. It may use all amateur frequencies authorized to its control operator." caption="RACES adds a certification, not new frequencies.">
      <Box x={6} y={40} w={190} h={84} label="Any FCC-licensed" sub="amateur station" color={C.ink} />
      <Ln x1={200} y1={82} x2={232} y2={82} color={C.signal} width={2.5} arrow />
      <Box x={236} y={40} w={190} h={84} label="Certified by civil" sub="defense organization" color={C.power} />
      <Ln x1={430} y1={82} x2={462} y2={82} color={C.signal} width={2.5} arrow />
      <Box x={466} y={40} w={168} h={84} label="RACES station" sub="may operate under RACES" color={C.good} />
      <T x={550} y={158} anchor="middle" size={13} bold color={C.good}>frequencies: all authorized</T>
      <T x={550} y={176} anchor="middle" size={13} bold color={C.good}>to the control operator</T>
      <T x={326} y={20} anchor="middle" size={13} bold color={C.power}>the step that matters</T>
    </Diagram>
  )
}
