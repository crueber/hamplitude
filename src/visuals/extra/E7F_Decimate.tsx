import { useState } from 'react'
import { C, Choice, Diagram, Ln, T } from '../kit'

/** Decimation: filter first, then throw away samples to lower the sample rate. */
export function Decimate() {
  const [n, setN] = useState(4)
  const rate = 48
  const newRate = rate / n
  const COLS = 24
  const X0 = 40, DX = 23
  const dot = (i: number, y: number, on: boolean, col: string) => (
    <g key={`${y}-${i}`}>
      <Ln x1={X0 + i * DX} y1={y} x2={X0 + i * DX} y2={y - (14 + 22 * Math.abs(Math.sin(i * 0.55)))} color={on ? col : C.muted} width={on ? 3.5 : 2} dash={on ? undefined : '2 4'} />
      <circle cx={X0 + i * DX} cy={y - (14 + 22 * Math.abs(Math.sin(i * 0.55)))} r={on ? 4.5 : 3} fill={on ? col : 'none'} stroke={on ? C.bg : C.muted} strokeWidth={on ? 1.5 : 1.5} />
    </g>
  )
  return (
    <>
      <Diagram w={640} h={318}
        title={`Decimation by ${n}: an anti-aliasing low-pass filter first removes frequencies above the new Nyquist limit, then every ${n}th sample is kept. The sample rate falls from ${rate} to ${newRate} thousand samples per second.`}
        caption="Filter first. Without it, the removed frequencies fold down and show up as aliases.">
        <T x={14} y={20} size={14} bold color={C.resist}>{rate} kS/s in</T>
        {Array.from({ length: COLS }, (_, i) => dot(i, 86, true, C.resist))}
        <Ln x1={14} y1={96} x2={626} y2={96} color={C.muted} width={1.5} />
        <rect x={64} y={116} width={236} height={50} rx={10} fill={C.fill} stroke={C.current} strokeWidth={2} />
        <T x={182} y={134} anchor="middle" size={14} bold color={C.current}>1. Anti-alias filter</T>
        <T x={182} y={154} anchor="middle" size={12.5} color={C.muted}>low-pass below {newRate / 2} kHz</T>
        <Ln x1={300} y1={141} x2={340} y2={141} color={C.signal} width={2.5} arrow />
        <rect x={340} y={116} width={236} height={50} rx={10} fill={C.fill} stroke={C.signal} strokeWidth={2} />
        <T x={458} y={134} anchor="middle" size={14} bold color={C.signal}>2. Keep every {n}{n === 2 ? 'nd' : 'th'} sample</T>
        <T x={458} y={154} anchor="middle" size={12.5} color={C.muted}>drop the rest</T>
        <T x={14} y={206} size={14} bold color={C.signal}>{newRate} kS/s out</T>
        {Array.from({ length: COLS }, (_, i) => dot(i, 272, i % n === 0, C.signal))}
        <Ln x1={14} y1={282} x2={626} y2={282} color={C.muted} width={1.5} />
        <T x={320} y={304} anchor="middle" size={13} color={C.muted}>filled = kept, dotted = removed</T>
      </Diagram>
      <div style={{ margin: '-6px 0 14px' }}>
        <Choice label="Decimation factor" value={n} onChange={setN} options={[2, 4, 8].map((v) => ({ value: v, label: `Keep every ${v}${v === 2 ? 'nd' : 'th'}` }))} />
      </div>
    </>
  )
}
