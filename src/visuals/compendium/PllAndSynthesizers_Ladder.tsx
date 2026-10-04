import { useState } from 'react'
import { C, Choice, Controls, Diagram, Ln, Readout, Slider, T, Wire, fmt } from '../kit'

const LO = 146500, HI = 146600 // kHz window shown

function Block({ x, y, w, h, label, sub, color = C.ink }: { x: number; y: number; w: number; h: number; label: string; sub?: string; color?: string }) {
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} rx={10} fill={C.fill} stroke={color} strokeWidth={2} />
      <T x={x + w / 2} y={y + h / 2 - (sub ? 8 : 0)} anchor="middle" bold size={13}>{label}</T>
      {sub && <T x={x + w / 2} y={y + h / 2 + 11} anchor="middle" size={12} color={color}>{sub}</T>}
    </g>
  )
}

/** A synthesizer locks its VCO to N times the reference, so the VCO can only sit on rungs spaced by the reference frequency. */
export function PllAndSynthesizers_Ladder() {
  const [ref, setRef] = useState(5)
  const [fk, setFk] = useState(146520)
  const n = Math.round(fk / ref)
  const fout = n * ref
  const clamped = Math.min(HI, Math.max(LO, fout))
  const x0 = 40, x1 = 600
  const gx = (f: number) => x0 + ((f - LO) / (HI - LO)) * (x1 - x0)
  const first = Math.ceil(LO / ref), last = Math.floor(HI / ref)
  const rungs = Array.from({ length: last - first + 1 }, (_, i) => (first + i) * ref)
  const ay = 244
  const mhz = (k: number) => (k / 1000).toFixed(3)

  return (
    <>
      <Diagram w={640} h={292}
        title={`A frequency synthesizer. A ${ref} kilohertz reference is compared with the VCO output divided by N equals ${n}, so the VCO locks at ${mhz(fout)} megahertz. Changing N moves the VCO in steps of ${ref} kilohertz.`}
        caption="The loop forces f(out) ÷ N to equal the reference. So the output can only sit on multiples of the reference.">
        <Block x={16} y={20} w={116} h={46} label="Reference" sub={`${ref} kHz`} color={C.signal} />
        <Block x={168} y={20} w={108} h={46} label="Phase detector" />
        <Block x={312} y={20} w={104} h={46} label="Loop filter" />
        <Block x={452} y={20} w={172} h={46} label="VCO" sub={`${mhz(fout)} MHz`} color={C.power} />
        <Ln x1={132} y1={43} x2={166} y2={43} arrow />
        <Ln x1={276} y1={43} x2={310} y2={43} arrow />
        <Ln x1={416} y1={43} x2={450} y2={43} arrow />
        <Block x={300} y={96} w={150} h={42} label={`÷ N, N = ${n}`} color={C.resist} />
        <Wire pts={[[538, 66], [538, 117]]} />
        <Ln x1={538} y1={117} x2={452} y2={117} arrow />
        <Wire pts={[[300, 117], [222, 117]]} />
        <Ln x1={222} y1={117} x2={222} y2={68} arrow />
        <T x={538 + 10} y={92} size={12} color={C.muted}>output</T>

        <Ln x1={x0} y1={ay} x2={x1} y2={ay} color={C.muted} width={1.5} />
        {rungs.map((f) => (
          <line key={f} x1={gx(f)} y1={ay} x2={gx(f)} y2={ay - 16} stroke={f === fout ? C.power : C.muted} strokeWidth={f === fout ? 0 : 1.5} />
        ))}
        <line x1={gx(clamped)} y1={ay} x2={gx(clamped)} y2={ay - 40} stroke={C.power} strokeWidth={4} strokeLinecap="round" />
        <T x={gx(clamped)} y={ay - 52} anchor="middle" size={13} bold color={C.power}>{`${n} × ${ref} kHz = ${mhz(fout)} MHz`}</T>
        <T x={x0} y={ay + 18} size={12} color={C.muted}>{`${mhz(LO)} MHz`}</T>
        <T x={x1} y={ay + 18} anchor="end" size={12} color={C.muted}>{`${mhz(HI)} MHz`}</T>
        <T x={320} y={ay + 18} anchor="middle" size={12} color={C.muted}>{`VCO can lock only on the rungs: ${ref} kHz apart`}</T>
        <T x={x0} y={164} size={13} bold>Where the VCO can sit</T>
      </Diagram>
      <Controls>
        <Choice label="Reference frequency" value={ref} options={[{ value: 5, label: '5 kHz' }, { value: 12.5, label: '12.5 kHz' }, { value: 25, label: '25 kHz' }]} onChange={(r) => { setRef(r); setFk(fout) }} />
        <Slider label="Tuned frequency" value={clamped} min={LO} max={HI} step={ref} onChange={setFk} format={(v) => `${(v / 1000).toFixed(3)} MHz`} color={C.power} />
        <Readout label="Divide-by" value={fmt(n, 6)} color={C.resist} />
      </Controls>
    </>
  )
}
