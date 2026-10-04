import type { ReactNode } from 'react'
import { C, Diagram, T } from '../kit'

const body = { fill: C.fill2, stroke: C.ink, strokeWidth: 2.5 } as const
const pin = { stroke: C.ink, strokeWidth: 3, strokeLinecap: 'round' } as const

const Dip = () => (
  <g>
    <rect x={-18} y={-34} width={36} height={68} rx={3} {...body} />
    <path d="M-5,-34 a5,5 0 0 0 10,0" fill="none" stroke={C.ink} strokeWidth={2} />
    {[0, 1, 2, 3].map((i) => <g key={i} {...pin}><line x1={-18} y1={-24 + i * 16} x2={-30} y2={-24 + i * 16} /><line x1={18} y1={-24 + i * 16} x2={30} y2={-24 + i * 16} /></g>)}
  </g>
)
const Plcc = () => (
  <g>
    <rect x={-26} y={-26} width={52} height={52} rx={3} {...body} />
    <polygon points="-26,-26 -14,-26 -26,-14" fill={C.ink} />
    {[-14, 0, 14].map((o) => (
      <g key={o} {...pin} strokeWidth={2.5}>
        <line x1={o} y1={-26} x2={o} y2={-33} /><line x1={o} y1={26} x2={o} y2={33} />
        <line x1={-26} y1={o} x2={-33} y2={o} /><line x1={26} y1={o} x2={33} y2={o} />
      </g>
    ))}
  </g>
)
const Bga = () => (
  <g>
    <rect x={-28} y={-28} width={56} height={56} rx={3} {...body} />
    {[-18, -6, 6, 18].flatMap((x) => [-18, -6, 6, 18].map((y) => <circle key={`${x}${y}`} cx={x} cy={y} r={3.4} fill={C.ink} />))}
  </g>
)
const Sot = () => (
  <g>
    <rect x={-16} y={-14} width={32} height={28} rx={3} {...body} />
    <g {...pin} strokeWidth={4}><line x1={-8} y1={14} x2={-8} y2={22} /><line x1={8} y1={14} x2={8} y2={22} /><line x1={0} y1={-14} x2={0} y2={-22} /></g>
  </g>
)

const TILES: { name: string; draw: ReactNode; smd: boolean; hook: [string, string] }[] = [
  { name: 'DIP', draw: <Dip />, smd: false, hook: ['two rows of pins on', 'opposite sides'] },
  { name: 'PLCC', draw: <Plcc />, smd: true, hook: ['leads on all', 'four sides'] },
  { name: 'BGA', draw: <Bga />, smd: true, hook: ['solder balls', 'underneath'] },
  { name: 'SOT', draw: <Sot />, smd: true, hook: ['tiny package,', 'few leads'] },
]

/** Package types: DIP is through-hole; PLCC, BGA and SOT are surface-mount. */
export function Packages() {
  const tw = 145, gap = 12, pad = 10
  return (
    <Diagram w={640} h={196} title="Package types. DIP (dual in-line package) has two rows of pins on opposite sides and is through-hole. PLCC, BGA and SOT are surface-mount packages."
      caption="Through-hole pins go through the board. Surface-mount parts sit on top of it.">
      {TILES.map((t, i) => (
        <g key={t.name} transform={`translate(${pad + i * (tw + gap)},${pad})`}>
          <rect width={tw} height={176} rx={12} fill={C.fill} />
          <g transform={`translate(${tw / 2},64)`}>{t.draw}</g>
          <T x={tw / 2} y={118} anchor="middle" bold size={15}>{t.name}</T>
          <T x={tw / 2} y={138} anchor="middle" size={12} color={C.muted}>{t.hook[0]}</T>
          <T x={tw / 2} y={153} anchor="middle" size={12} color={C.muted}>{t.hook[1]}</T>
          <T x={tw / 2} y={168} anchor="middle" size={12} bold color={t.smd ? C.good : C.resist}>{t.smd ? 'surface mount' : 'through-hole'}</T>
        </g>
      ))}
    </Diagram>
  )
}
