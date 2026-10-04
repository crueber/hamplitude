import { C, Box, Diagram, Ln, T, useTime } from '../kit'

const STNS = [
  { x: 70, y: 70, call: 'W1AA' },
  { x: 570, y: 70, call: 'K2BB' },
  { x: 70, y: 230, call: 'N3CC' },
  { x: 570, y: 230, call: 'KD4DD' },
]

/** Net control calls the net to order and directs who talks. */
export function Net() {
  const { t, ref } = useTime(0.5)
  const hot = Math.floor(Math.max(0, t) / 1.5) % 4
  return (
    <Diagram w={640} h={330} title="A net: the net control station calls the net to order and directs which station transmits next. Stations transmit only when directed, unless reporting an emergency." caption="Stations talk through net control's direction. Exception: an emergency report." svgRef={ref}>
      {STNS.map((s, i) => {
        const on = i === hot
        const ex = s.x < 320 ? 236 : 404, ey = s.y < 150 ? 132 : 168
        const dx = ex - s.x, dy = ey - s.y
        const len = Math.hypot(dx, dy)
        const sx = s.x + (dx / len) * 34, sy = s.y + (dy / len) * 34
        return (
          <g key={s.call}>
            <Ln x1={sx} y1={sy} x2={ex} y2={ey} color={on ? C.signal : C.muted} width={on ? 3.5 : 1.8} dash={on ? undefined : '5 5'} arrow={on ? 'both' : false} />
            <circle cx={s.x} cy={s.y} r={32} fill={on ? C.signal : C.fill} fillOpacity={on ? 0.2 : 1} stroke={on ? C.signal : C.ink} strokeWidth={on ? 3 : 2} />
            <T x={s.x} y={s.y} anchor="middle" bold size={13}>{s.call}</T>
          </g>
        )
      })}
      <Box x={236} y={118} w={168} h={64} label="Net Control" sub="directs the net" color={C.power} />
      <T x={320} y={26} anchor="middle" bold size={14} color={C.power}>1. calls the net to order</T>
      <T x={320} y={50} anchor="middle" size={13}>2. stations check in</T>
      <T x={320} y={70} anchor="middle" size={13}>3. net control directs who speaks</T>
      <T x={320} y={296} anchor="middle" size={13} color={C.muted}>Highlighted station has been told to go ahead.</T>
    </Diagram>
  )
}
