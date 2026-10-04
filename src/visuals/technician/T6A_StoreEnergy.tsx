import { C, Diagram, Ln, T, Wire, TAU, useTime } from '../kit'

/** Capacitor stores energy in an electric field between plates; inductor stores it in a magnetic field around a coil. */
export function StoreEnergy() {
  const { t, ref, reduced } = useTime(1)
  const f = reduced ? 1 : 0.12 + 0.88 * (0.5 - 0.5 * Math.cos((TAU * t) / 6))
  const ys = [92, 116, 140, 164, 188]
  return (
    <Diagram w={640} h={290} svgRef={ref} title="A capacitor holds energy as an electric field between two plates. An inductor holds energy as a magnetic field around a coil."
      caption="The fields grow and fade as the part charges up and lets go.">
      <line x1={320} y1={44} x2={320} y2={270} stroke={C.fill2} strokeWidth={2} strokeDasharray="4 5" />

      {/* capacitor */}
      <T x={160} y={22} anchor="middle" bold size={17}>Capacitor</T>
      <T x={160} y={46} anchor="middle" size={13} color={C.muted}>electric field between plates</T>
      <Wire pts={[[50, 140], [126, 140]]} color={C.ink} />
      <Wire pts={[[194, 140], [270, 140]]} color={C.ink} />
      <rect x={124} y={80} width={6} height={120} rx={2} fill={C.ink} />
      <rect x={190} y={80} width={6} height={120} rx={2} fill={C.ink} />
      {ys.map((y) => (
        <g key={y} opacity={f}>
          <Ln x1={138} y1={y} x2={180} y2={y} color={C.voltage} width={2} arrow />
          <T x={110} y={y} anchor="middle" bold size={16} color={C.voltage}>+</T>
          <T x={210} y={y} anchor="middle" bold size={18} color={C.current}>−</T>
        </g>
      ))}
      <T x={160} y={226} anchor="middle" size={13} color={C.muted}>insulator in the gap</T>
      <T x={160} y={262} anchor="middle" bold size={14}>two plates + insulator</T>

      {/* inductor */}
      <T x={480} y={22} anchor="middle" bold size={17}>Inductor</T>
      <T x={480} y={46} anchor="middle" size={13} color={C.muted}>magnetic field around a coil</T>
      <Wire pts={[[400, 140], [420, 140]]} color={C.ink} />
      <Wire pts={[[540, 140], [560, 140]]} color={C.ink} />
      <path d="M420,140 a12,14 0 0 1 24,0 a12,14 0 0 1 24,0 a12,14 0 0 1 24,0 a12,14 0 0 1 24,0 a12,14 0 0 1 24,0" fill="none" stroke={C.ink} strokeWidth={2.5} strokeLinecap="round" />
      {[[100, 56], [76, 40], [52, 26]].map(([rx, ry], i) => (
        <g key={i} opacity={f * (1 - i * 0.2)}>
          <ellipse cx={480} cy={140} rx={rx} ry={ry + 12} fill="none" stroke={C.current} strokeWidth={2} strokeDasharray="2 0" />
        </g>
      ))}
      <T x={480} y={226} anchor="middle" size={13} color={C.muted}>current makes the field</T>
      <T x={480} y={262} anchor="middle" bold size={14}>a coil of wire</T>
    </Diagram>
  )
}
