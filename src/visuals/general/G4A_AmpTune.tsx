import { useState } from 'react'
import { C, Controls, Diagram, Ln, Readout, Slider, T } from '../kit'

const LIMIT = 0.8
const gau = (x: number) => Math.exp(-(((x - 0.5) / 0.11) ** 2))
const floor = (load: number) => 0.3 + 0.5 * load
const plate = (x: number, load: number) => 1 - (1 - floor(load)) * gau(x)
const out = (x: number, load: number) => 0.5 * load * gau(x)

/** Vacuum-tube amplifier: TUNE finds the plate-current dip; LOAD sets output power up to the plate-current limit. */
export function AmpTune() {
  const [tune, setTune] = useState(0.5)
  const [load, setLoad] = useState(0.6)
  const X = (v: number) => 60 + v * 540
  const Y = (v: number) => 236 - v * 180
  const curve = (f: (x: number) => number) => Array.from({ length: 81 }, (_, i) => `${i ? 'L' : 'M'}${X(i / 80).toFixed(1)},${Y(f(i / 80)).toFixed(1)}`).join('')
  const ip = plate(tune, load), op = out(tune, load)
  const tuned = Math.abs(tune - 0.5) < 0.04
  const over = ip > LIMIT
  return (
    <>
      <Diagram w={640} h={272} title="Plate current and output power of a tube amplifier as the TUNE control is turned. Plate current falls to a sharp dip exactly where output power peaks. The LOAD control sets how high the output peak is and how deep the dip goes, while plate current must stay under the maximum."
        caption="TUNE: find the plate-current dip (output peaks). LOAD: raise output without crossing the plate-current limit.">
        <Ln x1={60} y1={Y(0)} x2={600} y2={Y(0)} color={C.muted} width={2} />
        <Ln x1={60} y1={Y(LIMIT)} x2={600} y2={Y(LIMIT)} color={C.bad} width={2} dash="6 5" />
        <T x={598} y={Y(LIMIT) - 11} anchor="end" size={12} bold color={C.bad}>max plate current</T>
        <path d={curve((x) => plate(x, load))} fill="none" stroke={C.current} strokeWidth={3.5} />
        <path d={curve((x) => out(x, load))} fill="none" stroke={C.power} strokeWidth={3.5} />
        <circle cx={X(tune)} cy={Y(ip)} r={8} fill={over ? C.bad : C.current} stroke={C.bg} strokeWidth={3} />
        <circle cx={X(tune)} cy={Y(op)} r={8} fill={C.power} stroke={C.bg} strokeWidth={3} />
        <T x={70} y={24} size={13} bold color={C.current}>plate current</T>
        <T x={170} y={24} size={13} bold color={C.power}>output power</T>
        <T x={330} y={256} anchor="middle" size={12} color={C.muted}>TUNE control →</T>
        <T x={X(0.5)} y={Y(floor(load)) + 24} anchor="middle" size={12} bold color={C.current}>dip</T>
      </Diagram>
      <Controls>
        <Slider label="TUNE" value={tune} min={0} max={1} step={0.01} onChange={setTune} format={() => ''} color="var(--d-current)" />
        <Slider label="LOAD" value={load} min={0.1} max={1.2} step={0.02} onChange={setLoad} format={(v) => (v < 0.4 ? 'light' : v < 0.9 ? 'medium' : 'heavy')} color="var(--d-power)" />
        <Readout label="Plate current" value={over ? 'Above limit' : tuned ? 'At the dip' : 'Not tuned'} color={over ? 'var(--d-bad)' : 'var(--d-current)'} />
      </Controls>
    </>
  )
}
