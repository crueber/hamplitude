import { useState } from 'react'
import { C, Controls, Diagram, Ln, Readout, Slider, T, fmt } from '../kit'

/** Bessel function of the first kind J_n(b), by numerical integration of its integral definition. */
function besselJ(n: number, b: number): number {
  const N = 400
  let s = 0
  for (let i = 0; i < N; i++) {
    const t = ((i + 0.5) * Math.PI) / N
    s += Math.cos(n * t - b * Math.sin(t))
  }
  return s / N
}

/** FM spectrum for a single tone: lines every fm, heights |J_n(beta)|. Carson's rule marks the usable width. */
export function FrequencyModulation_Bessel() {
  const [dev, setDev] = useState(5)
  const [fm, setFm] = useState(3)
  const beta = dev / fm
  const carson = 2 * (dev + fm)
  const cx = 320, ppk = 18.5, base = 232, H = 150
  const lines: { n: number; a: number }[] = []
  for (let n = -60; n <= 60; n++) {
    const x = n * fm
    if (Math.abs(x) > 15.8) continue
    lines.push({ n, a: Math.abs(besselJ(Math.abs(n), beta)) })
  }
  const j0 = Math.abs(besselJ(0, beta))
  const px = (k: number) => cx + k * ppk
  return (
    <>
      <Diagram w={640} h={318}
        title={`FM spectrum for a ${fmt(fm)} kilohertz tone with ${fmt(dev)} kilohertz deviation: modulation index ${fmt(beta, 3)}. Carson's rule gives a bandwidth of about ${fmt(carson)} kilohertz.`}
        caption="Lines are spaced by the audio frequency. Their heights come from Bessel functions of the index; Carson's rule brackets nearly all the power.">
        <rect x={14} y={8} width={612} height={300} rx={10} fill={C.fill} />
        <Ln x1={24} y1={base} x2={616} y2={base} color={C.muted} width={2} />
        {[-15, -10, -5, 0, 5, 10, 15].map((k) => (
          <g key={k}>
            <Ln x1={px(k)} y1={base} x2={px(k)} y2={base + 6} color={C.muted} width={1.5} />
            <T x={px(k)} y={base + 18} anchor="middle" size={12} color={C.muted}>{k > 0 ? `+${k}` : k}</T>
          </g>
        ))}
        <T x={616} y={base + 36} anchor="end" size={12} color={C.muted}>kHz from the carrier frequency</T>
        <Ln x1={px(dev)} y1={44} x2={px(dev)} y2={base} color={C.resist} width={1.5} dash="4 4" />
        <Ln x1={px(-dev)} y1={44} x2={px(-dev)} y2={base} color={C.resist} width={1.5} dash="4 4" />
        <T x={px(dev) + 6} y={36} size={12.5} bold color={C.resist}>+{fmt(dev)} dev</T>
        <T x={px(-dev) - 6} y={36} anchor="end" size={12.5} bold color={C.resist}>−{fmt(dev)} dev</T>
        {lines.map(({ n, a }) => (
          <rect key={n} x={px(n * fm) - 2.5} y={base - H * a} width={5} height={Math.max(H * a, 0.5)} rx={1.5} fill={n === 0 ? C.ink : C.signal} />
        ))}
        {j0 < 0.06 && <T x={cx} y={base - 22} anchor="middle" size={12.5} bold color={C.bad}>carrier nearly gone</T>}
        <Ln x1={px(-carson / 2)} y1={base + 50} x2={px(carson / 2)} y2={base + 50} color={C.power} width={2.5} arrow="both" />
        <T x={cx} y={base + 68} anchor="middle" size={13.5} bold color={C.power}>
          Carson: 2 × ({fmt(dev)} + {fmt(fm)}) = {fmt(carson)} kHz
        </T>
      </Diagram>
      <Controls>
        <Slider label="Peak deviation" value={dev} min={1} max={10} step={0.5} onChange={setDev} format={(v) => `±${fmt(v)} kHz`} color="var(--d-resist)" />
        <Slider label="Audio frequency" value={fm} min={0.5} max={4} step={0.5} onChange={setFm} format={(v) => `${fmt(v)} kHz`} color="var(--d-signal)" />
        <Readout label="Modulation index" value={fmt(beta, 3)} color="var(--d-resist)" />
        <Readout label="Bandwidth (Carson)" value={fmt(carson)} unit=" kHz" color="var(--d-power)" />
      </Controls>
    </>
  )
}
