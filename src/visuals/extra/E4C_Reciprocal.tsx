import { useState } from 'react'
import { C, Choice, Diagram, Ln, T } from '../kit'

/** Phase noise on the local oscillator mixes with a strong nearby signal and lands on the wanted signal. */
export function Reciprocal() {
  const [noisy, setNoisy] = useState(true)
  const base = 110, base2 = 262
  const sk = noisy ? 34 : 6
  const pedestal = noisy ? 84 : 4
  const buried = noisy
  const p = pedestal, b2 = base2
  const ped = `M240,${b2} L300,${b2 - 0.35 * p} L360,${b2 - 0.62 * p} L440,${b2 - 0.86 * p} L520,${b2 - p} L580,${b2 - 0.88 * p} L620,${b2 - 0.8 * p} L620,${b2} Z`
  const spike = (x: number, h: number, col: string, b: number, w = 6) => <path d={`M${x - w},${b} L${x},${b - h} L${x + w},${b}`} fill={col} fillOpacity={0.3} stroke={col} strokeWidth={3} strokeLinejoin="round" />
  const skirt = (x: number, h: number, b: number) => `M${x - 150},${b} C${x - 70},${b} ${x - 50},${b - h} ${x - 14},${b - h - 10} L${x},${b - 80} L${x + 14},${b - h - 10} C${x + 50},${b - h} ${x + 70},${b} ${x + 150},${b}`
  return (
    <>
      <Diagram w={640} h={322} title={`Reciprocal mixing. Top: the receiver's oscillator with ${noisy ? 'large' : 'small'} phase-noise skirts. Bottom: after mixing, a strong neighbor drags that noise across the wanted signal, which is ${buried ? 'buried' : 'still readable'}.`}
        caption="Reciprocal mixing: oscillator phase noise mixes with a strong adjacent signal and makes noise right where you are listening.">
        <T x={20} y={16} size={13} bold color={C.resist}>1. Oscillator in the receiver</T>
        <path d={skirt(200, sk, base)} fill={C.resist} fillOpacity={0.18} stroke={C.resist} strokeWidth={2.5} />
        <Ln x1={20} y1={base} x2={400} y2={base} color={C.ink} width={2} />
        <T x={200} y={base + 14} anchor="middle" size={12} color={C.muted}>one frequency, plus noise skirts</T>
        <T x={430} y={60} size={13} bold color={C.resist}>{noisy ? 'Noisy skirts' : 'Clean skirts'}</T>
        <T x={430} y={80} size={12} color={C.muted}>{noisy ? 'poor phase noise' : 'low phase noise'}</T>
        <T x={20} y={152} size={13} bold color={C.signal}>2. What the receiver ends up hearing</T>
        <path d={ped} fill={C.bad} fillOpacity={0.22} stroke={C.bad} strokeWidth={2} />
        <Ln x1={20} y1={base2} x2={620} y2={base2} color={C.ink} width={2} />
        {spike(330, 40, C.signal, base2)}
        {spike(520, 80, C.bad, base2, 8)}
        <T x={330} y={base2 + 16} anchor="middle" size={13} bold color={C.signal}>wanted (weak)</T>
        <T x={520} y={base2 + 16} anchor="middle" size={13} bold color={C.bad}>strong neighbor</T>
        {noisy && <T x={505} y={base2 - 20} anchor="end" size={12} bold color={C.bad}>noise skirt copied here</T>}
        <T x={620} y={152} anchor="end" size={14} bold color={buried ? C.bad : C.good}>{buried ? 'wanted signal sinks into the noise' : 'wanted signal still stands out'}</T>
      </Diagram>
      <div style={{ margin: '-6px 0 14px' }}>
        <Choice label="Oscillator" value={noisy ? 'noisy' : 'clean'} onChange={(v) => setNoisy(v === 'noisy')} options={[{ value: 'noisy', label: 'Poor phase noise' }, { value: 'clean', label: 'Low phase noise' }]} />
      </div>
    </>
  )
}
