import { useState } from 'react'
import { C, Choice, Diagram, Ln, T } from '../kit'

type P = 'S11' | 'S21' | 'S12' | 'S22'
const INFO: Record<P, { what: string; sub: string }> = {
  S11: { what: 'input reflection', sub: 'port 1 in, measured at port 1: input return loss (reflection coefficient, like VSWR)' },
  S21: { what: 'forward gain', sub: 'port 1 in, measured at port 2: gain through the device' },
  S12: { what: 'reverse transmission', sub: 'port 2 in, measured at port 1: what leaks backwards' },
  S22: { what: 'output reflection', sub: 'port 2 in, measured at port 2: output return loss' },
}
const IN: Record<P, number> = { S11: 1, S21: 1, S12: 2, S22: 2 }
const OUT: Record<P, number> = { S11: 1, S21: 2, S12: 1, S22: 2 }

/** S-parameter subscripts name the ports: measured at port (first digit), signal applied at port (second). */
export function SParams() {
  const [p, setP] = useState<P>('S21')
  // lane y: port1 in 88 -> , port1 out 124 <- ; port2 in 124 <- , port2 out 88 ->
  const lane = (port: number, kind: 'in' | 'out') => {
    const act = kind === 'in' ? IN[p] === port : OUT[p] === port
    const col = act ? (kind === 'in' ? C.voltage : C.current) : C.fill2
    const w = act ? 4 : 2
    if (port === 1) return kind === 'in'
      ? <Ln key="1i" x1={50} y1={88} x2={214} y2={88} color={col} width={w} arrow={act} />
      : <Ln key="1o" x1={214} y1={124} x2={50} y2={124} color={col} width={w} arrow={act} />
    return kind === 'in'
      ? <Ln key="2i" x1={590} y1={124} x2={426} y2={124} color={col} width={w} arrow={act} />
      : <Ln key="2o" x1={426} y1={88} x2={590} y2={88} color={col} width={w} arrow={act} />
  }
  return (
    <>
      <Diagram w={640} h={236} title={`S parameter ${p}: ${INFO[p].what}. ${INFO[p].sub}.`}
        caption="The two digits are ports. Read S21 as: signal in at port 1, measured at port 2.">
        <rect x={218} y={56} width={204} height={100} rx={12} fill={C.fill} stroke={C.ink} strokeWidth={2.5} />
        <T x={320} y={96} anchor="middle" bold size={15}>Device under test</T>
        <T x={320} y={120} anchor="middle" size={13} color={C.muted}>filter, amplifier, antenna…</T>
        <T x={50} y={44} size={14} bold>Port 1</T>
        <T x={590} y={44} anchor="end" size={14} bold>Port 2</T>
        {lane(1, 'in')}{lane(1, 'out')}{lane(2, 'in')}{lane(2, 'out')}
        <T x={50} y={176} size={12} color={C.voltage} bold>signal applied</T>
        <T x={590} y={176} anchor="end" size={12} color={C.current} bold>signal measured</T>
        <T x={320} y={196} anchor="middle" bold size={20} mono color={C.power}>{p} = {INFO[p].what}</T>
        <T x={320} y={220} anchor="middle" size={12} color={C.muted}>{INFO[p].sub}</T>
      </Diagram>
      <div style={{ margin: '-6px 0 14px' }}>
        <Choice label="S parameter" value={p} onChange={setP} options={(['S11', 'S21', 'S12', 'S22'] as P[]).map((v) => ({ value: v, label: v }))} />
      </div>
    </>
  )
}
