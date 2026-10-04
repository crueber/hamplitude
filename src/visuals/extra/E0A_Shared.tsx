import { C, Diagram, Ln, T } from '../kit'

const TX = [{ n: 'TX A', v: 60, c: C.signal }, { n: 'TX B', v: 30, c: C.power }, { n: 'TX C', v: 8, c: C.resist }, { n: 'TX D', v: 4, c: C.muted }]

/** At a shared site, any transmitter making 5% or more of its own limit where the total is exceeded must act. */
export function Shared() {
  const x0 = 30, w = 5.4
  let x = x0
  const segs = TX.map((t) => { const r = { ...t, x, w: t.v * w }; x += t.v * w; return r })
  const xl = x0 + 100 * w
  return (
    <Diagram w={640} h={250} title="At a site with several transmitters, where the total exposure exceeds the limit, each transmitter that produces 5 percent or more of its own limit in that area is responsible for fixing it"
      caption="Example: four transmitters at one spot sum to 102% of the limit.">
      <T x={x0} y={22} size={14} bold color={C.muted}>Each transmitter's share of its own limit, at one spot</T>
      {segs.map((s) => (
        <g key={s.n}>
          <rect x={s.x} y={74} width={s.w} height={50} fill={s.c} fillOpacity={0.3} stroke={s.c} strokeWidth={2} />
          <T x={s.x + s.w / 2} y={99} anchor="middle" size={s.w > 30 ? 16 : 12} bold color={s.c === C.muted ? C.ink : s.c}>{`${s.v}%`}</T>
          {s.n !== 'TX D' && <T x={s.x + s.w / 2} y={60} anchor="middle" size={13} bold color={s.c}>{s.n}</T>}
        </g>
      ))}
      <T x={segs[3].x + segs[3].w / 2} y={142} anchor="middle" size={13} bold color={C.muted}>TX D</T>
      <Ln x1={xl} y1={40} x2={xl} y2={130} color={C.bad} width={3} dash="5 4" />
      <T x={xl - 8} y={42} anchor="end" size={13} bold color={C.bad}>100% limit</T>
      <T x={x0} y={184} size={14} bold color={C.good}>5% or more of its limit: must fix it. A, B and C are responsible.</T>
      <T x={x0} y={208} size={14} color={C.muted}>TX D adds only 4%, so it is not responsible.</T>
      <T x={x0} y={232} size={13} color={C.muted}>Total: 60 + 30 + 8 + 4 = 102%, over the limit</T>
    </Diagram>
  )
}
