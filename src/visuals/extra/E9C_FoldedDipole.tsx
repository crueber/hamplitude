import { C, Diagram, Ln, T } from '../kit'

/** Folded dipole = half-wave dipole plus a parallel wire joining its ends. Current splits between two wires, so feed impedance is about 4× higher. */
export function E9C_FoldedDipole() {
  return (
    <Diagram w={640} h={296} title="Left: an ordinary half-wave dipole, about 72 ohms at the center. Right: a folded dipole, a half-wave dipole with a second wire connecting its two ends, about 300 ohms at the center, roughly four times higher."
      caption="Same radiation, but each wire carries only half the feed current, so the feed point impedance is about four times higher.">
      <T x={150} y={22} anchor="middle" size={14} bold>Half-wave dipole</T>
      <Ln x1={30} y1={110} x2={140} y2={110} color={C.resist} width={5} />
      <Ln x1={160} y1={110} x2={270} y2={110} color={C.resist} width={5} />
      <circle cx={150} cy={110} r={9} fill={C.fill} stroke={C.ink} strokeWidth={2} />
      <Ln x1={80} y1={84} x2={112} y2={84} color={C.current} width={3} arrow />
      <T x={96} y={68} anchor="middle" size={13} bold color={C.current}>I</T>
      <T x={150} y={150} anchor="middle" size={13} color={C.muted}>feed point</T>
      <T x={150} y={208} anchor="middle" size={20} bold color={C.resist}>about 72 Ω</T>

      <T x={490} y={22} anchor="middle" size={14} bold>Folded dipole</T>
      <path d="M350,138 L350,84 L630,84 L630,138" fill="none" stroke={C.resist} strokeWidth={5} strokeLinejoin="round" strokeLinecap="round" />
      <Ln x1={350} y1={138} x2={480} y2={138} color={C.resist} width={5} />
      <Ln x1={500} y1={138} x2={630} y2={138} color={C.resist} width={5} />
      <circle cx={490} cy={138} r={9} fill={C.fill} stroke={C.ink} strokeWidth={2} />
      <Ln x1={410} y1={64} x2={450} y2={64} color={C.current} width={3} arrow />
      <T x={430} y={46} anchor="middle" size={13} bold color={C.current}>I ÷ 2</T>
      <Ln x1={410} y1={160} x2={450} y2={160} color={C.current} width={3} arrow />
      <T x={430} y={178} anchor="middle" size={13} bold color={C.current}>I ÷ 2</T>
      <T x={490} y={112} anchor="middle" size={13} color={C.muted}>second wire joins the ends</T>
      <T x={490} y={208} anchor="middle" size={20} bold color={C.resist}>about 300 Ω</T>
      <rect x={110} y={240} width={420} height={40} rx={10} fill={C.fill} />
      <T x={320} y={260} anchor="middle" size={14}>half the current for the same power → 4 × 72 ≈ 300 Ω</T>
    </Diagram>
  )
}
