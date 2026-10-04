import { C, Diagram, Ln, T } from '../kit'

const GY = 170 // top surface of the pad

function Base({ c }: { c: number }) {
  return (
    <g>
      <rect x={c - 90} y={GY + 14} width={180} height={14} rx={3} fill={C.fill2} stroke={C.muted} strokeWidth={1.5} />
      <rect x={c - 66} y={GY} width={132} height={14} rx={2} fill={C.resist} fillOpacity={0.5} stroke={C.ink} strokeWidth={1.5} />
      <rect x={c - 5} y={60} width={10} height={GY - 30} fill={C.fill} stroke={C.ink} strokeWidth={1.5} />
    </g>
  )
}

function Fillet({ c, size }: { c: number; size: number }) {
  const w = 60 * size, h = 56 * size
  const d = `M${c - w},${GY} Q${c - 14 * size},${GY - 4} ${c - 5},${GY - h} L${c + 5},${GY - h} Q${c + 14 * size},${GY - 4} ${c + w},${GY} Z`
  return <path d={d} fill={C.muted} fillOpacity={0.45} stroke={C.ink} strokeWidth={1.5} strokeLinejoin="round" />
}

function Iron({ c, lifted }: { c: number; lifted?: boolean }) {
  const [tx, ty, hx, hy] = lifted ? [c + 40, GY - 36, c + 90, 62] : [c + 12, GY - 10, c + 96, 52]
  return (
    <g>
      <Ln x1={tx} y1={ty} x2={hx} y2={hy} color={C.bad} width={9} />
      <Ln x1={hx} y1={hy} x2={hx + 12} y2={hy - 16} color={C.muted} width={14} />
    </g>
  )
}

function Solder({ c, touching }: { c: number; touching?: boolean }) {
  return <Ln x1={c - 96} y1={GY - 86} x2={c - 6} y2={touching ? GY - 12 : GY - 36} color={C.ink} width={4} />
}

/** The three steps of making a joint: heat both parts, feed solder to the joint, remove solder then iron. */
export function Soldering_Technique() {
  const cs = [110, 320, 530]
  return (
    <Diagram w={640} h={296}
      title="Soldering in three steps: first touch the iron to both the pad and the lead, then feed solder onto the joint on the opposite side from the iron, then remove the solder and then the iron"
      caption="The parts melt the solder, not the iron. Heat the joint, then feed solder to the heated metal.">
      {cs.map((c, i) => <Base key={i} c={c} />)}
      <Iron c={cs[0]} />
      <Fillet c={cs[1]} size={0.55} />
      <Iron c={cs[1]} />
      <Solder c={cs[1]} touching />
      <Fillet c={cs[2]} size={1} />
      <Iron c={cs[2]} lifted />
      {['1  Heat both parts', '2  Feed the solder', '3  Solder away, then iron'].map((t, i) => (
        <T key={t} x={cs[i]} y={26} anchor="middle" size={14} bold>{t}</T>
      ))}
      <T x={cs[0]} y={236} anchor="middle" size={12.5} color={C.muted}>tip touches pad and lead together</T>
      <T x={cs[1]} y={236} anchor="middle" size={12.5} color={C.muted}>solder on the joint, not on the tip</T>
      <T x={cs[2]} y={236} anchor="middle" size={12.5} color={C.muted}>hold still while it sets</T>
      <T x={cs[0]} y={256} anchor="middle" size={12.5} color={C.muted}>a second or two</T>
      <T x={cs[1]} y={256} anchor="middle" size={12.5} color={C.muted}>until it flows around the lead</T>
      <T x={cs[2]} y={256} anchor="middle" size={12.5} color={C.muted}>shiny, smooth, concave</T>
      <T x={cs[0] + 62} y={128} size={12} bold color={C.bad}>iron</T>
      <T x={cs[1] - 100} y={66} size={12} bold>solder</T>
    </Diagram>
  )
}
