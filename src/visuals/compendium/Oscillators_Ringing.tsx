import { useState } from 'react'
import { C, Choice, Controls, Diagram, Ln, Readout, Slider, T, TAU, fmt } from '../kit'

const CYCLES = 30

/** A tank circuit rings and dies away through its losses; feedback from an amplifier replaces what is lost. */
export function Oscillators_Ringing() {
  const [q, setQ] = useState(20)
  const [amp, setAmp] = useState<'off' | 'on'>('off')
  const x0 = 40, x1 = 600, cy = 126, A = 70
  const decay = (n: number) => (amp === 'on' ? 1 : Math.exp((-Math.PI * n) / q))
  const pts: string[] = []
  const per = 16
  for (let k = 0; k <= CYCLES * per; k++) {
    const n = k / per
    const x = x0 + ((x1 - x0) * n) / CYCLES
    pts.push(`${x.toFixed(1)},${(cy - A * decay(n) * Math.sin(TAU * n)).toFixed(1)}`)
  }
  const env = (sign: number) =>
    Array.from({ length: 61 }, (_, k) => {
      const n = (k / 60) * CYCLES
      return `${(x0 + ((x1 - x0) * n) / CYCLES).toFixed(1)},${(cy - sign * A * decay(n)).toFixed(1)}`
    }).join(' ')
  const tenth = (Math.log(10) * q) / Math.PI
  return (
    <>
      <Diagram w={640} h={290}
        title={`An LC tank circuit with a Q of ${q}, ${amp === 'on' ? 'with an amplifier feeding back just enough energy to replace the losses, so the oscillation continues at constant size' : 'with no amplifier, so the ringing dies away and falls to a tenth of its size after ' + fmt(tenth, 3) + ' cycles'}.`}
        caption="Voltage across the tank, kicked once at the start. Q sets how many cycles the ringing lasts.">
        <Ln x1={x0} y1={cy} x2={x1} y2={cy} color={C.muted} width={1.5} />
        <polyline points={env(1)} fill="none" stroke={C.muted} strokeWidth={1.5} strokeDasharray="5 4" />
        <polyline points={env(-1)} fill="none" stroke={C.muted} strokeWidth={1.5} strokeDasharray="5 4" />
        <polyline points={pts.join(' ')} fill="none" stroke={C.signal} strokeWidth={2.6} strokeLinejoin="round" />
        <T x={x0} y={22} size={14} bold color={C.signal}>Tank voltage</T>
        <T x={x0} y={cy + A + 22} size={12} color={C.muted}>one kick at the start</T>
        <T x={x1} y={cy + A + 22} anchor="end" size={12} color={C.muted}>{`time: ${CYCLES} cycles`}</T>
        <T x={320} y={236} anchor="middle" size={15} bold color={amp === 'on' ? C.good : C.ink}>
          {amp === 'on' ? 'Amplifier replaces each cycle’s loss: steady oscillation' : 'Losses (resistance) drain the energy: the ringing decays'}
        </T>
        <T x={320} y={258} anchor="middle" size={13} color={C.muted}>
          {amp === 'on' ? 'Loop gain is exactly enough to cancel the loss. The tank still picks the frequency.' : 'A higher Q means smaller losses per cycle, so it rings for longer.'}
        </T>
      </Diagram>
      <Controls>
        <Choice label="Amplifier" value={amp} options={[{ value: 'off', label: 'No amplifier' }, { value: 'on', label: 'With feedback' }]} onChange={setAmp} />
        <Slider label="Tank Q" value={q} min={5} max={60} onChange={setQ} format={(v) => `${v}`} color={C.signal} />
        <Readout label="Cycles to fall to 10%" value={amp === 'on' ? 'never' : fmt(tenth, 3)} color={C.signal} />
      </Controls>
    </>
  )
}
