import { C, Diagram, Ln, T } from '../kit'

/** An HF CQ: CQ a few times, "this is", call sign a few times, then listen. */
export function G2D_CqCall() {
  const blocks: [string, string, string][] = [
    ['CQ  CQ  CQ', 'a few times', C.current],
    ['this is', 'then', C.muted],
    ['W1AW  W1AW', 'call sign a few times', C.current],
    ['pause', 'listen', C.good],
  ]
  const xs = [14, 192, 304, 520]
  const ws = [168, 104, 208, 106]
  return (
    <Diagram w={640} h={300} title="Calling CQ on HF: say CQ a few times, then this is, then your call sign a few times, then pause and listen. Repeat as necessary. Once someone answers, exchange signal reports first so each station can adapt to conditions" caption="CQ, who you are, then listen. No answer: repeat.">
      {blocks.map(([a, b, col], i) => (
        <g key={a}>
          <rect x={xs[i]} y={30} width={ws[i]} height={70} rx={10} fill={col} fillOpacity={0.16} stroke={col} strokeWidth={2} />
          <T x={xs[i] + ws[i] / 2} y={55} anchor="middle" size={15} bold mono>{a}</T>
          <T x={xs[i] + ws[i] / 2} y={80} anchor="middle" size={12.5} color={C.muted}>{b}</T>
          {i < 3 && <Ln x1={xs[i] + ws[i] + 2} y1={65} x2={xs[i + 1] - 2} y2={65} color={C.ink} width={2.5} arrow />}
        </g>
      ))}
      <path d="M573,100 L573,126 L100,126 L100,104" fill="none" stroke={C.muted} strokeWidth={2} strokeDasharray="6 5" markerEnd="url(#hx-arrow)" />
      <T x={336} y={146} anchor="middle" size={13} color={C.muted}>no answer: repeat as necessary</T>
      <T x={14} y={186} size={14} bold color={C.signal}>Someone answers: swap signal reports first</T>
      <rect x={14} y={206} width={290} height={64} rx={10} fill={C.signal} fillOpacity={0.14} stroke={C.signal} strokeWidth={2} />
      <T x={159} y={226} anchor="middle" size={14} bold>"You are 5 by 9"</T>
      <T x={159} y={250} anchor="middle" size={13} color={C.muted}>how well each hears the other</T>
      <Ln x1={306} y1={238} x2={338} y2={238} color={C.ink} width={2.5} arrow />
      <rect x={340} y={206} width={286} height={64} rx={10} fill={C.good} fillOpacity={0.14} stroke={C.good} strokeWidth={2} />
      <T x={483} y={226} anchor="middle" size={14} bold>Adapt to conditions</T>
      <T x={483} y={250} anchor="middle" size={13} color={C.muted}>each station adjusts to the path</T>
    </Diagram>
  )
}
