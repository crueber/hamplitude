import { Capacitor, C, Diagram, Inductor, Ln, T } from '../kit'

/** A transmission line as a ladder of series inductance and shunt capacitance; Z0 = sqrt(L/C). */
export function CharacteristicImpedance_Ladder() {
  const top = 78, bot = 156, x0 = 40, x1 = 560
  const secs = [0, 1, 2, 3].map((k) => 90 + k * 118)
  return (
    <Diagram w={640} h={332}
      title="A transmission line modelled as a ladder of small series inductors and shunt capacitors. The ratio of voltage to current of a wave travelling on it is the square root of L over C, called the characteristic impedance. A line of any length ending in that impedance behaves like a resistor of that value."
      caption="Every stretch of line has a little inductance (series) and capacitance (shunt). Their ratio, not any resistance, sets Z0.">
      <T x={20} y={20} size={14} bold>Every stretch of line is a tiny series L and a tiny shunt C</T>
      <Ln x1={x0} y1={bot} x2={x1 + 30} y2={bot} color={C.ink} width={2.2} />
      <Ln x1={x0} y1={top} x2={secs[0] - 35} y2={top} color={C.ink} width={2.2} />
      {secs.map((xi, k) => (
        <g key={xi}>
          <Inductor x={xi} y={top} len={70} color={C.power} />
          <Ln x1={xi + 35} y1={top} x2={k < 3 ? secs[k + 1] - 35 : x1 + 30} y2={top} color={C.ink} width={2.2} />
          <Capacitor x={xi + 59} y={(top + bot) / 2} rot={90} len={60} color={C.signal} />
          <Ln x1={xi + 59} y1={top} x2={xi + 59} y2={(top + bot) / 2 - 30} color={C.ink} width={2.2} />
          <Ln x1={xi + 59} y1={(top + bot) / 2 + 30} x2={xi + 59} y2={bot} color={C.ink} width={2.2} />
        </g>
      ))}
      <T x={secs[0]} y={top - 26} anchor="middle" size={12.5} bold color={C.power}>series L</T>
      <T x={secs[0] + 59} y={bot + 22} anchor="middle" size={12.5} bold color={C.signal}>shunt C</T>
      <T x={x1 + 38} y={top + 2} size={22} color={C.muted}>…</T>
      <T x={x1 + 4} y={bot + 22} size={12.5} color={C.muted}>and on</T>

      <rect x={20} y={206} width={600} height={54} rx={10} fill={C.fill} stroke={C.power} strokeWidth={2} />
      <T x={320} y={226} anchor="middle" size={18} bold color={C.power}>Z0 = √( L ÷ C )</T>
      <T x={320} y={247} anchor="middle" size={12.5} color={C.muted} mono>e.g. 250 nH/m and 100 pF/m: √(2.5e-7 ÷ 1e-10) = 50 Ω</T>

      <T x={20} y={288} size={13} bold>Line of any length, ending in a load equal to Z0</T>
      <T x={20} y={312} size={13} color={C.muted}>The wave never finds an end, so everything is absorbed and nothing is reflected.</T>
    </Diagram>
  )
}
