import { useState } from 'react'
import { C, Choice, Controls, Diagram, Ln, Readout, T, fmt } from '../kit'

const BANDS = [
  { v: '40', label: '40 m', f: 7.1 },
  { v: '20', label: '20 m', f: 14.2 },
  { v: '15', label: '15 m', f: 21.2 },
  { v: '10', label: '10 m', f: 28.5 },
  { v: '6', label: '6 m', f: 50.2 },
]

/** Quad and delta loops: about one wavelength of wire per loop, a reflector loop a little bigger, spaced along a boom. */
export function QuadAndDeltaLoopBeams_Loops() {
  const [band, setBand] = useState('20')
  const f = BANDS.find((b) => b.v === band)!.f
  // common design starting points (feet): driven loop 1005/f round, reflector about 3% longer (1030/f)
  const drivenFt = 1005 / f, reflFt = 1030 / f, lambdaFt = 983.6 / f
  const side = drivenFt / 4
  const feet = (x: number) => `${fmt(x, 3)} ft`
  return (
    <>
      <Diagram w={640} h={270}
        title="A square quad loop and a delta loop, each fed at the middle of the bottom wire, and a side view of a two-loop beam with a reflector loop behind the driven loop"
        caption="Each loop is about one wavelength of wire round. Feeding the bottom wire gives horizontal polarization.">
        {/* quad */}
        <T x={105} y={18} anchor="middle" size={13} bold color={C.muted}>Quad loop</T>
        <rect x={45} y={44} width={120} height={120} fill="none" stroke={C.signal} strokeWidth={4} strokeLinejoin="round" />
        <circle cx={105} cy={164} r={7} fill={C.bg} stroke={C.power} strokeWidth={3} />
        <T x={105} y={190} anchor="middle" size={12} bold color={C.power}>feed</T>
        <T x={105} y={96} anchor="middle" size={12} color={C.muted}>each side is</T>
        <T x={105} y={113} anchor="middle" size={12} color={C.muted}>¼ of the wire</T>
        {/* delta */}
        <T x={265} y={18} anchor="middle" size={13} bold color={C.muted}>Delta loop</T>
        <path d="M205,164 L325,164 L265,50 Z" fill="none" stroke={C.signal} strokeWidth={4} strokeLinejoin="round" />
        <circle cx={265} cy={164} r={7} fill={C.bg} stroke={C.power} strokeWidth={3} />
        <T x={265} y={190} anchor="middle" size={12} bold color={C.power}>feed</T>
        <T x={265} y={118} anchor="middle" size={12} color={C.muted}>3 equal</T>
        <T x={265} y={135} anchor="middle" size={12} color={C.muted}>sides</T>
        {/* side view */}
        <T x={480} y={18} anchor="middle" size={13} bold color={C.muted}>Side view of a beam</T>
        <Ln x1={385} y1={110} x2={530} y2={110} color={C.muted} width={5} />
        <Ln x1={405} y1={50} x2={405} y2={170} color={C.bad} width={6} />
        <Ln x1={505} y1={58} x2={505} y2={162} color={C.voltage} width={6} />
        <Ln x1={405} y1={188} x2={505} y2={188} color={C.muted} width={1.5} arrow="both" dash="4 4" />
        <T x={455} y={206} anchor="middle" size={12} color={C.muted}>about 0.2 λ typical</T>
        <T x={405} y={36} anchor="middle" size={12} bold color={C.bad}>reflector</T>
        <T x={505} y={36} anchor="middle" size={12} bold color={C.voltage}>driven</T>
        <Ln x1={540} y1={110} x2={610} y2={110} color={C.good} width={3} arrow />
        <T x={575} y={130} anchor="middle" size={13} bold color={C.good}>beam</T>
        <rect x={20} y={226} width={600} height={34} rx={10} fill={C.fill} />
        <T x={320} y={243} anchor="middle" size={13} color={C.ink}>Driven loop ≈ {fmt(drivenFt / lambdaFt, 3)} λ round: the wire is cut a little longer than one wavelength.</T>
      </Diagram>
      <Controls>
        <div>
          <span className="ctl-label" style={{ display: 'block', marginBottom: 6 }}>Band (typical frequency)</span>
          <Choice label="Band" value={band} onChange={setBand} options={BANDS.map((b) => ({ value: b.v, label: b.label }))} />
        </div>
        <Readout label="Driven loop wire (1005 ÷ f)" value={feet(drivenFt)} color="var(--d-voltage)" />
        <Readout label="One side of a square" value={feet(side)} color="var(--d-signal)" />
        <Readout label="Reflector loop wire (1030 ÷ f)" value={feet(reflFt)} color="var(--d-bad)" />
      </Controls>
    </>
  )
}
