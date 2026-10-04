import { useState } from 'react'
import { C, Controls, Diagram, Ln, Readout, Slider, T, fmt } from '../kit'

const N = 420
const rawAt = (u: number) => {
  const env = (0.15 + 0.85 * Math.pow(Math.abs(Math.sin(u * 14)), 1.6)) * (0.35 + 0.65 * Math.abs(Math.sin(u * 4.1 + 0.6)))
  return env * Math.sin(u * 150 + Math.sin(u * 37) * 2)
}
const RAW = Array.from({ length: N + 1 }, (_, i) => rawAt(i / N))
const PEAK = Math.max(...RAW.map(Math.abs))
const IN = RAW.map((v) => v / PEAK)
const meanSq = (a: number[]) => a.reduce((s, v) => s + v * v, 0) / a.length
const BASE = meanSq(IN)

/** A speech processor compresses the audio so average level rises while peaks stay at the limit. */
export function Processor() {
  const [p, setP] = useState(0.4)
  const g = 1 + 4 * p
  const boost = 1 + 0.7 * Math.max(0, (p - 0.7) / 0.3)
  const out = IN.map((v) => Math.max(-1, Math.min(1, (Math.tanh(g * v) / Math.tanh(g)) * boost)))
  const ratio = meanSq(out) / BASE
  const over = p > 0.7
  const col = over ? C.bad : C.good
  const x0 = 40, x1 = 600, A = 50
  const cyB = 78, cyA = 206
  const path = (a: number[], cy: number) => a.map((v, i) => `${i ? 'L' : 'M'}${(x0 + (i / N) * (x1 - x0)).toFixed(1)},${(cy - A * v).toFixed(1)}`).join('')
  const lims = (cy: number) => (
    <>
      <Ln x1={x0} y1={cy - A} x2={x1} y2={cy - A} color={C.power} width={2} dash="6 5" />
      <Ln x1={x0} y1={cy + A} x2={x1} y2={cy + A} color={C.power} width={2} dash="6 5" />
    </>
  )
  return (
    <>
      <Diagram w={640} h={296} title={`Voice waveform before and after speech processing at ${Math.round(p * 100)} percent. Peaks stay at the limit; the average level rises to ${fmt(ratio, 2)} times the average power.${over ? ' At this setting the peaks are flattened, which distorts the speech.' : ''}`}
        caption="Peak power is capped by the transmitter. Processing raises the quiet parts, so the average goes up.">
        <T x={x0} y={14} size={13} bold color={C.muted}>before</T>
        {lims(cyB)}
        <path d={path(IN, cyB)} fill="none" stroke={C.muted} strokeWidth={1.8} />
        <T x={x1} y={cyB - A - 8} anchor="end" size={12} bold color={C.power}>peak limit</T>
        <T x={x0} y={cyA - A - 14} size={13} bold color={col}>after processing</T>
        {lims(cyA)}
        <path d={path(out, cyA)} fill="none" stroke={col} strokeWidth={1.8} strokeLinejoin="round" />
        <T x={320} y={278} anchor="middle" size={14} bold color={col}>{over ? 'Over-processed: flat tops, distortion' : 'Louder average, same peaks'}</T>
      </Diagram>
      <Controls>
        <Slider label="Processing" value={p} min={0} max={1} step={0.02} onChange={setP} format={(v) => `${Math.round(v * 100)}%`} color="var(--d-signal)" />
        <Readout label="Average power" value={`×${fmt(ratio, 2)}`} color={over ? 'var(--d-bad)' : 'var(--d-good)'} />
        <Readout label="Peak power" value="same" color="var(--d-power)" />
      </Controls>
    </>
  )
}
