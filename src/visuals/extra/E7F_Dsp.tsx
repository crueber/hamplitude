import { useState } from 'react'
import { C, Choice, Diagram, Ln, T, TAU } from '../kit'

/** SSB by the phasing method: audio and its 90-degree (Hilbert) copy, combined in quadrature. */
export function SsbQuadrature() {
  const [sub, setSub] = useState(true)
  const bx = (x: number, y: number, w: number, label: string, col: string, sub2?: string) => (
    <g>
      <rect x={x} y={y} width={w} height={52} rx={10} fill={C.fill} stroke={col} strokeWidth={2} />
      <T x={x + w / 2} y={y + (sub2 ? 19 : 26)} anchor="middle" size={13} bold color={col}>{label}</T>
      {sub2 && <T x={x + w / 2} y={y + 38} anchor="middle" size={12} color={C.muted}>{sub2}</T>}
    </g>
  )
  const mult = (x: number, y: number) => (
    <g>
      <circle cx={x} cy={y} r={15} fill={C.fill} stroke={C.ink} strokeWidth={2.2} />
      <path d={`M${x - 6},${y - 6} L${x + 6},${y + 6} M${x + 6},${y - 6} L${x - 6},${y + 6}`} stroke={C.ink} strokeWidth={2.5} strokeLinecap="round" />
    </g>
  )
  const cx = 470, base = 262
  const up = sub // subtracting gives the upper sideband, adding the lower
  return (
    <>
      <Diagram w={640} h={306}
        title={`Digital SSB generation: the audio goes down two paths, one shifted 90 degrees by a Hilbert-transform filter. Each path is mixed with the carrier, the two carriers 90 degrees apart, and the results are ${sub ? 'subtracted, leaving the upper sideband' : 'added, leaving the lower sideband'}.`}
        caption="Signals combined in quadrature: one sideband adds up, the other cancels. Which one depends on the sign and phase convention.">
        <T x={14} y={20} size={13} bold color={C.muted}>audio in</T>
        <Ln x1={14} y1={44} x2={58} y2={44} color={C.power} width={2.5} />
        <Ln x1={58} y1={44} x2={58} y2={118} color={C.power} width={2.5} />
        <Ln x1={58} y1={44} x2={176} y2={44} color={C.power} width={2.5} arrow />
        <Ln x1={58} y1={118} x2={74} y2={118} color={C.power} width={2.5} arrow />
        <T x={176} y={20} size={12} color={C.muted}>I path: audio</T>
        {bx(74, 92, 130, 'Hilbert filter', C.signal, '90° shift')}
        <Ln x1={204} y1={118} x2={250} y2={118} color={C.power} width={2.5} arrow />
        <T x={250} y={96} size={12} color={C.muted}>Q path</T>
        {mult(300, 44)}{mult(300, 118)}
        <Ln x1={176} y1={44} x2={285} y2={44} color={C.power} width={2.5} arrow />
        <Ln x1={250} y1={118} x2={285} y2={118} color={C.power} width={2.5} arrow />
        <Ln x1={300} y1={4} x2={300} y2={29} color={C.resist} width={2.5} arrow />
        <T x={314} y={8} size={12} bold color={C.resist}>carrier cos</T>
        <Ln x1={300} y1={170} x2={300} y2={133} color={C.resist} width={2.5} arrow />
        <T x={314} y={166} size={12} bold color={C.resist}>carrier sin (90° apart)</T>
        <Ln x1={315} y1={44} x2={380} y2={44} color={C.signal} width={2.5} />
        <Ln x1={380} y1={44} x2={380} y2={74} color={C.signal} width={2.5} />
        <Ln x1={315} y1={118} x2={380} y2={118} color={C.signal} width={2.5} />
        <Ln x1={380} y1={118} x2={380} y2={92} color={C.signal} width={2.5} />
        <circle cx={380} cy={83} r={16} fill={C.fill} stroke={C.signal} strokeWidth={2.5} />
        <T x={380} y={84} anchor="middle" size={18} bold color={C.signal}>{sub ? '−' : '+'}</T>
        <Ln x1={396} y1={83} x2={440} y2={83} color={C.signal} width={2.5} arrow />
        <T x={448} y={83} size={14} bold color={C.signal}>SSB out</T>
        {/* result spectrum */}
        <Ln x1={190} y1={base} x2={626} y2={base} color={C.muted} width={2} />
        <Ln x1={cx} y1={base} x2={cx} y2={base - 70} color={C.muted} width={2} dash="4 4" />
        <T x={cx} y={base + 18} anchor="middle" size={12} color={C.muted}>carrier frequency</T>
        <path d={`M${cx - 96},${base} L${cx - 88},${base - 50} L${cx - 14},${base - 36} L${cx - 10},${base} Z`} fill={C.signal} fillOpacity={up ? 0.04 : 0.3} stroke={C.signal} strokeWidth={up ? 1.5 : 2.5} strokeDasharray={up ? '5 4' : undefined} />
        <path d={`M${cx + 10},${base} L${cx + 14},${base - 36} L${cx + 88},${base - 50} L${cx + 96},${base} Z`} fill={C.signal} fillOpacity={up ? 0.3 : 0.04} stroke={C.signal} strokeWidth={up ? 2.5 : 1.5} strokeDasharray={up ? undefined : '5 4'} />
        <T x={cx - 52} y={base - 62} anchor="middle" size={13} bold color={up ? C.muted : C.signal}>{up ? 'cancelled' : 'lower'}</T>
        <T x={cx + 52} y={base - 62} anchor="middle" size={13} bold color={up ? C.signal : C.muted}>{up ? 'upper' : 'cancelled'}</T>
      </Diagram>
      <div style={{ margin: '-6px 0 14px' }}>
        <Choice label="Combine" value={sub ? 'sub' : 'add'} onChange={(v) => setSub(v === 'sub')} options={[{ value: 'sub', label: 'Subtract paths' }, { value: 'add', label: 'Add paths' }]} />
      </div>
    </>
  )
}

