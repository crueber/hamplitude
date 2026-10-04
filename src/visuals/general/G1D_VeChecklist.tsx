import { C, Diagram, T } from '../kit'

/** Who can be a VE, and what a General-class VE can give. */
export function G1D_VeChecklist() {
  const items = [
    { h: 'Accredited by', v: 'a VEC', c: C.signal },
    { h: 'Minimum age', v: '18', c: C.signal },
    { h: 'License needed', v: 'General or above', c: C.signal },
    { h: 'Technician exam', v: '3 VEs, General+', c: C.power },
  ]
  return (
    <Diagram w={640} h={210} title="Volunteer Examiner requirements: accredited by a Volunteer Examiner Coordinator, at least 18 years old, hold an FCC General class or higher license (citizenship does not matter), and a Technician exam needs at least three VEs of General class or higher. A General class VE may give Technician exams only" caption="VE basics.">
      {items.map((it, i) => {
        const x = 6 + i * 158
        return (
          <g key={it.h}>
            <rect x={x} y={6} width={150} height={96} rx={10} fill={C.fill} stroke={it.c} strokeWidth={2} />
            <T x={x + 75} y={30} anchor="middle" size={13} color={C.muted} bold>{it.h}</T>
            <T x={x + 75} y={66} anchor="middle" size={it.v.length > 8 ? 14 : 24} bold color={it.c}>{it.v}</T>
          </g>
        )
      })}
      <rect x={6} y={120} width={628} height={80} rx={10} fill={C.fill} stroke={C.good} strokeWidth={2} />
      <T x={320} y={146} anchor="middle" size={14}>A US citizen is not required. A non-US-citizen VE just needs</T>
      <T x={320} y={166} anchor="middle" size={14}>an FCC General or higher license.</T>
      <T x={320} y={188} anchor="middle" size={14} bold color={C.good}>A General-class VE may give Technician exams only.</T>
    </Diagram>
  )
}
