import { C, Diagram, Ln, T, TAU, useTime } from '../kit'

/** Standing-wave current and voltage on a half-wave dipole: current peaks at the centre feed point, voltage at the ends. */
export function HalfWaveDipole_Standing() {
  const { t, ref } = useTime(0.5)
  const x0 = 70, x1 = 570, wy = 150, A = 52
  const cur: string[] = [], vol: string[] = []
  for (let i = 0; i <= 80; i++) {
    const u = i / 80
    const x = x0 + (x1 - x0) * u
    // current: sine across the wire, zero at both ends; voltage is a cosine, a quarter-cycle out of time with it
    cur.push(`${i ? 'L' : 'M'}${x.toFixed(1)},${(wy - 36 - A * Math.sin(Math.PI * u) * Math.cos(TAU * t)).toFixed(1)}`)
    vol.push(`${i ? 'L' : 'M'}${x.toFixed(1)},${(wy + 36 + A * Math.cos(Math.PI * u) * Math.sin(TAU * t)).toFixed(1)}`)
  }
  return (
    <Diagram w={640} h={300} svgRef={ref}
      title="A half-wave dipole: current is largest at the centre feed point and zero at the ends; voltage is largest at the ends and zero at the centre"
      caption="Current and voltage on the wire swap places in time. Averaged over a cycle: current is strong in the middle, voltage is strong at the ends.">
      <path d={cur.join('')} fill="none" stroke={C.current} strokeWidth={3.5} strokeLinecap="round" />
      <path d={vol.join('')} fill="none" stroke={C.voltage} strokeWidth={3.5} strokeLinecap="round" />
      <Ln x1={x0} y1={wy} x2={320 - 8} y2={wy} color={C.ink} width={5} />
      <Ln x1={320 + 8} y1={wy} x2={x1} y2={wy} color={C.ink} width={5} />
      <circle cx={320} cy={wy} r={9} fill={C.bg} stroke={C.power} strokeWidth={3} />
      <rect x={268} y={wy + 14} width={104} height={22} rx={11} fill={C.bg} stroke={C.power} strokeWidth={1.5} />
      <T x={320} y={wy + 25} anchor="middle" size={12.5} bold color={C.power}>feed point</T>
      <T x={x0} y={wy + 18} anchor="middle" size={12} color={C.muted}>end</T>
      <T x={x1} y={wy + 18} anchor="middle" size={12} color={C.muted}>end</T>
      <T x={20} y={22} size={14} bold color={C.current}>Current (I)</T>
      <T x={20} y={42} size={12.5} color={C.muted}>zero at the ends, maximum in the middle</T>
      <T x={20} y={266} size={14} bold color={C.voltage}>Voltage (E)</T>
      <T x={20} y={286} size={12.5} color={C.muted}>maximum at the ends, zero in the middle</T>
      <Ln x1={x0} y1={wy + 66} x2={x1} y2={wy + 66} color={C.muted} width={1.5} arrow="both" dash="4 4" />
      <T x={320} y={wy + 82} anchor="middle" size={13} color={C.muted}>½ wavelength</T>
    </Diagram>
  )
}
