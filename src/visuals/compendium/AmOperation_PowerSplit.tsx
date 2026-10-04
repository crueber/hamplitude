import { useState } from 'react'
import { C, Controls, Diagram, Readout, Slider, T } from '../kit'

/** Where the power goes in an AM signal: the carrier is constant; only the sidebands carry the voice. */
export function AmOperation_PowerSplit() {
  const [depth, setDepth] = useState(100)
  const m = depth / 100
  const carrier = 1
  const sideEach = (m * m) / 4 // power of each sideband relative to the carrier
  const total = carrier + 2 * sideEach
  const pcShare = (carrier / total) * 100
  const sbShare = 100 - pcShare
  const base = 176, maxH = 120
  const barW = 600
  const cw = (carrier / total) * barW
  const spec = (cx: number, h: number, col: string, label: string) => (
    <g>
      <rect x={cx - 14} y={base - h} width={28} height={Math.max(h, 1)} rx={3} fill={col} />
      <T x={cx} y={base + 16} anchor="middle" size={13} color={C.muted}>{label}</T>
    </g>
  )
  return (
    <>
      <Diagram w={640} h={290}
        title="Power in an AM signal: the carrier always holds the same power, and each sideband holds a quarter of it at full modulation, so at most one third of the total power carries the voice"
        caption="Spectrum heights show relative power. Even at 100% modulation, two thirds of the power is carrier.">
        <T x={14} y={20} size={15} bold>Spectrum of an AM signal</T>
        <T x={626} y={20} size={13} color={C.muted} anchor="end">height = power</T>
        <line x1={40} y1={base} x2={600} y2={base} stroke={C.muted} strokeWidth={2} />
        {spec(190, maxH * sideEach, C.current, 'lower sideband')}
        {spec(320, maxH * carrier, C.resist, 'carrier')}
        {spec(450, maxH * sideEach, C.current, 'upper sideband')}
        <T x={14} y={228} size={13} bold>Share of total power</T>
        <rect x={20} y={240} width={cw} height={20} rx={4} fill={C.resist} />
        <rect x={20 + cw} y={240} width={barW - cw} height={20} rx={4} fill={C.current} />
        <T x={20} y={276} size={13} bold color={C.resist}>Carrier {pcShare.toFixed(0)}% (no information)</T>
        <T x={620} y={276} size={13} bold color={C.current} anchor="end">Sidebands {sbShare.toFixed(0)}% (the voice)</T>
      </Diagram>
      <Controls>
        <Slider label="Modulation depth" value={depth} min={0} max={100} step={5} onChange={setDepth} format={(v) => `${v}%`} color={C.current} />
        <Readout label="Power in the sidebands" value={sbShare.toFixed(0)} unit="%" color={C.current} />
      </Controls>
    </>
  )
}
