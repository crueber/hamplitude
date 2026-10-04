import type { ReactElement } from 'react'
import { useState } from 'react'
import { C, Choice, Controls, Diagram, T } from '../kit'

const RATES: [number, number][] = [[1, 2], [2, 3], [3, 4], [5, 6], [7, 8]]

/** Coding rate n/d: n of every d transmitted bits are data, the rest are error-correction. Constellations show bits per symbol. */
export function E2B_DigitalTv() {
  const [ri, setRi] = useState(2)
  const [n, d] = RATES[ri]
  const fecPct = Number((((d - n) / d) * 100).toFixed(1))
  const cw = 34, gap = 6
  const constel = (cx: number, cy: number, m: number) => {
    const pts: ReactElement[] = []
    const s = m === 4 ? 2 : 4
    for (let i = 0; i < s; i++) for (let j = 0; j < s; j++) {
      pts.push(<circle key={`${i}${j}`} cx={cx + (i - (s - 1) / 2) * (m === 4 ? 44 : 24)} cy={cy + (j - (s - 1) / 2) * (m === 4 ? 44 : 24)} r={m === 4 ? 7 : 5} fill={C.signal} />)
    }
    return pts
  }
  return (
    <>
      <Diagram w={640} h={300} title="Digital TV has two separate ideas. The coding rate says what fraction of the transmitted bits are real data: at rate three quarters, one bit in four is forward error correction. The modulation, QPSK or QAM, sets how many bits ride on each symbol."
        caption="Coding rate = data bits out of all bits. Modulation = bits per symbol.">
        <T x={20} y={22} size={14} bold color={C.muted}>Coding rate {n}/{d}: every {d} bits sent</T>
        {Array.from({ length: d }, (_, i) => {
          const data = i < n
          const col = data ? C.signal : C.resist
          const x = 20 + i * (cw + gap)
          return (
            <g key={i}>
              <rect x={x} y={40} width={cw} height={42} rx={6} fill={col} fillOpacity={0.25} stroke={col} strokeWidth={2.5} />
              <T x={x + cw / 2} y={61} anchor="middle" size={12} bold color={col}>{data ? 'D' : 'FEC'}</T>
            </g>
          )
        })}
        <T x={20} y={104} size={14} bold color={C.signal}>{n} data bits</T>
        <T x={140} y={104} size={14} bold color={C.resist}>{d - n} error-correction bit{d - n > 1 ? 's' : ''} ({fecPct}% of the bits sent)</T>
        <T x={20} y={150} size={14} bold color={C.muted}>Modulation: bits per symbol</T>
        <g>
          <rect x={20} y={166} width={190} height={124} rx={10} fill={C.fill} stroke={C.fill2} strokeWidth={2} />
          {constel(115, 224, 4)}
          <T x={115} y={279} anchor="middle" size={13} bold>QPSK: 4 points, 2 bits</T>
        </g>
        <g>
          <rect x={230} y={166} width={190} height={124} rx={10} fill={C.fill} stroke={C.fill2} strokeWidth={2} />
          {constel(325, 224, 16)}
          <T x={325} y={279} anchor="middle" size={13} bold>16-QAM: 16 points, 4 bits</T>
        </g>
        <T x={440} y={200} size={13.5}>DVB-T amateur TV uses</T>
        <T x={440} y={222} size={14} bold color={C.signal}>QPSK or QAM</T>
        <T x={440} y={246} size={12.5} color={C.muted}>(not FM, FSK, AM or OOK)</T>
      </Diagram>
      <Controls>
        <Choice label="Coding rate" value={ri} onChange={setRi} options={RATES.map(([a, b], i) => ({ value: i, label: `${a}/${b}` }))} />
      </Controls>
    </>
  )
}
