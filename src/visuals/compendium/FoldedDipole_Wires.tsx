import { useState } from 'react'
import { C, Controls, Diagram, Ln, Readout, Slider, T } from '../kit'

/** Folded dipole generalised: n equal wires joined at the ends, fed in one. Radiating current is n x the feed current, so Z = 73 n^2. */
export function FoldedDipole_Wires() {
  const [n, setN] = useState(2)
  const x0 = 110, x1 = 530, cy = 150, gap = 50
  const ys = Array.from({ length: n }, (_, i) => cy + (i - (n - 1) / 2) * gap)
  const z = 73 * n * n
  return (
    <>
      <Diagram w={640} h={290}
        title={`A dipole made of ${n} parallel wire${n > 1 ? 's' : ''} joined at the ends and fed in the top one. The radiating current is ${n} times the feed current, so the feed point impedance is 73 times ${n} squared, about ${z} ohms`}
        caption="Illustrative: equal-diameter wires, a free-space half-wave. The same radiated power comes from n times less current at the feed.">
        {n > 1 && <Ln x1={x0} y1={ys[0]} x2={x0} y2={ys[n - 1]} color={C.resist} width={5} />}
        {n > 1 && <Ln x1={x1} y1={ys[0]} x2={x1} y2={ys[n - 1]} color={C.resist} width={5} />}
        {ys.map((y, i) => (
          <g key={i}>
            {i === 0 ? (
              <>
                <Ln x1={x0} y1={y} x2={320 - 10} y2={y} color={C.resist} width={5} />
                <Ln x1={320 + 10} y1={y} x2={x1} y2={y} color={C.resist} width={5} />
              </>
            ) : (
              <Ln x1={x0} y1={y} x2={x1} y2={y} color={C.resist} width={5} />
            )}
            <Ln x1={190} y1={y - 12} x2={240} y2={y - 12} color={C.current} width={3} arrow />
            <T x={215} y={y - 27} anchor="middle" size={13} bold color={C.current}>{n > 1 ? `I ÷ ${n}` : 'I'}</T>
          </g>
        ))}
        <circle cx={320} cy={ys[0]} r={9} fill={C.bg} stroke={C.power} strokeWidth={3} />
        <T x={320} y={ys[0] - 26} anchor="middle" size={13} bold color={C.power}>feed point</T>
        <T x={320} y={ys[n - 1] + 36} anchor="middle" size={14}>
          {`${n} wire${n > 1 ? 's' : ''} each carrying I ÷ ${n}: total radiating current is I`}
        </T>
        <T x={320} y={262} anchor="middle" size={15} bold color={C.resist}>{`Z = 73 Ω × ${n}² = ${z} Ω`}</T>
      </Diagram>
      <Controls>
        <Slider label="Wires in the loop" value={n} min={1} max={3} onChange={setN} color="var(--d-resist)" format={(v) => (v === 1 ? '1 (plain dipole)' : v === 2 ? '2 (folded dipole)' : '3')} />
        <Readout label="Feed point impedance" value={z} unit=" Ω" color="var(--d-resist)" />
      </Controls>
    </>
  )
}
