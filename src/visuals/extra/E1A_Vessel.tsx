import { C, Diagram, T } from '../kit'

/** Amateur station aboard a US-registered ship or aircraft: three checks. */
export function E1A_Vessel() {
  const rows = [
    { q: 'Who may be at the controls?', a: 'Any person with an FCC amateur license, or alien reciprocal authorization', c: C.signal },
    { q: 'What license on international waters?', a: 'Any FCC-issued amateur license. No marine or aircraft endorsement', c: C.power },
    { q: 'Before you operate?', a: 'Master of the ship or pilot in command must approve', c: C.resist },
  ]
  return (
    <Diagram w={640} h={262} title="Amateur station aboard a US-registered ship or aircraft: any FCC amateur license holder or alien reciprocal operator may be in physical control, any FCC amateur license is enough even in international waters, and the ship's master or aircraft pilot in command must approve operation" caption="Aboard ship or aircraft: same license rules, plus the captain's say-so.">
      {rows.map((r, i) => {
        const y = 8 + i * 84
        return (
          <g key={r.q}>
            <rect x={6} y={y} width={628} height={74} rx={10} fill={r.c} fillOpacity={0.12} stroke={r.c} strokeWidth={2} />
            <T x={20} y={y + 22} bold size={14} color={r.c}>{r.q}</T>
            <T x={20} y={y + 50} size={14}>{r.a}</T>
          </g>
        )
      })}
    </Diagram>
  )
}
