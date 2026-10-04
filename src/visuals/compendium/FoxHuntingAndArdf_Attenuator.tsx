import { useState } from 'react'
import { C, Choice, Controls, Diagram, Ln, Slider, T, fmt } from '../kit'

const LO = -10, HI = 30 // the meter's useful span, dB relative to its reference

/** Free-space level versus distance, and why an attenuator keeps the meter on scale near the fox. Illustrative numbers. */
export function FoxHuntingAndArdf_Attenuator() {
  const [lg, setLg] = useState(2.3) // log10 of distance in metres
  const [att, setAtt] = useState(0)
  const d = 10 ** lg
  const lvl = -20 * Math.log10(d / 1000) // 0 dB at 1 km
  const shown = lvl - att
  const pinned = shown > HI, lost = shown < LO
  const x0 = 70, x1 = 570, X = (v: number) => x0 + ((Math.min(HI + 8, Math.max(LO - 8, v)) - LO) / (HI - LO)) * (x1 - x0)
  const state = pinned ? 'Pinned: no change as you turn, so no bearing' : lost ? 'Too weak to read' : 'On scale: the reading moves as you turn'
  const col = pinned || lost ? C.bad : C.good
  return (
    <>
      <Diagram w={640} h={230}
        title={`Receiver meter at ${fmt(d, 3)} metres from the fox with ${att} dB of attenuation: the signal is ${fmt(shown, 3)} dB relative to the reference, ${state}`}
        caption="Illustrative free-space numbers. Level rises 6 dB each time the distance halves; attenuation shifts it back on scale.">
        <rect x={x0} y={40} width={x1 - x0} height={34} rx={8} fill={C.fill} />
        <rect x={x0} y={40} width={Math.max(0, X(shown) - x0)} height={34} rx={8} fill={col} fillOpacity={0.45} stroke={col} strokeWidth={2} />
        {[-10, 0, 10, 20, 30].map((v) => (
          <g key={v}>
            <Ln x1={X(v)} y1={78} x2={X(v)} y2={86} color={C.muted} width={1.5} />
            <T x={X(v)} y={100} anchor="middle" size={12} color={C.muted}>{v}</T>
          </g>
        ))}
        <T x={x0} y={20} size={12} color={C.muted}>meter reading, dB (the span the receiver can show)</T>
        {pinned && <T x={x1 - 8} y={57} anchor="end" size={13} bold color={C.bad}>off the top</T>}
        {lost && <T x={x0 + 10} y={57} size={13} bold color={C.bad}>below the bottom</T>}
        <rect x={20} y={124} width={600} height={84} rx={12} fill={C.fill} />
        <T x={36} y={146} size={13} color={C.muted}>Distance to fox</T>
        <T x={36} y={172} size={20} bold>{d < 1000 ? `${fmt(d, 3)} m` : `${fmt(d / 1000, 3)} km`}</T>
        <T x={236} y={146} size={13} color={C.muted}>Level at input</T>
        <T x={236} y={172} size={20} bold color={C.signal}>{fmt(lvl, 3)} dB</T>
        <T x={400} y={146} size={13} color={C.muted}>After {att} dB attenuator</T>
        <T x={400} y={172} size={20} bold color={col}>{fmt(shown, 3)} dB</T>
        <T x={36} y={196} size={13} bold color={col}>{state}</T>
      </Diagram>
      <Controls>
        <Slider label="Distance to the fox" value={lg} min={0.7} max={3.3} step={0.05} onChange={setLg} format={(v) => { const m = 10 ** v; return m < 1000 ? `${Math.round(m)} m` : `${fmt(m / 1000, 2)} km` }} color="var(--d-signal)" />
        <Choice label="Attenuator" value={att} onChange={setAtt} options={[0, 10, 20, 30, 40].map((v) => ({ value: v, label: `${v} dB` }))} />
      </Controls>
    </>
  )
}
