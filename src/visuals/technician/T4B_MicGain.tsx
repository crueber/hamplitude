import { useState } from 'react'
import { C, Controls, Diagram, Ln, Readout, Slider, T } from '../kit'

/** Too much microphone gain pushes the audio past the transmitter's limit and flattens the peaks. */
export function MicGain() {
  const [g, setG] = useState(0.7)
  const clip = g > 1
  const col = clip ? C.bad : C.good
  const cy = 130, A = 64
  const path = Array.from({ length: 161 }, (_, i) => {
    const th = (i / 160) * Math.PI * 4
    const raw = (Math.sin(th) + 0.4 * Math.sin(2.7 * th + 0.5)) / 1.4
    const y = Math.max(-1, Math.min(1, raw * g * 1.15))
    return `${i ? 'L' : 'M'}${(50 + (i / 160) * 540).toFixed(1)},${(cy - A * y).toFixed(1)}`
  }).join('')
  return (
    <>
      <Diagram w={640} h={230} title={clip ? 'Excessive microphone gain flattens the audio peaks at the limit: distorted transmitted audio' : 'With moderate microphone gain the audio waveform stays inside the limit and is clean'}
        caption="Dashed lines: the most audio the transmitter can handle cleanly.">
        <Ln x1={50} y1={cy - A} x2={590} y2={cy - A} color={C.power} width={2} dash="6 5" />
        <Ln x1={50} y1={cy + A} x2={590} y2={cy + A} color={C.power} width={2} dash="6 5" />
        <T x={590} y={cy - A - 14} anchor="end" size={13} bold color={C.power}>limit</T>
        <path d={path} fill="none" stroke={col} strokeWidth={3.5} strokeLinejoin="round" />
        <T x={50} y={26} size={14} bold color={col}>{clip ? 'Peaks flattened: distorted audio' : 'Peaks stay inside the limit: clean audio'}</T>
      </Diagram>
      <Controls>
        <Slider label="Microphone gain" value={g} min={0.2} max={2} step={0.05} onChange={setG} format={() => ''} color="var(--d-signal)" />
        <Readout label="Transmitted audio" value={clip ? 'Distorted' : 'Clean'} color={col} />
      </Controls>
    </>
  )
}
