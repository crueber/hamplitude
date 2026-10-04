import { useState } from 'react'
import { C, Controls, Diagram, Ln, Readout, Slider, T } from '../kit'

/** FM bandwidth = 2 x (deviation + highest modulating frequency). 5 kHz and 3 kHz: 16 kHz. */
export function G8B_FmBandwidth() {
  const [dev, setDev] = useState(5)
  const [fm, setFm] = useState(3)
  const total = 2 * (dev + fm)
  const cx = 320, k = 16 // px per kHz
  const xp = (f: number) => cx + f * k
  const base = 150
  return (
    <>
      <Diagram w={640} h={240} title={`FM bandwidth: 2 times the sum of deviation and modulating frequency. Deviation ${dev} kilohertz plus modulating frequency ${fm} kilohertz is ${dev + fm}; doubled, ${total} kilohertz total`}
        caption="Count the swing and the voice frequency, then double it: the signal spreads both above and below the carrier.">
        <Ln x1={20} y1={base} x2={620} y2={base} color={C.muted} width={2} />
        <rect x={xp(-(dev + fm))} y={base - 80} width={(dev + fm) * 2 * k} height={80} rx={6} fill={C.signal} fillOpacity={0.15} stroke={C.signal} strokeWidth={2} />
        <Ln x1={cx} y1={base} x2={cx} y2={base - 100} color={C.muted} width={2} dash="4 4" />
        <T x={cx} y={base - 112} anchor="middle" size={13} color={C.muted}>carrier</T>
        <Ln x1={xp(0)} y1={base - 56} x2={xp(dev)} y2={base - 56} color={C.resist} width={5} />
        <Ln x1={xp(0)} y1={base - 56} x2={xp(-dev)} y2={base - 56} color={C.resist} width={5} />
        <Ln x1={xp(dev)} y1={base - 56} x2={xp(dev + fm)} y2={base - 56} color={C.power} width={5} />
        <Ln x1={xp(-dev)} y1={base - 56} x2={xp(-dev - fm)} y2={base - 56} color={C.power} width={5} />
        <T x={xp(dev / 2)} y={base - 38} anchor="middle" size={13} bold color={C.resist}>{dev}</T>
        <T x={xp(-dev / 2)} y={base - 38} anchor="middle" size={13} bold color={C.resist}>{dev}</T>
        <T x={xp(dev + fm / 2)} y={base - 38} anchor="middle" size={13} bold color={C.power}>{fm}</T>
        <T x={xp(-dev - fm / 2)} y={base - 38} anchor="middle" size={13} bold color={C.power}>{fm}</T>
        <Ln x1={xp(-(dev + fm))} y1={base + 28} x2={xp(dev + fm)} y2={base + 28} color={C.ink} width={2.5} arrow="both" />
        <T x={cx} y={base + 50} anchor="middle" size={15} bold>2 × ({dev} + {fm}) = {total} kHz</T>
        <T x={30} y={20} size={13} bold color={C.resist}>■ deviation</T>
        <T x={140} y={20} size={13} bold color={C.power}>■ modulating frequency</T>
        <T x={cx} y={base + 80} anchor="middle" size={12.5} color={C.muted}>each side of the carrier: deviation + modulating frequency</T>
      </Diagram>
      <Controls>
        <Slider label="Deviation" value={dev} min={1} max={8} step={0.5} onChange={setDev} format={(v) => `${v} kHz`} color="var(--d-resist)" />
        <Slider label="Modulating frequency" value={fm} min={1} max={5} step={0.5} onChange={setFm} format={(v) => `${v} kHz`} color="var(--d-power)" />
        <Readout label="Total bandwidth" value={`${total} kHz`} color="var(--d-signal)" />
      </Controls>
    </>
  )
}
