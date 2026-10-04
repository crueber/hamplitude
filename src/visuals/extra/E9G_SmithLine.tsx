import { useState } from 'react'
import { C, Choice, Controls, Diagram, Lines, Readout, Slider, T, fmt } from '../kit'
import { SmithGrid, SwrCircle, cabs, gammaOf, rotate, swrOf, wtgOf, zOf, halo, type Cx, type Geo } from './E9G_SmithBase'

const geo: Geo = { cx: 236, cy: 218, R: 160 }
const LOADS: Record<string, { label: string; g: Cx; note: string }> = {
  short: { label: 'Short', g: { re: -1, im: 0 }, note: 'a shorted line' },
  open: { label: 'Open', g: { re: 1, im: 0 }, note: 'an open line' },
  r100: { label: '100 Ω', g: gammaOf(2, 0), note: 'a 100 Ω load' },
  z: { label: '25 + j25 Ω', g: gammaOf(0.5, 0.5), note: 'a 25 + j25 Ω load' },
}

function zText(g: Cx) {
  const m = Math.min(cabs(g), 0.9995)
  const k = m / (cabs(g) || 1)
  const z = zOf({ re: g.re * k, im: g.im * k })
  if (z.r > 20 || Math.abs(z.x) > 40) return 'very high (open)'
  if (z.r < 0.03 && Math.abs(z.x) < 0.03) return '≈ 0 (short)'
  const R = z.r * 50, X = z.x * 50
  const r = R < 1 ? '0' : fmt(R, 3)
  return `${r} ${X >= 0 ? '+' : '−'} j${fmt(Math.abs(X), 3)} Ω`
}

/** Moving along a line rotates the point clockwise round its constant-SWR circle; one lap is half a wavelength. */
export function SmithLine() {
  const [key, setKey] = useState('r100')
  const [d, setD] = useState(0.1)
  const load = LOADS[key]
  const gd = rotate(load.g, d)
  const N = Math.max(2, Math.ceil(d * 160))
  const path = Array.from({ length: N + 1 }, (_, i) => {
    const q = rotate(load.g, (d * i) / N)
    return `${i ? 'L' : 'M'}${(geo.cx + geo.R * q.re).toFixed(1)},${(geo.cy - geo.R * q.im).toFixed(1)}`
  }).join('')
  const P = (g: Cx) => ({ x: geo.cx + geo.R * g.re, y: geo.cy - geo.R * g.im })
  const pl = P(load.g), pd = P(gd)
  const ring = (g: Cx, len: number) => {
    const a = Math.atan2(g.im, g.re)
    return { x1: geo.cx, y1: geo.cy, x2: geo.cx + (geo.R + len) * Math.cos(a), y2: geo.cy - (geo.R + len) * Math.sin(a) }
  }
  const rl = ring(load.g, 12), rd = ring(gd, 12)
  const swr = swrOf(load.g)
  const presets = [0, 0.125, 0.25, 0.5]
  return (
    <>
      <Diagram w={640} h={445}
        title={`Smith chart with the wavelengths-toward-generator ring. Starting from ${load.note}, moving ${fmt(d, 3)} wavelengths along the line turns the point clockwise round its constant-SWR circle to ${zText(gd)}.`}
        caption="Walking toward the generator turns the point clockwise around its SWR circle. Half a wavelength is one full lap.">
        <SmithGrid geo={geo} wtg reactLabels={false} />
        <SwrCircle geo={geo} g={load.g} label={false} />
        <line {...rl} stroke={C.muted} strokeWidth={1.4} strokeDasharray="2 4" />
        <line {...rd} stroke={C.ink} strokeWidth={1.8} strokeDasharray="2 4" />
        {d > 0.001 && <path d={path} fill="none" stroke={C.signal} strokeWidth={4.5} strokeLinecap="round" />}
        <circle cx={pl.x} cy={pl.y} r={8} fill={C.bg} stroke={C.ink} strokeWidth={3} />
        <T x={pl.x + (pl.x > geo.cx ? 14 : -14)} y={pl.y + (pl.y > geo.cy ? 16 : -16)} anchor={pl.x > geo.cx ? 'start' : 'end'} size={12} bold {...halo}>load</T>
        <circle cx={pd.x} cy={pd.y} r={9} fill={C.ink} stroke={C.bg} strokeWidth={3} />
        <T x={geo.cx} y={geo.cy + 27} anchor="middle" size={12} bold color={C.good} {...halo}>match</T>
        <circle cx={geo.cx} cy={geo.cy} r={3.5} fill={C.good} />
        <Lines x={476} y={52} lines={['ring:', 'wavelengths', 'toward', 'generator']} lh={16} size={12} bold color={C.power} />
        <Lines x={476} y={134} lines={['clockwise', '= toward', 'the generator']} lh={16} size={12} color={C.muted} />
        <Lines x={476} y={206} lines={['teal path:', 'how far the', 'point has moved']} lh={16} size={12} bold color={C.signal} />
        <Lines x={476} y={278} lines={['dashed circle:', 'constant SWR,', 'the line never', 'changes it']} lh={16} size={12} bold color={C.power} />
      </Diagram>
      <Controls>
        <Slider label="Distance from the load" value={d} min={0} max={0.5} step={0.005} onChange={setD} format={(v) => `${fmt(v, 3)} λ`} color="var(--d-signal)" />
        <Readout label="Impedance at that point" value={zText(gd)} color="var(--d-ink)" />
        <Readout label="SWR on the line" value={swr === Infinity ? '∞ : 1' : `${fmt(swr, 3)} : 1`} color="var(--d-power)" />
        <Readout label="Ring reading" value={`${fmt((wtgOf(load.g) + d) % 0.5, 3)} λ`} color="var(--d-power)" />
      </Controls>
      <div style={{ margin: '-6px 0 14px', display: 'flex', flexWrap: 'wrap', gap: 10 }}>
        <Choice label="Load" value={key} onChange={setKey} options={Object.entries(LOADS).map(([k, v]) => ({ value: k, label: v.label }))} />
        <Choice label="Jump to" value={presets.find((p) => Math.abs(p - d) < 0.0026) ?? -1} onChange={setD} options={presets.map((p) => ({ value: p, label: p === 0 ? 'load' : `${p} λ` }))} />
      </div>
    </>
  )
}
