import { useState } from 'react'
import { C, Choice, Diagram, Ln, T } from '../kit'

type G = { name: string; rule: [string, string]; f: (a: number, b: number) => number }
const GATES: G[] = [
  { name: 'AND', rule: ['1 only if','all are 1'], f: (a: number, b: number) => a & b },
  { name: 'OR', rule: ['1 if any','input is 1'], f: (a: number, b: number) => a | b },
  { name: 'NAND', rule: ['0 only if','all are 1'], f: (a: number, b: number) => 1 - (a & b) },
  { name: 'NOR', rule: ['1 only if','all are 0'], f: (a: number, b: number) => 1 - (a | b) },
  { name: 'XOR', rule: ['1 if inputs','differ'], f: (a: number, b: number) => a ^ b },
  { name: 'XNOR', rule: ['1 if inputs','match'], f: (a: number, b: number) => 1 - (a ^ b) },
]

/** Truth table for every two-input gate; the chosen input row lights up. */
export function Gates() {
  const [a, setA] = useState(1)
  const [b, setB] = useState(0)
  const x0 = 120, cw = 82, y0 = 90, rh = 36
  const rows = [[0, 0], [0, 1], [1, 0], [1, 1]]
  return (
    <>
      <Diagram w={640} h={285} title={`Truth table of AND, OR, NAND, NOR, XOR and XNOR gates. With A = ${a} and B = ${b} the outputs are ${GATES.map((g) => `${g.name} ${g.f(a, b)}`).join(', ')}.`}
        caption="A truth table lists every input combination and the output it gives. Pick A and B to light a row.">
        <T x={22} y={y0 - 20} size={13} bold color={C.muted}>A</T>
        <T x={62} y={y0 - 20} size={13} bold color={C.muted}>B</T>
        {GATES.map((g, i) => (
          <g key={g.name}>
            <T x={x0 + i * cw + cw / 2} y={y0 - 52} anchor="middle" bold size={15}>{g.name}</T>
            <T x={x0 + i * cw + cw / 2} y={y0 - 26} anchor="middle" size={12} color={C.muted}>{g.rule[0]}</T>
            <T x={x0 + i * cw + cw / 2} y={y0 - 11} anchor="middle" size={12} color={C.muted}>{g.rule[1]}</T>
          </g>
        ))}
        {rows.map(([ra, rb], r) => {
          const y = y0 + r * rh
          const on = ra === a && rb === b
          return (
            <g key={r}>
              <rect x={10} y={y} width={620} height={rh - 4} rx={8} fill={on ? C.signal : C.fill} opacity={on ? 0.2 : 1} stroke={on ? C.signal : 'none'} strokeWidth={2} />
              <T x={26} y={y + rh / 2 - 2} bold size={15} mono>{ra}</T>
              <T x={66} y={y + rh / 2 - 2} bold size={15} mono>{rb}</T>
              {GATES.map((g, i) => {
                const v = g.f(ra, rb)
                return <T key={g.name} x={x0 + i * cw + cw / 2} y={y + rh / 2 - 2} anchor="middle" bold size={16} mono color={v ? C.good : C.muted}>{v}</T>
              })}
            </g>
          )
        })}
        <Ln x1={10} y1={y0 + 4 * rh + 4} x2={630} y2={y0 + 4 * rh + 4} color={C.fill2} width={2} />
        <T x={320} y={y0 + 4 * rh + 28} anchor="middle" size={13} color={C.muted}>NAND = AND flipped. NOR = OR flipped. XNOR = XOR flipped.</T>
      </Diagram>
      <div style={{ margin: '-6px 0 14px', display: 'grid', gap: 8 }}>
        <Choice label="Input A" value={a} onChange={setA} options={[{ value: 0, label: 'A = 0' }, { value: 1, label: 'A = 1' }]} />
        <Choice label="Input B" value={b} onChange={setB} options={[{ value: 0, label: 'B = 0' }, { value: 1, label: 'B = 1' }]} />
      </div>
    </>
  )
}
