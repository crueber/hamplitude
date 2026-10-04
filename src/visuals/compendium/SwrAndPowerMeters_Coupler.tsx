import { C, Diagram, Ln, T } from '../kit'

/** How an in-line SWR/power meter works: a coupled line samples the forward wave at one end and the reflected wave at the other. */
export function SwrAndPowerMeters_Coupler() {
  const LY = 96, CY = 168
  return (
    <Diagram w={640} h={344}
      title="Inside an in-line SWR meter: the transmitter's power travels along the line to the antenna. A short coupled line beside it has one detector that responds to the forward wave and one that responds to the wave reflected back. Two meter readings, forward 100 watts and reflected 4 watts, give an SWR of 1.5."
      caption="The meter takes a tiny sample of each wave and never absorbs real power. SWR comes from the ratio of the two.">
      <rect x={10} y={66} width={92} height={60} rx={10} fill={C.fill} stroke={C.ink} strokeWidth={2} />
      <T x={56} y={96} anchor="middle" size={13} bold>Transmitter</T>
      <rect x={538} y={66} width={92} height={60} rx={10} fill={C.fill} stroke={C.ink} strokeWidth={2} />
      <T x={584} y={96} anchor="middle" size={13} bold>Antenna</T>
      <Ln x1={102} y1={LY} x2={538} y2={LY} color={C.ink} width={5} />
      <T x={320} y={52} anchor="middle" size={13} bold color={C.muted}>feed line</T>
      <Ln x1={160} y1={LY - 16} x2={230} y2={LY - 16} color={C.good} width={3} arrow />
      <T x={195} y={LY - 30} anchor="middle" size={12} bold color={C.good}>forward 100 W</T>
      <Ln x1={480} y1={LY + 22} x2={410} y2={LY + 22} color={C.bad} width={3} arrow />
      <T x={445} y={LY + 38} anchor="middle" size={12} bold color={C.bad}>reflected 4 W</T>
      <Ln x1={250} y1={CY} x2={390} y2={CY} color={C.power} width={4} />
      <Ln x1={250} y1={LY + 6} x2={250} y2={CY} color={C.power} width={1.5} dash="3 4" />
      <Ln x1={390} y1={LY + 6} x2={390} y2={CY} color={C.power} width={1.5} dash="3 4" />
      <T x={320} y={CY + 18} anchor="middle" size={12} color={C.power} bold>coupled line (a small sample)</T>
      <Ln x1={250} y1={CY} x2={168} y2={CY} color={C.power} width={2.5} />
      <Ln x1={390} y1={CY} x2={472} y2={CY} color={C.power} width={2.5} />
      <rect x={90} y={CY - 24} width={78} height={48} rx={8} fill={C.fill} stroke={C.good} strokeWidth={2} />
      <T x={129} y={CY - 6} anchor="middle" size={12.5} bold color={C.good}>forward</T>
      <T x={129} y={CY + 10} anchor="middle" size={12} color={C.muted}>detector</T>
      <rect x={472} y={CY - 24} width={78} height={48} rx={8} fill={C.fill} stroke={C.bad} strokeWidth={2} />
      <T x={511} y={CY - 6} anchor="middle" size={12.5} bold color={C.bad}>reflected</T>
      <T x={511} y={CY + 10} anchor="middle" size={12} color={C.muted}>detector</T>
      <Ln x1={129} y1={CY + 24} x2={129} y2={236} color={C.good} width={2.5} arrow />
      <Ln x1={511} y1={CY + 24} x2={511} y2={236} color={C.bad} width={2.5} arrow />
      <rect x={74} y={240} width={110} height={34} rx={8} fill={C.fill} stroke={C.good} strokeWidth={2} />
      <T x={129} y={257} anchor="middle" size={14} bold mono color={C.good}>100 W</T>
      <rect x={456} y={240} width={110} height={34} rx={8} fill={C.fill} stroke={C.bad} strokeWidth={2} />
      <T x={511} y={257} anchor="middle" size={14} bold mono color={C.bad}>4 W</T>
      <T x={320} y={304} anchor="middle" size={13.5} bold>SWR = (1 + √(Pr ÷ Pf)) ÷ (1 − √(Pr ÷ Pf))</T>
      <T x={320} y={326} anchor="middle" size={13} color={C.muted}>√(4 ÷ 100) = 0.2, so SWR = 1.2 ÷ 0.8 = 1.5 : 1</T>
    </Diagram>
  )
}
