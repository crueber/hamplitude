import { C, Diagram, T } from '../kit'

/** In the session: who is responsible and what happens when something goes wrong. */
export function E1E_Session() {
  const rows = [
    { h: 'Who is responsible for conduct?', a: 'Each administering VE', c: C.signal },
    { h: 'Examinee will not follow instructions?', a: 'Immediately terminate that exam. No warning, no completing it.', c: C.bad },
    { h: 'Who may not be examined by a VE?', a: 'Relatives of the VE, as listed in the FCC rules', c: C.resist },
    { h: 'A VE fraudulently certifies an exam?', a: 'License grant revoked, operator license suspended', c: C.power },
  ]
  return (
    <Diagram w={640} h={356} title="During an exam session each administering VE is responsible for conduct and supervision. A candidate who fails to follow instructions has the exam terminated immediately. A VE may not examine relatives listed in the FCC rules. A VE who fraudulently administers or certifies an exam may have the station license revoked and the operator license suspended." caption="The rule names relatives, not friends or employees.">
      {rows.map((r, i) => {
        const y = 6 + i * 87
        return (
          <g key={r.h}>
            <rect x={6} y={y} width={628} height={78} rx={10} fill={r.c} fillOpacity={0.12} stroke={r.c} strokeWidth={2} />
            <T x={20} y={y + 24} bold size={14} color={r.c}>{r.h}</T>
            <T x={20} y={y + 54} size={14}>{r.a}</T>
          </g>
        )
      })}
    </Diagram>
  )
}
