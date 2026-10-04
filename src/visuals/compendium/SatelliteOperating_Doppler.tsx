import { useState } from 'react'
import { C, Controls, Diagram, Ln, Readout, Slider, T } from '../kit'

const GM = 398600.4418, RE = 6371, CKMS = 299792.458
const H = 500 // km, a typical low orbit
const BANDS = [
  { f: 145.9, label: '2 m (145.9 MHz)', color: C.current },
  { f: 435, label: '70 cm (435 MHz)', color: C.resist },
  { f: 1269, label: '23 cm (1269 MHz)', color: C.voltage },
]

/** Pass geometry for a circular orbit and a stationary observer; returns time series of range rate and elevation. */
function pass(maxEl: number) {
  const a = RE + H, w = Math.sqrt(GM / a ** 3)
  const elAt = (b: number) => (Math.atan2(a * Math.cos(b) - RE, a * Math.sin(b)) * 180) / Math.PI
  let lo = 0, hi = Math.acos(RE / a)
  for (let i = 0; i < 60; i++) { const m = (lo + hi) / 2; if (elAt(m) > maxEl) lo = m; else hi = m }
  const beta = (lo + hi) / 2
  const S = [RE * Math.cos(beta), 0, RE * Math.sin(beta)]
  const pos = (t: number) => [a * Math.cos(w * t), a * Math.sin(w * t), 0]
  const rng = (t: number) => { const p = pos(t); return Math.hypot(p[0] - S[0], p[1] - S[1], p[2] - S[2]) }
  const elev = (t: number) => {
    const p = pos(t), d = [p[0] - S[0], p[1] - S[1], p[2] - S[2]], dl = Math.hypot(d[0], d[1], d[2])
    return (Math.asin((d[0] * S[0] + d[1] * S[1] + d[2] * S[2]) / (RE * dl)) * 180) / Math.PI
  }
  let t0 = -1000
  while (elev(t0) < 0) t0 += 0.5
  const T0 = -t0 // symmetric pass: -T0 .. +T0
  const pts: { t: number; rate: number }[] = []
  for (let i = 0; i <= 80; i++) {
    const t = -T0 + (2 * T0 * i) / 80, e = 1e-3
    pts.push({ t, rate: (rng(t + e) - rng(t - e)) / (2 * e) })
  }
  return { T0, pts }
}

/** Doppler shift over one low-orbit pass, in kHz, on three bands. */
export function SatelliteOperating_Doppler() {
  const [el, setEl] = useState(60)
  const { T0, pts } = pass(el)
  const gx0 = 84, gx1 = 612, gy = 150, gh = 104, maxK = 32
  const path = (f: number) =>
    pts.map((p, i) => `${i ? 'L' : 'M'}${(gx0 + ((gx1 - gx0) * i) / (pts.length - 1)).toFixed(1)},${(gy - (gh * (-(f * 1000 * p.rate) / CKMS)) / maxK).toFixed(1)}`).join('')
  const peak = (f: number) => (f * Math.abs(pts[0].rate)) / CKMS * 1000 // kHz
  return (
    <>
      <Diagram w={640} h={314}
        title={`Doppler shift over one pass reaching ${el} degrees elevation: about plus and minus ${peak(145.9).toFixed(1)} kilohertz on 2 metres, ${peak(435).toFixed(0)} on 70 centimetres and ${peak(1269).toFixed(0)} on 23 centimetres`}
        caption="Shift ≈ frequency × (speed toward you ÷ speed of light). Satellite at 500 km, Earth's rotation ignored. The same pass, three bands.">
        <T x={14} y={20} size={13} bold>Received frequency change during one pass (kHz)</T>
        {[-30, -20, -10, 0, 10, 20, 30].map((v) => (
          <g key={v}>
            <Ln x1={gx0} y1={gy - (gh * v) / maxK} x2={gx1} y2={gy - (gh * v) / maxK} color={v === 0 ? C.muted : C.fill2} width={v === 0 ? 1.5 : 1} dash={v === 0 ? '4 5' : undefined} />
            <T x={gx0 - 8} y={gy - (gh * v) / maxK} anchor="end" size={12} color={C.muted}>{v > 0 ? `+${v}` : v}</T>
          </g>
        ))}
        <Ln x1={(gx0 + gx1) / 2} y1={gy - gh - 6} x2={(gx0 + gx1) / 2} y2={gy + gh + 6} color={C.muted} width={1} dash="2 5" />
        {BANDS.map((b) => (
          <path key={b.f} d={path(b.f)} fill="none" stroke={b.color} strokeWidth={3} strokeLinecap="round" strokeLinejoin="round" />
        ))}
        <T x={gx0} y={gy + gh + 22} size={12} color={C.muted}>satellite rises</T>
        <T x={(gx0 + gx1) / 2} y={gy + gh + 22} anchor="middle" size={12} color={C.muted}>closest: no shift</T>
        <T x={gx1} y={gy + gh + 22} anchor="end" size={12} color={C.muted}>sets</T>
        <T x={gx0 + 10} y={gy - (gh * 20) / maxK} size={12} color={C.voltage} bold>approaching: higher</T>
        <T x={gx1 - 10} y={gy + (gh * 20) / maxK} anchor="end" size={12} color={C.current} bold>receding: lower</T>
        {BANDS.map((b, i) => (
          <g key={b.label}>
            <Ln x1={gx0 + i * 176} y1={300} x2={gx0 + i * 176 + 22} y2={300} color={b.color} width={4} />
            <T x={gx0 + i * 176 + 30} y={300} size={12}>{b.label}</T>
          </g>
        ))}
      </Diagram>
      <Controls>
        <Slider label="Highest point of the pass" value={el} min={5} max={90} step={5} onChange={setEl} format={(v) => `${v}° above the horizon`} color="var(--d-signal)" />
        <Readout label="Pass length" value={((2 * T0) / 60).toFixed(1)} unit=" min" color={C.signal} />
        <Readout label="Largest shift at 2 m" value={`±${peak(145.9).toFixed(1)}`} unit=" kHz" color={C.current} />
        <Readout label="at 70 cm" value={`±${peak(435).toFixed(1)}`} unit=" kHz" color={C.resist} />
        <Readout label="at 23 cm" value={`±${peak(1269).toFixed(1)}`} unit=" kHz" color={C.voltage} />
      </Controls>
    </>
  )
}
