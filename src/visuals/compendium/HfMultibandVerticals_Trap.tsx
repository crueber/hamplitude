import { useState } from 'react'
import { C, Choice, Controls, Diagram, Ln, T } from '../kit'

/** A two-band trap vertical: the trap isolates the top section on the high band and loads the antenna on the low band. */
export function HfMultibandVerticals_Trap() {
  const [band, setBand] = useState<'high' | 'low'>('high')
  const high = band === 'high'
  const x = 150, gy = 280, tb = 190, tt = 150, top = 40
  const live = C.current, dead = C.fill2
  return (
    <>
      <Diagram w={640} h={330}
        title={high ? 'Two-band trap vertical on the high band: the trap is parallel resonant and blocks RF, so only the lower section radiates, as a quarter-wave' : 'Two-band trap vertical on the low band: the trap acts like a loading coil, so RF passes through it and the whole vertical radiates, electrically a quarter-wave but physically shorter'}
        caption="Illustrative two-band trap vertical. Tap the band to see which wire carries current.">
        <rect x={50} y={gy} width={200} height={22} fill={C.fill2} />
        <T x={60} y={gy + 11} size={12} color={C.muted}>ground and radials</T>
        <Ln x1={x} y1={gy} x2={x} y2={tb} color={live} width={6} />
        <Ln x1={x} y1={tt} x2={x} y2={top} color={high ? dead : live} width={6} dash={high ? '5 6' : undefined} />
        <rect x={x - 22} y={tt} width={44} height={tb - tt} rx={8} fill={C.bg} stroke={high ? C.bad : C.power} strokeWidth={3} />
        <T x={x} y={(tt + tb) / 2} anchor="middle" size={13} bold color={high ? C.bad : C.power}>trap</T>
        <circle cx={x} cy={gy} r={6} fill={C.bg} stroke={C.power} strokeWidth={3} />
        <T x={x - 34} y={(gy + tb) / 2} anchor="end" size={13} bold color={C.ink}>lower section</T>
        <T x={x - 34} y={(top + tt) / 2} anchor="end" size={13} bold color={high ? C.muted : C.ink}>upper section</T>
        <T x={x + 34} y={(top + tt) / 2} size={12} color={C.muted}>{high ? 'cut off by the trap' : 'now in use'}</T>

        <T x={300} y={40} size={16} bold color={C.ink}>{high ? 'High band' : 'Low band'}</T>
        <T x={300} y={72} size={14} bold color={high ? C.bad : C.power}>{high ? 'Trap resonant: blocks RF' : 'Trap below resonance: acts as a coil'}</T>
        <T x={300} y={102} size={14} color={C.ink}>{high ? 'Only the lower section radiates.' : 'RF passes through the trap and on up.'}</T>
        <T x={300} y={124} size={14} color={C.ink}>{high ? 'It is a quarter-wave on this band.' : 'The trap adds inductance, so the whole'}</T>
        <T x={300} y={146} size={14} color={C.ink}>{high ? '' : 'vertical is a quarter-wave electrically'}</T>
        <T x={300} y={168} size={14} color={C.ink}>{high ? '' : 'while physically shorter than one.'}</T>
        <T x={300} y={226} size={13} color={C.muted}>The trap costs a little loss, and the</T>
        <T x={300} y={246} size={13} color={C.muted}>antenna is narrower on the low band.</T>
      </Diagram>
      <Controls>
        <Choice label="Band" value={band} onChange={setBand} options={[{ value: 'high', label: 'High band (for example 20 m)' }, { value: 'low', label: 'Low band (for example 40 m)' }]} />
      </Controls>
    </>
  )
}
