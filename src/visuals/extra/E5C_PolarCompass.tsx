import { C, Diagram, Ln, T } from '../kit'

/** Three pure parts as arrows: rectangular and polar forms side by side. */
export function E5C_PolarCompass() {
  const ox = 150, oy = 150, L = 100
  const rows: [string, string, string, string][] = [
    ['Resistor, 100 Ω', '100 + j0', '100 Ω ∠0°', C.resist],
    ['Inductor, XL 100 Ω', '0 + j100', '100 Ω ∠+90°', C.signal],
    ['Capacitor, XC 100 Ω', '0 − j100', '100 Ω ∠−90°', C.power],
  ]
  return (
    <Diagram w={640} h={300} title="Pure resistance points right at 0 degrees, pure inductive reactance points up at plus 90 degrees, pure capacitive reactance points down at minus 90 degrees."
      caption="The angle is how far the arrow is rotated from the resistance axis.">
      <Ln x1={ox - 110} y1={oy} x2={ox + 125} y2={oy} color={C.fill2} width={2} />
      <Ln x1={ox} y1={oy - 125} x2={ox} y2={oy + 125} color={C.fill2} width={2} />
      <Ln x1={ox} y1={oy} x2={ox + L} y2={oy} color={C.resist} width={4.5} arrow />
      <Ln x1={ox} y1={oy} x2={ox} y2={oy - L} color={C.signal} width={4.5} arrow />
      <Ln x1={ox} y1={oy} x2={ox} y2={oy + L} color={C.power} width={4.5} arrow />
      <T x={ox + L + 10} y={oy - 14} anchor="end" size={13} bold color={C.resist}>0°</T>
      <T x={ox + 10} y={oy - L - 4} size={13} bold color={C.signal}>+90°</T>
      <T x={ox + 10} y={oy + L + 4} size={13} bold color={C.power}>−90°</T>
      <T x={320} y={30} size={13} color={C.muted}>Rectangular  =  polar</T>
      {rows.map(([a, b, c, col], i) => (
        <g key={a}>
          <rect x={320} y={55 + i * 75} width={300} height={62} rx={10} fill={C.fill} stroke={col} strokeWidth={2} />
          <T x={334} y={75 + i * 75} size={13} bold color={col}>{a}</T>
          <T x={334} y={98 + i * 75} size={14} mono>{b} Ω  =  {c}</T>
        </g>
      ))}
    </Diagram>
  )
}
