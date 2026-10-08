import { useState } from 'react'
import { C, Choice, Controls, Diagram, Ln, Readout, T } from '../kit'

type Cls = 'tech' | 'general'

const LO = 28.0, HI = 29.7, X0 = 24, X1 = 616
const X = (f: number) => X0 + ((f - LO) / (HI - LO)) * (X1 - X0)
const Z0 = 29.5, Z1 = 29.7
const Z = (f: number) => X0 + ((f - Z0) / (Z1 - Z0)) * (X1 - X0)

interface Bar { a: number; b: number; color: string; fill?: number; label?: string }

// ARRL band plan, 10 m, simplified. Rule: 47 CFR 97.205(b). Privileges: 97.301(d), (e).
const PLAN: Bar[] = [
  { a: 28.0, b: 28.2, color: C.muted, fill: 0.14, label: 'CW, data' },
  { a: 28.2, b: 28.3, color: C.muted, fill: 0.14 },
  { a: 28.3, b: 29.3, color: C.muted, fill: 0.14, label: 'phone (SSB, AM)' },
  { a: 29.3, b: 29.51, color: C.muted, fill: 0.14, label: 'satellite' },
  { a: 29.52, b: 29.59, color: C.resist },
  { a: 29.61, b: 29.7, color: C.signal },
]

