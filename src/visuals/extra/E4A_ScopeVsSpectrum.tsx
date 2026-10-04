import { C, Diagram, Ln, T } from '../kit'

const sum = (x0: number, x1: number, cy: number, amp: number) => {
  const d: string[] = []
  for (let i = 0; i <= 500; i++) {
    const t = i / 500
    const y = cy - amp * 0.5 * (Math.sin(2 * Math.PI * 14 * t) + Math.sin(2 * Math.PI * 17 * t))
    d.push(`${i ? 'L' : 'M'}${(x0 + t * (x1 - x0)).toFixed(1)},${y.toFixed(1)}`)
  }
  return d.join('')
}

/** Same two-tone SSB signal, seen by an oscilloscope (time) and a spectrum analyzer (frequency). */
export function ScopeVsSpectrum() {
  const sp = (x: number, h: number, col: string) => <path key={x} d={`M${x - 5},176 L${x},${176 - h} L${x + 5},176`} fill={col} fillOpacity={0.3} stroke={col} strokeWidth={3} strokeLinejoin="round" />
  return (
    <Diagram w={640} h={262} title="The same two-tone signal on an oscilloscope, which plots amplitude against time, and on a spectrum analyzer, which plots amplitude against frequency and shows the distortion products."
      caption="Scope: amplitude vs time. Spectrum analyzer: amplitude vs frequency, so spurs and IMD show up as extra spikes.">
      <T x={160} y={16} anchor="middle" bold size={15}>Oscilloscope</T>
      <rect x={14} y={32} width={292} height={144} rx={8} fill={C.fill} />
      <path d={sum(24, 296, 104, 52)} fill="none" stroke={C.signal} strokeWidth={2.5} />
      <Ln x1={14} y1={104} x2={306} y2={104} color={C.fill2} width={1} />
      <T x={160} y={196} anchor="middle" size={13} bold>vertical: <tspan fill={C.voltage}>voltage</tspan></T>
      <T x={160} y={216} anchor="middle" size={13} bold>horizontal: <tspan fill={C.signal}>time</tspan></T>
      <T x={480} y={16} anchor="middle" bold size={15}>Spectrum analyzer</T>
      <rect x={334} y={32} width={292} height={144} rx={8} fill={C.fill} />
      <Ln x1={344} y1={176} x2={616} y2={176} color={C.ink} width={2} />
      {sp(460, 110, C.signal)}{sp(500, 110, C.signal)}
      {sp(420, 60, C.resist)}{sp(540, 60, C.resist)}{sp(380, 32, C.bad)}{sp(580, 32, C.bad)}
      <T x={480} y={196} anchor="middle" size={13} bold>vertical: <tspan fill={C.power}>signal amplitude</tspan></T>
      <T x={480} y={216} anchor="middle" size={13} bold>horizontal: <tspan fill={C.signal}>frequency</tspan></T>
      <T x={480} y={242} anchor="middle" size={12} color={C.muted}>tall: the two tones. Short: intermodulation products.</T>
    </Diagram>
  )
}