/** FFT: a signal in the time domain becomes lines in the frequency domain. */
export function Fft() {
  const N = 260
  const W = 220
  const A = (u: number) => 0.6 * Math.sin(TAU * 3 * u) + 0.35 * Math.sin(TAU * 11 * u)
  const a: string[] = []
  for (let i = 0; i <= N; i++) { const u = i / N; a.push(`${i ? 'L' : 'M'}${(30 + u * W).toFixed(1)},${(110 - 56 * A(u)).toFixed(1)}`) }
  const peaks: [number, number, string][] = [[3, 0.6, 'low tone'], [11, 0.35, 'high tone']]
  const fx = (v: number) => 400 + (v / 14) * 210
  return (
    <Diagram w={640} h={224}
      title="A Fast Fourier Transform converts a signal from the time domain, a wiggling waveform, to the frequency domain, a spectrum with a line for each tone."
      caption="FFT: time domain in, frequency domain out. Each tone becomes a peak.">
      <T x={140} y={22} anchor="middle" size={14} bold color={C.signal}>Time domain</T>
      <rect x={16} y={36} width={248} height={150} rx={10} fill={C.fill} />
      <Ln x1={30} y1={110} x2={250} y2={110} color={C.muted} width={1} dash="3 5" />
      <path d={a.join('')} fill="none" stroke={C.signal} strokeWidth={2.2} strokeLinejoin="round" />
      <T x={140} y={206} anchor="middle" size={12.5} color={C.muted}>amplitude against time</T>
      <rect x={278} y={86} width={84} height={44} rx={10} fill={C.fill} stroke={C.power} strokeWidth={2.5} />
      <T x={320} y={108} anchor="middle" size={16} bold color={C.power}>FFT</T>
      <Ln x1={264} y1={108} x2={276} y2={108} color={C.power} width={2.5} arrow />
      <Ln x1={362} y1={108} x2={386} y2={108} color={C.power} width={2.5} arrow />
      <T x={510} y={22} anchor="middle" size={14} bold color={C.power}>Frequency domain</T>
      <rect x={386} y={36} width={240} height={150} rx={10} fill={C.fill} />
      <Ln x1={400} y1={160} x2={612} y2={160} color={C.muted} width={2} />
      {peaks.map(([v, h, l]) => (
        <g key={v}>
          <Ln x1={fx(v)} y1={160} x2={fx(v)} y2={160 - h * 110} color={C.power} width={5} />
          <T x={fx(v)} y={160 - h * 110 - 12} anchor="middle" size={12.5} bold color={C.power}>{l}</T>
        </g>
      ))}
      <T x={510} y={206} anchor="middle" size={12.5} color={C.muted}>amplitude against frequency</T>
    </Diagram>
  )
}
