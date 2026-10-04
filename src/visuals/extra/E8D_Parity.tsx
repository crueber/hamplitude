import { useState } from 'react'
import { C, Diagram, T } from '../kit'

const CHAR = 'R'
const BASE = CHAR.charCodeAt(0).toString(2).padStart(7, '0').split('').map(Number) // 1010010
const parityBit = BASE.reduce((a, b) => a ^ b, 0) // even parity

/** Even parity: a 7-bit ASCII character plus one extra bit chosen so the count of ones is even. Click bits to flip them. */
export function Parity() {
  const [bits, setBits] = useState<number[]>([...BASE, parityBit])
  const ones = bits.reduce((a, b) => a + b, 0)
  const ok = ones % 2 === 0
  const flipped = bits.filter((b, i) => b !== [...BASE, parityBit][i]).length
  const toggle = (i: number) => setBits((b) => b.map((v, j) => (j === i ? 1 - v : v)))
  const x0 = 50, bw = 62
  return (
    <Diagram w={640} h={232} title={`ASCII letter ${CHAR} with an even parity bit. Click any bit to flip it as if noise did. ${ones} ones: parity check ${ok ? 'passes' : 'fails, so an error is detected'}.`}
      caption="Click bits to flip them. One flip is caught. Two flips cancel and slip through.">
      <T x={x0} y={18} size={13} bold color={C.signal}>7 data bits of &quot;{CHAR}&quot;</T>
      <T x={x0 + 7 * bw + 8} y={18} size={13} bold color={C.resist}>parity bit</T>
      {bits.map((b, i) => (
        <g key={i} role="button" tabIndex={0} aria-label={`bit ${i + 1}, value ${b}. Press to flip`} style={{ cursor: 'pointer' }}
          onClick={() => toggle(i)} onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); toggle(i) } }}>
          <rect x={x0 + i * bw + (i === 7 ? 8 : 0)} y={34} width={bw - 8} height={54} rx={8} fill={i === 7 ? C.resist : C.signal} fillOpacity={b ? 0.35 : 0.1}
            stroke={i === 7 ? C.resist : C.signal} strokeWidth={b !== [...BASE, parityBit][i] ? 4 : 2} />
          <T x={x0 + i * bw + (i === 7 ? 8 : 0) + (bw - 8) / 2} y={61} anchor="middle" size={24} bold mono>{b}</T>
        </g>
      ))}
      <T x={x0} y={116} size={15} bold>Ones counted: {ones}</T>
      <T x={x0 + 190} y={116} size={15} bold color={ok ? C.good : C.bad}>{ok ? 'even: check passes' : 'odd: error detected'}</T>
      <T x={x0} y={150} size={13} color={flipped && ok ? C.bad : C.muted}>
        {flipped === 0 ? 'Receiver sees no problem.' : ok ? 'Check passes, but the character is wrong: two errors cancel.' : 'Receiver knows something is wrong, but not which bit.'}
      </T>
      <T x={x0} y={176} size={12.5} color={C.muted}>Even parity: the parity bit is set so the total number of ones is even.</T>
      <T x={x0} y={200} size={12.5} color={C.muted}>Some types of errors are detected. Nothing is corrected.</T>
    </Diagram>
  )
}
