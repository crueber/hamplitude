import { C, Box, Diagram, Ln, T } from '../kit'

/** A random wire fed straight from the radio: RF comes back through the station. */
export function G9B_RandomWire() {
  const arc = (cx: number, cy: number) => `M${cx - 9},${cy} q9,-9 18,0 q9,9 18,0`
  return (
    <Diagram w={640} h={250} title="A random wire connected straight to the transmitter. With no feed line to contain it, RF current also flows on the radio's case, microphone cable and power cord"
      caption="No coax shield to keep the RF outside: the radio, its cables and your hands become part of the antenna system.">
      <rect x={10} y={30} width={290} height={200} rx={12} fill="none" stroke={C.muted} strokeWidth={2} strokeDasharray="6 5" />
      <T x={20} y={46} size={13} bold color={C.muted}>Shack</T>
      <Box x={40} y={96} w={120} h={70} label="Transmitter" color={C.ink} />
      <Ln x1={160} y1={118} x2={620} y2={118} color={C.resist} width={4} />
      <circle cx={160} cy={118} r={4} fill={C.ink} />
      <T x={460} y={96} anchor="middle" size={13} bold color={C.resist}>random-length wire</T>
      <T x={460} y={140} anchor="middle" size={13} color={C.muted}>no feed line, fed at its end</T>
      {/* RF on station gear */}
      <Ln x1={100} y1={166} x2={100} y2={200} color={C.bad} width={3} arrow />
      <Ln x1={70} y1={96} x2={70} y2={64} color={C.bad} width={3} arrow />
      <Ln x1={130} y1={96} x2={200} y2={64} color={C.bad} width={3} arrow />
      <path d={arc(214, 58)} fill="none" stroke={C.bad} strokeWidth={3} />
      <path d={arc(100, 212)} fill="none" stroke={C.bad} strokeWidth={3} />
      <T x={140} y={196} size={13} bold color={C.bad}>RF on the case,</T>
      <T x={140} y={214} size={13} bold color={C.bad}>mic and power cord</T>
      <T x={470} y={196} anchor="middle" size={14} bold color={C.bad}>Station equipment may carry</T>
      <T x={470} y={216} anchor="middle" size={14} bold color={C.bad}>significant RF current</T>
    </Diagram>
  )
}
