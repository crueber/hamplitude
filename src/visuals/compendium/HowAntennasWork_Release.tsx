import { C, Diagram, Ln, T } from '../kit'

const arrow = 'url(#hx-arrow)'

/** Transmission line to dipole: bend the conductors apart and their currents stop cancelling, so the fields escape. */
export function HowAntennasWork_Release() {
  const cy = 150
  const pa = 8, pb = 190, pc = 372
  const fx = (p: number) => p + 34 // feed x in each panel
  return (
    <Diagram w={640} h={340} title="Three steps from a transmission line to a dipole: parallel wires carry opposite currents whose fields cancel; opening the wires apart lets the fields escape; a straight dipole has current in the same direction on both halves, so the fields add and radiate"
      caption="A transmission line keeps its fields to itself. Open it out until both halves carry current the same way, and the fields add and leave as a wave.">
      {/* panel titles */}
      <T x={pa} y={20} size={14} bold>1  Transmission line</T>
      <T x={pb} y={20} size={14} bold>2  Open it up</T>
      <T x={pc} y={20} size={14} bold>3  Dipole</T>

      {/* panel 1: parallel wires, opposite currents */}
      <Ln x1={fx(pa)} y1={cy - 9} x2={pa + 160} y2={cy - 9} color={C.ink} width={4} />
      <Ln x1={fx(pa)} y1={cy + 9} x2={pa + 160} y2={cy + 9} color={C.ink} width={4} />
      <Ln x1={pa + 70} y1={cy - 28} x2={pa + 110} y2={cy - 28} color={C.current} width={3} arrow />
      <Ln x1={pa + 110} y1={cy + 28} x2={pa + 70} y2={cy + 28} color={C.current} width={3} arrow />
      <T x={pa + 90} y={cy + 118} size={13} anchor="middle" color={C.muted}>currents opposite,</T>
      <T x={pa + 90} y={cy + 138} size={13} anchor="middle" color={C.muted}>fields cancel</T>

      {/* panel 2: wires fan out at 45 degrees */}
      <Ln x1={fx(pb)} y1={cy - 9} x2={pb + 150} y2={cy - 100} color={C.ink} width={4} />
      <Ln x1={fx(pb)} y1={cy + 9} x2={pb + 150} y2={cy + 100} color={C.ink} width={4} />
      <Ln x1={pb + 78} y1={cy - 60} x2={pb + 100} y2={cy - 74} color={C.current} width={3} arrow />
      <Ln x1={pb + 100} y1={cy + 74} x2={pb + 78} y2={cy + 60} color={C.current} width={3} arrow />
      <path d={`M${pb + 80},${cy - 30} Q${pb + 118},${cy} ${pb + 80},${cy + 30}`} fill="none" stroke={C.voltage} strokeWidth={2.5} strokeDasharray="5 4" />
      <path d={`M${pb + 108},${cy - 56} Q${pb + 156},${cy} ${pb + 108},${cy + 56}`} fill="none" stroke={C.voltage} strokeWidth={2.5} strokeDasharray="5 4" />
      <T x={pb + 90} y={cy + 118} size={13} anchor="middle" color={C.muted}>fields start</T>
      <T x={pb + 90} y={cy + 138} size={13} anchor="middle" color={C.muted}>to escape</T>

      {/* panel 3: straight dipole, same-direction currents, released loops */}
      <Ln x1={fx(pc)} y1={cy - 100} x2={fx(pc)} y2={cy - 9} color={C.ink} width={4} />
      <Ln x1={fx(pc)} y1={cy + 9} x2={fx(pc)} y2={cy + 100} color={C.ink} width={4} />
      <Ln x1={fx(pc) - 14} y1={cy - 30} x2={fx(pc) - 14} y2={cy - 68} color={C.current} width={3} arrow />
      <Ln x1={fx(pc) - 14} y1={cy + 68} x2={fx(pc) - 14} y2={cy + 30} color={C.current} width={3} arrow />
      <path d={`M${fx(pc) + 4},${cy - 40} C${fx(pc) + 64},${cy - 40} ${fx(pc) + 64},${cy + 40} ${fx(pc) + 4},${cy + 40}`} fill="none" stroke={C.voltage} strokeWidth={2.5} markerEnd={arrow} />
      <path d={`M${fx(pc) + 4},${cy - 75} C${fx(pc) + 130},${cy - 75} ${fx(pc) + 130},${cy + 75} ${fx(pc) + 4},${cy + 75}`} fill="none" stroke={C.voltage} strokeWidth={2.5} markerEnd={arrow} />
      <ellipse cx={fx(pc) + 186} cy={cy} rx={22} ry={46} fill="none" stroke={C.voltage} strokeWidth={2.5} strokeDasharray="5 4" />
      <Ln x1={fx(pc) + 148} y1={cy - 2} x2={fx(pc) + 214} y2={cy - 2} color={C.signal} width={3} arrow />
      <T x={fx(pc) + 186} y={cy + 66} size={12.5} anchor="middle" color={C.voltage} bold>detached loop</T>
      <T x={pc + 118} y={cy + 118} size={13} anchor="middle" color={C.muted}>currents together, fields add</T>
      <T x={pc + 118} y={cy + 138} size={13} anchor="middle" color={C.muted}>and radiate</T>

      {/* legend */}
      <Ln x1={20} y1={320} x2={44} y2={320} color={C.current} width={3} arrow />
      <T x={52} y={320} size={12.5} color={C.muted}>current in the wire</T>
      <Ln x1={200} y1={320} x2={224} y2={320} color={C.voltage} width={3} />
      <T x={232} y={320} size={12.5} color={C.muted}>electric field (schematic)</T>
      <Ln x1={420} y1={320} x2={444} y2={320} color={C.signal} width={3} arrow />
      <T x={452} y={320} size={12.5} color={C.muted}>direction of travel</T>
    </Diagram>
  )
}
