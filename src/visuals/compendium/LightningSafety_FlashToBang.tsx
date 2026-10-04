import { useState } from 'react'
import { C, Controls, Diagram, Ln, Readout, Slider, T, fmt } from '../kit'

const HX = 560 // house x
const GY = 190 // ground y

function verdict(s: number): { text: string; col: string } {
  if (s <= 5) return { text: 'Very close: danger now. Take shelter immediately.', col: C.bad }
  if (s <= 50) return { text: 'Thunder is audible: within striking range. Stay indoors, off the radio.', col: C.bad }
  return { text: 'Farther off, but storms move. Disconnect and get ready now.', col: C.resist }
}

/** Flash-to-bang: count seconds from flash to thunder; about 5 s per mile. */
export function LightningSafety_FlashToBang() {
  const [s, setS] = useState(20)
  const miles = s / 5
  const km = s / 3
  const cx = 70 + (1 - s / 60) * (HX - 70 - 10)
  const v = verdict(s)
  const bolt = `M${cx},84 L${cx - 10},118 L${cx + 6},118 L${cx - 8},${GY}`
  return (
    <>
      <Diagram w={640} h={262}
        title="Flash to bang: the storm cloud moves closer to a house as the delay between lightning flash and thunder shrinks. Sound travels about one mile in five seconds."
        caption="Sound travels about 1 mile in 5 seconds (1 km in 3). After the last thunder, wait 30 minutes before going outside.">
        <Ln x1={20} y1={GY} x2={620} y2={GY} color={C.muted} width={2} />
        {/* storm cloud */}
        <g>
          <ellipse cx={cx} cy={58} rx={44} ry={22} fill={C.fill2} stroke={C.muted} strokeWidth={2} />
          <ellipse cx={cx - 26} cy={66} rx={26} ry={16} fill={C.fill2} stroke={C.muted} strokeWidth={2} />
          <ellipse cx={cx + 26} cy={66} rx={26} ry={16} fill={C.fill2} stroke={C.muted} strokeWidth={2} />
          <ellipse cx={cx} cy={64} rx={44} ry={17} fill={C.fill2} />
        </g>
        <path d={bolt} fill="none" stroke={C.resist} strokeWidth={4} strokeLinejoin="round" strokeLinecap="round" />
        {/* house with mast */}
        <rect x={HX - 26} y={GY - 40} width={52} height={40} fill={C.fill} stroke={C.ink} strokeWidth={2} />
        <path d={`M${HX - 32},${GY - 40} L${HX},${GY - 66} L${HX + 32},${GY - 40} Z`} fill={C.fill2} stroke={C.ink} strokeWidth={2} strokeLinejoin="round" />
        <Ln x1={HX + 40} y1={GY} x2={HX + 40} y2={GY - 80} color={C.ink} width={3} />
        <Ln x1={HX + 30} y1={GY - 70} x2={HX + 50} y2={GY - 70} color={C.ink} width={3} />
        <T x={HX} y={GY + 16} anchor="middle" size={13} bold>you</T>
        {/* distance */}
        {HX - cx > 90 && (
          <g>
            <Ln x1={cx} y1={GY + 36} x2={HX} y2={GY + 36} color={C.signal} width={2.5} arrow="both" />
            <T x={(cx + HX) / 2} y={GY + 54} anchor="middle" size={14} bold color={C.signal}>{`${fmt(miles, 2)} mi (${fmt(km, 2)} km)`}</T>
          </g>
        )}
        <T x={20} y={12} size={14} bold color={v.col}>{v.text}</T>
      </Diagram>
      <Controls>
        <Slider label="Seconds from flash to thunder" value={s} min={0} max={60} step={1} onChange={setS} format={(x) => `${x} s`} color="var(--d-resist)" />
        <Readout label="Distance" value={fmt(miles, 2)} unit=" miles" color="var(--d-signal)" />
      </Controls>
    </>
  )
}
