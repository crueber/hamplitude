import { useState } from 'react'
import { C, Diagram, T } from '../kit'

// Hamming(7,4): positions 1..7 = p1 p2 d1 p4 d2 d3 d4. Check k covers every position whose number has bit k set.
const LABELS = ['p1', 'p2', 'd1', 'p4', 'd2', 'd3', 'd4']
const DATA_POS = [2, 4, 5, 6] // zero-based index of d1..d4
const CHECKS = [
  { name: 'check 1', pos: [1, 3, 5, 7], w: 1 },
  { name: 'check 2', pos: [2, 3, 6, 7], w: 2 },
  { name: 'check 4', pos: [4, 5, 6, 7], w: 4 },
]

function encode(d: number[]): number[] {
  const [d1, d2, d3, d4] = d
  return [d1 ^ d2 ^ d4, d1 ^ d3 ^ d4, d1, d2 ^ d3 ^ d4, d2, d3, d4]
}

/** Hamming(7,4): change the data, flip bits in transit, and watch three parity checks point at the error. */
export function ErrorCorrection_Hamming() {
  const [data, setData] = useState([1, 0, 1, 1])
  const [flips, setFlips] = useState<boolean[]>([false, false, false, false, false, true, false])
  const sent = encode(data)
  const recv = sent.map((b, i) => (flips[i] ? 1 - b : b))
  const fails = CHECKS.map((c) => c.pos.reduce((a, p) => a ^ recv[p - 1], 0) === 1)
  const syn = CHECKS.reduce((s, c, i) => s + (fails[i] ? c.w : 0), 0)
  const fixed = recv.map((b, i) => (i === syn - 1 ? 1 - b : b))
  const nFlips = flips.filter(Boolean).length
  const right = fixed.every((b, i) => b === sent[i])
  const x0 = 176, bw = 64
  const cell = (i: number) => x0 + i * bw
  const press = (fn: () => void) => ({ role: 'button' as const, tabIndex: 0, style: { cursor: 'pointer' }, onClick: fn, onKeyDown: (e: React.KeyboardEvent) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); fn() } } })
  const row = (y: number, bits: number[], opts: { mark?: boolean[]; sel?: number; click?: (i: number) => void; aria: string }) =>
    bits.map((b, i) => {
      const isData = DATA_POS.includes(i)
      const col = isData ? C.signal : C.resist
      const g = (
        <g key={i} {...(opts.click ? { ...press(() => opts.click!(i)), 'aria-label': `${opts.aria} position ${i + 1}, value ${b}. Press to ${isData && y < 60 ? 'change' : 'flip'}` } : {})}>
          <rect x={cell(i)} y={y} width={bw - 8} height={46} rx={8} fill={col} fillOpacity={b ? 0.35 : 0.1} stroke={opts.mark?.[i] ? C.bad : col} strokeWidth={opts.mark?.[i] ? 4 : 2} />
          <T x={cell(i) + (bw - 8) / 2} y={y + 23} anchor="middle" size={22} bold mono>{b}</T>
          <T x={cell(i) + (bw - 8) / 2} y={y - 9} anchor="middle" size={12} color={C.muted}>{LABELS[i]}</T>
        </g>
      )
      return g
    })
  return (
    <Diagram w={640} h={372}
      title={`Hamming(7,4) code. Data ${data.join('')} is sent as the codeword ${sent.join('')}. ${nFlips} bit${nFlips === 1 ? ' is' : 's are'} flipped in transit. The three parity checks give syndrome ${syn}${syn ? `, which points at position ${syn}` : ', meaning no error found'}. ${right ? 'The decoded data is correct.' : 'The decoder is fooled and the result is wrong.'}`}
      caption="Click a data bit in the top row to change the message. Click bits in the received row to flip them as noise would.">
      <T x={14} y={46} size={14} bold color={C.ink}>Sent</T>
      <T x={14} y={66} size={12.5} color={C.muted}>4 data + 3 parity</T>
      {row(34, sent, { aria: 'Sent', click: (i) => { const k = DATA_POS.indexOf(i); if (k >= 0) setData((d) => d.map((v, j) => (j === k ? 1 - v : v))) } })}
      <T x={14} y={126} size={14} bold color={C.ink}>Received</T>
      <T x={14} y={146} size={12.5} color={C.muted}>click to flip</T>
      {row(114, recv, { mark: flips, aria: 'Received', click: (i) => setFlips((f) => f.map((v, j) => (j === i ? !v : v))) })}
      {CHECKS.map((c, k) => (
        <g key={c.name}>
          <T x={14} y={196 + k * 22} size={13} bold color={C.ink}>{c.name}</T>
          <T x={96} y={196 + k * 22} size={12.5} color={C.muted}>positions {c.pos.join(', ')}</T>
          <T x={cell(0) + 110} y={196 + k * 22} size={13} bold color={fails[k] ? C.bad : C.good}>{fails[k] ? 'odd number of ones: fails' : 'even: passes'}</T>
        </g>
      ))}
      <T x={14} y={274} size={14} bold color={syn ? C.bad : C.good}>
        {syn ? (fails.filter(Boolean).length > 1 ? `Failed checks ${CHECKS.filter((_, i) => fails[i]).map((c) => c.w).join(' + ')} = ${syn}: error at position ${syn}` : `Only check ${syn} failed: error at position ${syn}`) : 'All checks pass: no error found'}
      </T>
      <T x={14} y={312} size={14} bold color={C.ink}>Corrected</T>
      <T x={14} y={330} size={12.5} color={right ? C.good : C.bad}>{right ? 'matches what was sent' : 'WRONG: two errors'}</T>
      {row(300, fixed, { aria: 'Corrected' })}
      <T x={cell(0)} y={360} size={12.5} color={C.muted}>One flipped bit is found and fixed. Two flipped bits fool this code.</T>
    </Diagram>
  )
}
