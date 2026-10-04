import { C, Diagram, T } from '../kit'

const ROWS = [
  { ch: 'space', code: '1', bd: '00100' },
  { ch: 'e', code: '11', bd: '00001' },
  { ch: 't', code: '101', bd: '10000' },
  { ch: 'a', code: '1011', bd: '00011' },
]

/** PSK31 gives common characters short codes (variable length). Baudot RTTY gives every character five bits. */
export function E2E_Varicode() {
  const bit = (x: number, y: number, b: string, col: string) => (
    <g>
      <rect x={x} y={y} width={22} height={22} rx={4} fill={col} fillOpacity={b === '1' ? 0.4 : 0.1} stroke={col} strokeWidth={1.8} />
      <T x={x + 11} y={y + 11} anchor="middle" size={12.5} bold mono color={col}>{b}</T>
    </g>
  )
  return (
    <Diagram w={640} h={216} title="Variable-length character coding in PSK31: common characters get short bit patterns, space is one bit and the letter e is two bits. RTTY's Baudot code instead uses five bits for every character, a fixed length."
      caption="Variable length = fewer bits for common characters = faster typing for the same baud.">
      <T x={20} y={22} size={14} bold color={C.signal}>PSK31 (varicode): length varies</T>
      <T x={330} y={22} size={14} bold color={C.muted}>RTTY (Baudot): always 5 bits</T>
      {ROWS.map((r, i) => {
        const y = 40 + i * 44
        return (
          <g key={r.ch}>
            <T x={80} y={y + 11} anchor="end" size={15} bold mono>{r.ch}</T>
            {r.code.split('').map((b, j) => <g key={j}>{bit(96 + j * 26, y, b, C.signal)}</g>)}
            <T x={380} y={y + 11} anchor="end" size={15} bold mono>{r.ch}</T>
            {r.bd.split('').map((b, j) => <g key={j}>{bit(392 + j * 26, y, b, C.muted)}</g>)}
          </g>
        )
      })}
    </Diagram>
  )
}
