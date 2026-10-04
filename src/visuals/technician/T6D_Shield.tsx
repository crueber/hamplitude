import { C, Diagram, T } from '../kit'

/** Shielded wire keeps unwanted signals from coupling in or out. */
export function Shield() {
  const wavy = (x: number, y0: number, y1: number, blocked: boolean) => {
    const pts: string[] = []
    const n = 40
    for (let i = 0; i <= n; i++) {
      const u = i / n
      pts.push(`${i === 0 ? 'M' : 'L'}${(x + 6 * Math.min(1, (1 - u) / 0.25) * Math.sin(u * 3 * Math.PI * 2)).toFixed(1)},${(y0 + (y1 - y0) * u).toFixed(1)}`)
    }
    return <path d={pts.join('')} fill="none" stroke={C.bad} strokeWidth={2.2} strokeLinecap="round" markerEnd="url(#hx-arrow)" opacity={blocked ? 0.9 : 1} />
  }
  return (
    <Diagram w={640} h={280} title="Left: an unshielded wire picks up unwanted signals. Right: the same wire inside a shield. The shield blocks them from reaching the wire, and keeps the wire's own signal from leaking out."
      caption="The shield blocks unwanted signals from coupling to the wire, or from the wire out to its neighbours.">
      <line x1={320} y1={14} x2={320} y2={262} stroke={C.fill2} strokeWidth={2} strokeDasharray="4 5" />
      <T x={160} y={22} anchor="middle" bold size={16}>Plain wire</T>
      <T x={480} y={22} anchor="middle" bold size={16}>Shielded wire</T>

      {[80, 160, 240].map((x) => <g key={x}>{wavy(x, 50, 150, false)}</g>)}
      <line x1={30} y1={160} x2={290} y2={160} stroke={C.signal} strokeWidth={4} strokeLinecap="round" />
      <T x={160} y={200} anchor="middle" size={13} color={C.bad} bold>unwanted signals get in</T>
      <T x={160} y={220} anchor="middle" size={13} color={C.muted}>(and your signal can get out)</T>

      {[400, 480, 560].map((x) => <g key={x}>{wavy(x, 50, 114, true)}</g>)}
      <rect x={350} y={122} width={260} height={76} rx={14} fill={C.fill2} fillOpacity={0.5} stroke={C.muted} strokeWidth={2.5} />
      {Array.from({ length: 22 }, (_, i) => <line key={i} x1={356 + i * 11.4} y1={128} x2={366 + i * 11.4} y2={192} stroke={C.muted} strokeWidth={1} opacity={0.5} />)}
      <line x1={330} y1={160} x2={630} y2={160} stroke={C.signal} strokeWidth={4} strokeLinecap="round" />
      <T x={480} y={236} anchor="middle" size={13} color={C.good} bold>shield blocks coupling</T>
      <T x={480} y={256} anchor="middle" size={13} color={C.muted}>signal stays in, noise stays out</T>
    </Diagram>
  )
}
