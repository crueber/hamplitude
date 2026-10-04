import { C, Diagram, T } from '../kit'

const COLS = [
  { x: 82, w: 150, head: 'Calling anyone', color: C.signal },
  { x: 240, w: 72, head: 'From', color: C.resist },
  { x: 320, w: 168, head: 'Who is calling', color: C.power },
  { x: 496, w: 138, head: 'Your turn', color: C.good },
]

function Chip({ x, y, w, text, color, mono }: { x: number; y: number; w: number; text: string; color: string; mono?: boolean }) {
  return (
    <g>
      <rect x={x} y={y} width={w} height={34} rx={8} fill={C.fill} stroke={color} strokeWidth={2} />
      <T x={x + w / 2} y={y + 17} anchor="middle" bold mono={mono} size={mono ? 14 : 13.5}>{text}</T>
    </g>
  )
}

/** The anatomy of a CQ call, on voice and in Morse. */
export function HamAbbreviations_CqCall() {
  const voice = [
    [0, 'CQ', 0], [0, 'CQ', 1], [0, 'CQ', 2], [1, 'this is', 0], [2, 'N0CALL', 0], [2, 'N0CALL', 1], [3, 'listening', 0],
  ] as const
  const cw = [
    [0, 'CQ', 0], [0, 'CQ', 1], [0, 'CQ', 2], [1, 'DE', 0], [2, 'N0CALL', 0], [2, 'N0CALL', 1], [3, 'K', 0],
  ] as const
  const place = (col: number, i: number, w: number) => {
    const c = COLS[col]
    if (col === 0) return c.x + i * 52
    if (col === 2) return c.x + i * 84
    return c.x + (c.w - w) / 2
  }
  const wOf = (col: number, t: string) => (col === 0 ? 46 : col === 2 ? 80 : t === 'listening' ? 96 : t === 'this is' ? 68 : 40)
  const row = (items: readonly (readonly [number, string, number])[], y: number) =>
    items.map(([col, t, i], k) => {
      const w = wOf(col, t)
      return <Chip key={k} x={place(col, i, w)} y={y} w={w} text={t} color={COLS[col].color} mono={col === 2} />
    })
  return (
    <Diagram w={640} h={196} title="A CQ call: CQ three times to call anyone, then this is on voice or DE in Morse, then your call sign twice, then listening on voice or K in Morse"
      caption="A typical HF CQ. N0CALL is a placeholder: use your own call sign.">
      {COLS.map((c) => (
        <g key={c.head}>
          <T x={c.x + c.w / 2} y={16} anchor="middle" size={12.5} bold color={c.color}>{c.head}</T>
          <rect x={c.x} y={30} width={c.w} height={3} rx={1.5} fill={c.color} />
        </g>
      ))}
      <T x={4} y={65} size={13} bold color={C.muted}>Voice</T>
      {row(voice, 48)}
      <T x={4} y={125} size={13} bold color={C.muted}>CW</T>
      {row(cw, 108)}
      <T x={4} y={170} size={13} color={C.muted}>Repeat as needed, then pause and listen. Answer by sending their call sign, then yours.</T>
    </Diagram>
  )
}
