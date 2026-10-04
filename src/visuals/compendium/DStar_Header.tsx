import { C, Diagram, Ln, T } from '../kit'

/** D-STAR sends call signs, not just audio: the header fields say who is calling, who is wanted and which repeaters to use. */
export function DStar_Header() {
  const f = [
    { k: 'MY', s: 'your call sign', c: C.current },
    { k: 'UR', s: 'who you are calling', c: C.resist },
    { k: 'RPT1', s: 'your repeater', c: C.signal },
    { k: 'RPT2', s: 'the gateway', c: C.power },
  ]
  const w = 146, gap = 14, x0 = 14
  return (
    <Diagram w={640} h={290}
      title="D-STAR header fields MY, UR, RPT1 and RPT2 sent at the start of every transmission, with two examples: UR set to CQCQCQ stays local, UR set to a call sign is routed through the gateway"
      caption="The radio fills these in from its menu. Routing is done by call sign, not by frequency.">
      <T x={14} y={22} size={15} bold>Header sent with every transmission</T>
      {f.map((b, i) => {
        const x = x0 + i * (w + gap)
        return (
          <g key={b.k}>
            <rect x={x} y={36} width={w} height={64} rx={10} fill={C.fill} stroke={b.c} strokeWidth={2} />
            <T x={x + w / 2} y={58} anchor="middle" size={18} bold mono color={b.c}>{b.k}</T>
            <T x={x + w / 2} y={82} anchor="middle" size={12.5} color={C.muted}>{b.s}</T>
          </g>
        )
      })}
      <T x={14} y={132} size={15} bold>What you put in UR</T>
      <rect x={14} y={146} width={612} height={56} rx={10} fill={C.fill} stroke={C.muted} strokeWidth={1.5} />
      <T x={28} y={166} size={14} bold mono color={C.resist}>CQCQCQ</T>
      <Ln x1={140} y1={166} x2={168} y2={166} color={C.muted} width={2} arrow />
      <T x={178} y={166} size={14}>Everyone listening on this repeater</T>
      <T x={28} y={186} size={12.5} color={C.muted}>an open call; stays local unless the repeater is linked</T>
      <rect x={14} y={212} width={612} height={56} rx={10} fill={C.fill} stroke={C.muted} strokeWidth={1.5} />
      <T x={28} y={232} size={14} bold mono color={C.resist}>a call sign</T>
      <Ln x1={140} y1={232} x2={168} y2={232} color={C.muted} width={2} arrow />
      <T x={178} y={232} size={14}>Routed through the gateway to that station</T>
      <T x={28} y={252} size={12.5} color={C.muted}>needs RPT2 set to the gateway; goes wherever that user was last heard</T>
    </Diagram>
  )
}
