import { useState } from 'react'
import { C, Choice, Controls, Diagram, Ln, Readout, Slider, T } from '../kit'

type Mode = 'dep' | 'enh'

/** Idealised N-channel curves, normalised. Depletion conducts at 0 V gate; enhancement needs gate voltage first. */
const id = (mode: Mode, v: number) => (mode === 'dep' ? (v > -3 ? Math.min(1, (1 + v / 3) ** 2 / 4) : 0) : v > 1.5 ? Math.min(1, ((v - 1.5) / 2.5) ** 2) : 0)

export function FetGate() {
  const [mode, setMode] = useState<Mode>('dep')
  const [vg, setVg] = useState(0)
  const cur = id(mode, vg)
  const gx = (v: number) => 50 + ((v + 4) / 8) * 260
  const gy = (i: number) => 214 - i * 160
  const pts = Array.from({ length: 81 }, (_, k) => -4 + k * 0.1).map((v) => `${gx(v).toFixed(1)},${gy(id(mode, v)).toFixed(1)}`).join(' ')
  const chH = 6 + cur * 44
  return (
    <>
      <Diagram w={640} h={290}
        title={`Idealised N-channel FET transfer curve for a ${mode === 'dep' ? 'depletion-mode' : 'enhancement-mode'} device. At zero gate volts the drain current is ${id(mode, 0) > 0 ? 'already flowing' : 'zero'}. The gate is insulated, so it draws almost no current.`}
        caption={mode === 'dep' ? 'Depletion mode: conducts with zero gate voltage; gate voltage squeezes the channel shut.' : 'Enhancement mode: no current at zero gate voltage; gate voltage opens the channel.'}>
        <T x={180} y={20} anchor="middle" bold size={14}>Drain current vs gate voltage</T>
        <Ln x1={50} y1={214} x2={316} y2={214} width={1.5} />
        <Ln x1={gx(0)} y1={50} x2={gx(0)} y2={214} width={1.5} dash="4 4" color={C.muted} />
        <polyline points={pts} fill="none" stroke={C.current} strokeWidth={3} />
        <circle cx={gx(vg)} cy={gy(cur)} r={6} fill={C.power} />
        <T x={gx(0)} y={232} anchor="middle" size={12} color={C.muted}>gate 0 V</T>
        <T x={50} y={232} anchor="middle" size={12} color={C.muted}>−4 V</T>
        <T x={310} y={232} anchor="middle" size={12} color={C.muted}>+4 V</T>
        <T x={46} y={44} anchor="end" size={12} color={C.muted}>I drain</T>
        <T x={180} y={256} anchor="middle" size={13} bold color={id(mode, 0) > 0 ? C.good : C.bad}>
          {id(mode, 0) > 0 ? 'current flows at zero gate volts' : 'no current at zero gate volts'}
        </T>

        <T x={495} y={12} anchor="middle" bold size={14}>The channel</T>
        <rect x={410} y={120 - chH / 2} width={170} height={chH} fill={C.current} opacity={0.45} />
        <rect x={410} y={70} width={170} height={100} fill="none" stroke={C.ink} strokeWidth={2} />
        <rect x={440} y={44} width={110} height={14} fill={C.power} opacity={0.5} stroke={C.ink} strokeWidth={2} />
        <T x={495} y={32} anchor="middle" size={12} bold>gate (insulated)</T>
        <T x={402} y={120} anchor="end" size={13} bold>source</T>
        <T x={588} y={120} size={13} bold>drain</T>
        <T x={500} y={190} anchor="middle" size={13} color={C.muted}>channel width follows gate voltage</T>
        <T x={500} y={214} anchor="middle" size={13} bold>gate current ≈ 0</T>
        <T x={500} y={234} anchor="middle" size={13} color={C.muted}>voltage-controlled:</T>
        <T x={500} y={252} anchor="middle" size={13} color={C.muted}>very high input impedance</T>
      </Diagram>
      <Choice label="FET type" value={mode} onChange={setMode} options={[{ value: 'dep', label: 'Depletion mode' }, { value: 'enh', label: 'Enhancement mode' }]} />
      <Controls>
        <Slider label="Gate voltage" value={vg} min={-4} max={4} step={0.5} onChange={setVg} format={(v) => `${v > 0 ? '+' : ''}${v} V`} color={C.voltage} />
        <Readout label="Drain current (relative)" value={Math.round(cur * 100)} unit=" %" color={C.current} />
      </Controls>
    </>
  )
}
