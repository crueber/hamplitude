import type { ReactNode } from 'react'
import { C, Diagram, T } from '../kit'

const S = { stroke: C.ink, strokeWidth: 2.2, fill: 'none', strokeLinecap: 'round', strokeLinejoin: 'round' } as const
const tri = <polygon points="-12,-12 -12,12 10,0" fill={C.ink} />
const leads = <polyline points="-38,0 -12,0" />
const lead2 = (x: number) => <line x1={x} y1={0} x2={38} y2={0} />

function Plain() {
  return <g {...S}>{leads}{tri}<line x1={10} y1={-13} x2={10} y2={13} />{lead2(10)}</g>
}
function Varactor() {
  return <g {...S}>{leads}{tri}<line x1={10} y1={-13} x2={10} y2={13} />{lead2(10)}<path d="M2,-19 Q12,0 2,19" /></g>
}
function Zener() {
  return <g {...S}>{leads}{tri}<polyline points="5,-16 10,-13 10,13 15,16" />{lead2(10)}</g>
}
function Schottky() {
  return <g {...S}>{leads}{tri}<polyline points="3,-9 3,-15 11,-15 11,15 19,15 19,9" />{lead2(11)}</g>
}
function Led() {
  const head = (x: number, y: number) => <polygon points={`${x},${y} ${x - 7},${y + 2} ${x - 2},${y + 7}`} fill={C.ink} stroke="none" />
  return (
    <g {...S}>{leads}{tri}<line x1={10} y1={-13} x2={10} y2={13} />{lead2(10)}
      <line x1={2} y1={-18} x2={13} y2={-29} />{head(16, -32)}
      <line x1={11} y1={-15} x2={22} y2={-26} />{head(25, -29)}
    </g>
  )
}
function BackToBack() {
  return (
    <g {...S}>
      <line x1={-38} y1={0} x2={-24} y2={0} /><line x1={24} y1={0} x2={38} y2={0} />
      <polygon points="-24,-12 -24,12 -3,0" fill={C.ink} /><polygon points="24,-12 24,12 3,0" fill={C.ink} />
      <polyline points="-4,-16 2,-16 2,16 -4,16" />
    </g>
  )
}
function Scr() {
  return (
    <g {...S}>
      <circle cx={0} cy={0} r={29} /><line x1={-38} y1={0} x2={-14} y2={0} />{<polygon points="-14,-12 -14,12 6,0" fill={C.ink} />}
      <line x1={6} y1={-12} x2={6} y2={12} /><line x1={6} y1={0} x2={38} y2={0} />
      <polyline points="6,3 22,-8 22,-36" />
    </g>
  )
}
function Triac() {
  return (
    <g {...S}>
      <circle cx={0} cy={0} r={29} /><line x1={-38} y1={0} x2={-8} y2={0} /><line x1={8} y1={0} x2={38} y2={0} />
      <polygon points="-10,-18 -10,-2 8,-10" fill={C.ink} /><line x1={8} y1={-19} x2={8} y2={-1} />
      <polygon points="10,18 10,2 -8,10" fill={C.ink} /><line x1={-8} y1={1} x2={-8} y2={19} />
      <polyline points="8,-8 22,-13 22,-36" />
    </g>
  )
}

const TILES: { fig: number; name: string; sym: ReactNode; hook: [string, string]; use: string }[] = [
  { fig: 1, name: 'Varactor', sym: <Varactor />, hook: ['Curved bar, like a', 'capacitor plate'], use: 'voltage-tuned capacitor' },
  { fig: 2, name: 'Back-to-back', sym: <BackToBack />, hook: ['Triangles tip to tip,', 'bracket in the middle'], use: 'two opposed diodes' },
  { fig: 3, name: 'Zener', sym: <Zener />, hook: ['Bar ends bent', 'like a Z'], use: 'constant voltage' },
  { fig: 4, name: 'Diode', sym: <Plain />, hook: ['Plain triangle', 'and bar'], use: 'rectifier, detector' },
  { fig: 5, name: 'LED', sym: <Led />, hook: ['Diode with light', 'arrows leaving'], use: 'lights when forward' },
  { fig: 6, name: 'Schottky', sym: <Schottky />, hook: ['Bar bent like', 'an S'], use: 'low drop, VHF/UHF mixer' },
  { fig: 7, name: 'SCR', sym: <Scr />, hook: ['Diode in a circle,', 'gate lead off the bar'], use: 'latching switch' },
  { fig: 8, name: 'Triac', sym: <Triac />, hook: ['Two opposed diodes', 'in a circle, one gate'], use: 'AC power control' },
]

/** The eight diode symbols of exam figure E6-2 with a recognition hook and a typical use. */
export function DiodeGallery() {
  const cols = 4, gap = 10, pad = 10
  const tw = (640 - 2 * pad - gap * (cols - 1)) / cols
  const th = 176
  const h = 2 * th + gap + 2 * pad
  return (
    <Diagram w={640} h={h} title="The eight diode symbols of figure E6-2: varactor, back-to-back diodes, Zener, plain diode, LED, Schottky, SCR and triac, each with how to recognize it and what it is used for."
      caption="Figure E6-2 symbols, with a hook to recognize each and what it does.">
      {TILES.map((t, k) => (
        <g key={t.fig} transform={`translate(${pad + (k % cols) * (tw + gap)},${pad + Math.floor(k / cols) * (th + gap)})`}>
          <rect width={tw} height={th} rx={12} fill={C.fill} />
          <T x={10} y={14} size={12} bold color={C.muted}>Fig. {t.fig}</T>
          <g transform={`translate(${tw / 2},62)`}>{t.sym}</g>
          <T x={tw / 2} y={110} anchor="middle" bold size={14}>{t.name}</T>
          <T x={tw / 2} y={128} anchor="middle" size={12} color={C.muted}>{t.hook[0]}</T>
          <T x={tw / 2} y={143} anchor="middle" size={12} color={C.muted}>{t.hook[1]}</T>
          <T x={tw / 2} y={162} anchor="middle" size={12} bold color={C.signal}>{t.use}</T>
        </g>
      ))}
    </Diagram>
  )
}
