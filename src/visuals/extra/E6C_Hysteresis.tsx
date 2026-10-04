import { useState } from 'react'
import { C, Choice, Diagram, Ln, T } from '../kit'

const N = 120
const noise = (i: number) => 0.07 * (Math.sin(i * 2.3) + 0.8 * Math.sin(i * 5.1 + 1) + 0.5 * Math.sin(i * 9.7 + 2)) / 1.6

/** A slow input ramp with noise crossing a comparator threshold. Hysteresis uses two thresholds so noise cannot chatter the output. */
export function Hysteresis() {
  const [hys, setHys] = useState<'off' | 'on'>('off')
  const x0 = 70, x1 = 610
  const vin = Array.from({ length: N }, (_, i) => 0.2 + 0.6 * (i / (N - 1)) + noise(i))
  const th = 0.5, hi = 0.58, lo = 0.42
  let st = vin[0] > th
  const out = vin.map((v) => {
    if (hys === 'off') return v > th
    if (st && v < lo) st = false
    else if (!st && v > hi) st = true
    return st
  })
  const flips = out.reduce((n, o, i) => (i > 0 && o !== out[i - 1] ? n + 1 : n), 0)
  const px = (i: number) => x0 + (i / (N - 1)) * (x1 - x0)
  const yIn = (v: number) => 120 - v * 100 // 0..1 -> 120..20
  const yOut = (o: boolean) => (o ? 150 : 196)
  const inPts = vin.map((v, i) => `${px(i).toFixed(1)},${yIn(v).toFixed(1)}`).join(' ')
  const outPts = out.map((o, i) => `${px(i).toFixed(1)},${yOut(o)}`).join(' ')
  return (
    <>
      <Diagram w={640} h={236}
        title={`A noisy input slowly rises through a comparator threshold. ${hys === 'off' ? `With one threshold the output chatters: ${flips} changes.` : `With hysteresis there are two thresholds and the output changes ${flips} time.`}`}
        caption={hys === 'off' ? 'One threshold: noise near it makes the output flip repeatedly.' : 'Hysteresis: two thresholds, so the output flips once and stays.'}>
        <T x={x0 - 8} y={yIn(0.5)} anchor="end" size={12} bold color={C.muted}>input</T>
        <rect x={x0} y={14} width={x1 - x0} height={112} fill={C.fill} rx={6} />
        {hys === 'off' ? (
          <Ln x1={x0} y1={yIn(th)} x2={x1} y2={yIn(th)} color={C.power} width={2} dash="6 4" />
        ) : (
          <>
            <Ln x1={x0} y1={yIn(hi)} x2={x1} y2={yIn(hi)} color={C.power} width={2} dash="6 4" />
            <Ln x1={x0} y1={yIn(lo)} x2={x1} y2={yIn(lo)} color={C.power} width={2} dash="6 4" />
          </>
        )}
        <polyline points={inPts} fill="none" stroke={C.signal} strokeWidth={2} strokeLinejoin="round" />
        <T x={x0 + 8} y={hys === 'off' ? yIn(th) - 10 : yIn(hi) - 10} size={12} bold color={C.power}>{hys === 'off' ? 'threshold' : 'upper threshold'}</T>
        {hys === 'on' && <T x={x1 - 4} y={yIn(lo) + 11} anchor="end" size={12} bold color={C.power}>lower threshold</T>}
        <T x={x0 - 8} y={173} anchor="end" size={12} bold color={C.muted}>output</T>
        <T x={x0 - 8} y={150} anchor="end" size={11} color={C.muted}>high</T>
        <T x={x0 - 8} y={196} anchor="end" size={11} color={C.muted}>low</T>
        <polyline points={outPts} fill="none" stroke={C.current} strokeWidth={2.5} strokeLinejoin="round" />
        <T x={(x0 + x1) / 2} y={224} anchor="middle" size={13} bold color={hys === 'off' ? C.bad : C.good}>{hys === 'off' ? `output changed state ${flips} times` : `output changed state ${flips} time`}</T>
      </Diagram>
      <Choice label="Hysteresis" value={hys} onChange={setHys} options={[{ value: 'off', label: 'No hysteresis' }, { value: 'on', label: 'Hysteresis' }]} />
    </>
  )
}
