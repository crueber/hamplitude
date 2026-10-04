import { useState } from 'react'
import { C, Choice, Controls, Diagram, Ln, Slider, T, fmt, sinePath, si } from '../kit'

type Mode = 'pp' | 'carrier'
const R = 50

/** PEP from peak-to-peak volts: halve, times 0.707, square, divide by R. For an unmodulated carrier PEP equals average power. */
export function G5B_PepSteps() {
  const [mode, setMode] = useState<Mode>('pp')
  const [vpp, setVpp] = useState(200)
  const [avg, setAvg] = useState(1060)
  const pk = vpp / 2, rms = pk / Math.SQRT2, pep = rms ** 2 / R
  const box = (x: number, label: string, val: string, col: string) => (
    <g>
      <rect x={x} y={60} width={108} height={74} rx={12} fill={C.fill} stroke={col} strokeWidth={2.5} />
      <T x={x + 54} y={82} anchor="middle" size={13} color={C.muted}>{label}</T>
      <T x={x + 54} y={110} anchor="middle" bold size={20} color={col}>{val}</T>
    </g>
  )
  const arrow = (x: number, op: string) => (
    <g>
      <Ln x1={x} y1={97} x2={x + 52} y2={97} color={C.muted} width={2.5} arrow />
      <T x={x + 26} y={78} anchor="middle" bold size={12}>{op}</T>
    </g>
  )
  return (
    <>
      {mode === 'pp' ? (
        <Diagram w={640} h={214}
          title={`PEP from peak-to-peak volts across ${R} ohms. ${vpp} volts peak-to-peak, halve to ${fmt(pk)} peak, times 0.707 is ${fmt(rms, 4)} RMS, squared and divided by ${R} gives ${fmt(pep, 4)} watts.`}
          caption="Four steps from the scope reading to watts.">
          {box(8, 'peak-to-peak', `${fmt(vpp)} V`, C.voltage)}
          {arrow(120, '÷ 2')}
          {box(176, 'peak', `${fmt(pk)} V`, C.voltage)}
          {arrow(288, '× 0.707')}
          {box(344, 'RMS', `${fmt(rms, 4)} V`, C.signal)}
          {arrow(456, 'E² ÷ R')}
          {box(512, 'PEP', si(pep, 'W', 4), C.power)}
          <rect x={10} y={156} width={620} height={46} rx={10} fill={C.fill} />
          <T x={320} y={172} anchor="middle" size={14} mono>{`(${fmt(rms, 4)})² ÷ ${R} = ${fmt(rms ** 2, 5)} ÷ ${R} = ${fmt(pep, 4)} W`}</T>
          <T x={320} y={191} anchor="middle" size={12} color={C.muted}>{`shortcut: PEP = (peak)² ÷ (2 × R) = ${fmt(pk)}² ÷ ${2 * R}`}</T>
        </Diagram>
      ) : (
        <Diagram w={640} h={214}
          title={`An unmodulated carrier has a constant amplitude, so its peak envelope power equals its average power: ${fmt(avg)} watts.`}
          caption="Constant amplitude: the peak of the envelope is the whole signal.">
          <Ln x1={40} y1={34} x2={400} y2={34} color={C.power} width={2} dash="6 4" />
          <Ln x1={40} y1={146} x2={400} y2={146} color={C.power} width={2} dash="6 4" />
          <path d={sinePath(40, 400, 90, 56, 12, 0, 480)} fill="none" stroke={C.signal} strokeWidth={2.5} />
          <T x={220} y={170} anchor="middle" size={13} color={C.muted}>constant-amplitude carrier, no modulation</T>
          <T x={420} y={34} size={13} color={C.power} bold>envelope peak</T>
          <rect x={430} y={60} width={196} height={90} rx={12} fill={C.fill} />
          <T x={528} y={80} anchor="middle" size={13} color={C.muted}>average power</T>
          <T x={528} y={104} anchor="middle" bold size={20} color={C.power}>{fmt(avg)} W</T>
          <T x={528} y={128} anchor="middle" size={13} color={C.muted}>PEP = {fmt(avg)} W</T>
          <T x={220} y={198} anchor="middle" size={14} bold>PEP ÷ average = 1.00</T>
        </Diagram>
      )}
      <Controls>
        <div>
          <span className="ctl-label" style={{ display: 'block', marginBottom: 6 }}>Signal</span>
          <Choice label="Signal" value={mode} onChange={setMode} options={[{ value: 'pp', label: 'Peak-to-peak volts' }, { value: 'carrier', label: 'Unmodulated carrier' }]} />
        </div>
        {mode === 'pp'
          ? <Slider label={`Peak-to-peak voltage (${R} Ω load)`} value={vpp} min={100} max={600} step={10} onChange={setVpp} format={(v) => `${v} V`} color="var(--d-voltage)" />
          : <Slider label="Average power" value={avg} min={100} max={1500} step={10} onChange={setAvg} format={(v) => `${v} W`} color="var(--d-power)" />}
      </Controls>
    </>
  )
}
