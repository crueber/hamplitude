import { useState } from 'react'
import { C, Choice, Diagram, T } from '../kit'

type Bias = 'rev' | 'none' | 'fwd'

/** PN junction: N has free electrons (donors), P has holes (acceptors). Bias changes the depletion region. */
export function PnJunction() {
  const [bias, setBias] = useState<Bias>('rev')
  const mid = 320
  const x0 = 70
  const x1 = 570
  const dw = bias === 'rev' ? 190 : bias === 'none' ? 64 : 0
  const top = 62
  const bot = 172
  const holes: [number, number][] = []
  const elecs: [number, number][] = []
  const rows = [82, 112, 142]
  for (let x = x0 + 22; x < mid - dw / 2 - 8; x += 38) rows.forEach((y, r) => holes.push([x + (r % 2) * 14, y]))
  for (let x = mid + dw / 2 + 14; x < x1 - 8; x += 38) rows.forEach((y, r) => elecs.push([x + (r % 2) * 14, y]))
  const flows = bias === 'fwd'
  const polarity = bias === 'rev' ? '+ on the N side, − on the P side' : bias === 'fwd' ? '+ on the P side, − on the N side' : 'no voltage applied'
  return (
    <>
      <Diagram w={640} h={262}
        title={`A PN junction. P-type material on the left has holes, N-type on the right has free electrons. ${bias === 'rev' ? 'Reverse bias pulls them apart and widens the empty depletion region, so no current flows.' : bias === 'fwd' ? 'Forward bias pushes them together, the depletion region collapses and current flows.' : 'With no bias there is a thin depletion region.'}`}
        caption={bias === 'rev' ? 'Reverse bias: carriers pulled away from the junction, depletion region widens, no current.' : bias === 'fwd' ? 'Forward bias: carriers pushed into the junction, it conducts (silicon: about 0.6 to 0.7 V).' : 'No bias: carriers cross and leave a thin depletion region.'}>
        <rect x={x0} y={top} width={mid - x0} height={bot - top} fill={C.resist} opacity={0.14} />
        <rect x={mid} y={top} width={x1 - mid} height={bot - top} fill={C.current} opacity={0.14} />
        <rect x={mid - dw / 2} y={top} width={dw} height={bot - top} fill={C.fill2} />
        <rect x={x0} y={top} width={x1 - x0} height={bot - top} fill="none" stroke={C.ink} strokeWidth={2} />
        {holes.map(([x, y], i) => <circle key={`h${i}`} cx={x} cy={y} r={8} fill="none" stroke={C.resist} strokeWidth={2.5} />)}
        {elecs.map(([x, y], i) => (
          <g key={`e${i}`}>
            <circle cx={x} cy={y} r={8} fill={C.current} />
            <line x1={x - 4} y1={y} x2={x + 4} y2={y} stroke={C.bg} strokeWidth={2} />
          </g>
        ))}
        <T x={(x0 + mid) / 2} y={44} anchor="middle" bold size={15} color={C.resist}>P-type: holes</T>
        <T x={(mid + x1) / 2} y={44} anchor="middle" bold size={15} color={C.current}>N-type: free electrons</T>
        <T x={mid} y={bot + 18} anchor="middle" size={13} color={C.muted}>{dw === 0 ? 'depletion gone' : 'depletion region'}</T>
        <T x={(x0 + mid) / 2} y={bot + 18} anchor="middle" size={13} color={C.muted}>acceptor atoms</T>
        <T x={(mid + x1) / 2} y={bot + 18} anchor="middle" size={13} color={C.muted}>donor atoms</T>
        <T x={x0 - 6} y={117} anchor="end" size={13} bold>anode</T>
        <T x={x1 + 6} y={117} size={13} bold>cathode</T>
        <T x={mid} y={226} anchor="middle" size={14} color={C.muted}>{polarity}</T>
        <T x={mid} y={246} anchor="middle" size={14} bold color={flows ? C.good : C.bad}>{flows ? 'current flows' : 'no current'}</T>
      </Diagram>
      <Choice label="Bias" value={bias} onChange={setBias} options={[{ value: 'rev', label: 'Reverse bias' }, { value: 'none', label: 'No bias' }, { value: 'fwd', label: 'Forward bias' }]} />
    </>
  )
}
