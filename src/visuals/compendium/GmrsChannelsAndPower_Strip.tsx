import { C, Diagram, Ln, T } from '../kit'

const X0 = 40, STEP = 40 // 15 slots, 12.5 kHz apart, drawn across a 640-wide canvas
const SLOTS = Array.from({ length: 15 }, (_, k) => k)

const GROUPS = [
  { color: C.signal, name: '462 main (15 to 22)', note: 'mobile, base, repeater up to 50 W; FRS up to 2 W' },
  { color: C.current, name: '462 interstitial (1 to 7)', note: 'GMRS up to 5 W ERP; FRS up to 2 W ERP' },
  { color: C.resist, name: '467 main (repeater inputs)', note: 'radios use them only through a repeater' },
  { color: C.power, name: '467 interstitial (8 to 14)', note: 'hand-helds only, up to 0.5 W ERP' },
]

/** The two GMRS bands as 15 slots each, 12.5 kHz apart, alternating main and interstitial channels. */
export function GmrsChannelsAndPower_Strip() {
  const band = (ry: number, label: string, range: string, main: string, inter: string, mainNum: (k: number) => string, interNum: (k: number) => string) => (
    <g>
      <T x={X0} y={ry - 52} size={14} bold>{label}</T>
      <T x={X0 + 14 * STEP} y={ry - 52} size={12} mono color={C.muted} anchor="end">{range}</T>
      <Ln x1={X0 - 16} y1={ry} x2={X0 + 14 * STEP + 16} y2={ry} color={C.muted} width={2} />
      {SLOTS.map((k) => {
        const isMain = k % 2 === 0
        const x = X0 + k * STEP
        const h = isMain ? 28 : 18
        const color = isMain ? main : inter
        return (
          <g key={k}>
            <rect x={x - 4} y={ry - h} width={8} height={h} rx={2} fill={color} fillOpacity={0.35} stroke={color} strokeWidth={2} />
            <T x={x} y={ry + 17} size={12.5} bold mono color={color} anchor="middle">{isMain ? mainNum(k) : interNum(k)}</T>
          </g>
        )
      })}
    </g>
  )
  return (
    <Diagram w={640} h={430}
      title="The two GMRS bands, each drawn as fifteen slots 12.5 kilohertz apart. In the 462 megahertz band the main channels are 15 to 22 and the interstitial channels are 1 to 7. In the 467 megahertz band the main channels are repeater inputs and the interstitial channels are 8 to 14. The legend gives the power limit for each group."
      caption="Channel numbers are the FRS and consumer-radio numbering. Power limits are from 47 CFR 95.1767 (GMRS) and 95.567 (FRS).">
      {band(104, '462 MHz band', '462.5500 to 462.7250 MHz', GROUPS[0].color, GROUPS[1].color, (k) => String(15 + k / 2), (k) => String(1 + (k - 1) / 2))}
      {band(222, '467 MHz band', '467.5500 to 467.7250 MHz', GROUPS[2].color, GROUPS[3].color, () => 'in', (k) => String(8 + (k - 1) / 2))}
      {GROUPS.map((g, i) => {
        const x = 24
        const y = 288 + i * 36
        return (
          <g key={g.name}>
            <rect x={x} y={y - 7} width={14} height={14} rx={3} fill={g.color} fillOpacity={0.35} stroke={g.color} strokeWidth={2} />
            <T x={x + 22} y={y - 6} size={13} bold>{g.name}</T>
            <T x={x + 22} y={y + 12} size={12} color={C.muted}>{g.note}</T>
          </g>
        )
      })}
    </Diagram>
  )
}
