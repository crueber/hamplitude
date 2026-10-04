import { useState } from 'react'
import { C, Choice, Controls, Diagram, Ln, Slider, T, TAU } from '../kit'

/** Exposure depends on power, distance and where the person is in the antenna's pattern. Schematic, relative only. */
export function ExposureFactors() {
  const [P, setP] = useState(5)
  const [dist, setDist] = useState(4)
  const [spot, setSpot] = useState<'front' | 'back'>('front')
  const pat = spot === 'front' ? 1 : 0.08
  const E = (P * pat) / (dist * dist) // relative
  const pos = Math.min(1, Math.max(0, (Math.log10(E) + 3) / 4))
  const ax = 300, ay = 105
  const px = spot === 'front' ? ax + 40 + dist * 22 : ax - 40 - dist * 22
  const lobe = Array.from({ length: 120 }, (_, i) => {
    const a = (i / 120) * TAU
    const r = 24 + 62 * Math.pow(Math.max(0, Math.cos(a)), 3)
    return `${i ? 'L' : 'M'}${(ax + r * Math.cos(a)).toFixed(1)},${(ay - r * 0.62 * Math.sin(a)).toFixed(1)}`
  }).join('') + 'Z'
  const bx0 = 60, bw = 520, by = 218
  return (
    <>
      <Diagram w={640} h={270} title="RF exposure rises with transmitter power, falls with distance from the antenna, and depends on where the person stands in the antenna's radiation pattern" caption="Schematic and relative. Frequency also matters: the body absorbs some bands better than others.">
        <path d={lobe} fill={C.signal} fillOpacity={0.18} stroke={C.signal} strokeWidth={3} />
        <Ln x1={ax} y1={ay - 24} x2={ax} y2={ay + 24} color={C.resist} width={6} />
        <T x={ax} y={ay + 44} anchor="middle" size={13} bold color={C.resist}>antenna</T>
        <circle cx={px} cy={ay - 14} r={9} fill={C.fill2} stroke={C.ink} strokeWidth={3} />
        <Ln x1={px} y1={ay - 5} x2={px} y2={ay + 28} color={C.ink} width={5} />
        <Ln x1={px - 12} y1={ay + 6} x2={px + 12} y2={ay + 6} color={C.ink} width={4} />
        <T x={px} y={ay + 48} anchor="middle" size={13} bold>person</T>
        <T x={bx0} y={by - 22} size={13} bold color={C.muted}>Relative exposure</T>
        <rect x={bx0} y={by - 8} width={bw / 3} height={18} fill={C.good} fillOpacity={0.35} />
        <rect x={bx0 + bw / 3} y={by - 8} width={bw / 3} height={18} fill={C.resist} fillOpacity={0.35} />
        <rect x={bx0 + (2 * bw) / 3} y={by - 8} width={bw / 3} height={18} fill={C.bad} fillOpacity={0.35} />
        <T x={bx0} y={by + 26} size={13} color={C.muted}>lower</T>
        <T x={bx0 + bw} y={by + 26} anchor="end" size={13} color={C.muted}>higher</T>
        <circle cx={bx0 + pos * bw} cy={by + 1} r={10} fill={C.ink} stroke={C.bg} strokeWidth={3} />
      </Diagram>
      <Controls>
        <Slider label="Transmitter power" value={P} min={1} max={10} step={1} onChange={setP} format={(v) => (v <= 3 ? 'low' : v <= 7 ? 'medium' : 'high')} color="var(--d-power)" />
        <Slider label="Distance from antenna" value={dist} min={1} max={8} step={1} onChange={setDist} format={(v) => (v <= 2 ? 'close' : v <= 5 ? 'middle' : 'far')} color="var(--d-current)" />
      </Controls>
      <div style={{ margin: '-6px 0 14px' }}>
        <Choice label="Where the person stands" value={spot} onChange={setSpot} options={[{ value: 'front', label: 'In the beam' }, { value: 'back', label: 'Behind the antenna' }]} />
      </div>
    </>
  )
}
