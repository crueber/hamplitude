import { useState } from 'react'
import { C, Choice, Diagram, Ln, T, TAU } from '../kit'

type Cls = 'A' | 'AB' | 'B' | 'C'
const INFO: Record<Cls, { bias: number; cond: string; eff: number; lin: string; use: string }> = {
  A: { bias: 1.25, cond: '100% (360°)', eff: 1, lin: 'most linear', use: 'always on, wastes the most as heat' },
  AB: { bias: 0.5, cond: 'over 50%, under 100%', eff: 2, lin: 'linear enough for SSB', use: 'a bit of idle current' },
  B: { bias: 0, cond: '50% (180°)', eff: 3, lin: 'linear only in push-pull pairs', use: 'one half-cycle each' },
  C: { bias: -0.5, cond: 'under 50%', eff: 4, lin: 'not linear', use: 'short pulses, most efficient' },
}

const S = 46, Y0 = 164 // px per unit, y of the zero-current (cutoff) line
const PW = 270, N = 160
const yv = (v: number) => Y0 - v * S

/** Bias moves the drive signal up or down against the cutoff line; where it is above cutoff, the device conducts. */
export function AmpClasses() {
  const [cls, setCls] = useState<Cls>('B')
  const { bias, cond, eff, lin, use } = INFO[cls]
  const pts = (x0: number) => Array.from({ length: N + 1 }, (_, i) => ({ x: x0 + (PW * i) / N, v: bias + Math.sin((TAU * 2 * i) / N) }))
  const L = pts(24), R = pts(346)
  // split input curve into conducting/non-conducting runs
  const runs = (a: { x: number; v: number }[], on: boolean) => {
    const out: string[] = []
    let cur: string[] = []
    a.forEach((p, i) => {
      const isOn = p.v >= 0
      if (isOn === on) cur.push(`${cur.length ? 'L' : 'M'}${p.x.toFixed(1)},${yv(p.v).toFixed(1)}`)
      else if (cur.length) { out.push(cur.join('')); cur = [] }
      if (i === a.length - 1 && cur.length) out.push(cur.join(''))
    })
    return out
  }
  const outLine = R.map((p, i) => `${i ? 'L' : 'M'}${p.x.toFixed(1)},${yv(Math.max(0, p.v)).toFixed(1)}`).join('')
  const outFill = `${outLine}L${R[N].x},${Y0}L${R[0].x},${Y0}Z`
  const pip = (n: number, x: number, y: number, col: string) =>
    [1, 2, 3, 4].map((k) => <rect key={k} x={x + (k - 1) * 22} y={y - 7} width={18} height={14} rx={3} fill={k <= n ? col : C.fill2} />)
  return (
    <>
      <Diagram w={640} h={404} title={`Class ${cls} amplifier. The drive signal sits ${bias > 0 ? 'above' : bias === 0 ? 'on' : 'below'} the cutoff line, so the device conducts for ${cond} of the cycle. Efficiency rank ${eff} of 4, ${lin}.`}
        caption="Bias slides the signal against cutoff. The device only conducts while the signal is above the line.">
        <T x={24} y={16} bold size={14}>Drive signal at the device input</T>
        <T x={346} y={16} bold size={14}>Output current</T>
        {[24, 346].map((x0) => <Ln key={x0} x1={x0} y1={Y0} x2={x0 + PW} y2={Y0} color={C.bad} width={2} dash="6 5" />)}
        <Ln x1={24} y1={36} x2={54} y2={36} color={C.bad} width={2} dash="6 5" /><T x={60} y={36} size={12} bold color={C.bad}>cutoff: no current below this line</T>
        {runs(L, false).map((d, i) => <path key={`n${i}`} d={d} fill="none" stroke={C.muted} strokeWidth={2} strokeDasharray="4 4" />)}
        {runs(L, true).map((d, i) => <path key={`o${i}`} d={d} fill="none" stroke={C.signal} strokeWidth={3} strokeLinejoin="round" />)}
        <path d={outFill} fill={C.current} opacity={0.22} />
        <path d={outLine} fill="none" stroke={C.current} strokeWidth={3} strokeLinejoin="round" />
        <line x1={346} y1={yv(2.4)} x2={346} y2={Y0 + 4} stroke={C.fill2} strokeWidth={2} />

        <rect x={24} y={252} width={592} height={140} rx={10} fill={C.fill} />
        <T x={42} y={276} size={13} color={C.muted}>Conducts for</T>
        <T x={150} y={276} size={14} bold color={C.current}>{cond} of the cycle</T>
        <T x={42} y={304} size={13} color={C.muted}>Efficiency</T>
        {pip(eff, 150, 304, C.good)}
        <T x={246} y={304} size={12} color={C.muted}>low → high</T>
        <T x={42} y={332} size={13} color={C.muted}>Linearity</T>
        {pip(5 - eff, 150, 332, C.signal)}
        <T x={246} y={332} size={13} bold>{lin}</T>
        <T x={42} y={362} size={13} color={C.muted}>{use}</T>
      </Diagram>
      <Choice label="Amplifier class" value={cls} onChange={setCls}
        options={[{ value: 'A', label: 'Class A' }, { value: 'AB', label: 'Class AB' }, { value: 'B', label: 'Class B' }, { value: 'C', label: 'Class C' }]} />
    </>
  )
}
