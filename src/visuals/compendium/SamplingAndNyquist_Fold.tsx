import { useState } from 'react'
import { C, Choice, Controls, Diagram, Ln, Readout, Slider, T, fmt } from '../kit'

const alias = (f: number, fs: number) => Math.abs(f - Math.round(f / fs) * fs)

/** The folding picture: input frequency against the frequency the samples appear to contain. */
export function SamplingAndNyquist_Fold() {
  const [fs, setFs] = useState(8)
  const [step, setStep] = useState(7) // input frequency in units of fs/10
  const f = (step * fs) / 10
  const fa = alias(f, fs)
  const ok = f <= fs / 2 + 1e-9
  const x0 = 70, x1 = 610, yb = 232, yt = 62
  const px = (v: number) => x0 + (v / (3 * fs)) * (x1 - x0)
  const py = (v: number) => yb - (v / (fs / 2)) * (yb - yt)
  const zig = Array.from({ length: 7 }, (_, k) => `${k ? 'L' : 'M'}${px((k * fs) / 2).toFixed(1)},${py(k % 2 ? fs / 2 : 0).toFixed(1)}`).join('')
  const col = ok ? C.good : C.bad
  const nyq = fs / 2
  return (
    <>
      <Diagram w={640} h={300}
        title={`Folding for a sample rate of ${fs} kilohertz. An input of ${fmt(f)} kilohertz ${ok ? 'is below half the sample rate and is captured correctly' : `is above half the sample rate and appears as ${fmt(fa)} kilohertz`}.`}
        caption="Anything above half the sample rate folds back down, like a reflection, into the range from 0 to half the sample rate.">
        <rect x={14} y={6} width={612} height={288} rx={10} fill={C.fill} />
        <rect x={px(0)} y={yt - 14} width={px(nyq) - px(0)} height={yb - yt + 14} fill={C.good} fillOpacity={0.2} />
        <Ln x1={x0} y1={yb} x2={x1} y2={yb} color={C.muted} width={2} />
        <Ln x1={x0} y1={yb} x2={x0} y2={yt - 14} color={C.muted} width={2} />
        <Ln x1={x0} y1={py(nyq)} x2={x1} y2={py(nyq)} color={C.resist} width={1.5} dash="5 4" />
        <T x={x1} y={py(nyq) - 12} anchor="end" size={12.5} bold color={C.resist}>half the sample rate: {fmt(nyq)} kHz</T>
        <path d={zig} fill="none" stroke={C.signal} strokeWidth={3} strokeLinejoin="round" />
        {[0, 1, 2, 3, 4, 5, 6].map((k) => (
          <g key={k}>
            <Ln x1={px((k * fs) / 2)} y1={yb} x2={px((k * fs) / 2)} y2={yb + 6} color={C.muted} width={1.5} />
            <T x={px((k * fs) / 2)} y={yb + 18} anchor="middle" size={12} color={C.muted}>{fmt((k * fs) / 2)}</T>
          </g>
        ))}
        <T x={x1} y={yb + 38} anchor="end" size={12.5} color={C.muted}>frequency going in (kHz)</T>
        <T x={22} y={26} size={12.5} color={C.muted}>frequency the samples show (kHz)</T>
        <Ln x1={px(f)} y1={yb} x2={px(f)} y2={py(fa)} color={col} width={1.5} dash="4 4" />
        <Ln x1={x0} y1={py(fa)} x2={px(f)} y2={py(fa)} color={col} width={1.5} dash="4 4" />
        <circle cx={px(f)} cy={py(fa)} r={8} fill={col} stroke={C.bg} strokeWidth={2.5} />
        <T x={x0 + 8} y={py(fa) - 12} size={12.5} bold color={col}>{fmt(fa)} kHz</T>
      </Diagram>
      <Controls>
        <Choice label="Sample rate" value={fs} onChange={setFs} options={[{ value: 8, label: '8 kS/s' }, { value: 48, label: '48 kS/s' }]} />
        <Slider label="Input frequency" value={step} min={0} max={30} step={1} onChange={setStep} format={() => `${fmt(f)} kHz`} color="var(--d-signal)" />
        <Readout label="Samples look like" value={fmt(fa)} unit=" kHz" color={ok ? 'var(--d-good)' : 'var(--d-bad)'} />
      </Controls>
    </>
  )
}
