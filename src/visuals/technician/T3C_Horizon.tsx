import { C, Diagram, Ln, T } from '../kit'

const O: [number, number] = [320, 710]
const R = 520
const yAt = (x: number) => O[1] - Math.sqrt(R * R - (x - O[0]) ** 2)

/** Visual horizon (straight tangent) vs radio horizon (path bent slightly down by the atmosphere). */
export function Horizon() {
  const ax = 120
  const A: [number, number] = [ax, yAt(ax) - 84]
  // tangent point: (P-A)·(P-O) = 0
  const f = (x: number) => {
    const P: [number, number] = [x, yAt(x)]
    return (P[0] - A[0]) * (P[0] - O[0]) + (P[1] - A[1]) * (P[1] - O[1])
  }
  let lo = ax + 1, hi = 560
  for (let i = 0; i < 40; i++) { const m = (lo + hi) / 2; if (f(m) < 0) lo = m; else hi = m }
  const t1x = lo
  const T1: [number, number] = [t1x, yAt(t1x)]
  const t2x = ax + (t1x - ax) * 1.3
  const T2: [number, number] = [t2x, yAt(t2x)]
  const len = Math.hypot(T2[0] - A[0], T2[1] - A[1])
  const ux = (T1[0] - A[0]) / Math.hypot(T1[0] - A[0], T1[1] - A[1])
  const uy = (T1[1] - A[1]) / Math.hypot(T1[0] - A[0], T1[1] - A[1])
  const Q: [number, number] = [A[0] + ux * len * 0.55, A[1] + uy * len * 0.55 - 16]
  const earth = Array.from({ length: 65 }, (_, i) => `${i ? 'L' : 'M'}${i * 10},${yAt(i * 10).toFixed(1)}`).join('') + 'L640,280 L0,280 Z'
  return (
    <Diagram w={640} h={280} title="The visual horizon is a straight tangent line from the antenna to the curved Earth. The atmosphere bends radio waves slightly, so the radio horizon is farther away."
      caption="Exaggerated side view. The atmosphere refracts (bends) radio waves a little.">
      <path d={earth} fill={C.fill} stroke={C.muted} strokeWidth={2} />
      <Ln x1={ax} y1={yAt(ax)} x2={ax} y2={A[1]} color={C.ink} width={4} />
      <T x={ax - 12} y={A[1] - 14} size={14} bold>Your antenna</T>
      <Ln x1={A[0]} y1={A[1]} x2={T1[0]} y2={T1[1]} color={C.ink} width={2.5} dash="6 6" />
      <path d={`M${A[0]},${A[1]} Q${Q[0]},${Q[1]} ${T2[0]},${T2[1]}`} fill="none" stroke={C.signal} strokeWidth={3.5} />
      <circle cx={T1[0]} cy={T1[1]} r={6} fill={C.ink} stroke={C.bg} strokeWidth={2} />
      <circle cx={T2[0]} cy={T2[1]} r={6} fill={C.signal} stroke={C.bg} strokeWidth={2} />
      <T x={T1[0] - 6} y={T1[1] + 24} anchor="end" size={14} bold>visual horizon</T>
      <T x={T2[0] - 4} y={T2[1] + 24} anchor="end" size={14} bold color={C.signal}>radio horizon</T>
      <T x={330} y={40} size={13} color={C.muted}>dashed: straight line (light)</T>
      <T x={330} y={62} size={13} bold color={C.signal}>teal: radio, bent slightly</T>
    </Diagram>
  )
}
