import { C, Diagram, Ln, T, TAU, useTime } from '../kit'

/**
 * An electromagnetic wave in oblique 3-D: travel along →, electric field vertical (red),
 * magnetic field into/out of the page (blue). Animated; still frame if reduced motion.
 */
export function EmWave({ caption }: { caption?: string }) {
  const { t, ref } = useTime(0.6)
  const W = 640, H = 300
  const x0 = 70, x1 = 548, cy = 160
  const A = 62 // amplitude
  const dz = { x: -0.34, y: 0.45 } // screen offset per unit of depth
  const cycles = 2.5
  const phase = -t * TAU
  const wave = (x: number) => Math.sin((TAU * cycles * (x - x0)) / (x1 - x0) + phase)

  const E: string[] = []
  const B: string[] = []
  const stems: { e: [number, number, number, number]; b: [number, number, number, number] }[] = []
  const N = 140
  for (let i = 0; i <= N; i++) {
    const x = x0 + ((x1 - x0) * i) / N
    const s = wave(x)
    E.push(`${i ? 'L' : 'M'}${x.toFixed(1)},${(cy - A * s).toFixed(1)}`)
    B.push(`${i ? 'L' : 'M'}${(x + dz.x * A * s).toFixed(1)},${(cy + dz.y * A * s).toFixed(1)}`)
  }
  for (let i = 0; i <= 26; i++) {
    const x = x0 + ((x1 - x0) * i) / 26
    const s = wave(x)
    stems.push({
      e: [x, cy, x, cy - A * s],
      b: [x, cy, x + dz.x * A * s, cy + dz.y * A * s],
    })
  }
  return (
    <Diagram w={W} h={H} title="An electromagnetic wave: electric field vertical, magnetic field perpendicular to it, both perpendicular to the direction of travel" caption={caption} svgRef={ref}>
      {stems.map((s, i) => (
        <g key={i}>
          <Ln x1={s.e[0]} y1={s.e[1]} x2={s.e[2]} y2={s.e[3]} color={C.voltage} width={1.4} opacity={0.35} />
          <Ln x1={s.b[0]} y1={s.b[1]} x2={s.b[2]} y2={s.b[3]} color={C.current} width={1.4} opacity={0.35} />
        </g>
      ))}
      <Ln x1={x0 - 20} y1={cy} x2={x1 + 30} y2={cy} color={C.muted} width={2.5} arrow />
      <path d={B.join('')} fill="none" stroke={C.current} strokeWidth={3.5} strokeLinecap="round" />
      <path d={E.join('')} fill="none" stroke={C.voltage} strokeWidth={3.5} strokeLinecap="round" />
      <T x={x1 + 36} y={cy} size={13} color={C.muted} bold>travel</T>
      <T x={x0 + 20} y={34} size={15} bold color={C.voltage}>Electric field (E)</T>
      <T x={x0 + 20} y={56} size={13} color={C.muted}>up ↕ down</T>
      <T x={x0 - 30} y={262} size={15} bold color={C.current}>Magnetic field (H)</T>
      <T x={x0 - 30} y={282} size={13} color={C.muted}>in ⟷ out of the page</T>
      <g transform="translate(470,252)">
        <rect x={-6} y={-20} width={150} height={44} rx={10} fill={C.fill} />
        <path d="M6,10 L6,-8 M6,10 L24,10" stroke={C.ink} strokeWidth={2} fill="none" />
        <T x={34} y={-6} size={13} bold>90° apart</T>
        <T x={34} y={12} size={12} color={C.muted}>E ⟂ H ⟂ travel</T>
      </g>
    </Diagram>
  )
}
