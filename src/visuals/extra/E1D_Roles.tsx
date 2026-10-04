import { C, Diagram, Ln, T } from '../kit'

/** Space station, telemetry down, telecommand up, Earth station. */
export function E1D_Roles() {
  return (
    <Diagram w={640} h={330} title="A space station more than 50 kilometers above the Earth sends telemetry, one-way measurements, down to ground stations. A space telecommand station sends telecommand, one-way commands that initiate, modify or terminate functions, up. Earth stations communicate through the satellite." caption="Telemetry = measurements coming down. Telecommand = commands going up. Both are one-way.">
      <rect x={6} y={6} width={628} height={96} rx={10} fill={C.fill} />
      <Ln x1={6} y1={102} x2={634} y2={102} color={C.muted} width={2} dash="8 5" />
      <T x={622} y={118} anchor="end" size={13} color={C.muted}>50 km above the surface</T>
      <rect x={290} y={34} width={60} height={36} rx={6} fill={C.signal} fillOpacity={0.25} stroke={C.signal} strokeWidth={2.5} />
      <rect x={256} y={44} width={30} height={16} fill={C.power} fillOpacity={0.35} stroke={C.power} strokeWidth={2} />
      <rect x={354} y={44} width={30} height={16} fill={C.power} fillOpacity={0.35} stroke={C.power} strokeWidth={2} />
      <T x={320} y={52} anchor="middle" bold size={13}>sat</T>
      <T x={22} y={30} bold size={15}>Space station</T>
      <T x={22} y={50} size={13} color={C.muted}>in a satellite or balloon,</T>
      <T x={22} y={68} size={13} color={C.muted}>above 50 km</T>
      <Ln x1={288} y1={76} x2={150} y2={216} color={C.current} width={3} arrow />
      <T x={140} y={160} anchor="end" size={14} bold color={C.current}>telemetry</T>
      <T x={140} y={180} anchor="end" size={13} color={C.current}>measurements, down</T>
      <Ln x1={480} y1={216} x2={348} y2={76} color={C.resist} width={3} arrow />
      <T x={500} y={160} size={14} bold color={C.resist}>telecommand</T>
      <T x={500} y={180} size={13} color={C.resist}>commands, up</T>
      <rect x={30} y={218} width={260} height={74} rx={10} fill={C.fill} stroke={C.current} strokeWidth={2} />
      <T x={160} y={244} anchor="middle" bold size={14}>Ground station</T>
      <T x={160} y={266} anchor="middle" size={13} color={C.muted}>an Earth station: any amateur</T>
      <rect x={350} y={218} width={260} height={74} rx={10} fill={C.fill} stroke={C.resist} strokeWidth={2} />
      <T x={480} y={244} anchor="middle" bold size={14}>Space telecommand station</T>
      <T x={480} y={266} anchor="middle" size={13} color={C.muted}>designated by the licensee</T>
    </Diagram>
  )
}
