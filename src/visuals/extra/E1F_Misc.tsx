import { C, Diagram, T } from '../kit'

/** Canadians, auxiliary stations, STA. */
export function E1F_Misc() {
  const rows = [
    { h: 'Canadian amateur in the US', a: 'Operating terms of the Canadian license, not to exceed US Extra privileges', c: C.signal },
    { h: 'Control operator of an auxiliary station', a: 'Technician, General, Advanced or Amateur Extra only', c: C.power },
    { h: 'Special Temporary Authority (STA)', a: 'The FCC may grant it for experimental amateur communications', c: C.resist },
  ]
  return (
    <Diagram w={640} h={262} title="A Canadian licensee may operate in the US under the terms of the Canadian license, not to exceed US Amateur Extra privileges. The control operator of an auxiliary station must hold a Technician, General, Advanced or Amateur Extra license. A Special Temporary Authority may be issued for experimental amateur communications." caption="Three one-line rules.">
      {rows.map((r, i) => {
        const y = 8 + i * 84
        return (
          <g key={r.h}>
            <rect x={6} y={y} width={628} height={74} rx={10} fill={r.c} fillOpacity={0.12} stroke={r.c} strokeWidth={2} />
            <T x={20} y={y + 22} bold size={14} color={r.c}>{r.h}</T>
            <T x={20} y={y + 50} size={14}>{r.a}</T>
          </g>
        )
      })}
    </Diagram>
  )
}