/** 10 m to scale: where repeaters are allowed, what the band plan puts in the top 200 kHz, and what your license lets you transmit. */
export function HfAnd10MeterRepeaters_Segment() {
  const [cls, setCls] = useState<Cls>('tech')
  const privHi = cls === 'tech' ? 28.5 : 29.7
  const canInputs = cls === 'general'
  const ticks = [28.0, 28.5, 29.0, 29.5, 29.7]
  const zticks = [29.5, 29.55, 29.6, 29.65, 29.7]

  return (
    <>
      <Diagram w={640} h={404}
        title={`The 10 meter band, 28.0 to 29.7 megahertz, to scale. FCC rule: repeaters are allowed only from 29.5 to 29.7 megahertz. ARRL band plan: repeater inputs at 29.52 to 29.59, FM simplex at 29.60 and repeater outputs at 29.61 to 29.70 megahertz, about 100 kilohertz apart. ${cls === 'tech' ? 'A Technician may transmit only from 28.0 to 28.5 megahertz, so cannot use the repeater inputs or be the control operator of a 10 meter repeater.' : 'A General class licensee or higher may transmit across the whole band, so may use the repeater inputs and be control operator of a 10 meter repeater.'}`}
        caption="Simplified from 47 CFR 97.205(b), 97.301 and the ARRL band plan. The plan is voluntary; local plans differ.">
        <T x={X0} y={12} size={13} bold color={C.bad}>FCC rule: where may a repeater work?</T>
        <rect x={X(28.0)} y={26} width={X(29.5) - X(28.0)} height={26} fill={C.bad} fillOpacity={0.28} stroke={C.bad} strokeWidth={2} />
        <T x={(X(28.0) + X(29.5)) / 2} y={39} anchor="middle" size={12.5} bold>no repeaters (HF rule)</T>
        <rect x={X(29.5)} y={26} width={X(29.7) - X(29.5)} height={26} fill={C.good} fillOpacity={0.3} stroke={C.good} strokeWidth={2} />

        <T x={X0} y={72} size={13} bold color={C.signal}>ARRL band plan (voluntary)</T>
        {PLAN.map((r) => (
          <g key={r.a}>
            <rect x={X(r.a)} y={86} width={Math.max(2, X(r.b) - X(r.a))} height={26} fill={r.color} fillOpacity={r.fill ?? 0.45} stroke={r.color} strokeWidth={2} />
            {r.label && <T x={(X(r.a) + X(r.b)) / 2} y={99} anchor="middle" size={12.5} bold>{r.label}</T>}
          </g>
        ))}

        <T x={X0} y={132} size={13} bold color={C.good}>{cls === 'tech' ? 'Technician may transmit' : 'General or higher may transmit'}</T>
        <rect x={X(28.0)} y={146} width={X(privHi) - X(28.0)} height={22} rx={3} fill={C.good} fillOpacity={0.3} stroke={C.good} strokeWidth={2} />
        <T x={X(28.0) + 8} y={157} size={12.5} bold>{cls === 'tech' ? '28.0 to 28.5 MHz' : 'all of 10 m'}</T>

        {ticks.map((f) => (
          <g key={f}>
            <Ln x1={X(f)} y1={172} x2={X(f)} y2={178} color={C.muted} width={1.5} />
            <T x={X(f)} y={190} anchor={f === HI ? 'end' : 'middle'} size={12.5} color={C.muted}>{f.toFixed(1)}</T>
          </g>
        ))}

        <rect x={X(29.5)} y={200} width={X(29.7) - X(29.5)} height={5} fill={C.power} />
        <T x={X0} y={218} size={13} bold color={C.power}>Zoom on the highlighted top 200 kHz</T>
        <rect x={X0} y={230} width={X1 - X0} height={5} fill={C.power} />

        <T x={(Z(29.555) + Z(29.655)) / 2} y={248} anchor="middle" size={12.5} bold color={C.power}>blocks about 100 kHz apart</T>
        <Ln x1={Z(29.555)} y1={262} x2={Z(29.655)} y2={262} color={C.power} width={2} arrow />

        <rect x={Z(29.52)} y={272} width={Z(29.59) - Z(29.52)} height={34} fill={C.resist} fillOpacity={0.45} stroke={C.resist} strokeWidth={2} />
        <T x={(Z(29.52) + Z(29.59)) / 2} y={289} anchor="middle" size={13} bold>repeater inputs</T>
        <rect x={Z(29.61)} y={272} width={Z(29.7) - Z(29.61)} height={34} fill={C.signal} fillOpacity={0.45} stroke={C.signal} strokeWidth={2} />
        <T x={(Z(29.61) + Z(29.7)) / 2} y={289} anchor="middle" size={13} bold>repeater outputs</T>
        <Ln x1={Z(29.6)} y1={268} x2={Z(29.6)} y2={310} color={C.ink} width={2} />
        <T x={Z(29.6)} y={326} anchor="middle" size={12.5} bold>29.60 FM simplex</T>

        {zticks.map((f) => (
          <g key={f}>
            <Ln x1={Z(f)} y1={310} x2={Z(f)} y2={316} color={C.muted} width={1.5} />
            {f !== 29.6 && <T x={Z(f)} y={326} anchor={f === Z0 ? 'start' : f === Z1 ? 'end' : 'middle'} size={12.5} color={C.muted}>{f.toFixed(2)}</T>}
          </g>
        ))}
        <T x={X1} y={344} anchor="end" size={12.5} color={C.muted}>MHz</T>

        <rect x={X0} y={356} width={X1 - X0} height={38} rx={8}
          fill={canInputs ? C.good : C.bad} fillOpacity={0.16} stroke={canInputs ? C.good : C.bad} strokeWidth={2} />
        <T x={X0 + 12} y={375} size={13.5} bold color={canInputs ? C.good : C.bad}>
          {canInputs ? 'May transmit on the inputs and be the repeater\'s control operator' : 'Cannot transmit on the inputs or be the repeater\'s control operator'}
        </T>
      </Diagram>
      <Controls>
        <Choice label="License class" value={cls} onChange={setCls}
          options={[{ value: 'tech', label: 'Technician' }, { value: 'general', label: 'General or higher' }]} />
        <Readout label="Your 10 m privileges" value={cls === 'tech' ? '28.0 to 28.5' : '28.0 to 29.7'} unit=" MHz" color={C.good} />
      </Controls>
    </>
  )
}
