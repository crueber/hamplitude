import { useState } from 'react'
import { C, Controls, Diagram, Ln, Readout, Slider, T, Transistor, fmt } from '../kit'

/** Beta = collector current change per base current change. A small base current controls a big collector current. */
export function BjtBeta() {
  const [ib, setIb] = useState(40) // µA
  const [beta, setBeta] = useState(100)
  const ic = (ib * beta) / 1000 // mA
  const on = ib > 0
  const barH = 150
  return (
    <>
      <Diagram w={640} h={280}
        title={`An NPN transistor with base current ${ib} microamps and beta ${beta} gives collector current ${fmt(ic)} milliamps. The base-to-emitter voltage is about 0.65 volts when it is on.`}
        caption="Collector current = beta × base current. A small base current steers a large collector current.">
        <g transform="translate(150,150) scale(1.5)">
          <Transistor x={0} y={0} kind="npn" />
        </g>
        <T x={92} y={116} size={13} bold color={C.muted}>B</T>
        <T x={212} y={78} size={13} bold color={C.muted}>C</T>
        <T x={212} y={226} size={13} bold color={C.muted}>E</T>
        <Ln x1={28} y1={150} x2={92} y2={150} color={C.current} width={on ? 2 + ib / 25 : 2} arrow={on} />
        <T x={28} y={172} size={13} bold color={C.current}>I base</T>
        <Ln x1={171} y1={32} x2={171} y2={82} color={C.current} width={on ? 2 + ic / 4 : 2} arrow={on} />
        <T x={181} y={44} size={13} bold color={C.current}>I collector</T>
        <T x={116} y={258} anchor="middle" size={14} bold color={on ? C.good : C.bad}>
          {on ? 'on: base-emitter ≈ 0.65 V' : 'off: base-emitter well under 0.6 V'}
        </T>
        <g>
          <rect x={360} y={50} width={46} height={barH} rx={6} fill={C.fill} />
          <rect x={360} y={50 + barH - (barH * ib) / 100} width={46} height={(barH * ib) / 100} rx={6} fill={C.current} />
          <T x={383} y={226} anchor="middle" size={13} bold>I base</T>
          <T x={383} y={36} anchor="middle" size={13} color={C.muted}>{ib} µA</T>
          <rect x={500} y={50} width={46} height={barH} rx={6} fill={C.fill} />
          <rect x={500} y={50 + barH - (barH * ic) / 30} width={46} height={(barH * ic) / 30} rx={6} fill={C.current} />
          <T x={523} y={226} anchor="middle" size={13} bold>I collector</T>
          <T x={523} y={36} anchor="middle" size={13} color={C.muted}>{fmt(ic)} mA</T>
          <T x={453} y={130} anchor="middle" size={20} bold color={C.power}>× {beta}</T>
        </g>
      </Diagram>
      <Controls>
        <Slider label="Base current" value={ib} min={0} max={100} step={5} onChange={setIb} format={(v) => `${v} µA`} color={C.current} />
        <Slider label="Beta (current gain)" value={beta} min={50} max={300} step={10} onChange={setBeta} format={(v) => `${v}`} color={C.power} />
        <Readout label="Collector current" value={fmt(ic)} unit=" mA" color={C.current} />
      </Controls>
    </>
  )
}
