import { C, Diagram, T } from '../kit'

const TONES = 6, COLS = 8
const cw = 30, ch = 22

/** Why spreading data across time and tones makes a mode survive bursts of noise. */
export function MfskAndOlivia_Redundancy() {
  // Which tone is active in each column
  const plain = [1, 4, 2, 5, 0, 3, 2, 4]
  const spread = [1, 4, 2, 5, 0, 3, 2, 4]
  const hit = [3, 4] // noise burst covers these columns
  const panel = (x0: number, title: string, col: string, kind: 'plain' | 'fec') => {
    const gx = x0 + 6, gy = 68
    const letters = ['H', 'A', 'M', '!']
    const lcol = [C.resist, C.power, C.current, C.resist]
    return (
      <g>
        <T x={x0 + 150} y={20} anchor="middle" size={14} bold color={col}>{title}</T>
        <rect x={x0} y={gy - 8} width={COLS * cw + 12} height={TONES * ch + 16} rx={8} fill={C.fill} stroke={C.fill2} strokeWidth={1.5} />
        {Array.from({ length: COLS }).map((_, c) => {
          const tone = (kind === 'plain' ? plain : spread)[c]
          return (
            <g key={c}>
              {Array.from({ length: TONES }).map((_, r) => (
                <rect key={r} x={gx + c * cw + 3} y={gy + r * ch + 2} width={cw - 6} height={ch - 4} rx={3} fill={C.fill2} opacity={0.5} />
              ))}
              <rect x={gx + c * cw + 3} y={gy + tone * ch + 2} width={cw - 6} height={ch - 4} rx={3} fill={kind === 'plain' ? lcol[Math.floor(c / 2)] : col} />
            </g>
          )
        })}
        {kind === 'plain' && letters.map((l, i) => <T key={i} x={gx + i * 2 * cw + cw} y={gy - 18} anchor="middle" size={13} bold color={lcol[i]}>{l}</T>)}
        <rect x={gx + hit[0] * cw} y={gy - 4} width={cw * 2} height={TONES * ch + 8} rx={4} fill={C.bad} fillOpacity={0.22} stroke={C.bad} strokeWidth={2} strokeDasharray="4 3" />
        <T x={gx + (hit[0] + 1) * cw} y={gy + TONES * ch + 24} anchor="middle" size={12.5} bold color={C.bad}>noise burst</T>
        <T x={x0 + 4} y={gy + TONES * ch + 52} size={13}>{kind === 'plain' ? 'Each pair of symbols carries one letter.' : 'Every letter is spread over many symbols,'}</T>
        <T x={x0 + 4} y={gy + TONES * ch + 72} size={13} bold color={kind === 'plain' ? C.bad : C.good}>{kind === 'plain' ? 'Letters A and M are lost.' : 'so the rest can rebuild the lost part.'}</T>
      </g>
    )
  }
  return (
    <Diagram w={640} h={292}
      title="Two grids with time across and tone down. Left: a plain mode, where each pair of symbols carries one letter, so a burst of noise destroys two letters. Right: a robust mode that spreads each letter over many symbols with redundancy, so the same burst removes only part of the information and the receiver rebuilds it."
      caption="Schematic. Robust modes buy their resilience with extra symbols, which cost time or bandwidth.">
      {panel(10, 'Without redundancy', C.resist, 'plain')}
      {panel(330, 'Spread with error correction', C.good, 'fec')}
    </Diagram>
  )
}
