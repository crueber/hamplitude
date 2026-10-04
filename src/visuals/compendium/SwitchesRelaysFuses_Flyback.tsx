import { C, Diagram, Dot, Ground, Inductor, Diode, Resistor, T, Transistor, Wire, Ln } from '../kit'

/** A relay coil switched by a transistor: the diode across the coil gives the collapsing current somewhere to go. */
export function SwitchesRelaysFuses_Flyback() {
  const gx0 = 360, gx1 = 615, gy0 = 60, gy1 = 238
  const off = 450 // x where the transistor turns off
  return (
    <Diagram w={640} h={300}
      title="A transistor switching a relay coil, with a diode across the coil. When the transistor turns off the coil's current keeps flowing through the diode, so the voltage at the transistor rises only slightly instead of spiking far above the supply."
      caption="Without the diode, the collapsing field drives the transistor's collector many times above the supply. Sketch only: not to scale.">
      <T x={20} y={22} size={14} bold>The circuit</T>
      <T x={gx0} y={22} size={14} bold>Voltage at the transistor</T>

      <Wire pts={[[100, 44], [270, 44]]} />
      <T x={92} y={44} anchor="end" size={13} bold color={C.voltage}>+12 V</T>
      <Wire pts={[[179, 44], [179, 70]]} />
      <rect x={160} y={70} width={38} height={80} fill={C.bg} />
      <Inductor x={179} y={110} rot={90} len={80} color={C.power} />
      <T x={166} y={110} anchor="end" size={13} bold color={C.power}>relay</T>
      <T x={166} y={128} anchor="end" size={13} bold color={C.power}>coil</T>
      <Wire pts={[[179, 150], [179, 180]]} />
      <Wire pts={[[270, 44], [270, 80]]} />
      <Diode x={270} y={110} rot={-90} len={60} color={C.good} />
      <Wire pts={[[270, 140], [270, 180], [179, 180]]} />
      <T x={286} y={100} size={13} bold color={C.good}>flyback</T>
      <T x={286} y={118} size={13} bold color={C.good}>diode</T>
      <Dot x={179} y={44} /><Dot x={270} y={44} /><Dot x={179} y={180} />

      <Transistor x={165} y={220} kind="npn" />
      <Ground x={179} y={268} />
      <Wire pts={[[135, 220], [100, 220]]} />
      <Resistor x={70} y={220} len={60} color={C.resist} />
      <T x={70} y={250} anchor="middle" size={12} color={C.muted}>base resistor</T>
      <T x={22} y={190} size={12} color={C.muted}>control input</T>

      <rect x={gx0} y={gy0} width={gx1 - gx0} height={gy1 - gy0} rx={6} fill={C.fill} />
      <Ln x1={gx0} y1={170} x2={gx1} y2={170} color={C.muted} width={1.5} dash="5 4" />
      <T x={gx0 + 6} y={186} size={12} color={C.muted}>supply (12 V)</T>
      <Ln x1={off} y1={gy0} x2={off} y2={gy1} color={C.muted} width={1} dash="3 4" />
      <T x={off + 6} y={gy1 - 28} size={12} color={C.muted}>transistor</T>
      <T x={off + 6} y={gy1 - 12} size={12} color={C.muted}>turns off</T>
      <polyline points={`${gx0},228 ${off},228 ${off},${gy0 + 8} ${off + 14},170 ${gx1},170`} fill="none" stroke={C.bad} strokeWidth={2.5} strokeLinejoin="round" />
      <polyline points={`${gx0},228 ${off},228 ${off},162 ${off + 12},170 ${gx1},170`} fill="none" stroke={C.good} strokeWidth={2.5} strokeLinejoin="round" />
      <T x={gx0 + 6} y={212} size={12} color={C.muted}>on: near 0 V</T>
      <T x={off + 22} y={gy0 + 14} size={13} bold color={C.bad}>no diode: big spike</T>
      <T x={off + 22} y={146} size={13} bold color={C.good}>with diode: tiny blip</T>
    </Diagram>
  )
}
