import { useState } from 'react'
import { C, Choice, Controls, Diagram, Ln, T } from '../kit'

type Gate = 'AND' | 'OR' | 'NAND' | 'NOR'
const FN: Record<Gate, (a: number, b: number) => number> = {
  AND: (a, b) => a & b,
  OR: (a, b) => a | b,
  NAND: (a, b) => 1 - (a & b),
  NOR: (a, b) => 1 - (a | b),
}
const RULE: Record<Gate, string> = {
  AND: 'High only when both inputs are high',
  OR: 'High when either or both inputs are high',
  NAND: 'Low only when both inputs are high',
  NOR: 'Low when either or both inputs are high',
}

/** Toggle the inputs, pick a gate, watch the output and the truth table. */
export function GateExplorer() {
  const [gate, setGate] = useState<Gate>('AND')
  const [a, setA] = useState<0 | 1>(1)
  const [b, setB] = useState<0 | 1>(1)
  const q = FN[gate](a, b)
  const inv = gate === 'NAND' || gate === 'NOR'
  const orShape = gate === 'OR' || gate === 'NOR'
  const lvl = (v: number) => (v ? C.good : C.muted)
  const body = orShape ? 'M100,80 Q135,80 175,120 Q135,160 100,160 Q125,120 100,80 Z' : 'M100,80 L140,80 A40,40 0 0 1 140,160 L100,160 Z'
  const xo = orShape ? 175 : 180
  return (
    <>
      <Diagram w={640} h={250} title={`${gate} gate with input A ${a}, input B ${b}, output ${q}. ${RULE[gate]}.`}
        caption={RULE[gate] + '.'}>
        <g transform="translate(40,0)">
        <Ln x1={30} y1={100} x2={orShape ? 108 : 100} y2={100} color={lvl(a)} width={3} />
        <Ln x1={30} y1={140} x2={orShape ? 108 : 100} y2={140} color={lvl(b)} width={3} />
        <T x={22} y={100} anchor="end" bold size={15} color={lvl(a)}>A={a}</T>
        <T x={22} y={140} anchor="end" bold size={15} color={lvl(b)}>B={b}</T>
        <path d={body} fill={C.fill} stroke={C.ink} strokeWidth={2.4} strokeLinejoin="round" />
        {inv && <circle cx={xo + 6} cy={120} r={6} fill={C.bg} stroke={C.ink} strokeWidth={2.4} />}
        <Ln x1={xo + (inv ? 12 : 0)} y1={120} x2={250} y2={120} color={lvl(q)} width={3} />
        <circle cx={262} cy={120} r={13} fill={q ? C.good : C.fill2} />
        <T x={262} y={120} anchor="middle" bold size={15} color={q ? C.bg : C.muted}>{q}</T>
        <T x={140} y={186} anchor="middle" bold size={16}>{gate}</T>
        </g>
        <T x={170} y={40} anchor="middle" size={13} color={C.muted}>1 = high, 0 = low</T>

        <g transform="translate(340,50)">
          {['A', 'B', 'OUT'].map((h, i) => <T key={h} x={30 + i * 70} y={12} anchor="middle" bold size={14} color={C.muted}>{h}</T>)}
          {[[0, 0], [0, 1], [1, 0], [1, 1]].map(([x, y], r) => {
            const o = FN[gate](x, y)
            const cur = x === a && y === b
            return (
              <g key={r}>
                <rect x={0} y={30 + r * 36} width={240} height={32} rx={6} fill={cur ? C.fill2 : C.fill} stroke={cur ? C.signal : 'none'} strokeWidth={2} />
                {[x, y, o].map((v, i) => <T key={i} x={30 + i * 70} y={46 + r * 36} anchor="middle" bold={i === 2} size={15} color={i === 2 ? lvl(v) : C.ink}>{v}</T>)}
              </g>
            )
          })}
        </g>
      </Diagram>
      <Controls>
        <Choice label="Gate type" value={gate} onChange={setGate} options={(['AND', 'OR', 'NAND', 'NOR'] as Gate[]).map((g) => ({ value: g, label: g }))} />
        <Choice label="Input A" value={a} onChange={setA} options={[{ value: 0, label: 'A = 0' }, { value: 1, label: 'A = 1' }]} />
        <Choice label="Input B" value={b} onChange={setB} options={[{ value: 0, label: 'B = 0' }, { value: 1, label: 'B = 1' }]} />
      </Controls>
    </>
  )
}
