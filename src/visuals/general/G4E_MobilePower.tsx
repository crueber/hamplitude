import { Antenna, Box, C, Diagram, Fuse, Ln, T, Wire } from '../kit'

/** Power the radio straight from the battery with heavy fused wire; the dash socket is not wired for it. */
export function MobilePower() {
  return (
    <Diagram w={640} h={304} title="Top view of a vehicle. The HF radio is powered directly from the battery with heavy-gauge fused wire. The dash auxiliary power socket has wiring too light for a 100 watt radio. The charging system, fuel delivery and control computers can all add receive noise."
      caption="Power: battery, heavy wire, fuse. Noise can come from the vehicle's own systems.">
      <rect x={14} y={30} width={612} height={216} rx={48} fill="none" stroke={C.muted} strokeWidth={2} />
      <Ln x1={190} y1={34} x2={190} y2={242} color={C.fill2} width={2} dash="5 5" />
      <T x={102} y={52} anchor="middle" size={12} color={C.muted}>engine bay</T>
      <Box x={50} y={78} w={96} h={54} label="Battery" color={C.voltage} />
      <Wire pts={[[146, 105], [172, 105]]} color={C.voltage} width={4.5} />
      <Fuse x={202} y={105} len={52} color={C.voltage} />
      <Wire pts={[[228, 105], [400, 105]]} color={C.voltage} width={4.5} />
      <T x={312} y={84} anchor="middle" size={12} bold color={C.voltage}>heavy-gauge wire</T>
      <T x={202} y={132} anchor="middle" size={12} bold color={C.voltage}>fuse</T>
      <Box x={400} y={80} w={104} h={52} label="HF radio" color={C.signal} />
      <Wire pts={[[504, 105], [570, 105], [570, 118]]} color={C.ink} width={3} />
      <Antenna x={570} y={144} />
      <T x={570} y={186} anchor="middle" size={12} bold>Antenna</T>
      {/* aux socket */}
      <Box x={296} y={168} w={92} h={34} label="Aux socket" size={12} dash="5 4" color={C.bad} />
      <Wire pts={[[388, 185], [452, 185], [452, 132]]} color={C.bad} width={1.5} dash="4 4" />
      <T x={324} y={222} anchor="middle" size={12} bold color={C.bad}>thin wiring: not for 100 W</T>
      <T x={310} y={268} anchor="middle" size={13} bold color={C.resist}>Receive noise sources: charging system, fuel delivery, control computers</T>
    </Diagram>
  )
}
