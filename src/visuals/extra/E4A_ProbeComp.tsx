import { useState } from 'react'
import { C, Choice, Diagram, T } from '../kit'

type Mode = 'under' | 'ok' | 'over'
const LABEL: Record<Mode, string> = {
  under: 'Under-compensated: rounded corners',
  ok: 'Compensated: flat tops',
  over: 'Over-compensated: overshoot spikes',
}
function wave(mode: Mode, x0: number, x1: number, cy: number, amp: number) {
  const half = 7, per = (x1 - x0) / half, d: string[] = []
  let prev = -1
  for (let h = 0; h < half; h++) {
    const target = h % 2 === 0 ? 1 : -1
    const n = 24
    for (let i = 0; i <= n; i++) {
      const t = i / n, tt = (t * per) / 22
      let v = target
      if (mode === 'under') v = target + (prev - target) * Math.exp(-tt * 2.2)
      if (mode === 'over') v = target + (target - prev) * 0.32 * Math.exp(-tt * 2.2)
      const x = x0 + h * per + t * per
      d.push(`${d.length ? 'L' : 'M'}${x.toFixed(1)},${(cy - amp * v).toFixed(1)}`)
    }
    prev = target
  }
  return d.join('')
}

/** Compensating a scope probe: view a square wave and trim for flat tops. */
export function ProbeComp() {
  const [m, setM] = useState<Mode>('under')
  const good = m === 'ok'
  return (
    <>
      <Diagram w={640} h={220} title={`Probe compensation on a scope: ${LABEL[m]}. Adjust the probe trimmer until the horizontal parts of the square wave are as flat as possible.`}
        caption="Adjust the probe's trimmer until the flat parts of the square wave are as flat as possible.">
        <rect x={20} y={20} width={600} height={140} rx={8} fill={C.fill} />
        {[1, 2, 3].map((i) => <line key={i} x1={20} x2={620} y1={20 + i * 35} y2={20 + i * 35} stroke={C.fill2} strokeWidth={1} />)}
        <path d={wave(m, 40, 600, 90, 42)} fill="none" stroke={good ? C.good : C.bad} strokeWidth={3} strokeLinejoin="round" />
        <T x={320} y={190} anchor="middle" bold size={15} color={good ? C.good : C.bad}>{LABEL[m]}</T>
        <T x={320} y={208} anchor="middle" size={12} color={C.muted}>test: probe on the scope's square-wave calibrator output</T>
      </Diagram>
      <div style={{ margin: '-6px 0 14px' }}>
        <Choice label="Trimmer" value={m} onChange={setM} options={[{ value: 'under', label: 'Trimmer low' }, { value: 'ok', label: 'Trimmer set' }, { value: 'over', label: 'Trimmer high' }]} />
      </div>
    </>
  )
}
