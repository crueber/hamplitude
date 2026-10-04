import { useState } from 'react'
import { C, Diagram, T, Wire } from '../kit'

/** SPST, SPDT, DPDT drawn as blades (poles) and contacts (throws). Click a switch to flip it. */
export function Switches() {
  const [pos, setPos] = useState<Record<string, boolean>>({ spst: false, spdt: false, dpdt: false })
  const flip = (k: string) => setPos((p) => ({ ...p, [k]: !p[k] }))
  const dot = (x: number, y: number, c: string = C.ink) => <circle cx={x} cy={y} r={4} fill={c} />

  // generic pole: pivot at (x,y), contacts at (x+60, y-18) [up] and (x+60, y+18) [down]
  function Pole({ x, y, up, spst }: { x: number; y: number; up: boolean; spst?: boolean }) {
    const ty = spst ? y - 20 : up ? y - 20 : y + 20
    const closed = spst && up
    return (
      <g>
        <Wire pts={[[x - 36, y], [x, y]]} color={C.muted} width={2.5} />
        {dot(x, y)}
        {spst ? (
          <>
            {dot(x + 70, y)}
            <Wire pts={[[x + 70, y], [x + 110, y]]} color={C.muted} width={2.5} />
            <line x1={x} y1={y} x2={closed ? x + 70 : x + 66} y2={closed ? y : y - 22} stroke={closed ? C.good : C.ink} strokeWidth={3} strokeLinecap="round" />
          </>
        ) : (
          <>
            {dot(x + 70, y - 20)}{dot(x + 70, y + 20)}
            <Wire pts={[[x + 70, y - 20], [x + 110, y - 20]]} color={C.muted} width={2.5} />
            <Wire pts={[[x + 70, y + 20], [x + 110, y + 20]]} color={C.muted} width={2.5} />
            <line x1={x} y1={y} x2={x + 70} y2={ty} stroke={C.good} strokeWidth={3} strokeLinecap="round" />
          </>
        )}
      </g>
    )
  }

  const panel = (k: string, x: number, title: string, desc: string, body: React.ReactNode) => (
    <g key={k}>
      <rect x={x} y={14} width={196} height={252} rx={12} fill={C.fill} />
      <g onClick={() => flip(k)} style={{ cursor: 'pointer' }} role="button" aria-label={`Flip ${title}`}>
        <rect x={x} y={14} width={196} height={252} rx={12} fill="transparent" />
        <T x={x + 98} y={38} anchor="middle" bold size={17}>{title}</T>
        <T x={x + 98} y={58} anchor="middle" size={12} color={C.muted}>{desc}</T>
        <g transform={`translate(${x},0)`}>{body}</g>
      </g>
    </g>
  )

  return (
    <Diagram w={640} h={280} title="Three switch types. SPST has one pole and one throw: it opens or closes one circuit. SPDT has one pole and two throws: it routes one circuit to either of two. DPDT has two poles and two throws: two circuits each routed to either of two."
      caption="Click a switch to flip it. Pole = how many circuits. Throw = how many positions each can reach.">
      {panel('spst', 10, 'SPST', 'single pole, single throw', (
        <g>
          <Pole x={50} y={130} up={pos.spst} spst />
          <T x={98} y={210} anchor="middle" size={13} color={C.muted}>one circuit, on or off</T>
        </g>
      ))}
      {panel('spdt', 222, 'SPDT', 'single pole, double throw', (
        <g>
          <Pole x={50} y={130} up={pos.spdt} />
          <T x={98} y={210} anchor="middle" size={13} color={C.muted}>one circuit, A or B</T>
        </g>
      ))}
      {panel('dpdt', 434, 'DPDT', 'double pole, double throw', (
        <g>
          <Pole x={50} y={102} up={pos.dpdt} />
          <Pole x={50} y={172} up={pos.dpdt} />
          <line x1={50} y1={102} x2={50} y2={172} stroke={C.fill2} strokeWidth={2} strokeDasharray="3 3" />
          <T x={98} y={226} anchor="middle" size={13} color={C.muted}>two circuits, A or B</T>
        </g>
      ))}
    </Diagram>
  )
}
