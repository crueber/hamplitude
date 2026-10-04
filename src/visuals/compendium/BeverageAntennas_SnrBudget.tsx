import { useState } from 'react'
import { C, Choice, Controls, Diagram, Ln, Slider, T, fmt } from '../kit'

// All levels in dB relative to the receiver's own internal noise (0 dB). Illustrative scenarios, not measurements.
const SCEN = {
  noisy: { label: 'Noisy low band (160 or 80 m)', ext: 30, sig: 33 },
  quiet: { label: 'Quiet band (VHF)', ext: -5, sig: 5 },
}
type Scen = keyof typeof SCEN
const PRESETS = {
  ref: { label: 'Reference antenna', g: 0, r: 0 },
  bev: { label: 'Weak but directional', g: -10, r: 10 },
}
const dB = (x: number) => 10 * Math.log10(x)
const lin = (d: number) => 10 ** (d / 10)

/** Signal-to-noise budget: an antenna that is weaker than a dipole can still hear better if it rejects more noise than signal. Illustrative numbers. */
export function BeverageAntennas_SnrBudget() {
  const [sc, setSc] = useState<Scen>('noisy')
  const [g, setG] = useState(PRESETS.bev.g)
  const [r, setR] = useState(PRESETS.bev.r)
  const [pre, setPre] = useState('bev')
  const S0 = SCEN[sc]
  const sig = S0.sig + g
  const ext = S0.ext + g - r
  const total = dB(lin(ext) + 1) // external noise + receiver noise (0 dB)
  const snr = sig - total
  const total0 = dB(lin(S0.ext) + 1)
  const snr0 = S0.sig - total0
  const delta = snr - snr0
  // chart: levels from -50 to +50 dB
  const top = 40, bot = 236, lo = -50, hi = 50
  const Y = (v: number) => bot - ((Math.min(hi, Math.max(lo, v)) - lo) / (hi - lo)) * (bot - top)
  const bars = [
    { label: 'Signal', v: sig, color: C.good },
    { label: 'Band noise', v: ext, color: C.bad },
    { label: 'Receiver noise', v: 0, color: C.muted },
  ]
  const verdict = ext > 6 ? ['Band noise dominates', 'Losing signal loses noise too,', 'so S/N holds.']
    : ext < -6 ? ['Receiver noise dominates', 'Every dB of signal lost is', 'a dB of S/N lost.']
    : ['In between', 'Both noise sources matter.', '']
  const good = delta > 1, bad = delta < -1
  return (
    <>
      <Diagram w={640} h={290}
        title={`Signal and noise levels relative to the receiver's own noise. Scenario: ${S0.label}. Signal ${fmt(sig, 3)} dB, band noise ${fmt(ext, 3)} dB. Signal to noise ratio ${fmt(snr, 3)} dB, ${fmt(delta, 2)} dB compared with the reference antenna`}
        caption="Levels in dB above the receiver's own noise. Illustrative numbers: the point is how the three levels move.">
        <Ln x1={50} y1={Y(0)} x2={350} y2={Y(0)} color={C.fill2} width={1.5} dash="4 4" />
        <Ln x1={50} y1={top - 4} x2={50} y2={bot} color={C.muted} width={2} />
        <T x={44} y={Y(0)} anchor="end" size={12} color={C.muted}>0</T>
        <T x={44} y={Y(40)} anchor="end" size={12} color={C.muted}>+40</T>
        <T x={44} y={Y(-40)} anchor="end" size={12} color={C.muted}>−40</T>
        <T x={20} y={20} size={12} color={C.muted}>dB above receiver noise</T>
        {bars.map((b, i) => {
          const x = 76 + i * 98
          const y0 = Y(0), y1 = Y(b.v)
          return (
            <g key={b.label}>
              <rect x={x} y={Math.min(y0, y1)} width={64} height={Math.max(3, Math.abs(y1 - y0))} rx={4} fill={b.color} fillOpacity={0.88} />
              <T x={x + 32} y={bot + 22} anchor="middle" size={12} bold color={b.color}>{b.label}</T>
              <T x={x + 32} y={Math.min(y0, y1) - 10} anchor="middle" size={12} color={C.ink}>{b.v > 0 ? '+' : ''}{fmt(b.v, 3)}</T>
            </g>
          )
        })}
        <rect x={380} y={30} width={250} height={240} rx={12} fill={C.fill} />
        <T x={396} y={56} size={12} color={C.muted}>Signal-to-noise (S/N)</T>
        <T x={396} y={88} size={28} bold color={good ? C.good : bad ? C.bad : C.ink}>{fmt(snr, 3)} dB</T>
        <T x={396} y={122} size={12} color={C.muted}>Reference antenna: {fmt(snr0, 3)} dB</T>
        <T x={396} y={146} size={14} bold color={good ? C.good : bad ? C.bad : C.ink}>{delta > 0 ? '+' : ''}{fmt(delta, 2)} dB vs reference</T>
        <T x={396} y={186} size={12} color={C.muted}>Receiver noise: 0 dB (reference)</T>
        <T x={396} y={220} size={13} bold color={C.signal}>{verdict[0]}</T>
        <T x={396} y={238} size={12} color={C.muted}>{verdict[1]}</T>
        <T x={396} y={254} size={12} color={C.muted}>{verdict[2]}</T>
      </Diagram>
      <Controls>
        <div>
          <span className="ctl-label" style={{ display: 'block', marginBottom: 6 }}>Band</span>
          <Choice label="Band" value={sc} onChange={setSc} options={(Object.keys(SCEN) as Scen[]).map((k) => ({ value: k, label: SCEN[k].label }))} />
        </div>
        <div>
          <span className="ctl-label" style={{ display: 'block', marginBottom: 6 }}>Antenna</span>
          <Choice label="Antenna" value={pre} onChange={(k) => { if (k) { setPre(k); setG(PRESETS[k as keyof typeof PRESETS].g); setR(PRESETS[k as keyof typeof PRESETS].r) } }}
            options={Object.entries(PRESETS).map(([value, p]) => ({ value, label: p.label }))} />
        </div>
        <Slider label="Antenna signal level (efficiency, gain)" value={g} min={-30} max={10} step={1} onChange={(v) => { setG(v); setPre('') }} format={(v) => `${v > 0 ? '+' : ''}${v} dB`} color="var(--d-good)" />
        <Slider label="Noise rejected (other directions)" value={r} min={0} max={20} step={1} onChange={(v) => { setR(v); setPre('') }} format={(v) => `${v} dB`} color="var(--d-bad)" />
      </Controls>
    </>
  )
}
