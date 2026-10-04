import { Battery, C, Diagram, Lines, Ln, Meter, Resistor, T, Wire, useTime } from '../kit'

/** An ohmmeter supplies its own small current, so the circuit must be off. A big discharged capacitor reads rising resistance. */
export function Ohmmeter() {
  const { t, ref } = useTime(0.5)
  const ox = 352, oy = 232, w = 256, h = 150
  const curve = (u: number) => oy - h * (1 - Math.exp(-3.2 * u))
  const pts: string[] = []
  for (let i = 0; i <= 60; i++) pts.push(`${i ? 'L' : 'M'}${(ox + (w * i) / 60).toFixed(1)},${curve(i / 60).toFixed(1)}`)
  const p = Math.min(1, (t * 0.22) % 1.3)
  return (
    <Diagram w={640} h={282} svgRef={ref} title="An ohmmeter has its own battery and pushes a small current through the part, then reads the voltage. The circuit must be unpowered. Across a large discharged capacitor, the resistance reading keeps rising as it charges."
      caption="Left: the ohmmeter makes its own test current. Right: a charging capacitor reads ever-higher resistance.">
      <T x={14} y={20} bold size={14} color={C.bad}>Circuit power must be OFF</T>
      <rect x={14} y={44} width={150} height={104} rx={10} fill={C.fill} stroke={C.ink} strokeWidth={2} />
      <T x={89} y={60} anchor="middle" bold size={13}>Ohmmeter</T>
      <Battery x={54} y={104} len={30} color={C.resist} />
      <T x={54} y={134} anchor="middle" size={12} color={C.muted}>own battery</T>
      <Meter x={124} y={104} len={36} letter="Ω" />
      <Wire pts={[[164, 74], [270, 74], [270, 90]]} color={C.current} />
      <Wire pts={[[164, 134], [270, 134], [270, 128]]} color={C.current} />
      <Resistor x={270} y={109} rot={90} len={60} />
      <T x={296} y={109} bold size={13}>R</T>
      <Ln x1={190} y1={60} x2={250} y2={60} color={C.current} width={2.5} arrow />
      <T x={220} y={46} anchor="middle" size={12} bold color={C.current}>small current</T>
      <Lines x={14} y={186} lines={['The meter pushes a small current', 'through the part and reads the', 'voltage, so any other voltage in', 'the circuit corrupts the reading.']} size={13} lh={20} color={C.ink} />

      <Ln x1={322} y1={20} x2={322} y2={268} color={C.fill2} width={2} />
      <T x={338} y={20} bold size={14}>Ohmmeter on a big discharged capacitor</T>
      <Ln x1={ox} y1={oy} x2={ox + w + 10} y2={oy} color={C.muted} width={2} arrow />
      <Ln x1={ox} y1={oy} x2={ox} y2={oy - h - 30} color={C.muted} width={2} arrow />
      <T x={ox + w + 10} y={oy + 18} anchor="end" size={12} color={C.muted}>time →</T>
      <T x={ox - 6} y={oy - h - 40} size={12} color={C.muted}>resistance reading ↑</T>
      <path d={pts.join('')} fill="none" stroke={C.signal} strokeWidth={3.5} strokeLinecap="round" />
      <circle cx={ox + w * p} cy={curve(p)} r={7} fill={C.signal} stroke={C.bg} strokeWidth={3} />
      <T x={ox + 150} y={oy - 40} anchor="middle" size={13} bold color={C.signal}>keeps rising as it charges</T>
    </Diagram>
  )
}
