import { useState } from 'react'
import { C, Choice, Diagram, Ln, T } from '../kit'

type Kind = 'lp' | 'hp' | 'bp' | 'notch'
const X0 = 70, XW = 270, Y0 = 50, DB = 3, IL = 3, FLOOR = -60
const px = (f: number) => X0 + XW * Math.log10(f)
const py = (db: number) => Y0 - db * DB
const B = 0.9
const bpx = (f: number) => (f / 10 - 10 / f) / B
function resp(kind: Kind, f: number): number {
  let p2: number
  if (kind === 'lp') p2 = 1 / (1 + Math.pow(f / 10, 12))
  else if (kind === 'hp') p2 = 1 / (1 + Math.pow(10 / f, 12))
  else if (kind === 'bp') p2 = 1 / (1 + Math.pow(Math.abs(bpx(f)), 8))
  else { const x = Math.pow(Math.abs(bpx(f)), 8); p2 = x / (1 + x) }
  return Math.max(FLOOR, 10 * Math.log10(Math.max(p2, 1e-12)) - IL)
}
const half = Math.sqrt(1 + (B / 2) ** 2)
const F1 = 10 * (half - B / 2), F2 = 10 * (half + B / 2)

const NOTES: Record<Kind, string> = {
  lp: 'Low-pass: above the cutoff frequency the output power is less than half the input.',
  hp: 'High-pass: passes high frequencies, rejects low ones.',
  bp: 'Band-pass: bandwidth is measured between the upper and lower half-power points.',
  notch: 'Notch: rejects one narrow band and passes the rest.',
}

/** One response curve with the filter terms drawn on it. */
export function FilterResponse() {
  const [kind, setKind] = useState<Kind>('lp')
  const pts = Array.from({ length: 241 }, (_, k) => {
    const f = Math.pow(10, (k / 240) * 2)
    return `${px(f).toFixed(1)},${py(resp(kind, f)).toFixed(1)}`
  }).join(' ')
  const hp = py(-(IL + 3))
  const ilArrow = (f: number, anchor: 'start' | 'end' | 'middle', dx = 0, top = false) => (
    <g>
      <Ln x1={px(f)} y1={py(0)} x2={px(f)} y2={py(-IL)} color={C.resist} width={3} arrow="both" />
      <T x={px(f) + dx} y={top ? py(0) - 20 : py(-IL) + 22} anchor={anchor} size={12} bold color={C.resist}>insertion loss</T>
    </g>
  )
  const vline = (f: number) => <line x1={px(f)} y1={py(0) - 10} x2={px(f)} y2={py(FLOOR)} stroke={C.ink} strokeWidth={1.5} strokeDasharray="4 4" />
  const rejX = kind === 'hp' ? px(1.3) : px(95)
  return (
    <>
      <Diagram w={640} h={300} title={`Response curve of a ${kind === 'lp' ? 'low-pass' : kind === 'hp' ? 'high-pass' : kind === 'bp' ? 'band-pass' : 'notch'} filter with its terms marked. ${NOTES[kind]}`}
        caption={NOTES[kind]}>
        <Ln x1={X0} y1={py(FLOOR)} x2={X0 + 2 * XW + 10} y2={py(FLOOR)} color={C.muted} arrow />
        <Ln x1={X0} y1={py(FLOOR)} x2={X0} y2={py(0) - 30} color={C.muted} arrow />
        <T x={X0 + 2 * XW + 10} y={py(FLOOR) + 16} anchor="end" size={12} color={C.muted}>frequency →</T>
        <T x={X0 + 6} y={py(0) - 30} size={12} color={C.muted}>output (dB)</T>
        <line x1={X0} y1={py(0)} x2={X0 + 2 * XW} y2={py(0)} stroke={C.fill2} strokeWidth={2} strokeDasharray="4 5" />
        <T x={X0 - 6} y={py(0)} anchor="end" size={12} color={C.muted}>0</T>
        {kind !== 'notch' && <line x1={X0} y1={hp} x2={X0 + 2 * XW} y2={hp} stroke={C.fill2} strokeWidth={2} strokeDasharray="4 5" />}
        <polyline points={pts} fill="none" stroke={C.signal} strokeWidth={3.4} strokeLinejoin="round" />

        {kind === 'lp' && <g>{ilArrow(2.5, 'start', 8)}{vline(10)}<T x={px(10) + 6} y={py(0) - 20} size={12} bold>cutoff = half-power point</T></g>}
        {kind === 'hp' && <g>{ilArrow(40, 'end', -8)}{vline(10)}<T x={px(10) - 6} y={py(0) - 20} anchor="end" size={12} bold>cutoff = half-power point</T></g>}
        {kind === 'bp' && (
          <g>
            {ilArrow(10, 'middle', 0, true)}{vline(F1)}{vline(F2)}
            <T x={px(F1) - 6} y={py(0) - 20} anchor="end" size={12} bold>lower half-power</T>
            <T x={px(F2) + 6} y={py(0) - 20} size={12} bold>upper half-power</T>
            <Ln x1={px(F1)} y1={hp + 12} x2={px(F2)} y2={hp + 12} color={C.power} width={2.5} arrow="both" />
            <T x={px(10)} y={hp + 30} anchor="middle" size={12} bold color={C.power}>bandwidth</T>
          </g>
        )}
        {kind === 'notch' && (
          <g>
            {ilArrow(2.5, 'start', 8)}{vline(10)}
            <T x={px(10)} y={py(0) - 20} anchor="middle" size={12} bold>notch frequency</T>
            <Ln x1={px(14)} y1={py(-IL)} x2={px(14)} y2={py(FLOOR)} color={C.power} width={2.5} arrow="both" />
            <T x={px(14) + 8} y={py(-30)} size={12} bold color={C.power}>notch depth</T>
          </g>
        )}
        {kind !== 'notch' && (
          <g>
            <Ln x1={rejX} y1={py(-IL)} x2={rejX} y2={py(FLOOR)} color={C.bad} width={2.5} arrow="both" />
            <T x={rejX + (kind === 'hp' ? 8 : -8)} y={py(-25)} anchor={kind === 'hp' ? 'start' : 'end'} size={12} bold color={C.bad}>ultimate rejection</T>
          </g>
        )}
        {kind === 'lp' && <T x={px(16)} y={py(-17)} size={12} color={C.muted} bold>rolloff</T>}
        {kind === 'hp' && <T x={px(6.2)} y={py(-17)} anchor="end" size={12} color={C.muted} bold>rolloff</T>}
        {kind === 'bp' && <T x={px(22)} y={py(-10)} size={12} color={C.muted} bold>rolloff</T>}
      </Diagram>
      <Choice label="Filter type" value={kind} onChange={setKind} options={[{ value: 'lp', label: 'Low-pass' }, { value: 'hp', label: 'High-pass' }, { value: 'bp', label: 'Band-pass' }, { value: 'notch', label: 'Notch' }]} />
    </>
  )
}
