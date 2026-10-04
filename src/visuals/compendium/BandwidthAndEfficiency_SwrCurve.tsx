import { useState } from 'react'
import { C, Choice, Controls, Diagram, Ln, Readout, Slider, T, fmt } from '../kit'

const R = 50 // matched at resonance, to isolate the effect of Q
const F0_KHZ = 7150 // example centre frequency: the 40 m band

const swrAt = (q: number, d: number) => {
  const X = 2 * q * R * d
  const g = Math.abs(X) / Math.hypot(2 * R, X)
  return (1 + g) / (1 - g)
}

/** SWR bandwidth of a resonant antenna (series-RLC model, matched at resonance): higher Q gives a narrower dip. */
export function BandwidthAndEfficiency_SwrCurve() {
  const [q, setQ] = useState(10)
  const [thr, setThr] = useState(2)
  const gam = (thr - 1) / (thr + 1)
  const X = (2 * R * gam) / Math.sqrt(1 - gam * gam)
  const half = X / (2 * q * R) // fractional half-width
  const bwPct = 2 * half * 100
  const x0 = 340, kx = 28 // 28 px per percent: plot spans +/-10 %
  const top = 36, bot = 216
  const xv = (pp: number) => x0 + pp * kx
  const yv = (s: number) => bot - ((Math.min(s, 5) - 1) / 4) * (bot - top)
  const pts: string[] = []
  for (let i = -100; i <= 100; i++) pts.push(`${i === -100 ? 'M' : 'L'}${xv(i / 10).toFixed(1)},${yv(swrAt(q, i / 1000)).toFixed(1)}`)
  const xl = xv(-half * 100), xr = xv(half * 100)
  return (
    <>
      <Diagram w={640} h={296} title={`SWR against frequency for a resonant antenna with Q of ${q}: the SWR stays under ${thr} to 1 over a band ${fmt(bwPct, 3)} percent wide`}
        caption="Illustrative model of a resonant antenna matched at its centre. Higher Q, a sharper dip, a narrower usable band.">
        <Ln x1={xv(-10)} y1={bot} x2={xv(10)} y2={bot} color={C.muted} width={2} />
        <Ln x1={xv(-10)} y1={top} x2={xv(-10)} y2={bot} color={C.muted} width={2} />
        {[1, 2, 3, 4, 5].map((s) => (
          <g key={s}>
            <Ln x1={xv(-10)} y1={yv(s)} x2={xv(10)} y2={yv(s)} color={C.fill2} width={1} />
            <T x={xv(-10) - 8} y={yv(s)} size={12} anchor="end" color={C.muted}>{s === 5 ? '5+' : s}</T>
          </g>
        ))}
        <T x={xv(-10) - 8} y={top - 16} size={12.5} anchor="end" color={C.muted}>SWR</T>
        <rect x={xl} y={yv(thr)} width={xr - xl} height={bot - yv(thr)} fill={C.good} fillOpacity={0.2} />
        <Ln x1={xv(-10)} y1={yv(thr)} x2={xv(10)} y2={yv(thr)} color={C.power} width={2} dash="6 4" />
        <T x={xv(10) - 2} y={yv(thr) - 12} size={12.5} anchor="end" bold color={C.power}>limit {thr} : 1</T>
        <path d={pts.join('')} fill="none" stroke={C.signal} strokeWidth={3.5} strokeLinejoin="round" />
        {[-10, -5, 0, 5, 10].map((pp) => <T key={pp} x={xv(pp)} y={bot + 16} size={12} anchor="middle" color={C.muted}>{pp === 0 ? 'centre' : `${pp > 0 ? '+' : '−'}${Math.abs(pp)}%`}</T>)}
        <Ln x1={xl} y1={252} x2={xr} y2={252} color={C.good} width={3} arrow="both" />
        <T x={x0} y={274} size={13.5} bold anchor="middle" color={C.good}>bandwidth {fmt(bwPct, 3)}%, about {fmt((bwPct / 100) * F0_KHZ, 3)} kHz at 7.15 MHz</T>
      </Diagram>
      <Controls>
        <Slider label="Antenna Q (higher = sharper)" value={q} min={4} max={40} step={1} onChange={setQ} format={(v) => `Q = ${v}`} color="var(--d-signal)" />
        <Readout label={`Bandwidth at ${thr}:1`} value={fmt(bwPct, 3)} unit="%" color="var(--d-good)" />
      </Controls>
      <div style={{ margin: '-6px 0 14px' }}>
        <Choice label="SWR limit" value={thr} onChange={setThr} options={[{ value: 1.5, label: 'Limit 1.5 : 1' }, { value: 2, label: 'Limit 2 : 1' }, { value: 3, label: 'Limit 3 : 1' }]} />
      </div>
    </>
  )
}
