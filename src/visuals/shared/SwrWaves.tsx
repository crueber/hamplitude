import { useState } from 'react'
import { C, Choice, Controls, Diagram, Ln, Readout, Slider, T, TAU, fmt, sinePath, useTime } from '../kit'

const Z0 = 50
const zOf = (p: number) => Math.round(10 * Math.pow(25, p)) // 10 to 250 ohms, log scale
const pOf = (z: number) => Math.log(z / 10) / Math.log(25)

/** SWR as a wave bouncing off a mismatch. A 50 ohm line feeding a resistive load. */
export function SwrWaves() {
  const [pos, setPos] = useState(pOf(200))
  let z = zOf(pos)
  if (Math.abs(z - Z0) <= 2) z = Z0
  const gamma = Math.abs((z - Z0) / (z + Z0))
  const swr = (1 + gamma) / (1 - gamma)
  const refl = gamma * gamma
  const { t, ref } = useTime(0.6)
  const x0 = 124, x1 = 456, cycles = 3.5, A = 24
  const preset = [50, 100, 200].find((p) => p === z) ?? -1
  return (
    <>
      <Diagram w={640} h={268} svgRef={ref} title={`A 50 ohm feed line feeding a ${z} ohm antenna: SWR ${fmt(swr, 2)} to 1, ${fmt(refl * 100, 2)} percent of power reflected`}
        caption="The farther the antenna is from the line's 50 Ω, the bigger the reflected wave.">
        <rect x={10} y={104} width={104} height={72} rx={10} fill={C.fill} stroke={C.ink} strokeWidth={2} />
        <T x={62} y={140} anchor="middle" bold size={13}>Transmitter</T>
        <rect x={478} y={104} width={148} height={72} rx={10} fill={C.fill} stroke={z === Z0 ? C.good : C.bad} strokeWidth={2} />
        <T x={552} y={128} anchor="middle" bold size={14}>Antenna</T>
        <T x={552} y={152} anchor="middle" size={13} color={C.muted} mono>{z} Ω</T>
        <Ln x1={114} y1={140} x2={478} y2={140} color={C.fill2} width={9} />
        <T x={x0 + (x1 - x0) / 2} y={158} anchor="middle" size={12} color={C.muted}>feed line, 50 Ω</T>

        <T x={x0} y={36} size={13} bold color={C.signal}>Forward wave →</T>
        <path d={sinePath(x0, x1, 80, A, cycles, -t * TAU)} fill="none" stroke={C.signal} strokeWidth={3.5} strokeLinecap="round" />

        <T x={x0} y={188} size={13} bold color={C.bad}>← Reflected wave</T>
        {gamma < 0.01 ? (
          <>
            <Ln x1={x0} y1={226} x2={x1} y2={226} color={C.muted} width={2} dash="3 5" />
            <T x={(x0 + x1) / 2} y={246} anchor="middle" size={13} bold color={C.good}>none: all power reaches the antenna</T>
          </>
        ) : (
          <path d={sinePath(x0, x1, 226, A * gamma, cycles, t * TAU + 1)} fill="none" stroke={C.bad} strokeWidth={3.5} strokeLinecap="round" />
        )}
      </Diagram>
      <Controls>
        <Slider label="Antenna impedance" value={pos} min={0} max={1} step={0.002} onChange={(v) => setPos(v)} format={() => `${z} Ω`} color="var(--d-resist)" />
        <Readout label="SWR" value={`${fmt(swr, 2)} : 1`} color={swr < 1.05 ? 'var(--d-good)' : 'var(--d-bad)'} />
        <Readout label="Power reflected" value={fmt(refl * 100, 2)} unit="%" color="var(--d-bad)" />
      </Controls>
      <div style={{ margin: '-6px 0 14px' }}>
        <Choice label="Presets" value={preset} onChange={(v) => setPos(pOf(v))} options={[{ value: 50, label: '50 Ω: perfect match' }, { value: 100, label: '100 Ω' }, { value: 200, label: '200 Ω' }]} />
      </div>
    </>
  )
}
