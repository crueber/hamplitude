import { useState } from 'react'
import { C, Capacitor, Choice, Controls, Diagram, Inductor, Ln, Readout, Slider, T, fmt, si } from '../kit'

const Z0 = 50
const BANDS = [
  { f: 3.6, label: '80 m' },
  { f: 7.1, label: '40 m' },
  { f: 14.2, label: '20 m' },
  { f: 28.5, label: '10 m' },
]

/** An L-network tuner: one series L and one shunt C turn a resistive load into 50 ohms at one frequency. */
export function AntennaTuners_LNetwork() {
  const [f, setF] = useState(7.1)
  const [lg, setLg] = useState(Math.log(200))
  const R = Math.round(Math.exp(lg) * 2) / 2
  const hi = Math.max(R, Z0), lo = Math.min(R, Z0)
  const Q = Math.sqrt(hi / lo - 1)
  const w = 2 * Math.PI * f * 1e6
  const L = (Q * lo) / w
  const Cap = 1 / (w * (hi / Q))
  const loadHigh = R > Z0 + 0.01
  const matched = Math.abs(R - Z0) < 0.6
  const top = 70, bot = 150
  const xs = loadHigh ? 270 : 400 // series L position
  const xc = loadHigh ? 400 : 190 // shunt C position
  return (
    <>
      <Diagram w={640} h={254}
        title={`An L-network tuner at ${f} megahertz matching a ${R} ohm load to the 50 ohm radio needs a series inductor of ${si(L, 'H', 3)} and a shunt capacitor of ${si(Cap, 'F', 3)}`}
        caption="The shunt part always goes across the higher impedance. A bigger mismatch means higher Q: narrower, and more loss in real parts.">
        <rect x={14} y={top - 4} width={92} height={bot - top + 8} rx={10} fill={C.fill} stroke={C.ink} strokeWidth={2} />
        <T x={60} y={(top + bot) / 2 - 8} anchor="middle" size={14} bold>Radio</T>
        <T x={60} y={(top + bot) / 2 + 12} anchor="middle" size={12.5} color={C.muted}>sees 50 Ω</T>
        <rect x={534} y={top - 4} width={92} height={bot - top + 8} rx={10} fill={C.fill} stroke={matched ? C.good : C.resist} strokeWidth={2} />
        <T x={580} y={(top + bot) / 2 - 8} anchor="middle" size={14} bold>Load</T>
        <T x={580} y={(top + bot) / 2 + 12} anchor="middle" size={12.5} bold color={C.resist}>{R} Ω</T>
        <Ln x1={106} y1={top} x2={534} y2={top} color={C.ink} width={2.2} />
        <Ln x1={106} y1={bot} x2={534} y2={bot} color={C.ink} width={2.2} />
        <rect x={Math.min(xs, xc) - 52} y={top - 34} width={Math.abs(xs - xc) + 104} height={bot - top + 68} rx={10} fill="none" stroke={C.muted} strokeWidth={1.2} strokeDasharray="5 4" />
        <rect x={xs - 36} y={top - 12} width={72} height={24} fill={C.bg} />
        <Inductor x={xs} y={top} len={70} color={C.power} />
        <rect x={xc - 4} y={(top + bot) / 2 - 30} width={8} height={60} fill={C.bg} />
        <Capacitor x={xc} y={(top + bot) / 2} rot={90} len={60} color={C.signal} />
        <Ln x1={xc} y1={top} x2={xc} y2={(top + bot) / 2 - 30} color={C.ink} width={2.2} />
        <Ln x1={xc} y1={(top + bot) / 2 + 30} x2={xc} y2={bot} color={C.ink} width={2.2} />
        <T x={xs} y={top - 22} anchor="middle" size={13} bold color={C.power}>{si(L, 'H', 3)}</T>
        <T x={loadHigh ? xc - 26 : xc + 26} y={(top + bot) / 2} anchor={loadHigh ? 'end' : 'start'} size={13} bold color={C.signal}>{si(Cap, 'F', 3)}</T>
        <T x={(Math.min(xs, xc) + Math.max(xs, xc)) / 2} y={bot + 52} anchor="middle" size={12.5} color={C.muted}>tuner: series L, shunt C (low-pass)</T>
        <T x={20} y={236} size={12.5} color={C.muted} mono>Q = √(Rhigh ÷ Rlow − 1) = {fmt(Q, 3)}</T>
      </Diagram>
      <Controls>
        <Slider label="Load resistance" value={lg} min={Math.log(12.5)} max={Math.log(800)} step={0.01} onChange={setLg} format={() => `${R} Ω`} color="var(--d-resist)" />
        <Readout label="Series L" value={si(L, 'H', 3)} color="var(--d-power)" />
        <Readout label="Shunt C" value={si(Cap, 'F', 3)} color="var(--d-signal)" />
      </Controls>
      <div style={{ margin: '-6px 0 14px' }}>
        <Choice label="Band" value={f} onChange={setF} options={BANDS.map((b) => ({ value: b.f, label: b.label }))} />
      </div>
    </>
  )
}
