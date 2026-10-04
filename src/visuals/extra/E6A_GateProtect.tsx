import { useState } from 'react'
import { C, Choice, Controls, Diagram, Ln, Slider, T, Wire, Capacitor, Ground } from '../kit'

/** A MOSFET gate is a capacitor with a very thin oxide. A zener from gate to source clamps static spikes. */
export function GateProtect() {
  const [guard, setGuard] = useState<'no' | 'yes'>('yes')
  const [zap, setZap] = useState(70)
  const limit = 40
  const clamp = 30
  const v = guard === 'yes' ? Math.min(zap, clamp) : zap
  const dead = v > limit
  const barTop = 50
  const barH = 170
  const py = (x: number) => barTop + barH - (x / 100) * barH
  const on = guard === 'yes'
  return (
    <>
      <Diagram w={640} h={260}
        title={`A static zap of ${zap} percent reaches a MOSFET gate. ${on ? 'A zener diode from gate to source clamps it to a safe level.' : 'With no zener the gate oxide sees the full spike.'} The gate ${dead ? 'is destroyed' : 'survives'}.`}
        caption={on ? 'The zener clamps the spike below the oxide limit.' : 'No protection: the thin oxide punches through.'}>
        <Wire pts={[[40, 60], [230, 60]]} color={C.muted} width={2.5} />
        <T x={40} y={42} size={13} bold color={C.power}>static zap</T>
        <circle cx={120} cy={60} r={3.5} fill={C.ink} />
        <Wire pts={[[230, 60], [230, 96]]} color={C.muted} width={2.5} />
        <Wire pts={[[230, 164], [230, 206], [120, 206]]} color={C.muted} width={2.5} />
        <Capacitor x={230} y={130} rot={90} len={68} />
        <T x={252} y={130} size={13} bold>gate oxide</T>
        <T x={252} y={148} size={12} color={C.muted}>thin insulator</T>
        <g opacity={on ? 1 : 0.2}>
          <Wire pts={[[120, 60], [120, 100]]} color={C.ink} />
          <g stroke={C.ink} strokeWidth={2.2} fill="none" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="104,94 108,100 132,100 136,106" />
            <polygon points="108,134 132,134 120,102" fill={C.ink} fillOpacity={0.15} />
          </g>
          <Wire pts={[[120, 134], [120, 206]]} color={C.ink} />
          <T x={96} y={118} anchor="end" size={13} bold>zener</T>
        </g>
        <Ground x={175} y={206} />
        <T x={120} y={246} size={12} color={C.muted}>gate to source</T>

        <rect x={450} y={barTop} width={60} height={barH} rx={6} fill={C.fill} />
        <rect x={450} y={py(v)} width={60} height={(v / 100) * barH} rx={6} fill={dead ? C.bad : C.good} />
        <Ln x1={436} y1={py(limit)} x2={560} y2={py(limit)} color={C.bad} width={2} dash="5 4" />
        <T x={564} y={py(limit)} size={12} bold color={C.bad}>oxide limit</T>
        <T x={480} y={34} anchor="middle" size={13} bold>gate voltage</T>
        <T x={480} y={barTop + barH + 20} anchor="middle" size={13} bold color={dead ? C.bad : C.good}>{dead ? 'gate destroyed' : 'gate safe'}</T>
      </Diagram>
      <Choice label="Protection" value={guard} onChange={setGuard} options={[{ value: 'no', label: 'No zener' }, { value: 'yes', label: 'Zener across gate' }]} />
      <Controls>
        <Slider label="Static voltage" value={zap} min={0} max={100} step={5} onChange={setZap} format={(x) => `${x} %`} color={C.power} />
      </Controls>
    </>
  )
}
