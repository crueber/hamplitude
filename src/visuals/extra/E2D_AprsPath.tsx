import { useState } from 'react'
import { C, Controls, Diagram, Ln, Slider, T } from '../kit'

const XS = [70, 230, 390, 550]
const NAMES = ['You', 'Digi 1', 'Digi 2', 'Digi 3']

/** WIDE3-N: three digipeater hops were requested; the number after the dash counts the hops still left. */
export function E2D_AprsPath() {
  const [hop, setHop] = useState(2)
  const left = 3 - hop
  const label = left === 0 ? 'WIDE3-0 (done)' : `WIDE3-${left}`
  return (
    <>
      <Diagram w={640} h={270} title="The APRS packet path WIDE3-1: a packet asks for up to three digipeater hops. Each digipeater that repeats it reduces the number after the dash by one. After two hops it reads WIDE3-1, meaning three hops requested and one remaining."
        caption="WIDE3-1: WIDE3 asks for up to three hops. The 1 is how many are left.">
        <T x={20} y={22} size={14} bold color={C.muted}>Packet leaves you as</T>
        <T x={196} y={22} size={14} bold mono color={C.muted}>WIDE3-3</T>
        {XS.slice(0, 3).map((x, i) => (
          <Ln key={i} x1={x + 28} y1={116} x2={XS[i + 1] - 28} y2={116} color={i < hop ? C.signal : C.fill2} width={i < hop ? 4 : 2.5} arrow />
        ))}
        {XS.map((x, i) => {
          const here = i === hop
          const col = i === 0 ? C.voltage : i <= hop ? C.signal : C.muted
          return (
            <g key={i}>
              <circle cx={x} cy={116} r={here ? 28 : 22} fill={here ? col : C.fill} fillOpacity={here ? 0.25 : 1} stroke={col} strokeWidth={here ? 4 : 2.5} />
              <T x={x} y={116} anchor="middle" size={13} bold color={col === C.muted ? C.ink : col}>{i === 0 ? 'TX' : i}</T>
              <T x={x} y={160} anchor="middle" size={13} color={C.muted}>{NAMES[i]}</T>
            </g>
          )
        })}
        <rect x={XS[hop] - 74} y={52} width={148} height={30} rx={8} fill={C.fill} stroke={C.resist} strokeWidth={2.5} />
        <T x={XS[hop]} y={67} anchor="middle" size={14} bold mono color={C.resist}>{label}</T>
        <rect x={20} y={192} width={600} height={58} rx={10} fill={C.fill} stroke={C.fill2} strokeWidth={2} />
        <T x={34} y={212} size={14}><tspan fontWeight={700} fill="var(--d-resist)">{left}</tspan> hop{left === 1 ? '' : 's'} remaining after {hop} digipeater{hop === 1 ? '' : 's'} have repeated it.</T>
        <T x={34} y={234} size={13} color={C.muted}>Each digipeater re-transmits the packet and lowers the count.</T>
      </Diagram>
      <Controls>
        <Slider label="Where the packet is" value={hop} min={0} max={3} step={1} onChange={setHop} format={(v) => (v === 0 ? 'at your station' : `after digi ${v}`)} color="var(--d-resist)" />
      </Controls>
    </>
  )
}
