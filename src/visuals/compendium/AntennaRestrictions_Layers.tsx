import { C, Diagram, Lines, T } from '../kit'

/** The three layers that can limit an antenna in the US, and which one PRB-1 reaches. */
export function AntennaRestrictions_Layers() {
  const cards: { x: number; color: string; title: string; lines: string[]; badge: string[]; badgeColor: string }[] = [
    { x: 10, color: C.power, title: '1  Federal', lines: ['FCC Part 97 rules', 'FAA and FCC tower rules', 'for structures over 200 ft', 'or near an airport'], badge: ['National rules', 'apply everywhere'], badgeColor: C.muted },
    { x: 224, color: C.signal, title: '2  State and local', lines: ['Zoning and height limits', 'Setbacks, permits', 'Building and electrical codes'], badge: ['PRB-1 applies:', 'accommodate, with the', 'minimum practical rules'], badgeColor: C.good },
    { x: 438, color: C.resist, title: '3  Private agreements', lines: ['HOA covenants (CC&Rs)', 'Deed restrictions', 'Apartment or rental lease'], badge: ['PRB-1 does not apply:', 'read your documents'], badgeColor: C.bad },
  ]
  return (
    <Diagram w={640} h={308} title="Three layers that can limit an antenna in the US: federal rules, state and local government rules where PRB-1 applies, and private agreements such as homeowners' association covenants where PRB-1 does not apply"
      caption="Federal rules set the baseline, local government regulates land use, and private contracts can be stricter. PRB-1 reaches only the middle layer.">
      {cards.map((c) => (
        <g key={c.title}>
          <rect x={c.x} y={16} width={192} height={228} rx={12} fill={C.fill} stroke={c.color} strokeWidth={2.5} />
          <T x={c.x + 14} y={42} size={14} bold color={c.color}>{c.title}</T>
          <Lines x={c.x + 14} y={70} lines={c.lines} lh={20} size={12.5} />
          <rect x={c.x + 10} y={152} width={172} height={84} rx={8} fill={C.bg} stroke={c.badgeColor} strokeWidth={2} />
          <Lines x={c.x + 96} y={176 + (c.badge.length === 2 ? 10 : 0)} lines={c.badge} lh={20} size={12.5} bold anchor="middle" color={c.badgeColor === C.muted ? C.ink : c.badgeColor} />
        </g>
      ))}
      <T x={320} y={274} size={14} bold anchor="middle">Your antenna has to satisfy all three</T>
      <T x={320} y={294} size={12.5} anchor="middle" color={C.muted}>Not legal advice: rules differ by place and change over time</T>
    </Diagram>
  )
}
