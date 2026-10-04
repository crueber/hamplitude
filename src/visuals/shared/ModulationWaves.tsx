import { C, Diagram, Ln, T, TAU, useTime } from '../kit'

/**
 * Voice (message) vs AM vs FM on the same carrier.
 * AM: carrier height follows the voice. FM: carrier spacing (frequency) follows the voice.
 */
export function ModulationWaves({ caption }: { caption?: string }) {
  const { t, ref } = useTime(0.5)
  const W = 640, H = 350
  const x0 = 150, x1 = 620, N = 470
  const msg = (u: number) => Math.sin(TAU * (2 * u - t * 0.5))

  const m: string[] = [], am: string[] = [], env: string[] = [], envB: string[] = [], fm: string[] = []
  let ph = 0
  for (let i = 0; i <= N; i++) {
    const u = i / N
    const x = x0 + (x1 - x0) * u
    const s = msg(u)
    m.push(`${i ? 'L' : 'M'}${x.toFixed(1)},${(62 - 26 * s).toFixed(1)}`)
    const a = 10 + 16 * (s + 1) / 2 * 1.6 // amplitude 10..~35
    const car = Math.sin(TAU * 26 * u)
    am.push(`${i ? 'L' : 'M'}${x.toFixed(1)},${(176 - a * car).toFixed(1)}`)
    env.push(`${i ? 'L' : 'M'}${x.toFixed(1)},${(176 - a).toFixed(1)}`)
    envB.push(`${i ? 'L' : 'M'}${x.toFixed(1)},${(176 + a).toFixed(1)}`)
    ph += TAU * (26 + 8 * s) / N
    fm.push(`${i ? 'L' : 'M'}${x.toFixed(1)},${(288 - 26 * Math.sin(ph)).toFixed(1)}`)
  }
  const row = (y: number, title: string, sub: string, col: string) => (
    <g>
      <T x={14} y={y - 9} size={15} bold color={col}>{title}</T>
      <T x={14} y={y + 11} size={12.5} color={C.muted}>{sub}</T>
    </g>
  )
  return (
    <Diagram w={W} h={H} title="The same voice signal modulating a carrier two ways: AM changes the carrier's height, FM changes its frequency" caption={caption} svgRef={ref}>
      <Ln x1={x0} y1={62} x2={x1} y2={62} color={C.muted} width={1} dash="3 5" />
      <Ln x1={x0} y1={176} x2={x1} y2={176} color={C.muted} width={1} dash="3 5" />
      <Ln x1={x0} y1={288} x2={x1} y2={288} color={C.muted} width={1} dash="3 5" />
      {row(62, 'Voice', 'the message', C.power)}
      {row(176, 'AM', 'height changes', C.resist)}
      {row(288, 'FM', 'spacing changes', C.signal)}
      <path d={m.join('')} fill="none" stroke={C.power} strokeWidth={3.5} strokeLinecap="round" />
      <path d={env.join('')} fill="none" stroke={C.resist} strokeWidth={1.5} strokeDasharray="4 4" opacity={0.8} />
      <path d={envB.join('')} fill="none" stroke={C.resist} strokeWidth={1.5} strokeDasharray="4 4" opacity={0.8} />
      <path d={am.join('')} fill="none" stroke={C.resist} strokeWidth={2} strokeLinejoin="round" />
      <path d={fm.join('')} fill="none" stroke={C.signal} strokeWidth={2} strokeLinejoin="round" />
      <T x={x0} y={334} size={12.5} color={C.muted}>AM: constant spacing, varying height</T>
      <T x={x1} y={334} size={12.5} color={C.muted} anchor="end">FM: constant height, varying spacing</T>
    </Diagram>
  )
}
