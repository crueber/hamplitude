import { C, Diagram, Ln, T } from '../kit'

const W = 200, G = 10
const tx = (i: number) => 10 + i * (W + G)
const SP = 50 // atom spacing

/** Pure silicon, N-type (donor, extra electron) and P-type (acceptor, missing electron = hole) crystal lattices. */
export function SemiconductorBasics_Doping() {
  const kinds = [
    { name: 'Pure silicon', col: C.ink, sub: ['4 valence electrons', 'each shared in a bond', 'almost no free carriers'] },
    { name: 'N-type', col: C.current, sub: ['donor atom (5 electrons)', 'leaves one electron free', 'majority carrier: electrons'] },
    { name: 'P-type', col: C.resist, sub: ['acceptor atom (3 electrons)', 'leaves a gap: a hole', 'majority carrier: holes'] },
  ]
  return (
    <Diagram w={640} h={350}
      title="Three crystal lattices. Pure silicon has every bond filled. N-type silicon has a donor impurity atom with one spare electron free to move. P-type silicon has an acceptor impurity atom and one missing electron, called a hole, that acts as a positive charge carrier."
      caption="Doping adds a trace of impurity: N-type gains free electrons, P-type gains holes.">
      {kinds.map((k, i) => {
        const ox = tx(i) + W / 2, oy = 110
        const atoms: { x: number; y: number; c: boolean }[] = []
        for (let r = -1; r <= 1; r++) for (let c = -1; c <= 1; c++) atoms.push({ x: ox + c * SP, y: oy + r * SP, c: r === 0 && c === 0 })
        return (
          <g key={k.name}>
            <rect x={tx(i)} y={10} width={W} height={330} rx={12} fill={C.fill} />
            <T x={ox} y={30} anchor="middle" bold size={16} color={k.col}>{k.name}</T>
            {/* bonds */}
            {[-1, 0, 1].map((r) => (
              <g key={r}>
                <Ln x1={ox - SP} y1={oy + r * SP} x2={ox + SP} y2={oy + r * SP} color={C.muted} width={2} />
                <Ln x1={ox + r * SP} y1={oy - SP} x2={ox + r * SP} y2={oy + SP} color={C.muted} width={2} />
              </g>
            ))}
            {atoms.map((a, j) => (
              <g key={j}>
                <circle cx={a.x} cy={a.y} r={a.c && i > 0 ? 17 : 14} fill={a.c && i > 0 ? k.col : C.fill2} fillOpacity={a.c && i > 0 ? 0.28 : 1} stroke={a.c && i > 0 ? k.col : C.muted} strokeWidth={2} />
                <T x={a.x} y={a.y} anchor="middle" size={12} bold color={a.c && i > 0 ? k.col : C.muted}>{a.c ? ['Si', 'P', 'B'][i] : 'Si'}</T>
              </g>
            ))}
            {i === 1 && <circle cx={ox + 25} cy={oy - 25} r={6} fill={C.current} />}
            {i === 2 && <circle cx={ox + 25} cy={oy} r={7} fill={C.bg} stroke={C.resist} strokeWidth={2.4} strokeDasharray="3 3" />}
            {i === 1 && <T x={ox} y={192} anchor="middle" size={13} bold color={C.current}>● free electron</T>}
            {i === 2 && <T x={ox} y={192} anchor="middle" size={13} bold color={C.resist}>○ hole</T>}
            <T x={ox} y={216} anchor="middle" size={12.5} color={C.muted}>{i === 0 ? 'Si atoms in a crystal' : i === 1 ? 'impurity: phosphorus, arsenic' : 'impurity: boron, indium'}</T>
            <Ln x1={tx(i) + 16} y1={238} x2={tx(i) + W - 16} y2={238} color={C.fill2} width={2} />
            {k.sub.map((s, j) => <T key={j} x={ox} y={260 + j * 22} anchor="middle" size={12.5} bold={j === 2} color={j === 2 ? k.col : C.muted}>{s}</T>)}
          </g>
        )
      })}
    </Diagram>
  )
}
