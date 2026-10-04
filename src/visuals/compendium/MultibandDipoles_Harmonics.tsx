import { C, Diagram, Ln, T } from '../kit'

/**
 * Standing-wave current on one wire driven at 1x, 2x, 3x and 4x its fundamental frequency.
 * `feed` is where the feed point sits as a fraction of the wire from its left end (0.5 center, 1/3 off-center, 0 end).
 * Current at distance d from an open end is sin(k d), so the feed-point current at harmonic n is |sin(n * pi * feed)|.
 * Impedance at the feed point scales as 1 / current^2 (ideal thin wire, free space; schematic).
 */
export function MultibandDipoles_Harmonics({ feed = 0.5, title, caption }: { feed?: number; title?: string; caption?: string }) {
  const x0 = 112, x1 = 420, rows = [1, 2, 3, 4], rh = 78, top = 62, A = 27
  const ordinal = (n: number) => (n === 1 ? 'fundamental' : `${n === 2 ? '2nd' : n === 3 ? '3rd' : '4th'} harmonic`)
  return (
    <Diagram w={640} h={top + rows.length * rh - 4} maxWidth={700}
      title={title ?? 'Current along a wire at its fundamental frequency and its 2nd, 3rd and 4th harmonics, with the feed point marked. Where the feed point lands on the standing wave decides the impedance there.'}
      caption={caption ?? 'Ideal thin wire in free space; real antennas shift these figures. Current is blue, the feed point is purple.'}>
      <T x={x0} y={20} size={13} bold color={C.current}>Current along the wire (blue)</T>
      <T x={x0} y={40} size={12} color={C.muted}>one lobe per half-wave; neighbouring lobes flow in opposite directions</T>
      {rows.map((n, i) => {
        const cy = top + i * rh + rh / 2 - 6
        const pts: string[] = []
        for (let k = 0; k <= 140; k++) {
          const u = k / 140
          pts.push(`${k ? 'L' : 'M'}${(x0 + (x1 - x0) * u).toFixed(1)},${(cy - A * Math.sin(n * Math.PI * u)).toFixed(1)}`)
        }
        const s = Math.abs(Math.sin(n * Math.PI * feed))
        const fx = x0 + (x1 - x0) * feed
        const very = s < 0.05
        const rel = 1 / (s * s)
        return (
          <g key={n}>
            <T x={14} y={cy - 8} size={17} bold>{n === 1 ? 'f' : `${n}f`}</T>
            <T x={14} y={cy + 12} size={12} color={C.muted}>{ordinal(n)}</T>
            <Ln x1={x0} y1={cy} x2={x1} y2={cy} color={C.ink} width={4} />
            <path d={pts.join('')} fill="none" stroke={C.current} strokeWidth={3} strokeLinejoin="round" />
            <circle cx={fx} cy={cy} r={7} fill={C.bg} stroke={C.power} strokeWidth={3} />
            <T x={x1 + 22} y={cy - 9} size={12} color={C.muted}>{`feed current ${Math.round(s * 100)}% of peak`}</T>
            <T x={x1 + 22} y={cy + 10} size={13} bold color={C.resist}>
              {very ? 'impedance very high' : s > 0.95 ? 'impedance lowest' : `impedance ×${rel.toFixed(1)} the lowest`}
            </T>
          </g>
        )
      })}
    </Diagram>
  )
}
