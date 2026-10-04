import { useState } from 'react'
import { C, Controls, Diagram, Ln, Readout, Slider, T, fmt } from '../kit'

const CLIGHT = 299792.458 // km/s

/** EME: the echo comes back after ~2.5 s, so stations alternate on a shared clock instead of waiting for the echo. */
export function E2D_EmeSequence() {
  const [km, setKm] = useState(384400)
  const delay = (2 * km) / CLIGHT
  const GX0 = 40, GX1 = 610, per = (GX1 - GX0) / 6
  return (
    <>
      <Diagram w={640} h={300} title="Earth to Moon and back. The radio wave travels about two times the Moon's distance at the speed of light, so the echo returns after roughly two and a half seconds. EME contacts therefore use time-synchronous transmissions, where two stations alternate transmit and receive periods on a shared clock."
        caption="Long delay, weak echo: both stations follow a clock and take turns.">
        <circle cx={60} cy={60} r={22} fill={C.current} fillOpacity={0.4} stroke={C.current} strokeWidth={2.5} />
        <T x={60} y={96} anchor="middle" size={12.5} bold>Earth</T>
        <circle cx={580} cy={60} r={13} fill={C.fill2} stroke={C.muted} strokeWidth={2.5} />
        <T x={580} y={86} anchor="middle" size={12.5} bold>Moon</T>
        <Ln x1={90} y1={50} x2={556} y2={50} color={C.signal} width={3} arrow />
        <Ln x1={556} y1={70} x2={90} y2={70} color={C.signal} width={3} arrow dash="6 5" />
        <T x={320} y={34} anchor="middle" size={13} bold color={C.signal}>out {fmt(km / 1000, 3)} thousand km</T>
        <T x={320} y={92} anchor="middle" size={13} bold color={C.signal}>back: the echo</T>
        <T x={GX0} y={130} size={14} bold color={C.muted}>Time-synchronous periods (clock, not echo)</T>
        {Array.from({ length: 6 }, (_, i) => {
          const a = i % 2 === 0
          const col = a ? C.voltage : C.current
          return (
            <g key={i}>
              <rect x={GX0 + i * per + 2} y={148} width={per - 4} height={30} rx={6} fill={col} fillOpacity={0.2} stroke={col} strokeWidth={2} />
              <T x={GX0 + i * per + per / 2} y={163} anchor="middle" size={12.5} bold color={col}>{a ? 'A sends' : 'B sends'}</T>
              <rect x={GX0 + i * per + 2} y={186} width={per - 4} height={30} rx={6} fill={C.fill} stroke={C.fill2} strokeWidth={2} />
              <T x={GX0 + i * per + per / 2} y={201} anchor="middle" size={12.5} color={C.muted}>{a ? 'B listens' : 'A listens'}</T>
            </g>
          )
        })}
        <T x={GX0 - 4} y={236} size={12} color={C.muted}>same clock at both ends</T>
        <T x={320} y={274} anchor="middle" size={14} bold color={C.resist}>round trip ≈ {fmt(delay, 3)} s at this distance</T>
      </Diagram>
      <Controls>
        <Slider label="Moon distance" value={km} min={356000} max={407000} step={1000} onChange={setKm} format={(v) => `${fmt(v / 1000, 3)} thousand km`} color="var(--d-resist)" />
        <Readout label="Round-trip delay" value={fmt(delay, 3)} unit="s" color="var(--d-resist)" />
      </Controls>
    </>
  )
}
