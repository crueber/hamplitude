import type { ReactNode } from 'react'
import { C, Diagram, T, Transistor, Transformer } from '../kit'

const S = { stroke: C.ink, strokeWidth: 2.4, fill: 'none', strokeLinecap: 'round', strokeLinejoin: 'round' } as const
const Head = ({ x, y, rot }: { x: number; y: number; rot: number }) => (
  <polygon points="0,0 -9,-4.5 -9,4.5" transform={`translate(${x},${y}) rotate(${rot})`} fill={C.ink} stroke="none" />
)

/** Symbols as drawn in exam figure G7-1. */
const FET = () => (
  <g {...S}>
    <circle cx={6} cy={0} r={26} strokeWidth={1.8} opacity={0.6} />
    <line x1={-34} y1={0} x2={-6} y2={0} /><Head x={-1} y={0} rot={0} />
    <line x1={0} y1={-16} x2={0} y2={16} strokeWidth={3.5} />
    <polyline points="0,-12 14,-12 14,-40" /><polyline points="0,12 14,12 14,40" />
  </g>
)
const Zener = () => (
  <g {...S}>
    <line x1={0} y1={-44} x2={0} y2={-12} /><line x1={0} y1={14} x2={0} y2={44} />
    <polygon points="0,-12 -13,14 13,14" fill={C.ink} />
    <polyline points="-20,-18 -14,-12 14,-12 20,-6" />
  </g>
)
const Varactor = () => (
  <g {...S}>
    <line x1={0} y1={-44} x2={0} y2={-22} /><line x1={0} y1={14} x2={0} y2={44} />
    <path d="M-14,-18 Q0,-28 14,-18" />
    <line x1={-14} y1={-10} x2={14} y2={-10} />
    <polygon points="0,-10 -13,14 13,14" fill={C.ink} />
  </g>
)
const Tapped = () => (
  <g {...S}>
    <line x1={0} y1={-46} x2={0} y2={-30} /><line x1={0} y1={30} x2={0} y2={46} />
    <path d="M0,-30 a7,7.5 0 0 0 0,15 a7,7.5 0 0 0 0,15 a7,7.5 0 0 0 0,15 a7,7.5 0 0 0 0,15" />
    <polyline points="0,0 24,0" /><circle cx={24} cy={0} r={3} fill={C.ink} />
  </g>
)
const Pot = () => (
  <g {...S}>
    <polyline points="0,-46 0,-30 8,-24 -8,-12 8,0 -8,12 8,24 0,30 0,46" />
    <line x1={-36} y1={-4} x2={-10} y2={-4} /><Head x={-7} y={-4} rot={0} />
  </g>
)

const TILES: { n: string; hook: string[]; draw: ReactNode; col?: string }[] = [
  { n: '1 · FET', hook: ['Circle, channel bar,', 'gate lead with arrow'], draw: <FET /> },
  { n: '2 · NPN transistor', hook: ['Base lead, emitter', 'arrow points out'], draw: <g transform="scale(0.85)"><Transistor x={-4} y={0} kind="npn" /></g> },
  { n: '5 · Zener diode', hook: ['Diode whose bar', 'has bent ends'], draw: <Zener /> },
  { n: '6 · Transformer', hook: ['Two coils, bars between:', 'solid core'], draw: <g transform="scale(1.15)"><Transformer x={0} y={0} /></g> },
  { n: '7 · Tapped inductor', hook: ['One coil with a', 'tap wire off its side'], draw: <Tapped /> },
  { n: '4 · Varactor', hook: ['Diode plus a curved', 'capacitor plate'], draw: <Varactor /> },
  { n: '11 · Potentiometer', hook: ['Resistor with an', 'arrow to its middle'], draw: <Pot /> },
]

export function G71Symbols() {
  const cols = 4, gap = 10, pad = 8, tw = (640 - 2 * pad - gap * (cols - 1)) / cols, th = 176
  const h = 2 * th + gap + 2 * pad
  return (
    <Diagram w={640} h={h} title="The schematic symbols from figure G7-1 that the questions ask about: field effect transistor, NPN transistor, Zener diode, solid core transformer, tapped inductor, plus two lookalikes, the varactor diode and the potentiometer."
      caption="Look for the one detail that gives each symbol away.">
      {TILES.map((t, k) => {
        const row = Math.floor(k / cols), col = k % cols
        const x = pad + (row === 1 ? (tw + gap) * col + (640 - 2 * pad - (3 * tw + 2 * gap)) / 2 : (tw + gap) * col)
        const y = pad + row * (th + gap)
        return (
          <g key={t.n} transform={`translate(${x},${y})`}>
            <rect width={tw} height={th} rx={12} fill={C.fill} />
            {row === 1 && k >= 5 && <rect width={tw} height={th} rx={12} fill="none" stroke={C.fill2} strokeWidth={2} strokeDasharray="5 5" />}
            <g transform={`translate(${tw / 2},66)`}>{t.draw}</g>
            <T x={tw / 2} y={130} anchor="middle" bold size={13}>{t.n}</T>
            <T x={tw / 2} y={149} anchor="middle" size={12} color={C.muted}>{t.hook[0]}</T>
            <T x={tw / 2} y={165} anchor="middle" size={12} color={C.muted}>{t.hook[1]}</T>
          </g>
        )
      })}
    </Diagram>
  )
}
