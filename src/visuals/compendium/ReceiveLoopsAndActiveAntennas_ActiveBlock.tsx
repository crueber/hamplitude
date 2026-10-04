import { C, Box, Diagram, Ln, T } from '../kit'

/** Active whip: a very short probe feeds a high-impedance buffer at the antenna; one coax carries the signal down and DC power up. */
export function ReceiveLoopsAndActiveAntennas_ActiveBlock() {
  const cy = 118
  return (
    <Diagram w={640} h={256}
      title="An active receiving antenna: a short whip feeds a high-input-impedance amplifier mounted at the antenna. A single coax carries the signal to the shack and DC power from a bias tee back up to the amplifier"
      caption="The amplifier sits at the antenna so the whip's very high impedance is converted to 50 Ω before the coax.">
      <rect x={14} y={34} width={290} height={196} rx={12} fill="none" stroke={C.muted} strokeWidth={1.5} strokeDasharray="6 5" />
      <T x={26} y={52} size={12} bold color={C.muted}>at the antenna</T>
      <rect x={326} y={34} width={300} height={196} rx={12} fill="none" stroke={C.muted} strokeWidth={1.5} strokeDasharray="6 5" />
      <T x={338} y={52} size={12} bold color={C.muted}>in the shack</T>
      {/* whip */}
      <Ln x1={60} y1={cy} x2={60} y2={cy - 52} color={C.ink} width={4} />
      <Ln x1={60} y1={cy} x2={104} y2={cy} color={C.ink} width={3} />
      <T x={24} y={cy + 34} size={12} bold color={C.ink}>short whip:</T>
      <T x={24} y={cy + 52} size={12} color={C.muted}>a tiny capacitor,</T>
      <T x={24} y={cy + 68} size={12} color={C.muted}>very high Z</T>
      {/* amplifier */}
      <path d={`M104,${cy - 28} L104,${cy + 28} L186,${cy} Z`} fill={C.fill} stroke={C.power} strokeWidth={3} strokeLinejoin="round" />
      <T x={145} y={cy - 46} anchor="middle" size={12} bold color={C.power}>buffer amplifier</T>
      <T x={165} y={cy + 46} anchor="middle" size={12} color={C.muted}>high Z in,</T>
      <T x={165} y={cy + 62} anchor="middle" size={12} color={C.muted}>50 Ω out</T>
      <Ln x1={186} y1={cy} x2={400} y2={cy} color={C.ink} width={4} />
      <Ln x1={226} y1={cy - 16} x2={290} y2={cy - 16} color={C.good} width={3} arrow />
      <Ln x1={290} y1={cy + 16} x2={226} y2={cy + 16} color={C.voltage} width={3} arrow />
      <T x={260} y={cy - 32} anchor="middle" size={12} bold color={C.good}>RF down</T>
      <T x={260} y={cy + 34} anchor="middle" size={12} bold color={C.voltage}>DC power up</T>
      {/* bias tee */}
      <Box x={400} y={cy - 28} w={84} h={56} label="Bias tee" size={13} color={C.voltage} />
      <Ln x1={442} y1={cy - 28} x2={442} y2={cy - 58} color={C.voltage} width={3} />
      <T x={454} y={cy - 56} size={12} bold color={C.voltage}>DC supply</T>
      <Ln x1={484} y1={cy} x2={524} y2={cy} color={C.ink} width={4} />
      <Box x={524} y={cy - 28} w={90} h={56} label="Receiver" size={13} color={C.ink} />
      {/* note */}
      <rect x={338} y={178} width={276} height={44} rx={8} fill={C.fill} />
      <T x={352} y={194} size={12} color={C.muted}>Example: 10 pF at 7 MHz is about 2.3 kΩ</T>
      <T x={352} y={211} size={12} color={C.muted}>(typical, illustrative), far from 50 Ω</T>
    </Diagram>
  )
}
