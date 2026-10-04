import { useState } from 'react'
import { C, Controls, Diagram, Ln, Slider, T, fmt } from '../kit'

/** Schematic SWR versus frequency of a Yagi. Fatter elements flatten the dip: wider SWR bandwidth. */
export function G9C_Bandwidth() {
  const [t, setT] = useState(0.35)
  const W = 640, H = 276, x0 = 70, x1 = 590, yb = 220, yt = 36
  const swrMax = 6
  const hw = 0.06 + 0.2 * t // half-width of the SWR 2:1 region, in fractional units of the plotted span
  const swrAt = (u: number) => Math.min(swrMax, 1 + (1 / 1) * Math.pow(u / hw, 2)) // u in [-0.5,0.5]
  const X = (u: number) => x0 + (u + 0.5) * (x1 - x0)
  const Y = (s: number) => yb - ((s - 1) / (swrMax - 1)) * (yb - yt)
  const pts = Array.from({ length: 101 }, (_, i) => {
    const u = -0.5 + i / 100
    return `${i ? 'L' : 'M'}${X(u).toFixed(1)},${Y(swrAt(u)).toFixed(1)}`
  }).join('')
  return (
    <>
      <Diagram w={W} h={H} title={`SWR versus frequency for a Yagi with elements of relative thickness ${fmt(t, 2)}. Thicker elements give a wider range of frequencies with low SWR`}
        caption="Schematic. Same antenna, fatter elements: the usable SWR dip gets wider.">
        <Ln x1={x0} y1={yb} x2={x1} y2={yb} color={C.muted} width={2} />
        <Ln x1={x0} y1={yb} x2={x0} y2={yt - 10} color={C.muted} width={2} arrow />
        <T x={x0 + 8} y={yt - 18} size={13} bold color={C.muted}>higher SWR</T>
        <T x={x1} y={yb + 16} anchor="end" size={13} color={C.muted}>frequency →</T>
        <Ln x1={x0} y1={Y(2)} x2={x1} y2={Y(2)} color={C.muted} width={1.5} dash="4 4" />
        <T x={x1} y={Y(2) - 12} anchor="end" size={12} color={C.muted}>2:1</T>
        <rect x={X(-hw)} y={Y(2)} width={X(hw) - X(-hw)} height={yb - Y(2)} fill={C.good} fillOpacity={0.15} />
        <path d={pts} fill="none" stroke={C.signal} strokeWidth={3.5} strokeLinecap="round" />
        <Ln x1={X(-hw)} y1={yb + 16} x2={X(hw)} y2={yb + 16} color={C.good} width={3} arrow="both" />
        <T x={X(0)} y={yb + 38} anchor="middle" size={13} bold color={C.good}>SWR bandwidth</T>
      </Diagram>
      <Controls>
        <Slider label="Element diameter" value={t} min={0} max={1} step={0.01} onChange={setT} format={(v) => (v < 0.3 ? 'thin' : v < 0.7 ? 'medium' : 'thick')} color="var(--d-resist)" />
      </Controls>
    </>
  )
}
