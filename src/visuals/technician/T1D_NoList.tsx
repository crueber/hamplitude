import { C, Diagram, Ln, T } from '../kit'

/** Prohibited transmissions and their single exception, if any. */
export function T1D_NoList() {
  const rows = [
    { no: 'Messages with hidden meaning', sub: 'codes that obscure content', yes: ['Only: control commands to','space stations or model craft'], ok: true },
    { no: 'Music', sub: 'on a phone emission', yes: ['Only: incidental to retransmitting','manned-spacecraft communications'], ok: true },
    { no: 'Indecent or obscene language', sub: 'any such language', yes: ['No exception'], ok: false },
    { no: 'Countries that object', sub: 'told the ITU they object', yes: ['No exception'], ok: false },
  ]
  return (
    <Diagram w={640} h={290} title="Prohibited: obscured messages except control of space stations or model craft; music except incidental to manned spacecraft retransmissions; indecent language with no exception; communications with countries that objected to the ITU" caption="Each ban has at most one narrow exception.">
      <T x={6} y={16} size={12.5} bold color={C.bad}>PROHIBITED</T>
      <T x={290} y={16} size={12.5} bold color={C.muted}>EXCEPTION</T>
      {rows.map((r, i) => {
        const y = 32 + i * 64
        const col = r.ok ? C.good : C.bad
        return (
          <g key={r.no}>
            <rect x={6} y={y} width={252} height={54} rx={9} fill={C.bad} fillOpacity={0.12} stroke={C.bad} strokeWidth={2} />
            <T x={18} y={y + 19} bold size={14}>{r.no}</T>
            <T x={18} y={y + 39} size={12.5} color={C.muted}>{r.sub}</T>
            <Ln x1={262} y1={y + 27} x2={284} y2={y + 27} color={C.muted} width={2.5} arrow />
            <rect x={290} y={y} width={344} height={54} rx={9} fill={col} fillOpacity={0.12} stroke={col} strokeWidth={2} />
            {r.yes.map((l, j) => (
              <T key={j} x={302} y={y + 27 + (j - (r.yes.length - 1) / 2) * 20} bold size={13.5} color={r.ok ? C.ink : C.bad}>{l}</T>
            ))}
          </g>
        )
      })}
    </Diagram>
  )
}
