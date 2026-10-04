import { useState } from 'react'
import { C, Controls, Diagram, Ln, Readout, Slider, T } from '../kit'

/** Faster symbols = shorter pulses = a wider signal. */
export function G8B_SymbolRate() {
  const [r, setR] = useState(2)
  const pat = [1, 0, 1, 1, 0, 0, 1, 0, 1, 1, 1, 0, 0, 1, 0, 0]
  const n = 4 * r // symbols shown in the same time window
  const x0 = 60, x1 = 580, y0 = 24, h = 40
  const w = (x1 - x0) / n
  let d = `M${x0},${y0 + h}`
  let prev = 0
  for (let i = 0; i < n; i++) {
    const b = pat[i % pat.length]
    const y = y0 + (b ? 0 : h)
    if (i === 0 || b !== prev) d += ` L${x0 + i * w},${y}`
    d += ` L${x0 + (i + 1) * w},${y}`
    prev = b
  }
  const cx = 320, base = 190, half = 30 * r
  const bump = Array.from({ length: 61 }, (_, i) => {
    const u = i / 60
    return `${i ? 'L' : 'M'}${(cx - half + 2 * half * u).toFixed(1)},${(base - 80 * Math.sin(Math.PI * u) ** 2).toFixed(1)}`
  }).join('')
  return (
    <>
      <Diagram w={640} h={260} title={`Symbol rate ${r} times: ${n} symbols in the same time, so the signal occupies a ${r} times wider bandwidth`}
        caption="Symbols sent faster are shorter pulses, and short pulses spread wider in frequency.">
        <T x={x0} y={10} size={13} bold color={C.muted}>Symbols over the same stretch of time</T>
        <path d={d} fill="none" stroke={C.power} strokeWidth={2.5} strokeLinejoin="round" />
        <T x={x0} y={106} size={13} bold color={C.muted}>Occupied bandwidth</T>
        <Ln x1={20} y1={base} x2={620} y2={base} color={C.muted} width={2} />
        <path d={bump} fill={C.signal} fillOpacity={0.25} stroke={C.signal} strokeWidth={2.5} />
        <Ln x1={cx - half} y1={base + 24} x2={cx + half} y2={base + 24} color={C.ink} width={2.5} arrow="both" />
        <T x={cx} y={base + 44} anchor="middle" size={14} bold>{r === 1 ? 'narrow' : r === 4 ? 'widest' : 'wider'}</T>
      </Diagram>
      <Controls>
        <Slider label="Symbol rate" value={r} min={1} max={4} step={1} onChange={setR} format={(v) => `${v}×`} color="var(--d-power)" />
        <Readout label="Bandwidth" value={`${r}×`} color="var(--d-signal)" />
      </Controls>
    </>
  )
}
