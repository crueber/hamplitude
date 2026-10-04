import { C, Diagram, T } from '../kit'

/** Where automatically controlled digital stations may talk to each other; outside, the initiator must be under local/remote control. */
export function G1E_AutoDigital() {
  return (
    <Diagram w={640} h={250} title="Automatically controlled digital stations may communicate with each other anywhere in the 6 meter or shorter wavelength bands and in limited segments of some HF bands. Outside those segments, the station that starts the contact must be under local or remote control" caption="Not to scale.">
      <T x={6} y={14} size={13} color={C.muted}>lower frequency</T>
      <T x={634} y={14} size={13} color={C.muted} anchor="end">higher frequency</T>
      <rect x={6} y={30} width={298} height={60} rx={8} fill={C.resist} fillOpacity={0.15} stroke={C.resist} strokeWidth={2} />
      <T x={155} y={52} anchor="middle" size={15} bold>HF</T>
      <T x={155} y={74} anchor="middle" size={13}>auto-to-auto: limited segments only</T>
      <rect x={304} y={30} width={330} height={60} rx={8} fill={C.signal} fillOpacity={0.2} stroke={C.signal} strokeWidth={2} />
      <T x={469} y={52} anchor="middle" size={15} bold>6 m and shorter wavelengths</T>
      <T x={469} y={74} anchor="middle" size={13}>auto-to-auto: anywhere</T>
      <rect x={6} y={116} width={628} height={118} rx={10} fill={C.fill} stroke={C.power} strokeWidth={2} />
      <T x={320} y={140} anchor="middle" size={14} bold color={C.power}>Outside the auto-control segments</T>
      <T x={320} y={172} anchor="middle" size={14}>The station that starts the contact must be under</T>
      <T x={320} y={194} anchor="middle" size={14} bold>local or remote control</T>
      <T x={320} y={218} anchor="middle" size={12.5} color={C.muted}>a person at a control point calls the automatic station</T>
    </Diagram>
  )
}
