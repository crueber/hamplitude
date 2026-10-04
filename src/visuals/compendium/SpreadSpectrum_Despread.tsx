import { C, Diagram, Ln, T } from '../kit'

/** A smooth hump centred at cx on baseline `base`, half-width hw (to ~1/e^2), height h. */
function hump(cx: number, hw: number, h: number, base: number) {
  const pts: string[] = []
  for (let dx = -hw * 1.6; dx <= hw * 1.6; dx += hw / 12) {
    pts.push(`${pts.length ? 'L' : 'M'}${(cx + dx).toFixed(1)},${(base - h * Math.exp(-2 * (dx / hw) ** 2)).toFixed(1)}`)
  }
  return `${pts.join('')}L${(cx + hw * 1.6).toFixed(1)},${base}L${(cx - hw * 1.6).toFixed(1)},${base}Z`
}

/** Spread spectrum despreading: the wanted signal collapses to a narrow peak while a narrowband interferer is smeared flat. */
export function SpreadSpectrum_Despread() {
  const pw = 192, gap = 16, x0 = 16, base = 196
  const px = (i: number) => x0 + i * (pw + gap)
  const mid = (i: number) => px(i) + pw / 2
  const panel = (i: number, title: string) => (
    <g>
      <rect x={px(i)} y={34} width={pw} height={base - 34 + 12} rx={8} fill={C.fill} />
      <T x={mid(i)} y={18} anchor="middle" size={13.5} bold color={C.ink}>{title}</T>
      <Ln x1={px(i) + 8} y1={base} x2={px(i) + pw - 8} y2={base} color={C.muted} width={1.5} />
    </g>
  )
  return (
    <Diagram w={640} h={316}
      title="Despreading. At the transmitter the signal is spread wide and low. At the receiver, before despreading, a strong narrowband interferer towers over it. After despreading with the same code, the wanted signal collapses to a narrow tall peak while the interferer is smeared out flat, and a narrow filter keeps only the wanted signal."
      caption="Illustrative, not to scale. The receiver's own copy of the code is the key: it undoes the spreading for the wanted signal only.">
      {panel(0, '1  Transmitted')}
      <path d={hump(mid(0), 56, 26, base)} fill={C.signal} fillOpacity={0.4} stroke={C.signal} strokeWidth={2} />
      <T x={mid(0)} y={base - 48} anchor="middle" size={12.5} bold color={C.signal}>wide and low</T>
      {panel(1, '2  Arrives with interference')}
      <path d={hump(mid(1), 56, 26, base)} fill={C.signal} fillOpacity={0.4} stroke={C.signal} strokeWidth={2} />
      <path d={hump(mid(1) + 34, 5, 118, base)} fill={C.bad} fillOpacity={0.45} stroke={C.bad} strokeWidth={2} />
      <T x={mid(1) + 34} y={base - 130} anchor="middle" size={12.5} bold color={C.bad}>interferer</T>
      <T x={mid(1) - 40} y={base - 48} anchor="middle" size={12.5} bold color={C.signal}>wanted</T>
      {panel(2, '3  After despreading')}
      <rect x={mid(2) - 15} y={46} width={30} height={base - 46} rx={4} fill="none" stroke={C.muted} strokeWidth={1.5} strokeDasharray="4 4" />
      <path d={hump(mid(2), 56, 22, base)} fill={C.bad} fillOpacity={0.4} stroke={C.bad} strokeWidth={2} />
      <path d={hump(mid(2), 6, 124, base)} fill={C.signal} fillOpacity={0.5} stroke={C.signal} strokeWidth={2} />
      <T x={mid(2)} y={38} anchor="middle" size={12.5} bold color={C.signal} stroke={C.fill} strokeWidth={3} paintOrder="stroke">wanted</T>
      <T x={mid(2) + 44} y={base - 40} anchor="middle" size={12.5} bold color={C.bad}>interferer</T>
      <T x={mid(2) + 44} y={base - 24} anchor="middle" size={12} color={C.bad}>now flat</T>
      <T x={mid(0)} y={base + 28} anchor="middle" size={12.5} color={C.muted}>fast code spreads the signal</T>
      <T x={mid(1)} y={base + 28} anchor="middle" size={12.5} color={C.muted}>a strong narrow signal sits on top</T>
      <T x={mid(2)} y={base + 28} anchor="middle" size={12.5} color={C.muted}>same code: narrow filter keeps it</T>
      <T x={320} y={base + 70} anchor="middle" size={14.5} bold color={C.ink}>Processing gain = 10 × log₁₀(spread bandwidth ÷ data bandwidth)</T>
      <T x={320} y={base + 92} anchor="middle" size={13} color={C.muted}>for example 1,023,000 chips/s carrying 50 bit/s: 20,460 → about 43 dB</T>
    </Diagram>
  )
}
