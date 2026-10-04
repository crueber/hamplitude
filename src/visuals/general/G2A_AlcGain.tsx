import { useState } from 'react'
import { C, Controls, Diagram, Ln, Slider, T, sinePath } from '../kit'

/** Mic gain drives the ALC meter. Past the ALC zone the audio is flattened (distortion). */
export function G2A_AlcGain() {
  const [g, setG] = useState(40)
  const limit = 62
  const over = g > limit
  const mx = 36, mw = 568, my = 70
  const frac = g / 100
  const amp = 30 * (0.25 + 1.35 * frac)
  const out = Math.min(amp, 30 * (0.25 + 1.35 * (limit / 100)))
  const pts: string[] = []
  for (let i = 0; i <= 200; i++) {
    const x = 330 + (i / 200) * 280
    const y = 226 - Math.max(-out, Math.min(out, amp * Math.sin((i / 200) * Math.PI * 6)))
    pts.push(`${i ? 'L' : 'M'}${x.toFixed(1)},${y.toFixed(1)}`)
  }
  const col = over ? C.bad : C.good
  return (
    <>
      <Diagram w={640} h={308} title="Transmit audio gain, also called microphone gain, sets how far the ALC meter reads. Inside the ALC zone the voice waveform stays clean. Turn the gain past the zone and the peaks are flattened, which distorts the signal" caption="Set mic gain so the ALC just touches its zone on voice peaks. More is not louder, only dirtier.">
        <T x={mx} y={20} size={14} bold>ALC meter</T>
        <rect x={mx} y={my} width={mw} height={34} rx={8} fill={C.fill} stroke={C.muted} strokeWidth={1.8} />
        <rect x={mx + 2} y={my + 2} width={Math.max(0, mw * frac - 4)} height={30} rx={6} fill={col} fillOpacity={0.5} />
        <rect x={mx + (mw * 0.38)} y={my - 10} width={mw * 0.24} height={54} rx={6} fill="none" stroke={C.good} strokeWidth={2.5} />
        <T x={mx + mw * 0.5} y={my - 24} anchor="middle" size={13} bold color={C.good}>ALC zone</T>
        <T x={mx} y={my + 62} size={13} color={C.muted}>too little: weak</T>
        <T x={mx + mw} y={my + 62} size={13} color={C.muted} anchor="end">too much: ALC pushes back</T>
        <T x={mx} y={168} size={14} bold>Voice peak into the mic</T>
        <path d={sinePath(36, 296, 226, amp, 3)} fill="none" stroke={C.signal} strokeWidth={2.5} />
        <Ln x1={36} y1={226} x2={296} y2={226} color={C.fill2} width={1} />
        <T x={330} y={168} size={14} bold color={col}>{over ? 'Output: flattened peaks' : 'Output: clean'}</T>
        <path d={pts.join('')} fill="none" stroke={col} strokeWidth={2.5} strokeLinejoin="round" />
        <Ln x1={330} y1={226} x2={610} y2={226} color={C.fill2} width={1} />
        <T x={166} y={292} anchor="middle" size={13} color={C.muted}>in</T>
        <T x={470} y={292} anchor="middle" size={13} color={C.muted}>out</T>
      </Diagram>
      <Controls>
        <Slider label="Mic gain (transmit audio)" value={g} min={5} max={100} onChange={setG} format={(v) => `${v}%`} color={C.signal} />
      </Controls>
    </>
  )
}
