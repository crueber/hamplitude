import type { ReactNode } from 'react'
import { C, Diagram, T, Resistor, Capacitor, PolarizedCapacitor, Inductor, Battery, Switch, Fuse, Diode, Transistor, Transformer } from '../kit'

/**
 * Gallery of the schematic symbols that appear in the official exam figures (T-1, T-2, T-3),
 * each with a one-line "how to recognise it" hook.
 *
 *   <SymbolGallery group="basic" />   groups: basic | semi | variable | coils | all
 */
export type SymbolGroup = 'basic' | 'semi' | 'variable' | 'coils'

const S = { stroke: C.ink, strokeWidth: 2.2, fill: 'none', strokeLinecap: 'round', strokeLinejoin: 'round' } as const

/** Exam-style lamp: a dome with a smaller dome inside. Centred, terminals at ±len/2. */
export function LampDome({ len = 64 }: { len?: number }) {
  return (
    <g {...S}>
      <line x1={-len / 2} y1={8} x2={-12} y2={8} />
      <line x1={12} y1={8} x2={len / 2} y2={8} />
      <path d="M-12,8 L-12,-4 A12,13 0 0 1 12,-4 L12,8 Z" />
      <path d="M-5,8 L-5,-2 A5,6 0 0 1 5,-2 L5,8" />
    </g>
  )
}

/** Exam-style chassis ground: a bar with three slanted hatch lines. */
function ChassisGround() {
  return (
    <g {...S}>
      <line x1={0} y1={-16} x2={0} y2={-2} />
      <line x1={-14} y1={-2} x2={14} y2={-2} />
      <line x1={-8} y1={-2} x2={-12} y2={12} />
      <line x1={0} y1={-2} x2={-4} y2={12} />
      <line x1={8} y1={-2} x2={4} y2={12} />
    </g>
  )
}

/** Exam-style antenna: flat-topped triangle with a centre line, lead below. */
function AntennaTri() {
  return (
    <g {...S} transform="translate(0,-2)">
      <polygon points="-15,-14 15,-14 0,10" />
      <line x1={0} y1={-14} x2={0} y2={26} />
    </g>
  )
}

function LEDSym() {
  const head = (x: number, y: number) => <polygon points={`${x},${y} ${x - 7},${y + 2} ${x - 2},${y + 7}`} fill={C.ink} stroke="none" />
  return (
    <g {...S}>
      <line x1={-32} y1={0} x2={-9} y2={0} />
      <line x1={9} y1={0} x2={32} y2={0} />
      <polygon points="-9,-12 -9,12 9,0" fill={C.ink} fillOpacity={0.15} />
      <line x1={9} y1={-12} x2={9} y2={12} />
      <line x1={0} y1={-16} x2={11} y2={-27} />{head(14, -30)}
      <line x1={9} y1={-12} x2={20} y2={-23} />{head(23, -26)}
    </g>
  )
}

function Zener() {
  return (
    <g {...S}>
      <line x1={-32} y1={0} x2={-9} y2={0} />
      <line x1={9} y1={0} x2={32} y2={0} />
      <polygon points="-9,-12 -9,12 9,0" fill={C.ink} fillOpacity={0.15} />
      <polyline points="5,-15 9,-12 9,12 13,15" />
    </g>
  )
}

function VariableCapacitor() {
  return (
    <g {...S}>
      <line x1={-32} y1={0} x2={-4} y2={0} />
      <line x1={4} y1={0} x2={32} y2={0} />
      <line x1={-4} y1={-16} x2={-4} y2={16} />
      <line x1={4} y1={-16} x2={4} y2={16} />
      <line x1={-16} y1={17} x2={16} y2={-17} markerEnd="url(#hx-arrow)" />
    </g>
  )
}

/** Exam style: a coil with an arrow touching it (adjustable tap), looped back to the end. */
function VariableInductor() {
  return (
    <g>
      <Inductor x={0} y={0} len={64} />
      <g {...S}><polyline points="26,0 26,-26 0,-26 0,-8" markerEnd="url(#hx-arrow)" /></g>
      <circle cx={26} cy={0} r={3} fill={C.ink} />
    </g>
  )
}

/** Exam style variable resistor: zigzag with an arrow touching it, looped back to the end. */
function VariableResistorExam() {
  return (
    <g>
      <Resistor x={0} y={0} len={64} color={C.resist} />
      <g {...S} stroke={C.resist}><polyline points="26,0 26,28 0,28 0,10" markerEnd="url(#hx-arrow)" /></g>
      <circle cx={26} cy={0} r={3} fill={C.resist} />
    </g>
  )
}

function Potentiometer() {
  return (
    <g>
      <Resistor x={0} y={6} len={64} />
      <g {...S}><line x1={0} y1={-26} x2={0} y2={-6} markerEnd="url(#hx-arrow)" /></g>
    </g>
  )
}

function RegulatorIC() {
  return (
    <g {...S}>
      <rect x={-22} y={-18} width={44} height={36} rx={3} fill={C.fill} />
      <line x1={-32} y1={-8} x2={-22} y2={-8} /><line x1={22} y1={-8} x2={32} y2={-8} /><line x1={0} y1={18} x2={0} y2={26} />
      <text x={0} y={0} textAnchor="middle" dominantBaseline="central" fontSize={14} fontWeight={700} fill={C.ink} stroke="none" style={{ fontFamily: 'var(--font-body)' }}>IC</text>
    </g>
  )
}

