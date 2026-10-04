import { useState } from 'react'
import { C, Choice, Controls, Diagram, Ln, Slider, T } from '../kit'

const PREFIXES = [
  { s: 'p', name: 'pico', exp: -12 },
  { s: 'n', name: 'nano', exp: -9 },
  { s: 'µ', name: 'micro', exp: -6 },
  { s: 'm', name: 'milli', exp: -3 },
  { s: '', name: 'base', exp: 0 },
  { s: 'k', name: 'kilo', exp: 3 },
  { s: 'M', name: 'mega', exp: 6 },
  { s: 'G', name: 'giga', exp: 9 },
]
const SUP: Record<string, string> = { '-': '⁻', '0': '⁰', '1': '¹', '2': '²', '3': '³', '4': '⁴', '5': '⁵', '6': '⁶', '7': '⁷', '8': '⁸', '9': '⁹' }
const pow10 = (e: number) => '10' + String(e).replace(/./g, (c) => SUP[c])

/** Move the decimal point of a plain decimal string by `places` (positive = right). Exact, no float error. */
export function shiftDecimal(str: string, places: number): string {
  const [ip = '', fp = ''] = str.split('.')
  const digits = ip + fp
  const point = ip.length + places
  let i: string, f: string
  if (point <= 0) { i = '0'; f = '0'.repeat(-point) + digits }
  else if (point >= digits.length) { i = digits + '0'.repeat(point - digits.length); f = '' }
  else { i = digits.slice(0, point); f = digits.slice(point) }
  i = i.replace(/^0+(?=\d)/, '')
  f = f.replace(/0+$/, '')
  return f ? `${i}.${f}` : i
}

const group = (s: string) => {
  const [i, f] = s.split('.')
  return (i.length > 4 ? i.replace(/\B(?=(\d{3})+(?!\d))/g, ',') : i) + (f ? '.' + f : '')
}

/** Pick a value, a unit and two prefixes; watch the decimal point move three places per rung. */
export function MetricLadder() {
  const [value, setValue] = useState('1.5')
  const [unit, setUnit] = useState('A')
  const [from, setFrom] = useState(4)
  const [to, setTo] = useState(3)
  const valid = /^\d+\.?\d*$|^\.\d+$/.test(value) && value.length <= 12
  const steps = to - from
  const places = -3 * steps
  const clean = valid ? value.replace(/^0+(?=\d)/, '').replace(/^\./, '0.') : ''
  const out = valid ? shiftDecimal(clean, places) : '—'
  const sym = (i: number) => PREFIXES[i].s + unit
  const bw = 68, step = 80, x0 = 6, by = 18, bh = 74
  const cx = (i: number) => x0 + i * step + bw / 2
  const dir = steps === 0 ? 'same unit: nothing changes' : steps < 0 ? `${sym(to)} is smaller, so you need more of them` : `${sym(to)} is bigger, so you need fewer of them`
  const move = steps === 0 ? 'decimal point stays put' : `decimal point moves ${Math.abs(places)} places ${places > 0 ? 'right' : 'left'}`
  return (
    <>
      <Diagram w={640} h={268}
        title={`Metric ladder. ${value || '0'} ${sym(from)} equals ${out} ${sym(to)}. Each rung is a factor of 1000.`}
        caption="Each rung is 1000 times the one to its left.">
        {PREFIXES.map((p, i) => {
          const isFrom = i === from, isTo = i === to
          return (
            <g key={p.name}>
              <rect x={x0 + i * step} y={by} width={bw} height={bh} rx={10} fill={isTo ? C.signal : C.fill} stroke={isTo || isFrom ? (isTo ? C.signal : C.ink) : C.fill2} strokeWidth={isFrom || isTo ? 3 : 2} opacity={isFrom || isTo ? 1 : 0.8} />
              <T x={cx(i)} y={by + 22} anchor="middle" bold size={20} color={isTo ? C.bg : C.ink}>{sym(i)}</T>
              <T x={cx(i)} y={by + 45} anchor="middle" size={12} color={isTo ? C.bg : C.muted}>{p.name === 'base' ? 'one' : p.name}</T>
              <T x={cx(i)} y={by + 62} anchor="middle" size={12} mono color={isTo ? C.bg : C.muted}>{p.exp === 0 ? '1' : pow10(p.exp)}</T>
              {isFrom && <T x={cx(i)} y={by + bh + 14} anchor="middle" size={12} bold>from</T>}
              {isTo && !isFrom && <T x={cx(i)} y={by + bh + 14} anchor="middle" size={12} bold color={C.signal}>to</T>}
            </g>
          )
        })}
        {steps !== 0 && <Ln x1={cx(from)} y1={by + bh + 36} x2={cx(to) + (steps > 0 ? -4 : 4)} y2={by + bh + 36} color={C.signal} width={3} arrow />}
        <T x={320} y={by + bh + 58} anchor="middle" size={13} color={C.muted}>
          {steps === 0 ? 'Pick two different prefixes below' : `${Math.abs(steps)} rung${Math.abs(steps) > 1 ? 's' : ''} ${steps < 0 ? 'left' : 'right'}: ${steps < 0 ? '×' : '÷'} 1000 each rung`}
        </T>
        <rect x={6} y={176} width={628} height={86} rx={12} fill={C.fill} />
        <T x={320} y={204} anchor="middle" bold mono size={valid && out.length + value.length > 22 ? 18 : 24}>
          {valid ? `${group(clean)} ${sym(from)} = ${group(out)} ${sym(to)}` : 'enter a number'}
        </T>
        <T x={320} y={232} anchor="middle" size={14} color={C.signal} bold>{valid ? move : ''}</T>
        <T x={320} y={251} anchor="middle" size={13} color={C.muted}>{valid ? dir : ''}</T>
      </Diagram>
      <Controls>
        <label className="ctl-slider">
          <span className="ctl-top"><span className="ctl-label">Value</span></span>
          <input
            type="text" inputMode="decimal" value={value} aria-label="Value to convert"
            onChange={(e) => setValue(e.target.value.replace(/[^\d.]/g, ''))}
            style={{ width: '100%', padding: '6px 10px', font: '700 16px var(--font-mono)', color: 'var(--ink)', background: 'var(--surface)', border: '1px solid var(--line-strong)', borderRadius: 8 }}
          />
        </label>
        <div>
          <span className="ctl-label" style={{ display: 'block', marginBottom: 6 }}>Unit</span>
          <Choice label="Unit" value={unit} onChange={setUnit} options={['A', 'V', 'W', 'Hz', 'F'].map((u) => ({ value: u, label: u }))} />
        </div>
        <Slider label="From" value={from} min={0} max={7} onChange={setFrom} format={(v) => `${PREFIXES[v].name === 'base' ? 'base unit' : PREFIXES[v].name}`} />
        <Slider label="To" value={to} min={0} max={7} onChange={setTo} format={(v) => `${PREFIXES[v].name === 'base' ? 'base unit' : PREFIXES[v].name}`} color="var(--d-signal)" />
      </Controls>
    </>
  )
}
