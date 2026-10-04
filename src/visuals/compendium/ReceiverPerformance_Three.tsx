import { C, Diagram, Ln, Lines, T } from '../kit'

const PW = 184
const px = [10, 228, 446]
const TOP = 52, BASE = 196

/** Sensitivity, selectivity and dynamic range as three pictures. */
export function ReceiverPerformance_Three() {
  // panel 1: noise floor with a heard signal and a buried one
  const x1 = px[0]
  const noise: string[] = []
  for (let i = 0; i <= 40; i++) {
    const x = x1 + 8 + (i / 40) * (PW - 16)
    const y = BASE - (44 + 5 * Math.sin(i * 1.7) + 4 * Math.sin(i * 3.1 + 1))
    noise.push(`${i ? 'L' : 'M'}${x.toFixed(1)},${y.toFixed(1)}`)
  }
  // panel 2: filter passband
  const x2 = px[1]
  const pass = `M${x2 + 8},${BASE} L${x2 + 54},${BASE} L${x2 + 60},${TOP + 30} L${x2 + 124},${TOP + 30} L${x2 + 130},${BASE} L${x2 + PW - 8},${BASE}`
  // panel 3
  const x3 = px[2]
  return (
    <Diagram w={640} h={282}
      title="Three receiver specifications drawn as pictures. Sensitivity: a signal must stand above the noise floor to be heard. Selectivity: a filter passes the wanted signal and rejects strong neighbours outside its passband. Dynamic range: the span from the noise floor up to where strong signals begin to cause distortion."
      caption="Sensitivity looks down at the noise, selectivity looks sideways at neighbours, dynamic range is the whole span in between.">
      {/* titles */}
      {[['Sensitivity', 'How weak can it hear?', C.signal], ['Selectivity', 'How close can it separate?', C.power], ['Dynamic range', 'How strong can it cope with?', C.bad]].map(([t, s, col], i) => (
        <g key={t}>
          <T x={px[i]} y={16} bold size={14.5} color={col}>{t}</T>
          <T x={px[i]} y={35} size={12.5} color={C.muted}>{s}</T>
          <rect x={px[i]} y={TOP - 4} width={PW} height={BASE - TOP + 12} rx={8} fill={C.fill} stroke={C.muted} strokeOpacity={0.4} />
        </g>
      ))}

      {/* sensitivity */}
      <path d={`${noise.join('')} L${x1 + PW - 8},${BASE} L${x1 + 8},${BASE} Z`} fill={C.muted} fillOpacity={0.25} stroke={C.muted} strokeWidth={1.5} />
      <Ln x1={x1 + 8} y1={BASE} x2={x1 + PW - 8} y2={BASE} color={C.muted} width={1.5} />
      <T x={x1 + 12} y={BASE - 20} size={12} color={C.muted}>noise floor</T>
      <Ln x1={x1 + 150} y1={BASE} x2={x1 + 150} y2={TOP + 26} color={C.signal} width={4} />
      <T x={x1 + 150} y={TOP + 14} anchor="middle" size={12} bold color={C.signal}>heard</T>
      <Ln x1={x1 + 96} y1={BASE} x2={x1 + 96} y2={BASE - 30} color={C.bad} width={4} dash="3 4" opacity={0.7} />
      <T x={x1 + 96} y={BASE - 66} anchor="middle" size={12} bold color={C.bad}>buried</T>

      {/* selectivity */}
      <path d={pass} fill={C.power} fillOpacity={0.12} stroke={C.power} strokeWidth={2} strokeDasharray="5 3" />
      <Ln x1={x2 + 8} y1={BASE} x2={x2 + PW - 8} y2={BASE} color={C.muted} width={1.5} />
      <Ln x1={x2 + 92} y1={BASE} x2={x2 + 92} y2={TOP + 66} color={C.signal} width={4} />
      <T x={x2 + 92} y={TOP + 16} anchor="middle" size={12} bold color={C.power}>passband</T>
      <T x={x2 + 92} y={TOP + 54} anchor="middle" size={12} bold color={C.signal}>wanted</T>
      <Ln x1={x2 + 28} y1={BASE} x2={x2 + 28} y2={TOP + 76} color={C.bad} width={4} dash="3 4" opacity={0.7} />
      <Ln x1={x2 + 158} y1={BASE} x2={x2 + 158} y2={TOP + 90} color={C.bad} width={4} dash="3 4" opacity={0.7} />
      <T x={x2 + 28} y={TOP + 64} anchor="middle" size={12} bold color={C.bad}>rejected</T>
      <T x={x2 + 156} y={TOP + 78} anchor="middle" size={12} bold color={C.bad}>rejected</T>

      {/* dynamic range */}
      <rect x={x3 + 16} y={TOP + 12} width={70} height={BASE - TOP - 12} fill={C.good} fillOpacity={0.15} stroke={C.good} strokeWidth={1.5} />
      <Lines x={x3 + 51} y={(TOP + 12 + BASE) / 2 - 8} anchor="middle" size={12.5} bold color={C.good} lh={16} lines={['usable', 'window']} />
      <Ln x1={x3 + 12} y1={TOP + 12} x2={x3 + 92} y2={TOP + 12} color={C.bad} width={3} />
      <T x={x3 + 98} y={TOP + 12} size={12} bold color={C.bad}>overload</T>
      <Ln x1={x3 + 12} y1={BASE} x2={x3 + 92} y2={BASE} color={C.muted} width={3} />
      <T x={x3 + 98} y={BASE - 8} size={12} bold color={C.muted}>noise floor</T>
      <Ln x1={x3 + 174} y1={TOP + 18} x2={x3 + 174} y2={BASE - 6} color={C.ink} width={2} arrow="both" />
      <T x={x3 + 168} y={(TOP + BASE) / 2} anchor="end" size={12} bold>dB</T>

      {/* captions */}
      <Lines x={px[0]} y={218} size={12} color={C.muted} lh={16} lines={['Set by noise: the receiver’s', 'own noise and the bandwidth.', 'Matters most on quiet bands.']} />
      <Lines x={px[1]} y={218} size={12} color={C.muted} lh={16} lines={['Set by the filter: how narrow', 'it is and how steep its sides.', 'Close neighbours need both.']} />
      <Lines x={px[2]} y={218} size={12} color={C.muted} lh={16} lines={['The span in dB from the noise', 'floor up to where strong signals', 'distort. Key on crowded bands.']} />
    </Diagram>
  )
}
