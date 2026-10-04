import { C, Diagram, Ln, T, TAU } from '../kit'

/** Why RMS is peak ÷ √2: the heating power of a sine wave swings between zero and peak, averaging half of peak. */
export function AcDcAndWaveforms_RmsHeating() {
  const x0 = 50, x1 = 440, cy = 86, amp = 54, base = 276, ph = 100
  const cycles = 2
  const volt: string[] = [], pow: string[] = [], fill: string[] = []
  const N = 200
  for (let k = 0; k <= N; k++) {
    const u = k / N
    const x = x0 + (x1 - x0) * u
    const s = Math.sin(TAU * cycles * u)
    volt.push(`${k ? 'L' : 'M'}${x.toFixed(1)},${(cy - amp * s).toFixed(1)}`)
    const yp = base - ph * s * s
    pow.push(`${k ? 'L' : 'M'}${x.toFixed(1)},${yp.toFixed(1)}`)
  }
  fill.push(`M${x0},${base}`, pow.join('').replace('M', 'L'), `L${x1},${base}`, 'Z')
  const rmsY = cy - amp / Math.SQRT2
  const avgY = base - ph / 2
  return (
    <Diagram w={640} h={310}
      title="A sine wave and the power it delivers to a resistor. Power is voltage squared over resistance, so it is never negative and swings between zero and the peak value, averaging half of peak. That average matches a steady DC voltage of 0.707 times the peak, the RMS value."
      caption="Squaring makes every half-cycle positive. The average of the power curve is half its peak, so the RMS voltage is peak ÷ √2 ≈ 0.707 × peak.">
      <T x={x0} y={14} size={13} bold color={C.voltage}>Voltage across a resistor</T>
      <Ln x1={x0} y1={cy} x2={x1} y2={cy} color={C.muted} width={1.2} dash="3 4" />
      <path d={volt.join('')} fill="none" stroke={C.voltage} strokeWidth={3} strokeLinejoin="round" />
      <Ln x1={x0} y1={cy - amp} x2={x1} y2={cy - amp} color={C.muted} width={1.2} dash="6 4" />
      <Ln x1={x0} y1={rmsY} x2={x1} y2={rmsY} color={C.power} width={2.5} dash="6 4" />
      <T x={x1 + 12} y={cy - amp} size={13} bold color={C.muted}>peak</T>
      <T x={x1 + 12} y={rmsY + 2} size={13} bold color={C.power}>RMS = 0.707 × peak</T>

      <T x={x0} y={base - ph - 22} size={13} bold color={C.power}>Power in that resistor (voltage² ÷ R)</T>
      <path d={fill.join('')} fill={C.power} opacity={0.18} stroke="none" />
      <path d={pow.join('')} fill="none" stroke={C.power} strokeWidth={3} strokeLinejoin="round" />
      <Ln x1={x0} y1={base} x2={x1} y2={base} color={C.muted} width={2} />
      <Ln x1={x0} y1={base - ph} x2={x1} y2={base - ph} color={C.muted} width={1.2} dash="6 4" />
      <Ln x1={x0} y1={avgY} x2={x1} y2={avgY} color={C.power} width={2.5} dash="6 4" />
      <T x={x1 + 12} y={base - ph} size={13} bold color={C.muted}>peak power</T>
      <T x={x1 + 12} y={avgY} size={13} bold color={C.power}>average = ½ of peak</T>
      <T x={x1 + 12} y={avgY + 20} size={12} color={C.muted}>the heat of steady DC</T>
      <T x={x1 + 12} y={avgY + 36} size={12} color={C.muted}>at the RMS voltage</T>
    </Diagram>
  )
}
