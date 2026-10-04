import { useState } from 'react'
import { C, Choice, Controls, Diagram, Ln, Readout, Slider, T, Transformer, fmt } from '../kit'

const ZS = 50 // coax-side (secondary) impedance, ohms
const MATCH = Math.sqrt(600 / ZS)

/** Impedance transformation goes with the SQUARE of the turns ratio. */
export function G5C_ImpedanceRatio() {
  const [n, setN] = useState(MATCH)
  const zp = ZS * n * n
  const px = 52, py = 28, pw = 300, ph = 190
  const X = (v: number) => px + ((v - 1) / 5) * pw
  const Y = (v: number) => py + ph - ((v - 1) / 35) * ph
  const pts = Array.from({ length: 101 }, (_, i) => {
    const v = 1 + (5 * i) / 100
    return `${i ? 'L' : 'M'}${X(v).toFixed(1)},${Y(v * v).toFixed(1)}`
  }).join('')
  const preset = Math.abs(n - MATCH) < 1e-6 ? 'm' : n === 2 ? '2' : n === 3 ? '3' : ''
  return (
    <>
      <Diagram w={640} h={284}
        title={`A turns ratio of ${fmt(n)} to 1 makes a ${ZS} ohm load look like ${fmt(zp)} ohms at the primary, because impedance ratio is the turns ratio squared, ${fmt(n * n)}.`}
        caption="Impedance ratio = turns ratio squared. 600 Ω to 50 Ω needs √12 = 3.46 : 1.">
        <rect x={px} y={py} width={pw} height={ph} fill={C.fill} rx={4} />
        <Ln x1={px} y1={py + ph} x2={px + pw} y2={py + ph} color={C.muted} width={1.5} />
        <Ln x1={px} y1={py} x2={px} y2={py + ph} color={C.muted} width={1.5} />
        {[1, 2, 3, 4, 5, 6].map((v) => <T key={v} x={X(v)} y={py + ph + 16} anchor="middle" size={12} color={C.muted}>{v}</T>)}
        <T x={px + pw / 2} y={py + ph + 36} anchor="middle" size={12} color={C.muted}>turns ratio (n : 1)</T>
        {[1, 12, 36].map((v) => <T key={v} x={px - 12} y={Y(v)} anchor="end" size={12} color={C.muted}>{v}</T>)}
        <T x={px + 6} y={py + 14} size={13} bold color={C.power}>impedance ratio = n²</T>
        <path d={pts} fill="none" stroke={C.power} strokeWidth={4} strokeLinecap="round" />
        <Ln x1={px} y1={Y(n * n)} x2={X(n)} y2={Y(n * n)} color={C.power} width={1.5} dash="4 4" />
        <Ln x1={X(n)} y1={Y(n * n)} x2={X(n)} y2={py + ph} color={C.power} width={1.5} dash="4 4" />
        <circle cx={X(n)} cy={Y(n * n)} r={7} fill={C.power} stroke={C.bg} strokeWidth={3} />
        <g transform="translate(496,76) scale(1.4)"><Transformer x={0} y={0} /></g>
        <T x={496} y={16} anchor="middle" size={13} color={C.muted}>turns {fmt(n)} : 1</T>
        <T x={410} y={76} anchor="middle" bold size={18} color={C.resist}>{fmt(zp, 3)} Ω</T>
        <T x={590} y={76} anchor="middle" bold size={18} color={C.resist}>{ZS} Ω</T>
        <T x={410} y={98} anchor="middle" size={12} color={C.muted}>primary side</T>
        <T x={590} y={98} anchor="middle" size={12} color={C.muted}>secondary side</T>
        <rect x={380} y={134} width={248} height={92} rx={12} fill={C.fill} />
        <T x={504} y={158} anchor="middle" size={14} mono>Z₁ = {ZS} × n²</T>
        <T x={504} y={182} anchor="middle" size={14} mono>= {ZS} × {fmt(n * n, 3)}</T>
        <T x={504} y={206} anchor="middle" size={14} mono bold color={C.resist}>= {fmt(zp, 3)} Ω</T>
      </Diagram>
      <Controls>
        <Slider label="Turns ratio (primary : secondary)" value={n} min={1} max={6} step={0.01} onChange={setN} format={(v) => `${fmt(v, 3)} : 1`} color="var(--d-power)" />
        <div>
          <span className="ctl-label" style={{ display: 'block', marginBottom: 6 }}>Presets</span>
          <Choice label="Preset" value={preset} onChange={(v) => setN(v === 'm' ? MATCH : Number(v))}
            options={[{ value: '2', label: '2 : 1' }, { value: '3', label: '3 : 1' }, { value: 'm', label: '600 Ω → 50 Ω' }]} />
        </div>
        <Readout label="Impedance ratio (n²)" value={fmt(n * n, 3)} unit="× " color="var(--d-power)" />
      </Controls>
    </>
  )
}
