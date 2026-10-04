import { useState } from 'react'
import { C, Controls, Diagram, Ln, Readout, Slider, T, fmt } from '../kit'

/** Shape factor = width at -60 dB divided by width at -6 dB. Smaller means steeper skirts. */
export function ShapeFactor() {
  const [n, setN] = useState(6)
  const B6 = 2.4 // kHz, fixed -6 dB width (illustrative SSB-width filter)
  // |H|^2 = 1/(1+u^(2n)), u = f / f0. Width at -6 dB sets f0.
  const u6 = (10 ** 0.6 - 1) ** (1 / (2 * n))
  const f0 = B6 / 2 / u6
  const half60 = f0 * (10 ** 6 - 1) ** (1 / (2 * n))
  const B60 = half60 * 2
  const sf = B60 / B6
  const cx = 320, kx = 36 // px per kHz
  const X = (f: number) => cx + f * kx
  const py0 = 50, py1 = 220, dmax = 70
  const Y = (d: number) => py0 + (Math.min(dmax, -d) / dmax) * (py1 - py0)
  const resp = (f: number) => -10 * Math.log10(1 + (Math.abs(f) / f0) ** (2 * n))
  const pts = Array.from({ length: 241 }, (_, i) => { const f = -6 + (i / 240) * 12; return `${X(f)},${Y(resp(f))}` }).join(' ')
  return (
    <>
      <Diagram w={640} h={310} title={`A band-pass filter 2.4 kHz wide at minus 6 dB is ${fmt(B60, 3)} kHz wide at minus 60 dB. Shape factor is ${fmt(sf, 3)}. Lower is steeper and rejects adjacent channels better.`}
        caption="Shape factor = width at −60 dB ÷ width at −6 dB. Lower is better.">
        <rect x={20} y={20} width={600} height={250} rx={10} fill={C.fill} />
        {[6, 60].map((d) => (
          <g key={d}>
            <Ln x1={60} y1={Y(-d)} x2={600} y2={Y(-d)} color={C.fill2} width={1.5} dash="4 4" />
            <T x={56} y={Y(-d)} anchor="end" size={12} color={C.muted}>{`−${d} dB`}</T>
          </g>
        ))}
        <T x={56} y={Y(0)} anchor="end" size={12} color={C.muted}>0 dB</T>
        <polyline points={pts} fill="none" stroke={C.signal} strokeWidth={3.5} strokeLinejoin="round" />
        {/* width brackets */}
        <Ln x1={X(-B6 / 2)} y1={Y(-6)} x2={X(B6 / 2)} y2={Y(-6)} color={C.power} width={3} arrow="both" />
        <T x={X(B6 / 2) + 14} y={Y(-6) - 2} size={13} bold color={C.power}>{`${fmt(B6, 3)} kHz`}</T>
        <Ln x1={X(-half60)} y1={Y(-60)} x2={X(half60)} y2={Y(-60)} color={C.resist} width={3} arrow="both" />
        <T x={cx} y={Y(-60) - 12} anchor="middle" size={13} bold color={C.resist}>{`${fmt(B60, 3)} kHz`}</T>
        <T x={320} y={292} anchor="middle" bold size={15}>{`Shape factor = ${fmt(B60, 3)} ÷ ${fmt(B6, 3)} = ${fmt(sf, 3)}`}</T>
      </Diagram>
      <Controls>
        <Slider label="Filter sections (more = steeper skirts)" value={n} min={4} max={12} onChange={setN} format={(v) => `${v}`} color={C.signal} />
        <Readout label="Shape factor" value={fmt(sf, 3)} color={C.resist} />
      </Controls>
    </>
  )
}
