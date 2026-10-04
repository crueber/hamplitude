import { useState } from 'react'
import { C, Choice, Diagram, T } from '../kit'

/** Normal multi-hop bounces off the ground between ionospheric refractions; chordal hop never touches the ground. */
export function Chordal() {
  const [chord, setChord] = useState(true)
  const R = 340, Hh = 52, ox = 320, oy = 440
  const d = (deg: number) => (deg * Math.PI) / 180
  const at = (deg: number, r: number): [number, number] => [ox + r * Math.sin(d(deg)), oy - r * Math.cos(d(deg))]
  const path = chord
    ? [at(-45, R), at(-33, R + Hh), at(0, R + Hh - 2), at(33, R + Hh), at(45, R)]
    : [at(-45, R), at(-30, R + Hh), at(-15, R), at(0, R + Hh), at(15, R), at(30, R + Hh), at(45, R)]
  const bounces = chord ? [] : [at(-15, R), at(15, R)]
  const col = chord ? C.good : C.resist
  return (
    <>
      <Diagram w={640} h={290} title={chord ? 'Chordal hop: the signal is refracted from one ionospheric point to the next without touching the ground in between, so it loses less' : 'Normal multi-hop skip: the signal reflects off the ground between each ionospheric refraction, and the ground bounce costs signal'}
        caption="Not to scale. Side view of a long path.">
        <circle cx={ox} cy={oy} r={R + Hh} fill="none" stroke={C.muted} strokeWidth={22} opacity={0.2} />
        <circle cx={ox} cy={oy} r={R} fill={C.fill} stroke={C.muted} strokeWidth={2} />
        <T x={608} y={26} anchor="end" size={13} bold color={C.muted}>Ionosphere</T>
        <polyline points={path.map((p) => p.join(',')).join(' ')} fill="none" stroke={col} strokeWidth={3.5} strokeLinejoin="round" />
        {bounces.map((p, i) => (
          <g key={i}>
            <circle cx={p[0]} cy={p[1]} r={7} fill={C.bad} stroke={C.bg} strokeWidth={2} />
            <T x={p[0]} y={p[1] + 22} anchor="middle" size={13} bold color={C.bad}>ground loss</T>
          </g>
        ))}
        {[at(-45, R), at(45, R)].map((p, i) => <circle key={i} cx={p[0]} cy={p[1]} r={7} fill={C.ink} stroke={C.bg} strokeWidth={2} />)}
        <T x={at(-45, R)[0]} y={at(-45, R)[1] + 22} anchor="middle" size={13} bold>You</T>
        <T x={at(45, R)[0]} y={at(45, R)[1] + 22} anchor="middle" size={13} bold>Far station</T>
        <T x={ox} y={178} anchor="middle" size={15} bold color={col}>{chord ? 'Chordal hop: ionosphere to ionosphere' : 'Multi-hop: ground in between'}</T>
        <T x={ox} y={204} anchor="middle" size={14} color={C.muted}>{chord ? 'No ground bounce, so less loss' : 'Each bounce off the Earth costs signal'}</T>
      </Diagram>
      <div style={{ margin: '-6px 0 14px' }}>
        <Choice label="Propagation" value={chord ? 'c' : 'm'} onChange={(v) => setChord(v === 'c')} options={[{ value: 'm', label: 'Multi-hop' }, { value: 'c', label: 'Chordal hop' }]} />
      </div>
    </>
  )
}
