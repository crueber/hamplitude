import { C, Diagram, Ln, T } from '../kit'

/** How to write kHz and MHz: capital and lowercase letters matter. */
export function HzSymbols() {
  const panel = (cx: number, word: string, first: string, firstNote: string[], wrong: string[]) => {
    const cw = 29 // approx mono glyph width at 48px
    const x0 = cx - (word.length * cw) / 2
    return (
      <g>
        <rect x={cx - 150} y={6} width={300} height={290} rx={14} fill={C.fill} />
        <T x={cx} y={56} anchor="middle" bold mono size={48} color={C.good}>{word}</T>
        {/* letter markers */}
        <Ln x1={x0 + cw / 2} y1={84} x2={cx - 80} y2={106} color={C.signal} width={2} />
        <T x={cx - 80} y={122} anchor="middle" bold size={15} color={C.signal}>{first}</T>
        <T x={cx - 80} y={142} anchor="middle" size={12} color={C.muted}>{firstNote[0]}</T>
        <T x={cx - 80} y={158} anchor="middle" size={12} color={C.muted}>{firstNote[1]}</T>
        <Ln x1={x0 + cw * 2} y1={84} x2={cx + 80} y2={106} color={C.resist} width={2} />
        <T x={cx + 80} y={122} anchor="middle" bold size={15} color={C.resist}>Hz</T>
        <T x={cx + 80} y={142} anchor="middle" size={12} color={C.muted}>capital H (Hertz),</T>
        <T x={cx + 80} y={158} anchor="middle" size={12} color={C.muted}>lowercase z</T>
        <T x={cx} y={188} anchor="middle" size={13} bold color={C.bad}>Wrong:</T>
        {wrong.map((w, i) => {
          const x = cx - 95 + i * 95
          return (
            <g key={w}>
              <T x={x} y={226} anchor="middle" mono bold size={24} color={C.muted}>{w}</T>
              <Ln x1={x - 28} y1={226} x2={x + 28} y2={226} color={C.bad} width={3} />
            </g>
          )
        })}
      </g>
    )
  }
  return (
    <Diagram w={640} h={302} title="Correct abbreviations are kHz for kilohertz and MHz for megahertz. Lowercase k for kilo, capital M for mega, then capital H and lowercase z."
      caption="k is lowercase, M is capital, and Hz is always capital H, lowercase z.">
      {panel(165, 'kHz', 'k', ['kilo: always', 'lowercase'], ['khz', 'KHz', 'KHZ'])}
      {panel(475, 'MHz', 'M', ['mega: capital', '(m means milli)'], ['mHz', 'mHZ', 'Mhz'])}
    </Diagram>
  )
}
