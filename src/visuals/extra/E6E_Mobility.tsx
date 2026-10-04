import { C, Diagram, Ln, T, useTime } from '../kit'

/** Electrons move faster in GaAs than in silicon, so devices can switch faster, which means higher usable frequency. */
export function Mobility() {
  const { t, ref } = useTime(1)
  const lane = (y: number, name: string, speed: number, col: string, sub: string) => {
    const dots = [0, 1, 2].map((k) => ((t * 60 * speed + k * 70) % 210))
    return (
      <g>
        <T x={20} y={y - 22} size={14} bold>{name}</T>
        <T x={20} y={y + 24} size={12} color={C.muted}>{sub}</T>
        <rect x={20} y={y - 8} width={240} height={16} rx={8} fill={C.fill} />
        {dots.map((d, k) => (
          <g key={k}>
            <circle cx={36 + d} cy={y} r={6} fill={col} />
          </g>
        ))}
        <Ln x1={36} y1={y + 12} x2={36 + Math.min(210, 70 * speed)} y2={y + 12} color={col} width={2} arrow />
      </g>
    )
  }
  const bars: [string, number, string][] = [['Silicon', 0.35, C.muted], ['GaAs', 0.65, C.signal], ['GaN', 1, C.signal]]
  return (
    <Diagram w={640} h={250} svgRef={ref}
      title="Electrons move faster in gallium arsenide than in silicon, so GaAs devices work at UHF and above. Gallium nitride supports the highest frequency of operation in MMICs."
      caption="GaAs: faster electrons, higher usable frequency. GaN tops the list for MMICs.">
      <T x={140} y={20} anchor="middle" bold size={14}>Electron mobility</T>
      {lane(80, 'Silicon', 1, C.muted, 'slower electrons')}
      {lane(170, 'Gallium arsenide', 2.6, C.signal, 'faster electrons: higher electron mobility')}
      <T x={480} y={20} anchor="middle" bold size={14}>Highest usable frequency (MMICs)</T>
      {bars.map(([n, v, c], i) => (
        <g key={n}>
          <T x={370} y={66 + i * 56} anchor="end" size={14} bold>{n}</T>
          <rect x={380} y={50 + i * 56} width={v * 230} height={32} rx={5} fill={c} opacity={0.75} />
        </g>
      ))}
      <T x={480} y={226} anchor="middle" size={12} color={C.muted}>not to scale · order only</T>
    </Diagram>
  )
}
