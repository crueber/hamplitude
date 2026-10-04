import { useState } from 'react'
import { C, Choice, Controls, Diagram, Ln, T, TAU, useTime } from '../kit'

/** Two crossed linear antennas fed 90° apart make a rotating field: circular polarization. */
export function E9D_Circular() {
  const [ph, setPh] = useState(90)
  const { t, ref } = useTime(0.5)
  const cx = 470, cy = 140, R = 90, p = (ph * Math.PI) / 180
  const pts = Array.from({ length: 121 }, (_, i) => { const a = (i / 120) * TAU; return `${i ? 'L' : 'M'}${(cx + R * Math.cos(a)).toFixed(1)},${(cy - R * Math.cos(a - p)).toFixed(1)}` }).join('') + 'Z'
  const a = t * TAU
  const tx = cx + R * Math.cos(a), ty = cy - R * Math.cos(a - p)
  const name = ph === 90 ? 'Circular' : ph === 0 || ph === 180 ? 'Linear (slanted)' : 'Elliptical'
  return (
    <>
      <Diagram svgRef={ref} w={640} h={290} title={`Two Yagis on the same axis, one with horizontal elements and one with vertical elements, driven elements at the same point on the boom. Fed ${ph} degrees apart the combined electric field is ${name.toLowerCase()}.`}
        caption="Looking down the boom. Horizontal field + vertical field, 90° apart in time, trace a circle.">
        <T x={130} y={22} anchor="middle" size={13} bold color={C.muted}>Looking down the boom</T>
        <circle cx={130} cy={140} r={5} fill={C.ink} />
        <Ln x1={50} y1={140} x2={210} y2={140} color={C.voltage} width={7} />
        <Ln x1={130} y1={60} x2={130} y2={220} color={C.current} width={7} />
        <T x={218} y={140} size={12} bold color={C.voltage}>Yagi A: horizontal</T>
        <T x={138} y={72} size={12} bold color={C.current}>Yagi B: vertical</T>
        <T x={130} y={246} anchor="middle" size={12} color={C.muted}>same boom, driven elements at one point</T>
        <T x={130} y={266} anchor="middle" size={12} color={C.muted}>B fed {ph}° after A</T>
        <rect x={cx - R - 8} y={cy - R - 8} width={2 * R + 16} height={2 * R + 16} fill="none" stroke={C.fill2} strokeWidth={1.5} />
        <Ln x1={cx - R - 8} y1={cy} x2={cx + R + 8} y2={cy} color={C.fill2} width={1} />
        <Ln x1={cx} y1={cy - R - 8} x2={cx} y2={cy + R + 8} color={C.fill2} width={1} />
        <path d={pts} fill="none" stroke={C.signal} strokeWidth={2.5} strokeDasharray="4 4" />
        <Ln x1={cx} y1={cy} x2={tx} y2={ty} color={C.signal} width={3} arrow />
        <circle cx={tx} cy={ty} r={5} fill={C.signal} />
        <T x={cx} y={22} anchor="middle" size={13} bold color={C.muted}>Tip of the electric field</T>
        <T x={cx} y={cy + R + 26} anchor="middle" size={14} bold color={ph === 90 ? C.good : C.ink}>{name}</T>
      </Diagram>
      <Controls>
        <div>
          <span className="ctl-label" style={{ display: 'block', marginBottom: 6 }}>Phase between the two Yagis</span>
          <Choice label="Phase" value={ph} onChange={setPh} options={[{ value: 0, label: '0° (in phase)' }, { value: 45, label: '45°' }, { value: 90, label: '90°' }, { value: 180, label: '180°' }]} />
        </div>
      </Controls>
    </>
  )
}
