import type { ReactNode } from 'react'
import { C, Diagram, Ln, T } from '../kit'

interface Card { name: string; good: [string, string]; weak: [string, string]; art: ReactNode }

const W = 148, GAP = 10, X0 = 12
const dots = (cols: number, rows: number, x: number, y: number, step: number, fill: string) =>
  Array.from({ length: rows }, (_, r) => Array.from({ length: cols }, (_, c) => <circle key={`${r}-${c}`} cx={x + c * step} cy={y + r * step} r={2.6} fill={fill} />))

const Breadboard = () => (
  <g>
    <rect x={14} y={18} width={120} height={72} rx={6} fill={C.fill2} stroke={C.muted} strokeWidth={1.5} />
    {dots(5, 3, 26, 28, 12, C.muted)}
    {dots(5, 3, 80, 28, 12, C.muted)}
    <Ln x1={74} y1={22} x2={74} y2={86} color={C.muted} width={1.5} dash="3 3" />
    <Ln x1={26} y1={52} x2={62} y2={76} color={C.current} width={3} />
    <Ln x1={98} y1={28} x2={122} y2={76} color={C.voltage} width={3} />
  </g>
)
const Perfboard = () => (
  <g>
    <rect x={14} y={18} width={120} height={72} rx={4} fill={C.fill2} stroke={C.muted} strokeWidth={1.5} />
    {dots(8, 5, 30, 32, 12.5, C.muted)}
    <rect x={42} y={38} width={36} height={12} rx={3} fill={C.resist} fillOpacity={0.6} stroke={C.ink} strokeWidth={1.2} />
    <polyline points="30,70 55,70 55,57 105,57" fill="none" stroke={C.signal} strokeWidth={2.5} strokeLinejoin="round" />
    <circle cx={30} cy={70} r={4} fill={C.ink} /><circle cx={105} cy={57} r={4} fill={C.ink} />
  </g>
)
const DeadBug = () => (
  <g>
    <rect x={14} y={30} width={120} height={60} rx={4} fill={C.resist} fillOpacity={0.3} stroke={C.resist} strokeWidth={1.5} />
    <rect x={44} y={34} width={52} height={22} rx={3} fill={C.fill} stroke={C.ink} strokeWidth={1.5} />
    {[0, 1, 2, 3].map((i) => <Ln key={i} x1={52 + i * 13} y1={56} x2={52 + i * 13} y2={44} color={C.ink} width={2} />)}
    {[0, 1, 2, 3].map((i) => <Ln key={i} x1={52 + i * 13} y1={34} x2={52 + i * 13} y2={22} color={C.ink} width={2} />)}
    <rect x={104} y={62} width={16} height={16} rx={2} fill={C.signal} fillOpacity={0.5} stroke={C.ink} strokeWidth={1.2} />
    <rect x={26} y={66} width={16} height={16} rx={2} fill={C.signal} fillOpacity={0.5} stroke={C.ink} strokeWidth={1.2} />
    <Ln x1={42} y1={74} x2={104} y2={70} color={C.signal} width={2} />
  </g>
)
const Pcb = () => (
  <g>
    <rect x={14} y={18} width={120} height={72} rx={6} fill={C.good} fillOpacity={0.18} stroke={C.good} strokeWidth={1.5} />
    <polyline points="28,34 70,34 70,60 112,60" fill="none" stroke={C.good} strokeWidth={3} strokeLinejoin="round" />
    <polyline points="28,74 90,74 90,40 112,40" fill="none" stroke={C.good} strokeWidth={3} strokeLinejoin="round" />
    {[[28, 34], [112, 60], [28, 74], [112, 40]].map(([x, y]) => <circle key={`${x}${y}`} cx={x} cy={y} r={5} fill={C.bg} stroke={C.good} strokeWidth={2.5} />)}
    <rect x={56} y={44} width={26} height={14} rx={2} fill={C.fill} stroke={C.ink} strokeWidth={1.2} />
  </g>
)

const CARDS: Card[] = [
  { name: 'Breadboard', good: ['Quick experiments', 'with no soldering'], weak: ['Stray capacitance and', 'long leads: poor at RF'], art: <Breadboard /> },
  { name: 'Perfboard', good: ['One-off audio, power', 'and simple circuits'], weak: ['Untidy wiring that is', 'hard to repeat'], art: <Perfboard /> },
  { name: 'Dead-bug / Manhattan', good: ['RF prototypes over a', 'solid ground plane'], weak: ['Fragile and fiddly;', 'hard to duplicate'], art: <DeadBug /> },
  { name: 'Printed circuit board', good: ['Repeatable, compact,', 'kits and production'], weak: ['Design and fabrication', 'effort up front'], art: <Pcb /> },
]

/** Four ways to build a circuit and where each does best. */
export function ConstructionMethods_Methods() {
  return (
    <Diagram w={640} h={280}
      title="Four construction methods: solderless breadboard, perfboard, dead-bug or Manhattan construction over a ground plane, and printed circuit board, each with what it is good for and where it is weak"
      caption="Most designs pass through several of these: idea on a breadboard, prototype dead-bug, final on a PCB.">
      {CARDS.map((c, i) => {
        const x = X0 + i * (W + GAP)
        return (
          <g key={c.name} transform={`translate(${x},8)`}>
            <rect width={W} height={264} rx={12} fill={C.fill} />
            <g transform="translate(0,6)">{c.art}</g>
            <T x={W / 2} y={120} anchor="middle" size={12.5} bold>{c.name}</T>
            <T x={10} y={150} size={12} bold color={C.good}>Good for</T>
            <T x={10} y={168} size={12} color={C.muted}>{c.good[0]}</T>
            <T x={10} y={184} size={12} color={C.muted}>{c.good[1]}</T>
            <T x={10} y={214} size={12} bold color={C.bad}>Weak at</T>
            <T x={10} y={232} size={12} color={C.muted}>{c.weak[0]}</T>
            <T x={10} y={248} size={12} color={C.muted}>{c.weak[1]}</T>
          </g>
        )
      })}
    </Diagram>
  )
}
