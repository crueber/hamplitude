import { useState } from 'react'
import { C, Choice, Controls, Diagram, Ln, Readout, Slider, T, si } from '../kit'

/** Resonance curve: higher Q = narrower half-power bandwidth, BW = f0 / Q. */
export function E5A_QBandwidth() {
  const [q, setQ] = useState(50)
  const [f0m, setF0] = useState(7.1)
  const f0 = f0m * 1e6
  const bw = f0 / q
  const SPAN = 0.15 // plot f0 ± 15%
  const PX = 64, PW = 560, PT = 24, PH = 210, PB = PT + PH
  const xf = (r: number) => PX + ((r - (1 - SPAN)) / (2 * SPAN)) * PW
  const yv = (a: number) => PB - a * PH
  const resp = (r: number) => 1 / Math.sqrt(1 + q * q * (r - 1 / r) ** 2)
  const pts: string[] = []
  for (let i = 0; i <= 400; i++) {
    const r = 1 - SPAN + (2 * SPAN * i) / 400
    pts.push(`${xf(r).toFixed(1)},${yv(resp(r)).toFixed(1)}`)
  }
  const half = bw / f0 / 2 // approx half width as fraction of f0
  const r1 = 1 - half, r2 = 1 + half
  const inside = half < SPAN
  const yb = yv(Math.SQRT1_2)
  return (
    <>
      <Diagram w={640} h={300} title={`Resonance curve centred on ${si(f0, 'Hz')} with Q of ${q}. The half-power bandwidth is ${si(bw, 'Hz')}.`}
        caption="Bandwidth is measured between the half-power (−3 dB) points: 70.7% of the peak voltage.">
        <Ln x1={PX} y1={PB} x2={PX + PW} y2={PB} color={C.muted} />
        <Ln x1={PX} y1={PT} x2={PX} y2={PB} color={C.muted} />
        <Ln x1={PX} y1={yb} x2={PX + PW} y2={yb} color={C.fill2} dash="5 5" width={1.5} />
        <polyline points={pts.join(' ')} fill="none" stroke={C.signal} strokeWidth={3} strokeLinecap="round" />
        {inside && (
          <g>
            <Ln x1={xf(r1)} y1={yb - 14} x2={xf(r1)} y2={yb + 14} color={C.ink} width={2} />
            <Ln x1={xf(r2)} y1={yb - 14} x2={xf(r2)} y2={yb + 14} color={C.ink} width={2} />
            <Ln x1={xf(r1) + 2} y1={yb + 36} x2={xf(r2) - 2} y2={yb + 36} color={C.resist} width={2.5} arrow="both" />
            <T x={(xf(r1) + xf(r2)) / 2} y={yb + 56} anchor="middle" bold color={C.resist} size={14}>BW</T>
          </g>
        )}
        <T x={PX - 8} y={yv(1)} anchor="end" size={12} color={C.muted}>100%</T>
        <T x={PX - 8} y={yb} anchor="end" size={12} color={C.muted}>70.7%</T>
        <T x={xf(1)} y={PB + 18} anchor="middle" size={12} bold>{si(f0, 'Hz')}</T>
        <T x={PX} y={PB + 18} anchor="start" size={12} color={C.muted}>{si(f0 * (1 - SPAN), 'Hz')}</T>
        <T x={PX + PW} y={PB + 18} anchor="end" size={12} color={C.muted}>{si(f0 * (1 + SPAN), 'Hz')}</T>
        <T x={PX + PW - 4} y={PT + 8} anchor="end" size={13} bold color={C.signal}>Q = {q}, BW = {si(bw, 'Hz', 3)}</T>
      </Diagram>
      <Controls>
        <Choice label="Resonant frequency" value={f0m} onChange={setF0} options={[{ value: 3.7, label: '3.7 MHz' }, { value: 7.1, label: '7.1 MHz' }]} />
        <Slider label="Quality factor (Q)" value={q} min={5} max={200} onChange={setQ} format={(v) => `${v}`} color="var(--d-signal)" />
        <Readout label={`BW = f₀ ÷ Q = ${f0m} MHz ÷ ${q}`} value={si(bw, 'Hz', 3)} color="var(--d-resist)" />
        <Readout label="Series circuit: voltage across L or C" value={`${q} ×`} unit=" the source" color="var(--d-voltage)" />
      </Controls>
    </>
  )
}
