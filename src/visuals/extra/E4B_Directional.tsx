import { useState } from 'react'
import { C, Controls, Diagram, Ln, Readout, Slider, T } from '../kit'

/** A directional wattmeter reads forward and reflected power; the load absorbs the difference. */
export function Directional() {
  const [refl, setRefl] = useState(25)
  const fwd = 100
  const abs = fwd - refl
  const bar = (x: number, v: number, col: string, label: string) => (
    <g>
      <rect x={x} y={250 - v * 0.9} width={44} height={v * 0.9} fill={col} opacity={0.85} rx={4} />
      <T x={x + 22} y={262} anchor="middle" size={12} color={C.muted}>{label}</T>
      <T x={x + 22} y={250 - v * 0.9 - 12} anchor="middle" size={13} bold mono color={col}>{v} W</T>
    </g>
  )
  return (
    <>
      <Diagram w={640} h={270} title={`A directional wattmeter reads ${fwd} watts forward and ${refl} watts reflected, so the load absorbs ${abs} watts.`}
        caption="Power absorbed = forward power − reflected power.">
        <rect x={14} y={30} width={110} height={56} rx={10} fill={C.fill} stroke={C.ink} strokeWidth={2} />
        <T x={69} y={58} anchor="middle" bold size={14}>Transmitter</T>
        <rect x={200} y={20} width={170} height={76} rx={10} fill={C.fill} stroke={C.power} strokeWidth={2.5} />
        <T x={285} y={42} anchor="middle" bold size={14} color={C.power}>Directional meter</T>
        <T x={285} y={66} anchor="middle" size={13} mono bold color={C.good}>fwd {fwd} W</T>
        <T x={285} y={84} anchor="middle" size={13} mono bold color={C.bad}>refl {refl} W</T>
        <rect x={446} y={30} width={110} height={56} rx={10} fill={C.fill} stroke={C.ink} strokeWidth={2} />
        <T x={501} y={58} anchor="middle" bold size={14}>Load</T>
        <Ln x1={126} y1={58} x2={198} y2={58} color={C.good} width={3} arrow />
        <Ln x1={372} y1={58} x2={444} y2={58} color={C.power} width={3} arrow />
        <T x={408} y={42} anchor="middle" size={12} mono bold color={C.power}>{abs} W</T>
        <path d="M444,76 C420,92 396,92 374,76" fill="none" stroke={C.bad} strokeWidth={3} markerEnd="url(#hx-arrow)" strokeDasharray="6 4" />
        {bar(60, fwd, C.good, 'forward')}{bar(150, refl, C.bad, 'reflected')}{bar(240, abs, C.power, 'absorbed')}
        <T x={500} y={200} anchor="middle" size={16} bold mono>{fwd} − {refl} = <tspan fill={C.power}>{abs} W</tspan></T>
      </Diagram>
      <Controls>
        <Slider label="Reflected power" value={refl} min={0} max={50} onChange={setRefl} format={(v) => `${v} W`} color="var(--d-bad)" />
        <Readout label="Load absorbs" value={abs} unit=" W" color="var(--d-power)" />
      </Controls>
    </>
  )
}
