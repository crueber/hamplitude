import { C, Box, Diagram, Ln, T } from '../kit'

/** Classes the FCC issues today vs legacy classes. */
export function T1C_Classes() {
  const old = ['Novice', 'Technician Plus', 'Advanced']
  return (
    <Diagram w={640} h={190} title="The FCC currently issues three license classes: Technician, General and Amateur Extra. Novice, Technician Plus and Advanced are no longer issued" caption="Any licensed amateur, of any class, may request a vanity call sign.">
      <T x={6} y={20} bold size={14} color={C.good}>Issued today</T>
      <Box x={6} y={64} w={130} h={64} label="Technician" sub="entry level" color={C.good} size={14} />
      <Box x={168} y={64} w={130} h={64} label="General" color={C.good} size={14} />
      <Box x={330} y={64} w={130} h={64} label="Amateur Extra" color={C.good} size={14} />
      <Ln x1={138} y1={96} x2={166} y2={96} color={C.muted} width={2.5} arrow />
      <Ln x1={300} y1={96} x2={328} y2={96} color={C.muted} width={2.5} arrow />
      <T x={494} y={20} bold size={14} color={C.muted}>No longer issued</T>
      {old.map((o, i) => (
        <Box key={o} x={494} y={40 + i * 44} w={140} h={36} label={o} color={C.muted} fill="transparent" dash="5 4" size={13} />
      ))}
      <T x={6} y={160} size={13} color={C.muted}>Each step up brings more privileges.</T>
    </Diagram>
  )
}
