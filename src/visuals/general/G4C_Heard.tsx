import { C, Diagram, Ln, T } from '../kit'

/** What each interference source sounds like: the audio gives away the source. */
export function Heard() {
  const px = [12, 222, 432], pw = 196
  const cy = 112
  // SSB: irregular speech-like envelope
  const ssb = Array.from({ length: 49 }, (_, i) => {
    const u = i / 48
    const a = Math.abs(Math.sin(u * 17) * Math.sin(u * 5.3 + 1)) * 0.9 + 0.08
    return `${i ? 'L' : 'M'}${(px[0] + 14 + u * (pw - 28)).toFixed(1)},${(cy - 38 * a).toFixed(1)}`
  }).join('')
  const ssb2 = Array.from({ length: 49 }, (_, i) => {
    const u = i / 48
    const a = Math.abs(Math.sin(u * 17) * Math.sin(u * 5.3 + 1)) * 0.9 + 0.08
    return `${i ? 'L' : 'M'}${(px[0] + 14 + u * (pw - 28)).toFixed(1)},${(cy + 38 * a).toFixed(1)}`
  }).join('')
  const arcs = [0.08, 0.17, 0.22, 0.31, 0.4, 0.46, 0.55, 0.63, 0.7, 0.78, 0.86, 0.93]
  const hts = [34, 52, 26, 60, 40, 56, 30, 48, 62, 36, 54, 28]
  const Panel = ({ i, title, result, col }: { i: number; title: string; result: string[]; col: string }) => (
    <g>
      <rect x={px[i]} y={14} width={pw} height={262} rx={14} fill={C.fill} stroke={col} strokeWidth={2} />
      <T x={px[i] + pw / 2} y={38} anchor="middle" bold size={14}>{title}</T>
      <Ln x1={px[i] + 16} y1={196} x2={px[i] + pw - 16} y2={196} color={C.fill2} width={2} />
      <T x={px[i] + pw / 2} y={216} anchor="middle" size={12} color={C.muted}>heard as</T>
      {result.map((r, k) => <T key={k} x={px[i] + pw / 2} y={238 + k * 18} anchor="middle" bold size={13} color={col}>{r}</T>)}
    </g>
  )
  return (
    <Diagram w={640} h={290} title="Three interference sources and what you hear: a single sideband phone transmitter sounds like distorted speech; a CW transmitter gives on-and-off humming or clicking; an arcing poor connection gives noise across a wide range of frequencies."
      caption="The sound tells you the source.">
      <Panel i={0} title="SSB phone" result={['Distorted speech']} col={C.signal} />
      <path d={ssb} fill="none" stroke={C.signal} strokeWidth={2.5} />
      <path d={ssb2} fill="none" stroke={C.signal} strokeWidth={2.5} />
      <T x={px[0] + pw / 2} y={168} anchor="middle" size={12} color={C.muted}>voice envelope</T>

      <Panel i={1} title="CW" result={['On-and-off humming', 'or clicking']} col={C.voltage} />
      {[[16, 70], [86, 108], [124, 176]].map(([a, b], k) => (
        <rect key={k} x={px[1] + a} y={cy - 22} width={b - a - 4} height={44} rx={3} fill={C.voltage} fillOpacity={0.35} stroke={C.voltage} strokeWidth={2} />
      ))}
      <T x={px[1] + pw / 2} y={168} anchor="middle" size={12} color={C.muted}>keyed carrier</T>

      <Panel i={2} title="Arcing connection" result={['Noise over a wide', 'range of frequencies']} col={C.bad} />
      <Ln x1={px[2] + 14} y1={cy + 40} x2={px[2] + pw - 14} y2={cy + 40} color={C.muted} width={2} />
      {arcs.map((u, k) => <Ln key={k} x1={px[2] + 14 + u * (pw - 28)} y1={cy + 40} x2={px[2] + 14 + u * (pw - 28)} y2={cy + 40 - hts[k]} color={C.bad} width={3} />)}
      <T x={px[2] + pw / 2} y={168} anchor="middle" size={12} color={C.muted}>spread across the spectrum</T>
    </Diagram>
  )
}
