import { C, Diagram, Lines, T, Wire, Resistor, Inductor, Capacitor } from '../kit'

const FX0 = 360, FX1 = 620, FY0 = 280, FY1 = 150
const lx = (u: number) => FX0 + ((Math.log10(u) + 1) / 1.6) * (FX1 - FX0)
const reactance = (u: number) => Math.abs(u / (1 - u * u))
const ly = (x: number) => FY0 - ((Math.min(Math.log10(x), 1.1) + 1.2) / 2.3) * (FY0 - FY1)
const seg = (a: number, b: number) => {
  const pts: string[] = []
  for (let k = 0; k <= 60; k++) {
    const u = a * Math.pow(b / a, k / 60)
    pts.push(`${lx(u).toFixed(1)},${ly(reactance(u)).toFixed(1)}`)
  }
  return pts.join(' ')
}

/** Real parts carry unwanted extras: a wire-wound resistor is a coil, and a coil has turn-to-turn capacitance. */
export function RealParts() {
  return (
    <Diagram w={640} h={330} title="Left: a wire-wound resistor behaves like a resistor in series with an unwanted inductor. Right: an inductor has a little capacitance across it, so its reactance rises up to its self-resonant frequency, then it behaves like a capacitor."
      caption="Real parts have hidden extras. At RF they start to matter.">
      <T x={150} y={20} anchor="middle" bold size={15}>Wire-wound resistor</T>
      <Wire pts={[[24, 100], [60, 100]]} color={C.muted} width={2.5} />
      <Resistor x={95} y={100} len={70} color={C.resist} />
      <Wire pts={[[130, 100], [175, 100]]} color={C.muted} width={2.5} />
      <Inductor x={210} y={100} len={70} color={C.bad} />
      <Wire pts={[[245, 100], [276, 100]]} color={C.muted} width={2.5} />
      <T x={95} y={72} anchor="middle" size={13} bold color={C.resist}>wanted R</T>
      <T x={210} y={72} anchor="middle" size={13} bold color={C.bad}>unwanted L</T>
      <Lines x={150} y={152} anchor="middle" size={13} lh={20} lines={['It is a long wire wound in a coil.', 'The coil adds inductance, so at RF', 'the circuit acts unpredictably.']} />
      <line x1={320} y1={30} x2={320} y2={310} stroke={C.fill2} strokeWidth={2} strokeDasharray="4 5" />

      <T x={490} y={20} anchor="middle" bold size={15}>Inductor past self-resonance</T>
      <Wire pts={[[400, 92], [430, 92]]} color={C.muted} width={2.5} />
      <Inductor x={470} y={92} len={80} />
      <Wire pts={[[510, 92], [540, 92]]} color={C.muted} width={2.5} />
      <Wire pts={[[430, 92], [430, 62], [455, 62]]} color={C.bad} width={2.2} />
      <Wire pts={[[485, 62], [510, 62], [510, 92]]} color={C.bad} width={2.2} />
      <Capacitor x={470} y={62} len={30} color={C.bad} />
      <T x={552} y={62} size={12} bold color={C.bad}>stray C</T>
      <T x={552} y={92} size={12} bold>coil L</T>

      <Wire pts={[[FX0, FY0], [FX1, FY0]]} color={C.muted} width={2} />
      <Wire pts={[[FX0, FY0], [FX0, FY1 - 10]]} color={C.muted} width={2} />
      <polyline points={seg(0.1, 0.93)} fill="none" stroke={C.power} strokeWidth={3} />
      <polyline points={seg(1.08, 4)} fill="none" stroke={C.current} strokeWidth={3} />
      <line x1={lx(1)} y1={FY0} x2={lx(1)} y2={FY1 - 6} stroke={C.ink} strokeWidth={1.5} strokeDasharray="4 4" />
      <T x={lx(1)} y={FY0 + 14} anchor="middle" size={12} bold>self-resonant</T>
      <T x={lx(0.3)} y={FY1 + 38} anchor="middle" size={13} bold color={C.power}>acts as inductor</T>
      <T x={FX1} y={FY0 - 24} anchor="end" size={13} bold color={C.current}>acts as capacitor</T>
      <T x={FX0 + 8} y={FY1 - 8} anchor="start" size={12} color={C.muted}>reactance</T>
      <T x={FX1} y={FY0 + 34} anchor="end" size={12} color={C.muted}>frequency →</T>
    </Diagram>
  )
}
