import { C, Diagram, Ln, T } from '../kit'

/** A switching amp's output is a square wave: full of harmonics. A filter leaves only the wanted sine. */
export function SwitchFilter() {
  const x0 = 20, w = 170, cy = 70, a = 34
  const sq = (u: number) => (Math.sin(u * 4 * Math.PI + 0.35) >= 0 ? 1 : -1)
  const sqPts: string[] = []
  const N = 200
  for (let k = 0; k <= N; k++) {
    const u = k / N
    sqPts.push(`${x0 + u * w},${cy - a * sq(u + 1e-6)}`)
  }
  const sinPts = Array.from({ length: N + 1 }, (_, k) => `${450 + (k / N) * w},${cy - a * Math.sin((k / N) * 4 * Math.PI + 0.35)}`).join(' ')
  return (
    <Diagram w={640} h={170} title="A switching amplifier produces a square wave, which contains harmonics. A harmonic filter at the output removes them and leaves a clean sine wave."
      caption="A filter at the output of a switching amplifier removes the harmonics.">
      <polyline points={sqPts.join(' ')} fill="none" stroke={C.resist} strokeWidth={3} strokeLinejoin="round" />
      <T x={x0 + w / 2} y={132} anchor="middle" size={13} bold color={C.resist}>square wave + harmonics</T>
      <Ln x1={x0 + w + 8} y1={cy} x2={248} y2={cy} color={C.muted} width={2.5} arrow />
      <rect x={252} y={36} width={136} height={68} rx={10} fill={C.fill} stroke={C.power} strokeWidth={2.5} />
      <T x={320} y={62} anchor="middle" size={14} bold color={C.power}>Harmonic</T>
      <T x={320} y={82} anchor="middle" size={14} bold color={C.power}>filter</T>
      <Ln x1={392} y1={cy} x2={440} y2={cy} color={C.muted} width={2.5} arrow />
      <polyline points={sinPts} fill="none" stroke={C.signal} strokeWidth={3} />
      <T x={535} y={132} anchor="middle" size={13} bold color={C.signal}>clean signal</T>
    </Diagram>
  )
}
