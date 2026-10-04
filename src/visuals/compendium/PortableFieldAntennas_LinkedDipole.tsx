import { useState } from 'react'
import { C, Choice, Controls, Diagram, Ln, T } from '../kit'

/** A linked inverted-V dipole: closing the links adds wire to each leg for a lower band. Lengths are 234 ÷ f(MHz) feet per leg. */
export function PortableFieldAntennas_LinkedDipole() {
  const [band, setBand] = useState<'20' | '40'>('20')
  const lo = band === '40'
  const ax = 320, ay = 64, gy = 262
  const ang = (25 * Math.PI) / 180
  const pt = (s: number, d: number) => [ax + s * d * Math.cos(ang), ay + d * Math.sin(ang)] as const
  const link = 131, full = 262
  return (
    <>
      <Diagram w={640} h={330}
        title={`Linked inverted-V dipole on a pole. On 20 meters the links are open and each leg is about 16.5 feet. On 40 meters the links are closed and each leg is about 32.7 feet. Currently showing ${lo ? '40' : '20'} meters. Typical lengths; trim to the SWR.`}
        caption="Typical lengths. Each leg = 234 ÷ f(MHz) feet; cut long and trim.">
        <Ln x1={ax} y1={ay} x2={ax} y2={gy} color={C.muted} width={5} />
        <T x={ax + 12} y={gy - 24} size={12} color={C.muted}>mast or fishing pole</T>
        <rect x={20} y={gy} width={600} height={20} fill={C.fill2} />
        {[-1, 1].map((s) => {
          const [lx, ly] = pt(s, link), [ex, ey] = pt(s, full)
          return (
            <g key={s}>
              <Ln x1={ax} y1={ay} x2={lx} y2={ly} color={C.current} width={4} />
              <Ln x1={lx} y1={ly} x2={ex} y2={ey} color={lo ? C.current : C.fill2} width={4} dash={lo ? undefined : '5 6'} />
              <rect x={lx - 7} y={ly - 7} width={14} height={14} rx={3} fill={lo ? C.good : C.bg} stroke={lo ? C.good : C.bad} strokeWidth={2.5} />
              <Ln x1={ex} y1={ey} x2={ex + s * 6} y2={gy} color={C.muted} width={1.5} dash="3 4" />
              <T x={lx + s * 8} y={ly - 22} anchor="middle" size={12} bold color={lo ? C.good : C.bad}>link {lo ? 'closed' : 'open'}</T>
            </g>
          )
        })}
        <circle cx={ax} cy={ay} r={7} fill={C.bg} stroke={C.power} strokeWidth={3} />
        <T x={ax + 14} y={ay - 14} size={12} bold color={C.power}>feed point, coax down the mast</T>
        <T x={20} y={26} size={15} bold color={C.ink}>{lo ? '40 m: each leg about 32.7 ft' : '20 m: each leg about 16.5 ft'}</T>
        <T x={20} y={48} size={13} color={C.muted}>{lo ? 'The extra wire is connected.' : 'The extra wire is disconnected.'}</T>
      </Diagram>
      <Controls>
        <Choice label="Band" value={band} onChange={setBand} options={[{ value: '20', label: '20 m: links open' }, { value: '40', label: '40 m: links closed' }]} />
      </Controls>
    </>
  )
}
