import { C, Diagram, Ln, T } from '../kit'

/** The three parts of a remote station and where the responsibility sits. */
export function RemoteOperation_Path() {
  return (
    <Diagram w={640} h={304}
      title="Remote operation: the control operator at the control point sends audio and commands over the internet to a remote station, which keys a radio and antenna, with a safeguard that stops transmitting if the link is lost"
      caption="The link carries audio and commands. The control operator stays responsible for what the station sends.">
      <rect x={14} y={30} width={190} height={170} rx={12} fill={C.fill} stroke={C.ink} strokeWidth={2} />
      <T x={109} y={52} anchor="middle" size={14} bold>Control point</T>
      <T x={109} y={72} anchor="middle" size={12} color={C.muted}>where you are</T>
      <T x={109} y={106} anchor="middle" size={13}>Computer or phone</T>
      <T x={109} y={128} anchor="middle" size={13}>Headset, mic, keyer</T>
      <T x={109} y={150} anchor="middle" size={13}>Control software</T>
      <T x={109} y={182} anchor="middle" size={12} bold color={C.voltage}>control operator</T>

      <rect x={252} y={66} width={136} height={98} rx={12} fill={C.fill2} stroke={C.signal} strokeWidth={2} />
      <T x={320} y={90} anchor="middle" size={14} bold color={C.signal}>Internet link</T>
      <T x={320} y={116} anchor="middle" size={12}>audio, commands</T>
      <T x={320} y={136} anchor="middle" size={12}>delay and drop-outs</T>
      <Ln x1={208} y1={115} x2={250} y2={115} color={C.signal} width={2.5} arrow="both" />
      <Ln x1={390} y1={115} x2={432} y2={115} color={C.signal} width={2.5} arrow="both" />

      <rect x={436} y={30} width={190} height={170} rx={12} fill={C.fill} stroke={C.ink} strokeWidth={2} />
      <T x={531} y={52} anchor="middle" size={14} bold>Remote station</T>
      <T x={531} y={72} anchor="middle" size={12} color={C.muted}>where the antenna is</T>
      <T x={531} y={106} anchor="middle" size={13}>Radio and antenna</T>
      <T x={531} y={128} anchor="middle" size={13}>Station computer</T>
      <T x={531} y={150} anchor="middle" size={13}>Power and ID control</T>
      <T x={531} y={182} anchor="middle" size={12} bold color={C.power}>the rules of this place apply</T>

      <rect x={14} y={218} width={612} height={72} rx={10} fill={C.good} fillOpacity={0.14} stroke={C.good} strokeWidth={2} />
      <T x={28} y={234} size={13} bold color={C.good}>Safeguards to build in</T>
      <T x={28} y={254} size={13}>If the link fails, the transmitter must stop. Keep a way to switch it off,</T>
      <T x={28} y={272} size={13}>and keep anyone else from using it.</T>
    </Diagram>
  )
}
