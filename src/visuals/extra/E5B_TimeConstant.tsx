import { useState } from 'react'
import { C, Choice, Controls, Diagram, Ln, Readout, Slider, T, fmt, si } from '../kit'

type Kind = 'rc' | 'rl'

/** Charge / discharge curve in time constants. RC: tau = R x C. RL: tau = L / R. */
export function E5B_TimeConstant() {
  const [kind, setKind] = useState<Kind>('rc')
  const [up, setUp] = useState(true)
  const [rk, setRk] = useState(100) // kΩ
  const [cu, setCu] = useState(10) // µF
  const [rl, setRl] = useState(100) // Ω
  const [lm, setLm] = useState(10) // mH
  const tau = kind === 'rc' ? rk * 1e3 * cu * 1e-6 : (lm * 1e-3) / rl
  const PX = 64, PW = 540, PT = 30, PH = 190, PB = PT + PH
  const NT = 5.4
  const xt = (n: number) => PX + (n / NT) * PW
  const yv = (p: number) => PB - p * PH
  const f = (n: number) => (up ? 1 - Math.exp(-n) : Math.exp(-n))
  const pts: string[] = []
  for (let i = 0; i <= 200; i++) { const n = (NT * i) / 200; pts.push(`${xt(n).toFixed(1)},${yv(f(n)).toFixed(1)}`) }
  const marks = [1, 2, 3, 5]
  const qty = kind === 'rc' ? 'capacitor voltage' : 'inductor current'
  const unit = kind === 'rc' ? 'of supply voltage' : 'of final current'
  return (
    <>
      <Diagram w={640} h={290} title={`${kind === 'rc' ? 'Capacitor voltage' : 'Inductor current'} ${up ? 'rising' : 'falling'} over five time constants. After one time constant it is ${up ? '63.2' : '36.8'} percent. One time constant is ${si(tau, 's')}.`}
        caption={up ? 'Each step of 1τ closes 63.2% of the remaining gap.' : 'Each step of 1τ removes 63.2% of what is left.'}>
        <Ln x1={PX} y1={PB} x2={PX + PW} y2={PB} color={C.muted} />
        <Ln x1={PX} y1={PT - 6} x2={PX} y2={PB} color={C.muted} />
        <Ln x1={PX} y1={yv(1)} x2={PX + PW} y2={yv(1)} color={C.fill2} dash="5 5" width={1.5} />
        <T x={PX - 8} y={yv(1)} anchor="end" size={12} color={C.muted}>100%</T>
        <T x={PX - 8} y={PB} anchor="end" size={12} color={C.muted}>0</T>
        {marks.map((n) => (
          <g key={n}>
            <Ln x1={xt(n)} y1={yv(f(n))} x2={xt(n)} y2={PB} color={C.fill2} dash="3 4" width={1.5} />
            <T x={xt(n)} y={PB + 16} anchor="middle" size={13} bold>{n}τ</T>
            <T x={xt(n)} y={PB + 34} anchor="middle" size={12} color={C.muted}>{si(n * tau, 's', 3)}</T>
          </g>
        ))}
        <polyline points={pts.join(' ')} fill="none" stroke={up ? C.voltage : C.current} strokeWidth={3} strokeLinecap="round" />
        {marks.map((n) => {
          const v = f(n)
          const above = !up
          return (
            <g key={n}>
              <circle cx={xt(n)} cy={yv(v)} r={5.5} fill={C.bg} stroke={C.ink} strokeWidth={2.5} />
              <T x={xt(n) + 9} y={yv(v) + (above ? -14 : 16)} size={13} bold>{(v * 100).toFixed(1)}%</T>
            </g>
          )
        })}
        <T x={PX + 10} y={PT - 14} size={13} color={C.muted}>{qty} ({unit})</T>
      </Diagram>
      <Controls>
        <Choice label="Circuit" value={kind} onChange={setKind} options={[{ value: 'rc', label: 'RC (capacitor)' }, { value: 'rl', label: 'RL (inductor)' }]} />
        <Choice label="Direction" value={up ? 'up' : 'down'} onChange={(v) => setUp(v === 'up')} options={[{ value: 'up', label: kind === 'rc' ? 'Charging' : 'Current rising' }, { value: 'down', label: kind === 'rc' ? 'Discharging' : 'Current falling' }]} />
        {kind === 'rc' ? (
          <>
            <Slider label="Resistance (R)" value={rk} min={1} max={1000} onChange={setRk} format={(v) => `${v} kΩ`} color="var(--d-resist)" />
            <Slider label="Capacitance (C)" value={cu} min={1} max={470} onChange={setCu} format={(v) => `${v} µF`} color="var(--d-power)" />
          </>
        ) : (
          <>
            <Slider label="Resistance (R)" value={rl} min={10} max={1000} step={10} onChange={setRl} format={(v) => `${v} Ω`} color="var(--d-resist)" />
            <Slider label="Inductance (L)" value={lm} min={1} max={100} onChange={setLm} format={(v) => `${v} mH`} color="var(--d-signal)" />
          </>
        )}
        <Readout label={kind === 'rc' ? `τ = R × C = ${fmt(rk)} kΩ × ${fmt(cu)} µF` : `τ = L ÷ R = ${fmt(lm)} mH ÷ ${fmt(rl)} Ω`} value={si(tau, 's', 3)} />
      </Controls>
    </>
  )
}
