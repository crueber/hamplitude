import { useState } from 'react'
import { C, Controls, Diagram, Ln, Readout, Slider, T, fmt } from '../kit'

/** dBi = dBd + 2.15: the same antenna, two reference scales. */
export function G9C_DbiDbd() {
  const [dbd, setDbd] = useState(6)
  const dbi = dbd + 2.15
  const W = 640, H = 230, x0 = 84, x1 = 600
  const X = (v: number) => x0 + (v / 14) * (x1 - x0)
  return (
    <>
      <Diagram w={W} h={H} title={`An antenna with ${fmt(dbd, 3)} dBd of gain has ${fmt(dbi, 3)} dBi: gain in dBi is 2.15 dB higher than gain in dBd`}
        caption="A half-wave dipole is the dBd zero point, and it already has 2.15 dBi against an isotropic radiator.">
        <T x={x0 - 8} y={62} anchor="end" size={13} bold color={C.signal}>dBi</T>
        <T x={x0 - 8} y={150} anchor="end" size={13} bold color={C.voltage}>dBd</T>
        <Ln x1={x0} y1={62} x2={x1} y2={62} color={C.muted} width={2} />
        <Ln x1={x0} y1={150} x2={x1} y2={150} color={C.muted} width={2} />
        {[0, 2, 4, 6, 8, 10, 12, 14].map((v) => <Ln key={v} x1={X(v)} y1={56} x2={X(v)} y2={68} color={C.muted} width={2} />)}
        {[0, 2, 4, 6, 8, 10, 12, 14].map((v) => <T key={v} x={X(v)} y={84} anchor="middle" size={12} color={C.muted}>{v}</T>)}
        {[0, 2, 4, 6, 8, 10, 12].map((v) => <Ln key={v} x1={X(v + 2.15)} y1={144} x2={X(v + 2.15)} y2={156} color={C.muted} width={2} />)}
        {[0, 2, 4, 6, 8, 10, 12].map((v) => <T key={v} x={X(v + 2.15)} y={172} anchor="middle" size={12} color={C.muted}>{v}</T>)}
        <circle cx={X(0)} cy={62} r={7} fill={C.ink} />
        <T x={X(0)} y={38} anchor="middle" size={12} bold>isotropic</T>
        <circle cx={X(2.15)} cy={62} r={7} fill={C.voltage} />
        <Ln x1={X(2.15)} y1={52} x2={X(2.15)} y2={22} color={C.voltage} width={2} />
        <T x={X(2.15) + 6} y={16} size={12} bold color={C.voltage}>dipole = 2.15 dBi = 0 dBd</T>
        <Ln x1={X(dbi)} y1={62} x2={X(dbi)} y2={150} color={C.power} width={2.5} dash="5 4" />
        <circle cx={X(dbi)} cy={62} r={8} fill={C.power} stroke={C.bg} strokeWidth={2.5} />
        <circle cx={X(dbd + 2.15)} cy={150} r={8} fill={C.power} stroke={C.bg} strokeWidth={2.5} />
        <T x={320} y={210} anchor="middle" size={16} bold color={C.power}>{fmt(dbd, 3)} dBd + 2.15 = {fmt(dbi, 3)} dBi</T>
      </Diagram>
      <Controls>
        <Slider label="Gain over a dipole" value={dbd} min={0} max={12} step={0.5} onChange={setDbd} format={(v) => `${fmt(v, 3)} dBd`} color="var(--d-voltage)" />
        <Readout label="Same gain over isotropic" value={fmt(dbi, 3)} unit=" dBi" color="var(--d-signal)" />
      </Controls>
    </>
  )
}
