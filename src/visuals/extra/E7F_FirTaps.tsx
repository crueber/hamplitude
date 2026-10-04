import { useState } from 'react'
import { C, Controls, Diagram, Ln, Slider, T, TAU } from '../kit'

const TAPS = [7, 15, 31, 63, 127]
const FC = 0.2 // cutoff, as a fraction of the sample rate

/** Windowed-sinc low-pass FIR coefficients (Hamming window). */
function coeffs(n: number): number[] {
  const m = (n - 1) / 2
  const h = Array.from({ length: n }, (_, i) => {
    const x = i - m
    const s = x === 0 ? 2 * FC : Math.sin(TAU * FC * x) / (Math.PI * x)
    return s * (0.54 - 0.46 * Math.cos((TAU * i) / (n - 1)))
  })
  const sum = h.reduce((a, b) => a + b, 0)
  return h.map((v) => v / sum)
}
const mag = (h: number[], f: number) => {
  let re = 0, im = 0
  h.forEach((v, i) => { re += v * Math.cos(TAU * f * i); im -= v * Math.sin(TAU * f * i) })
  return Math.hypot(re, im)
}

/** FIR filter: a delay line with taps. More taps give a sharper response. */
export function FirTaps() {
  const [k, setK] = useState(2)
  const n = TAPS[k]
  const h = coeffs(n)
  const X0 = 70, X1 = 616, Y0 = 220, Y1 = 330 // plot area: 0 dB at top (Y0), -60 dB at bottom (Y1)
  const fx = (f: number) => X0 + (f / 0.5) * (X1 - X0)
  const gy = (db: number) => Y0 + (Math.min(0, Math.max(-60, db)) / -60) * (Y1 - Y0)
  const pts: string[] = []
  for (let i = 0; i <= 200; i++) {
    const f = (i / 200) * 0.5
    pts.push(`${i ? 'L' : 'M'}${fx(f).toFixed(1)},${gy(20 * Math.log10(Math.max(mag(h, f), 1e-6))).toFixed(1)}`)
  }
  return (
    <>
      <Diagram w={640} h={382}
        title={`FIR filter with ${n} taps. A delay line gives each tap a slightly later copy of the signal. The taps are weighted and summed. More taps give a sharper low-pass response.`}
        caption="Each tap is one more delayed copy of the signal. More taps, more steps to shape the response.">
        <T x={14} y={18} size={13} bold color={C.muted}>signal in</T>
        <Ln x1={14} y1={50} x2={308} y2={50} color={C.signal} width={2.5} />
        {[0, 1].map((i) => (
          <g key={i}>
            <rect x={105 + i * 82 - 23} y={34} width={46} height={32} rx={6} fill={C.fill} stroke={C.resist} strokeWidth={2} />
            <T x={105 + i * 82} y={50} anchor="middle" size={12} bold color={C.resist}>delay</T>
          </g>
        ))}
        {[0, 1, 2].map((i) => {
          const x = 64 + i * 82
          return (
            <g key={i}>
              <Ln x1={x} y1={50} x2={x} y2={104} color={C.power} width={2} />
              <circle cx={x} cy={50} r={3.5} fill={C.signal} />
              <rect x={x - 22} y={104} width={44} height={26} rx={6} fill={C.fill} stroke={C.power} strokeWidth={2} />
              <T x={x} y={117} anchor="middle" size={12} bold color={C.power}>×h{i}</T>
            </g>
          )
        })}
        <T x={344} y={50} size={18} bold color={C.muted}>···</T>
        <T x={344} y={117} size={13} color={C.muted}>{n} taps in all</T>
        <Ln x1={64} y1={130} x2={64} y2={150} color={C.power} width={2} />
        <Ln x1={146} y1={130} x2={146} y2={150} color={C.power} width={2} />
        <Ln x1={228} y1={130} x2={228} y2={150} color={C.power} width={2} />
        <Ln x1={64} y1={150} x2={228} y2={150} color={C.power} width={2} />
        <Ln x1={146} y1={150} x2={146} y2={170} color={C.power} width={2} arrow />
        <circle cx={146} cy={184} r={14} fill={C.fill} stroke={C.power} strokeWidth={2.5} />
        <T x={146} y={185} anchor="middle" size={18} bold color={C.power}>Σ</T>
        <Ln x1={160} y1={184} x2={216} y2={184} color={C.signal} width={2.5} arrow />
        <T x={224} y={184} size={13} bold color={C.signal}>filtered out</T>
        {/* response */}
        <T x={X0} y={206} size={13} bold>{n} taps: filter response</T>
        <Ln x1={X0} y1={Y0} x2={X0} y2={Y1} color={C.muted} width={2} />
        <Ln x1={X0} y1={Y1} x2={X1} y2={Y1} color={C.muted} width={2} />
        <T x={X0 - 8} y={Y0} anchor="end" size={12} color={C.muted}>0</T>
        <T x={X0 - 8} y={Y1} anchor="end" size={12} color={C.muted}>−60 dB</T>
        <T x={X1} y={Y1 + 18} anchor="end" size={12} color={C.muted}>frequency, 0 to half the sample rate →</T>
        <Ln x1={fx(FC)} y1={Y0} x2={fx(FC)} y2={Y1} color={C.resist} width={1.5} dash="4 4" />
        <path d={pts.join('')} fill="none" stroke={C.signal} strokeWidth={3.5} strokeLinejoin="round" />
      </Diagram>
      <Controls>
        <Slider label="Number of taps" value={k} min={0} max={TAPS.length - 1} onChange={setK} format={(v) => String(TAPS[v])} color="var(--d-power)" />
      </Controls>
    </>
  )
}
