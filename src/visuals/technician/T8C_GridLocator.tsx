import { C, Diagram, Ln, T } from '../kit'

/** Maidenhead grid locators: FN31pr. Field (letters), square (digits), subsquare (letters). */
export function GridLocator() {
  const gx = 56, gy = 36, cell = 26
  const col = 3, row = 1 // square "31": column 3 from the west, row 1 from the south
  return (
    <Diagram w={640} h={340} title="A grid locator such as FN31pr is a letter-number code for a location. Two letters pick a large field, two digits a square inside it, and two letters a small subsquare" caption="West to east, columns 0-9. South to north, rows 0-9. Longer locator, smaller area.">
      <T x={gx + 5 * cell} y={16} anchor="middle" size={14} bold color={C.signal}>Field FN (20° × 10°)</T>
      <rect x={gx} y={gy} width={10 * cell} height={10 * cell} fill={C.fill} stroke={C.muted} strokeWidth={2} />
      {Array.from({ length: 9 }, (_, i) => (
        <g key={i}>
          <Ln x1={gx + (i + 1) * cell} y1={gy} x2={gx + (i + 1) * cell} y2={gy + 10 * cell} color={C.fill2} width={1.5} />
          <Ln x1={gx} y1={gy + (i + 1) * cell} x2={gx + 10 * cell} y2={gy + (i + 1) * cell} color={C.fill2} width={1.5} />
        </g>
      ))}
      <rect x={gx + col * cell} y={gy + (9 - row) * cell} width={cell} height={cell} fill={C.power} fillOpacity={0.35} stroke={C.power} strokeWidth={3} />
      {Array.from({ length: 10 }, (_, i) => (
        <g key={i}>
          <T x={gx + i * cell + cell / 2} y={gy + 10 * cell + 14} anchor="middle" size={12} color={i === col ? C.power : C.muted} bold={i === col}>{i}</T>
          <T x={gx - 12} y={gy + (9 - i) * cell + cell / 2} anchor="middle" size={12} color={i === row ? C.power : C.muted} bold={i === row}>{i}</T>
        </g>
      ))}
      <T x={gx + 5 * cell} y={gy + 10 * cell + 36} anchor="middle" size={12} color={C.muted}>west → east</T>
      {/* breakdown */}
      <T x={350} y={46} size={13} color={C.muted}>Example locator</T>
      <T x={350} y={92} size={46} bold mono color={C.ink}>FN31pr</T>
      {[
        { x: 350, w: 66, c: C.signal, a: 'FN', b: 'field', s: '20° × 10°' },
        { x: 416, w: 66, c: C.power, a: '31', b: 'square', s: '2° × 1°' },
        { x: 482, w: 66, c: C.resist, a: 'pr', b: 'subsquare', s: '5′ × 2.5′' },
      ].map((p) => (
        <g key={p.a}>
          <Ln x1={p.x + 4} y1={122} x2={p.x + p.w - 4} y2={122} color={p.c} width={4} />
          <T x={p.x + p.w / 2} y={144} anchor="middle" size={14} bold color={p.c}>{p.b}</T>
          <T x={p.x + p.w / 2} y={164} anchor="middle" size={12} color={C.muted}>{p.s}</T>
        </g>
      ))}
      <T x={350} y={210} size={13} bold>2 characters</T><T x={470} y={210} size={13} color={C.muted}>a huge region</T>
      <T x={350} y={234} size={13} bold>4 characters</T><T x={470} y={234} size={13} color={C.muted}>one square</T>
      <T x={350} y={258} size={13} bold>6 characters</T><T x={470} y={258} size={13} color={C.muted}>a neighborhood</T>
      <T x={350} y={290} size={13} color={C.muted}>FN31 covers most of Connecticut.</T>
    </Diagram>
  )
}
