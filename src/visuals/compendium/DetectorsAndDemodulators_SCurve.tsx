import { useState } from 'react'
import { C, Controls, Diagram, Ln, Readout, Slider, T, TAU, useTime } from '../kit'

const PEAK = 12 // kHz: where this illustrative S-curve peaks
const s = (f: number) => (2 * (f / PEAK)) / (1 + (f / PEAK) ** 2)

/** An FM discriminator turns frequency into voltage along an S-shaped curve; the audio is the voltage as the carrier swings. */
export function DetectorsAndDemodulators_SCurve() {
  const [dev, setDev] = useState(5)
  const { t, ref } = useTime(0.35)
  const ph = t % 1
  const f = dev * Math.sin(TAU * ph)

  const cx = 140, cy = 130, sx = 4.6, sy = 70 // left chart centre and scales
  const gx = (k: number) => cx + k * sx
  const gy = (v: number) => cy - v * sy
  const curve = Array.from({ length: 101 }, (_, k) => {
    const kk = -25 + 0.5 * k
    return `${gx(kk).toFixed(1)},${gy(s(kk)).toFixed(1)}`
  }).join(' ')
  const wx0 = 360, wx1 = 610
  const wave = Array.from({ length: 161 }, (_, k) => {
    const u = k / 160
    return `${(wx0 + (wx1 - wx0) * u).toFixed(1)},${gy(s(dev * Math.sin(TAU * u))).toFixed(1)}`
  }).join(' ')
  const dotY = gy(s(f))
  const over = dev > PEAK
  return (
    <>
      <Diagram w={640} h={308} svgRef={ref}
        title={`FM discriminator. The input frequency swings by plus and minus ${dev} kilohertz around the carrier. The S-shaped curve turns each frequency into a voltage, so the output is the audio. ${over ? 'This swing goes past the peaks of the S-curve, so the audio is flattened and distorted.' : 'The swing stays on the straight part of the curve, so the audio is clean.'}`}
        caption="Frequency in, voltage out. The audio is the voltage as the signal's frequency swings (illustrative curve).">
        <T x={20} y={22} size={14} bold color={C.signal}>Discriminator curve</T>
        <T x={wx0} y={22} size={14} bold>Audio out</T>
        <Ln x1={gx(-25)} y1={cy} x2={gx(25)} y2={cy} color={C.muted} width={1.5} />
        <Ln x1={cx} y1={gy(1.15)} x2={cx} y2={gy(-1.15)} color={C.muted} width={1.5} />
        {[-20, 0, 20].map((k) => <T key={k} x={gx(k)} y={cy + 92} anchor="middle" size={12} color={C.muted}>{k > 0 ? `+${k}` : `${k}`}</T>)}
        <T x={gx(25)} y={cy + 112} anchor="end" size={12} color={C.muted}>input frequency vs carrier (kHz)</T>
        <polyline points={curve} fill="none" stroke={C.signal} strokeWidth={3.2} strokeLinejoin="round" />
        <rect x={gx(-dev)} y={gy(1.15)} width={gx(dev) - gx(-dev)} height={gy(-1.15) - gy(1.15)} fill={C.signal} opacity={0.1} />
        <Ln x1={gx(f)} y1={dotY} x2={wx0 + (wx1 - wx0) * ph} y2={dotY} color={C.muted} width={1.5} dash="4 4" />
        <circle cx={gx(f)} cy={dotY} r={6} fill={C.bg} stroke={C.power} strokeWidth={3} />
        <Ln x1={wx0} y1={cy} x2={wx1} y2={cy} color={C.muted} width={1.5} />
        <polyline points={wave} fill="none" stroke={C.ink} strokeWidth={3} strokeLinejoin="round" />
        <circle cx={wx0 + (wx1 - wx0) * ph} cy={dotY} r={6} fill={C.bg} stroke={C.power} strokeWidth={3} />
        <T x={20} y={gy(1)} size={12} color={C.muted}>+</T>
        <T x={20} y={gy(-1)} size={12} color={C.muted}>−</T>
        <T x={320} y={270} anchor="middle" size={15} bold color={over ? C.bad : C.good}>{over ? 'Swing passes the S-curve peaks: the audio flattens (distortion)' : 'Swing stays on the straight part: the audio is a clean copy'}</T>
        <T x={320} y={292} anchor="middle" size={13} color={C.muted}>The shaded band is the range the frequency covers. Voice FM on VHF typically swings about ±5 kHz.</T>
      </Diagram>
      <Controls>
        <Slider label="Frequency swing (peak deviation)" value={dev} min={1} max={20} onChange={setDev} format={(v) => `±${v} kHz`} color={C.signal} />
        <Readout label="Carrier now" value={`${f >= 0 ? '+' : '−'}${Math.abs(f).toFixed(1)}`} unit="kHz" color={C.power} />
      </Controls>
    </>
  )
}
