import { useState } from 'react'
import { C, Controls, Diagram, Ln, Slider, T } from '../kit'

const F0 = 7.15 // MHz, illustrative 40 m antenna
function swr(f: number, q: number) {
  const x = q * 2 * ((f - F0) / F0) // series resonant antenna, matched at resonance (R = 50 Ω)
  const g = Math.abs(x) / Math.hypot(2, x)
  return (1 + g) / (1 - g)
}

/** Higher Q = sharper resonance = narrower SWR bandwidth. Loading a short antenna raises its Q. */
export function E9D_QBandwidth() {
  const [q, setQ] = useState(20)
  const x0 = 50, x1 = 600, y0 = 40, y1 = 220
  const span = 0.8 // MHz either side
  const X = (f: number) => x0 + ((f - (F0 - span)) / (2 * span)) * (x1 - x0)
  const smax = 4
  const Y = (s: number) => y1 - ((Math.min(s, smax) - 1) / (smax - 1)) * (y1 - y0)
  const pts = Array.from({ length: 201 }, (_, i) => { const f = F0 - span + (i / 200) * 2 * span; return `${i ? 'L' : 'M'}${X(f).toFixed(1)},${Y(swr(f, q)).toFixed(1)}` }).join('')
  const bw = (0.7071 / q) * F0 // MHz, SWR below 2:1
  const lo = F0 - bw / 2, hi = F0 + bw / 2
  return (
    <>
      <Diagram w={640} h={304} title={`SWR across frequency for an antenna with Q of ${q}. The band where SWR stays under 2 to 1 is about ${(bw * 1000).toFixed(0)} kilohertz wide; a higher Q makes it narrower.`}
        caption="Illustrative: a resonant antenna matched at its center frequency. Narrow dip = high Q = narrow SWR bandwidth.">
        <Ln x1={x0} y1={y1} x2={x1} y2={y1} color={C.muted} width={2} />
        <Ln x1={x0} y1={y0} x2={x0} y2={y1} color={C.muted} width={2} />
        <T x={x0 - 8} y={y1} anchor="end" size={12} color={C.muted}>1</T>
        <T x={x0 - 8} y={Y(2)} anchor="end" size={12} color={C.muted}>2</T>
        <T x={x0 - 8} y={y0} anchor="end" size={12} color={C.muted}>4+</T>
        <T x={x0} y={y0 - 16} size={12} bold color={C.muted}>SWR</T>
        <Ln x1={x0} y1={Y(2)} x2={x1} y2={Y(2)} color={C.muted} width={1.5} dash="5 4" />
        <rect x={X(Math.max(lo, F0 - span))} y={y0} width={X(Math.min(hi, F0 + span)) - X(Math.max(lo, F0 - span))} height={y1 - y0} fill={C.good} fillOpacity={0.18} />
        <path d={pts} fill="none" stroke={C.signal} strokeWidth={3.5} />
        <Ln x1={X(Math.max(lo, F0 - span))} y1={y1 + 34} x2={X(Math.min(hi, F0 + span))} y2={y1 + 34} color={C.good} width={5} />
        <T x={(x0 + x1) / 2} y={y1 + 58} anchor="middle" size={14} bold color={C.good}>SWR below 2:1 for about {(bw * 1000).toFixed(0)} kHz</T>
        <T x={X(F0)} y={y1 + 12} anchor="middle" size={11} color={C.muted}>resonance</T>
        <T x={x1} y={y0 - 16} anchor="end" size={14} bold color={C.ink}>Q = {q}</T>
      </Diagram>
      <Controls>
        <Slider label="Antenna Q" value={q} min={5} max={100} step={1} onChange={setQ} format={(v) => `${v}`} color="var(--d-signal)" />
      </Controls>
    </>
  )
}
