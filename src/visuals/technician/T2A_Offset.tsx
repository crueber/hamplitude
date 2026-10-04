import { useState } from 'react'
import { C, Choice, Controls, Diagram, Ln, T } from '../kit'

type Band = '2m' | '70cm'
type Dir = 'minus' | 'plus'

const BANDS: Record<Band, { label: string; offset: string; mhz: number; out: number }> = {
  '2m': { label: '2 meters', offset: '600 kHz', mhz: 0.6, out: 0 },
  '70cm': { label: '70 centimeters', offset: '5 MHz', mhz: 5, out: 0 },
}
// Example repeater outputs (typical channel pairs)
const EXAMPLE: Record<Band, Record<Dir, number>> = {
  '2m': { minus: 146.94, plus: 147.18 },
  '70cm': { minus: 447.0, plus: 442.0 },
}

/** Pick a band and direction; see where the repeater's input lands relative to its output. */
export function Offset() {
  const [band, setBand] = useState<Band>('2m')
  const [dir, setDir] = useState<Dir>('minus')
  const b = BANDS[band]
  const out = EXAMPLE[band][dir]
  const inp = dir === 'minus' ? out - b.mhz : out + b.mhz
  const f = (v: number) => v.toFixed(3)
  const xOut = dir === 'minus' ? 490 : 150
  const xIn = dir === 'minus' ? 150 : 490
  const sign = dir === 'minus' ? '−' : '+'
  return (
    <>
      <Diagram w={640} h={250} title={`On ${b.label} the repeater input is ${b.offset} ${dir === 'minus' ? 'below' : 'above'} its output`} caption="Offset = the gap between a repeater's transmit (output) and receive (input) frequencies.">
        <Ln x1={60} y1={110} x2={580} y2={110} color={C.muted} width={2} arrow />
        {/* arrow showing the offset */}
        <Ln x1={xOut + (xIn > xOut ? 12 : -12)} y1={160} x2={xIn + (xIn > xOut ? -12 : 12)} y2={160} color={C.power} width={3} arrow />
        <T x={320} y={184} anchor="middle" bold size={17} color={C.power}>{sign}{b.offset} offset</T>
        {/* markers */}
        <circle cx={xOut} cy={110} r={11} fill={C.signal} stroke={C.bg} strokeWidth={3} />
        <circle cx={xIn} cy={110} r={11} fill={C.resist} stroke={C.bg} strokeWidth={3} />
        <T x={xOut} y={50} anchor="middle" bold size={14} color={C.signal}>Repeater OUTPUT</T>
        <T x={xOut} y={68} anchor="middle" size={12} color={C.muted}>you listen here</T>
        <T x={xOut} y={134} anchor="middle" mono bold size={15} color={C.signal}>{f(out)}</T>
        <T x={xIn} y={50} anchor="middle" bold size={14} color={C.resist}>Repeater INPUT</T>
        <T x={xIn} y={68} anchor="middle" size={12} color={C.muted}>you transmit here</T>
        <T x={xIn} y={134} anchor="middle" mono bold size={15} color={C.resist}>{f(inp)}</T>
        <T x={320} y={226} anchor="middle" size={13} color={C.muted}>Frequency increases to the right. Examples in MHz; your radio applies the offset.</T>
      </Diagram>
      <Controls>
        <Choice label="Band" value={band} onChange={setBand} options={[{ value: '2m', label: '2 m: 600 kHz' }, { value: '70cm', label: '70 cm: 5 MHz' }]} />
        <Choice label="Offset direction" value={dir} onChange={setDir} options={[{ value: 'minus', label: 'Minus (−)' }, { value: 'plus', label: 'Plus (+)' }]} />
      </Controls>
    </>
  )
}
