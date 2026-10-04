import { useState } from 'react'
import { C, Controls, Diagram, Choice, Ln, Readout, Slider, T, TAU, clamp, fmt, sinePath, si, useTime } from '../kit'

const BANDS: { name: string; mhz: number }[] = [
  { name: '160 m', mhz: 1.9 }, { name: '80 m', mhz: 3.75 }, { name: '40 m', mhz: 7.15 }, { name: '20 m', mhz: 14.2 },
  { name: '15 m', mhz: 21.2 }, { name: '10 m', mhz: 28.4 }, { name: '6 m', mhz: 52 }, { name: '2 m', mhz: 146 }, { name: '70 cm', mhz: 446 },
]
const F_MIN = 1.8, F_MAX = 450
const toPos = (f: number) => Math.log(f / F_MIN) / Math.log(F_MAX / F_MIN)
const toFreq = (p: number) => F_MIN * Math.pow(F_MAX / F_MIN, p)

/** Slide the frequency; watch the wavelength shrink. λ = 300 ÷ f. */
export function WavelengthExplorer() {
  const [pos, setPos] = useState(toPos(146))
  const f = toFreq(pos)
  const lambda = 300 / f
  const { t, ref } = useTime(0.5)
  const W = 640, H = 280
  const x0 = 40, x1 = 600, cy = 105
  // schematic: more cycles fit in the same stretch of space as frequency rises
  const cycles = 1.5 + 8.5 * pos
  const lenPx = (x1 - x0) / cycles
  const phase = -t * TAU * 0.6
  // log ruler for the true wavelength
  const rx0 = 40, rx1 = 600, ry = 236
  const lamPos = (l: number) => rx0 + ((Math.log10(170) - Math.log10(l)) / (Math.log10(170) - Math.log10(0.6))) * (rx1 - rx0)
  const mx = clamp(lamPos(lambda), rx0, rx1)
  const nearest = BANDS.reduce((a, b) => (Math.abs(Math.log(b.mhz / f)) < Math.abs(Math.log(a.mhz / f)) ? b : a))
  return (
    <>
      <Diagram w={W} h={H} title={`Wavelength at ${fmt(f)} megahertz is about ${fmt(lambda)} metres`} svgRef={ref}
        caption="Top: more waves squeeze into the same space as frequency rises (schematic). Bottom: the real wavelength on a log scale.">
        <path d={sinePath(x0, x1, cy, 48, cycles, phase)} fill="none" stroke={C.signal} strokeWidth={3.5} strokeLinecap="round" />
        <Ln x1={x0} y1={cy} x2={x1} y2={cy} color={C.muted} width={1} dash="3 5" />
        {/* one wavelength bracket, anchored on a crest */}
        <g>
          <Ln x1={x0} y1={cy + 64} x2={x0 + lenPx} y2={cy + 64} color={C.power} width={2.5} arrow="both" />
          <T x={x0 + lenPx + 10} y={cy + 64} bold color={C.power} size={14}>one wavelength (λ)</T>
        </g>
        {/* log ruler */}
        <Ln x1={rx0} y1={ry} x2={rx1} y2={ry} color={C.muted} width={2} />
        {[100, 30, 10, 3, 1].map((l) => (
          <g key={l}>
            <Ln x1={lamPos(l)} y1={ry - 5} x2={lamPos(l)} y2={ry + 5} color={C.muted} width={2} />
            <T x={lamPos(l)} y={ry + 20} anchor="middle" size={12} color={C.muted}>{l} m</T>
          </g>
        ))}
        <circle cx={mx} cy={ry} r={9} fill={C.power} stroke={C.bg} strokeWidth={3} />
        <T x={mx} y={ry - 22} anchor="middle" bold size={14} color={C.power}>{lambda >= 1 ? `${fmt(lambda)} m` : `${fmt(lambda * 100)} cm`}</T>
        <T x={rx0} y={ry - 22} size={11} color={C.muted}>longer wave</T>
        <T x={rx1} y={ry - 22} size={11} color={C.muted} anchor="end">shorter wave</T>
      </Diagram>
      <Controls>
        <Slider label="Frequency" value={pos} min={0} max={1} step={0.002} onChange={setPos} format={() => si(f * 1e6, 'Hz')} color="var(--d-signal)" />
        <Readout label="Wavelength ≈ 300 ÷ f" value={lambda >= 1 ? fmt(lambda) : fmt(lambda * 100)} unit={lambda >= 1 ? 'meters' : 'cm'} color="var(--d-power)" />
        <Readout label="Nearest ham band" value={nearest.name} color="var(--d-signal)" />
      </Controls>
      <div style={{ margin: '-6px 0 14px' }}>
        <Choice label="Jump to a band" value={nearest.name} onChange={(n) => setPos(toPos(BANDS.find((b) => b.name === n)!.mhz))} options={BANDS.map((b) => ({ value: b.name, label: b.name }))} />
      </div>
    </>
  )
}
