import { useState } from 'react'
import { C, Controls, Diagram, Ln, Readout, Slider, T, TAU, fmt } from '../kit'

const S0 = 0, N0 = -10, FLOOR = -45 // dB: signal, atmospheric noise (both at the antenna with no loss), receiver noise floor
const dbSum = (a: number, b: number) => 10 * Math.log10(Math.pow(10, a / 10) + Math.pow(10, b / 10))

/** Lobe shape ((1 + cos) / 2)^n, normalised to a peak of 1. */
const lobe = (th: number, n: number) => Math.pow((1 + Math.cos(th)) / 2, n)
/** Peak over average power gain (RDF) for that lobe in this flat view. */
function rdf(n: number) {
  let s = 0
  const N = 720
  for (let i = 0; i < N; i++) s += Math.pow(lobe((i / N) * TAU, n), 2)
  return 10 * Math.log10(1 / (s / N))
}

/** On 160 and 80 m, atmospheric noise swamps the receiver: a lossy antenna hurts the signal and noise equally, directivity helps. */
export function NoiseDirectivity() {
  const [loss, setLoss] = useState(10)
  const [n, setN] = useState(1)
  const d = rdf(n)
  const sig = S0 + d - loss
  const noise = N0 - loss
  const total = dbSum(noise, FLOOR)
  const snr = sig - total
  const baseSnr = S0 - dbSum(N0, FLOOR)
  const R = 80, cx = 120, cy = 140
  const pts = Array.from({ length: 181 }, (_, i) => {
    const th = (i / 180) * TAU
    const r = lobe(th, n) * R
    return `${i ? 'L' : 'M'}${(cx + r * Math.cos(th)).toFixed(1)},${(cy - r * Math.sin(th)).toFixed(1)}`
  }).join('')
  // average level as a circle with the same mean power
  const avg = Math.pow(10, -d / 20) * R
  const bx = (v: number) => 300 + ((v + 50) / 65) * 320
  const rows: [string, number, string][] = [
    ['Signal from the wanted direction', sig, C.signal],
    ['Atmospheric noise (average over all directions)', noise, C.bad],
  ]
  return (
    <>
      <Diagram w={640} h={300} title={`Antenna with ${fmt(loss, 3)} dB of loss and ${fmt(d, 3)} dB receiving directivity factor: signal ${fmt(sig, 3)} dB, atmospheric noise ${fmt(noise, 3)} dB, signal to noise ${fmt(snr, 3)} dB`}
        caption="Loss lowers signal and atmospheric noise together, so signal-to-noise barely changes. Directivity lifts the signal above the average noise.">
        <T x={cx} y={22} anchor="middle" size={13} bold color={C.muted}>Antenna pattern</T>
        <Ln x1={cx - R - 8} y1={cy} x2={cx + R + 8} y2={cy} color={C.fill2} width={1.5} />
        <circle cx={cx} cy={cy} r={avg} fill="none" stroke={C.muted} strokeWidth={2} strokeDasharray="5 4" />
        <path d={pts + 'Z'} fill={C.signal} fillOpacity={0.22} stroke={C.signal} strokeWidth={3.5} strokeLinejoin="round" />
        <T x={cx + R + 6} y={cy - 16} size={12} bold color={C.signal}>peak</T>
        <T x={cx} y={cy + R + 26} anchor="middle" size={12} bold color={C.muted}>dashed = average gain</T>
        <T x={cx} y={cy + R + 46} anchor="middle" size={13} bold color={C.signal}>RDF = peak ÷ average = {fmt(d, 2)} dB</T>
        {rows.map(([label, v, col], i) => {
          const y = 56 + i * 66
          return (
            <g key={label}>
              <T x={300} y={y} size={13} bold color={col}>{label}</T>
              <rect x={300} y={y + 14} width={Math.max(2, bx(v) - 300)} height={18} rx={4} fill={col} fillOpacity={0.85} />
              <T x={bx(v) + 8} y={y + 23} size={13} bold mono color={col}>{fmt(v, 3)} dB</T>
            </g>
          )
        })}
        <T x={300} y={188} size={13} bold color={C.muted}>Receiver's own noise floor</T>
        <Ln x1={bx(FLOOR)} y1={204} x2={bx(FLOOR)} y2={236} color={C.muted} width={3} dash="5 4" />
        <T x={bx(FLOOR) + 8} y={220} size={13} bold mono color={C.muted}>{FLOOR} dB</T>
        <T x={300} y={262} size={14} bold color={snr >= baseSnr - 0.5 ? C.good : C.bad}>signal-to-noise: {fmt(snr, 3)} dB</T>
        <T x={300} y={282} size={12} color={C.muted}>(an ideal, lossless, non-directional antenna: {fmt(baseSnr, 3)} dB)</T>
      </Diagram>
      <Controls>
        <Slider label="Antenna loss" value={loss} min={0} max={30} step={1} onChange={setLoss} format={(v) => `${v} dB`} color="var(--d-bad)" />
        <Slider label="Beam sharpness" value={n} min={0} max={6} step={0.25} onChange={setN} format={(v) => fmt(v, 2)} color="var(--d-signal)" />
        <Readout label="Receiving directivity factor" value={fmt(d, 2)} unit="dB" color="var(--d-signal)" />
        <Readout label="Signal to noise" value={fmt(snr, 3)} unit="dB" color={snr >= baseSnr - 0.5 ? 'var(--d-good)' : 'var(--d-bad)'} />
      </Controls>
    </>
  )
}
