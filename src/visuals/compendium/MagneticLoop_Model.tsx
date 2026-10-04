import { useState } from 'react'
import { C, Choice, Controls, Diagram, Ln, Slider, T } from '../kit'

const MU0 = 4e-7 * Math.PI
const A_WIRE = 0.011 // m: 22 mm copper tube, illustrative
const R_EXTRA = 0.01 // ohms: joints and capacitor, illustrative
const POWER = 100 // watts

function model(D: number, fMHz: number) {
  const f = fMHz * 1e6, lam = 299.792458 / fMHz
  const circ = Math.PI * D
  const rr = 20 * Math.PI ** 2 * (circ / lam) ** 4 // small single-turn loop
  const rs = Math.sqrt((Math.PI * f * MU0) / 5.8e7) // skin-effect surface resistance of copper
  const rl = (circ * rs) / (2 * Math.PI * A_WIRE) + R_EXTRA
  const L = MU0 * (D / 2) * (Math.log((8 * (D / 2)) / A_WIRE) - 2)
  const xl = 2 * Math.PI * f * L
  const rt = rr + rl
  const q = xl / rt
  const vPeak = Math.SQRT2 * Math.sqrt(POWER / rt) * xl
  return { lam, circ, rr, rl, eff: rr / rt, q, bw: f / q / 1e3, vPeak }
}

const BANDS = [[3.6, '80 m'], [7.15, '40 m'], [10.12, '30 m'], [14.2, '20 m'], [21.2, '15 m'], [28.4, '10 m']] as const

/** Small transmitting loop: radiation resistance is tiny, so a few hundredths of an ohm of loss decide the efficiency. */
export function MagneticLoop_Model() {
  const [D, setD] = useState(1)
  const [f, setF] = useState(14.2)
  const m = model(D, f)
  const pct = Math.round(m.eff * 100)
  const big = m.circ / m.lam > 0.25
  const bx = 330, bw = 280
  const mw = (v: number) => (v * 1000 < 10 ? (v * 1000).toFixed(1) : Math.round(v * 1000).toString())
  return (
    <>
      <Diagram w={640} h={330}
        title={`Small magnetic loop ${D.toFixed(2)} meters across on ${f} megahertz: radiation resistance ${mw(m.rr)} milliohms, loss resistance ${mw(m.rl)} milliohms, efficiency ${pct} percent, Q about ${Math.round(m.q)}, 3 dB bandwidth about ${m.bw.toFixed(0)} kilohertz, peak voltage across the capacitor about ${(m.vPeak / 1000).toFixed(1)} kilovolts at ${POWER} watts. Illustrative.`}
        caption="Illustrative model: one turn of 22 mm copper tube, 100 W. Real loops differ, mostly through capacitor and joint losses.">
        <circle cx={140} cy={162} r={96} fill="none" stroke={C.ink} strokeWidth={6} />
        <rect x={120} y={50} width={40} height={30} fill={C.bg} />
        <Ln x1={124} y1={54} x2={124} y2={76} color={C.voltage} width={5} />
        <Ln x1={156} y1={54} x2={156} y2={76} color={C.voltage} width={5} />
        <T x={140} y={34} anchor="middle" size={13} bold color={C.voltage}>tuning capacitor</T>
        <circle cx={140} cy={218} r={30} fill="none" stroke={C.power} strokeWidth={4} />
        <T x={140} y={156} anchor="middle" size={13} bold color={C.power}>coupling loop</T>
        <T x={140} y={174} anchor="middle" size={12} color={C.muted}>to the radio</T>
        <Ln x1={44} y1={286} x2={236} y2={286} color={C.muted} width={1.5} arrow="both" />
        <T x={140} y={308} anchor="middle" size={13} bold color={C.muted}>{D.toFixed(2)} m across ({(D * 3.281).toFixed(1)} ft)</T>

        <T x={bx} y={26} size={13} bold color={C.muted}>{f} MHz, loop circumference {(m.circ / m.lam).toFixed(2)} λ</T>
        <T x={bx} y={62} size={14} color={C.ink}>Radiation resistance</T>
        <T x={bx + bw} y={62} anchor="end" size={14} bold color={C.good}>{mw(m.rr)} mΩ</T>
        <T x={bx} y={88} size={14} color={C.ink}>Loss resistance</T>
        <T x={bx + bw} y={88} anchor="end" size={14} bold color={C.bad}>{mw(m.rl)} mΩ</T>
        <rect x={bx} y={108} width={bw} height={26} fill={C.bad} fillOpacity={0.9} />
        <rect x={bx} y={108} width={bw * m.eff} height={26} fill={C.good} fillOpacity={0.95} />
        <rect x={bx} y={108} width={bw} height={26} fill="none" stroke={C.fill2} strokeWidth={1.5} />
        <T x={bx} y={152} size={14} bold color={m.eff >= 0.5 ? C.good : C.bad}>efficiency {pct}%</T>
        <T x={bx} y={188} size={14} color={C.ink}>Q (sharpness of tuning)</T>
        <T x={bx + bw} y={188} anchor="end" size={14} bold>about {Math.round(m.q)}</T>
        <T x={bx} y={214} size={14} color={C.ink}>Bandwidth (3 dB)</T>
        <T x={bx + bw} y={214} anchor="end" size={14} bold>about {m.bw.toFixed(0)} kHz</T>
        <rect x={bx} y={236} width={bw} height={58} rx={10} fill={C.fill} stroke={C.bad} strokeWidth={2} />
        <T x={bx + 12} y={256} size={13} bold color={C.bad}>Across the capacitor at {POWER} W:</T>
        <T x={bx + 12} y={277} size={15} bold color={C.bad}>about {(m.vPeak / 1000).toFixed(1)} kV peak</T>
        {big && <T x={bx} y={312} size={12} color={C.bad}>Over 1/4 λ round: no longer a small loop, model unreliable.</T>}
      </Diagram>
      <Controls>
        <Choice label="Band" value={f} onChange={setF} options={BANDS.map(([v, l]) => ({ value: v, label: l }))} />
        <Slider label="Loop diameter" value={D} min={0.3} max={1.5} step={0.05} onChange={setD} format={(v) => `${v.toFixed(2)} m`} color="var(--d-signal)" />
      </Controls>
    </>
  )
}
