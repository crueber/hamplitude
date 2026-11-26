import { useState } from 'react'
import { C, Choice, Diagram, T } from '../kit'

// Exchange format and station letters as described in recent WFDA rules. N0CALL is a placeholder.
type Where = 'H' | 'I' | 'O' | 'M'
const WHERE: Record<Where, { name: string; gloss: string }> = {
  H: { name: 'Home', gloss: 'inside the home you live in' },
  I: { name: 'Indoor', gloss: 'club shack, cabin or church' },
  O: { name: 'Outdoor', gloss: 'tent, pavilion or picnic table' },
  M: { name: 'Mobile', gloss: 'car, RV, trailer or boat' },
}
const LOCS = [
  { id: 'MN', label: 'Minnesota', gloss: 'an ARRL section' },
  { id: 'EPA', label: 'E. Pennsylvania', gloss: 'an ARRL section' },
  { id: 'QC', label: 'Quebec', gloss: 'a Canadian RAC section' },
  { id: 'MX', label: 'Mexico', gloss: 'every station in Mexico' },
  { id: 'DX', label: 'Elsewhere', gloss: 'any other country' },
]
const CARD = [20, 226, 432]
const CW = 188

/** The Winter Field Day exchange, piece by piece: transmitter count, where you operate, and your section. */
export function WinterFieldDay_Exchange() {
  const [n, setN] = useState(1)
  const [w, setW] = useState<Where>('H')
  const [loc, setLoc] = useState('MN')
  const l = LOCS.find((v) => v.id === loc)!
  const chips = [
    { t: 'N0CALL', c: C.muted, x: 150, w: 104 },
    { t: String(n), c: C.signal, x: 266, w: 40 },
    { t: w, c: C.resist, x: 306, w: 40 },
    { t: loc, c: C.power, x: 360, w: 64 },
  ]
  const cards = [
    { c: C.signal, head: `${n} transmitter${n > 1 ? 's' : ''}`, gloss: 'on the air at the same time', from: 1 },
    { c: C.resist, head: WHERE[w].name, gloss: WHERE[w].gloss, from: 2 },
    { c: C.power, head: l.label, gloss: l.gloss, from: 3 },
  ]
  return (
    <>
      <Diagram w={640} h={200}
        title={`The Winter Field Day exchange for ${n} transmitter${n > 1 ? 's' : ''} at a ${WHERE[w].name.toLowerCase()} station in ${l.label}: your call sign, then ${n}${w}, then ${loc}.`}
        caption="Placeholder call sign. Format from recent rules; check the current year's before the event.">
        {chips.map((p) => (
          <g key={p.x}>
            <rect x={p.x} y={22} width={p.w} height={40} rx={8} fill={p.c} fillOpacity={0.16} stroke={p.c} strokeWidth={2} />
            <T x={p.x + p.w / 2} y={42} anchor="middle" size={18} mono bold>{p.t}</T>
          </g>
        ))}
        <T x={140} y={42} anchor="end" size={12.5} color={C.muted}>you send</T>
        {cards.map((k, i) => {
          const ch = chips[k.from]
          const cx = CARD[i] + CW / 2
          return (
            <g key={i}>
              <path d={`M${ch.x + ch.w / 2},64 C${ch.x + ch.w / 2},88 ${cx},84 ${cx},108`} fill="none" stroke={k.c} strokeWidth={1.5} strokeDasharray="3 4" />
              <rect x={CARD[i]} y={110} width={CW} height={64} rx={10} fill={C.fill} stroke={k.c} strokeWidth={2} />
              <T x={cx} y={132} anchor="middle" size={13} bold color={k.c}>{k.head}</T>
              <T x={cx} y={153} anchor="middle" size={12.5}>{k.gloss}</T>
            </g>
          )
        })}
      </Diagram>
      <div style={{ margin: '-6px 0 8px' }}>
        <Choice label="Transmitters" value={n} onChange={setN} options={[1, 2, 3, 4].map((v) => ({ value: v, label: `${v} transmitter${v > 1 ? 's' : ''}` }))} />
      </div>
      <div style={{ margin: '0 0 8px' }}>
        <Choice label="Where you operate" value={w} onChange={setW} options={(Object.keys(WHERE) as Where[]).map((k) => ({ value: k, label: WHERE[k].name }))} />
      </div>
      <div style={{ margin: '0 0 14px' }}>
        <Choice label="Location" value={loc} onChange={setLoc} options={LOCS.map((v) => ({ value: v.id, label: v.label }))} />
      </div>
    </>
  )
}
