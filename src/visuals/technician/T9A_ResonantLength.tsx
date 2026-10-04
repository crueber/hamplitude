import { useState } from 'react'
import { C, Controls, Diagram, Ln, Readout, Slider, T, fmt } from '../kit'

const F0 = 146 // reference dipole, cut for 146 MHz

/** Shorter antenna, higher resonant frequency: length and frequency are inversely related. */
export function ResonantLength() {
  const [pct, setPct] = useState(100)
  const f = F0 / (pct / 100)
  const half = 130 * (pct / 100)
  const W = 640, H = 244, cx = 320, cy = 70
  const fx = (v: number) => 60 + ((v - 100) / (220 - 100)) * 520
  return (
    <>
      <Diagram w={W} h={H} title={`A dipole at ${pct} percent of the reference length resonates at about ${fmt(f, 3)} megahertz`} caption="Reference: a dipole cut for 146 MHz. Shorten it and its resonant frequency goes up.">
        <Ln x1={cx - half} y1={cy} x2={cx + half} y2={cy} color={C.resist} width={7} />
        <circle cx={cx} cy={cy} r={6} fill={C.bg} stroke={C.ink} strokeWidth={2} />
        <Ln x1={cx - half} y1={cy + 30} x2={cx + half} y2={cy + 30} color={C.power} width={2.5} arrow="both" />
        <T x={cx} y={cy + 50} anchor="middle" size={14} bold color={C.power}>about one half wavelength</T>
        <Ln x1={60} y1={185} x2={580} y2={185} color={C.muted} width={2} />
        {[100, 146, 180, 220].map((v) => (
          <g key={v}>
            <Ln x1={fx(v)} y1={180} x2={fx(v)} y2={190} color={C.muted} width={2} />
            <T x={fx(v)} y={206} anchor="middle" size={12} color={C.muted}>{v}</T>
          </g>
        ))}
        <T x={320} y={228} anchor="middle" size={12} color={C.muted}>resonant frequency (MHz)</T>
        <circle cx={fx(f)} cy={185} r={9} fill={C.signal} stroke={C.bg} strokeWidth={3} />
        <T x={fx(f)} y={160} anchor="middle" size={14} bold color={C.signal}>{fmt(f, 3)} MHz</T>
      </Diagram>
      <Controls>
        <Slider label="Dipole length" value={pct} min={70} max={130} step={1} onChange={setPct} format={(v) => `${v}% of reference`} color="var(--d-resist)" />
        <Readout label="Resonant frequency" value={fmt(f, 3)} unit="MHz" color="var(--d-signal)" />
      </Controls>
    </>
  )
}
