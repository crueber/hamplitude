import { C, Diagram, T, Transformer, Wire } from '../kit'

const ROWS = [
  { y: 62, name: '1:1 balun', right: 'Dipole (balanced)', rightSub: 'about 50 to 70 Ω' },
  { y: 182, name: '4:1 balun', right: 'Balanced load', rightSub: 'about 200 Ω' },
  { y: 302, name: '49:1 unun (or 9:1)', right: 'End-fed (unbalanced)', rightSub: 'a few kΩ' },
]

/** Three common transformers on a coax feed: a 1:1 balun, a 4:1 balun and a 49:1 unun. */
export function BalunsAndUnuns_Types() {
  return (
    <Diagram w={640} h={372}
      title="Three common transformers between coax and an antenna. A 1 to 1 balun connects 50 ohm coax to a balanced dipole. A 4 to 1 balun connects it to a balanced load of about 200 ohms. A 49 to 1 unun connects it to an end-fed wire of a few thousand ohms."
      caption="Balun: balanced to unbalanced. Unun: unbalanced to unbalanced. Impedance ratio is the turns ratio squared (2:1 turns gives 4:1; 7:1 gives 49:1).">
      {ROWS.map((r) => (
        <g key={r.name}>
          <rect x={10} y={r.y - 32} width={170} height={64} rx={9} fill={C.fill} stroke={C.ink} strokeWidth={2} />
          <T x={95} y={r.y - 9} anchor="middle" size={14} bold>Coax</T>
          <T x={95} y={r.y + 13} anchor="middle" size={12.5} color={C.muted}>50 Ω, unbalanced</T>
          <Wire pts={[[180, r.y - 18], [270, r.y - 18], [270, r.y - 30], [311, r.y - 30]]} />
          <Wire pts={[[180, r.y + 18], [270, r.y + 18], [270, r.y + 30], [311, r.y + 30]]} />
          <Transformer x={320} y={r.y} color={C.power} />
          <Wire pts={[[329, r.y - 30], [370, r.y - 30], [370, r.y - 18], [460, r.y - 18]]} />
          <Wire pts={[[329, r.y + 30], [370, r.y + 30], [370, r.y + 18], [460, r.y + 18]]} />
          <T x={320} y={r.y + 50} anchor="middle" size={13} bold color={C.power}>{r.name}</T>
          <rect x={460} y={r.y - 32} width={170} height={64} rx={9} fill={C.fill} stroke={C.resist} strokeWidth={2} />
          <T x={545} y={r.y - 9} anchor="middle" size={14} bold>{r.right}</T>
          <T x={545} y={r.y + 13} anchor="middle" size={12.5} color={C.muted}>{r.rightSub}</T>
        </g>
      ))}
    </Diagram>
  )
}
