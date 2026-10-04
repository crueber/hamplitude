import { useState } from 'react'
import { C, Choice, Diagram, Ln, T, useTime } from '../kit'

type Mode = 'es' | 'meteor' | 'aurora'
const INFO: Record<Mode, { name: string; l1: string; l2: string }> = {
  es: { name: 'Sporadic E', l1: 'Patches of ionization in the E region reflect VHF.', l2: 'Occasional strong signals on 10, 6 and 2 m, from beyond the horizon.' },
  meteor: { name: 'Meteor scatter', l1: 'A meteor trail briefly reflects the signal.', l2: 'Best band: 6 m.' },
  aurora: { name: 'Auroral backscatter', l1: 'Signals scatter off the aurora.', l2: 'Distorted, with a characteristic raspy sound.' },
}

/** Three over-the-horizon VHF modes: what reflects the signal, and what they sound like. */
export function Modes() {
  const [mode, setMode] = useState<Mode>('es')
  const { t, ref } = useTime(0.35)
  const A: [number, number] = [110, 232], M: [number, number] = [320, 138], B: [number, number] = [530, 232]
  const f = t % 1.2 > 1 ? 1 : t % 1.2
  const l1 = Math.hypot(M[0] - A[0], M[1] - A[1])
  const l2 = Math.hypot(B[0] - M[0], B[1] - M[1])
  let d = f * (l1 + l2)
  const dot: [number, number] = d <= l1 ? [A[0] + ((M[0] - A[0]) * d) / l1, A[1] + ((M[1] - A[1]) * d) / l1] : (d -= l1, [M[0] + ((B[0] - M[0]) * d) / l2, M[1] + ((B[1] - M[1]) * d) / l2])
  const info = INFO[mode]
  return (
    <>
      <Diagram w={640} h={290} svgRef={ref} title={`${info.name}: ${info.l1} ${info.l2}`} caption="Schematic side view. Each mode gets a signal past the horizon.">
        <T x={20} y={22} bold size={16} color={C.power}>{info.name}</T>
        <T x={20} y={46} size={14}>{info.l1}</T>
        <T x={20} y={66} size={14}>{info.l2}</T>
        {mode === 'es' && (
          <g fill={C.power} opacity={0.35} stroke={C.power} strokeWidth={1.5}>
            <ellipse cx={300} cy={128} rx={36} ry={13} />
            <ellipse cx={336} cy={138} rx={30} ry={12} />
            <ellipse cx={318} cy={146} rx={26} ry={10} />
          </g>
        )}
        {mode === 'meteor' && (
          <g>
            <Ln x1={262} y1={104} x2={322} y2={140} color={C.resist} width={5} opacity={0.55} />
            <Ln x1={286} y1={118} x2={322} y2={140} color={C.resist} width={5} />
            <circle cx={324} cy={141} r={6} fill={C.resist} />
          </g>
        )}
        {mode === 'aurora' && (
          <g stroke={C.good} strokeWidth={6} strokeLinecap="round" opacity={0.55}>
            {[0, 1, 2, 3, 4, 5, 6].map((i) => (
              <line key={i} x1={278 + i * 15} y1={112 + (i % 2) * 6} x2={278 + i * 15} y2={158 + ((i * 7) % 3) * 6} />
            ))}
          </g>
        )}
        <T x={320} y={184} anchor="middle" size={13} color={C.muted}>{mode === 'es' ? 'E-region patch' : mode === 'meteor' ? 'ionized trail' : 'aurora'}</T>
        <rect x={20} y={250} width={600} height={30} rx={8} fill={C.fill} stroke={C.muted} strokeWidth={1.5} />
        <Ln x1={110} y1={250} x2={110} y2={232} color={C.ink} width={3} />
        <Ln x1={530} y1={250} x2={530} y2={232} color={C.ink} width={3} />
        <T x={110} y={265} anchor="middle" size={13} bold>You</T>
        <T x={530} y={265} anchor="middle" size={13} bold>Distant station</T>
        <polyline points={`${A} ${M} ${B}`} fill="none" stroke={C.signal} strokeWidth={3} strokeDasharray="2 7" strokeLinecap="round" />
        <circle cx={dot[0]} cy={dot[1]} r={7} fill={C.signal} stroke={C.bg} strokeWidth={2} />
      </Diagram>
      <div style={{ margin: '-6px 0 14px' }}>
        <Choice label="Mode" value={mode} onChange={setMode}
          options={[{ value: 'es', label: 'Sporadic E' }, { value: 'meteor', label: 'Meteor scatter' }, { value: 'aurora', label: 'Aurora' }]} />
      </div>
    </>
  )
}
