import { C, Diagram, T, Wire, Battery, Resistor, useTime } from '../kit'

type Pt = [number, number]

/** Points moving at constant speed around a closed polyline loop. */
function loopDots(loop: Pt[], n: number, t: number, speed: number, color: string, r = 4.5) {
  const segs = loop.map((p, i) => {
    const q = loop[(i + 1) % loop.length]
    return { a: p, b: q, len: Math.hypot(q[0] - p[0], q[1] - p[1]) }
  })
  const perim = segs.reduce((s, g) => s + g.len, 0)
  return Array.from({ length: n }, (_, k) => {
    let d = ((((k / n) * perim + t * speed) % perim) + perim) % perim
    for (const g of segs) {
      if (d <= g.len) {
        return <circle key={k} cx={g.a[0] + ((g.b[0] - g.a[0]) * d) / g.len} cy={g.a[1] + ((g.b[1] - g.a[1]) * d) / g.len} r={r} fill={color} />
      }
      d -= g.len
    }
    return null
  })
}

/** The water-pipe analogy: pump = voltage, flow = current, narrow pipe = resistance, drawn beside the real circuit. */
export function VoltageCurrentResistance_WaterPipe() {
  const { t, ref } = useTime(1)
  const waterLoop: Pt[] = [[60, 80], [260, 80], [260, 230], [60, 230]]
  const elecLoop: Pt[] = [[380, 80], [580, 80], [580, 230], [380, 230]]
  return (
    <Diagram w={640} h={330} svgRef={ref}
      title="Water analogy: a pump pushes water around a pipe loop with a narrow section, like a battery pushing current through a resistor. Pump pressure is voltage, flow rate is current, the narrow pipe is resistance."
      caption="Same loop, two kinds of flow. Pressure ↔ voltage, flow rate ↔ current, narrow pipe ↔ resistance.">
      <T x={160} y={20} anchor="middle" bold size={16}>Water</T>
      <T x={480} y={20} anchor="middle" bold size={16}>Electricity</T>
      <line x1={320} y1={40} x2={320} y2={290} stroke={C.fill2} strokeWidth={2} strokeDasharray="4 6" strokeLinecap="round" />

      {/* water loop: pipe */}
      <polyline points={[...waterLoop, waterLoop[0]].map((p) => p.join(',')).join(' ')} fill="none" stroke={C.fill2} strokeWidth={16} strokeLinejoin="round" />
      {/* constriction on the right-hand pipe */}
      <rect x={246} y={140} width={28} height={60} fill={C.bg} />
      <polygon points="251,124 269,124 264,146 264,194 269,216 251,216 256,194 256,146" fill={C.fill} stroke={C.resist} strokeWidth={2.5} strokeLinejoin="round" />
      {loopDots(waterLoop, 14, t, 40, C.current)}
      {/* pump */}
      <circle cx={60} cy={180} r={28} fill={C.fill} stroke={C.voltage} strokeWidth={3} />
      <T x={60} y={180} anchor="middle" bold size={13} color={C.voltage}>pump</T>

      {/* electrical loop */}
      <Wire pts={[...elecLoop, elecLoop[0]]} color={C.muted} width={2.5} />
      {loopDots(elecLoop, 14, t, 40, C.current)}
      <rect x={364} y={146} width={32} height={68} fill={C.bg} />
      <Battery x={380} y={180} rot={90} len={70} color={C.voltage} />
      <rect x={564} y={136} width={32} height={90} fill={C.bg} />
      <Resistor x={580} y={180} rot={90} len={90} color={C.resist} />

      {/* labels, water */}
      <T x={160} y={106} anchor="middle" size={13} bold color={C.current}>flow rate</T>
      <T x={150} y={180} anchor="middle" size={13} color={C.voltage} bold>pressure</T>
      <T x={150} y={198} anchor="middle" size={12} color={C.muted}>from the pump</T>
      <T x={236} y={140} anchor="end" size={13} bold color={C.resist}>narrow pipe →</T>
      {/* labels, electrical */}
      <T x={480} y={106} anchor="middle" size={13} bold color={C.current}>current</T>
      <T x={470} y={180} anchor="middle" size={13} color={C.voltage} bold>voltage</T>
      <T x={470} y={198} anchor="middle" size={12} color={C.muted}>from the battery</T>
      <T x={556} y={140} anchor="end" size={13} bold color={C.resist}>resistor →</T>
      <T x={160} y={304} anchor="middle" size={12} color={C.muted}>litres per second</T>
      <T x={480} y={304} anchor="middle" size={12} color={C.muted}>amperes (coulombs per second)</T>
    </Diagram>
  )
}
