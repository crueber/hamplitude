import { useState } from 'react'
import { C, Controls, Diagram, Ln, Readout, Slider, T } from '../kit'

const LEN = 65.5 // ft: a 40 m dipole (468 / 7.15)
const APEX = 45 // ft: example apex height

/** Drag the included angle of an inverted V: footprint shrinks and the ends come down. Impedance trend is typical, not exact. */
export function InvertedV_Angle() {
  const [ang, setAng] = useState(120)
  const th = (ang / 2) * (Math.PI / 180)
  const half = LEN / 2
  const spanFt = LEN * Math.sin(th)
  const dropFt = half * Math.cos(th)
  const endFt = APEX - dropFt
  const px = 5.6, gy = 300, cx = 320
  const ay = gy - APEX * px
  const ex = (LEN / 2) * Math.sin(th) * px
  const ey = ay + dropFt * px
  const z = ang >= 165 ? 'about 73 Ω' : ang >= 135 ? 'between 73 and 50 Ω' : ang >= 105 ? 'about 50 Ω' : 'below 50 Ω'
  return (
    <>
      <Diagram w={640} h={336} title={`An inverted V with a ${ang} degree included angle: the 65.5 foot wire spans ${spanFt.toFixed(0)} feet and its ends hang ${endFt.toFixed(0)} feet above ground from an apex ${APEX} feet up`}
        caption="Same wire length, one mast. A sharper V needs less ground space and brings the ends nearer the ground.">
        <rect x={0} y={gy} width={640} height={6} fill={C.fill2} />
        <Ln x1={cx} y1={ay} x2={cx} y2={gy} color={C.muted} width={6} />
        <Ln x1={cx} y1={ay} x2={cx - ex} y2={ey} color={C.resist} width={5} />
        <Ln x1={cx} y1={ay} x2={cx + ex} y2={ey} color={C.resist} width={5} />
        <circle cx={cx} cy={ay} r={7} fill={C.bg} stroke={C.power} strokeWidth={3} />
        <circle cx={cx - ex} cy={ey} r={4.5} fill={C.bg} stroke={C.resist} strokeWidth={2.5} />
        <circle cx={cx + ex} cy={ey} r={4.5} fill={C.bg} stroke={C.resist} strokeWidth={2.5} />
        <T x={cx + 16} y={ay - 2} size={13} bold color={C.power}>feed point at the apex</T>
        <Ln x1={cx - ex} y1={gy - 12} x2={cx + ex} y2={gy - 12} color={C.muted} width={1.5} arrow="both" />
        <T x={cx + 14} y={gy - 28} size={13} bold color={C.muted}>{`span ${spanFt.toFixed(0)} ft`}</T>
        <T x={cx - ex} y={ey - 16} anchor="middle" size={12} color={C.muted}>end</T>
        <T x={cx + ex} y={ey - 16} anchor="middle" size={12} color={C.muted}>end</T>
        <T x={620} y={gy + 22} anchor="end" size={12} color={C.muted}>ground</T>
        <T x={20} y={22} size={12} color={C.muted}>example: 40 m dipole, 65.5 ft of wire, apex 45 ft up</T>
      </Diagram>
      <Controls>
        <Slider label="Included angle at the apex" value={ang} min={90} max={180} step={5} onChange={setAng} format={(v) => (v === 180 ? '180° (flat)' : `${v}°`)} color="var(--d-resist)" />
        <Readout label="Ends above ground" value={endFt.toFixed(0)} unit=" ft" color="var(--d-resist)" />
        <Readout label="Typical feed impedance" value={z} color="var(--d-power)" />
      </Controls>
    </>
  )
}
