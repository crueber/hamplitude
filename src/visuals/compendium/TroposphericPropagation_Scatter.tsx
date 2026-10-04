import { C, Diagram, Ln, T, useTime } from '../kit'

/** Tropo scatter: both antennas aim at a shared patch of turbulent air that scatters a tiny part of the energy forward. */
export function TroposphericPropagation_Scatter() {
  const { t, ref } = useTime(0.6)
  const A: [number, number] = [110, 243.6], B: [number, number] = [530, 243.6], V: [number, number] = [320, 186]
  const flick = [0, 1, 2, 3, 4].map((i) => 0.45 + 0.35 * Math.sin(t * 6 + i * 1.9))
  return (
    <Diagram w={640} h={300} svgRef={ref}
      title="Tropospheric scatter: two antennas aim at the horizon so their beams cross in a shared volume of turbulent air. Irregularities in the air scatter a small fraction of the energy toward the far station, giving a weak, fluttery but usable signal beyond the horizon"
      caption="Schematic, not to scale. Distance is typically a few hundred miles at most.">
      <path d="M-10,268 Q320,184 650,268 L650,310 L-10,310 Z" fill={C.fill} stroke={C.muted} strokeWidth={2} />
      <path d={`M${A[0]},${A[1]} L341,149 L357,207 Z`} fill={C.signal} fillOpacity={0.14} stroke={C.signal} strokeWidth={1.2} />
      <path d={`M${B[0]},${B[1]} L299,149 L283,207 Z`} fill={C.signal} fillOpacity={0.14} stroke={C.signal} strokeWidth={1.2} />
      <ellipse cx={V[0]} cy={V[1]} rx={34} ry={27} fill={C.power} fillOpacity={0.28} stroke={C.power} strokeWidth={2} />
      {flick.map((o, i) => (
        <circle key={i} cx={V[0] - 18 + i * 9} cy={V[1] + ((i * 7) % 5) * 5 - 10} r={3} fill={C.power} opacity={o + 0.2} />
      ))}
      <T x={V[0]} y={118} anchor="middle" size={13} bold color={C.power}>common volume</T>
      <T x={V[0]} y={136} anchor="middle" size={12.5} color={C.muted}>turbulent air</T>
      <polyline points={`${A} ${V} ${B}`} fill="none" stroke={C.signal} strokeWidth={3} strokeDasharray="2 7" strokeLinecap="round" />
      {[A, B].map((p, i) => (
        <g key={i}>
          <Ln x1={p[0]} y1={p[1]} x2={p[0]} y2={p[1] - 22} color={C.ink} width={3} />
          <T x={p[0]} y={p[1] + 18} anchor="middle" size={13} bold>{i ? 'Station B' : 'Station A'}</T>
        </g>
      ))}
      <T x={320} y={278} anchor="middle" size={13} color={C.muted}>both aim at the horizon; only a tiny fraction scatters forward: weak, steady, fluttery</T>
    </Diagram>
  )
}
