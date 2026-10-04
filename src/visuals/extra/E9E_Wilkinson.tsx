import { C, Box, Diagram, Ln, Resistor, T } from '../kit'


/** Wilkinson power divider: two quarter-wave sections split power equally and keep 50 ohms at every port. */
export function Wilkinson() {
  const y1 = 70, y2 = 190, jx = 130
  return (
    <Diagram w={640} h={270} title="Wilkinson power divider: a 50 ohm input splits into two quarter-wave 70.7 ohm sections feeding two 50 ohm loads, with a resistor between the outputs. Each load gets half the power and the input still sees 50 ohms."
      caption="Each 50 Ω load, seen through a ¼ λ 70.7 Ω section, looks like 100 Ω. Two 100 Ω in parallel make 50 Ω.">
      <Box x={14} y={106} w={86} h={48} label="Input" sub="50 Ω" color={C.ink} />
      <Ln x1={100} y1={130} x2={jx} y2={130} color={C.ink} width={5} />
      <Ln x1={jx} y1={y1} x2={jx} y2={y2} color={C.ink} width={5} />
      <circle cx={jx} cy={130} r={5} fill={C.ink} />
      {[y1, y2].map((y) => (
        <g key={y}>
          <rect x={jx} y={y - 17} width={200} height={34} rx={6} fill={C.fill2} stroke={C.power} strokeWidth={3} />
          <T x={jx + 100} y={y} anchor="middle" size={13} bold color={C.power}>¼ λ, 70.7 Ω</T>
          <Ln x1={jx + 200} y1={y} x2={470} y2={y} color={C.ink} width={5} />
        </g>
      ))}
      <Box x={500} y={y1 - 24} w={126} h={48} label="Output 1" sub="50 Ω load" color={C.good} />
      <Box x={500} y={y2 - 24} w={126} h={48} label="Output 2" sub="50 Ω load" color={C.good} />
      <Ln x1={430} y1={y1} x2={430} y2={y2} color={C.ink} width={3} />
      <rect x={414} y={104} width={32} height={52} fill={C.bg} />
      <Resistor x={430} y={130} rot={90} len={52} />
      <T x={456} y={130} size={12} bold color={C.resist}>resistor between</T>
      <T x={456} y={148} size={12} bold color={C.resist}>the outputs</T>
      <T x={14} y={236} size={13} bold color={C.good}>equal split, 50 Ω everywhere</T>
    </Diagram>
  )
}
