import { C, Diagram, Ln, T, Wire, Capacitor, Inductor, Resistor, Ground } from '../kit'

/** The common MMIC amplifier: 50 ohm in and out, DC bias fed to the output lead through a resistor and/or RF choke. */
export function MmicBias() {
  return (
    <Diagram w={640} h={290}
      title="A typical MMIC amplifier. RF enters through a coupling capacitor on a 50 ohm microstrip line and leaves through another. DC supply reaches the output lead through a resistor and RF choke, so RF does not leak into the supply."
      caption="Supply goes in through a resistor and/or RF choke on the output lead. Input and output are 50 Ω.">
      <rect x={14} y={112} width={86} height={18} fill={C.muted} opacity={0.45} />
      <T x={57} y={150} anchor="middle" size={12} bold color={C.muted}>microstrip</T>
      <T x={57} y={168} anchor="middle" size={12} bold color={C.muted}>50 Ω line</T>
      <T x={57} y={96} anchor="middle" size={13} bold>RF in</T>
      <Wire pts={[[100, 121], [140, 121]]} color={C.muted} width={2.5} />
      <rect x={124} y={100} width={32} height={42} fill={C.bg} />
      <Capacitor x={140} y={121} len={28} />
      <Wire pts={[[154, 121], [250, 121]]} color={C.muted} width={2.5} />
      <polygon points="250,86 250,156 330,121" fill={C.fill} stroke={C.ink} strokeWidth={2.5} strokeLinejoin="round" />
      <T x={278} y={121} size={13} bold color={C.muted}>MMIC</T>
      <Wire pts={[[330, 121], [440, 121]]} color={C.muted} width={2.5} />
      <circle cx={380} cy={121} r={3.5} fill={C.ink} />
      <rect x={430} y={100} width={32} height={42} fill={C.bg} />
      <Capacitor x={446} y={121} len={28} />
      <Wire pts={[[460, 121], [540, 121]]} color={C.muted} width={2.5} />
      <rect x={540} y={112} width={86} height={18} fill={C.muted} opacity={0.45} />
      <T x={583} y={96} anchor="middle" size={13} bold>RF out</T>
      <T x={583} y={150} anchor="middle" size={12} bold color={C.muted}>50 Ω line</T>
      <T x={290} y={186} anchor="middle" size={12} color={C.muted}>ground lead to board</T>
      <Wire pts={[[290, 140], [290, 160]]} color={C.muted} width={2.5} />
      <Ground x={290} y={160} />
      <T x={140} y={80} anchor="middle" size={12} color={C.muted}>blocks DC</T>
      <T x={446} y={80} anchor="middle" size={12} color={C.muted}>blocks DC</T>
      {/* bias path to the output lead */}
      <Wire pts={[[380, 121], [380, 250]]} color={C.current} width={2.5} />
      <rect x={364} y={140} width={32} height={40} fill={C.bg} />
      <Inductor x={380} y={160} rot={90} len={40} color={C.current} />
      <rect x={364} y={185} width={32} height={40} fill={C.bg} />
      <Resistor x={380} y={205} rot={90} len={40} color={C.resist} />
      <T x={404} y={160} size={13} bold color={C.current}>RF choke</T>
      <T x={404} y={205} size={13} bold color={C.resist}>resistor</T>
      <T x={404} y={228} size={12} color={C.muted}>(either or both)</T>
      <Ln x1={366} y1={250} x2={394} y2={250} color={C.voltage} width={3} />
      <T x={380} y={268} anchor="middle" size={14} bold color={C.voltage}>+Vcc supply</T>
      <T x={170} y={228} anchor="middle" size={13} bold>MMIC amplifier traits</T>
      <T x={170} y={248} anchor="middle" size={13} color={C.muted}>controlled gain, low noise figure,</T>
      <T x={170} y={266} anchor="middle" size={13} color={C.muted}>constant 50 Ω in and out</T>
    </Diagram>
  )
}
