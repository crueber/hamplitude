import { useState } from 'react'
import { C, Choice, Controls, Diagram, Ln, Readout, Slider, T, fmt } from '../kit'

type Kind = 'series' | 'parallel'
const X0 = 100 // reactance of L and C at resonance, ohms

/** Impedance of series vs parallel RLC around resonance (r = f / f0). */
export function E5A_SeriesParallelZ() {
  const [kind, setKind] = useState<Kind>('series')
  const [rs, setRs] = useState(10)
  const [rp, setRp] = useState(1000)
  const R = kind === 'series' ? rs : rp
  const z = (r: number) => {
    const x = X0 * (r - 1 / r) // net reactance (series) or 1 / net susceptance (parallel)
    return kind === 'series' ? Math.hypot(R, x) : 1 / Math.hypot(1 / R, (r - 1 / r) / X0)
  }
  const zMax = kind === 'series' ? 300 : rp * 1.15
  const PX = 64, PW = 330, PT = 24, PH = 220, PB = PT + PH
  const xr = (r: number) => PX + ((r - 0.5) / 1.0) * PW
  const yv = (v: number) => PB - (Math.min(v, zMax) / zMax) * PH
  const pts: string[] = []
  for (let r = 0.5; r <= 1.5001; r += 0.005) pts.push(`${xr(r).toFixed(1)},${yv(z(r)).toFixed(1)}`)
  const col = kind === 'series' ? C.current : C.resist
  const rows = kind === 'series'
    ? [['Impedance', 'minimum, equals R'], ['Current from source', 'maximum'], ['Voltage across L and C', 'can exceed the source']]
    : [['Impedance', 'maximum, equals R'], ['Current from source', 'minimum'], ['Circulating current in L and C', 'maximum']]

  return (
    <>
      <Diagram w={640} h={300} title={kind === 'series' ? 'A series resonant circuit has its lowest impedance, equal to R, at resonance' : 'A parallel resonant circuit has its highest impedance, equal to R, at resonance'}
        caption="Same two parts, opposite behaviour at resonance.">
        <Ln x1={PX} y1={PB} x2={PX + PW} y2={PB} color={C.muted} />
        <Ln x1={PX} y1={PT} x2={PX} y2={PB} color={C.muted} />
        <Ln x1={xr(1)} y1={PT} x2={xr(1)} y2={PB} color={C.fill2} dash="5 5" width={1.5} />
        <Ln x1={PX} y1={yv(R)} x2={xr(1)} y2={yv(R)} color={C.resist} dash="3 4" width={1.5} />
        <polyline points={pts.join(' ')} fill="none" stroke={col} strokeWidth={3} strokeLinecap="round" />
        <circle cx={xr(1)} cy={yv(R)} r={6} fill={C.bg} stroke={C.ink} strokeWidth={2.5} />
        <T x={PX - 8} y={yv(R)} anchor="end" size={12} bold color={C.resist}>R</T>
        <T x={PX + PW / 2} y={PB + 18} anchor="middle" size={12} bold>f₀</T>
        <T x={PX} y={PB + 18} anchor="middle" size={12} color={C.muted}>lower</T>
        <T x={PX + PW} y={PB + 18} anchor="middle" size={12} color={C.muted}>higher</T>
        <T x={PX + 4} y={PT + 6} size={12} color={C.muted}>|Z| (impedance magnitude)</T>
        <T x={430} y={44} size={14} bold>At resonance</T>
        {rows.map(([a, b], i) => (
          <g key={a}>
            <T x={430} y={78 + i * 62} size={12.5} color={C.muted}>{a}</T>
            <T x={430} y={98 + i * 62} size={14} bold color={i === 0 ? col : C.ink}>{b}</T>
          </g>
        ))}
      </Diagram>
      <Controls>
        <Choice label="Circuit" value={kind} onChange={setKind} options={[{ value: 'series', label: 'Series RLC' }, { value: 'parallel', label: 'Parallel RLC' }]} />
        {kind === 'series'
          ? <Slider label="Series resistance (R)" value={rs} min={2} max={60} onChange={setRs} format={(v) => `${v} Ω`} color="var(--d-resist)" />
          : <Slider label="Parallel resistance (R)" value={rp} min={300} max={3000} step={50} onChange={setRp} format={(v) => `${v} Ω`} color="var(--d-resist)" />}
        <Readout label="Impedance at f₀" value={fmt(R)} unit=" Ω" color="var(--d-resist)" />
      </Controls>
    </>
  )
}
