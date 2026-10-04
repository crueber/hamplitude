import { C, Diagram, Ln, T } from '../kit'

/** What a computer-radio interface carries: receive audio, transmit audio and a transmit-key line, with isolation. */
export function ComputerInterfaces_Paths() {
  return (
    <Diagram w={640} h={304}
      title="A computer-radio interface connects the computer's sound card and a control line to the radio: receive audio to the sound-card input, transmit audio from the sound-card output, and a push-to-talk line. Isolation transformers break ground loops."
      caption="Many radios have all of this built in behind one USB cable. The same three jobs still happen.">
      <rect x={20} y={40} width={130} height={180} rx={12} fill={C.fill} stroke={C.muted} strokeWidth={3} />
      <T x={85} y={62} anchor="middle" size={15} bold>Computer</T>
      <T x={85} y={106} anchor="middle" size={13} color={C.muted}>sound input</T>
      <T x={85} y={156} anchor="middle" size={13} color={C.muted}>sound output</T>
      <T x={85} y={200} anchor="middle" size={13} color={C.muted}>serial or USB</T>

      <rect x={226} y={40} width={188} height={180} rx={12} fill={C.fill} stroke={C.power} strokeWidth={3} strokeDasharray="8 5" />
      <T x={320} y={62} anchor="middle" size={15} bold>Interface</T>
      <rect x={240} y={90} width={160} height={34} rx={8} fill={C.bg} stroke={C.power} strokeWidth={2} />
      <T x={320} y={107} anchor="middle" size={12} bold>isolation transformer</T>
      <rect x={240} y={140} width={160} height={34} rx={8} fill={C.bg} stroke={C.power} strokeWidth={2} />
      <T x={320} y={157} anchor="middle" size={12} bold>transformer + level pad</T>
      <rect x={240} y={184} width={160} height={30} rx={8} fill={C.bg} stroke={C.power} strokeWidth={2} />
      <T x={320} y={199} anchor="middle" size={12} bold>key line (isolated)</T>

      <rect x={490} y={40} width={130} height={180} rx={12} fill={C.fill} stroke={C.signal} strokeWidth={3} />
      <T x={555} y={62} anchor="middle" size={15} bold>Radio</T>
      <T x={555} y={106} anchor="middle" size={13} color={C.muted}>audio out</T>
      <T x={555} y={156} anchor="middle" size={13} color={C.muted}>data / mic in</T>
      <T x={555} y={200} anchor="middle" size={13} color={C.muted}>PTT input</T>

      <Ln x1={488} y1={107} x2={402} y2={107} color={C.signal} width={3} arrow />
      <Ln x1={238} y1={107} x2={152} y2={107} color={C.signal} width={3} arrow />
      <Ln x1={152} y1={157} x2={238} y2={157} color={C.current} width={3} arrow />
      <Ln x1={402} y1={157} x2={488} y2={157} color={C.current} width={3} arrow />
      <Ln x1={152} y1={199} x2={238} y2={199} color={C.voltage} width={3} arrow />
      <Ln x1={402} y1={199} x2={488} y2={199} color={C.voltage} width={3} arrow />

      <T x={20} y={244} size={13} bold color={C.signal}>Receive audio</T>
      <T x={150} y={244} size={13} color={C.muted}>radio to computer sound input</T>
      <T x={20} y={266} size={13} bold color={C.current}>Transmit audio</T>
      <T x={150} y={266} size={13} color={C.muted}>sound output to radio, set low to avoid overdrive</T>
      <T x={20} y={288} size={13} bold color={C.voltage}>Key line</T>
      <T x={150} y={288} size={13} color={C.muted}>tells the radio to transmit (CAT can do this instead)</T>
    </Diagram>
  )
}
