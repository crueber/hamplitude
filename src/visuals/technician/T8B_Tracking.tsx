import { C, Box, Diagram, Ln, T } from '../kit'

/** Keplerian elements (+ your place and time) in, a pass plan out. */
export function Tracking() {
  return (
    <Diagram w={640} h={250} title="A satellite tracking program takes the Keplerian elements of the orbit, plus your location and the time, and produces a map, pass times with azimuth and elevation, and the Doppler-shifted frequency" caption="Inputs describe the orbit. Outputs tell you when and where to point.">
      <T x={20} y={22} size={13} bold color={C.muted}>IN</T>
      <T x={620} y={22} size={13} bold color={C.muted} anchor="end">OUT</T>
      <Box x={20} y={56} w={160} h={64} label="Keplerian elements" sub="the orbit's numbers" color={C.power} />
      <Box x={20} y={140} w={160} h={64} label="Your location, time" color={C.muted} />
      <Ln x1={180} y1={88} x2={238} y2={120} color={C.muted} width={2.5} arrow />
      <Ln x1={180} y1={172} x2={238} y2={140} color={C.muted} width={2.5} arrow />
      <Box x={240} y={92} w={150} h={76} label="Tracking" sub="program" color={C.signal} />
      <Ln x1={390} y1={120} x2={440} y2={78} color={C.muted} width={2.5} arrow />
      <Ln x1={390} y1={130} x2={440} y2={130} color={C.muted} width={2.5} arrow />
      <Ln x1={390} y1={140} x2={440} y2={182} color={C.muted} width={2.5} arrow />
      <Box x={442} y={52} w={180} h={52} label="Live map of track" color={C.signal} size={13} />
      <Box x={442} y={104} w={180} h={52} label="Pass: time, az, el" color={C.signal} size={13} />
      <Box x={442} y={156} w={180} h={52} label="Doppler-shifted freq" color={C.signal} size={13} />
    </Diagram>
  )
}
