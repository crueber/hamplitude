import { C, Diagram, Ln, T, Wire, Capacitor, Inductor, TAU, useTime } from '../kit'

/** LC resonance: energy slides back and forth between capacitor (electric field) and inductor (magnetic field). */
export function Resonance() {
  const { t, ref, reduced } = useTime(1)
  const ph = reduced ? 0 : TAU * t * 0.25
  const eC = Math.cos(ph) ** 2 // capacitor energy
  const eL = 1 - eC // inductor energy
  const loop: [number, number][] = [[70, 70], [290, 70], [290, 230], [70, 230], [70, 70]]
  const perim = 220 + 160 + 220 + 160
  const n = 12
  const shift = 46 * Math.sin(ph)
  const dots = Array.from({ length: n }, (_, k) => {
    let d = (((k / n) * perim + shift) % perim + perim) % perim
    for (let s = 0; s < 4; s++) {
      const [ax, ay] = loop[s]
      const [bx, by] = loop[s + 1]
      const len = Math.hypot(bx - ax, by - ay)
      if (d <= len) return { x: ax + ((bx - ax) * d) / len, y: ay + ((by - ay) * d) / len }
      d -= len
    }
    return { x: 70, y: 70 }
  }).filter((p) => !(p.x === 70 && p.y > 108 && p.y < 192) && !(p.x === 290 && p.y > 105 && p.y < 195))
  const bar = (x: number, label: string, v: number, col: string) => (
    <g>
      <rect x={x} y={70} width={60} height={160} rx={6} fill={C.fill} />
      <rect x={x} y={230 - 160 * v} width={60} height={160 * v} rx={6} fill={col} opacity={0.85} />
      <T x={x + 30} y={252} anchor="middle" size={13} bold>{label}</T>
    </g>
  )
  return (
    <Diagram w={640} h={290} svgRef={ref} title="An inductor and a capacitor connected in a loop form a resonant circuit. Energy swings back and forth between the capacitor's electric field and the inductor's magnetic field."
      caption="Like a swing: energy moves back and forth at one natural rate, the resonant frequency.">
      <Wire pts={loop} color={C.muted} width={2.5} />
      <rect x={54} y={110} width={32} height={80} fill={C.bg} />
      <Capacitor x={70} y={150} rot={90} len={80} />
      <rect x={274} y={104} width={32} height={92} fill={C.bg} />
      <Inductor x={290} y={150} rot={90} len={80} />
      {dots.map((d, k) => <circle key={k} cx={d.x} cy={d.y} r={4.5} fill={C.current} opacity={0.9} />)}
      <T x={44} y={150} anchor="end" bold size={14}>C</T>
      <T x={316} y={150} bold size={14}>L</T>
      <T x={180} y={150} anchor="middle" size={13} color={C.muted}>current slides to and fro</T>
      <Ln x1={130} y1={168} x2={230} y2={168} color={C.current} width={2} arrow="both" />
      <T x={500} y={34} anchor="middle" bold size={15}>Where the energy is</T>
      {bar(405, 'Capacitor', eC, C.voltage)}
      {bar(505, 'Inductor', eL, C.current)}
      <T x={405} y={270} size={12} color={C.muted}>electric field</T>
      <T x={505} y={270} size={12} color={C.muted}>magnetic field</T>
    </Diagram>
  )
}
