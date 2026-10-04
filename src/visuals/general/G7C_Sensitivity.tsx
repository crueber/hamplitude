import { useState } from 'react'
import { C, Controls, Diagram, Ln, Readout, Slider, T } from '../kit'

const BWS = [250, 500, 1000, 2400, 6000]
const SIG = -125
const D0 = -160, D1 = -110, Y0 = 270, Y1 = 40
const py = (d: number) => Y0 - ((d - D0) / (D1 - D0)) * (Y0 - Y1)

/** Noise floor = −174 dBm/Hz + 10 log(bandwidth) + noise figure. A signal under the floor is not heard. */
export function Sensitivity() {
  const [bi, setBi] = useState(3)
  const [nf, setNf] = useState(8)
  const bw = BWS[bi]
  const bwDb = 10 * Math.log10(bw)
  const floor = -174 + bwDb + nf
  const heard = SIG > floor
  const col = heard ? C.good : C.bad
  return (
    <>
      <Diagram w={640} h={310} title={`Receiver noise floor is minus 174 plus ${bwDb.toFixed(1)} plus ${nf} equals ${floor.toFixed(1)} dBm. A weak signal at ${SIG} dBm is ${heard ? 'above the floor and heard' : 'below the floor and buried'}.`}
        caption="A lower noise floor means weaker signals stand out. Narrow the bandwidth or lower the noise figure.">
        <T x={20} y={30} bold size={14}>Noise floor, step by step</T>
        <T x={20} y={64} size={14} color={C.muted}>Thermal noise</T>
        <T x={290} y={64} anchor="end" bold size={14} mono>−174 dBm/Hz</T>
        <T x={20} y={94} size={14} color={C.muted}>+ 10 log({bw} Hz)</T>
        <T x={290} y={94} anchor="end" bold size={14} mono color={C.current}>{bwDb.toFixed(1)} dB</T>
        <T x={20} y={124} size={14} color={C.muted}>+ noise figure</T>
        <T x={290} y={124} anchor="end" bold size={14} mono color={C.resist}>{nf} dB</T>
        <line x1={20} y1={142} x2={290} y2={142} stroke={C.muted} strokeWidth={2} />
        <T x={20} y={166} bold size={14}>= noise floor</T>
        <T x={290} y={166} anchor="end" bold size={16} mono color={C.power}>{floor.toFixed(1).replace('-', '−')} dBm</T>
        <T x={20} y={214} size={13} color={C.muted}>Gain ahead of the noisy later</T>
        <T x={20} y={232} size={13} color={C.muted}>stages also helps weak signals.</T>

        <Ln x1={360} y1={Y0} x2={360} y2={Y1 - 10} color={C.muted} arrow />
        <T x={366} y={Y1 - 18} anchor="start" size={12} color={C.muted}>stronger</T>
        <rect x={450} y={py(floor)} width={90} height={Y0 - py(floor)} fill={C.muted} opacity={0.35} />
        <line x1={450} y1={py(floor)} x2={540} y2={py(floor)} stroke={C.power} strokeWidth={3} />
        <T x={495} y={Y0 + 16} anchor="middle" size={12} color={C.muted}>noise</T>
        <T x={546} y={py(floor)} size={12} bold color={C.power}>floor</T>
        <Ln x1={576} y1={py(SIG) + 14} x2={576} y2={py(SIG)} color={col} width={4} arrow />
        <line x1={450} y1={py(SIG)} x2={570} y2={py(SIG)} stroke={col} strokeWidth={2.5} strokeDasharray="6 5" />
        <T x={452} y={py(SIG) - 12} size={12} bold color={col}>signal −125 dBm</T>
        <T x={540} y={Y1 + 4} anchor="middle" bold size={14} color={col}>{heard ? 'Heard' : 'Buried in noise'}</T>
      </Diagram>
      <Controls>
        <Slider label="Bandwidth" value={bi} min={0} max={4} onChange={setBi} format={(v) => `${BWS[v]} Hz`} color={C.current} />
        <Slider label="Noise figure" value={nf} min={0} max={15} onChange={setNf} format={(v) => `${v} dB`} color={C.resist} />
        <Readout label="Noise floor" value={floor.toFixed(1)} unit="dBm" color={C.power} />
      </Controls>
    </>
  )
}
