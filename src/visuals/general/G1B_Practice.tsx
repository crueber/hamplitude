import { C, Diagram, T } from '../kit'

/** Three judgement calls and who or what settles each. */
export function G1B_Practice() {
  const cards = [
    { h: 'Not covered by Part 97?', a: 'The FCC decides', b: '"good engineering and', c: 'good amateur practice"', col: C.signal },
    { h: 'Abbreviations, signals?', a: 'Use them', b: 'if they do not obscure', c: 'the meaning', col: C.good },
    { h: 'Talk to other countries?', a: 'Yes, unless', b: 'that administration told', c: 'the ITU it objects', col: C.power },
  ]
  return (
    <Diagram w={640} h={150} title="Three rules: the FCC decides good amateur practice where Part 97 is silent; abbreviations are fine if they do not obscure meaning; international contacts are allowed except with countries that have notified the ITU of an objection" caption="Part 97 in three questions.">
      {cards.map((c, i) => {
        const x = 6 + i * 212
        return (
          <g key={c.h}>
            <rect x={x} y={6} width={204} height={138} rx={10} fill={C.fill} stroke={c.col} strokeWidth={2} />
            <T x={x + 102} y={28} anchor="middle" size={13} bold color={C.muted}>{c.h}</T>
            <T x={x + 102} y={62} anchor="middle" size={17} bold color={c.col}>{c.a}</T>
            <T x={x + 102} y={92} anchor="middle" size={13}>{c.b}</T>
            <T x={x + 102} y={112} anchor="middle" size={13}>{c.c}</T>
          </g>
        )
      })}
    </Diagram>
  )
}