interface Tile { name: string; hook: [string, string]; draw: () => ReactNode }

const TILES: Record<string, Tile> = {
  resistor: { name: 'Resistor', hook: ['Zigzag line:', 'current has to squeeze'], draw: () => <Resistor x={0} y={0} len={64} color={C.resist} /> },
  capacitor: { name: 'Capacitor', hook: ['Two parallel plates', 'with a gap'], draw: () => <Capacitor x={0} y={0} len={64} /> },
  electrolytic: { name: 'Polarized capacitor', hook: ['One flat, one curved', 'plate. Flat side is +'], draw: () => <PolarizedCapacitor x={0} y={0} len={64} /> },
  battery: { name: 'Battery', hook: ['Long line is +,', 'short line is −'], draw: () => <Battery x={0} y={0} len={64} cells={2} color={C.voltage} /> },
  lamp: { name: 'Lamp', hook: ['A dome with a', 'smaller dome inside'], draw: () => <LampDome /> },
  fuse: { name: 'Fuse', hook: ['A box with a', 'wire through it'], draw: () => <Fuse x={0} y={0} len={64} /> },
  switch: { name: 'Switch', hook: ['A gap with a', 'blade that can close it'], draw: () => <Switch x={0} y={0} len={64} /> },
  ground: { name: 'Ground', hook: ['A bar with three', 'slanted hatch lines'], draw: () => <ChassisGround /> },
  diode: { name: 'Diode', hook: ['Arrow points the way', 'current flows'], draw: () => <Diode x={0} y={0} len={64} /> },
  zener: { name: 'Zener diode', hook: ['Diode with bent', 'ends on the bar'], draw: () => <Zener /> },
  led: { name: 'LED', hook: ['Diode with', 'light arrows out'], draw: () => <LEDSym /> },
  npn: { name: 'Transistor', hook: ['Three leads in a circle:', 'base, collector, emitter'], draw: () => <g transform="scale(0.62)"><Transistor x={-4} y={0} kind="npn" /></g> },
  ic: { name: 'Integrated circuit', hook: ['A plain box with', 'leads, often labelled'], draw: () => <RegulatorIC /> },
  vres: { name: 'Variable resistor', hook: ['Zigzag with an arrow', 'touching its middle'], draw: () => <VariableResistorExam /> },
  pot: { name: 'Potentiometer', hook: ['Resistor with a third', 'lead: the moving wiper'], draw: () => <Potentiometer /> },
  vcap: { name: 'Variable capacitor', hook: ['Capacitor with an', 'arrow through it'], draw: () => <VariableCapacitor /> },
  vind: { name: 'Variable inductor', hook: ['Coil with an arrow', 'touching it'], draw: () => <VariableInductor /> },
  inductor: { name: 'Inductor', hook: ['Loops: a coil', 'of wire'], draw: () => <Inductor x={0} y={0} len={64} /> },
  transformer: { name: 'Transformer', hook: ['Two coils side by', 'side, bars between'], draw: () => <Transformer x={0} y={0} /> },
  antenna: { name: 'Antenna', hook: ['A triangle on a stem,', 'with a line down its middle'], draw: () => <AntennaTri /> },
}

const GROUPS: Record<SymbolGroup, string[]> = {
  basic: ['resistor', 'capacitor', 'electrolytic', 'battery', 'lamp', 'fuse', 'switch', 'ground'],
  semi: ['diode', 'zener', 'led', 'npn', 'ic'],
  variable: ['vres', 'pot', 'vcap', 'vind'],
  coils: ['inductor', 'transformer', 'antenna'],
}

export function SymbolGallery({ group, caption }: { group: SymbolGroup; caption?: string }) {
  const ids = GROUPS[group]
  const cols = ids.length === 4 || ids.length === 8 ? 4 : 3
  const gap = 10
  const pad = 10
  const w = 640
  const tw = (w - 2 * pad - gap * (cols - 1)) / cols
  const th = 138
  const rows = Math.ceil(ids.length / cols)
  const h = rows * th + (rows - 1) * gap + 2 * pad
  return (
    <Diagram w={w} h={h} title={`Schematic symbols: ${ids.map((i) => TILES[i].name).join(', ')}`} caption={caption}>
      {ids.map((id, k) => {
        const t = TILES[id]
        const x = pad + (k % cols) * (tw + gap)
        const y = pad + Math.floor(k / cols) * (th + gap)
        return (
          <g key={id} transform={`translate(${x},${y})`}>
            <rect width={tw} height={th} rx={12} fill={C.fill} />
            <g transform={`translate(${tw / 2},50)`}>{t.draw()}</g>
            <T x={tw / 2} y={96} anchor="middle" bold size={14}>{t.name}</T>
            <T x={tw / 2} y={113} anchor="middle" size={12} color={C.muted}>{t.hook[0]}</T>
            <T x={tw / 2} y={128} anchor="middle" size={12} color={C.muted}>{t.hook[1]}</T>
          </g>
        )
      })}
    </Diagram>
  )
}
