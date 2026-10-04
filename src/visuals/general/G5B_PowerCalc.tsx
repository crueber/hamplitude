import { useState } from 'react'
import { C, Choice, Controls, Diagram, Slider, T, fmt, si } from '../kit'

type Mode = 'EI' | 'ER' | 'IR' | 'PR'
const TILES: { m: Mode; f: string }[] = [
  { m: 'EI', f: 'P = E × I' },
  { m: 'ER', f: 'P = E² ÷ R' },
  { m: 'IR', f: 'P = I² × R' },
  { m: 'PR', f: 'E = √(P × R)' },
]

/** Pick the power formula by what you know. */
export function G5B_PowerCalc() {
  const [mode, setMode] = useState<Mode>('ER')
  const [v, setV] = useState({ e: 400, i: 0.2, ma: 7, r: 800, r2: 1250, e2: 12, p: 1200, r3: 50 })
  const set = (k: keyof typeof v) => (x: number) => setV((o) => ({ ...o, [k]: x }))
  let known: [string, string][] = [], work = '', res = '', resCol: string = C.power
  if (mode === 'EI') {
    known = [[`E = ${fmt(v.e2)} V`, C.voltage], [`I = ${fmt(v.i)} A`, C.current]]
    const p = v.e2 * v.i
    work = `P = ${fmt(v.e2)} × ${fmt(v.i)}`; res = si(p, 'W')
  } else if (mode === 'ER') {
    known = [[`E = ${fmt(v.e)} V`, C.voltage], [`R = ${fmt(v.r)} Ω`, C.resist]]
    const p = v.e ** 2 / v.r
    work = `P = ${fmt(v.e)}² ÷ ${fmt(v.r)} = ${fmt(v.e ** 2, 6)} ÷ ${fmt(v.r)}`; res = si(p, 'W')
  } else if (mode === 'IR') {
    const i = v.ma / 1000
    known = [[`I = ${fmt(v.ma)} mA = ${fmt(i)} A`, C.current], [`R = ${fmt(v.r2)} Ω`, C.resist]]
    const p = i * i * v.r2
    work = `P = ${fmt(i)}² × ${fmt(v.r2)} = ${fmt(i * i, 3)} × ${fmt(v.r2)}`; res = si(p, 'W')
  } else {
    known = [[`P = ${fmt(v.p)} W`, C.power], [`R = ${fmt(v.r3)} Ω`, C.resist]]
    const pr = v.p * v.r3
    work = `E = √(${fmt(v.p)} × ${fmt(v.r3)}) = √${fmt(pr, 6)}`; res = `${fmt(Math.sqrt(pr), 3)} V`; resCol = C.voltage
  }
  return (
    <>
      <Diagram w={640} h={236}
        title={`Power formulas by what you know. Current: ${known.map((k) => k[0]).join(' and ')}. ${work} gives ${res}.`}
        caption="Know two things, pick the formula that uses exactly those two.">
        {TILES.map((t, k) => {
          const on = t.m === mode
          return (
            <g key={t.m}>
              <rect x={10 + k * 158} y={14} width={150} height={52} rx={10} fill={on ? C.fill : 'none'} stroke={on ? C.power : C.fill2} strokeWidth={on ? 3 : 2} />
              <T x={85 + k * 158} y={40} anchor="middle" bold mono size={16} color={on ? C.ink : C.muted}>{t.f}</T>
            </g>
          )
        })}
        <rect x={10} y={84} width={620} height={140} rx={14} fill={C.fill} />
        <T x={30} y={108} size={13} color={C.muted}>You know</T>
        <T x={140} y={108} bold size={16} color={known[0][1]}>{known[0][0]}</T>
        <T x={400} y={108} bold size={16} color={known[1][1]}>{known[1][0]}</T>
        <T x={30} y={146} size={15} mono>{work}</T>
        <T x={30} y={190} size={13} color={C.muted}>{mode === 'PR' ? 'Voltage' : 'Power'}</T>
        <T x={140} y={190} bold size={30} color={resCol}>{res}</T>
      </Diagram>
      <Controls>
        <div>
          <span className="ctl-label" style={{ display: 'block', marginBottom: 6 }}>You know</span>
          <Choice label="You know" value={mode} onChange={setMode}
            options={[{ value: 'ER', label: 'E and R' }, { value: 'EI', label: 'E and I' }, { value: 'IR', label: 'I and R' }, { value: 'PR', label: 'P and R' }]} />
        </div>
        {mode === 'ER' && <><Slider label="Voltage (E)" value={v.e} min={10} max={500} step={10} onChange={set('e')} format={(x) => `${x} V`} color="var(--d-voltage)" />
          <Slider label="Resistance (R)" value={v.r} min={50} max={1000} step={10} onChange={set('r')} format={(x) => `${x} Ω`} color="var(--d-resist)" /></>}
        {mode === 'EI' && <><Slider label="Voltage (E)" value={v.e2} min={1} max={24} step={1} onChange={set('e2')} format={(x) => `${x} V`} color="var(--d-voltage)" />
          <Slider label="Current (I)" value={v.i} min={0.1} max={5} step={0.1} onChange={set('i')} format={(x) => `${fmt(x)} A`} color="var(--d-current)" /></>}
        {mode === 'IR' && <><Slider label="Current (I)" value={v.ma} min={1} max={50} step={1} onChange={set('ma')} format={(x) => `${x} mA`} color="var(--d-current)" />
          <Slider label="Resistance (R)" value={v.r2} min={50} max={2000} step={50} onChange={set('r2')} format={(x) => `${x} Ω`} color="var(--d-resist)" /></>}
        {mode === 'PR' && <><Slider label="Power (P)" value={v.p} min={100} max={2000} step={100} onChange={set('p')} format={(x) => `${x} W`} color="var(--d-power)" />
          <Slider label="Resistance (R)" value={v.r3} min={10} max={100} step={5} onChange={set('r3')} format={(x) => `${x} Ω`} color="var(--d-resist)" /></>}
      </Controls>
    </>
  )
}
