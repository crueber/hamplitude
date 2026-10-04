import { useState } from 'react'
import { C, Choice, Controls, Diagram, Ln, Readout, Slider, T, TAU, useTime } from '../kit'

const TX = 80, BASE = 168, WALL = 52, XR0 = 330, XR1 = 410, LAMBDA = 7, REFL = 0.85

/** Relative strength (0..1) at receiver position p (0..1): direct + reflected path add with a phase. */
function strength(p: number) {
  const xr = XR0 + p * (XR1 - XR0)
  const d = xr - TX
  const refl = 2 * Math.hypot(d / 2, BASE - WALL)
  const phase = (TAU * (refl - d)) / LAMBDA
  return Math.hypot(1 + REFL * Math.cos(phase), REFL * Math.sin(phase)) / (1 + REFL)
}

/** Direct + reflected path: moving the antenna a little swings the sum between strong and weak. */
export function Multipath() {
  const [pos, setPos] = useState(0.2)
  const [mode, setMode] = useState<'still' | 'drive'>('still')
  const { t, ref } = useTime(1)
  const p = mode === 'drive' ? 0.5 + 0.5 * Math.sin(t * 1.6) : pos
  const xr = XR0 + p * (XR1 - XR0)
  const s = strength(p)
  const bx = (TX + xr) / 2
  const verdict = s > 0.8 ? 'Reinforced' : s < 0.35 ? 'Cancelled' : 'In between'
  const vcol = s > 0.8 ? C.good : s < 0.35 ? C.bad : C.resist
  const gx0 = 90, gx1 = 560, gy0 = 236, gy1 = 316
  const pts = Array.from({ length: 121 }, (_, i) => {
    const q = i / 120
    return `${i ? 'L' : 'M'}${(gx0 + q * (gx1 - gx0)).toFixed(1)},${(gy1 - strength(q) * (gy1 - gy0)).toFixed(1)}`
  }).join('')
  const mx = gx0 + p * (gx1 - gx0), my = gy1 - s * (gy1 - gy0)
  return (
    <>
      <Diagram w={640} h={340} svgRef={ref} title="A signal reaches the receiver by a direct path and a reflected path. Moving the antenna slightly changes whether they add or cancel."
        caption="Schematic: the wavelength is exaggerated so the effect shows within a short move.">
        <rect x={150} y={26} width={340} height={26} rx={6} fill={C.fill2} stroke={C.muted} strokeWidth={1.5} />
        <T x={320} y={39} anchor="middle" size={13} color={C.muted}>building or hill (reflector)</T>
        <Ln x1={TX} y1={BASE} x2={xr} y2={BASE} color={C.signal} width={3} />
        <Ln x1={TX} y1={BASE} x2={bx} y2={WALL} color={C.power} width={3} />
        <Ln x1={bx} y1={WALL} x2={xr} y2={BASE} color={C.power} width={3} />
        <T x={(TX + xr) / 2} y={BASE + 18} anchor="middle" size={13} bold color={C.signal}>direct path</T>
        <T x={24} y={108} size={13} bold color={C.power}>reflected path</T>
        <Ln x1={TX} y1={BASE + 14} x2={TX} y2={BASE} color={C.ink} width={3} />
        <T x={TX} y={BASE + 32} anchor="middle" bold size={13}>Transmitter</T>
        <Ln x1={xr} y1={BASE + 14} x2={xr} y2={BASE} color={C.ink} width={3} />
        <circle cx={xr} cy={BASE} r={6} fill={vcol} stroke={C.bg} strokeWidth={2} />
        <T x={xr + 14} y={BASE - 14} size={13} bold>You</T>
        <Ln x1={gx0} y1={gy1} x2={gx1} y2={gy1} color={C.muted} width={1.5} />
        <Ln x1={gx0} y1={gy0} x2={gx0} y2={gy1} color={C.muted} width={1.5} />
        <T x={gx0 - 8} y={gy0} anchor="end" size={12} color={C.muted}>strong</T>
        <T x={gx0 - 8} y={gy1} anchor="end" size={12} color={C.muted}>weak</T>
        <path d={pts} fill="none" stroke={C.signal} strokeWidth={2.5} />
        <circle cx={mx} cy={my} r={7} fill={vcol} stroke={C.bg} strokeWidth={2} />
        <T x={(gx0 + gx1) / 2} y={gy1 + 14} anchor="middle" size={12} color={C.muted}>antenna position (a few feet)</T>
      </Diagram>
      <Controls>
        <Slider label="Antenna position" value={p} min={0} max={1} step={0.005} onChange={(v) => { setMode('still'); setPos(v) }} format={() => ''} color="var(--d-signal)" />
        <Readout label="Two paths are" value={verdict} color={vcol} />
      </Controls>
      <div style={{ margin: '-6px 0 14px' }}>
        <Choice label="Mode" value={mode} onChange={setMode} options={[{ value: 'still', label: 'Hold still' }, { value: 'drive', label: 'Driving (picket fencing)' }]} />
      </div>
    </>
  )
}
