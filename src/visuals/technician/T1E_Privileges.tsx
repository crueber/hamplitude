import { C, Box, Diagram, Ln, T } from '../kit'

/** Frequency privileges follow the control operator's license class. */
export function Privileges() {
  return (
    <Diagram w={640} h={250} title="A Technician control operator at an Extra licensee's station has Technician privileges only" caption="The owner's license, a trustee's license, or who else is in the room changes nothing.">
      <Box x={14} y={34} w={180} h={64} label="Station owner" sub="Extra: doesn't matter" color={C.muted} fill="transparent" dash="5 4" />
      <Box x={14} y={118} w={180} h={64} label="Control operator" sub="Technician, at the mic" color={C.signal} />
      <Ln x1={196} y1={150} x2={248} y2={150} color={C.signal} width={3} arrow />
      <T x={222} y={132} anchor="middle" size={12} bold color={C.signal}>decides</T>
      <T x={270} y={30} bold size={14}>Frequency privileges</T>
      <rect x={270} y={50} width={200} height={56} rx={8} fill={C.good} fillOpacity={0.2} stroke={C.good} strokeWidth={2.2} />
      <T x={370} y={78} anchor="middle" bold size={14} color={C.good}>Technician privileges</T>
      <rect x={270} y={118} width={200} height={56} rx={8} fill={C.bad} fillOpacity={0.15} stroke={C.bad} strokeWidth={2.2} strokeDasharray="5 4" />
      <T x={370} y={146} anchor="middle" bold size={14} color={C.bad}>Extra-only segments</T>
      <T x={486} y={78} size={20} bold color={C.good}>✓</T>
      <T x={486} y={146} size={20} bold color={C.bad}>✗</T>
      <T x={510} y={78} size={12} color={C.muted}>allowed</T>
      <T x={510} y={146} size={12} color={C.muted}>never</T>
      <T x={510} y={163} size={12} color={C.muted}>(not even as a guest)</T>
      <T x={14} y={222} size={13} color={C.muted}>Exception: a life-or-property emergency (see the emergency lesson).</T>
    </Diagram>
  )
}
