import { useState } from 'react'
import { C, Choice, Controls, Diagram, Ln, Slider, T, fmt } from '../kit'

interface S { p: number; feed: number; dup: number; circ: number; gain: number; ref: 'dBd' | 'dBi' }
const PRESETS: Record<string, S> = {
  a: { p: 150, feed: 2, dup: 2.2, circ: 0, gain: 7, ref: 'dBd' },
  b: { p: 200, feed: 4, dup: 3.2, circ: 0.8, gain: 10, ref: 'dBd' },
  c: { p: 200, feed: 2, dup: 2.8, circ: 1.2, gain: 7, ref: 'dBi' },
}
const sg = (n: number) => (n > 0 ? '+' : n < 0 ? '−' : '') + fmt(Math.abs(n))

/** ERP / EIRP: add up every dB (gains +, losses −), convert once to a power ratio. */
export function E9A_ErpCalc() {
  const [s, setS] = useState<S>(PRESETS.a)
  const [pre, setPre] = useState('a')
  const set = (k: keyof S, v: number | string) => { setPre(''); setS({ ...s, [k]: v } as S) }
  const loss = s.feed + s.dup + s.circ
  const net = s.gain - loss
  const out = s.p * 10 ** (net / 10)
  const name = s.ref === 'dBd' ? 'ERP' : 'EIRP'
  const items = [
    { n: 'Feed line', v: -s.feed }, { n: 'Duplexer', v: -s.dup }, { n: 'Circulator', v: -s.circ }, { n: 'Antenna', v: s.gain },
  ]
  const bx = (i: number) => 140 + i * 100
  return (
    <>
      <Diagram w={640} h={250} title={`${name} calculation. ${s.p} watts, minus ${fmt(loss)} dB of losses, plus ${s.gain} ${s.ref} antenna gain, is a net ${sg(net)} dB, giving ${fmt(out, 3)} watts ${name}.`}
        caption="Add every gain and loss in dB first. Convert to watts once, at the end.">
        <rect x={10} y={56} width={104} height={74} rx={10} fill={C.fill} stroke={C.power} strokeWidth={2} />
        <T x={62} y={78} anchor="middle" size={12} color={C.muted}>transmitter</T>
        <T x={62} y={106} anchor="middle" size={20} bold color={C.power}>{s.p} W</T>
        {items.map((it, i) => {
          const col = it.v > 0 ? C.good : it.v < 0 ? C.bad : C.muted
          return (
            <g key={it.n}>
              <Ln x1={i === 0 ? 114 : bx(i - 1) + 88} y1={93} x2={bx(i)} y2={93} color={C.muted} width={2} arrow />
              <rect x={bx(i)} y={56} width={88} height={74} rx={10} fill={C.fill} stroke={col} strokeWidth={2} />
              <T x={bx(i) + 44} y={78} anchor="middle" size={12} color={C.muted}>{it.n}</T>
              <T x={bx(i) + 44} y={106} anchor="middle" size={18} bold color={col}>{sg(it.v)} dB</T>
            </g>
          )
        })}
        <Ln x1={bx(3) + 88} y1={93} x2={bx(3) + 108} y2={93} color={C.muted} width={2} arrow />
        <T x={bx(3) + 114} y={72} size={12} color={C.muted}>{name}</T>
        <T x={bx(3) + 114} y={96} size={20} bold color={C.power}>{fmt(out, 3)}</T>
        <T x={bx(3) + 114} y={118} size={13} color={C.muted}>watts</T>
        <rect x={10} y={156} width={620} height={80} rx={12} fill={C.fill} />
        <T x={26} y={176} size={14} color={C.ink}>Net dB = {fmt(s.gain)} {s.ref} gain − {fmt(loss)} dB loss = <tspan fontWeight={700} fill={net >= 0 ? 'var(--d-good)' : 'var(--d-bad)'}>{sg(net)} dB</tspan></T>
        <T x={26} y={200} size={14} color={C.ink}>Power = {s.p} W × 10^({sg(net)}/10) = {s.p} × {fmt(10 ** (net / 10), 4)} = <tspan fontWeight={700} fill="var(--d-power)">{fmt(out, 3)} W {name}</tspan></T>
        <T x={26} y={222} size={12} color={C.muted}>{s.ref === 'dBd' ? 'Gain over a dipole (dBd): the answer is ERP.' : 'Gain over isotropic (dBi): the answer is EIRP.'}</T>
        <T x={320} y={26} anchor="middle" size={14} bold color={C.muted}>Transmitter to antenna</T>
      </Diagram>
      <Controls>
        <div>
          <span className="ctl-label" style={{ display: 'block', marginBottom: 6 }}>Example</span>
          <Choice label="Example" value={pre} onChange={(v) => { if (v) { setPre(v); setS(PRESETS[v]) } }}
            options={[{ value: 'a', label: '150 W ERP' }, { value: 'b', label: '200 W ERP' }, { value: 'c', label: '200 W EIRP' }]} />
        </div>
        <div>
          <span className="ctl-label" style={{ display: 'block', marginBottom: 6 }}>Gain reference</span>
          <Choice label="Gain reference" value={s.ref} onChange={(v) => set('ref', v)} options={[{ value: 'dBd', label: 'dBd (ERP)' }, { value: 'dBi', label: 'dBi (EIRP)' }]} />
        </div>
        <Slider label="Transmitter power" value={s.p} min={10} max={300} step={10} onChange={(v) => set('p', v)} format={(v) => `${v} W`} color="var(--d-power)" />
        <Slider label="Feed line loss" value={s.feed} min={0} max={6} step={0.1} onChange={(v) => set('feed', v)} format={(v) => `${v.toFixed(1)} dB`} color="var(--d-bad)" />
        <Slider label="Duplexer loss" value={s.dup} min={0} max={6} step={0.1} onChange={(v) => set('dup', v)} format={(v) => `${v.toFixed(1)} dB`} color="var(--d-bad)" />
        <Slider label="Circulator loss" value={s.circ} min={0} max={3} step={0.1} onChange={(v) => set('circ', v)} format={(v) => `${v.toFixed(1)} dB`} color="var(--d-bad)" />
        <Slider label="Antenna gain" value={s.gain} min={0} max={12} step={0.5} onChange={(v) => set('gain', v)} format={(v) => `${v} ${s.ref}`} color="var(--d-good)" />
      </Controls>
    </>
  )
}
