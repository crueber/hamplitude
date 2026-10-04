import { C, Diagram, Lines, T } from '../kit'

/** ARES vs RACES at a glance. */
export function Orgs() {
  return (
    <Diagram w={640} h={290} title="ARES is a volunteer group of registered amateurs. RACES is an FCC Part 97 service for civil defense communications, requiring certification by a civil defense agency." caption="ARES = volunteers. RACES = civil defense service, certified.">
      <rect x={10} y={10} width={300} height={270} rx={14} fill={C.fill} stroke={C.signal} strokeWidth={2.5} />
      <T x={160} y={40} anchor="middle" bold size={22} color={C.signal}>ARES</T>
      <T x={160} y={64} anchor="middle" size={13} color={C.muted}>Amateur Radio Emergency Service</T>
      <Lines x={28} y={104} lh={22} size={14} lines={['Licensed amateurs who', 'volunteer, registered with', 'their skills and equipment', 'for public-service duty']} />
      <rect x={330} y={10} width={300} height={270} rx={14} fill={C.fill} stroke={C.power} strokeWidth={2.5} />
      <T x={480} y={40} anchor="middle" bold size={22} color={C.power}>RACES</T>
      <T x={480} y={64} anchor="middle" size={13} color={C.muted}>Radio Amateur Civil Emergency Service</T>
      <Lines x={348} y={104} lh={22} size={14} lines={['An FCC Part 97 amateur', 'radio service for civil', 'defense communications', 'in national emergencies']} />
      <T x={348} y={214} bold size={14} color={C.power}>Requires certification by</T>
      <T x={348} y={234} bold size={14} color={C.power}>a civil defense agency</T>
    </Diagram>
  )
}
