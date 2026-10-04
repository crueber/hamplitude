import { useState } from 'react'
import { C, Choice, Diagram, Ln, T } from '../kit'

type Item = { label: string; db: number }
const SC = {
  rx: { name: 'Received level', items: [{ label: 'TX power', db: 40 }, { label: 'TX antenna', db: 6 }, { label: 'RX antenna', db: 3 }, { label: 'Path loss', db: -100 }] as Item[], need: null as null | number },
  margin: { name: 'Link margin', items: [{ label: 'TX power', db: 40 }, { label: 'Antenna gain', db: 10 }, { label: 'Cable loss', db: -3 }, { label: 'Path loss', db: -136 }] as Item[], need: -97 },
}
const m = (n: number) => (n < 0 ? '−' : n > 0 ? '+' : '') + Math.abs(n)
/** Link budget in dB: add gains, subtract losses, compare with what the receiver needs. */
export function LinkBudget() {
  const [k, setK] = useState<'rx' | 'margin'>('rx')
  const { items, need } = SC[k]
  const lo = -120, hi = 60, y0 = 210, y1 = 20
  const Y = (d: number) => y0 - ((d - lo) / (hi - lo)) * (y0 - y1)
  const n = items.length + 2
  const step = 600 / n, bw = Math.min(64, step - 20)
  let lvl = 0
  const cols = items.map((it, i) => { const a = i === 0 ? lo : lvl; lvl = i === 0 ? it.db : lvl + it.db; return { ...it, from: a, to: lvl } })
  const rxl = lvl
  const cx = (i: number) => 20 + step * i + step / 2
  return (
    <>
      <Diagram w={640} h={296} title={`Link budget: ${items.map((i) => `${i.label} ${m(i.db)} dB`).join(', ')} gives a received level of ${m(rxl)} dBm.${need !== null ? ` The receiver needs ${need} dBm, so the margin is ${m(rxl - need)} dB.` : ''}`}
        caption="Gains add, losses subtract. Start at the transmitter's dBm, end at the level reaching the receiver.">
        <Ln x1={20} y1={Y(0)} x2={620} y2={Y(0)} color={C.fill2} width={1} />
        {cols.map((c, i) => {
          const top = Math.max(c.from, c.to), bot = Math.min(c.from, c.to)
          const col = i === 0 ? C.power : c.db >= 0 ? C.good : C.bad
          return (
            <g key={i}>
              <rect x={cx(i) - bw / 2} y={Y(top)} width={bw} height={Y(bot) - Y(top)} fill={col} opacity={0.88} rx={3} />
              <T x={cx(i)} y={Y(top) - 12} anchor="middle" size={13} bold mono color={col}>{i === 0 ? `${m(c.db)} dBm` : `${m(c.db)} dB`}</T>
              <T x={cx(i)} y={y0 + 16} anchor="middle" size={12} bold>{c.label}</T>
              {i > 0 && <Ln x1={cx(i - 1) + bw / 2} y1={Y(c.from)} x2={cx(i) - bw / 2} y2={Y(c.from)} color={C.muted} width={1.5} dash="3 3" />}
            </g>
          )
        })}
        <rect x={cx(items.length) - bw / 2} y={Y(Math.max(rxl, lo))} width={bw} height={Math.max(2, y0 - Y(rxl))} fill={C.signal} opacity={0.88} rx={3} />
        <T x={cx(items.length)} y={Y(rxl) - 12} anchor="middle" size={13} bold mono color={C.signal}>{m(rxl)} dBm</T>
        <T x={cx(items.length)} y={y0 + 16} anchor="middle" size={12} bold>Received</T>
        {need !== null && (
          <g>
            <Ln x1={cx(items.length) - bw / 2 - 6} y1={Y(need)} x2={cx(items.length) + bw / 2 + 28} y2={Y(need)} color={C.resist} width={3} dash="5 4" />
            <T x={cx(items.length) + bw / 2 + 32} y={Y(need)} size={12} bold mono color={C.resist}>need {m(need)}</T>
            <T x={cx(items.length)} y={y0 + 34} anchor="middle" size={12} color={C.muted}>MDS −103 + 6 dB S/N</T>
          </g>
        )}
        <T x={320} y={274} anchor="middle" size={15} bold mono>
          {need === null
            ? `${items.map((i) => m(i.db)).join(' ')} = ${m(rxl)} dBm`
            : <>{`${m(rxl)} − (${need}) = `}<tspan fill={C.good}>{m(rxl - need)} dB margin</tspan></>}
        </T>
      </Diagram>
      <div style={{ margin: '-6px 0 14px' }}>
        <Choice label="Example" value={k} onChange={setK} options={[{ value: 'rx', label: 'Received level' }, { value: 'margin', label: 'Link margin' }]} />
      </div>
    </>
  )
}
