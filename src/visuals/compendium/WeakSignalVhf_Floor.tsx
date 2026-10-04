import { useState } from 'react'
import { C, Controls, Diagram, Ln, Readout, Slider, T } from '../kit'

const MODES = [
  { label: 'SSB voice', bw: 2400 },
  { label: 'CW, wide filter', bw: 500 },
  { label: 'CW, narrow filter', bw: 100 },
  { label: 'FT8-style digital', bw: 50 },
]

/** The noise floor drops 10 dB for every 10 times narrower the signal. Floor = -174 dBm/Hz + 10 log(bandwidth) + noise figure. */
export function WeakSignalVhf_Floor() {
  const [nf, setNf] = useState(3)
  const [sig, setSig] = useState(-150)
  const lo = -170, hi = -120
  const gx0 = 190, gx1 = 616
  const X = (d: number) => gx0 + ((gx1 - gx0) * (d - lo)) / (hi - lo)
  const floors = MODES.map((m) => -174 + 10 * Math.log10(m.bw) + nf)
  return (
    <>
      <Diagram w={640} h={282}
        title={`A signal at ${sig} dBm against the noise floor of four modes with a ${nf} dB noise figure: ${MODES.map((m, i) => `${m.label} floor ${floors[i].toFixed(0)} dBm`).join(', ')}`}
        caption="Noise floor in each mode's own bandwidth (power in dBm). The narrower the signal, the less noise gets in alongside it.">
        {[-165, -155, -145, -135, -125].map((d) => (
          <g key={d}>
            <Ln x1={X(d)} y1={36} x2={X(d)} y2={228} color={C.fill2} width={1} />
            <T x={X(d)} y={244} anchor="middle" size={12} color={C.muted}>{d}</T>
          </g>
        ))}
        <T x={(gx0 + gx1) / 2} y={266} anchor="middle" size={12} color={C.muted}>power, dBm</T>
        <T x={14} y={18} size={13} bold>Noise floor by mode</T>
        <T x={gx1} y={18} anchor="end" size={12} color={C.muted}>signal-to-noise in that bandwidth</T>
        {MODES.map((m, i) => {
          const y = 56 + i * 44
          const snr = sig - floors[i]
          const ok = snr >= 0
          return (
            <g key={m.label}>
              <T x={14} y={y - 6} size={13} bold>{m.label}</T>
              <T x={14} y={y + 11} size={12} color={C.muted}>{m.bw} Hz wide</T>
              <rect x={gx0} y={y - 10} width={X(floors[i]) - gx0} height={22} rx={5} fill={C.fill2} stroke={C.muted} strokeWidth={1.5} />
              <T x={X(floors[i]) - 8} y={y + 1} anchor="end" size={12} mono color={C.ink}>{floors[i].toFixed(0)}</T>
              <T x={gx1} y={y + 1} anchor="end" size={14} bold mono color={ok ? C.good : C.bad}>{snr >= 0 ? '+' : ''}{snr.toFixed(0)} dB</T>
            </g>
          )
        })}
        <Ln x1={X(sig)} y1={34} x2={X(sig)} y2={230} color={C.voltage} width={3} />
        <T x={X(sig) + 6} y={30} size={12} bold color={C.voltage}>signal</T>
      </Diagram>
      <Controls>
        <Slider label="Signal level" value={sig} min={-165} max={-130} step={1} onChange={setSig} format={(v) => `${v} dBm`} color="var(--d-voltage)" />
        <Slider label="Receiver noise figure" value={nf} min={0.5} max={10} step={0.5} onChange={setNf} format={(v) => `${v} dB`} color="var(--d-resist)" />
        <Readout label="Narrow CW vs SSB" value={(10 * Math.log10(2400 / 100)).toFixed(1)} unit=" dB quieter" color={C.good} />
      </Controls>
    </>
  )
}
