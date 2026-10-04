import { C, Diagram, Ln, T } from '../kit'

/** FT8 is turn-taking in fixed time slots. Answer on a clear audio frequency in the alternate slot. */
export function G2E_Ft8Slots() {
  const x0 = 110, sw = 125, top = 54, h = 150
  const fy = (f: number) => top + h - f * h
  return (
    <Diagram w={640} h={300} title="FT8 stations take turns in fixed time slots. The station calling CQ transmits in one slot, so you answer in the alternate slot, on a clear audio frequency you pick from the waterfall, not necessarily the caller's frequency" caption="Time slot = who talks now. Waterfall frequency = where. Answer in the other slot, on a clear spot.">
      {[0, 1, 2, 3].map((i) => (
        <g key={i}>
          <rect x={x0 + i * sw} y={top - 28} width={sw - 4} height={24} rx={6} fill={i % 2 ? C.current : C.resist} fillOpacity={0.2} />
          <T x={x0 + i * sw + sw / 2 - 2} y={top - 16} anchor="middle" size={13} bold color={i % 2 ? C.current : C.resist}>{i % 2 ? 'slot B: you' : 'slot A: caller'}</T>
        </g>
      ))}
      <rect x={x0} y={top} width={4 * sw - 4} height={h} rx={6} fill={C.fill} stroke={C.fill2} strokeWidth={1.5} />
      <T x={14} y={top + 20} size={13} bold color={C.muted}>waterfall</T>
      <T x={14} y={top + 40} size={13} color={C.muted}>(audio freq)</T>
      {[0, 2].map((i) => <rect key={i} x={x0 + i * sw + 6} y={fy(0.65) - 8} width={sw - 16} height={16} rx={4} fill={C.resist} fillOpacity={0.55} stroke={C.resist} strokeWidth={2} />)}
      {[1, 3].map((i) => <rect key={i} x={x0 + i * sw + 6} y={fy(0.25) - 8} width={sw - 16} height={16} rx={4} fill={C.current} fillOpacity={0.55} stroke={C.current} strokeWidth={2} />)}
      <Ln x1={x0 + 4} y1={fy(0.65)} x2={x0 + 4 * sw - 8} y2={fy(0.65)} color={C.resist} width={1.2} dash="3 5" />
      <T x={x0 + 4 * sw - 12} y={fy(0.65) - 18} anchor="end" size={12.5} color={C.resist}>caller's frequency</T>
      <T x={x0 + 4 * sw - 12} y={fy(0.25) + 22} anchor="end" size={12.5} color={C.current}>a clear spot</T>
      <T x={x0} y={238} size={14} bold>Slots are 15 s long and strictly timed.</T>
      <rect x={14} y={254} width={612} height={34} rx={8} fill={C.fill} stroke={C.muted} strokeWidth={1.6} />
      <T x={26} y={271} size={13.5}>Needs your computer clock to be within about <tspan fontWeight={700}>1 second</tspan> of true time.</T>
    </Diagram>
  )
}
