import { C, Diagram, T } from '../kit'

/** Two separate layers that govern antenna structures. */
export function E1B_Zoning() {
  const card = (x: number, c: string, head: string, who: string, lines: string[]) => (
    <g>
      <rect x={x} y={8} width={308} height={170} rx={12} fill={c} fillOpacity={0.12} stroke={c} strokeWidth={2} />
      <T x={x + 154} y={34} anchor="middle" bold size={16} color={c}>{head}</T>
      <T x={x + 154} y={58} anchor="middle" size={13} color={C.muted}>{who}</T>
      {lines.map((l, i) => <T key={l} x={x + 16} y={96 + i * 30} size={14}>{l}</T>)}
    </g>
  )
  return (
    <Diagram w={640} h={190} title="Antenna structure rules come from two places. Near a public use airport you may have to notify the FAA and register the structure with the FCC under Part 17. State and local zoning is covered by PRB-1, which requires reasonable accommodation of amateur radio." caption="Airport rules protect aircraft. PRB-1 protects your antenna from over-strict zoning.">
      {card(6, C.resist, 'Near an airport', 'federal rules (Part 17)', ['You may have to notify the FAA', 'and register the structure', 'with the FCC'])}
      {card(326, C.signal, 'State and local zoning', 'PRB-1', ['Must make reasonable', 'accommodation of amateur radio', 'Not "no limits", not "always allowed"'])}
    </Diagram>
  )
}
