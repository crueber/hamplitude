import { useState } from 'react'
import { C, Choice, Controls, Diagram, Ln, Readout, Slider, T, fmt } from '../kit'

type Mode = 'P' | 'I'

/** Power is the area of an E × I rectangle: P = E × I, and I = P ÷ E. */
export function PowerCalc() {
  const [mode, setMode] = useState<Mode>('P')
  const [e, setE] = useState(13.8)
  const [i, setI] = useState(10)
  const [p, setP] = useState(120)
  const [e2, setE2] = useState(12)
  const E = mode === 'P' ? e : e2
  const P = mode === 'P' ? e * i : p
  const I = mode === 'P' ? i : p / e2
  const kx = 14, ky = mode === 'P' ? 9 : 4.5
  const ox = 110, oy = 222
  const rw = E * kx, rh = I * ky
  const big = rw > 110 && rh > 44
  const eqs = mode === 'P'
    ? ['P = E × I', `= ${fmt(e)} × ${fmt(i)}`, `= ${fmt(P)} W`]
    : ['I = P ÷ E', `= ${fmt(p)} ÷ ${fmt(e2)}`, `= ${fmt(I)} A`]
  return (
    <>
      <Diagram w={640} h={272}
        title={`Power is voltage times current. ${fmt(E)} volts and ${fmt(I)} amperes give ${fmt(P)} watts.`}
        caption="Width is volts, height is amperes, area is watts.">
        <Ln x1={ox} y1={oy} x2={ox + 360} y2={oy} color={C.fill2} width={2} />
        <Ln x1={ox} y1={oy} x2={ox} y2={oy - 200} color={C.fill2} width={2} />
        <rect x={ox} y={oy - rh} width={rw} height={rh} fill={C.power} opacity={0.22} />
        <rect x={ox} y={oy - rh} width={rw} height={rh} fill="none" stroke={C.power} strokeWidth={3} />
        <Ln x1={ox} y1={oy + 14} x2={ox + rw} y2={oy + 14} color={C.voltage} width={3} arrow="both" />
        <T x={ox + rw / 2} y={oy + 32} anchor="middle" bold size={15} color={C.voltage}>E = {fmt(E)} V</T>
        <Ln x1={ox - 14} y1={oy} x2={ox - 14} y2={oy - rh} color={C.current} width={3} arrow="both" />
        <T x={ox - 24} y={oy - rh / 2} anchor="end" bold size={15} color={C.current}>I = {fmt(I)} A</T>
        {big && <T x={ox + rw / 2} y={oy - rh / 2} anchor="middle" bold size={20} color={C.power}>{fmt(P)} W</T>}
        <rect x={470} y={50} width={160} height={150} rx={12} fill={C.fill} />
        <T x={550} y={78} anchor="middle" bold mono size={20}>{eqs[0]}</T>
        <T x={550} y={116} anchor="middle" mono size={15} color={C.muted}>{eqs[1]}</T>
        <T x={550} y={158} anchor="middle" bold size={24} color={mode === 'P' ? C.power : C.current}>{eqs[2]}</T>
      </Diagram>
      <Controls>
        <div>
          <span className="ctl-label" style={{ display: 'block', marginBottom: 6 }}>Find</span>
          <Choice label="Find" value={mode} onChange={setMode} options={[{ value: 'P', label: 'Power' }, { value: 'I', label: 'Current' }]} />
        </div>
        {mode === 'P' ? (
          <>
            <Slider label="Voltage (E)" value={e} min={1} max={24} step={0.1} onChange={setE} format={(v) => `${fmt(v)} V`} color="var(--d-voltage)" />
            <Slider label="Current (I)" value={i} min={0.5} max={20} step={0.5} onChange={setI} format={(v) => `${fmt(v)} A`} color="var(--d-current)" />
            <Readout label="Power (P = E × I)" value={fmt(P)} unit="W" color="var(--d-power)" />
          </>
        ) : (
          <>
            <Slider label="Power (P)" value={p} min={10} max={240} step={10} onChange={setP} format={(v) => `${v} W`} color="var(--d-power)" />
            <Slider label="Voltage (E)" value={e2} min={6} max={24} step={0.1} onChange={setE2} format={(v) => `${fmt(v)} V`} color="var(--d-voltage)" />
            <Readout label="Current (I = P ÷ E)" value={fmt(I)} unit="A" color="var(--d-current)" />
          </>
        )}
      </Controls>
    </>
  )
}
