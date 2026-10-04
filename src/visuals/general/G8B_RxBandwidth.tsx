import { useState } from 'react'
import { C, Controls, Diagram, Ln, Readout, Slider, T } from '../kit'

/** Match the receiver filter to the signal: too narrow loses signal, too wide lets in extra noise. */
export function G8B_RxBandwidth() {
  const [w, setW] = useState(3)
  const B = 3 // signal width (illustrative)
  const cx = 320, k = 30, base = 150
  const left = cx - (w / 2) * k, right = cx + (w / 2) * k
  const sig = Math.min(1, w / B)
  const noise = w / B // noise let in, relative to a matched filter
  const verdict = w < B - 0.01 ? 'Too narrow: part of the signal is cut off' : w > B + 0.01 ? 'Too wide: extra noise comes in with it' : 'Matched: best signal-to-noise ratio'
  const col = Math.abs(w - B) <= 0.01 ? C.good : C.bad
  const nh = 14
  return (
    <>
      <Diagram w={640} h={236} title={`Receiver filter ${w} kilohertz wide on a ${B} kilohertz signal. ${verdict}`}
        caption="The signal is a fixed width. Narrower loses signal; wider only adds noise. Matched gives the best signal-to-noise ratio.">
        <rect x={Math.max(20, left)} y={base - nh} width={Math.min(600, right) - Math.max(20, left)} height={nh} fill={C.bad} fillOpacity={0.35} />
        <Ln x1={20} y1={base - nh} x2={620} y2={base - nh} color={C.muted} width={1.5} dash="4 4" />
        <T x={24} y={base + 18} size={12.5} color={C.muted}>noise floor</T>
        <path d={`M${cx - (B / 2) * k},${base} L${cx - (B / 2) * k},${base - 90} L${cx + (B / 2) * k},${base - 90} L${cx + (B / 2) * k},${base} Z`} fill={C.signal} fillOpacity={0.35} stroke={C.signal} strokeWidth={2.5} />
        <T x={cx} y={base - 106} anchor="middle" size={13} bold color={C.signal}>signal</T>
        <rect x={left} y={base - 118} width={right - left} height={118} fill="none" stroke={col} strokeWidth={3} strokeDasharray="7 5" rx={4} />
        <T x={cx} y={base + 44} anchor="middle" size={14} bold color={col}>{verdict}</T>
        <T x={620} y={20} anchor="end" size={12.5} color={C.muted}>dashed box = receiver bandwidth</T>
      </Diagram>
      <Controls>
        <Slider label="Receiver bandwidth" value={w} min={1} max={8} step={0.5} onChange={setW} format={(v) => `${v} kHz`} color="var(--d-ink)" />
        <Readout label="Signal passed" value={`${Math.round(sig * 100)}%`} color="var(--d-signal)" />
        <Readout label="Noise let in" value={`${Math.round(noise * 100)}%`} color={noise > 1.01 ? 'var(--d-bad)' : 'var(--d-good)'} />
      </Controls>
    </>
  )
}
