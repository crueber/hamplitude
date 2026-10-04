import { useState } from 'react'
import { C, Choice, Diagram, Ln, T } from '../kit'

type Core = 'brass' | 'air' | 'iron' | 'ferrite'
// Illustrative relative permeability, NOT real material data: only the ordering matters.
const MU: Record<Core, number> = { brass: 0.9, air: 1, iron: 6, ferrite: 30 }
const NAME: Record<Core, string> = { brass: 'Brass slug', air: 'Air (no core)', iron: 'Powdered iron', ferrite: 'Ferrite' }

/** Inductance follows core permeability. Higher permeability: more inductance for the same turns, or fewer turns for the same inductance. */
export function CorePermeability() {
  const [core, setCore] = useState<Core>('ferrite')
  const mu = MU[core]
  const rel = mu // relative inductance, same turns
  const turns = Math.round(40 / Math.sqrt(mu))
  const bar = (v: number) => Math.min(190, (Math.log(v * 10) / Math.log(300)) * 190)
  const coils = Math.min(12, Math.max(4, Math.round(turns / 4)))
  return (
    <>
      <Diagram w={640} h={250}
        title={`A coil wound on ${NAME[core]}. ${core === 'brass' ? 'Brass lowers inductance slightly.' : core === 'air' ? 'This is the baseline inductance.' : 'Higher permeability raises inductance for the same turns, so fewer turns give the same inductance.'}`}
        caption="Core permeability sets inductance. Brass lowers it; powdered iron and ferrite raise it. Values are illustrative.">
        <rect x={60} y={80} width={210} height={50} rx={6} fill={core === 'air' ? 'none' : C.fill2} stroke={core === 'air' ? C.muted : C.ink} strokeWidth={2} strokeDasharray={core === 'air' ? '5 4' : undefined} />
        <T x={165} y={50} anchor="middle" size={14} bold color={core === 'air' ? C.muted : C.ink}>{core === 'air' ? 'Air (no core)' : core === 'brass' ? 'Brass slug' : NAME[core] + ' core'}</T>
        <Ln x1={28} y1={105} x2={60} y2={105} width={2.5} color={C.muted} />
        <Ln x1={270} y1={105} x2={302} y2={105} width={2.5} color={C.muted} />
        {Array.from({ length: coils }).map((_, i) => {
          const x = 70 + (i * 190) / (coils - 1)
          return <ellipse key={i} cx={x} cy={105} rx={7} ry={34} fill="none" stroke={C.current} strokeWidth={3} />
        })}
        <T x={165} y={160} anchor="middle" size={13} color={C.muted}>turns for the same inductance: <tspan fontWeight={700}>{turns}</tspan></T>
        <T x={165} y={180} anchor="middle" size={12} color={C.muted}>(fewer turns, more permeable)</T>

        <T x={470} y={50} anchor="middle" size={14} bold>Inductance, same turns</T>
        {(['brass', 'air', 'iron', 'ferrite'] as Core[]).map((c, i) => (
          <g key={c}>
            <T x={380} y={86 + i * 30} anchor="end" size={13} bold={c === core}>{NAME[c]}</T>
            <rect x={388} y={74 + i * 30} width={bar(MU[c])} height={22} rx={4} fill={c === core ? C.current : C.muted} opacity={c === core ? 0.95 : 0.35} />
          </g>
        ))}
        <T x={470} y={218} anchor="middle" size={12} color={C.muted}>permeability: {mu < 1 ? 'a little below air' : mu === 1 ? 'baseline' : 'above air'} · {rel < 1 ? 'inductance falls' : rel === 1 ? 'reference' : 'inductance rises'}</T>
      </Diagram>
      <Choice label="Core" value={core} onChange={setCore} options={(['brass', 'air', 'iron', 'ferrite'] as Core[]).map((c) => ({ value: c, label: NAME[c] }))} />
    </>
  )
}
