import { useState } from 'react'
import { C, Controls, Diagram, Readout, Slider, T, fmt, si } from '../kit'

/** Skin effect: as frequency rises, RF current crowds into a thin surface layer. Copper, 1 mm radius wire (approximate model). */
export function E5D_SkinEffect() {
  const [e, setE] = useState(-1) // frequency = 0.1 MHz * 10^e ... slider is log10(MHz)
  const fMHz = 10 ** e
  const rad = 1 // mm
  const depth = 0.0661 / Math.sqrt(fMHz) // mm, copper
  const d = Math.min(depth, rad)
  const frac = 1 - (1 - d / rad) ** 2 // share of the cross-section carrying current
  const mult = 1 / frac
  const K = 100 // px per mm
  const disc = (cx: number, cy: number, dpx: number, label: string, sub: string) => (
    <g>
      <circle cx={cx} cy={cy} r={rad * K} fill={C.fill} stroke="none" />
      <path
        d={`M${cx - rad * K},${cy} a${rad * K},${rad * K} 0 1 0 ${2 * rad * K},0 a${rad * K},${rad * K} 0 1 0 ${-2 * rad * K},0 Z M${cx - (rad * K - dpx)},${cy} a${rad * K - dpx},${rad * K - dpx} 0 1 1 ${2 * (rad * K - dpx)},0 a${rad * K - dpx},${rad * K - dpx} 0 1 1 ${-2 * (rad * K - dpx)},0 Z`}
        fill={C.current} fillRule="evenodd" opacity={0.85}
      />
      <circle cx={cx} cy={cy} r={rad * K} fill="none" stroke={C.muted} strokeWidth={1.5} />
      <T x={cx} y={cy + rad * K + 22} anchor="middle" bold size={14}>{label}</T>
      <T x={cx} y={cy + rad * K + 42} anchor="middle" size={12.5} color={C.muted}>{sub}</T>
    </g>
  )
  return (
    <>
      <Diagram w={640} h={310} title={`Cross-section of a 1 mm radius copper wire. At DC current fills it. At ${si(fMHz * 1e6, 'Hz')} the current is confined to a ${fmt(depth * 1000)} micrometre layer at the surface.`}
        caption="Blue is where current flows. Same wire, same current, far less metal doing the work.">
        {disc(165, 118, rad * K, 'DC or low frequency', 'current uses the whole wire')}
        {disc(475, 118, Math.max(d * K, 1.5), si(fMHz * 1e6, 'Hz'), `current only in the outer ${fmt(depth * 1000, 2)} µm`)}
        <T x={320} y={120} anchor="middle" bold size={22}>→</T>
        <T x={320} y={146} anchor="middle" size={12.5} color={C.muted}>frequency up</T>
      </Diagram>
      <Controls>
        <Slider label="Frequency" value={e} min={-2} max={2} step={0.02} onChange={setE} format={(v) => si(10 ** v * 1e6, 'Hz', 3)} />
        <Readout label="Skin depth (copper)" value={fmt(depth * 1000, 3)} unit=" µm" color="var(--d-current)" />
        <Readout label="Resistance vs DC (approx.)" value={`${fmt(mult, 3)} ×`} color="var(--d-resist)" />
      </Controls>
    </>
  )
}
