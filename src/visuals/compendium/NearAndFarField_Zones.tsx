import { useState } from 'react'
import { C, Controls, Diagram, Ln, Readout, Slider, T, fmt } from '../kit'

/**
 * Field regions around an antenna of largest dimension D, on a log distance axis in wavelengths.
 * Rule-of-thumb boundaries (the transitions are gradual): reactive near field out to lambda/2pi for a small antenna
 * or 0.62 sqrt(D^3/lambda) for a large one; far field beyond 2 D^2 / lambda.
 */
export function NearAndFarField_Zones() {
  const [lg, setLg] = useState(Math.log10(0.5)) // log10(D / lambda)
  const D = Math.pow(10, lg)
  const r1 = Math.max(1 / (2 * Math.PI), 0.62 * Math.sqrt(D * D * D))
  const r2 = Math.max(2 * D * D, 1.5 * r1)
  const lo = 0.1, hi = 3000
  const x0 = 70, x1 = 610
  const xv = (r: number) => x0 + ((Math.log10(Math.min(Math.max(r, lo), hi)) - Math.log10(lo)) / (Math.log10(hi) - Math.log10(lo))) * (x1 - x0)
  const a = xv(r1), b = xv(r2)
  const ticks = [0.1, 1, 10, 100, 1000]
  const rows: [string, string, string][] = [
    [C.bad, 'Reactive near field', `out to about ${fmt(r1, 2)} λ: E and H fields store and return energy`],
    [C.resist, 'Radiating near field', `${fmt(r1, 2)} λ to ${fmt(r2, 2)} λ: waves are radiating but the pattern is still forming`],
    [C.signal, 'Far field', `beyond about ${fmt(r2, 2)} λ: pattern shape fixed, power density falls as 1 / distance²`],
  ]
  return (
    <>
      <Diagram w={640} h={304} title={`Field regions around an antenna ${fmt(D, 2)} wavelengths across: reactive near field to about ${fmt(r1, 2)} wavelengths, far field beyond about ${fmt(r2, 2)} wavelengths`}
        caption="Rule-of-thumb boundaries for an antenna of a given size, on a log distance scale. The real transitions are gradual.">
        <T x={x0} y={22} size={14} bold>Distance from the antenna, in wavelengths (log scale)</T>
        {/* antenna icon */}
        <Ln x1={34} y1={80} x2={34} y2={128} color={C.ink} width={5} />
        <Ln x1={44} y1={104} x2={x0} y2={104} color={C.muted} width={1.5} dash="3 4" />
        <rect x={x0} y={84} width={Math.max(0, a - x0)} height={40} fill={C.bad} fillOpacity={0.35} />
        <rect x={a} y={84} width={Math.max(0, b - a)} height={40} fill={C.resist} fillOpacity={0.35} />
        <rect x={b} y={84} width={Math.max(0, x1 - b)} height={40} fill={C.signal} fillOpacity={0.3} />
        <rect x={x0} y={84} width={x1 - x0} height={40} fill="none" stroke={C.muted} strokeWidth={2} />
        {ticks.map((t) => (
          <g key={t}>
            <Ln x1={xv(t)} y1={124} x2={xv(t)} y2={132} color={C.muted} width={2} />
            <T x={xv(t)} y={148} size={12.5} anchor="middle" color={C.muted}>{t >= 1 ? t : '0.1'} λ</T>
          </g>
        ))}
        <T x={x1} y={64} size={13} bold anchor="end" color={C.muted}>antenna size D = {fmt(D, 2)} λ</T>
        {rows.map(([col, name, text], i) => (
          <g key={name}>
            <rect x={20} y={176 + i * 40} width={18} height={18} rx={3} fill={col} fillOpacity={0.55} />
            <T x={48} y={177 + i * 40} size={13.5} bold>{name}</T>
            <T x={48} y={196 + i * 40} size={12.5} color={C.muted}>{text}</T>
          </g>
        ))}
      </Diagram>
      <Controls>
        <Slider label="Antenna size (largest dimension)" value={lg} min={Math.log10(0.5)} max={Math.log10(30)} step={0.01} onChange={setLg} format={() => `${fmt(D, 2)} λ`} color="var(--d-signal)" />
        <Readout label="Far field starts" value={fmt(r2, 3)} unit=" λ" color="var(--d-signal)" />
      </Controls>
    </>
  )
}
