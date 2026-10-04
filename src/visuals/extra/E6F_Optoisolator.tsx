import { useState } from 'react'
import { C, Choice, Diagram, Ln, T, Wire, Battery, Switch, Transistor, Lamp } from '../kit'

/** An optoisolator: an LED shines on a phototransistor across an insulating gap, so control and load circuits share no electrical connection. */
export function Optoisolator() {
  const [on, setOn] = useState<'off' | 'on'>('on')
  const lit = on === 'on'
  return (
    <>
      <Diagram w={640} h={290}
        title={`An optoisolator. A low-voltage control circuit drives an LED; its light reaches a phototransistor in a separate load circuit. The control switch is ${lit ? 'closed, so the LED lights and the load is on' : 'open, so the LED is dark and the load is off'}. There is no electrical connection between the two sides.`}
        caption="Light is the only link: control side and load side stay electrically isolated.">
        <T x={120} y={20} anchor="middle" bold size={14}>Control circuit</T>
        <T x={500} y={20} anchor="middle" bold size={14}>Circuit being switched</T>
        <Wire pts={[[60, 80], [60, 60], [200, 60]]} color={C.muted} width={2.5} />
        <Wire pts={[[60, 150], [60, 230], [200, 230]]} color={C.muted} width={2.5} />
        <Wire pts={[[200, 60], [200, 98]]} color={C.muted} width={2.5} />
        <Wire pts={[[200, 192], [200, 230]]} color={C.muted} width={2.5} />
        <rect x={44} y={80} width={32} height={70} fill={C.bg} />
        <Battery x={60} y={115} rot={90} len={64} color={C.voltage} />
        <rect x={110} y={44} width={70} height={32} fill={C.bg} />
        <Switch x={145} y={60} len={56} closed={lit} />
        <rect x={184} y={110} width={32} height={68} fill={C.bg} />
        <g transform="translate(200,145)" stroke={lit ? C.good : C.ink} strokeWidth={2.4} fill="none" strokeLinecap="round" strokeLinejoin="round">
          <line x1={0} y1={-47} x2={0} y2={-14} />
          <polygon points="-14,-14 14,-14 0,12" fill={lit ? C.good : C.ink} fillOpacity={0.2} />
          <line x1={-14} y1={12} x2={14} y2={12} />
          <line x1={0} y1={12} x2={0} y2={47} />
        </g>
        <T x={170} y={145} anchor="end" size={13} bold color={lit ? C.good : C.muted}>LED</T>
        {lit && (
          <>
            <Ln x1={226} y1={128} x2={286} y2={128} color={C.resist} width={3} arrow />
            <Ln x1={226} y1={148} x2={286} y2={148} color={C.resist} width={3} arrow />
          </>
        )}
        <Ln x1={256} y1={34} x2={256} y2={268} color={C.bad} width={2} dash="6 5" />
        <T x={256} y={282} anchor="middle" size={12} bold color={C.bad}>insulating gap</T>
        <g transform="translate(330,145) scale(1.1)">
          <Transistor x={0} y={0} kind="npn" />
        </g>
        <T x={330} y={252} anchor="middle" size={13} bold color={lit ? C.good : C.muted}>phototransistor</T>
        <Wire pts={[[353, 99], [353, 60], [560, 60], [560, 90]]} color={lit ? C.good : C.muted} width={2.5} />
        <Wire pts={[[353, 191], [353, 230], [560, 230], [560, 200]]} color={lit ? C.good : C.muted} width={2.5} />
        <rect x={544} y={90} width={32} height={110} fill={C.bg} />
        <Battery x={560} y={175} rot={90} len={40} color={C.voltage} />
        {lit && <circle cx={560} cy={125} r={24} fill={C.resist} opacity={0.5} />}
        <rect x={544} y={98} width={32} height={54} fill={C.bg} opacity={lit ? 0 : 1} />
        <Lamp x={560} y={125} rot={90} len={54} color={lit ? C.resist : C.ink} />
        <T x={590} y={125} size={13} bold color={C.muted}>load</T>
      </Diagram>
      <Choice label="Control switch" value={on} onChange={setOn} options={[{ value: 'off', label: 'Control switch open' }, { value: 'on', label: 'Control switch closed' }]} />
    </>
  )
}
