import { C, Diagram, Ln, T } from '../kit'

const PARTS = [
  { x: 8, c: C.signal, t: 'Prefix: whose call it is', l: ['The ITU gives each country', 'blocks of prefixes. US calls', 'start with K, N, W or AA–AL.'] },
  { x: 218, c: C.resist, t: 'Number: usually a region', l: ['In the US, a call area from', '0 to 9. It need not match', 'where you live now.'] },
  { x: 428, c: C.power, t: 'Suffix: you', l: ['One to three letters, given', 'in sequence or chosen by', 'you (a vanity call).'] },
]
const CHIPS = [
  { c: 'VE3XXX', n: 'Canada' },
  { c: 'DL1XXX', n: 'Germany' },
  { c: 'JA1XXX', n: 'Japan' },
  { c: 'VK2XXX', n: 'Australia' },
]

/** Anatomy of a call sign: prefix, number, suffix, and what each part tells you. */
export function CallSigns_Anatomy() {
  const cw = 33.6, x0 = 320 - 3 * cw
  const px = [x0 + cw, x0 + 2.5 * cw, x0 + 4.5 * cw]
  return (
    <Diagram w={640} h={336} title="A call sign has a prefix that says which country issued it, a number that usually marks a region, and a suffix that identifies the operator. Most countries use a similar pattern, for example VE3XXX in Canada, DL1XXX in Germany, JA1XXX in Japan and VK2XXX in Australia"
      caption="Example calls use XXX in place of a real suffix.">
      <text x={x0} y={38} fontSize={56} fontWeight={700} style={{ fontFamily: 'var(--font-mono)' }} dominantBaseline="central" textAnchor="start">
        <tspan fill={C.signal}>KF</tspan><tspan fill={C.resist}>1</tspan><tspan fill={C.power}>XXX</tspan>
      </text>
      {PARTS.map((p, i) => {
        const bx = p.x + 102
        return (
          <g key={p.t}>
            <Ln x1={px[i]} y1={72} x2={bx} y2={98} color={p.c} width={2.2} />
            <rect x={p.x} y={98} width={204} height={106} rx={12} fill={C.fill} stroke={p.c} strokeWidth={2.2} />
            <T x={p.x + 12} y={118} size={13} bold color={p.c}>{p.t}</T>
            {p.l.map((l, j) => <T key={l} x={p.x + 12} y={144 + j * 19} size={12.5}>{l}</T>)}
          </g>
        )
      })}
      <T x={8} y={232} size={13} bold color={C.muted}>Similar pattern worldwide</T>
      {CHIPS.map((k, i) => {
        const x = 8 + i * 158
        return (
          <g key={k.c}>
            <rect x={x} y={250} width={148} height={64} rx={10} fill={C.fill} stroke={C.muted} strokeWidth={1.8} />
            <T x={x + 74} y={272} anchor="middle" size={17} bold mono>{k.c}</T>
            <T x={x + 74} y={297} anchor="middle" size={12.5} color={C.muted}>{k.n}</T>
          </g>
        )
      })}
    </Diagram>
  )
}
