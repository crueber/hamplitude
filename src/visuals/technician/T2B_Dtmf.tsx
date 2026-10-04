import { useState } from 'react'
import { C, Diagram, T } from '../kit'

const KEYS = ['1', '2', '3', 'A', '4', '5', '6', 'B', '7', '8', '9', 'C', '*', '0', '#', 'D']
const ROWS = [697, 770, 852, 941]
const COLS = [1209, 1336, 1477, 1633]

/** Touch-tone keypad: each key sends one low tone plus one high tone at the same time. */
export function Dtmf() {
  const [sel, setSel] = useState(5)
  const r = Math.floor(sel / 4), c = sel % 4
  const kx = 300, ky = 62, cell = 66
  return (
    <Diagram w={640} h={366} title={`DTMF key ${KEYS[sel]} sends two tones at once: ${ROWS[r]} hertz and ${COLS[c]} hertz`} caption="DTMF = two simultaneous audio tones per key. Tap a key.">
      <T x={14} y={90} bold size={15} color={C.power}>Key {KEYS[sel]}</T>
      <T x={14} y={126} mono bold size={16} color={C.resist}>{ROWS[r]} Hz</T>
      <T x={14} y={152} bold size={14}>+</T>
      <T x={14} y={178} mono bold size={16} color={C.signal}>{COLS[c]} Hz</T>
      <T x={14} y={214} size={13} color={C.muted}>two tones at once</T>
      {COLS.map((f, i) => (
        <T key={f} x={kx + i * cell + cell / 2} y={42} anchor="middle" mono size={12.5} bold={i === c} color={i === c ? C.signal : C.muted}>{f}</T>
      ))}
      {ROWS.map((f, i) => (
        <T key={f} x={kx - 12} y={ky + i * cell + cell / 2} anchor="end" mono size={12.5} bold={i === r} color={i === r ? C.resist : C.muted}>{f}</T>
      ))}
      {KEYS.map((k, i) => {
        const x = kx + (i % 4) * cell, y = ky + Math.floor(i / 4) * cell
        const on = i === sel
        return (
          <g key={k} role="button" tabIndex={0} aria-label={`Key ${k}`} style={{ cursor: 'pointer' }}
            onClick={() => setSel(i)} onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && setSel(i)}>
            <rect x={x + 4} y={y + 4} width={cell - 8} height={cell - 8} rx={10}
              fill={on ? C.power : i % 4 === c || Math.floor(i / 4) === r ? C.fill2 : C.fill}
              stroke={on ? C.power : C.ink} strokeWidth={on ? 3 : 1.5} fillOpacity={on ? 0.9 : 1} />
            <T x={x + cell / 2} y={y + cell / 2} anchor="middle" bold size={22} color={on ? C.bg : C.ink}>{k}</T>
          </g>
        )
      })}
      <T x={kx + 2 * cell} y={ky + 4 * cell + 22} anchor="middle" size={12} color={C.muted}>low tone = row, high tone = column</T>
    </Diagram>
  )
}
