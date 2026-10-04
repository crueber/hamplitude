import { useState } from 'react'
import { C, Controls, Diagram, Ln, Readout, Slider, T, TAU, fmt } from '../kit'

/**
 * AM with a single audio tone. Time view (carrier inside an envelope) and frequency view
 * (carrier plus two sidebands of amplitude m/2). Power: carrier 1, each sideband m^2/4.
 */
export function AmplitudeModulation_Index() {
  const [pct, setPct] = useState(60)
  const m = pct / 100
  const x0 = 24, x1 = 616, cy = 98, S = 28, N = 480
  const body: string[] = [], up: string[] = [], dn: string[] = []
  for (let i = 0; i <= N; i++) {
    const u = i / N
    const env = 1 + m * Math.cos(TAU * 2 * u)
    const x = x0 + (x1 - x0) * u
    const k = i ? 'L' : 'M'
    body.push(`${k}${x.toFixed(1)},${(cy - S * env * Math.sin(TAU * 28 * u)).toFixed(1)}`)
    up.push(`${k}${x.toFixed(1)},${(cy - S * env).toFixed(1)}`)
    dn.push(`${k}${x.toFixed(1)},${(cy + S * env).toFixed(1)}`)
  }
  const base = 292, H1 = 76
  const bar = (x: number, amp: number, col: string, label: string, val: string) => (
    <g>
      <rect x={x - 7} y={base - H1 * amp} width={14} height={Math.max(H1 * amp, 0.5)} rx={2} fill={col} />
      <T x={x} y={base - H1 * amp - 12} anchor="middle" size={12.5} bold color={col}>{val}</T>
      <T x={x} y={base + 16} anchor="middle" size={12.5} color={C.ink}>{label}</T>
    </g>
  )
  const total = 1 + (m * m) / 2
  const sbShare = (m * m) / 2 / total
  return (
    <>
      <Diagram w={640} h={330}
        title={`Amplitude modulation with a single audio tone at ${pct} percent modulation. Time view: the carrier height follows the envelope. Frequency view: a carrier of amplitude 1 and two sidebands, each ${fmt(m / 2, 2)}.`}
        caption="One tone makes two sidebands, one each side of the carrier, each m/2 as tall as the carrier.">
        <rect x={14} y={8} width={612} height={158} rx={10} fill={C.fill} />
        <T x={22} y={22} size={12.5} bold color={C.muted}>Time: what a scope sees</T>
        <Ln x1={x0} y1={cy} x2={x1} y2={cy} color={C.muted} width={1} dash="3 5" />
        <path d={up.join('')} fill="none" stroke={C.power} strokeWidth={2} strokeDasharray="5 4" />
        <path d={dn.join('')} fill="none" stroke={C.power} strokeWidth={2} strokeDasharray="5 4" />
        <path d={body.join('')} fill="none" stroke={C.resist} strokeWidth={1.4} strokeLinejoin="round" />
        <T x={618} y={22} size={12.5} anchor="end" bold color={C.power}>dashed envelope = the audio</T>
        <rect x={14} y={176} width={612} height={142} rx={10} fill={C.fill} />
        <T x={22} y={190} size={12.5} bold color={C.muted}>Frequency: what a spectrum analyzer sees</T>
        <Ln x1={x0} y1={base} x2={x1} y2={base} color={C.muted} width={2} />
        {bar(320, 1, C.resist, 'carrier fc', '1')}
        {bar(210, m / 2, C.power, 'fc − fm', fmt(m / 2, 2))}
        {bar(430, m / 2, C.power, 'fc + fm', fmt(m / 2, 2))}
        <T x={618} y={190} size={12.5} anchor="end" color={C.muted}>width = 2 × fm</T>
      </Diagram>
      <Controls>
        <Slider label="Modulation depth m" value={pct} min={0} max={100} step={5} onChange={setPct} format={(v) => `${v}%`} color="var(--d-power)" />
        <Readout label="Power in carrier" value={fmt((1 / total) * 100, 3)} unit="%" color="var(--d-resist)" />
        <Readout label="Power in both sidebands" value={fmt(sbShare * 100, 3)} unit="%" color="var(--d-power)" />
      </Controls>
    </>
  )
}
