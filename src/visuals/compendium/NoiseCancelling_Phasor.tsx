import { useState } from 'react'
import { C, Choice, Controls, Diagram, Ln, Slider, T, TAU, fmt } from '../kit'

// Noise reaches the main antenna as 1 at 0 degrees, and the noise antenna as RHO at THETA.
// The signal reaches the noise antenna only weakly (SIG_A at SIG_PH), relative to 1 at the main antenna.
const RHO = 0.5, THETA = 50, SIG_A = 0.15, SIG_PH = 130
const BEST = { g: 20 * Math.log10(1 / RHO), p: 180 - THETA } // 6.0 dB, 130 degrees
const U = 84 // pixels per unit

const cplx = (m: number, deg: number): [number, number] => [m * Math.cos((deg * Math.PI) / 180), m * Math.sin((deg * Math.PI) / 180)]

/** Phasor view of noise cancelling: the noise antenna's adjusted noise is added to the main antenna's. Zero residual needs equal size and opposite phase. */
export function NoiseCancelling_Phasor() {
  const [g, setG] = useState(3)
  const [p, setP] = useState(80)
  const [mode, setMode] = useState('custom')
  const a = 10 ** (g / 20)
  const [mx, my] = cplx(1, 0)
  const [ax, ay] = cplx(a * RHO, THETA + p)
  const rx = mx + ax, ry = my + ay
  const res = Math.hypot(rx, ry)
  const reduction = -20 * Math.log10(Math.max(res, 1e-4)) // noise reduction in dB
  // wanted signal: 1 from the main antenna plus the adjusted share from the noise antenna
  const [sx, sy] = cplx(a * SIG_A, SIG_PH + p)
  const sig = 20 * Math.log10(Math.hypot(1 + sx, sy))
  const ox = 170, oy = 135
  const px = (x: number) => ox + x * U, py = (y: number) => oy - y * U
  const nulled = res < 0.03
  return (
    <>
      <Diagram w={640} h={300}
        title={`Phasor sum of noise from the main antenna and the adjusted noise from the noise antenna. Gain ${fmt(g, 3)} dB, phase ${p} degrees: noise reduced by ${fmt(reduction, 3)} dB, wanted signal changed by ${fmt(sig, 2)} dB`}
        caption="Arrows are noise voltages. Cancelling needs the added arrow to be the same length and point the opposite way.">
        <T x={20} y={16} size={13} bold color={C.muted}>Noise phasors</T>
        <circle cx={ox} cy={oy} r={U} fill="none" stroke={C.fill2} strokeWidth={1.5} strokeDasharray="4 4" />
        <Ln x1={ox - 110} y1={oy} x2={ox + 190} y2={oy} color={C.fill2} width={1} />
        <Ln x1={ox} y1={oy - 125} x2={ox} y2={oy + 125} color={C.fill2} width={1} />
        <Ln x1={ox} y1={oy} x2={px(mx)} y2={py(my)} color={C.bad} width={4} arrow />
        <Ln x1={px(mx)} y1={py(my)} x2={px(rx)} y2={py(ry)} color={C.resist} width={4} arrow />
        {!nulled && <Ln x1={ox} y1={oy} x2={px(rx)} y2={py(ry)} color={C.power} width={3} dash="2 5" />}
        <circle cx={px(rx)} cy={py(ry)} r={6} fill={nulled ? C.good : C.power} stroke={C.bg} strokeWidth={2} />
        <circle cx={ox} cy={oy} r={4} fill={C.ink} />
        <T x={px(mx) + 8} y={oy - 14} size={12} bold color={C.bad}>main-antenna noise</T>
        <T x={20} y={274} size={12} bold color={C.resist}>amber: noise from the noise antenna, adjusted</T>
        <T x={20} y={292} size={12} bold color={C.power}>dotted: what is left over</T>
        <rect x={400} y={30} width={230} height={150} rx={12} fill={C.fill} stroke={nulled ? C.good : C.fill2} strokeWidth={2} />
        <T x={414} y={52} size={12} color={C.muted}>Noise reduction</T>
        <T x={414} y={82} size={28} bold color={nulled ? C.good : C.ink}>{reduction > 60 ? '60+' : fmt(reduction, 3)} dB</T>
        <T x={414} y={118} size={12} color={C.muted}>Wanted signal changes by</T>
        <T x={414} y={140} size={15} bold color={C.signal}>{sig > 0 ? '+' : ''}{fmt(sig, 2)} dB</T>
        <T x={414} y={166} size={12} color={C.muted}>(the signal changes a little too)</T>
        <T x={400} y={206} size={12} color={C.muted}>Setting needed here: gain +6.0 dB,</T>
        <T x={400} y={224} size={12} color={C.muted}>phase 130°. Each antenna sees the noise</T>
        <T x={400} y={242} size={12} color={C.muted}>at a different size and phase.</T>
      </Diagram>
      <Controls>
        <div>
          <span className="ctl-label" style={{ display: 'block', marginBottom: 6 }}>Setting</span>
          <Choice label="Setting" value={mode} onChange={(m) => { setMode(m); if (m === 'best') { setG(BEST.g); setP(BEST.p) } else { setG(3); setP(80) } }}
            options={[{ value: 'custom', label: 'Start here' }, { value: 'best', label: 'Best null' }]} />
        </div>
        <Slider label="Noise-antenna gain" value={g} min={-12} max={12} step={0.1} onChange={(v) => { setG(v); setMode('custom') }} format={(v) => `${v > 0 ? '+' : ''}${fmt(v, 3)} dB`} color="var(--d-resist)" />
        <Slider label="Noise-antenna phase" value={p} min={-180} max={180} step={1} onChange={(v) => { setP(v); setMode('custom') }} format={(v) => `${v}°`} color="var(--d-power)" />
      </Controls>
    </>
  )
}
void TAU
