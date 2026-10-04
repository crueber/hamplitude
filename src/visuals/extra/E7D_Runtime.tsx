import { useState } from 'react'
import { C, Controls, Diagram, Readout, Slider, T, fmt } from '../kit'

/** Battery operating time = capacity (Ah) divided by average current (A). */
export function Runtime() {
  const [ah, setAh] = useState(60)
  const [a, setA] = useState(5)
  const hrs = ah / a
  const cells = 12
  return (
    <>
      <Diagram w={640} h={170} title={`A ${ah} amp-hour battery feeding an average ${a} amps lasts ${fmt(hrs, 3)} hours.`}
        caption="Hours = amp-hours ÷ amps. More current drains it faster.">
        <rect x={30} y={30} width={460} height={60} rx={10} fill={C.fill} stroke={C.ink} strokeWidth={2.5} />
        <rect x={490} y={46} width={14} height={28} rx={3} fill={C.ink} />
        {Array.from({ length: cells }, (_, i) => <rect key={i} x={40 + i * 37.5} y={40} width={32} height={40} rx={4} fill={C.voltage} opacity={0.75} />)}
        <T x={260} y={110} anchor="middle" size={13} color={C.muted}>{`${ah} Ah of capacity`}</T>
        <T x={520} y={46} size={14} bold color={C.current}>{`${a} A`}</T>
        <T x={520} y={68} size={12} color={C.muted}>average draw</T>
        <T x={320} y={148} anchor="middle" size={17} bold color={C.good}>{`${ah} Ah ÷ ${a} A = ${fmt(hrs, 3)} hours`}</T>
      </Diagram>
      <Controls>
        <Slider label="Capacity" value={ah} min={10} max={100} step={5} onChange={setAh} format={(v) => `${v} Ah`} color={C.voltage} />
        <Slider label="Average current" value={a} min={1} max={20} onChange={setA} format={(v) => `${v} A`} color={C.current} />
        <Readout label="Operating time" value={fmt(hrs, 3)} unit="h" color={C.good} />
      </Controls>
    </>
  )
}
