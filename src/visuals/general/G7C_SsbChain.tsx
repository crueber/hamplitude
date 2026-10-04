import type { ReactNode } from 'react'
import { C, Diagram, Ln, T } from '../kit'

const PW = 190, GAP = 25
const px0 = (i: number) => 10 + i * (PW + GAP)

function Panel({ i, y, title, sub, children }: { i: number; y: number; title: string; sub: string; children: ReactNode }) {
  const ox = px0(i)
  return (
    <g>
      <rect x={ox} y={y} width={PW} height={140} rx={12} fill={C.fill} />
      <T x={ox + PW / 2} y={y + 16} anchor="middle" bold size={13}>{title}</T>
      <T x={ox + PW / 2} y={y + 34} anchor="middle" size={12} color={C.muted}>{sub}</T>
      <line x1={ox + 12} y1={y + 112} x2={ox + PW - 12} y2={y + 112} stroke={C.muted} strokeWidth={2} />
      <g transform={`translate(${ox},${y})`}>{children}</g>
    </g>
  )
}
const BASE = 112, CX = PW / 2
const carrier = (dx = 0, ghost = false) => (
  <g>
    <line x1={CX + dx} y1={BASE} x2={CX + dx} y2={ghost ? 74 : 58} stroke={ghost ? C.muted : C.resist} strokeWidth={4} strokeDasharray={ghost ? '4 4' : undefined} strokeLinecap="round" />
    <T x={CX + dx} y={ghost ? 62 : BASE + 14} anchor="middle" size={12} bold color={ghost ? C.muted : C.resist}>{ghost ? 'carrier cancelled' : 'carrier'}</T>
  </g>
)
const band = (x: number, w: number, label: string, col: string, ghost = false) => (
  <g>
    <polygon points={label === 'upper' ? `${x},${BASE} ${x + w},${BASE} ${x + w},${BASE - 20} ${x},${BASE - 34}` : `${x},${BASE} ${x + w},${BASE} ${x + w},${BASE - 34} ${x},${BASE - 20}`} fill={ghost ? 'none' : col} fillOpacity={0.45} stroke={col} strokeWidth={2} strokeDasharray={ghost ? '4 4' : undefined} />
    <T x={x + w / 2} y={BASE + 14} anchor="middle" size={12} bold color={ghost ? C.muted : col}>{label}</T>
  </g>
)

/** Spectrum at each stage of SSB generation (top) and the product detector that undoes it (bottom). */
export function SsbChain() {
  return (
    <Diagram w={640} h={320} title="SSB generation and reception. Top row: a balanced modulator takes audio and a carrier and outputs two sidebands with the carrier removed (double-sideband). A filter keeps one sideband. Bottom row: in the receiver a product detector mixes the SSB signal with a carrier oscillator and outputs audio."
      caption="Balanced modulator: double sideband, no carrier. Filter: one sideband. Product detector: back to audio.">
      <T x={14} y={6} size={12} bold color={C.muted}>TRANSMIT</T>
      <Panel i={0} y={16} title="Audio + carrier oscillator" sub="the two inputs">
        <g>
          <polygon points={`${CX - 80},${BASE} ${CX - 30},${BASE} ${CX - 30},${BASE - 24} ${CX - 80},${BASE - 34}`} fill={C.signal} fillOpacity={0.45} stroke={C.signal} strokeWidth={2} />
          <T x={CX - 55} y={BASE + 14} anchor="middle" size={12} bold color={C.signal}>audio</T>
          {carrier(40)}
        </g>
      </Panel>
      <Panel i={1} y={16} title="Balanced modulator out" sub="double sideband, no carrier">
        <g>
          {carrier(0, true)}
          {band(CX - 72, 62, 'lower', C.signal)}
          {band(CX + 10, 62, 'upper', C.power)}
        </g>
      </Panel>
      <Panel i={2} y={16} title="After the filter" sub="one sideband kept">
        <g>
          {band(CX - 72, 62, 'lower', C.signal, true)}
          {band(CX + 10, 62, 'upper', C.power)}
        </g>
      </Panel>
      <Ln x1={px0(0) + PW + 3} y1={86} x2={px0(1) - 3} y2={86} color={C.ink} width={2} arrow />
      <Ln x1={px0(1) + PW + 3} y1={86} x2={px0(2) - 3} y2={86} color={C.ink} width={2} arrow />
      <T x={14} y={172} size={12} bold color={C.muted}>RECEIVE</T>
      <Panel i={0} y={182} title="SSB in + carrier oscillator" sub="carrier put back locally">
        <g>
          {band(CX + 10, 62, 'upper', C.power)}
          {carrier(0)}
        </g>
      </Panel>
      <Panel i={1} y={182} title="Product detector" sub="mixes the two">
        <g>
          <circle cx={CX} cy={74} r={24} fill={C.fill2} stroke={C.ink} strokeWidth={2.5} />
          <path d={`M${CX - 11},${74 - 11} L${CX + 11},${74 + 11} M${CX + 11},${74 - 11} L${CX - 11},${74 + 11}`} stroke={C.ink} strokeWidth={3.5} strokeLinecap="round" />
        </g>
      </Panel>
      <Panel i={2} y={182} title="Audio out" sub="the voice is recovered">
        <polygon points={`${CX - 55},${BASE} ${CX + 5},${BASE} ${CX + 5},${BASE - 24} ${CX - 55},${BASE - 34}`} fill={C.signal} fillOpacity={0.45} stroke={C.signal} strokeWidth={2} />
        <T x={CX - 25} y={BASE + 14} anchor="middle" size={12} bold color={C.signal}>audio</T>
      </Panel>
      <Ln x1={px0(0) + PW + 3} y1={256} x2={px0(1) - 3} y2={256} color={C.ink} width={2} arrow />
      <Ln x1={px0(1) + PW + 3} y1={256} x2={px0(2) - 3} y2={256} color={C.ink} width={2} arrow />
    </Diagram>
  )
}
