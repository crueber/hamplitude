import { useState } from 'react'
import { C, Choice, Controls, Diagram, Ln, T } from '../kit'

const MODES = {
  ft8: { name: 'FT8', period: 15, tones: '8 tones' },
  ft4: { name: 'FT4', period: 7.5, tones: '4 tones (four-tone CPFSK)' },
  jt65: { name: 'JT65', period: 60, tones: '65 tones' },
  fst4: { name: 'FST4', period: 30, tones: 'four-tone GFSK, seven tone spacings' },
} as const
type K = keyof typeof MODES

/** WSJT-X modes run on clock-locked transmit/receive periods. The period depends on the mode. */
export function E2E_Cycles() {
  const [k, setK] = useState<K>('ft8')
  const [fstP, setFstP] = useState(30)
  const m = MODES[k]
  const period = k === 'fst4' ? fstP : m.period
  const n = Math.round((60 / period) * 100) / 100
  const slots = Math.ceil(60 / period)
  const X0 = 40, X1 = 610, W = X1 - X0
  const sx = (s: number) => X0 + (s / 60) * W
  return (
    <>
      <Diagram w={640} h={250} title="A one-minute timeline of clock-locked transmit and receive periods. FT8 uses 15 second periods, four per minute. FT4 uses 7.5 second periods, eight per minute. JT65 uses one minute periods. FST4 has variable periods. Both stations keep their computer clocks synchronized so they agree on when each period starts."
        caption="Computer clocks keep both stations on the same period boundaries.">
        <T x={X0} y={20} size={14} bold color={C.muted}>One minute of UTC clock</T>
        <Ln x1={X0} y1={44} x2={X1} y2={44} color={C.muted} width={2} />
        {[0, 15, 30, 45, 60].map((s) => (
          <g key={s}>
            <Ln x1={sx(s)} y1={38} x2={sx(s)} y2={50} color={C.muted} width={2} />
            <T x={sx(s)} y={64} anchor={s === 0 ? 'start' : s === 60 ? 'end' : 'middle'} size={12} color={C.muted}>{s} s</T>
          </g>
        ))}
        {Array.from({ length: slots }, (_, i) => {
          const tx = i % 2 === 0
          const col = tx ? C.voltage : C.current
          const x0 = sx(i * period), x1 = sx(Math.min(60, (i + 1) * period))
          return (
            <g key={i}>
              <rect x={x0 + 1} y={82} width={Math.max(2, x1 - x0 - 2)} height={44} rx={5} fill={col} fillOpacity={0.2} stroke={col} strokeWidth={2} />
              {x1 - x0 > 28 && <T x={(x0 + x1) / 2} y={104} anchor="middle" size={13} bold color={col}>{tx ? 'TX' : 'RX'}</T>}
            </g>
          )
        })}
        <T x={X0} y={146} size={13} color={C.muted}>Your station sends on every other period (TX) and listens (RX) in between.</T>
        <rect x={20} y={166} width={600} height={70} rx={10} fill={C.fill} stroke={C.fill2} strokeWidth={2} />
        <T x={34} y={188} size={16} bold>{m.name}</T>
        <T x={120} y={188} size={14}>period <tspan fontWeight={700}>{period} s</tspan> = <tspan fontWeight={700}>{n}</tspan> cycle{n === 1 ? '' : 's'} per minute</T>
        <T x={34} y={214} size={13} color={C.muted}>{k === 'fst4' ? 'Variable periods: the operator picks the length.' : 'Fixed period.'} {m.tones}.</T>
      </Diagram>
      <Controls>
        <Choice label="Mode" value={k} onChange={setK} options={(Object.keys(MODES) as K[]).map((v) => ({ value: v, label: MODES[v].name }))} />
        {k === 'fst4' && <Choice label="FST4 period" value={fstP} onChange={setFstP} options={[{ value: 15, label: '15 s' }, { value: 30, label: '30 s' }, { value: 60, label: '60 s' }]} />}
      </Controls>
    </>
  )
}
