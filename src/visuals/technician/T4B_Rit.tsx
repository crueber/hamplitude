import { useState } from 'react'
import { C, Choice, Controls, Diagram, Ln, Readout, Slider, T } from '../kit'

const TONES = [300, 600, 900, 1200]
const fx = (f: number) => 50 + (f / 1700) * 540

/** SSB: being off frequency shifts every tone by the same Hz (RIT fixes it). FM: audio distorts. */
export function Rit() {
  const [mode, setMode] = useState<'ssb' | 'fm'>('ssb')
  const [err, setErr] = useState(200)
  const [rit, setRit] = useState(0)
  const shift = err - rit
  const word = Math.abs(shift) < 25 ? 'Natural' : shift > 0 ? 'Too high' : 'Too low'
  const col = Math.abs(shift) < 25 ? C.good : C.bad
  const d = Math.min(1, Math.abs(err) / 500)
  const wave = Array.from({ length: 121 }, (_, i) => {
    const th = (i / 120) * Math.PI * 4
    const y = Math.sin(th) + d * 0.7 * Math.sin(2 * th + 1) + d * 0.35 * Math.sin(3.7 * th)
    return `${i ? 'L' : 'M'}${(50 + (i / 120) * 540).toFixed(1)},${(150 - 42 * y).toFixed(1)}`
  }).join('')
  return (
    <>
      <Diagram w={640} h={230} title={mode === 'ssb' ? 'Voice tones on single sideband all shift up or down by the tuning error, so the voice sounds too high or too low' : 'An FM signal received off frequency produces distorted audio'}
        caption={mode === 'ssb' ? 'Ghost lines: how the voice should sound. Solid lines: what you hear.' : 'The pitch is not simply shifted: the audio waveform itself is distorted.'}>
        {mode === 'ssb' ? (
          <g>
            <Ln x1={50} y1={190} x2={590} y2={190} color={C.muted} width={2} />
            <T x={50} y={212} size={12.5} color={C.muted}>low pitch</T>
            <T x={590} y={212} anchor="end" size={12.5} color={C.muted}>high pitch</T>
            {TONES.map((f) => (
              <g key={f}>
                <Ln x1={fx(f)} y1={190} x2={fx(f)} y2={70} color={C.muted} width={3} dash="3 5" opacity={0.7} />
                <Ln x1={fx(f + shift)} y1={190} x2={fx(f + shift)} y2={70} color={col} width={5} />
              </g>
            ))}
            <T x={50} y={34} size={14} bold color={col}>{word === 'Natural' ? 'Natural voice pitch' : `Voice pitch ${word.toLowerCase()}`} (every tone moves {shift > 0 ? '+' : ''}{shift} Hz)</T>
          </g>
        ) : (
          <g>
            <Ln x1={50} y1={150} x2={590} y2={150} color={C.muted} width={1.5} dash="3 5" />
            <path d={wave} fill="none" stroke={d > 0.15 ? C.bad : C.signal} strokeWidth={3.5} strokeLinecap="round" />
            <T x={50} y={34} size={14} bold color={d > 0.15 ? C.bad : C.good}>{d > 0.15 ? 'Distorted audio' : 'Clean audio'}</T>
          </g>
        )}
      </Diagram>
      <Controls>
        <Slider label="Their frequency is off by" value={err} min={-500} max={500} step={10} onChange={setErr} format={(v) => `${v > 0 ? '+' : ''}${v} Hz`} color="var(--d-voltage)" />
        {mode === 'ssb' && <Slider label="Your RIT / Clarifier" value={rit} min={-500} max={500} step={10} onChange={setRit} format={(v) => `${v > 0 ? '+' : ''}${v} Hz`} color="var(--d-signal)" />}
        <Readout label="You hear" value={mode === 'ssb' ? word : d > 0.15 ? 'Distorted' : 'Clean'} color={mode === 'ssb' ? col : d > 0.15 ? C.bad : C.good} />
      </Controls>
      <div style={{ margin: '-6px 0 14px' }}>
        <Choice label="Mode" value={mode} onChange={setMode} options={[{ value: 'ssb', label: 'SSB' }, { value: 'fm', label: 'FM' }]} />
      </div>
    </>
  )
}
