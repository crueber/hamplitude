import { useState } from 'react'
import { C, Choice, Controls, Diagram, Ln, Readout, Slider, T, fmt } from '../kit'

const cap = (B: number, snrDb: number) => B * Math.log2(1 + 10 ** (snrDb / 10))
const rate = (r: number) => (r >= 1e6 ? `${fmt(r / 1e6, 3)} Mbit/s` : r >= 1e3 ? `${fmt(r / 1e3, 3)} kbit/s` : r >= 1 ? `${fmt(r, 3)} bit/s` : `${fmt(r, 2)} bit/s`)

/** Shannon limit C = B log2(1 + S/N): the most error-free data a channel of bandwidth B and signal-to-noise ratio S/N can carry. */
export function BandwidthAndDataRate_Shannon() {
  const [bw, setBw] = useState(2500)
  const [snr, setSnr] = useState(10)
  const x0 = 84, x1 = 600, y0 = 28, y1 = 252, lo = -2, hi = 6, d0 = -30, d1 = 40
  const px = (db: number) => x0 + ((db - d0) / (d1 - d0)) * (x1 - x0)
  const py = (v: number) => y1 - ((Math.log10(Math.max(v, 10 ** lo)) - lo) / (hi - lo)) * (y1 - y0)
  const curve: string[] = []
  for (let db = d0; db <= d1; db += 1) curve.push(`${db === d0 ? 'M' : 'L'}${px(db).toFixed(1)},${py(cap(bw, db)).toFixed(1)}`)
  const c = cap(bw, snr)
  const decades = [-2, -1, 0, 1, 2, 3, 4, 5, 6]
  const dl = (e: number) => (e < 0 ? String(10 ** e) : e >= 6 ? '1M' : e >= 3 ? `${10 ** (e - 3)}k` : String(10 ** e))
  return (
    <>
      <Diagram w={640} h={300}
        title={`Shannon limit for a ${fmt(bw)} hertz channel: at ${snr} dB signal to noise, at most ${rate(c)} of error-free data.`}
        caption="Maximum error-free rate (bits per second) against signal-to-noise ratio. Real modes sit below the line.">
        <rect x={14} y={6} width={612} height={288} rx={10} fill={C.fill} />
        {decades.map((e) => (
          <g key={e}>
            <Ln x1={x0} y1={py(10 ** e)} x2={x1} y2={py(10 ** e)} color={C.fill2} width={1} />
            <T x={x0 - 8} y={py(10 ** e)} anchor="end" size={12} color={C.muted}>{dl(e)}</T>
          </g>
        ))}
        {[-30, -20, -10, 0, 10, 20, 30, 40].map((db) => (
          <g key={db}>
            <Ln x1={px(db)} y1={y1} x2={px(db)} y2={y1 + 6} color={C.muted} width={1.5} />
            <T x={px(db)} y={y1 + 18} anchor="middle" size={12} color={C.muted}>{db}</T>
          </g>
        ))}
        <T x={x1} y={y1 + 34} anchor="end" size={12} color={C.muted}>signal-to-noise ratio (dB, in the signal's bandwidth)</T>
        <T x={22} y={18} size={12} color={C.muted}>bit/s</T>
        <Ln x1={x0} y1={y1} x2={x1} y2={y1} color={C.muted} width={2} />
        <path d={curve.join('')} fill="none" stroke={C.power} strokeWidth={3} strokeLinejoin="round" />
        <Ln x1={px(snr)} y1={py(c)} x2={px(snr)} y2={y1} color={C.resist} width={1.5} dash="4 4" />
        <circle cx={px(snr)} cy={py(c)} r={7} fill={C.resist} stroke={C.bg} strokeWidth={2.5} />
        <T x={x0 + 12} y={y0 + 14} size={14} bold color={C.ink}>C = B × log₂(1 + S/N)</T>
        <T x={x0 + 12} y={y0 + 36} size={14} bold color={C.resist}>= {rate(c)}</T>
      </Diagram>
      <Controls>
        <Choice label="Bandwidth" value={bw} onChange={setBw} options={[{ value: 50, label: '50 Hz' }, { value: 500, label: '500 Hz' }, { value: 2500, label: '2.5 kHz' }, { value: 15000, label: '15 kHz' }]} />
        <Slider label="Signal-to-noise ratio" value={snr} min={-30} max={40} step={1} onChange={setSnr} format={(v) => `${v} dB`} color="var(--d-resist)" />
        <Readout label="Shannon limit" value={rate(c)} color="var(--d-power)" />
      </Controls>
    </>
  )
}
