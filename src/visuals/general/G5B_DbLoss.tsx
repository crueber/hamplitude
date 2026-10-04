import { useState } from 'react'
import { C, Controls, Diagram, Ln, Readout, Slider, T, fmt } from '../kit'

/** A loss of N dB leaves 10^(-N/10) of the power. 1 dB leaves about 79.4 %, so 20.6 % is lost. */
export function G5B_DbLoss() {
  const [db, setDb] = useState(1)
  const left = 10 ** (-db / 10)
  const lost = 1 - left
  const x0 = 120, w = 480
  const bar = (y: number, label: string, frac: number, col: string, txt: string) => (
    <g>
      <T x={x0 - 10} y={y + 20} anchor="end" size={14} bold>{label}</T>
      <rect x={x0} y={y} width={w} height={40} rx={6} fill={C.fill} />
      <rect x={x0} y={y} width={Math.max(2, w * frac)} height={40} rx={6} fill={col} opacity={0.85} />
      <T x={x0 + 12} y={y + 20} size={16} bold color={C.bg}>{txt}</T>
    </g>
  )
  return (
    <>
      <Diagram w={640} h={196}
        title={`A loss of ${fmt(db)} dB leaves ${fmt(left * 100)} percent of the power, so ${fmt(lost * 100)} percent is lost. 100 watts in becomes ${fmt(left * 100)} watts out.`}
        caption="Loss in dB, power left over. 1 dB loss is about 20.6 % of the power gone.">
        {bar(24, 'Power in', 1, C.power, '100 W')}
        {bar(86, 'Power out', left, C.power, `${fmt(left * 100)} W`)}
        <rect x={x0 + w * left} y={86} width={w * lost} height={40} rx={0} fill="none" stroke={C.bad} strokeWidth={2.5} strokeDasharray="6 4" />
        {lost > 0.12 && <T x={x0 + w * left + (w * lost) / 2} y={106} anchor="middle" size={14} bold color={C.bad}>lost {fmt(lost * 100)} %</T>}
        {lost <= 0.12 && <T x={x0 + w * left - 8} y={106} anchor="end" size={13} bold color={C.bg}>lost {fmt(lost * 100)} %</T>}
        <Ln x1={x0} y1={150} x2={x0 + w} y2={150} color={C.muted} width={1.5} />
        {[0, 25, 50, 75, 100].map((p) => (
          <g key={p}>
            <Ln x1={x0 + (w * p) / 100} y1={146} x2={x0 + (w * p) / 100} y2={154} color={C.muted} width={1.5} />
            <T x={x0 + (w * p) / 100} y={170} anchor="middle" size={12} color={C.muted}>{p}%</T>
          </g>
        ))}
      </Diagram>
      <Controls>
        <Slider label="Loss" value={db} min={0} max={10} step={0.1} onChange={setDb} format={(v) => `${fmt(v)} dB`} color="var(--d-bad)" />
        <Readout label="Power lost" value={fmt(lost * 100)} unit="%" color="var(--d-bad)" />
      </Controls>
    </>
  )
}
