import { useState } from 'react'
import { C, Choice, Controls, Diagram, Ln, Readout, Slider, T, fmt, si } from '../kit'

const MU0 = 4e-7 * Math.PI
const RHO = 1.72e-8 // ohm-metres, annealed copper
const WIRES = [
  { value: 22, d: 0.644 },
  { value: 14, d: 1.628 },
  { value: 10, d: 2.588 },
] // AWG and diameter in mm
const depth = (f: number) => Math.sqrt(RHO / (Math.PI * f * MU0)) // metres

/** Skin depth in copper against frequency, with the wire's own radius for comparison. */
export function SkinEffect_Depth() {
  const [e, setE] = useState(1.15) // log10 of MHz
  const [awg, setAwg] = useState(14)
  const w = WIRES.find((x) => x.value === awg)!
  const rUm = (w.d / 2) * 1000
  const f = 10 ** e * 1e6
  const dUm = depth(f) * 1e6
  const ratio = dUm >= rUm ? 1 : (rUm * rUm) / (2 * rUm * dUm - dUm * dUm)
  const fc = RHO / (Math.PI * MU0 * (rUm * 1e-6) ** 2)
  const PX = 64, PW = 556, PT = 22, PH = 200, PB = PT + PH
  const xf = (fMHz: number) => PX + ((Math.log10(fMHz) + 3) / 6) * PW
  const yd = (um: number) => PB - (Math.log10(um) / 4) * PH
  const line = Array.from({ length: 121 }, (_, i) => { const m = 10 ** (-3 + (6 * i) / 120); return `${xf(m).toFixed(1)},${yd(Math.min(1e4, depth(m * 1e6) * 1e6)).toFixed(1)}` }).join(' ')
  const xs = ['1 kHz', '10 kHz', '100 kHz', '1 MHz', '10 MHz', '100 MHz', '1 GHz']
  const ys = [1, 10, 100, 1000, 10000]
  const fcM = fc / 1e6
  return (
    <>
      <Diagram w={640} h={310}
        title={`Skin depth in copper against frequency on log axes. At ${si(f, 'Hz')} it is ${fmt(dUm, 3)} micrometres, compared with a ${awg} AWG wire radius of ${fmt(rUm, 3)} micrometres.`}
        caption="Copper (about 66 µm at 1 MHz, falling as the square root of frequency). Where the curve dips below the wire's radius, the wire's centre stops carrying current.">
        <rect x={xf(fcM)} y={yd(rUm)} width={PX + PW - xf(fcM)} height={PB - yd(rUm)} fill={C.current} opacity={0.1} />
        {ys.map((v) => (
          <g key={v}>
            <Ln x1={PX} y1={yd(v)} x2={PX + PW} y2={yd(v)} color={C.fill2} width={1} />
            <T x={PX - 8} y={yd(v)} anchor="end" size={12} color={C.muted}>{v >= 1000 ? `${v / 1000} mm` : `${v} µm`}</T>
          </g>
        ))}
        {xs.map((l, i) => (
          <g key={l}>
            <Ln x1={xf(10 ** (i - 3))} y1={PT} x2={xf(10 ** (i - 3))} y2={PB} color={C.fill2} width={1} />
            <T x={xf(10 ** (i - 3))} y={PB + 16} anchor={i === 0 ? 'start' : i === 6 ? 'end' : 'middle'} size={12} color={C.muted}>{l}</T>
          </g>
        ))}
        <Ln x1={PX} y1={PB} x2={PX + PW} y2={PB} color={C.muted} width={1.5} />
        <Ln x1={PX} y1={PT} x2={PX} y2={PB} color={C.muted} width={1.5} />
        <Ln x1={PX} y1={yd(rUm)} x2={PX + PW} y2={yd(rUm)} color={C.resist} width={2} dash="6 4" />
        <T x={PX + PW - 6} y={yd(rUm) - 12} anchor="end" size={12} bold color={C.resist}>{awg} AWG wire radius</T>
        <polyline points={line} fill="none" stroke={C.current} strokeWidth={3.5} strokeLinecap="round" />
        <Ln x1={xf(10 ** e)} y1={PT} x2={xf(10 ** e)} y2={PB} color={C.ink} width={1.5} />
        <circle cx={xf(10 ** e)} cy={yd(dUm)} r={6} fill={C.current} stroke={C.bg} strokeWidth={2.5} />
        <T x={PX + PW - 6} y={PT + 12} anchor="end" size={13} bold color={C.current}>skin depth in copper</T>
        <T x={PX + PW - 6} y={PT + 30} anchor="end" size={12} color={C.muted}>shaded: current confined to the surface</T>
        <T x={PX} y={PB + 38} size={12} color={C.muted}>frequency</T>
      </Diagram>
      <Controls>
        <Slider label="Frequency" value={e} min={-3} max={3} step={0.01} onChange={setE} format={() => si(f, 'Hz', 3)} color="var(--d-signal)" />
        <Choice label="Wire" value={awg} onChange={setAwg} options={WIRES.map((x) => ({ value: x.value, label: `${x.value} AWG (${x.d} mm)` }))} />
        <Readout label="Skin depth (copper)" value={fmt(dUm, 3)} unit=" µm" color="var(--d-current)" />
        <Readout label="Wire resistance vs DC (approx.)" value={`${fmt(ratio, 3)} ×`} color="var(--d-resist)" />
      </Controls>
    </>
  )
}
