import { useState } from 'react'
import { C, Choice, Controls, Diagram, Ln, Readout, Slider, T } from '../kit'

type BandId = '6m' | '2m' | '1.25m'
type Seg = [number, number]
type OutSeg = [number, number, number] // output low, output high, input minus output (MHz)

interface BandDef {
  label: string
  lo: number
  hi: number
  step: number
  start: number
  excluded: Seg[]
  inputs: Seg[]
  outputs: OutSeg[]
  note: string
}

// Frequencies from the ARRL band plan (arrl.org/band-plan); excluded segments from 47 CFR 97.205(b).
const BANDS: Record<BandId, BandDef> = {
  '6m': {
    label: '6 m', lo: 50, hi: 54, step: 0.01, start: 52.64,
    excluded: [[50.0, 51.0]],
    inputs: [[51.12, 51.48], [52.0, 52.48], [53.0, 53.48]],
    outputs: [[51.62, 51.98, -0.5], [52.5, 52.98, -0.5], [53.5, 53.98, -0.5]],
    note: 'Plan blocks are 500 kHz apart; 1 MHz and other splits are common locally.',
  },
  '2m': {
    label: '2 m', lo: 144, hi: 148, step: 0.01, start: 146.94,
    excluded: [[144.0, 144.5], [145.5, 146.0]],
    inputs: [[144.6, 144.9], [146.01, 146.37], [147.6, 147.99]],
    outputs: [[145.2, 145.5, -0.6], [146.61, 146.97, -0.6], [147.0, 147.39, 0.6]],
    note: 'Minus offset low in the band, plus offset from about 147 MHz.',
  },
  '1.25m': {
    label: '1.25 m', lo: 222, hi: 225, step: 0.025, start: 224.0,
    excluded: [[222.0, 222.15]],
    inputs: [[222.25, 223.38]],
    outputs: [[223.85, 224.98, -1.6]],
    note: 'One wide block of inputs and one of outputs, 1.6 MHz apart.',
  },
}

const EPS = 1e-6

function offsetText(o: number): string {
  const a = Math.abs(o)
  const sign = o < 0 ? '−' : '+'
  return a < 1 ? `${sign}${Math.round(a * 1000)} kHz` : `${sign}${a} MHz`
}

