import { useMemo, useState } from 'react'
import { C, Controls, Diagram, Readout, Slider, T, TAU, fmt } from '../kit'

const N = 200
const X0 = 20, X1 = 620, CY = 120, A = 40

/** Deterministic standard-normal samples, so the picture does not flicker. */
function gaussians(n: number): number[] {
  let s = 12345
  const rnd = () => { s = (s * 1664525 + 1013904223) >>> 0; return (s + 1) / 4294967297 }
  return Array.from({ length: n }, () => Math.sqrt(-2 * Math.log(rnd())) * Math.cos(TAU * rnd()))
}

const verdict = (db: number) =>
  db >= 20 ? 'Clean' : db >= 10 ? 'Easy to see' : db >= 3 ? 'Visible, noisy' : db >= -5 ? 'Barely visible' : 'Buried'

/** A sine wave plus noise at a chosen signal-to-noise ratio (power ratio, in dB). */
export function NoiseAndSnr_Levels() {
  const [snr, setSnr] = useState(10)
  const g = useMemo(() => gaussians(N), [])
  // signal rms = A / sqrt(2); noise rms = signal rms / 10^(snr/20)
  const sigma = A / Math.SQRT2 / 10 ** (snr / 20)
  const pts = g.map((z, i) => {
    const u = i / (N - 1)
    const y = CY - (A * Math.sin(TAU * 5 * u) + sigma * z)
    return `${i ? 'L' : 'M'}${(X0 + (X1 - X0) * u).toFixed(1)},${y.toFixed(1)}`
  }).join('')
  const sig = g.map((_, i) => {
    const u = i / (N - 1)
    return `${i ? 'L' : 'M'}${(X0 + (X1 - X0) * u).toFixed(1)},${(CY - A * Math.sin(TAU * 5 * u)).toFixed(1)}`
  }).join('')
  const ratio = 10 ** (snr / 10)
  const col = snr >= 10 ? C.good : snr >= 0 ? C.resist : C.bad
  return (
    <>
      <Diagram w={640} h={240}
        title={`A sine-wave signal with noise added at ${snr} decibels signal to noise. The signal power is ${fmt(ratio)} times the noise power. ${verdict(snr)}.`}
        caption="Same signal every time; only the noise level changes. Dashed line: the signal on its own.">
        <clipPath id="nsl-clip"><rect x={X0} y={30} width={X1 - X0} height={180} /></clipPath>
        <rect x={X0} y={30} width={X1 - X0} height={180} rx={10} fill={C.fill} />
        <line x1={X0} y1={CY} x2={X1} y2={CY} stroke={C.muted} strokeWidth={1} strokeDasharray="2 5" />
        <path d={pts} fill="none" stroke={C.signal} strokeWidth={2} strokeLinejoin="round" clipPath="url(#nsl-clip)" />
        <path d={sig} fill="none" stroke={C.ink} strokeWidth={1.5} strokeDasharray="5 5" opacity={0.7} />
        <T x={X0} y={14} size={13} bold color={C.signal}>Signal plus noise</T>
        <T x={X1} y={14} anchor="end" size={13} bold color={col}>{verdict(snr)}</T>
        <T x={X0} y={226} size={12.5} color={C.muted}>time →</T>
      </Diagram>
      <Controls>
        <Slider label="Signal-to-noise ratio" value={snr} min={-15} max={30} onChange={setSnr}
          format={(v) => `${v > 0 ? '+' : v < 0 ? '−' : ''}${Math.abs(v)} dB`} color="var(--d-signal)" />
        <Readout label="Signal power ÷ noise power" value={fmt(ratio, 3)} unit="×" color={col} />
      </Controls>
    </>
  )
}
