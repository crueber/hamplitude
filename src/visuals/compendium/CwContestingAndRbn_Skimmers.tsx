import { C, Diagram, Ln, T } from '../kit'

const SK = [{ x: 190, y: 40, n: 'skimmer 1' }, { x: 190, y: 104, n: 'skimmer 2' }, { x: 190, y: 168, n: 'skimmer 3' }, { x: 190, y: 232, n: 'skimmer 4' }]

/** Conceptual flow of the Reverse Beacon Network: skimmers hear a CQ, decode it, and publish a spot. */
export function CwContestingAndRbn_Skimmers() {
  return (
    <Diagram w={640} h={290} title="Reverse Beacon Network: your CQ is heard by several volunteer receivers called skimmers. Each decodes the Morse by software and sends a spot containing your call sign, frequency, signal-to-noise ratio and speed to a central server, which publishes it for anyone to see"
      caption="The skimmers are receivers, not transmitters. Which of them hear you is a free report of how far your signal goes.">
      <rect x={14} y={104} width={96} height={86} rx={12} fill={C.fill} stroke={C.signal} strokeWidth={2.2} />
      <T x={62} y={134} anchor="middle" size={14} bold>Your CQ</T>
      <T x={62} y={156} anchor="middle" size={12.5} color={C.muted}>on the air</T>
      <T x={62} y={174} anchor="middle" size={12.5} color={C.muted}>(CW)</T>
      {SK.map((s) => (
        <g key={s.n}>
          <Ln x1={112} y1={147} x2={s.x - 2} y2={s.y + 20} color={C.signal} width={2} dash="6 5" />
          <rect x={s.x} y={s.y} width={116} height={40} rx={9} fill={C.fill} stroke={C.good} strokeWidth={2} />
          <T x={s.x + 58} y={s.y + 14} anchor="middle" size={13} bold>{s.n}</T>
          <T x={s.x + 58} y={s.y + 31} anchor="middle" size={12} color={C.muted}>decodes CW</T>
          <Ln x1={s.x + 118} y1={s.y + 20} x2={338} y2={147} color={C.good} width={2} arrow />
        </g>
      ))}
      <rect x={340} y={110} width={86} height={74} rx={12} fill={C.fill} stroke={C.power} strokeWidth={2.2} />
      <T x={383} y={136} anchor="middle" size={13.5} bold>Network</T>
      <T x={383} y={156} anchor="middle" size={12.5} color={C.muted}>collects</T>
      <T x={383} y={172} anchor="middle" size={12.5} color={C.muted}>spots</T>
      <Ln x1={428} y1={147} x2={448} y2={147} color={C.power} width={2} arrow />
      <rect x={450} y={52} width={178} height={190} rx={10} fill={C.fill} stroke={C.resist} strokeWidth={2.2} />
      <T x={539} y={72} anchor="middle" size={13.5} bold color={C.resist}>A spot says</T>
      <T x={464} y={104} size={13}>Who: call sign</T>
      <T x={464} y={130} size={13}>Where: frequency</T>
      <T x={464} y={156} size={13}>How well: SNR</T>
      <T x={464} y={182} size={13}>How fast: WPM</T>
      <T x={464} y={208} size={13}>Heard by: which skimmer</T>
    </Diagram>
  )
}
