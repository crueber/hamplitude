import { useState } from 'react'
import { C, Controls, Diagram, Ln, Readout, Slider, T, clamp } from '../kit'

/** Ground wave: vertically polarized, follows the ground, and falls off faster at higher frequency. */
export function GroundWave() {
  const [pos, setPos] = useState(0.1)
  const f = 1.8 * Math.pow(30 / 1.8, pos)
  const range = 1 - 0.8 * pos // schematic fraction of the span, 1 = longest
  const R = 700, ox = 320
  const y = (x: number) => 110 + R - Math.sqrt(R * R - (x - ox) ** 2)
  const x0 = 150, x1 = x0 + range * 430
  const earth = Array.from({ length: 65 }, (_, i) => `${i ? 'L' : 'M'}${i * 10},${y(i * 10).toFixed(1)}`).join('') + 'L640,260 L0,260 Z'
  const marks = [0, 0.25, 0.5, 0.75, 1].map((k) => x0 + k * (x1 - x0))
  return (
    <>
      <Diagram w={640} h={260} title="A ground wave follows the curve of the Earth with vertical polarization. As frequency rises, its maximum range falls"
        caption="Schematic. Higher frequency, shorter ground-wave range.">
        <path d={earth} fill={C.fill} stroke={C.muted} strokeWidth={2} />
        <Ln x1={x0} y1={y(x0)} x2={x0} y2={y(x0) - 56} color={C.ink} width={4} />
        <T x={x0 - 12} y={y(x0) - 40} anchor="end" size={13} bold>Vertical</T>
        <T x={x0 - 12} y={y(x0) - 22} anchor="end" size={13} bold>antenna</T>
        {marks.slice(1).map((x, i) => (
          <Ln key={i} x1={x} y1={y(x) - 2} x2={x} y2={y(x) - 40 + i * 6} color={C.voltage} width={3} arrow opacity={1 - i * 0.2} />
        ))}
        <T x={(x0 + x1) / 2 + 40} y={50} anchor="middle" size={13} bold color={C.voltage}>E field: vertical</T>
        <Ln x1={x0} y1={y(x0) + 30} x2={x1} y2={y(x1) + 30} color={C.power} width={3} arrow="both" />
        <T x={(x0 + x1) / 2} y={(y(x0) + y(x1)) / 2 + 58} anchor="middle" size={14} bold color={C.power}>maximum range</T>
        <T x={600} y={24} anchor="end" size={15} bold color={C.signal}>{`${f < 10 ? f.toFixed(1) : Math.round(f)} MHz`}</T>
      </Diagram>
      <Controls>
        <Slider label="Frequency" value={pos} min={0} max={1} step={0.01} onChange={(v) => setPos(clamp(v, 0, 1))} format={() => `${f < 10 ? f.toFixed(1) : Math.round(f)} MHz`} color="var(--d-signal)" />
        <Readout label="Ground-wave range" value={pos < 0.34 ? 'longest' : pos < 0.67 ? 'shorter' : 'shortest'} color="var(--d-power)" />
      </Controls>
    </>
  )
}
