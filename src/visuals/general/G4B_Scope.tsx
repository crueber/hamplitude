import { useState } from 'react'
import { C, Choice, Diagram, Ln, T } from '../kit'

type Mode = 'cw' | 'clean' | 'over'

const MODES: Record<Mode, { label: string; verdict: string; good: boolean; note: string }> = {
  cw: { label: 'CW keying', verdict: 'Clean dots with soft edges', good: true, note: 'Look at the shape of each dot: rise, flat top, fall.' },
  clean: { label: 'Two-tone, linear', verdict: 'Pointed peaks: linear amplifier', good: true, note: 'Two tones beat into a smooth envelope that hits zero.' },
  over: { label: 'Two-tone, overdriven', verdict: 'Flat tops: not linear', good: false, note: 'Flat-topped peaks mean the transmitter is clipping.' },
}

/** An oscilloscope shows the RF envelope: keying shape for CW, linearity for SSB two-tone. */
export function Scope() {
  const [mode, setMode] = useState<Mode>('clean')
  const x0 = 60, x1 = 580, cy = 128, A = 70
  const N = 260
  const env = (u: number): number => {
    if (mode === 'cw') {
      // keyed pattern: dash dot dash with rounded edges (u in 0..1)
      const on = (a: number, b: number) => 1 / (1 + Math.exp(-(u - a) * 90)) - 1 / (1 + Math.exp(-(u - b) * 90))
      return on(0.08, 0.42) + on(0.52, 0.64) + on(0.74, 0.94)
    }
    const v = Math.abs(Math.cos(u * Math.PI * 3))
    return mode === 'over' ? Math.min(v, 0.6) / 0.6 : v
  }
  const pts = Array.from({ length: N + 1 }, (_, i) => {
    const u = i / N
    return [x0 + u * (x1 - x0), env(u)] as const
  })
  const top = pts.map(([x, e], i) => `${i ? 'L' : 'M'}${x.toFixed(1)},${(cy - A * e).toFixed(1)}`).join('')
  const bot = [...pts].reverse().map(([x, e]) => `L${x.toFixed(1)},${(cy + A * e).toFixed(1)}`).join('')
  const m = MODES[mode]
  const col = m.good ? C.good : C.bad
  return (
    <>
      <Diagram w={640} h={290} title={`Oscilloscope screen showing the RF envelope of a transmitter: ${m.label}. ${m.verdict}.`}
        caption="The scope's vertical input is a sample of the transmitter's RF output; the horizontal axis is time.">
        <rect x={x0 - 10} y={28} width={x1 - x0 + 20} height={200} rx={12} fill={C.fill} stroke={C.ink} strokeWidth={2} />
        {[1, 2, 3, 4].map((i) => <Ln key={'v' + i} x1={x0 + (i * (x1 - x0)) / 5} y1={34} x2={x0 + (i * (x1 - x0)) / 5} y2={222} color={C.fill2} width={1.5} />)}
        {[1, 2, 3].map((i) => <Ln key={'h' + i} x1={x0 - 4} y1={28 + (i * 200) / 4} x2={x1 + 4} y2={28 + (i * 200) / 4} color={C.fill2} width={1.5} />)}
        <path d={top + bot + 'Z'} fill={col} fillOpacity={0.3} stroke="none" />
        <path d={top} fill="none" stroke={col} strokeWidth={2.5} strokeLinejoin="round" />
        <path d={bot.replace('L', 'M')} fill="none" stroke={col} strokeWidth={2.5} strokeLinejoin="round" />
        <T x={x0} y={248} size={12} color={C.muted}>time →</T>
        <T x={x1} y={248} anchor="end" size={12} color={C.muted}>vertical: RF amplitude</T>
        <T x={320} y={274} anchor="middle" bold size={14} color={col}>{m.verdict}</T>
      </Diagram>
      <div style={{ margin: '-6px 0 14px' }}>
        <Choice label="Test" value={mode} onChange={setMode} options={(Object.keys(MODES) as Mode[]).map((k) => ({ value: k, label: MODES[k].label }))} />
      </div>
    </>
  )
}
