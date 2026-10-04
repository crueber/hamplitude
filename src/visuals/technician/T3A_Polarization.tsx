import { useState } from 'react'
import { C, Controls, Diagram, Ln, Readout, Slider, T } from '../kit'

/** Two antennas on a line-of-sight path: tilt the receiving one and the signal drops. */
export function Polarization() {
  const [deg, setDeg] = useState(0)
  const rad = (deg * Math.PI) / 180
  const rel = Math.cos(rad) ** 2
  const label = deg === 0 ? 'Same polarization' : deg === 90 ? 'Cross-polarized' : 'Partly mismatched'
  const col = rel > 0.8 ? C.good : rel < 0.25 ? C.bad : C.resist
  const rod = (cx: number, cy: number, a: number, c: string) => (
    <Ln x1={cx - 52 * Math.sin(a)} y1={cy - 52 * Math.cos(a)} x2={cx + 52 * Math.sin(a)} y2={cy + 52 * Math.cos(a)} color={c} width={7} />
  )
  return (
    <>
      <Diagram w={640} h={250} title="A vertical transmitting antenna and a receiving antenna tilted by a chosen angle. The more the antennas are mismatched, the weaker the received signal."
        caption="Line-of-sight VHF/UHF: the receiving antenna must be parallel to the transmitting one.">
        {rod(110, 100, 0, C.signal)}
        <T x={110} y={178} anchor="middle" bold size={14}>Transmit</T>
        <T x={110} y={198} anchor="middle" size={13} color={C.muted}>vertical</T>
        <Ln x1={190} y1={100} x2={430} y2={100} color={C.signal} width={3} arrow dash="2 7" />
        <T x={310} y={78} anchor="middle" size={13} color={C.muted}>line of sight</T>
        {rod(530, 100, rad, col)}
        <T x={530} y={178} anchor="middle" bold size={14}>Receive</T>
        <T x={530} y={198} anchor="middle" size={13} color={C.muted}>tilted {deg}°</T>
        <rect x={250} y={150} width={140} height={14} rx={7} fill={C.fill2} />
        <rect x={250} y={150} width={Math.max(4, 140 * rel)} height={14} rx={7} fill={col} />
        <T x={320} y={186} anchor="middle" size={13} bold color={col}>signal strength</T>
      </Diagram>
      <Controls>
        <Slider label="Tilt of receiving antenna" value={deg} min={0} max={90} step={1} onChange={setDeg} format={(v) => `${v}°`} color="var(--d-signal)" />
        <Readout label="Result" value={label} color={col} />
      </Controls>
    </>
  )
}
