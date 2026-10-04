import { useState } from 'react'
import { C, Controls, Diagram, Readout, Slider, T, fmt } from '../kit'

/** Interactive battery-runtime budget for a go kit. Currents are illustrative, not a specific radio. */
export function GoKits_Budget() {
  const [ah, setAh] = useState(35)
  const [usable, setUsable] = useState(80)
  const [rx, setRx] = useState(1.5)
  const [tx, setTx] = useState(20)
  const [duty, setDuty] = useState(20)
  const d = duty / 100
  const avg = rx * (1 - d) + tx * d
  const avail = (ah * usable) / 100
  const hrs = avail / avg
  const bar = Math.min(1, hrs / 24)
  return (
    <>
      <Diagram w={640} h={250} title={`Runtime budget. Receive ${rx} amps for ${100 - duty} percent of the time and transmit ${tx} amps for ${duty} percent gives an average of ${fmt(avg, 3)} amps. A ${ah} amp-hour battery of which ${usable} percent is usable holds ${fmt(avail, 3)} amp-hours, so it lasts ${fmt(hrs, 3)} hours.`}
        caption="Illustrative currents for a typical 100 W HF radio at 13.8 V. Check your own radio's specification.">
        <T x={14} y={22} size={14} bold color={C.current}>1. Average current</T>
        <T x={14} y={48} size={13.5} mono>{`${rx} A × ${fmt(1 - d, 3)} + ${tx} A × ${fmt(d, 3)}`}</T>
        <T x={14} y={72} size={15} bold mono color={C.current}>{`= ${fmt(avg, 3)} A average`}</T>
        <T x={340} y={22} size={14} bold color={C.voltage}>2. Usable capacity</T>
        <T x={340} y={48} size={13.5} mono>{`${ah} Ah × ${usable}%`}</T>
        <T x={340} y={72} size={15} bold mono color={C.voltage}>{`= ${fmt(avail, 3)} Ah`}</T>
        <T x={14} y={116} size={14} bold color={C.good}>3. Runtime = Ah ÷ A</T>
        <T x={14} y={142} size={17} bold mono color={C.good}>{`${fmt(avail, 3)} ÷ ${fmt(avg, 3)} = ${fmt(hrs, 3)} hours`}</T>
        <rect x={14} y={176} width={612} height={26} rx={8} fill={C.fill} stroke={C.ink} strokeWidth={1.8} />
        <rect x={16} y={178} width={Math.max(2, 608 * bar)} height={22} rx={6} fill={C.good} fillOpacity={0.55} />
        <T x={14} y={222} size={12.5} color={C.muted}>0 h</T>
        <T x={626} y={222} anchor="end" size={12.5} color={C.muted}>24 h (bar is capped here)</T>
      </Diagram>
      <Controls>
        <Slider label="Battery capacity" value={ah} min={7} max={100} step={1} onChange={setAh} format={(v) => `${v} Ah`} color={C.voltage} />
        <Slider label="Usable fraction" value={usable} min={50} max={100} step={5} onChange={setUsable} format={(v) => `${v}%`} color={C.voltage} />
        <Slider label="Receive current" value={rx} min={0.5} max={3} step={0.1} onChange={setRx} format={(v) => `${v} A`} color={C.current} />
        <Slider label="Transmit current" value={tx} min={2} max={25} step={1} onChange={setTx} format={(v) => `${v} A`} color={C.current} />
        <Slider label="Time transmitting" value={duty} min={0} max={50} step={5} onChange={setDuty} format={(v) => `${v}%`} color={C.power} />
        <Readout label="Runtime" value={fmt(hrs, 3)} unit="h" color={C.good} />
      </Controls>
    </>
  )
}
