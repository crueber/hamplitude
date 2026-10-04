import { useState } from 'react'
import { C, Choice, Diagram, Ln, T } from '../kit'

const WIRES = [
  { awg: 20, mm: 0.812 },
  { awg: 16, mm: 1.291 },
  { awg: 14, mm: 1.628 },
  { awg: 12, mm: 2.053 },
  { awg: 8, mm: 3.264 },
]
const MIN_AWG = { 15: 14, 20: 12 } as const

/** Wire drawn to scale. The breaker must be sized to protect the thinnest wire in the circuit. */
export function Gauge() {
  const [amps, setAmps] = useState<15 | 20>(20)
  const min = MIN_AWG[amps]
  const k = 22 // px per mm
  const xs = WIRES.map((_, i) => 72 + i * 124)
  const firstOk = WIRES.findIndex((w) => w.awg <= min)
  const split = (xs[firstOk - 1] + xs[firstOk]) / 2
  return (
    <>
      <Diagram w={640} h={290} title={`A ${amps} amp breaker needs wire no thinner than AWG ${min}. Wire is drawn to scale: a lower AWG number is thicker wire.`}
        caption="Copper wire drawn to scale. Lower AWG number = thicker wire = more current allowed.">
        <T x={20} y={22} size={15} bold>Circuit breaker: {amps} A. Minimum wire: AWG {min}</T>
        {WIRES.map((w, i) => {
          const ok = w.awg <= min
          const col = ok ? C.good : C.bad
          return (
            <g key={w.awg}>
              <circle cx={xs[i]} cy={120} r={(w.mm * k) / 2} fill={C.resist} fillOpacity={0.55} stroke={col} strokeWidth={3} />
              <T x={xs[i]} y={190} anchor="middle" size={15} bold>AWG {w.awg}</T>
              <T x={xs[i]} y={214} anchor="middle" size={13} bold color={col}>{ok ? 'OK' : 'too thin'}</T>
            </g>
          )
        })}
        <Ln x1={split} y1={60} x2={split} y2={240} color={C.muted} width={2} dash="6 5" />
        <T x={split - 10} y={64} anchor="end" size={12} color={C.muted}>thinner</T>
        <T x={split + 10} y={64} size={12} color={C.muted}>thicker</T>
        <T x={20} y={266} size={13} color={C.muted}>A fuse sized above the wire rating lets the wire overheat before it opens.</T>
      </Diagram>
      <div style={{ margin: '-6px 0 14px' }}>
        <Choice label="Breaker size" value={amps} onChange={setAmps} options={[{ value: 15, label: '15 A breaker' }, { value: 20, label: '20 A breaker' }]} />
      </div>
    </>
  )
}
