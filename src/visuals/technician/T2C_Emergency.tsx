import { C, Diagram, T } from '../kit'

/** Part 97 applies everywhere; only one narrow exception exists. */
export function Emergency() {
  const chips = ['Normal operating', 'ARES', 'RACES', 'FEMA plan']
  return (
    <Diagram w={640} h={250} title="FCC Part 97 rules always apply, including under ARES, RACES or a FEMA plan. The only exception: operating outside your license privileges when human life or property is in immediate danger." caption="No emergency organization or agency suspends Part 97.">
      <rect x={10} y={10} width={620} height={116} rx={14} fill={C.signal} fillOpacity={0.1} stroke={C.signal} strokeWidth={2.5} />
      <T x={320} y={34} anchor="middle" bold size={16} color={C.signal}>FCC Part 97 applies. Always.</T>
      {chips.map((c, i) => (
        <g key={c}>
          <rect x={26 + i * 150} y={62} width={140} height={44} rx={10} fill={C.fill} stroke={C.ink} strokeWidth={1.8} />
          <T x={96 + i * 150} y={84} anchor="middle" bold size={14}>{c}</T>
        </g>
      ))}
      <rect x={10} y={148} width={620} height={90} rx={14} fill="none" stroke={C.bad} strokeWidth={2.5} strokeDasharray="6 5" />
      <T x={320} y={176} anchor="middle" bold size={15} color={C.bad}>Only exception</T>
      <T x={320} y={202} anchor="middle" size={14}>Go outside your license's frequency privileges only when</T>
      <T x={320} y={222} anchor="middle" size={14} bold>immediate safety of human life or protection of property</T>
    </Diagram>
  )
}
