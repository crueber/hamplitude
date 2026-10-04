import { C, Diagram, Ln, T } from '../kit'

/** Tower climbing: trained, harness and tie-off at all times, helper on the ground. */
export function ClimbRules() {
  const gx = 120, top = 40, gy = 270
  const rungs = Array.from({ length: 8 }, (_, i) => top + 20 + i * 28)
  return (
    <Diagram w={640} h={320} title="Tower climbing: be trained, wear an approved harness and stay tied off at all times, and never climb without a helper watching from the ground"
      caption="All three, every climb. A crank-up tower is climbed only when retracted or locked.">
      {/* tower */}
      <Ln x1={gx - 30} y1={gy} x2={gx - 14} y2={top} color={C.ink} width={5} />
      <Ln x1={gx + 30} y1={gy} x2={gx + 14} y2={top} color={C.ink} width={5} />
      {rungs.map((y, i) => {
        const half = 14 + ((y - top) / (gy - top)) * 16
        return <Ln key={i} x1={gx - half} y1={y} x2={gx + half} y2={y} color={C.muted} width={3} />
      })}
      <Ln x1={80} y1={gy} x2={560} y2={gy} color={C.muted} width={4} />
      {/* climber */}
      <circle cx={gx} cy={96} r={9} fill={C.fill2} stroke={C.ink} strokeWidth={3} />
      <Ln x1={gx} y1={105} x2={gx} y2={140} color={C.ink} width={5} />
      <Ln x1={gx} y1={114} x2={gx - 16} y2={130} color={C.ink} width={4} />
      <Ln x1={gx} y1={114} x2={gx + 16} y2={102} color={C.ink} width={4} />
      <Ln x1={gx} y1={140} x2={gx - 8} y2={166} color={C.ink} width={4} />
      <Ln x1={gx} y1={140} x2={gx + 8} y2={166} color={C.ink} width={4} />
      <rect x={gx - 8} y={120} width={16} height={8} rx={2} fill={C.resist} />
      <path d={`M${gx + 8},124 C${gx + 40},124 ${gx + 40},${top + 20} ${gx + 22},${top + 20}`} fill="none" stroke={C.resist} strokeWidth={3} strokeLinecap="round" />
      {/* helper */}
      <circle cx={300} cy={222} r={9} fill={C.fill2} stroke={C.ink} strokeWidth={3} />
      <Ln x1={300} y1={231} x2={300} y2={254} color={C.ink} width={5} />
      <Ln x1={300} y1={254} x2={292} y2={270} color={C.ink} width={4} />
      <Ln x1={300} y1={254} x2={308} y2={270} color={C.ink} width={4} />
      <Ln x1={300} y1={238} x2={318} y2={220} color={C.ink} width={4} />
      <Ln x1={270} y1={214} x2={176} y2={170} color={C.signal} width={2} dash="3 5" arrow />
      {/* rules */}
      {[
        { y: 56, n: '1', t: 'Be trained', s: 'in safe climbing technique', c: C.power },
        { y: 124, n: '2', t: 'Harness + tie-off', s: 'approved harness, tied off at all times', c: C.resist },
        { y: 192, n: '3', t: 'Never climb alone', s: 'a helper or observer, every time', c: C.signal },
      ].map((r) => (
        <g key={r.n}>
          <circle cx={370} cy={r.y} r={15} fill={r.c} />
          <T x={370} y={r.y} anchor="middle" size={16} bold color={C.bg}>{r.n}</T>
          <T x={396} y={r.y - 9} size={16} bold color={r.c}>{r.t}</T>
          <T x={396} y={r.y + 12} size={13} color={C.muted}>{r.s}</T>
        </g>
      ))}
      <T x={300} y={296} anchor="middle" size={13} bold color={C.signal}>helper</T>
      <T x={gx} y={gy + 22} anchor="middle" size={13} color={C.muted}>tower</T>
    </Diagram>
  )
}
