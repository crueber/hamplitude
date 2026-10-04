import { useState } from 'react'
import { C, Controls, Diagram, Readout, Slider, T, Transformer, Wire } from '../kit'

/** An impedance-matching transformer: each side sees the impedance it wants. Z ratio = turns ratio squared. */
export function MatchXfmr() {
  const [n, setN] = useState(2)
  const zLine = 50
  const zTx = zLine * n * n
  return (
    <>
      <Diagram w={640} h={250} title={`A matching transformer with a turns ratio of ${n} to 1. The feed line is 50 ohms and the transmitter sees ${zTx} ohms.`}
        caption="The transformer lets each side see the impedance it wants.">
        <rect x={20} y={64} width={130} height={100} rx={12} fill={C.fill} stroke={C.ink} strokeWidth={2} />
        <T x={85} y={92} anchor="middle" bold size={14}>Transmitter</T>
        <T x={85} y={122} anchor="middle" bold size={13} color={C.muted}>wants to see</T>
        <T x={85} y={146} anchor="middle" bold size={18} color={C.power}>{zTx} Ω</T>
        <rect x={490} y={64} width={130} height={100} rx={12} fill={C.fill} stroke={C.ink} strokeWidth={2} />
        <T x={555} y={92} anchor="middle" bold size={14}>Feed line</T>
        <T x={555} y={122} anchor="middle" bold size={13} color={C.muted}>wants to see</T>
        <T x={555} y={146} anchor="middle" bold size={18} color={C.signal}>{zLine} Ω</T>
        <Wire pts={[[150, 84], [311, 84]]} color={C.muted} width={2.5} />
        <Wire pts={[[150, 144], [311, 144]]} color={C.muted} width={2.5} />
        <Wire pts={[[329, 84], [490, 84]]} color={C.muted} width={2.5} />
        <Wire pts={[[329, 144], [490, 144]]} color={C.muted} width={2.5} />
        <Transformer x={320} y={114} color={C.ink} />
        <T x={320} y={176} anchor="middle" bold size={14}>{n} : 1 turns</T>
        <T x={320} y={204} anchor="middle" size={13} color={C.muted}>Z ratio = (turns ratio)² = {n}² = {n * n}</T>
      </Diagram>
      <Controls>
        <Slider label="Turns ratio (primary : secondary)" value={n} min={1} max={4} step={0.5} onChange={setN} format={(v) => `${v} : 1`} color={C.power} />
        <Readout label="Transmitter side" value={zTx} unit="Ω" color={C.power} />
      </Controls>
    </>
  )
}
