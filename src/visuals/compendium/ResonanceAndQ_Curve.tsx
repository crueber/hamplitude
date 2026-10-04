import { useState } from 'react'
import { C, Choice, Controls, Diagram, Ln, Readout, Slider, T, TAU, fmt, si } from '../kit'

type Kind = 'series' | 'parallel'

/** Resonance from real parts: pick L, C and the coil's resistance; see f0, Q and the half-power bandwidth. */
export function ResonanceAndQ_Curve() {
  const [kind, setKind] = useState<Kind>('series')
  const [le, setLe] = useState(1) // L = 10^le µH
  const [ce, setCe] = useState(2) // C = 10^ce pF
  const [re, setRe] = useState(0.7) // R = 10^re ohms (5 ohms)
  const L = 10 ** le * 1e-6, Cap = 10 ** ce * 1e-12, R = 10 ** re
  const f0 = 1 / (TAU * Math.sqrt(L * Cap))
  const XL = TAU * f0 * L
  const Q = XL / R
  const SPAN = 0.15
  // response normalised to its own peak
  const raw = (r: number) => {
    const w = TAU * f0 * r
    if (kind === 'series') return R / Math.hypot(R, w * L - 1 / (w * Cap))
    const re_ = R + 0 // numerator: R + jwL ; denominator: 1 - w2LC + jwRC
    const nr = re_, ni = w * L, dr = 1 - w * w * L * Cap, di = w * R * Cap
    return Math.hypot(nr, ni) / Math.hypot(dr, di)
  }
  const N = 1200
  const rs = Array.from({ length: N + 1 }, (_, i) => 1 - SPAN + (2 * SPAN * i) / N)
  const vals = rs.map(raw)
  const peak = Math.max(...vals)
  const ipk = vals.indexOf(peak)
  const resp = vals.map((v) => v / peak)
  let lo = -1, hi = -1
  for (let i = ipk; i >= 0; i--) if (resp[i] <= Math.SQRT1_2) { lo = rs[i]; break }
  for (let i = ipk; i <= N; i++) if (resp[i] <= Math.SQRT1_2) { hi = rs[i]; break }
  const inside = lo > 0 && hi > 0
  const bw = inside ? (hi - lo) * f0 : f0 / Q
  const PX = 64, PW = 556, PT = 26, PH = 200, PB = PT + PH
  const xf = (r: number) => PX + ((r - (1 - SPAN)) / (2 * SPAN)) * PW
  const yv = (a: number) => PB - a * PH
  const pts = rs.map((r, i) => `${xf(r).toFixed(1)},${yv(resp[i]).toFixed(1)}`).filter((_, i) => i % 3 === 0).join(' ')
  const yb = yv(Math.SQRT1_2)
  const peakLabel = kind === 'series' ? 'current' : 'impedance'
  return (
    <>
      <Diagram w={640} h={300}
        title={`${kind === 'series' ? 'Series' : 'Parallel'} resonant circuit, ${si(L, 'H')} and ${si(Cap, 'F')} with ${fmt(R, 2)} ohms of resistance: resonant at ${si(f0, 'Hz')}, Q of ${fmt(Q, 3)}, bandwidth about ${si(bw, 'Hz')}.`}
        caption={`Response against frequency, as a fraction of its peak (${peakLabel}). Lower resistance gives a higher Q and a narrower, taller peak.`}>
        <Ln x1={PX} y1={PB} x2={PX + PW} y2={PB} color={C.muted} width={1.5} />
        <Ln x1={PX} y1={PT} x2={PX} y2={PB} color={C.muted} width={1.5} />
        <Ln x1={PX} y1={yb} x2={PX + PW} y2={yb} color={C.fill2} dash="5 5" width={1.5} />
        <Ln x1={xf(1)} y1={PT} x2={xf(1)} y2={PB} color={C.fill2} dash="3 4" width={1.5} />
        <polyline points={pts} fill="none" stroke={C.signal} strokeWidth={3.5} strokeLinejoin="round" />
        {inside && (
          <g>
            <Ln x1={xf(lo)} y1={yb - 12} x2={xf(lo)} y2={yb + 12} color={C.ink} width={2} />
            <Ln x1={xf(hi)} y1={yb - 12} x2={xf(hi)} y2={yb + 12} color={C.ink} width={2} />
            <Ln x1={xf(lo) + 3} y1={yb + 30} x2={xf(hi) - 3} y2={yb + 30} color={C.resist} width={2.5} arrow="both" />
            <T x={xf(hi) + 14} y={yb + 30} size={13} bold color={C.resist}>bandwidth</T>
          </g>
        )}
        <T x={PX - 8} y={yv(1)} anchor="end" size={12} color={C.muted}>100%</T>
        <T x={PX - 8} y={yb} anchor="end" size={12} color={C.muted}>70.7%</T>
        <T x={PX - 8} y={yv(0)} anchor="end" size={12} color={C.muted}>0</T>
        <T x={xf(1)} y={PB + 16} anchor="middle" size={12} bold>{si(f0, 'Hz', 3)}</T>
        <T x={PX} y={PB + 16} size={12} color={C.muted}>{si(f0 * (1 - SPAN), 'Hz', 3)}</T>
        <T x={PX + PW} y={PB + 16} anchor="end" size={12} color={C.muted}>{si(f0 * (1 + SPAN), 'Hz', 3)}</T>
        <T x={PX + PW - 4} y={PT - 8} anchor="end" size={13} bold color={C.signal}>Q = {fmt(Q, 3)}</T>
        <T x={PX} y={PB + 40} size={12} color={C.muted}>frequency, from 15% below to 15% above resonance</T>
      </Diagram>
      <Controls>
        <Choice label="Circuit" value={kind} onChange={setKind} options={[{ value: 'series', label: 'Series (current peaks)' }, { value: 'parallel', label: 'Parallel (impedance peaks)' }]} />
        <Slider label="Inductance (L)" value={le} min={0} max={2} step={0.05} onChange={setLe} format={() => si(L, 'H', 2)} color="var(--d-current)" />
        <Slider label="Capacitance (C)" value={ce} min={1} max={3} step={0.05} onChange={setCe} format={() => si(Cap, 'F', 2)} color="var(--d-voltage)" />
        <Slider label="Coil resistance (R)" value={re} min={-0.3} max={1.3} step={0.05} onChange={setRe} format={() => `${fmt(R, 2)} Ω`} color="var(--d-resist)" />
        <Readout label="Resonant frequency f₀" value={si(f0, 'Hz', 3)} color="var(--d-signal)" />
        <Readout label="Q = XL ÷ R" value={fmt(Q, 3)} color="var(--d-power)" />
        <Readout label="Bandwidth (−3 dB, about f₀ ÷ Q)" value={si(bw, 'Hz', 3)} color="var(--d-resist)" />
      </Controls>
    </>
  )
}
