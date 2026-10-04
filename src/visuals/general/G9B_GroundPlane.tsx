import { useState } from 'react'
import { C, Controls, Diagram, Ln, Readout, Slider, T, TAU } from '../kit'

/** Quarter-wave ground-plane vertical: slope the radials down to raise the feed impedance toward 50 ohms. */
export function G9B_GroundPlane() {
  const [a, setA] = useState(40)
  const rad = (a * Math.PI) / 180
  const cx = 150, top = 36, feed = 150, gy = 244
  const L = 100
  const note = a < 8 ? 'about 36 Ω: low' : a <= 55 ? 'close to 50 Ω' : 'above 50 Ω'
  const col = a >= 8 && a <= 55 ? C.good : C.bad
  return (
    <>
      <Diagram w={640} h={280} title={`Elevated quarter-wave vertical with radials sloped ${a} degrees downward: feed point impedance ${note}. From above the pattern is a circle: omnidirectional in azimuth`}
        caption="Flat radials give about 36 Ω. Sloping them downward raises it toward 50 Ω. Seen from above, the pattern is a circle.">
        <rect x={10} y={gy} width={380} height={26} fill={C.fill2} />
        <T x={20} y={gy + 13} size={12} color={C.muted}>ground</T>
        <Ln x1={cx} y1={feed + 12} x2={cx} y2={gy} color={C.muted} width={6} />
        <T x={cx + 10} y={gy - 30} size={12} color={C.muted}>mast</T>
        <Ln x1={cx} y1={feed} x2={cx} y2={top} color={C.voltage} width={5} />
        <T x={cx + 10} y={top + 8} size={13} bold color={C.voltage}>¼ λ element</T>
        {[-1, 1].map((s) => (
          <Ln key={s} x1={cx} y1={feed} x2={cx + s * L * Math.cos(rad)} y2={feed + L * Math.sin(rad)} color={C.resist} width={4} />
        ))}
        <circle cx={cx} cy={feed} r={6} fill={C.ink} />
        <T x={cx - 14} y={feed - 14} anchor="end" size={13} bold>feed point</T>
        <T x={cx - L - 6} y={feed + 32} anchor="middle" size={13} bold color={C.resist}>radials</T>
        <T x={250} y={190} size={14} bold color={col}>{note}</T>
        {a > 55 && <T x={250} y={212} size={13} color={C.muted}>rising toward 73 Ω</T>}

        <T x={510} y={20} anchor="middle" size={13} bold color={C.muted}>Seen from above</T>
        <circle cx={510} cy={125} r={86} fill={C.signal} fillOpacity={0.2} stroke={C.signal} strokeWidth={3} />
        <circle cx={510} cy={125} r={5} fill={C.voltage} />
        {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
          <Ln key={i} x1={510 + 18 * Math.cos((i * TAU) / 8)} y1={125 + 18 * Math.sin((i * TAU) / 8)} x2={510 + 62 * Math.cos((i * TAU) / 8)} y2={125 + 62 * Math.sin((i * TAU) / 8)} color={C.good} width={2} arrow />
        ))}
        <T x={510} y={240} anchor="middle" size={13} bold color={C.good}>omnidirectional in azimuth</T>
      </Diagram>
      <Controls>
        <Slider label="Radial slope below horizontal" value={a} min={0} max={80} step={1} onChange={setA} format={(v) => `${v}°`} color="var(--d-resist)" />
        <Readout label="Feed point impedance" value={note} color={a >= 8 && a <= 55 ? 'var(--d-good)' : 'var(--d-bad)'} />
      </Controls>
    </>
  )
}
