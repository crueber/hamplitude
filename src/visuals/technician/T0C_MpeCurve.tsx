import { C, Diagram, Ln, T } from '../kit'

// Schematic FCC maximum permissible exposure vs frequency (log-log). Shape only:
// high at low frequency, lowest across the VHF range where the body absorbs most, rising toward microwaves.
const F0 = 1.8, F1 = 2000
const lg = (f: number) => {
  if (f < 30) return 2 * Math.log10(30 / f)
  if (f <= 300) return 0
  if (f <= 1500) return Math.log10(f / 300)
  return Math.log10(1500 / 300)
}

export function MpeCurve() {
  const W = 640, H = 330, x0 = 40, x1 = 600, yb = 262, yt = 40
  const X = (f: number) => x0 + (Math.log(f / F0) / Math.log(F1 / F0)) * (x1 - x0)
  const Y = (f: number) => yb - 36 - (lg(f) / 2.45) * (yb - 36 - yt)
  const pts = Array.from({ length: 140 }, (_, i) => {
    const f = F0 * Math.pow(F1 / F0, i / 139)
    return `${i ? 'L' : 'M'}${X(f).toFixed(1)},${Y(f).toFixed(1)}`
  }).join('')
  const marks = [
    { f: 3.5, n: '3.5 MHz', dx: 14, dy: -6, a: 'start' as const },
    { f: 50, n: '50 MHz: lowest of the four', dx: 0, dy: 18, a: 'middle' as const },
    { f: 440, n: '440 MHz', dx: -10, dy: -16, a: 'end' as const },
    { f: 1296, n: '1296 MHz', dx: -10, dy: -16, a: 'end' as const },
  ]
  return (
    <Diagram w={W} h={H} title="Schematic of the RF exposure limit versus frequency. The limit is lowest around 30 to 300 megahertz, where the body absorbs the most energy, so 50 megahertz has a lower limit than 3.5, 440 or 1296 megahertz"
      caption="Schematic, no scale. The body absorbs RF best around VHF, so the limit is lowest there.">
      <Ln x1={x0} y1={yb} x2={x1 + 10} y2={yb} color={C.muted} width={2} arrow />
      <Ln x1={x0} y1={yb} x2={x0} y2={yt - 14} color={C.muted} width={2} arrow />
      <T x={x0 + 10} y={yt - 18} size={13} bold color={C.muted}>exposure allowed (higher = more)</T>
      <T x={x1 + 8} y={yb + 20} anchor="end" size={13} color={C.muted}>frequency (log scale)</T>
      <rect x={X(30)} y={yt} width={X(300) - X(30)} height={yb - yt} fill={C.bad} fillOpacity={0.1} />
      <T x={(X(30) + X(300)) / 2} y={yt + 14} anchor="middle" size={13} bold color={C.bad}>body absorbs most here</T>
      <path d={pts} fill="none" stroke={C.signal} strokeWidth={4} strokeLinejoin="round" strokeLinecap="round" />
      {marks.map((m) => (
        <g key={m.f}>
          <circle cx={X(m.f)} cy={Y(m.f)} r={7} fill={m.f === 50 ? C.bad : C.power} stroke={C.bg} strokeWidth={3} />
          <T x={X(m.f) + m.dx} y={Y(m.f) + m.dy} anchor={m.a} size={13} bold color={m.f === 50 ? C.bad : C.power}>{m.n}</T>
        </g>
      ))}
    </Diagram>
  )
}
