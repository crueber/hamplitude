import { useState } from 'react'
import { C, Choice, Diagram, Ln, T } from '../kit'

type Src = 'pulses' | 'strong'
/** A noise blanker mutes the receiver during short pulses. A very strong signal can look like a pulse and get chopped. */
export function Blanker() {
  const [on, setOn] = useState(true)
  const [src, setSrc] = useState<Src>('pulses')
  const x0 = 24, x1 = 616, cy = 106, n = 592
  const amp = src === 'strong' ? 70 : 32
  const pulses = [90, 250, 400, 520]
  const thr = 46
  let d = ''
  let pen = false
  for (let i = 0; i <= n; i += 2) {
    let v = amp * Math.sin(i / 9)
    let spike = 0
    if (src === 'pulses') { const p = pulses.find((q) => Math.abs(i - q) < 6); if (p !== undefined) spike = (i % 4 === 0 ? 1 : -1) * 78 }
    const val = v + spike
    const blank = on && Math.abs(val) > thr
    if (blank) { pen = false; continue }
    d += `${pen ? 'L' : 'M'}${x0 + i},${(cy - Math.max(-96, Math.min(96, val))).toFixed(1)}`
    pen = true
  }
  const good = (on && src === 'pulses') || (!on && src === 'strong')
  const msg = src === 'pulses' ? (on ? 'impulse noise removed' : 'impulse noise (clicks, pops) in the audio') : on ? 'strong signal chopped: distortion, spurious signals' : 'strong signal passes cleanly'
  return (
    <>
      <Diagram w={640} h={216} title={`Noise blanker ${on ? 'on' : 'off'}, input: ${src === 'pulses' ? 'a signal with impulse noise' : 'a very strong signal'}. ${msg}.`}
        caption="The blanker cuts the receiver off during sharp pulses. Great on impulse noise. A very strong signal can fool it.">
        <rect x={x0 - 10} y={10} width={n + 20} height={170} rx={8} fill={C.fill} />
        <Ln x1={x0} y1={cy} x2={x1} y2={cy} color={C.fill2} width={1} />
        {on && <><Ln x1={x0} y1={cy - thr} x2={x1} y2={cy - thr} color={C.muted} width={1} dash="4 4" /><Ln x1={x0} y1={cy + thr} x2={x1} y2={cy + thr} color={C.muted} width={1} dash="4 4" /><T x={x1} y={cy - thr - 10} anchor="end" size={11} color={C.muted}>blanking threshold</T></>}
        <path d={d} fill="none" stroke={good ? C.signal : C.bad} strokeWidth={2.5} strokeLinejoin="round" />
        <T x={320} y={198} anchor="middle" bold size={14} color={good ? C.good : C.bad}>{msg}</T>
      </Diagram>
      <div style={{ margin: '-6px 0 14px', display: 'grid', gap: 10 }}>
        <Choice label="Input" value={src} onChange={setSrc} options={[{ value: 'pulses', label: 'Signal + impulse noise' }, { value: 'strong', label: 'Very strong signal' }]} />
        <Choice label="Blanker" value={on ? 'on' : 'off'} onChange={(v) => setOn(v === 'on')} options={[{ value: 'off', label: 'Blanker off' }, { value: 'on', label: 'Blanker on' }]} />
      </div>
    </>
  )
}
