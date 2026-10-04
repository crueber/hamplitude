import { useState } from 'react'
import { C, Choice, Diagram, Ln, T, Wire } from '../kit'

/** Stray feedback inside an amplifier can make it oscillate; neutralizing adds an equal, opposite feedback to cancel it. */
export function Neutralize() {
  const [mode, setMode] = useState<'off' | 'on'>('off')
  const on = mode === 'on'
  return (
    <>
      <Diagram w={640} h={290} title={on ? 'Amplifier with a neutralizing path that feeds back an equal but out-of-phase signal. It cancels the unwanted feedback, so the amplifier stays stable.' : 'Amplifier with an unwanted feedback path from output to input through internal capacitance. The feedback is in phase and the amplifier can oscillate by itself.'}
        caption={on ? 'Equal and opposite feedback cancels. No net feedback, no self-oscillation.' : 'Unwanted feedback can reinforce the input and the stage breaks into oscillation.'}>
        <polygon points="240,100 240,180 320,140" fill={C.fill} stroke={C.ink} strokeWidth={2.2} strokeLinejoin="round" />
        <T x={262} y={140} size={13} bold anchor="middle">Amp</T>
        <Ln x1={110} y1={140} x2={238} y2={140} color={C.signal} width={3} arrow />
        <T x={110} y={166} size={13} color={C.muted}>input</T>
        <Ln x1={320} y1={140} x2={540} y2={140} color={C.signal} width={3} arrow />
        <T x={540} y={166} size={13} color={C.muted} anchor="end">output</T>

        <Wire pts={[[470, 140], [470, 56], [170, 56], [170, 140]]} color={C.bad} width={2.5} dash="7 5" />
        <rect x={270} y={44} width={110} height={24} fill={C.bg} />
        <T x={325} y={56} anchor="middle" size={13} bold color={C.bad}>stray feedback</T>
        <T x={325} y={34} anchor="middle" size={12} color={C.muted}>through internal capacitance, in phase</T>

        {on && (
          <g>
            <Wire pts={[[400, 140], [400, 232], [190, 232], [190, 140]]} color={C.good} width={2.5} />
            <rect x={238} y={218} width={116} height={28} rx={8} fill={C.fill} stroke={C.good} strokeWidth={2} />
            <T x={296} y={232} anchor="middle" size={13} bold color={C.good}>180° out of phase</T>
            <T x={296} y={266} anchor="middle" size={12} color={C.muted}>neutralizing feedback, equal size</T>
          </g>
        )}
        <T x={320} y={12} anchor="middle" size={14} bold color={on ? C.good : C.bad}>{on ? 'Net feedback: zero' : 'Net feedback: self-oscillation'}</T>
      </Diagram>
      <Choice label="Neutralizing" value={mode} onChange={setMode} options={[{ value: 'off', label: 'Not neutralized' }, { value: 'on', label: 'Neutralized' }]} />
    </>
  )
}
