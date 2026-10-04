import { useState } from 'react'
import { C, Choice, Controls, Diagram, Ln, T } from '../kit'

type Gate = 'NOT' | 'AND' | 'OR' | 'NAND' | 'NOR' | 'XOR' | 'XNOR'
const GATES: Gate[] = ['NOT', 'AND', 'OR', 'NAND', 'NOR', 'XOR', 'XNOR']
const FN: Record<Gate, (a: number, b: number) => number> = {
  NOT: (a) => 1 - a,
  AND: (a, b) => a & b,
  OR: (a, b) => a | b,
  NAND: (a, b) => 1 - (a & b),
  NOR: (a, b) => 1 - (a | b),
  XOR: (a, b) => a ^ b,
  XNOR: (a, b) => 1 - (a ^ b),
}
const RULE: Record<Gate, string> = {
  NOT: 'Output is the opposite of the input',
  AND: 'High only when both inputs are high',
  OR: 'High when either or both inputs are high',
  NAND: 'Low only when both inputs are high',
  NOR: 'Low when either or both inputs are high',
  XOR: 'High when the inputs differ',
  XNOR: 'High when the inputs match',
}

/** All seven basic gates with their standard symbols: pick one, set the inputs, read the output and the truth table. */
export function LogicGates_Explorer() {
  const [gate, setGate] = useState<Gate>('AND')
  const [a, setA] = useState<0 | 1>(1)
  const [b, setB] = useState<0 | 1>(0)
  const one = gate === 'NOT'
  const q = FN[gate](a, b)
  const inv = gate === 'NAND' || gate === 'NOR' || gate === 'XNOR' || gate === 'NOT'
  const orShape = gate === 'OR' || gate === 'NOR' || gate === 'XOR' || gate === 'XNOR'
  const xor = gate === 'XOR' || gate === 'XNOR'
  const lvl = (v: number) => (v ? C.good : C.muted)
  const andBody = 'M100,80 L140,80 A40,40 0 0 1 140,160 L100,160 Z'
  const orBody = 'M104,80 Q139,80 179,120 Q139,160 104,160 Q129,120 104,80 Z'
  const notBody = 'M100,92 L100,148 L158,120 Z'
  const body = one ? notBody : orShape ? orBody : andBody
  const xo = one ? 158 : orShape ? 179 : 180
  const rows = one ? [[0], [1]] : [[0, 0], [0, 1], [1, 0], [1, 1]]
  const inX = one ? 100 : xor ? 100 : orShape ? 110 : 100
  return (
    <>
      <Diagram w={640} h={250} title={`${gate} gate with input A = ${a}${one ? '' : `, input B = ${b}`}; output ${q}. ${RULE[gate]}.`}
        caption={RULE[gate] + '. 1 = high voltage, 0 = low voltage.'}>
        <g transform="translate(30,0)">
          {one ? (
            <Ln x1={30} y1={120} x2={inX} y2={120} color={lvl(a)} width={3} />
          ) : (
            <>
              <Ln x1={30} y1={100} x2={inX + (orShape ? 0 : 0)} y2={100} color={lvl(a)} width={3} />
              <Ln x1={30} y1={140} x2={inX} y2={140} color={lvl(b)} width={3} />
            </>
          )}
          <T x={22} y={one ? 120 : 100} anchor="end" bold size={15} color={lvl(a)}>A={a}</T>
          {!one && <T x={22} y={140} anchor="end" bold size={15} color={lvl(b)}>B={b}</T>}
          <path d={body} fill={C.fill} stroke={C.ink} strokeWidth={2.4} strokeLinejoin="round" />
          {xor && <path d="M94,80 Q119,120 94,160" fill="none" stroke={C.ink} strokeWidth={2.4} />}
          {inv && <circle cx={xo + 6} cy={120} r={6} fill={C.bg} stroke={C.ink} strokeWidth={2.4} />}
          <Ln x1={xo + (inv ? 12 : 0)} y1={120} x2={250} y2={120} color={lvl(q)} width={3} />
          <circle cx={262} cy={120} r={13} fill={q ? C.good : C.fill2} />
          <T x={262} y={120} anchor="middle" bold size={15} color={q ? C.bg : C.muted}>{q}</T>
          <T x={140} y={192} anchor="middle" bold size={16}>{gate}</T>
        </g>
        <g transform="translate(350,40)">
          <T x={120} y={0} anchor="middle" size={13} bold color={C.muted}>Truth table</T>
          {(one ? ['A', 'OUT'] : ['A', 'B', 'OUT']).map((h, i) => <T key={h} x={(one ? 70 : 30) + i * 70} y={26} anchor="middle" bold size={14} color={C.muted}>{h}</T>)}
          {rows.map((r, ri) => {
            const o = FN[gate](r[0], r[1] ?? 0)
            const on = r[0] === a && (one || r[1] === b)
            return (
              <g key={ri}>
                <rect x={0} y={42 + ri * 34} width={240} height={30} rx={7} fill={on ? C.signal : C.fill} opacity={on ? 0.25 : 1} stroke={on ? C.signal : 'none'} strokeWidth={2} />
                {r.map((v, ci) => <T key={ci} x={(one ? 70 : 30) + ci * 70} y={57 + ri * 34} anchor="middle" mono bold size={15} color={C.ink}>{v}</T>)}
                <T x={(one ? 70 : 30) + r.length * 70} y={57 + ri * 34} anchor="middle" mono bold size={15} color={o ? C.good : C.muted}>{o}</T>
              </g>
            )
          })}
        </g>
      </Diagram>
      <Controls>
        <Choice label="Gate" value={gate} onChange={setGate} options={GATES.map((g) => ({ value: g, label: g }))} />
        <Choice label="Input A" value={a} onChange={setA} options={[{ value: 0, label: 'A = 0' }, { value: 1, label: 'A = 1' }]} />
        {!one && <Choice label="Input B" value={b} onChange={setB} options={[{ value: 0, label: 'B = 0' }, { value: 1, label: 'B = 1' }]} />}
      </Controls>
    </>
  )
}
