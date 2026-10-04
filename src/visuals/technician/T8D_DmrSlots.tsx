import { C, Diagram, Ln, T } from '../kit'

/** DMR time-multiplexes two conversations onto one 12.5 kHz channel by alternating time slots. */
export function DmrSlots() {
  const x0 = 140, sw = 60, n = 8
  const s = (i: number) => x0 + i * sw
  return (
    <Diagram w={640} h={258} title="DMR time-multiplexing: two digital voice conversations alternate in time slots on a single 12.5 kilohertz repeater channel" caption="Slots alternate fast enough that each conversation sounds continuous.">
      <T x={14} y={50} size={15} bold color={C.current}>Talk 1</T>
      <T x={14} y={70} size={12.5} color={C.muted}>slot 1</T>
      <T x={14} y={110} size={15} bold color={C.resist}>Talk 2</T>
      <T x={14} y={130} size={12.5} color={C.muted}>slot 2</T>
      {Array.from({ length: n }, (_, i) => {
        const a = i % 2 === 0
        return (
          <g key={i}>
            <rect x={s(i) + 2} y={a ? 40 : 100} width={sw - 4} height={34} rx={6} fill={a ? C.current : C.resist} fillOpacity={0.9} />
            <Ln x1={s(i) + sw / 2} y1={a ? 74 : 134} x2={s(i) + sw / 2} y2={174} color={a ? C.current : C.resist} width={1.5} dash="3 4" />
            <rect x={s(i) + 2} y={176} width={sw - 4} height={34} rx={6} fill={a ? C.current : C.resist} fillOpacity={0.9} />
          </g>
        )
      })}
      <T x={14} y={186} size={15} bold>One channel</T>
      <T x={14} y={206} size={12.5} color={C.muted}>12.5 kHz</T>
      <Ln x1={x0} y1={232} x2={x0 + n * sw} y2={232} color={C.muted} width={2} arrow />
      <T x={x0 + n * sw} y={246} size={12.5} color={C.muted} anchor="end">time</T>
    </Diagram>
  )
}
