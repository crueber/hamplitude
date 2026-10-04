import { useState } from 'react'
import { C, Choice, Diagram, T } from '../kit'

type G = 'and' | 'nand' | 'or' | 'nor' | 'xor' | 'not'
const FN: Record<G, (a: number, b: number) => number> = {
  and: (a, b) => a & b, nand: (a, b) => 1 - (a & b), or: (a, b) => a | b, nor: (a, b) => 1 - (a | b), xor: (a, b) => a ^ b, not: (a) => 1 - a,
}
const FIG: Record<G, string> = { and: 'Exam figure E6-3 symbol 1', nand: 'Exam figure E6-3 symbol 2', or: 'Exam figure E6-3 symbol 3', nor: 'Exam figure E6-3 symbol 4', xor: 'XOR is not in the figure', not: 'Exam figure E6-3 symbol 5' }
const WORDS: Record<G, string> = {
  and: 'output 1 only when A and B are both 1',
  nand: 'AND, then inverted: 0 only when both are 1',
  or: 'output 1 when A or B (or both) is 1',
  nor: 'OR, then inverted: 1 only when both are 0',
  xor: 'output 1 when the inputs differ',
  not: 'inverts: output is the opposite of A',
}

const S = { stroke: C.ink, strokeWidth: 3, fill: C.fill, strokeLinejoin: 'round', strokeLinecap: 'round' } as const

const tipOf = (g: G) => (g === 'not' ? 14 : g === 'and' || g === 'nand' ? 24 : 28) + (g === 'nand' || g === 'nor' || g === 'not' ? 8 : 0)

/** Gate body centred on (0,0): inputs at y=±12 (x=-44), output at (50,0). `bubble` adds an inversion bubble. */
function Body({ g }: { g: G }) {
  const inv = g === 'nand' || g === 'nor' || g === 'not'
  const orLike = g === 'or' || g === 'nor' || g === 'xor'
  const tip = g === 'not' ? 14 : g === 'and' || g === 'nand' ? 24 : 28
  return (
    <g {...S}>
      {g === 'and' || g === 'nand' ? <path d="M-20,-24 H0 A24,24 0 0 1 0,24 H-20 Z" /> : null}
      {orLike ? <path d="M-20,-24 Q12,-24 28,0 Q12,24 -20,24 Q-6,0 -20,-24 Z" /> : null}
      {g === 'xor' ? <path d="M-28,-24 Q-14,0 -28,24" fill="none" /> : null}
      {g === 'not' ? <polygon points="-14,-16 -14,16 14,0" /> : null}
      {inv && <circle cx={tip + 4} cy={0} r={4} />}
      <line x1={tip + (inv ? 8 : 0)} y1={0} x2={50} y2={0} fill="none" />
    </g>
  )
}

export function GateExplorer() {
  const [g, setG] = useState<G>('nand')
  const [a, setA] = useState(0)
  const [b, setB] = useState(0)
  const one = g === 'not'
  const q = FN[g](a, one ? 0 : b)
  const rows = one ? [[0], [1]] : [[0, 0], [0, 1], [1, 0], [1, 1]]
  const orLike = g === 'or' || g === 'nor' || g === 'xor'
  const inX = g === 'xor' ? -23 : orLike ? -15 : -20
  const col = (v: number) => (v ? C.voltage : C.muted)
  const sc = 2.3
  return (
    <>
      <Diagram w={640} h={250}
        title={`A ${g.toUpperCase()} gate with input A ${a}${one ? '' : ` and input B ${b}`} gives output ${q}.`}
        caption={`${WORDS[g]}.`}>
        <g transform={`translate(190,118) scale(${sc})`}>
          <Body g={g} />
          {one ? (
            <line x1={-44} y1={0} x2={-14} y2={0} stroke={col(a)} strokeWidth={3} />
          ) : (
            <>
              <line x1={-44} y1={-12} x2={inX} y2={-12} stroke={col(a)} strokeWidth={3} />
              <line x1={-44} y1={12} x2={inX} y2={12} stroke={col(b)} strokeWidth={3} />
            </>
          )}
          <line x1={tipOf(g)} y1={0} x2={50} y2={0} stroke={col(q)} strokeWidth={3} />
        </g>
        <T x={74} y={one ? 118 : 90} anchor="end" bold size={15} color={col(a)}>A = {a}</T>
        {!one && <T x={74} y={146} anchor="end" bold size={15} color={col(b)}>B = {b}</T>}
        <T x={318} y={118} bold size={15} color={col(q)}>Q = {q}</T>
        <T x={190} y={30} anchor="middle" bold size={16}>{g.toUpperCase()}</T>
        <T x={190} y={226} anchor="middle" size={12} color={C.muted}>{FIG[g]}</T>

        <T x={500} y={30} anchor="middle" bold size={14}>Truth table</T>
        <T x={430} y={56} anchor="middle" bold size={13} color={C.muted}>A</T>
        {!one && <T x={470} y={56} anchor="middle" bold size={13} color={C.muted}>B</T>}
        <T x={560} y={56} anchor="middle" bold size={13} color={C.muted}>Q</T>
        {rows.map((r, i) => {
          const y = 84 + i * 32
          const hit = r[0] === a && (one || r[1] === b)
          return (
            <g key={i}>
              {hit && <rect x={410} y={y - 14} width={180} height={28} rx={6} fill={C.signal} opacity={0.2} />}
              <T x={430} y={y} anchor="middle" size={15} mono bold={hit}>{r[0]}</T>
              {!one && <T x={470} y={y} anchor="middle" size={15} mono bold={hit}>{r[1]}</T>}
              <T x={560} y={y} anchor="middle" size={15} mono bold color={hit ? col(FN[g](r[0], r[1] ?? 0)) : C.ink}>{FN[g](r[0], r[1] ?? 0)}</T>
            </g>
          )
        })}
      </Diagram>
      <Choice label="Gate" value={g} onChange={setG} options={(['and', 'nand', 'or', 'nor', 'xor', 'not'] as G[]).map((x) => ({ value: x, label: x.toUpperCase() }))} />
      <Choice label="Input A" value={a} onChange={setA} options={[{ value: 0, label: 'A = 0' }, { value: 1, label: 'A = 1' }]} />
      {!one && <Choice label="Input B" value={b} onChange={setB} options={[{ value: 0, label: 'B = 0' }, { value: 1, label: 'B = 1' }]} />}
    </>
  )
}
