import { useState } from 'react'
import { C, Controls, Diagram, Readout, Slider, T, fmt } from '../kit'

const VOUT = 12
const DROPOUT = 2 // example value for the picture only

/** A series linear regulator burns (Vin - Vout) x I as heat. Below dropout it loses regulation. */
export function PassHeat() {
  const [vin, setVin] = useState(25)
  const [amps, setAmps] = useState(2)
  const vout = Math.min(VOUT, vin - DROPOUT)
  const reg = vin - DROPOUT >= VOUT
  const drop = vin - vout
  const heat = drop * amps
  const pout = vout * amps
  const x0 = 24, W = 592, sc = W / 30
  const pTot = vin * amps
  const pScale = W / 160
  return (
    <>
      <Diagram w={640} h={250} title={`Series regulator: ${vin} V in, ${fmt(vout, 3)} V out at ${amps} A. Voltage dropped across the pass transistor is ${fmt(drop, 3)} V, so it dissipates ${fmt(heat, 3)} W.`}
        caption="Heat in the pass transistor = (input voltage − output voltage) × output current.">
        <T x={x0} y={20} size={14} bold>Voltage</T>
        <rect x={x0} y={34} width={vout * sc} height={34} rx={6} fill={C.good} opacity={0.85} />
        <rect x={x0 + vout * sc} y={34} width={drop * sc} height={34} rx={6} fill={C.resist} opacity={0.85} />
        <T x={x0 + (vout * sc) / 2} y={51} anchor="middle" size={13} bold color={C.bg}>{`out ${fmt(vout, 3)} V`}</T>
        {drop * sc > 110 && <T x={x0 + vout * sc + (drop * sc) / 2} y={51} anchor="middle" size={13} bold color={C.bg}>{`dropped ${fmt(drop, 3)} V`}</T>}
        {drop * sc <= 110 && <T x={x0 + vout * sc + drop * sc + 8} y={51} size={13} bold color={C.resist}>{`dropped ${fmt(drop, 3)} V`}</T>}
        <T x={x0} y={84} size={12} color={C.muted}>0 V</T>
        <T x={x0 + W} y={84} anchor="end" size={12} color={C.muted}>30 V</T>
        <T x={x0} y={116} size={14} bold>Power</T>
        <rect x={x0} y={130} width={pout * pScale} height={34} rx={6} fill={C.good} opacity={0.85} />
        <rect x={x0 + pout * pScale} y={130} width={heat * pScale} height={34} rx={6} fill={C.resist} opacity={0.85} />
        <T x={x0 + (pout * pScale) / 2} y={147} anchor="middle" size={13} bold color={C.bg}>{`load ${fmt(pout, 3)} W`}</T>
        {heat * pScale > 90 && <T x={x0 + pout * pScale + (heat * pScale) / 2} y={147} anchor="middle" size={13} bold color={C.bg}>{`heat ${fmt(heat, 3)} W`}</T>}
        {heat * pScale <= 90 && <T x={x0 + pout * pScale + heat * pScale + 8} y={147} size={13} bold color={C.resist}>{`heat ${fmt(heat, 3)} W`}</T>}
        <T x={x0} y={180} size={12} color={C.muted}>{`total taken from the supply: ${fmt(pTot, 3)} W`}</T>
        <T x={320} y={214} anchor="middle" size={15} bold color={reg ? C.ink : C.bad}>{`(${vin} − ${fmt(vout, 3)}) V × ${amps} A = ${fmt(heat, 3)} W heat`}</T>
        <T x={320} y={236} anchor="middle" size={13} bold color={reg ? C.good : C.bad}>{reg ? 'Regulating: output held at 12 V' : `Dropout: input is less than output + ${DROPOUT} V (example dropout), so the output falls`}</T>
      </Diagram>
      <Controls>
        <Slider label="Input voltage" value={vin} min={10} max={30} onChange={setVin} format={(v) => `${v} V`} color={C.voltage} />
        <Slider label="Output current" value={amps} min={0.5} max={5} step={0.5} onChange={setAmps} format={(v) => `${v} A`} color={C.current} />
        <Readout label="Heat in pass transistor" value={fmt(heat, 3)} unit="W" color={C.resist} />
      </Controls>
    </>
  )
}
