import { useState } from 'react'
import { C, Choice, Controls, Diagram, Ln, Readout, Slider, T } from '../kit'

const BWS = [50, 500, 1000, 2400, 6000]
const lab = (b: number) => (b >= 1000 ? `${b / 1000} kHz` : `${b} Hz`)
/** Noise floor = -174 dBm/Hz + 10 log(bandwidth) + noise figure. */
export function NoiseFloor() {
  const [bw, setBw] = useState(1000)
  const [nf, setNf] = useState(0)
  const bwdb = 10 * Math.log10(bw)
  const floor = -174 + bwdb + nf
  const lo = -180, hi = -100, y0 = 214, y1 = 26
  const Y = (d: number) => y0 - ((d - lo) / (hi - lo)) * (y0 - y1)
  const seg = (a: number, b: number, col: string, x: number) => <rect x={x} y={Y(b)} width={64} height={Math.max(0, Y(a) - Y(b))} fill={col} opacity={0.9} />
  const r = (n: number) => Math.round(n * 10) / 10
  const m = (n: number) => (n < 0 ? '−' : '') + Math.abs(n)
  return (
    <>
      <Diagram w={640} h={250} title={`Receiver noise floor: minus 174 dBm in 1 hertz, plus ${r(bwdb)} dB for a ${lab(bw)} bandwidth, plus ${nf} dB noise figure, equals ${r(floor)} dBm.`}
        caption="Every 10× more bandwidth raises the floor 10 dB. Wide filters hear more noise.">
        {[-170, -150, -130, -110].map((d) => (
          <g key={d}><Ln x1={50} y1={Y(d)} x2={330} y2={Y(d)} color={C.fill2} width={1} /><T x={44} y={Y(d)} anchor="end" size={12} mono color={C.muted}>{m(d)}</T></g>
        ))}
        <T x={44} y={12} anchor="end" size={12} color={C.muted}>dBm</T>
        {seg(lo, -174, C.muted, 80)}
        {seg(-174, -174 + bwdb, C.signal, 80)}
        {seg(-174 + bwdb, floor, C.resist, 80)}
        <Ln x1={80} y1={Y(floor)} x2={330} y2={Y(floor)} color={C.bad} width={3} dash="6 4" />
        <T x={330} y={Y(floor) - 12} anchor="end" bold size={14} mono color={C.bad}>{m(r(floor))} dBm</T>
        <T x={160} y={Y(-174) + 14} size={13} bold color={C.muted}>−174 dBm in 1 Hz</T>
        <T x={160} y={(Y(-174) + Y(-174 + bwdb)) / 2 + (bwdb < 10 ? 18 : 0)} size={13} bold color={C.signal}>+ {r(bwdb)} dB bandwidth</T>
        {nf > 0 && <T x={160} y={(Y(-174 + bwdb) + Y(floor)) / 2} size={13} bold color={C.resist}>+ {nf} dB noise figure</T>}
        <rect x={364} y={26} width={262} height={188} rx={12} fill={C.fill} />
        <T x={382} y={50} size={13} color={C.muted}>perfect receiver, 1 Hz</T>
        <T x={608} y={50} anchor="end" bold size={14} mono>−174</T>
        <T x={382} y={80} size={13} color={C.muted}>10 log({bw})</T>
        <T x={608} y={80} anchor="end" bold size={14} mono color={C.signal}>+ {r(bwdb)}</T>
        <T x={382} y={110} size={13} color={C.muted}>noise figure</T>
        <T x={608} y={110} anchor="end" bold size={14} mono color={C.resist}>+ {nf}</T>
        <Ln x1={382} y1={130} x2={608} y2={130} color={C.muted} width={1.5} />
        <T x={382} y={156} size={13} color={C.muted}>noise floor</T>
        <T x={608} y={156} anchor="end" bold size={20} mono color={C.bad}>{m(r(floor))} dBm</T>
        <T x={382} y={190} size={12} color={C.muted}>50 Hz → 1 kHz: 10 log(1000÷50) = 13 dB</T>
      </Diagram>
      <Controls>
        <div>
          <span className="ctl-label" style={{ display: 'block', marginBottom: 6 }}>Receiver bandwidth</span>
          <Choice label="Bandwidth" value={bw} onChange={setBw} options={BWS.map((b) => ({ value: b, label: lab(b) }))} />
        </div>
        <Slider label="Noise figure" value={nf} min={0} max={20} onChange={setNf} format={(v) => `${v} dB`} color="var(--d-resist)" />
        <Readout label="Noise floor" value={m(r(floor))} unit=" dBm" color="var(--d-bad)" />
      </Controls>
    </>
  )
}
