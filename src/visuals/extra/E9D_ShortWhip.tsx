import { useState } from 'react'
import { C, Controls, Diagram, Ln, Slider, T } from '../kit'

/** Illustrative short-whip model (¼-wave ground-plane whip at its resonant frequency = 36 Ω, 0 reactance). */
function model(r: number, q: number) {
  const rr = 36 * r * r // radiation resistance falls roughly with the square of electrical length
  const xc = r >= 0.995 ? 0 : 300 / Math.tan((Math.PI / 2) * r) // whip is capacitive when short
  const rcoil = xc / q // coil loss resistance = X ÷ Q
  const rg = 5 // ground and other loss, fixed
  return { rr, xc, rcoil, rg, eff: rr / (rr + rcoil + rg) }
}

/** Operating below a whip's resonant frequency: lower radiation resistance, capacitive reactance cancelled by a coil whose own resistance wastes power. */
export function E9D_ShortWhip() {
  const [r, setR] = useState(0.5)
  const [q, setQ] = useState(150)
  const m = model(r, q)
  const gx = 70, gy = 252, top = r < 0.995 ? gy - 74 - 150 * r : gy - 150
  const bx = 250, bw = 370, sc = bw / 50
  const pct = Math.round(m.eff * 100)
  const showCoil = r < 0.995
  return (
    <>
      <Diagram w={640} h={300} title={`Base-fed whip operating at ${Math.round(r * 100)} percent of its resonant frequency: radiation resistance ${m.rr.toFixed(0)} ohms, capacitive reactance ${m.xc.toFixed(0)} ohms cancelled by a loading coil, efficiency ${pct} percent. Illustrative values.`}
        caption="Illustrative model. Lower frequency or shorter whip: radiation resistance drops fast, and the coil's own resistance takes a bigger share.">
        <Ln x1={gx - 50} y1={gy} x2={gx + 50} y2={gy} color={C.muted} width={5} />
        <T x={gx} y={gy + 20} anchor="middle" size={12} color={C.muted}>ground</T>
        {showCoil ? <>
          <Ln x1={gx} y1={gy} x2={gx} y2={gy - 24} color={C.resist} width={5} />
          <path d={`M${gx},${gy - 74} ` + Array.from({ length: 5 }, () => 'a9,5 0 0 1 0,10').join(' ')} fill="none" stroke={C.power} strokeWidth={3.5} strokeLinecap="round" />
          <Ln x1={gx} y1={gy - 74} x2={gx} y2={top} color={C.resist} width={5} />
          <T x={gx + 20} y={gy - 49} size={12} bold color={C.power}>coil</T>
        </> : <Ln x1={gx} y1={gy} x2={gx} y2={top} color={C.resist} width={5} />}
        <T x={gx - 16} y={top + 10} anchor="end" size={12} color={C.muted}>whip</T>

        <T x={bx} y={26} size={13} bold color={C.muted}>Operating frequency</T>
        <T x={bx + bw} y={26} anchor="end" size={16} bold color={C.ink}>{Math.round(r * 100)}% of resonant</T>
        <T x={bx} y={62} size={13} color={C.ink}>Whip reactance</T>
        <T x={bx + bw} y={62} anchor="end" size={14} bold color={C.voltage}>{m.xc ? `−j${m.xc.toFixed(0)} Ω` : '0 Ω'}</T>
        <T x={bx} y={88} size={13} color={C.ink}>Coil cancels it</T>
        <T x={bx + bw} y={88} anchor="end" size={14} bold color={C.power}>{m.xc ? `+j${m.xc.toFixed(0)} Ω` : 'none needed'}</T>
        <T x={bx} y={134} size={13} bold color={C.muted}>Resistances (Ω)</T>
        <rect x={bx} y={150} width={m.rr * sc} height={28} fill={C.good} fillOpacity={0.9} />
        <rect x={bx + m.rr * sc} y={150} width={m.rcoil * sc} height={28} fill={C.bad} fillOpacity={0.9} />
        <rect x={bx + (m.rr + m.rcoil) * sc} y={150} width={m.rg * sc} height={28} fill={C.muted} fillOpacity={0.8} />
        <rect x={bx} y={150} width={bw} height={28} fill="none" stroke={C.fill2} strokeWidth={1.5} />
        <T x={bx} y={196} size={12} bold color={C.good}>radiation {m.rr.toFixed(1)}</T>
        <T x={bx + 140} y={196} size={12} bold color={C.bad}>coil {m.rcoil.toFixed(1)}</T>
        <T x={bx + 240} y={196} size={12} bold color={C.muted}>ground 5</T>
        <rect x={bx} y={222} width={bw} height={48} rx={10} fill={C.fill} stroke={pct >= 70 ? C.good : C.bad} strokeWidth={2} />
        <T x={bx + 12} y={246} size={15} bold color={pct >= 70 ? C.good : C.bad}>efficiency = {m.rr.toFixed(1)} ÷ {(m.rr + m.rcoil + m.rg).toFixed(1)} = {pct}%</T>
      </Diagram>
      <Controls>
        <Slider label="Operating frequency (fraction of resonant)" value={r} min={0.3} max={1} step={0.05} onChange={setR} format={(v) => `${Math.round(v * 100)}%`} color="var(--d-resist)" />
        <Slider label="Coil quality (reactance ÷ resistance)" value={q} min={30} max={400} step={10} onChange={setQ} format={(v) => `${v}`} color="var(--d-power)" />
      </Controls>
    </>
  )
}
