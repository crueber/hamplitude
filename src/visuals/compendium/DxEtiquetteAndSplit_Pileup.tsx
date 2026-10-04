import { C, Diagram, Ln, T } from '../kit'

const HS = [30, 48, 22, 56, 36, 62, 26, 44, 34, 52, 24, 40]

/** A split pile-up: the DX transmits on f and listens higher; your radio receives on f and transmits in the window. */
export function DxEtiquetteAndSplit_Pileup() {
  const axisY = 172
  return (
    <Diagram w={640} h={404}
      title="A split pile-up on a frequency axis. The DX station transmits on frequency f. It listens in a window a few kilohertz higher, where many callers spread out. Your radio receives on f and transmits in the listening window. Below: the habits that make a pile-up work."
      caption="Illustrative and not to scale. Offsets vary: the DX station announces where it is listening.">
      <Ln x1={24} y1={axisY} x2={620} y2={axisY} color={C.muted} width={2.5} />
      <T x={620} y={axisY + 56} anchor="end" size={12.5} color={C.muted}>frequency →</T>
      {/* DX transmit */}
      <Ln x1={96} y1={axisY} x2={96} y2={58} color={C.signal} width={6} />
      <T x={96} y={38} anchor="middle" size={14} bold color={C.signal}>DX transmits</T>
      <T x={96} y={axisY + 18} anchor="middle" size={13} bold>f</T>
      <T x={96} y={axisY + 38} anchor="middle" size={12.5} color={C.muted}>you listen here</T>
      <T x={96} y={axisY + 56} anchor="middle" size={12.5} bold color={C.bad}>do not call here</T>
      {/* callers */}
      {HS.map((h, i) => <Ln key={i} x1={332 + i * 20} y1={axisY} x2={332 + i * 20} y2={axisY - h} color={C.voltage} width={5} />)}
      <rect x={318} y={76} width={256} height={axisY - 70} rx={8} fill="none" stroke={C.voltage} strokeWidth={2} strokeDasharray="5 5" />
      <T x={446} y={38} anchor="middle" size={14} bold color={C.voltage}>DX listens here</T>
      <T x={446} y={58} anchor="middle" size={12.5} color={C.muted}>"up 3 to 10", for example</T>
      <T x={318} y={axisY + 18} anchor="middle" size={12.5}>f + 3</T>
      <T x={574} y={axisY + 18} anchor="middle" size={12.5}>f + 10 kHz</T>
      <T x={446} y={axisY + 38} anchor="middle" size={12.5} color={C.muted}>callers spread across the window</T>
      <T x={446} y={axisY + 56} anchor="middle" size={12.5} bold color={C.voltage}>you call here</T>
      <Ln x1={112} y1={96} x2={308} y2={96} color={C.muted} width={2} arrow dash="4 5" />
      <T x={210} y={84} anchor="middle" size={12.5} color={C.muted}>"listening up"</T>
      {/* radio */}
      <rect x={20} y={254} width={290} height={136} rx={12} fill={C.fill} stroke={C.signal} strokeWidth={2} />
      <T x={34} y={274} size={13.5} bold>Your radio, split on</T>
      <rect x={34} y={292} width={126} height={64} rx={8} fill={C.bg} stroke={C.signal} strokeWidth={2} />
      <T x={46} y={308} size={12} color={C.muted}>RECEIVE</T>
      <T x={46} y={335} size={17} mono bold color={C.signal}>f</T>
      <rect x={172} y={292} width={126} height={64} rx={8} fill={C.bg} stroke={C.voltage} strokeWidth={2} />
      <T x={184} y={308} size={12} color={C.muted}>TRANSMIT</T>
      <T x={184} y={335} size={17} mono bold color={C.voltage}>f + 7</T>
      {/* habits */}
      <rect x={326} y={254} width={294} height={136} rx={12} fill={C.fill} stroke={C.fill2} strokeWidth={2} />
      <T x={340} y={274} size={13.5} bold color={C.good}>Do</T>
      <T x={340} y={294} size={12.5}>Listen until you know the pattern</T>
      <T x={340} y={312} size={12.5}>Call with your full call sign, once or twice</T>
      <T x={340} y={338} size={13.5} bold color={C.bad}>Don't</T>
      <T x={340} y={358} size={12.5}>Call on the DX frequency, or keep calling</T>
      <T x={340} y={374} size={12.5}>over the contact in progress</T>
    </Diagram>
  )
}
