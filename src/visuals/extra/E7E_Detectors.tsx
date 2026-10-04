import { C, Diagram, Ln, T, TAU } from '../kit'

/** Envelope detector: rectify the AM signal (diode), then filter off the RF (capacitor). What remains is the audio envelope. */
export function EnvelopeDetector() {
  const N = 300, W = 170
  const env = (u: number) => 0.55 + 0.4 * Math.sin(TAU * 1.5 * u)
  const car = (u: number) => Math.sin(TAU * 22 * u)
  const draw = (x0: number, cy: number, fn: (u: number) => number, amp = 24) => {
    const a: string[] = []
    for (let i = 0; i <= N; i++) { const u = i / N; a.push(`${i ? 'L' : 'M'}${(x0 + u * W).toFixed(1)},${(cy - amp * fn(u)).toFixed(1)}`) }
    return a.join('')
  }
  const panel = (x0: number, title: string, col: string, body: React.ReactNode, sub: string) => (
    <g>
      <T x={x0 + W / 2} y={24} anchor="middle" size={14} bold color={col}>{title}</T>
      <rect x={x0 - 6} y={42} width={W + 12} height={110} rx={10} fill={C.fill} />
      {body}
      <T x={x0 + W / 2} y={172} anchor="middle" size={12.5} color={C.muted}>{sub}</T>
    </g>
  )
  const cy = 100
  return (
    <Diagram w={640} h={196}
      title="Diode envelope detector. An AM radio signal passes through a diode, which rectifies it by keeping only one half of each RF cycle. A capacitor then filters out the RF, leaving the audio envelope."
      caption="Rectification and filtering recover the audio from the AM signal.">
      {panel(18, 'AM signal in', C.resist,
        <>
          <path d={draw(18, cy, (u) => env(u) * car(u))} fill="none" stroke={C.resist} strokeWidth={1.8} />
        </>, 'RF with audio in its height')}
      {panel(236, 'After diode', C.signal,
        <path d={draw(236, 124, (u) => Math.max(0, env(u) * car(u)), 44)} fill="none" stroke={C.signal} strokeWidth={1.8} />, 'rectified: one half only')}
      {panel(454, 'After filter', C.power,
        <path d={draw(454, 124, (u) => env(u), 44)} fill="none" stroke={C.power} strokeWidth={3.5} />, 'RF filtered off: audio left')}
      <Ln x1={196} y1={98} x2={230} y2={98} color={C.ink} width={2.5} arrow />
      <Ln x1={414} y1={98} x2={448} y2={98} color={C.ink} width={2.5} arrow />
      <T x={213} y={80} anchor="middle" size={12} bold>diode</T>
      <T x={431} y={80} anchor="middle" size={12} bold>capacitor</T>
    </Diagram>
  )
}

/** Product detector: a mixer with a BFO. SSB in, difference frequency out = the audio. */
export function ProductDetector() {
  return (
    <Diagram w={640} h={200}
      title="Product detector: an SSB signal and a local beat-frequency oscillator go into a mixer. The difference frequency is the recovered audio."
      caption="A product detector is a mixer. The oscillator replaces the missing carrier.">
      <rect x={14} y={30} width={170} height={50} rx={10} fill={C.fill} stroke={C.signal} strokeWidth={2} />
      <T x={99} y={48} anchor="middle" size={14} bold>SSB signal</T>
      <T x={99} y={67} anchor="middle" size={13} bold mono color={C.signal}>456.5 kHz</T>
      <rect x={14} y={120} width={170} height={50} rx={10} fill={C.fill} stroke={C.resist} strokeWidth={2} />
      <T x={99} y={138} anchor="middle" size={14} bold>BFO</T>
      <T x={99} y={157} anchor="middle" size={13} bold mono color={C.resist}>455.0 kHz</T>
      <circle cx={300} cy={100} r={34} fill={C.fill} stroke={C.ink} strokeWidth={2.5} />
      <path d="M286,86 L314,114 M314,86 L286,114" stroke={C.ink} strokeWidth={3.5} strokeLinecap="round" />
      <T x={300} y={150} anchor="middle" size={13} bold>Product detector</T>
      <Ln x1={184} y1={55} x2={270} y2={90} color={C.signal} width={2.5} arrow />
      <Ln x1={184} y1={145} x2={270} y2={112} color={C.resist} width={2.5} arrow />
      <Ln x1={336} y1={100} x2={420} y2={100} color={C.power} width={2.5} arrow />
      <rect x={424} y={64} width={202} height={72} rx={10} fill={C.fill} stroke={C.power} strokeWidth={2} />
      <T x={525} y={84} anchor="middle" size={14} bold>Audio out</T>
      <T x={525} y={108} anchor="middle" size={13} bold mono color={C.power}>456.5 − 455.0</T>
      <T x={525} y={126} anchor="middle" size={13} bold mono color={C.power}>= 1.5 kHz</T>
    </Diagram>
  )
}
