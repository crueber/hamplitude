import { useState } from 'react'
import { C, Controls, Diagram, Ln, Slider, T } from '../kit'

/** Zero beat: tune your transmit frequency to match the received signal. */
export function G2C_ZeroBeat() {
  const [d, setD] = useState(150)
  const x0 = 40, x1 = 600
  const pos = (off: number) => 320 + off * 0.5
  const theirs = 0
  const mine = d
  const matched = d === 0
  // beat envelope of two close tones: amplitude |cos(pi*delta*t)|
  const pts: string[] = []
  for (let i = 0; i <= 300; i++) {
    const t = i / 300
    const y = 236 - 28 * (Math.sin(2 * Math.PI * 18 * t) + Math.sin(2 * Math.PI * (18 + (d / 260) * 4) * t)) / 2
    pts.push(`${i ? 'L' : 'M'}${(x0 + t * (x1 - x0)).toFixed(1)},${y.toFixed(1)}`)
  }
  return (
    <>
      <Diagram w={640} h={290} title="Zero beat: the received signal is at one frequency and your transmit frequency is another. Move your transmit frequency until it matches the received signal. The two tones then beat at zero hertz difference, so the pulsing in the combined signal disappears" caption="Zero beat = your transmit frequency matches the received signal. Drag until the pulsing stops.">
        <T x={14} y={18} size={14} bold>Frequency</T>
        <Ln x1={x0} y1={90} x2={x1} y2={90} color={C.muted} width={2} />
        <Ln x1={pos(theirs)} y1={90} x2={pos(theirs)} y2={50} color={C.signal} width={4} />
        <T x={pos(theirs)} y={36} anchor="middle" size={13.5} bold color={C.signal}>received signal</T>
        <Ln x1={pos(mine)} y1={90} x2={pos(mine)} y2={50} color={C.resist} width={4} />
        {Math.abs(d) > 70 && <T x={pos(mine)} y={36} anchor="middle" size={13.5} bold color={C.resist}>you</T>}
        {Math.abs(d) <= 70 && <T x={pos(mine) + (d >= 0 ? 52 : -52)} y={64} anchor="middle" size={13.5} bold color={C.resist}>you</T>}
        <Ln x1={pos(theirs)} y1={112} x2={pos(mine)} y2={112} color={C.ink} width={2.5} arrow="both" style={{ opacity: matched ? 0 : 1 }} />
        <T x={(pos(theirs) + pos(mine)) / 2} y={134} anchor="middle" size={14} bold>{matched ? 'matched' : `${Math.abs(Math.round(d / 10) * 10)} Hz apart`}</T>
        <T x={14} y={174} size={14} bold color={matched ? C.good : C.muted}>{matched ? 'Zero beat: steady, no pulsing' : 'Two tones beat: pulsing'}</T>
        <Ln x1={x0} y1={236} x2={x1} y2={236} color={C.fill2} width={1} />
        <path d={pts.join('')} fill="none" stroke={matched ? C.good : C.power} strokeWidth={2} strokeLinejoin="round" />
      </Diagram>
      <Controls>
        <Slider label="Your offset from the received signal" value={d} min={-300} max={300} step={10} onChange={setD} format={(v) => (v === 0 ? 'zero beat' : `${v > 0 ? '+' : ''}${v} Hz`)} color={C.resist} />
      </Controls>
    </>
  )
}
