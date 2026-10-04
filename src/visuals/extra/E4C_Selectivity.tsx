import { useState } from 'react'
import { C, Choice, Controls, Diagram, Ln, Readout, Slider, T } from '../kit'

const DES = 0, INT = 450
const spike = (x: number, h: number, col: string, base: number) => <path d={`M${x - 7},${base} L${x},${base - h} L${x + 7},${base}`} fill={col} fillOpacity={0.3} stroke={col} strokeWidth={3} strokeLinejoin="round" />
/** Pick a bandwidth to match the signal; IF shift slides the passband away from an adjacent station. */
export function Selectivity() {
  const [w, setW] = useState(500)
  const [s, setS] = useState(0)
  const x0 = 40, x1 = 600, base = 168
  const X = (hz: number) => 320 + (hz / 1000) * ((x1 - x0) / 2 - 20) * 1
  const lo = s - w / 2, hi = s + w / 2
  const desOk = lo <= DES - 100 && hi >= DES + 100
  const intIn = lo <= INT && INT <= hi
  const xl = Math.max(x0, X(lo)), xr = Math.min(x1, X(hi))
  const status = !desOk ? 'desired signal cut off' : intIn ? 'interference passes' : 'interference rejected'
  const col = desOk && !intIn ? C.good : C.bad
  return (
    <>
      <Diagram w={640} h={236} title={`A ${w} hertz receiver passband shifted ${s} hertz. Desired signal ${desOk ? 'inside' : 'outside'} the passband, strong adjacent signal ${intIn ? 'inside' : 'outside'} it.`}
        caption="Match bandwidth to the signal. Use IF shift to slide the passband away from a nearby station.">
        <rect x={xl} y={30} width={Math.max(0, xr - xl)} height={base - 30} rx={6} fill={C.power} fillOpacity={0.14} stroke={C.power} strokeWidth={2} strokeDasharray="6 4" />
        <T x={Math.max(70, Math.min(570, (xl + xr) / 2))} y={16} anchor="middle" size={13} bold color={C.power}>passband {lab(w)}</T>
        <Ln x1={x0} y1={base} x2={x1} y2={base} color={C.ink} width={2} />
        {spike(X(DES), 54, C.signal, base)}
        {spike(X(INT), 108, C.bad, base)}
        <T x={X(DES)} y={base + 18} anchor="middle" size={13} bold color={C.signal}>wanted</T>
        <T x={X(INT)} y={base + 18} anchor="middle" size={13} bold color={C.bad}>strong neighbor</T>
        <T x={320} y={216} anchor="middle" bold size={15} color={col}>{status}</T>
      </Diagram>
      <Controls>
        <div>
          <span className="ctl-label" style={{ display: 'block', marginBottom: 6 }}>Receiver bandwidth</span>
          <Choice label="Bandwidth" value={w} onChange={setW} options={[{ value: 2400, label: '2.4 kHz (SSB)' }, { value: 500, label: '500 Hz' }, { value: 250, label: '250 Hz' }]} />
        </div>
        <Slider label="IF shift" value={s} min={-300} max={300} step={10} onChange={setS} format={(v) => (v === 0 ? 'centred' : `${v > 0 ? '+' : ''}${v} Hz`)} color="var(--d-power)" />
        <Readout label="Result" value={status} color={col} />
      </Controls>
    </>
  )
}
const lab = (b: number) => (b >= 1000 ? `${b / 1000} kHz` : `${b} Hz`)
