import { useState } from 'react'
import { C, Controls, Diagram, Ln, Readout, Slider, T, TAU, fmt } from '../kit'

const N = 512, B1 = 50, B2 = 65
const BINS = [20, 35, B1, B2, 80, 95]
const FLOOR = -60

/** Two-tone test through a soft limiter: the harder it is driven, the stronger the unwanted products beside the tones. */
function analyse(drive: number) {
  const y = Array.from({ length: N }, (_, n) => Math.tanh(drive * (0.5 * Math.sin((TAU * B1 * n) / N) + 0.5 * Math.sin((TAU * B2 * n) / N))))
  return BINS.map((b) => {
    let re = 0, im = 0
    for (let n = 0; n < N; n++) { re += y[n] * Math.cos((TAU * b * n) / N); im += y[n] * Math.sin((TAU * b * n) / N) }
    return (2 * Math.hypot(re, im)) / N
  })
}

/** Overdriven audio into an AFSK or SSB transmitter creates intermodulation distortion. IMD compares the strongest product to a tone. */
export function Imd() {
  const [drive, setDrive] = useState(0.4)
  const m = analyse(drive)
  const rel = m.map((v) => 20 * Math.log10(v / m[2]))
  const imd = rel[1]
  const bad = imd > -30
  const x0 = 60, step = 90, base = 214, H = 160
  const hFor = (db: number) => (Math.max(FLOOR, Math.min(0, db)) - FLOOR) / -FLOOR * H
  const lim = hFor(-30)
  const names = ['', '', 'tone 1', 'tone 2', '', '']
  return (
    <>
      <Diagram w={640} h={262} title={`Spectrum of a two-tone test. The strongest unwanted product is ${fmt(imd, 3)} decibels relative to a tone, so intermodulation distortion is ${bad ? 'worse' : 'better'} than the minus 30 decibel limit.`}
        caption="Illustrative two-tone model. Overdrive adds products on both sides of the wanted signal.">
        <T x={14} y={12} size={13} bold color={C.muted}>Level relative to one tone (dB)</T>
        <Ln x1={40} y1={base} x2={620} y2={base} color={C.muted} width={2} />
        {BINS.map((_, i) => {
          const wanted = i === 2 || i === 3
          const h = hFor(rel[i])
          const col = wanted ? C.signal : bad ? C.bad : C.resist
          return (
            <g key={i}>
              {h > 0.5 && <rect x={x0 + i * step - 16} y={base - h} width={32} height={h} rx={3} fill={col} />}
              <T x={x0 + i * step} y={base + 16} anchor="middle" size={12.5} bold={wanted} color={wanted ? C.ink : C.muted}>{wanted ? names[i] : 'unwanted'}</T>
            </g>
          )
        })}
        <Ln x1={40} y1={base - lim} x2={620} y2={base - lim} color={C.good} width={2} dash="6 5" />
        <T x={620} y={base - lim - 11} anchor="end" size={12.5} bold color={C.good}>−30 dB</T>
        <T x={620} y={base + 40} anchor="end" size={12.5} color={C.muted}>bottom of the chart = −60 dB</T>
      </Diagram>
      <Controls>
        <Slider label="Transmit audio drive" value={drive} min={0.1} max={4} step={0.1} onChange={setDrive} format={(v) => (v < 0.6 ? 'low' : v < 1.5 ? 'medium' : v < 2.8 ? 'high' : 'way too high')} color="var(--d-signal)" />
        <Readout label="IMD" value={imd < FLOOR ? '< −60' : fmt(imd, 3)} unit=" dB" color={bad ? 'var(--d-bad)' : 'var(--d-good)'} />
      </Controls>
    </>
  )
}
