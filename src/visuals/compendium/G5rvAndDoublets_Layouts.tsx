import { C, Box, Diagram, Ln, T } from '../kit'

/** G5RV (fixed dimensions, ladder-line section, balun, coax) beside a doublet (any flat top, ladder line to a tuner). */
export function G5rvAndDoublets_Layouts() {
  const wy = 80
  return (
    <Diagram w={640} h={360}
      title="Two open-wire-fed wire antennas. G5RV: a 102 foot flat top fed through about 34 feet of open-wire line to a balun and then coax. Doublet: a center-fed flat top fed with open-wire line of any convenient length straight to a tuner."
      caption="Both are center-fed wires. The G5RV's dimensions are fixed by design; a doublet's feed line simply runs to a tuner.">
      <T x={160} y={20} anchor="middle" size={15} bold>G5RV</T>
      <T x={480} y={20} anchor="middle" size={15} bold>Doublet</T>
      {/* G5RV */}
      <Ln x1={20} y1={wy} x2={300} y2={wy} color={C.resist} width={5} />
      <circle cx={160} cy={wy} r={7} fill={C.bg} stroke={C.power} strokeWidth={3} />
      <Ln x1={20} y1={wy - 22} x2={300} y2={wy - 22} color={C.muted} width={1.5} arrow="both" />
      <T x={160} y={wy - 38} anchor="middle" size={13} bold color={C.muted}>flat top: 102 ft (31 m)</T>
      <Ln x1={156} y1={wy + 7} x2={156} y2={216} color={C.power} width={2.5} />
      <Ln x1={164} y1={wy + 7} x2={164} y2={216} color={C.power} width={2.5} />
      <T x={176} y={150} size={13} bold color={C.power}>open-wire line</T>
      <T x={176} y={170} size={12} color={C.muted}>about 34 ft (10.4 m)</T>
      <Box x={122} y={216} w={76} h={30} label="balun" color={C.ink} size={13} r={6} />
      <Ln x1={160} y1={246} x2={160} y2={318} color={C.signal} width={4} />
      <T x={172} y={282} size={13} bold color={C.signal}>coax, any length</T>
      <T x={160} y={338} anchor="middle" size={12} color={C.muted}>usually with a tuner at the radio</T>
      <Ln x1={320} y1={34} x2={320} y2={346} color={C.fill2} width={2} dash="4 5" />
      {/* doublet */}
      <Ln x1={340} y1={wy} x2={620} y2={wy} color={C.resist} width={5} />
      <circle cx={480} cy={wy} r={7} fill={C.bg} stroke={C.power} strokeWidth={3} />
      <Ln x1={340} y1={wy - 22} x2={620} y2={wy - 22} color={C.muted} width={1.5} arrow="both" />
      <T x={480} y={wy - 38} anchor="middle" size={13} bold color={C.muted}>flat top: at least ½ λ on the lowest band</T>
      <Ln x1={476} y1={wy + 7} x2={476} y2={236} color={C.power} width={2.5} />
      <Ln x1={484} y1={wy + 7} x2={484} y2={236} color={C.power} width={2.5} />
      <T x={496} y={150} size={13} bold color={C.power}>open-wire line</T>
      <T x={496} y={170} size={12} color={C.muted}>any convenient length</T>
      <Box x={390} y={236} w={180} h={50} label="tuner" sub="balanced output or balun" color={C.ink} size={14} />
      <Ln x1={480} y1={286} x2={480} y2={318} color={C.signal} width={4} />
      <T x={492} y={304} size={13} bold color={C.signal}>short coax jumper</T>
      <T x={480} y={338} anchor="middle" size={12} color={C.muted}>to the radio</T>
    </Diagram>
  )
}
