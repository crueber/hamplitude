import { C, Diagram, T } from '../kit'

const REGIONS = [
  { n: 2, g: ['The Americas,', 'including Greenland'], lo: 144, hi: 148, c: C.signal, you: true },
  { n: 1, g: ['Europe, Africa, the Middle', 'East and northern Asia'], lo: 144, hi: 146, c: C.resist, you: false },
  { n: 3, g: ['Most of Asia and', 'the Pacific'], lo: 144, hi: 148, c: C.power, you: false },
]

/** The three ITU regions, with the 2 m allocation as an example of how they differ. */
export function OperatingAbroad_Regions() {
  const w = 204, gap = 12, bar = 172, f = (mhz: number) => ((mhz - 144) / 4) * bar
  return (
    <Diagram w={640} h={262} title="The three ITU regions in rough west-to-east order. Region 2 is the Americas, Region 1 is Europe, Africa, the Middle East and northern Asia, and Region 3 is most of Asia and the Pacific. As an example of how they differ, the 2 meter band is allocated to amateurs from 144 to 148 megahertz in Regions 2 and 3 but only 144 to 146 in Region 1"
      caption="ITU allocations. Countries often adjust them, so check the host country.">
      {REGIONS.map((r, i) => {
        const x = 2 + i * (w + gap)
        return (
          <g key={r.n}>
            <rect x={x} y={6} width={w} height={206} rx={12} fill={r.you ? r.c : C.fill} fillOpacity={r.you ? 0.14 : 1} stroke={r.c} strokeWidth={r.you ? 3 : 2.2} />
            <T x={x + 14} y={32} size={20} bold color={r.c}>Region {r.n}</T>
            {r.you && <T x={x + w - 12} y={32} anchor="end" size={12.5} bold color={r.c}>you are here</T>}
            <T x={x + 14} y={62} size={13}>{r.g[0]}</T>
            <T x={x + 14} y={80} size={13}>{r.g[1]}</T>
            <T x={x + 14} y={118} size={12.5} bold color={C.muted}>2 m amateur allocation</T>
            <rect x={x + 14} y={134} width={bar} height={20} rx={3} fill={C.bg} stroke={C.muted} strokeWidth={1.5} />
            <rect x={x + 14 + f(r.lo)} y={134} width={f(r.hi) - f(r.lo)} height={20} rx={3} fill={r.c} fillOpacity={0.6} />
            <T x={x + 14} y={172} size={12.5} color={C.muted}>144</T>
            <T x={x + 14 + bar} y={172} size={12.5} color={C.muted} anchor="end">148 MHz</T>
            <T x={x + 14} y={196} size={13} bold>{r.lo}–{r.hi} MHz</T>
          </g>
        )
      })}
      <T x={320} y={238} anchor="middle" size={13} color={C.muted}>Ordered west to east from the Americas. Not a map.</T>
    </Diagram>
  )
}
