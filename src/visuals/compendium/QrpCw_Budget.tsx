import { C, Diagram, Ln, T } from '../kit'

// 10*log10(100/5) = 13.0 dB lost; 10*log10(2400/150) = 12.0 dB regained; net about -1.0 dB.
const S = 22 // px per dB
const X0 = 150

/** Idealised budget: dropping to 5 W costs about 13 dB, a narrow CW filter wins about 12 dB back. */
export function QrpCw_Budget() {
  const a = 13.01, b = 12.04
  const row = (y: number, label: string, start: number, delta: number, color: string, txt: string) => {
    const x1 = X0 + start * S, x2 = X0 + (start + delta) * S
    return (
      <g>
        <T x={14} y={y + 14} size={13.5} bold>{label}</T>
        <rect x={Math.min(x1, x2)} y={y} width={Math.abs(x2 - x1)} height={28} rx={5} fill={color} />
        <T x={Math.max(x1, x2) + 10} y={y + 14} size={13.5} bold color={color}>{txt}</T>
      </g>
    )
  }
  return (
    <Diagram w={640} h={236} title="Idealised signal budget in decibels: cutting from 100 watts to 5 watts loses 13 decibels, a 150 hertz CW filter instead of a 2400 hertz SSB filter gains back about 12 decibels, leaving a net loss of about 1 decibel"
      caption="Idealised, noise-limited comparison. Real gains depend on the filter, the noise and how SSB power is measured. Illustrative.">
      <Ln x1={X0} y1={20} x2={X0} y2={176} color={C.muted} width={2} />
      <T x={X0} y={10} size={12.5} color={C.muted} anchor="middle">0 dB</T>
      {row(24, '100 W to 5 W', 0, a, C.resist, '−13 dB')}
      {row(70, 'CW filter, not SSB', a, -b, C.good, '+12 dB')}
      <Ln x1={14} y1={118} x2={626} y2={118} color={C.fill2} width={1.5} />
      {row(130, 'Net', 0, a - b, C.signal, 'about −1 dB')}
      <T x={14} y={196} size={13} color={C.muted}>1 dB is far smaller than one S-unit (6 dB).</T>
      <T x={14} y={218} size={13} color={C.muted}>Both bars are measured against the same noise floor.</T>
    </Diagram>
  )
}