/** The repeater sub-bands of 6 m, 2 m and 1.25 m, to scale as the ARRL band plan lays them out. Slide an output to see its input. */
export function VhfRepeaters_Pairs() {
  const [band, setBand] = useState<BandId>('2m')
  const [value, setValue] = useState(BANDS['2m'].start)
  const b = BANDS[band]
  const v = Math.min(b.hi, Math.max(b.lo, value))

  const x0 = 30, x1 = 610
  const X = (f: number) => x0 + ((f - b.lo) / (b.hi - b.lo)) * (x1 - x0)
  const stripY = 108, stripH = 36, midY = stripY + stripH / 2

  const seg = b.outputs.find(([lo, hi]) => v >= lo - EPS && v <= hi + EPS)
  const inp = seg ? v + seg[2] : null
  const ticks: number[] = []
  for (let f = Math.ceil(b.lo); f <= b.hi; f += 1) ticks.push(f)

  const fmtF = (f: number) => f.toFixed(3)

  const pick = (id: BandId) => { setBand(id); setValue(BANDS[id].start) }

  // legend
  const leg: [string, string, number][] = [
    [C.resist, 'Repeater input', 14],
    [C.signal, 'Repeater output', 150],
    [C.bad, 'No repeaters (97.205)', 296],
    [C.muted, 'Other uses', 480],
  ]

  return (
    <>
      <Diagram w={640} h={246}
        title={`The ${b.label} band to scale. Repeater input blocks, repeater output blocks and the segments where repeaters are not allowed, as laid out in the ARRL band plan. ${seg ? `A repeater output at ${fmtF(v)} MHz pairs with an input at ${fmtF(inp as number)} MHz, an offset of ${offsetText(seg[2])}.` : `${fmtF(v)} MHz is not inside one of the plan's repeater output blocks.`}`}
        caption={`${b.note} Coordinators decide the actual pairs; check the current band plan.`}>
        {leg.map(([c, t, x]) => (
          <g key={t}>
            <rect x={x} y={8} width={14} height={14} rx={3} fill={c} fillOpacity={c === C.muted ? 0.3 : 0.5} stroke={c} strokeWidth={1.5} />
            <T x={x + 20} y={20} size={12.5} color={C.muted}>{t}</T>
          </g>
        ))}

        <rect x={x0} y={stripY} width={x1 - x0} height={stripH} rx={4} fill={C.muted} fillOpacity={0.14} stroke={C.muted} strokeWidth={1.5} />
        {b.excluded.map(([a, z]) => (
          <rect key={`e${a}`} x={X(a)} y={stripY} width={X(z) - X(a)} height={stripH} fill={C.bad} fillOpacity={0.3} stroke={C.bad} strokeWidth={1.5} />
        ))}
        {b.inputs.map(([a, z]) => (
          <rect key={`i${a}`} x={X(a)} y={stripY} width={Math.max(2, X(z) - X(a))} height={stripH} fill={C.resist} fillOpacity={0.5} stroke={C.resist} strokeWidth={1.5} />
        ))}
        {b.outputs.map(([a, z]) => (
          <rect key={`o${a}`} x={X(a)} y={stripY} width={Math.max(2, X(z) - X(a))} height={stripH} fill={C.signal} fillOpacity={0.5} stroke={C.signal} strokeWidth={1.5} />
        ))}

        {ticks.map((f) => (
          <g key={f}>
            <Ln x1={X(f)} y1={stripY + stripH} x2={X(f)} y2={stripY + stripH + 7} color={C.muted} width={1.5} />
            <T x={X(f)} y={226} anchor={f === ticks[0] ? 'start' : 'middle'} size={12.5} color={C.muted}>{f === ticks[0] ? `${f} MHz` : f}</T>
          </g>
        ))}

        {/* output marker, above */}
        <Ln x1={X(v)} y1={72} x2={X(v)} y2={midY - 7} color={C.signal} width={2} />
        <T x={Math.min(Math.max(X(v), 70), 570)} y={46} anchor="middle" size={12.5} bold color={C.signal}>{seg ? 'output' : 'not an output'}</T>
        <T x={Math.min(Math.max(X(v), 70), 570)} y={62} anchor="middle" size={13.5} bold mono color={C.signal}>{fmtF(v)}</T>
        <circle cx={X(v)} cy={midY} r={7} fill={C.signal} stroke={C.bg} strokeWidth={2.5} />

        {seg && inp !== null && (
          <g>
            <Ln x1={X(v)} y1={98} x2={X(inp)} y2={98} color={C.power} width={2.5} arrow />
            <T x={X(v) + (inp < v ? -8 : 8)} y={86} anchor={inp < v ? 'end' : 'start'} size={13} bold color={C.power}>{offsetText(seg[2])}</T>
            <Ln x1={X(inp)} y1={midY + 7} x2={X(inp)} y2={172} color={C.resist} width={2} />
            <circle cx={X(inp)} cy={midY} r={7} fill={C.resist} stroke={C.bg} strokeWidth={2.5} />
            <T x={X(inp)} y={188} anchor="middle" size={12.5} bold color={C.resist}>input</T>
            <T x={X(inp)} y={204} anchor="middle" size={13.5} bold mono color={C.resist}>{fmtF(inp)}</T>
          </g>
        )}
      </Diagram>
      <Controls>
        <Choice label="Band" value={band} onChange={pick}
          options={[{ value: '6m', label: '6 m' }, { value: '2m', label: '2 m' }, { value: '1.25m', label: '1.25 m' }]} />
        <Slider label="Repeater output frequency" value={v} min={b.lo} max={b.hi} step={b.step} onChange={setValue}
          format={(n) => `${n.toFixed(3)} MHz`} color={C.signal} />
        <Readout label="Offset" value={seg ? offsetText(seg[2]) : 'none'} color={C.power} />
      </Controls>
    </>
  )
}
