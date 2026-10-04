import { C, Diagram, Lines, Ln, T } from '../kit'

function Node({ x, y, w, h, lines, col = C.ink, fill = C.fill }: { x: number; y: number; w: number; h: number; lines: string[]; col?: string; fill?: string }) {
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} rx={10} fill={fill} stroke={col} strokeWidth={2} />
      <Lines x={x + w / 2} y={y + h / 2 - ((lines.length - 1) * 17) / 2} lines={lines} anchor="middle" size={13} bold lh={17} color={C.ink} />
    </g>
  )
}

/** Who must evaluate, how, and what to do with the result. */
export function Evaluation() {
  return (
    <Diagram w={640} h={340} title="Flow: a station over one milliwatt time-averaged is subject to the RF exposure rules. If it fails the exemption criteria it must be evaluated, by OET Bulletin 65 calculation, modeling or calibrated measurement. If the result is over the limit, prevent human exposure."
      caption="Evaluation methods: calculation, modeling, or a calibrated meter with a calibrated antenna.">
      <Node x={20} y={14} w={270} h={58} lines={['Transmits more than 1 mW,', 'time-averaged?']} />
      <Ln x1={290} y1={43} x2={340} y2={43} arrow />
      <T x={315} y={30} anchor="middle" size={13} bold color={C.muted}>No</T>
      <Node x={340} y={14} w={280} h={58} lines={['Not subject to the', 'RF exposure rules']} col={C.good} />
      <Ln x1={155} y1={72} x2={155} y2={112} arrow />
      <T x={169} y={92} size={13} bold color={C.muted}>Yes</T>
      <Node x={20} y={114} w={270} h={58} lines={['Meets the FCC', 'exemption criteria?']} />
      <Ln x1={290} y1={143} x2={340} y2={143} arrow />
      <T x={315} y={130} anchor="middle" size={13} bold color={C.muted}>Yes</T>
      <Node x={340} y={114} w={280} h={58} lines={['No evaluation needed']} col={C.good} />
      <Ln x1={155} y1={172} x2={155} y2={212} arrow />
      <T x={169} y={192} size={13} bold color={C.muted}>No</T>
      <Node x={20} y={214} w={270} h={88} lines={['Evaluate (OET Bulletin 65):', 'calculate, model, or measure', 'with a calibrated field meter', 'and calibrated antenna']} col={C.signal} />
      <Ln x1={290} y1={258} x2={340} y2={258} arrow />
      <Node x={340} y={214} w={280} h={88} lines={['Over the limit?', 'Take action to prevent', 'human exposure', '(keep people out, steer the beam)']} col={C.bad} />
      <T x={320} y={326} anchor="middle" size={13} color={C.muted}>Re-evaluate routinely and after changes.</T>
    </Diagram>
  )
}
